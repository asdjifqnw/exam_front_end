<template>
  <el-row class="tac">
    <el-col>
      <h5>默认颜色</h5>
      <el-menu default-active="2">
        <div v-if="$store.state.userInfo.aid!=0">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户信息管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="addUser">新增用户</el-menu-item>
              <el-menu-item index="1-2" @click="listUsers">列出所有用户</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>考试信息管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" @click="addIvg">新增考试信息</el-menu-item>
              <el-menu-item index="2-2" @click="listIvgs">列出所有考试</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>监考分配管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1" @click="setUserIvg">分配监考</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>任务信息管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1" @click="addTask">新增任务信息</el-menu-item>
              <el-menu-item index="4-2" @click="listTasks">列出所有任务</el-menu-item>
              <el-menu-item index="4-3">查看用户完成情况</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </div>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>个人信息管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="5-1" @click="modifyMyInfo">修改个人信息</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>监考信息管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="6-1" @click="checkMyIvgInfo">查看我的监考信息</el-menu-item>
            <el-menu-item index="6-2" @click="setUserIvg">查看所有监考信息</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="7">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>任务信息管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="7-1" @click="listTasks">查看任务信息</el-menu-item>
            <el-menu-item index="6-2" @click="checkIsSubmitedTasks">查看完成情况</el-menu-item>
            <el-menu-item index="6-2" @click="checkOtherSubmitedTasks">查看他人完成情况</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
export default {
  methods: {
    addUser() {
      this.$router.push("/addUser");
    },
    listUsers() {
      this.$router.push("/listUsers");
    },
    addIvg() {
      this.$router.push("/addIvg");
    },
    listIvgs() {
      this.$router.push("/listIvgs");
    },
    setUserIvg() {
      this.$router.push("/setUserIvg");
    },
    addTask() {
      this.$router.push("/addTask");
    },
    listTasks() {
      this.$router.push("/listTasks");
    },
    modifyMyInfo() {
      this.$router.push("/modifyMyInfo");
    },
    checkMyIvgInfo() {
      this.$router.push("/checkMyIvgInfo");
    },
    checkIsSubmitedTasks(){
      this.$router.push("/checkIsSubmitedTasks");
    },
    checkOtherSubmitedTasks(){
      this.$router.push("/checkOtherSubmitedTasks");

    }
  }
};
</script>
<style>
</style>
