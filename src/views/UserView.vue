<script >
export default {
  name: "UserView",
  watch: {
    pageNumber(new1,old){
      axios.get("/back/user",{
        params: {
          pageNumber: new1,
          pageSize: this.pageSize,
          username:this.user.username,
          roleName:this.user.roleName,
          status:this.user.status

        }
      }).then((e) => {
        console.log(e);
        this.total = e.data.data.total;
        this.tableData = (e.data.data.records);


      })
    }
  },
  methods: {
    add(){
      this.dialogFormVisible = true
      // alert(1)
    },
    cancel(){
      this.form = {
        id: '0',
        username: '',
        password: '',
        phone: '',
        email: '',
        roleName: '',
        status: [],
        createTime: '',
        updateTime: ''
      }
      this.dialogFormVisible = false
    },
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
      this.dialogTableVisible = true;
      this.displayUser = row

      //查看，显示详细信息
      console.log(row);
    },
    editClick(row){
      //console.log(row);
      this.dialogFormVisible = true;
      this.form = row;


    },
    onSubmit() {
      console.log(this.user);
      axios.get("/back/user",{
        params:{
          username:this.user.username,
          roleName:this.user.roleName,
          status:this.user.status,
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
        }
      }).then(e=> {console.log(e)
        this.total = e.data.data.total;
        this.tableData = (e.data.data.records);
        this.pageNumber = e.data.data.currentPage;

      })

    },
    pageChange(e){
      this.pageNumber = e
      //console.log(e)
      // axios.get("/back/user",{
      //   params: {
      //     pageNumber: this.pageNumber,
      //     pageSize: this.pageSize,
      //     username:this.user.username,
      //     roleName:this.user.roleName,
      //     status:this.user.status,
      //   }
      // }).then((e) => {
      //   console.log(e);
      //   this.total = e.data.data.total;
      //   this.tableData = (e.data.data.records);
      //
      // })
    },
    sizeChange(e){
      this.pageSize = e
      console.log(e)
      axios.get("/back/user",{
        params: {
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
          username:this.user.username,
          roleName:this.user.roleName,
          status:this.user.status,
        }
      }).then((e) => {
        console.log(e);
        this.total = e.data.data.total;
        this.tableData = (e.data.data.records);

      })
    },
    checkUsername(){
      axios.get("/back/checkUsername",{
        params:{
          username:this.form.username,
          id:this.form.id
        }
      }).then((e) => {
        if(e.data.code === 600){
          this.$message({
            message: e.data.message,
            type:"success"
          })
          this.flag = false
        }
        else{
          this.$message({
            message: e.data.message,
            type: "warning",
          })
          this.flag = true
        }
        //this.$message(e.data.message);
      })
    },
    edit(){
      this.dialogFormVisible = false;
      axios.post("/back/edit",{
        id:this.form.id,
        username:this.form.username,
        password:this.form.password,
        email:this.form.email,
        phone:this.form.phone,
      }).then((e) => {
        e.data.code === 600?
            location.reload()
            :this.$message.error(e.data.message)
      })
      this.form = {
        id: '0',
        username: '',
        password: '',
        phone: '',
        email: '',
        roleName: '',
        status: [],
        createTime: '',
        updateTime: ''
      }
    },
    clo(){
      this.form = {
        id: '0',
        username: '',
        password: '',
        phone: '',
        email: '',
        roleName: '',
        status: [],
        createTime: '',
        updateTime: ''
      }
    }

  },
  created() {
    axios.get("/back/user",{
      params: {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        username:this.user.username,
        roleName:this.user.roleName,
        status:this.user.status

      }
    }).then((e) => {
      console.log(e);
      this.total = e.data.data.total;
      this.tableData = (e.data.data.records);


    })
  },
  data() {
    return {
      pageNumber :0,
      total:-1,
      pageSize:8,
      tableData: [],
      user: {
        username: '',
        status: '',
        roleName:''
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      displayUser : {},
      form: {
        id: '0',
        username: '',
        password: '',
        phone: '',
        email: '',
        roleName: '',
        status: [],
        createTime: '',
        updateTime: ''
      },
      formLabelWidth: '120px',
      flag:false,
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
        <el-form-item label="用户状态">
          <el-select v-model="user.status" clearable placeholder="用户状态">
<!--            <el-option label="请选择数据状态" value="1"></el-option>-->
            <el-option label="有效" value="1"></el-option>
            <el-option label="无效" value="0"></el-option>
          </el-select>

        </el-form-item>

        <el-form-item label="用户角色">
          <el-select v-model="user.roleName" clearable placeholder="用户角色">
            <!--            <el-option label="请选择数据状态" value="1"></el-option>-->
            <el-option label="卖家" value="1"></el-option>
            <el-option label="买家" value="0"></el-option>
            <el-option label="管理员" value="2"></el-option>

          </el-select>

        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="el-icon-search" > 查询</el-button>
          <el-button type="primary" @click="add" class="el-icon-circle-plus-outline"> 添加</el-button>

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
          <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog  title="用户详细信息" :visible.sync="dialogTableVisible">
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


    <el-dialog @close="clo" title="" :visible.sync="dialogFormVisible">
      <el-form :model="form" >
        <el-form-item label="ID" :label-width="formLabelWidth">
          <el-input v-model="form.id" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" @blur="checkUsername" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
<!--        <el-form-item label="角色" :label-width="formLabelWidth">-->
<!--          <el-select v-model="form.roleName" placeholder="请选择用户组">-->
<!--            <el-option label="买家" value="0">买家</el-option>-->
<!--            <el-option label="卖家" value="1">卖家</el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" :disabled="flag" @click="edit">确 定</el-button>
      </div>
    </el-dialog>




    <el-pagination
        background
        layout="sizes,prev, pager, next,total"
        :total="total"
        :page-size= this.pageSize
        :page-sizes="[8, 12, 20, 30]"
        @current-change = "pageChange"
        @size-change = "sizeChange"
    >
    </el-pagination>
  </div>

</template>

<style scoped>

</style>

