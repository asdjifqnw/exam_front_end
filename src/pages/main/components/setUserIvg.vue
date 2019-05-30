<template>
  <div>
    <!-- 普普通通小表格 -->
    <el-table :data="ivgs" style="width: 100%">
      <el-table-column prop="id" label="Id"  align="center"></el-table-column>
      <el-table-column prop="name" label="课程名"  align="center"></el-table-column>
      <el-table-column prop="beginTime" label="开始时间"  align="center"></el-table-column>
      <el-table-column prop="duration" label="持续时间" align="center" :formatter="durationFormatter"/>
      <el-table-column prop="location" label="考试地点" align="center" :formatter="locationFormatter"/>
      <el-table-column prop="numbersOfTeacher" label="所需监考数" align="center"/>
      <!-- <el-table-column label="已分配监考数" align="center" :formatter="countIsSetIvgFormatter"></el-table-column> -->
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="checkUserIvgInfo(scope.row)" type="text" size="small">查案安排信息</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="查看安排信息" :visible.sync="firstDialogVisible" width="30%">
      <el-table :data="userIvgInfo" style="width: 100%">
        <el-table-column prop="user.name" label="用户名"  align="center"></el-table-column>
        <el-table-column prop="user.phone" label="电话"  align="center"></el-table-column>
        <el-table-column prop="user.role" label="职称"  align="center"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addUserIvg">添加监考人员</el-button>
        <el-button type="primary" @click="firstDialogVisible = false">确 定</el-button>
        <el-button @click="firstDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//获取所有考试信息
import { getIvgs } from "../../../api/api";
//查询某个考试的已分配的人数
import { countIsSetIvg } from "../../../api/api";
import { findUserByIvgId } from "../../../api/api";

export default {
  data() {
    return {
      ivgs: [],
      firstDialogVisible: false,
      userIvgInfo: []
    };
  },
  //   查询 赋值
  created() {
    getIvgs().then(res => {
      this.ivgs = res;
    });
  },
  methods: {
      addUserIvg(){},
    //未完成的功能
    checkUserIvgInfo(row) {
      findUserByIvgId(row.id).then(res => {
        this.firstDialogVisible = true;
        this.userIvgInfo = res;
      });
    },
    //曲线救国的方法
    // countIsSetIvgFormatter(row) {
    //   console.log(
    //     countIsSetIvg(row).then(res => {
    //       return res;
    //     })
    //   );
    // },
    //下面两个也是格式化函数
    durationFormatter(row) {
      return row.duration.substring(3);
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
