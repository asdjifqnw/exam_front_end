<template>
  <div>
    <el-row>
      <el-col :lg="12" :offset="4" style="text-align:center">
        <span class="smalltitle" v-if="ivgInfo.id!=''">修改监考信息</span>
        <span class="smalltitle" v-else>创建新监考</span>
        <el-form :model="ivgInfo" :rules="rules" :ref="ivgInfo" label-width="100px">
          <el-form-item label="课程名称" prop="name">
            <el-input v-model="ivgInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="开始时间" prop="beginTime">
            <el-date-picker
              v-model="ivgInfo.beginTime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择开始时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="持续时间" prop="duration">
            <el-radio-group v-model="ivgInfo.duration">
              <el-radio label="01:00:00">一小时</el-radio>
              <el-radio label="01:30:00">一个半小时</el-radio>
              <el-radio label="02:00:00">两小时</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="考试地点" prop="location">
            <el-radio-group v-model="ivgInfo.location">
              <el-radio :label="0">丹青楼</el-radio>
              <el-radio :label="1">锦绣楼</el-radio>
              <el-radio :label="2">成栋楼</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="所需监考数" prop="numbersOfTeacher">
            <el-input v-model="ivgInfo.numbersOfTeacher"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="modifyIvgInfo" v-if="ivgInfo.id !=''">立即修改</el-button>
            <el-button type="primary" @click="submit" v-else>立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { addIvg } from "../../../api/api";
import { modifyIvgInfo } from "../../../api/api";
export default {
  data() {
    return {
      ivgInfo: {
        id: "",
        name: "",
        beginTime: "",
        duration: "",
        location: "",
        numbersOfTeacher: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入课程名称", trigger: "blur" },
          { min: 1, max: 16, message: "长度在4到10之间", trigger: "blur" }
        ],
        beginTime: [
          { required: true, message: "请选择开始时间", trigger: "blur" }
        ],
        duration: [
          { required: true, message: "请选择考试持续时间", trigger: "blur" }
        ],
        location: [
          { required: true, message: "请选择考试地点", trigger: "blur" }
        ],
        numbersOfTeacher: [
          {
            required: true,
            message: "请输入监考人数",
            trigger: "blur"
          },
          { min: 1, max: 2, message: "范围在0-99之间", trigger: "blur" }
        ]
      }
    };
  },
  created(){
      if(this.$route.query.ivgInfo!=null){
          if(this.$route.query.ivgInfo.id!=null){
              this.ivgInfo = this.$route.query.ivgInfo
          }
      }
  },
  methods: {
    submit() {
      this.$refs[this.ivgInfo].validate(valid => {
        if (valid) {
          addIvg(this.ivgInfo).then(res => {
            console.log(res);
            this.$message({ type: "success", message: "添加成功!" });
            setTimeout(() => {
                window.location.reload();
            }, 1000);
          });
        } else {
          console.log("error submit");
        }
      });
    },
    modifyIvgInfo() {
        modifyIvgInfo(this.ivgInfo).then(()=>{
            this.$message({type:"success",message:"修改成功!"})
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }).catch(err=>{
            this.$message({type:"error",message:err.response.data.message})
        })
    }
  }
};
</script>

<style>
</style>
