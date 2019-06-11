<template>
  <div>
    <el-table :data="isSubmited" style="width:100%">
      <el-table-column prop="task.name" label="任务名称" align="center"></el-table-column>
      <el-table-column prop="timeOut" label="是否超时" align="center" :formatter="TimeOutFormatter"></el-table-column>
      <el-table-column prop="content" label="回复内容" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="checkDetail(scope.row)" type="text" size="small">查看详细信息</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { checkIsSubmitedTasks } from "../../../api/api";
export default {
  data: () => ({
    isSubmited: []
  }),
  created() {
    checkIsSubmitedTasks(this.$store.state.userInfo.id).then(res => {
      this.isSubmited = res;
    });
  },
  methods: {
    checkDetail(row) {
      console.log(row);
    },
    TimeOutFormatter(row) {
      return row ? '是' : '否';
    }
  }
};
</script>
<style>
</style>
