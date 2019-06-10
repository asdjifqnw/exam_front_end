<template>
  <div>
    <el-table :data="userIvgData" style="width: 100%">
      <el-table-column prop="ivg.name" label="考试名称" align="center"/>
      <el-table-column prop="ivg.beginTime" label="开始时间" align="center"/>
      <el-table-column
        prop="ivg.duration"
        label="持续时间"
        align="center"
        :formatter="durationFormatter"
      />
      <el-table-column
        prop="ivg.location"
        label="考试地点"
        align="center"
        :formatter="locationFormatter"
      />
      <el-table-column prop="ivg.numbersOfTeacher" label="监考人数" align="center"/>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="checkPartner(scope.row)" type="text" size="small">查看同组人员</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="查看同组人员" :visible.sync="dialogVisible" width="30%">
      <el-table :data="ivgsUserInfo" style="width: 100%">
        <el-table-column prop="user.name" label="用户名" align="center"></el-table-column>
        <el-table-column prop="user.phone" label="电话" align="center"></el-table-column>
        <el-table-column prop="user.role" label="职称" :formatter="roleFormatter" align="center"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { checkMyIvgInfo } from "../../../api/api";
import { checkIvgsUser } from "../../../api/api";
export default {
  data: () => ({
    userIvgData: [],
    dialogVisible: false,
    ivgsUserInfo: []
  }),
  created() {
    checkMyIvgInfo().then(res => {
      this.userIvgData = res;
    });
  },
  methods: {
    checkPartner(row) {
      checkIvgsUser(row.ivg.id).then(res => {
        this.ivgsUserInfo = res;
        this.dialogVisible = true;
      });
    },
    durationFormatter(row) {
      return row.ivg.duration.substring(0, 5);
    },
    locationFormatter(row) {
      switch (row.ivg.location) {
        case 0:
          return "丹青楼";
        case 1:
          return "锦绣楼";
        case 2:
          return "成栋楼";
      }
    },
    roleFormatter(row) {
      switch (row.user.role) {
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
