<script>
export default {
  data() {
    return {
      username: window.localStorage.getItem('username'),
      msgVisible: false,
      passVisible: false,
      displayUser: {}
    }
  },
  methods: {
    handleCommand(command) {

      if(command === 'msg') {
        console.log(this.username)
        //展示个人信息
        //用当前用户名与子组件表单进行匹配
        axios.get("/back/user",{
          params:{
            username:this.username,
          }
        }).then(e => {
          console.log(e.data.data.records[0]);
          this.displayUser= e.data.data.records[0];
          this.msgVisible = true;
        })
        }
      else if (command === 'pass') {

        //对话框嵌表单，后端发请求校验密码是否相同
        //修改密码
        //未实现
      }
      else if (command === 'lout') {
        window.localStorage.removeItem("username")
        this.$router.push('/login').catch()
      }
      this.$message('click on item ' + command);
    }

  }
};
</script>

<template>
  <el-container style="height: 960px;display: flex ;border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(84,92,100)"  >
      <el-menu text-color="#fff" active-text-color="#ffd04b" background-color="#545c64">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>用户功能</template>
          <el-menu-item-group>
            <el-menu-item index="1-1"><router-link style="color: #eeeeee;text-decoration: none" to="/menu/userList">用户操作</router-link></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-message"></i>品类功能</template>
          <el-menu-item-group>
            <el-menu-item index="1-1"><router-link style="color: #eeeeee;text-decoration: none" to="/menu/cateList">品类操作</router-link></el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown @command="handleCommand">
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="msg">账户信息</el-dropdown-item>
            <el-dropdown-item command="pass">修改密码</el-dropdown-item>
            <el-dropdown-item command="lout">注销账户</el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>
        <span>{{username}}</span>
      </el-header>

      <el-main>
        <router-view/>

      </el-main>
    </el-container>
    <el-dialog  title="用户详细信息" :visible.sync="msgVisible">
      <el-descriptions title="用户列表" direction="vertical" :column="4" border>
        <el-descriptions-item label="ID">{{displayUser.id}}</el-descriptions-item>
        <el-descriptions-item label="用户名">{{displayUser.username}}</el-descriptions-item>
        <el-descriptions-item label="密码">{{displayUser.password}}</el-descriptions-item>
        <el-descriptions-item label="邮箱" span="2">{{displayUser.email}}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{displayUser.phone}}</el-descriptions-item>
        <el-descriptions-item label="角色">{{displayUser.role}}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-switch
              v-model = "displayUser.status"
              inactive-color="#ff4949"
              active-color="#13ce66"
              disabled>
          </el-switch>
        </el-descriptions-item>
        <el-descriptions-item label="创建时间" span="2">{{displayUser.createTime}}</el-descriptions-item>
        <el-descriptions-item label="修改时间">{{displayUser.updateTime}}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </el-container>

</template>
<style>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
  </style>