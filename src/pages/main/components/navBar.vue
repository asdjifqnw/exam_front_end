<template>
  <div>
    <el-row style="padding-top:0.8rem;">
      <el-col :lg="6" :offset="2">
        <img src="../../../static/imgs/logo.png" width="15%">
      </el-col>
      <el-col :lg="8">
        <span class="title">考试管理系统</span>
      </el-col>
      <el-col :lg="2" :offset="6">
        <el-dropdown class="dropdown" @command="handleCommand">
          <span class="el-dropdown-link">
            下拉菜单
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">修改个人信息</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    handleCommand(command) {
      switch (command) {
        case "logout":
          this.$store.commit("logout");
          window.location.href = "./login.html";
      }
    }
  }
};
</script>

<style scoped>
.title {
  font-size: 2rem;
  margin-left: 25%;
}
.dropdown {
  margin-top: 1rem;
}
</style>
