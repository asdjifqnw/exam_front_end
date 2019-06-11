<template>
  <div>
    <!-- 普普通通小表格 -->
    <el-table :data="ivgs" style="width: 100%">
      <el-table-column prop="id" label="Id" align="center"></el-table-column>
      <el-table-column prop="name" label="课程名" align="center"></el-table-column>
      <el-table-column prop="beginTime" label="开始时间" align="center"></el-table-column>
      <el-table-column prop="duration" label="持续时间" align="center" :formatter="durationFormatter"/>
      <el-table-column prop="location" label="考试地点" align="center" :formatter="locationFormatter"/>
      <el-table-column prop="numbersOfTeacher" label="所需监考数" align="center"/>
      <el-table-column prop="count" label="已分配监考数" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="checkUserIvgInfo(scope.row)" type="text" size="small">查案安排信息</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="查看安排信息" :visible.sync="firstDialogVisible" width="30%">
      <el-table :data="userIvgInfo" style="width: 100%">
        <el-table-column prop="user.name" label="用户名" align="center"></el-table-column>
        <el-table-column prop="user.phone" label="电话" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="removeUserIvg(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addUserIvg">添加监考人员</el-button>
        <el-button type="primary" @click="firstDialogVisible = false">确 定</el-button>
        <el-button @click="firstDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog title="浏览教师信息" :visible.sync="secondDialogVisible" width="40%">
      <el-table :data="users" style="width: 100%">
        <el-table-column prop="name" label="用户名" align="center"></el-table-column>
        <el-table-column prop="phone" label="电话号码" align="center"></el-table-column>
        <el-table-column prop="count" label="已分配次数" align="center" :sortable="true"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="setUserIvg(scope.row)" type="text" size="small">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeSecondDialog">确 定</el-button>
        <el-button @click="closeSecondDialog">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//获取所有考试信息
import { getIvgs } from "../../../api/api";
import { getUsers } from "../../../api/api";
//查询某个考试的已分配的人数
// import { countIsSetIvg } from "../../../api/api";
import { removeUserIvg } from "../../../api/api";
import { setUserIvg } from "../../../api/api";
import { findUserByIvgId } from "../../../api/api";

export default {
  data() {
    return {
      //获取的所有考试信息
      ivgs: [],
      firstDialogVisible: false,
      secondDialogVisible: false,
      //获取到的已分配的信息
      userIvgInfo: [],
      //列出用户
      users: [],
      //要添加的信息
      UserIvg: { uId: "", ivgId: "" }
    };
  },
  //   查询 赋值
  created() {
    getIvgs().then(res => {
      this.ivgs = res;
    });
  },
  methods: {
    closeSecondDialog() {
      this.firstDialogVisible = false;
      this.secondDialogVisible = false;
    },
    removeUserIvg(row) {
      removeUserIvg(row.id).then(res => {
        if (res) {
          //删除本地数组中的对象,同时更新视图
          for (let i in this.userIvgInfo) {
            if (this.userIvgInfo[i].id == row.id) {
              //修改所有考试信息的表的count
              for (let j in this.ivgs) {
                if (this.ivgs[j].id == this.userIvgInfo[i].ivg.id) {
                  this.ivgs[j].count = this.ivgs[j].count - 1;
                  this.$forceUpdate();
                }
              }
              this.userIvgInfo.splice(i, 1);
              this.$forceUpdate();
            }
          }
          this.$message({ type: "success", message: "删除成功" });
        } else {
          this.$message({ type: "error", message: "发生错误" });
        }
      });
    },
    setUserIvg(row) {
      this.UserIvg.uId = row.id;
      for (let i in this.userIvgInfo) {
        if (this.userIvgInfo[i].user.id == row.id) {
          this.$message({
            type: "error",
            message: "同一场考试不能安排同一个监考!"
          });
          return;
        }
      }
      setUserIvg(this.UserIvg)
        .then(res => {
          this.userIvgInfo.push({ user: { id: res.user.id } });
          this.$message({ type: "success", message: "分配成功" });
          for (let i in this.ivgs) {
            if (this.ivgs[i].id == this.UserIvg.ivgId) {
              this.ivgs[i].count++;
              this.$forceUpdate();
            }
          }
        })
        .catch(err => {
          if (err.response.data.message != "分配人数超过限制") {
            for (let i in this.ivgs) {
              if (this.ivgs[i].id == this.UserIvg.ivgId) {
                this.ivgs[i].count++;
                this.$forceUpdate();
              }
            }
          }
          this.$message({
            type: "error",
            message: err.response.data.message.replace("T", " ")
          });
        });
    },
    addUserIvg() {
      getUsers().then(res => {
        this.secondDialogVisible = true;
        this.users = res;
      });
    },
    //未完成的功能
    checkUserIvgInfo(row) {
      this.UserIvg.ivgId = row.id;
      findUserByIvgId(row.id).then(res => {
        this.firstDialogVisible = true;
        this.userIvgInfo = res;
      });
    },
    //曲线救国的方法
    // countIsSetIvgFormatter(row) {
    //   countIsSetIvg(row).then(res => {
    //     return res;
    //   });
    // },
    //下面两个也是格式化函数
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
