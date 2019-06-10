<template>
  <div>
    <el-table :data="ivgs" style="width: 100%">
      <el-table-column prop="id" label="Id"></el-table-column>
      <el-table-column prop="name" label="课程名"></el-table-column>
      <el-table-column prop="beginTime" label="开始时间"></el-table-column>
      <el-table-column prop="duration" label="持续时间" align="center" :formatter="durationFormatter"/>
      <el-table-column prop="location" label="考试地点" align="center" :formatter="locationFormatter"/>
      <el-table-column prop="numbersOfTeacher" label="所需监考数" align="center"/>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="editIvgInfo(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="deleteIvg(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getIvgs } from "../../../api/api";
import { removeIvg } from "../../../api/api";
export default {
  data() {
    return {
      ivgs: [],
    };
  },
  created() {
    getIvgs().then(res => {
      this.ivgs = res;
    });
  },
  methods: {
    editIvgInfo(row) {
      this.$router.push({ name: "addIvg", query: { ivgInfo: row } });
    },
    deleteIvg(row) {
      this.$confirm(`确定删除考试${row.name}`, "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          removeIvg(row.id).then(() => {
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
    durationFormatter(row) {
      return row.duration.substring(0, 5);
    },
    locationFormatter(row) {
      switch (row.location) {
        case 0:
          return "丹青楼";
        case 1:
          return "锦绣楼";
        case 2:
          return "成栋楼";
      }
    }
  }
};
</script>

<style>
</style>
