<template>
  <div>
    <el-table :data="users" style="width: 100%">
      <el-table-column prop="id" label="Id"></el-table-column>
      <el-table-column prop="name" label="用户名"></el-table-column>
      <el-table-column prop="phone" label="电话号码"></el-table-column>
      <el-table-column prop="aid" label="是否为管理员" :formatter="adminFormatter" align="center"/>
      <el-table-column prop="role" label="职称" :formatter="roleFormatter" align="center"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="editUserInfo(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="deleteUser(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUsers } from "../../../api/api";
import { removeUser } from "../../../api/api";
export default {
  data() {
    return {
      users: []
    };
  },
  created() {
    getUsers().then(res => {
      this.users = res;
    });
  },
  methods: {
    editUserInfo(row) {
      this.$router.push({ name: "addUser", query: { userInfo: row } });
    },
    deleteUser(row) {
      this.$confirm(`确定删除用户${row.name}`, "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          removeUser(row.id).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    adminFormatter(row) {
      return row.aid == 1 ? "是" : "否";
    },
    roleFormatter(row) {
      switch (row.role) {
        case 0:
          return "讲师";
        case 1:
          return "副教授";
        case 2:
          return "教授";
      }
    }
  }
};
</script>

<style>
</style>
