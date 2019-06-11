<template>
  <div id="app">
    <el-form
      :model="ruleForm2"
      :rules="rules2"
      ref="ruleForm2"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-container"
    >
      <h3 class="title">系统登录</h3>
      <el-form-item prop="phone">
        <el-input type="text" v-model="ruleForm2.phone" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">假装记住密码</el-checkbox>
      <el-button type="mini" @click="register" style="float:right;">注册</el-button>
      <el-form-item style="width:100%;">
        <el-button
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleSubmit2"
          :loading="logining"
        >登录</el-button>
        <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
      </el-form-item>
      <el-form-item></el-form-item>
    </el-form>
  </div>
</template>
<script>
import { login } from "../../api/api";
import { register } from "../../api/api";
export default {
  data() {
    return {
      logining: false,
      ruleForm2: {
        name: "初始化用户名",
        phone: "",
        password: ""
      },
      rules2: {
        phone: [
          { required: true, message: "请输入账号", trigger: "blur" }
          //{ validator: validaePass }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
          //{ validator: validaePass2 }
        ]
      },
      checked: true
    };
  },
  methods: {
    handleReset2() {
      this.$refs.ruleForm2.resetFields();
    },
    handleSubmit2() {
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          //_this.$router.replace('/table');
          this.logining = true;
          //NProgress.start();
          login(this.ruleForm2)
            .then(data => {
              this.logining = false;
              this.$store.commit("login", data);
              window.location.href = "./index.html";
            })
            .catch(() => {
              this.$message({ type: "error", message: "用户名或密码错误" });
              this.logining = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    register() {
      register(this.ruleForm2).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>
