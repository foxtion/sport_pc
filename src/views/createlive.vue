<template>
  <div id="createlive">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      v-if="showForm"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="直播状态" prop="islive">
        <el-radio-group v-model="ruleForm.islive">
          <el-radio label="0">关闭</el-radio>
          <el-radio label="1">开启</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="开播时间" prop="starttime">
        <el-date-picker
          v-model="ruleForm.starttime"
          type="datetime"
          placeholder="选择开播时间"
          format="yyyy-MM-dd HH:mm"
          value-format="yyyy-MM-dd HH:mm"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="直播封面图" prop="thumb">
        <van-uploader
          v-model="fileList"
          :after-read="afterRead"
          :max-count="1"
        />
      </el-form-item>
      <el-form-item label="屏幕方向" prop="anyway">
        <el-radio-group v-model="ruleForm.anyway">
          <el-radio label="0">竖屏</el-radio>
          <el-radio label="1">横屏</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="直播分类" prop="liveclassid">
        <el-select
          v-model="ruleForm.liveclassid"
          placeholder="请选择直播"
          @change="getGameId"
        >
          <el-option
            v-for="(val, key, i) in liveclassidlist"
            :key="i"
            :label="val"
            :value="key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="赛程分类" prop="game_id">
        <el-select v-model="ruleForm.game_id" placeholder="请选择赛程">
          <el-option
            v-for="(val, key, i) in gameidlist"
            :key="i"
            :label="val"
            :value="key"
          ></el-option>
        </el-select>
        <el-button
          plain
          style="margin-left: 15px"
          @click="$router.push({ name: 'createGame' })"
          >创建比赛</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
          style="background: #f8c21b; border: 1px solid #f8c21b"
          >立即创建</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <div v-else style="text-align: center">
      <el-page-header @back="goBack" style="margin-bottom: 50px">
      </el-page-header>
      <van-icon name="success" class="success" />
      <h4 style="color: #f8c21b; font-size: 30px; margin-bottom: 30px">
        直播创建成功
      </h4>
      <p style="display: flex; align-items: center; justify-content: center">
        <span style="margin: 0 30px">直播地址:{{ zbinfo.push }}</span>
        <el-button
          type="primary"
          style="background: #f8c21b; border-color: #f8c21b"
          class="tag-read"
          data-clipboard-text="fdjjdls"
          @click="copy" 
          >复制</el-button
        >
      </p>
      <p style="font-size: 14px; margin-top: 15px; color: red">
        (请复制直播地址并保存,离开后不再显示)
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "createlive",
  inject: ["reload"],
  components: {},
  data() {
    return {
      showForm: true,
      fileList: [],
      ruleForm: {
        title: "",
        islive: "0",
        starttime: "",
        thumb: "",
        anyway: "0",
        liveclassid: "",
        game_id: "",
      },
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          {
            min: 3,
            max: 50,
            message: "长度在 3 到 50 个字符",
            trigger: "blur",
          },
        ],
        islive: [
          { required: true, message: "请选择直播状态", trigger: "change" },
        ],
        starttime: [
          {
            required: true,
            message: "请选择开播时间",
            trigger: "change",
          },
        ],
        thumb: [
          {
            required: true,
            message: "请上传直播封面图",
            trigger: "change",
          },
        ],
        anyway: [
          { required: true, message: "请选择屏幕方向", trigger: "change" },
        ],
        liveclassid: [
          { required: true, message: "请选择直播", trigger: "change" },
        ],
        game_id: [{ required: true, message: "请选择赛程", trigger: "change" }],
      },
      liveclassidlist: {},
      gameidlist: {},
      zbinfo: {},
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
      this.showForm = true;
      this.reload();
    },
    afterRead(file) {
      let formData = new FormData();
      formData.append("file", file.file);
      formData.append("name", file.file.name);
      this.$SERVER.uploadAvatar(formData).then((res) => {
        if (res.data.code == 0) {
          this.ruleForm.thumb = res.data.info[0].avatar;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    getGameId(val) {
      this.ruleForm.game_id = "";
      this.$SERVER.getGameId(val).then((res) => {
        if (res.data.code == 0) {
          this.gameidlist = res.data.info;
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$SERVER
            .createLive(
              JSON.parse(window.localStorage.getItem("userInfo")).id,
              window.localStorage.getItem("token"),
              this.ruleForm.title,
              this.ruleForm.islive,
              this.ruleForm.starttime,
              this.ruleForm.thumb,
              this.ruleForm.anyway,
              this.ruleForm.liveclassid,
              this.ruleForm.game_id
            )
            .then((res) => {
              if (res.data.code == 0) {
                this.$message({
                  message: "创建成功",
                  type: "success",
                });
                this.showForm = false;
                this.zbinfo = res.data;
              } else {
                this.$message.error(res.data.msg);
              }
            });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.fileList = [];
    },
    copy() {
      var clipboard = new this.Clipboard(".tag-read");
      clipboard.on("success", (e) => {
        this.$message({
          message: "复制成功",
          type: "success",
        });
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", (e) => {
        // 不支持复制
        this.$message.error("该浏览器不支持自动复制");
        // 释放内存
        clipboard.destroy();
      });
    },
  },
};
</script>

<style lang="stylus">
#createlive {
  padding: 30px;

  .el-radio__input.is-checked .el-radio__inner {
    border-color: #f8c21b;
    background: #f8c21b;
  }

  .el-radio__input.is-checked+.el-radio__label {
    color: #f8c21b;
  }

  .success {
    font-size: 90px;
    color: #f8c21b;
  }
}
</style>