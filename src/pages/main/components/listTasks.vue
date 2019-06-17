<template>
  <div>
    <el-table :data="tasks" style="width: 100%">
      <el-table-column prop="id" label="Id" width="50px"></el-table-column>
      <el-table-column prop="name" label="任务名" align="center"></el-table-column>
      <el-table-column
        prop="description"
        align="center"
        label="任务描述"
        :formatter="descriptionFormatter"
        width="300px"
      ></el-table-column>
      <el-table-column prop="ddl" label="截止时间" align="center" :formatter="ddlFormatter"/>
      <el-table-column prop="type" label="任务类型" align="center" :formatter="taskTypeFormatter"/>
      <el-table-column prop="isOpen" label="状态" align="center" :formatter="isOpenFormatter"/>
      <el-table-column label="操作" align="center" width="300px">
        <template slot-scope="scope">
          <el-button @click="editTaskInfo(scope.row)" type="text" size="small" v-if="isAdmin">编辑</el-button>
          <el-button @click="submitTask(scope.row)" type="text" size="small">提交任务</el-button>
          <el-button @click="closeTask(scope.row)" type="text" size="small" v-if="isAdmin">打开/关闭</el-button>
          <el-button @click="deleteTask(scope.row)" type="text" size="small" v-if="isAdmin">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getTasks } from "../../../api/api";
import { removeTask } from "../../../api/api";
import { closeTask } from "../../../api/api";
export default {
  data() {
    return {
      tasks: [],
      isAdmin: this.$store.state.userInfo.aid == 1 ? true : false
    };
  },
  created() {
    getTasks().then(res => {
      this.tasks = res;
    });
  },
  methods: {
    submitTask(row){
      if(row.isOpen == false ){
        this.$message({type:"error",message:"该任务已关闭"})
        return 
      }
      row = JSON.stringify(row)
      this.$router.push({path:"/submitTask",query:{taskInfo:row}})
    },
    editTaskInfo(row) {
      this.$router.push({ name: "addTask", query: { taskInfo: row } });
    },
    deleteTask(row) {
      
          removeTask(row).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          });
        
       
    },
    closeTask(row) {
      closeTask(row)
        .then(() => {
          row.isOpen = !row.isOpen;
          this.$forceUpdate();
          this.$message({ type: "success", message: "操作成功" });
        })
        .catch(err => {
          this.$message({ type: "error", message: err.response.data.message });
        });
    },
    ddlFormatter(row) {
      return row.ddl.replace("T", " ");
    },
    taskTypeFormatter(row) {
      switch (row.type) {
        case 0:
          return "文件类";
        case 1:
          return "回复类";
      }
    },
    isOpenFormatter(row) {
      return row.isOpen ? "打开" : "关闭";
    },
    descriptionFormatter(row) {
      return row.description.length > 20
        ? row.description.substring(20, 0) + "..."
        : row.description;
    }
  }
};
</script>

<style>
</style>
