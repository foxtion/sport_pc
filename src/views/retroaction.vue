<template>
  <div id="retroact ion">
    <h4>意见反馈</h4>
    <div class="retroactiontype">
      <span>反馈类型</span>
      <el-radio v-model="obj.fb_type" label="1">建议</el-radio>
      <el-radio v-model="obj.fb_type" label="2">错误</el-radio>
      <el-radio v-model="obj.fb_type" label="3">其他</el-radio>
    </div>
    <el-input
      type="textarea"
      placeholder="请尽量详细描述你要反馈的问题，以便我们尽快为你解决"
      v-model="obj.content"
      maxlength="500"
      show-word-limit
      rows="10"
      resize="none"
    ></el-input>
    <div style="margin-bottom: 35px">
      <p style="margin: 20px 0 10px">联系方式(QQ、SKYPE、邮件地址):</p>
      <el-input
        v-model="obj.model"
        placeholder="方便我们的工作人员尽快联系您"
      ></el-input>
    </div>
    <div style="margin-top: 30px">
      <van-uploader v-model="fileList" :after-read="afterRead" :max-count="1" />
    </div>
    <el-button
      style="
        background: #f8c21b;
        border-color: #f8c21b;
        margin-top: 30px;
        width: 142px;
      "
      @click="submit"
      >提交</el-button
    >
  </div>
</template>

<script>
export default {
  name: "retroaction",
  data() {
    return {
      obj: {
        uid: "",
        token: "",
        fb_type: "1",
        thumb: "",
        content: "",
        model: "",
      },
      // xinxi: "",
      fileList: [],
    };
  },
  mounted() {
    this.obj.uid = JSON.parse(window.localStorage.getItem("userInfo")).id;
    this.obj.token = window.localStorage.getItem("token");
  },
  methods: {
    afterRead(file) {
      let formData = new FormData();
      formData.append("file", file.file);
      formData.append("name", file.file.name);
      this.$SERVER.uploadAvatar(formData).then((res) => {
        if (res.data.code == 0) {
          this.obj.thumb = res.data.info[0].avatar;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    submit() {
      this.$SERVER
        .setFeedback(
          this.obj.uid,
          this.obj.token,
          this.obj.fb_type,
          this.obj.thumb,
          this.obj.content,
          this.obj.model
        )
        .then((res) => {
          if (res.data.code == 0) {
            this.$message({
              message: res.data.msg,
              type: "success",
            });
            this.$router.go(-1);
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
  },
};
</script>

<style lang="stylus">
#retroaction {
  width: 1000px;
  margin: 144px auto 0;
  padding: 50px 60px 70px;
  background: #fff;

  >h4 {
    margin-bottom: 50px;
    font-size: 26px;
    font-weight: 600;
  }

  .retroactiontype {
    margin-bottom: 20px;

    >span {
      font-size: 18px;
      margin-right: 16px;
    }

    .el-radio__input.is-checked .el-radio__inner {
      border-color: #f8c21b;
      background: #f8c21b;
    }

    .el-radio__input.is-checked+.el-radio__label {
      color: #f8c21b;
    }
  }
}
</style>