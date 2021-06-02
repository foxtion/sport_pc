<template>
  <el-dialog
    title="实名认证"
    :center="true"
    :visible.sync="dialogVisible"
    width="880px"
    :close-on-click-modal="false"
    :before-close="handleClose"
  >
    <div id="realname">
      <el-form
        :model="registerForm"
        :rules="registerRule"
        ref="registerForm"
        style="width: 820px; margin: 30px auto"
      >
        <el-form-item prop="name">
          <a class="xing">*</a>真实姓名:
          <el-input
            v-model="registerForm.name"
            placeholder="请输入真实姓名"
            style="width: 180px; margin-left: 22px"
          ></el-input>
        </el-form-item>
        <el-form-item prop="user_card">
          <a class="xing">*</a>身份证号码:
          <el-input
            v-model="registerForm.user_card"
            placeholder="请输入身份证号码"
            style="width: 330px"
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
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar idcard" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <a class="changephoto">点击选择身份证正面图片</a>
            </el-upload>
          </div>
          <div>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess2"
              :before-upload="beforeAvatarUpload2"
            >
              <img v-if="imageUrl2" :src="imageUrl2" class="avatar idcard" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <a class="changephoto">点击选择身份证反面图片</a>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item prop="mobile">
          <a class="xing">*</a>输入手机号:
          <el-input
            v-model="registerForm.mobile"
            placeholder="请输入手机号码"
            style="width: 330px"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <a class="xing">*</a>输入验证码:
          <el-input
            v-model="registerForm.code"
            placeholder="请输入天宸网络验证码"
            style="width: 330px"
            class="code"
          >
            <template slot="append">
              <el-button
                type="info"
                @click="sendchecknum"
                :disabled="checkNumDisabled"
              >
                <span v-if="checkNumDisabled">{{ countDown }}秒后重试</span>
                <span v-else>获取验证码</span>
              </el-button>
            </template>
          </el-input>
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
              @click="registerSub('registerForm')"
            >
              确定绑定
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import { Getcode, UserApplyAnchor,GetUserinfo } from "@/api";
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
      registerRule: {
        mobile: [
          { required: true, message: "手机号码格式错误", trigger: "blur" },
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      checkNumDisabled: false,
      countDown: 60,
      timer: null,
      dialogVisible: true,
      imageUrl: "",
      imageUrl2: "",
      token: "",
    };
  },
  mounted() {
    this.user = JSON.parse(window.localStorage.getItem("user"));
    this.token = window.localStorage.getItem("token");
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
    getUserinfo() {
      const params = {
        uid: this.user.id,
        token: this.token,
        source: "pc",
      };
      GetUserinfo(params).then((res) => {
        this.$store.commit("userinfo", res.info);
        console.log(res.info);
      });
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
    registerSub(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // if (this.registerForm.checked) {
          if (this.registerForm.password != this.registerForm.confirm_pass) {
            this.$message({
              message: "两次输入的密码不一致",
              type: "warning",
            });
            return;
          }

          let data = {
            uid: this.user.id,
            token: this.token,
            user_card_front: this.imageUrl,
            user_card_reverse: this.imageUrl2,
            mobile: this.registerForm.mobile,
            code: this.registerForm.code,
            is_auth: 0,
            user_card: this.registerForm.user_card,
            name: this.registerForm.name,
            type: 1,
          };

          this.User_ApplyAnchor(data);
        }
      });
    },

    async User_ApplyAnchor(data) {
      let res = await UserApplyAnchor(data);
      console.log(res.code + res.msg);
      if (res.code == 0) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.getUserinfo();
        this.$router.push({ name: "myHome" });
      } else {
        this.$message({
          message: res.msg,
          type: "warning",
        });
        this.$router.push({ name: "myHome" });
      }
    },
    //获取验证码
    async sendchecknum() {
      if (this.$REGEXUTIL.isPhone(this.registerForm.mobile)) {
        const timer_COUNT = 60;
        if (!this.timer) {
          this.countDown = timer_COUNT;
          this.checkNumDisabled = true;
          this.timer = setInterval(() => {
            if (this.countDown > 0 && this.countDown <= timer_COUNT) {
              this.countDown--;
            } else {
              this.checkNumDisabled = false;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }

        let sign = this.$md5(
          "mobile=" + this.registerForm.mobile + "&" + envconfig.CODE_SALT
        );

        let data = {
          mobile: this.registerForm.mobile,
          sign: sign,
          type: 3,
        };

        let res = await Getcode(data);
        console.log(res.code + res.msg);
        if (res.code == 0) {
          this.$message({
            message: res.msg,
            type: "success",
          });
        } else {
          this.$message.error(res.msg);
          this.checkNumDisabled = false;
          clearInterval(this.timer);
          this.timer = null;
        }
      } else {
        this.$message.error("请输入有效手机号");
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
#realname {
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
