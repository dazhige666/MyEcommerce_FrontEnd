<script >
export default {
  name:"LoginVue",
  data() {
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        callback();
      }
    }

    return {
      ruleForm: {
        username: "",
        password: "",
        role: '2'
      },
      rules: {
        password: [
          {validator: validatePassword, trigger: 'blur'}
        ],
        username: [
          {validator: validateUsername, trigger: 'blur'}
        ],

      },


    }


      },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //alert('submit!');

          axios.post('back/login', {
            username: this.ruleForm.username,
            password: this.ruleForm.password,
            role: this.ruleForm.role,
          }).then(e=>{
            console.log(e);
            if(e.data.code==600){
              this.$router.push('/menu');
              this.$message.success(e.data.message);
              window.localStorage.setItem("username",e.data.data);
              //在浏览器本地把登陆拥护的信息存下来，便于后期检验
            }
            else{
              console.log('error submit!!');
              this.$message.error(e.data.message);
              return false;
            }
          })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

  }
    }

</script>

<template>
  <div >
    <el-card style="margin: 240px auto 120px auto" class="box-card">
      <div slot="header" class="clearfix">
        <b>登录界面</b>
      </div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="ruleForm.role">
            <el-radio-button label="2">管理员</el-radio-button>
            <el-radio-button label="1">卖家</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>


      </el-form>
    </el-card>
  </div>


</template>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}


</style>