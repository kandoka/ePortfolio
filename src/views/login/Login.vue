<template>
  <div class="login-wrap">
    <!-- 头像   -->
    <div class="avatar-box">
      <img src="@/assets/logo.png">
    </div>

    <!--  登录表单区  -->
    <el-form class="login-container" ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
      <h1 class="title">Sign in</h1>
<!--      用户名-->
      <el-form-item label="" prop="username">
        <el-input type="text" v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
      </el-form-item>
<!--      密码-->
      <el-form-item label="" prop="password">
        <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
<!--      按钮-->
      <el-form-item>
        <el-button type="primary" style="width: 100%;" @click="login()">Submit</el-button>
      </el-form-item>
      <el-row style="text-align: center; margin-top: -10px;;">
        <el-link type="primary">Forget your password?</el-link>
        <el-link type="primary" @click="login()">Sign up</el-link>
      </el-row>
    </el-form>
  </div>
</template>

<script>
    export default {
      name: "login",
      data() {
        return{
          //login表单对象
          loginForm: {
            username: '',
            password: ''
          },
          // 表单验证规则
          loginFormRules: {
            username: [
              { required: true, message: 'Please input your username', trigger: 'blur' }
            ],
            password: [
              { required: true, message: 'Please input your password', trigger: 'blur' }
            ]
          }
        };
      },
      methods: {
        login() {
          // 验证表单
          // this.$refs.loginFormRef.validate(async valid => {
          //   if(!valid) return;
          //   // const result = await this.$http.post('login', this.loginForm);
          //   //  获取token
          //   //成功后跳转
          //   this.$router.push("/home")
          // });
          this.$router.push("/home")
        }
      }
    }
</script>

<style scoped>
  .login-container{
    width: 450px;
    height: 300px;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
