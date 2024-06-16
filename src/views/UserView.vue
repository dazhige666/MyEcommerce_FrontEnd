<script >
export default {
  name: "UserView",
  methods: {
    changeStatus(s){
      console.log(s)
      axios.get("/back/updateStatus",{
        params:{
          id:s.row.id,
          status:s.row.status
        }
      }).then(e=> {
        if(e.data.code === 600)
          this.$message({
            message: e.data.message,
            showClose: true,
            type: 'success'

          })
        else this.$message({
          message:e.data.message,
          showClose: true,
          type:'error'
        })
      })
    },
    handleClick(row) {
      console.log(row);
    },
    onSubmit() {
      console.log(this.user);
      axios.get("/back/likeName",{
        params:this.user
      }).then(e=> {console.log(e)})

    }
  },
  created() {
    axios.get("/back/user").then((e) => {
      console.log(e);
      this.tableData = (e.data.data);

    })
  },
  data() {
    return {
      tableData: [],
      user: {
        username: '',
        region: ''
      }
    }
  }
}
</script>
<template>
  <div>
    <el-row>
      <el-form :inline="true" :model="user" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input v-model="user.username" clearable placeholder="输入用户名查询"></el-input>
        </el-form-item>
<!--        <el-form-item label="活动区域">-->
<!--          <el-select v-model="formInline.region" placeholder="活动区域">-->
<!--            <el-option label="区域一" value="shanghai"></el-option>-->
<!--            <el-option label="区域二" value="beijing"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          prop="id"
          label="id"
          width="50">
      </el-table-column>
      <el-table-column
          prop="username"
          label="用户名"
          width="100">
      </el-table-column>
      <el-table-column
          prop="password"
          label="密码"
          width="140">
      </el-table-column>
      <el-table-column
          prop="email"
          label="邮箱"
          width="220">
      </el-table-column>
      <el-table-column
          prop="phone"
          label="电话"
          width="160">
      </el-table-column>
      <el-table-column
          prop="role"
          label="用户组"
          width="120">
      </el-table-column>
      <el-table-column
          label="当前状态"
          width="100">
        <template slot-scope="scope">
          <el-switch
              v-model="scope.row.status"
              v-if="scope.row.role!=='管理员'"
              @change="changeStatus(scope)"
              active-color="#13ce66"
              inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
          prop="createTime"
          label="账号创建时间"
          width="200">
      </el-table-column>
      <el-table-column
          prop="updateTime"
          label="最后更新时间"
          width="200">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<style scoped>

</style>

