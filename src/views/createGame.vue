<template>
  <div id="createGame">
    <h4 @click="goBack"><i class="el-icon-arrow-left"></i>创建比赛</h4>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      style="padding-right: 450px"
    >
      <el-form-item label="分类" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择分类">
          <el-option
            v-for="(val, key, i) in liveclassidlist"
            :key="i"
            :label="val"
            :value="key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="主办方" prop="sponsor_name">
        <el-input v-model="ruleForm.sponsor_name"></el-input>
      </el-form-item>
      <el-form-item label="A队名称" prop="team_one_name">
        <el-input v-model="ruleForm.team_one_name"></el-input>
      </el-form-item>
      <el-form-item label="A队logo" prop="team_one_logo">
        <van-uploader
          v-model="fileList1"
          :after-read="afterRead1"
          :max-count="1"
        />
      </el-form-item>
      <el-form-item label="B队名称" prop="team_two_name">
        <el-input v-model="ruleForm.team_two_name"></el-input>
      </el-form-item>
      <el-form-item label="B队logo" prop="team_two_logo">
        <van-uploader
          v-model="fileList2"
          :after-read="afterRead2"
          :max-count="1"
        />
      </el-form-item>
      <el-form-item label="起止时间" prop="game_end_time">
        <el-date-picker
          v-model="fromTo"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          format="yyyy-MM-dd HH:mm"
          value-format="yyyy-MM-dd HH:mm"
          @change="getFromTo"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
          style="background: #f8c21b; border: 1px solid #f8c21b"
          >确认创建</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "createGame",
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      liveclassidlist: {},
      fileList1: [],
      fileList2: [],
      fromTo: "",
      ruleForm: {
        type: "",
        sponsor_name: "",
        team_one_name: "",
        team_one_logo: "",
        team_two_name: "",
        team_two_logo: "",
        game_start_time: "",
        game_end_time: "",
      },
      rules: {
        type: [{ required: true, message: "请选择分类", trigger: "change" }],
        sponsor_name: [
          { required: true, message: "请输入主办方", trigger: "blur" },
        ],
        team_one_name: [
          { required: true, message: "请输入A队名称", trigger: "blur" },
        ],
        team_one_logo: [
          { required: true, message: "请上传A队logo", trigger: "change" },
        ],
        team_two_name: [
          { required: true, message: "请输入B队名称", trigger: "blur" },
        ],
        team_two_logo: [
          { required: true, message: "请上传B队logo", trigger: "change" },
        ],
        game_end_time: [
          { required: true, message: "请选择起止时间", trigger: "change" },
        ],
      },
    };
  },
  mounted() {
    this.$SERVER.getClassId().then((res) => {
      if (res.data.code == 0) {
        this.liveclassidlist = res.data.info;
      }
    });
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    afterRead1(file) {
      let formData = new FormData();
      formData.append("file", file.file);
      formData.append("name", file.file.name);
      this.$SERVER.uploadAvatar(formData).then((res) => {
        if (res.data.code == 0) {
          this.ruleForm.team_one_logo = res.data.info[0].avatar;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    afterRead2(file) {
      let formData = new FormData();
      formData.append("file", file.file);
      formData.append("name", file.file.name);
      this.$SERVER.uploadAvatar(formData).then((res) => {
        if (res.data.code == 0) {
          this.ruleForm.team_two_logo = res.data.info[0].avatar;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    getFromTo(arr) {
      this.ruleForm.game_start_time = arr[0];
      this.ruleForm.game_end_time = arr[1];
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$SERVER
            .addSchedule(
              this.ruleForm.type,
              this.ruleForm.sponsor_name,
              this.ruleForm.team_one_name,
              this.ruleForm.team_one_logo,
              this.ruleForm.team_two_name,
              this.ruleForm.team_two_logo,
              this.ruleForm.game_start_time,
              this.ruleForm.game_end_time
            )
            .then((res) => {
              if (res.data.code == 0) {
                this.$message({
                  message: "创建成功",
                  type: "success",
                });
                this.$router.go(-1);
              } else {
                this.$message.error(res.data.msg);
              }
            });
        }
      });
    },
  },
};
</script>

<style lang="stylus">
#createGame {
  padding: 32px 0 0 47px;

  h4 {
    cursor: pointer;
    margin-bottom: 40px;
  }
}
</style>