<template>
  <el-dialog
    title="申请主播"
    :center="true"
    :visible.sync="dialogVisible"
    width="880px"
    :close-on-click-modal="false"
    :before-close="handleClose"
  >
    <div id="anchor">
      <el-form
        style="width: 820px; margin: 30px auto"
      >
        <el-form-item prop="name">
          <a class="xing">*</a>真实姓名:
          <el-input
            v-model="name"
            style="width: 180px; margin-left: 22px"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item prop="user_card">
          <a class="xing">*</a>身份证号码:
          <el-input
          v-model="user_card"
            style="width: 330px"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item prop="user_card_front">
          <a class="xing">*</a>身份证照片:
          <div>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :disabled="true"
            >
              <img :src="user_card_front" class="avatar idcard" />
              <!-- <i  class="el-icon-plus avatar-uploader-icon"></i> -->
            </el-upload>
          </div>
          <div>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess2"
              :before-upload="beforeAvatarUpload2"
              :disabled="true"
            >
              <img :src="user_card_reverse" class="avatar idcard" />
              <!-- <i class="el-icon-plus avatar-uploader-icon"></i> -->
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item>
          <div style="display: flex; justify-content: space-between">
            <el-button
              type="primary"
              style="
                background: linear-gradient(90deg, #eccbab, #dbb16f 100%);
                border-color: #f8c21b;
                width: 108px;
                height: 40px;
                font-size: 16px;
                font-weight: 400;
                color: #693d12;
                margin-left: 366px;
              "
              @click="abc"
            >
              确定申请
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import {  UserApplyAnchor,GetUserinfo, live_auth_info } from "@/api";
import envconfig from "../server/config.js";
export default {
  name: "realName",
  data() {
    return {
      registerForm: {
        mobile: "",
        code: "",
        name: "",
        user_card: "",
        checked: false,
      },
      checkNumDisabled: false,
      countDown: 60,
      timer: null,
      dialogVisible: true,
      imageUrl: "",
      imageUrl2: "",
      token: "",
      params:{},
      name:'',
      user_card_reverse: '',
      user_card_front:'',
      user_card:''
    };
  },
  created() {
    this.user = JSON.parse(window.localStorage.getItem("user"));
    this.token = window.localStorage.getItem("token");
    this.getlive()
  },
  mounted() {
    // this.user = JSON.parse(window.localStorage.getItem("user"));
    // this.token = window.localStorage.getItem("token");
    console.log(this.token);
    if (this.user) {
      this.iszb = this.user.iszb;
      this.user_nicename = this.user.user_nicename;
      this.sex = this.user.sex;
      this.birthday = this.user.birthday;
      this.user_email = this.user.user_email;
    }
  },

  methods: {
    handleClose() {
      this.$router.go(-1);
    },
    getlive() {
      console.log(111111111111)
      const data = {
        uid: this.user.id,
        token: this.token,
        source: "pc",
      };
      live_auth_info(data).then((res) => {
          this.name= res.info.name,
          this.user_card= res.info.user_card,
          this.user_card_front= res.info.user_card_front,
          this.user_card_reverse=res.info.user_card_reverse,
         this.params = {
          uid: this.user.id,
          token: this.token,
          name: res.info.name,
          user_card: res.info.user_card,
          user_card_front: res.info.user_card_front,
          user_card_reverse:res.info.user_card_reverse,
          is_auth: 1
        };
      });
    },
    abc() {
      UserApplyAnchor(this.params).then((res) => {

        })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传身份证正面图片只能是 png 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传身份证正面图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    is_uploader(type) {
      if (type == "show") {
        this.is_show = true;
      } else {
        this.is_show = false;
      }
    },
    handleAvatarSuccess2(res, file) {
      this.imageUrl2 = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload2(file) {
      const isJPG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传身份证反面图片只能是 png 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传身份证反面大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    is_uploader(type) {
      if (type == "show") {
        this.is_show = true;
      } else {
        this.is_show = false;
      }
    },


    cancel() {
      this.$router.push({ name: "myHome" });
    },
  },
};
</script>
<style lang="stylus" scoped>
/deep/.idcard {
  width: 220px;
  height: 140px;
}

/deep/.el-form-item {
  display: flex;
  color: #434A66;

  .xing {
    color: #FF5D5D;
    padding-right: 1px;
  }
}
</style>
<style lang="stylus">
#anchor {
  .el-dialog--center .el-dialog__body {
    padding: 0px 25px 4px;
  }

  .avatar-uploader {
    width: 220px;
    height: 140px;
    margin: 0 6px 20px 6px;
    position: relative;
  }

  /deep/.changephoto {
    position: absolute;
    bottom: 1px;
    left: 35px;
    z-index: 3;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  /deep/.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 220px;
    height: 140px;
    line-height: 140px;
    text-align: center;
  }

  /deep/.avatar {
    width: 220px;
    height: 140px;
    display: block;
  }

  h4 {
    font-size: 18px;
    font-weight: 600;
    border-left: 3px solid #ffc71c;
    padding-left: 10px;
    margin-bottom: 40px;
  }

  .baseInput {
    margin-bottom: 30px;

    >p {
      margin-bottom: 4px;
      font-size: 14px;
      color: #777;
    }
  }

  .el-form-item__content {
    display: flex;

    .el-input {
      margin-left: 8px;
    }
  }
}

.el-dialog--center {
  text-align: center;
  border: 1px solid #e6eaf3;
  border-radius: 9px;
}

.el-dialog .el-dialog__header {
  background: #E6EAF3 !important;
  border-radius: 9px 9px 0 0;
  font-weight: 800;
  padding: 12px 10px;
}

.el-input-group__append {
  border: 0;
  width: 94px;
  height: 32px;
  opacity: 1;
  background: #e6eaf3;
  border-radius: 4px;
}

.code {
  .el-input__inner {
    height: 36px;
    line-height: 36px;
    width: 180px;
  }
}
</style>
