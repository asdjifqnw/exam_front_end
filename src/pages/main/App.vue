<template>
  <div id="app">
    <nav-bar class="navbar"></nav-bar>
    <el-row>
      <el-col :lg="4">
        <side-bar/>
      </el-col>
      <el-col :lg="20">
        <router-view class="routerview"/>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  components: {
    navBar: () => import("./components/navBar"),
    sideBar: () => import("./components/sideBar")
  }
};
</script>

<style>
.navbar {
  margin-top: -8px;
  height: 5rem;
  position: fixed;
  width: 100%;
  z-index: 999;
  background-color: rgb(248, 248, 248);
}
.routerview{
  margin-top: 5rem;
  padding:20px;
}
.smalltitle{
  display: inline-block;
  font-size: 1.5rem;
  margin: 2rem 0rem;
  margin-left: 5%;
  color: gray;
}
</style>
