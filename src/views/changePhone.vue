<template>
  <el-dialog
    title="更换手机"
    :center="true"
    :visible.sync="dialogVisible"
    width="668px"
    :close-on-click-modal="false"
    :before-close="handleClose"
  >
    <div id="changePhone">
      <el-form
        :model="loginForm"
        :rules="loginRule"
        ref="loginForm"
        style="width: 668px; margin: 30px auto"
        v-show="active == 0"
      >
        <el-form-item prop="mobile">
          <a class="xing">*</a>当前手机号:
          <div style="width: 330px; padding-left: 12px; margin-left: 8px">
            {{ $store.state.user.info.mobile }}
          </div>
        </el-form-item>
        <el-form-item prop="mobile">
          <a class="xing">*</a>输入手机号:
          <el-input
            v-model="loginForm2.mobile"
            placeholder="输入新手机号码"
            style="width: 330px"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <a class="xing">*</a>输入验证码:
          <el-input
            v-model="loginForm.code"
            placeholder="输入验证码"
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
          <div style="margin-left: 255px;">
            <el-button
              type="primary"
              style="
                width: 100%;
                background: linear-gradient(90deg, #eccbab, #dbb16f 100%);
                border-color: #f8c21b;
                width: 108px;
                height: 40px;
                font-size: 16px;
                font-weight: 400;
              "
              @click="xiayibu('loginForm')"
            >
              绑 定
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import envconfig from "../server/config.js";
import { Getcode, ChangeMobile, GetUserinfo } from "@/api";
export default {
  name: "changePhone",
  data() {
    return {
      active: 0,
      loginForm: {
        mobile: "",
        code: "",
      },
      loginRule: {
        mobile: [
          { required: true, message: "手机号码格式错误", trigger: "blur" },
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      checkNumDisabled: false,
      countDown: 60,
      timer: null,
      loginForm2: {
        mobile: "",
        code: "",
      },
      loginRule2: {
        mobile: [
          { required: true, message: "手机号码格式错误", trigger: "blur" },
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      checkNumDisabled2: false,
      countDown2: 60,
      timer2: null,
      dialogVisible: true,
      user: {},
      token:''
    };
  },
  created() {
    this.token = window.localStorage.getItem("token");
  },
  mounted() {
    this.user = JSON.parse(window.localStorage.getItem("user"));
    this.loginForm.mobile = this.user.mobile;
  },

  methods: {
    handleClose() {
      this.$router.go(-1);
    },
    goBack() {
      this.$router.go(-1);
    },
    async sendchecknum() {
      if (this.$REGEXUTIL.isPhone(this.loginForm.mobile)) {
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
          "mobile=" + this.loginForm.mobile + "&" + envconfig.CODE_SALT
        );

        let data = {
          mobile: this.loginForm.mobile,
          sign: sign,
          type: 1,
        };

        let res = await Getcode(data);
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
    async sendchecknum2() {
      if (this.$REGEXUTIL.isPhone(this.loginForm2.mobile)) {
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
          "mobile=" + this.loginForm2.mobile + "&" + envconfig.CODE_SALT
        );

        let data = {
          mobile: this.loginForm2.mobile,
          sign: sign,
          type: 1,
        };

        let res = await Getcode(data);
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

    xiayibu(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            uid: this.user.id,
            mobile: this.loginForm2.mobile,
            code: this.loginForm.code,
            token: this.token,
            type: 1,
          };

          if (this.loginForm.mobile == "") {
            this.$message({
              message: "请输入手机号码",
              type: "warning",
            });
            return;
          }

          if (this.loginForm.code.length < 6) {
            this.$message({
              message: "请输入有效验证码",
              type: "warning",
            });

            return;
          }
          this.change_mobile(data, 0);
        }
      });
    },

    async change_mobile(data, type) {
      let res = await ChangeMobile(data);
      if (type == 0) {
        if (res.code == 0) {
          this.active = 1;
          this.$message({
            message: res.msg,
            type: "success",
          });
          this.getUserinfo();
          this.dialogVisible = false
          this.goBack();
        } else {
          this.$message.error(res.msg);
        }
      } else {
        if (res.code == 0) {
          this.$message({
            message: res.msg,
            type: "success",
          });

          this.user.mobile = this.loginForm2.mobile;
          window.localStorage.setItem("user", JSON.stringify(this.user));
          setTimeout(() => {
            this.$router.push({ name: "myHome" });
          }, 1000);
        } else {
          this.$message.error(res.msg);
        }
      }
    },
  },
};
</script>

<style lang="stylus">
#changePhone {
  /deep/ .el-dialog--center .el-dialog__body {
    padding: 0px 25px 4px;
  }

  h4 {
    cursor: pointer;
    margin-bottom: 40px;
  }

  .el-steps {
    width: 90%;
  }

  /deep/.el-form-item {
    display: flex;
    justify-content: center;
    color: #434A66;
    font-weight: 400;
    margin-bottom: 16px;

    .xing {
      color: #FF5D5D;
      padding-right: 1px;
    }
  }
}

.el-dialog .el-dialog__header {
  background: #E6EAF3 !important;
  border-radius: 9px 9px 0 0;
  font-weight: 800;
  padding: 12px 10px;
}

.el-dialog--center {
  text-align: center;
  border-radius: 9px;
}

.el-dialog__headerbtn .el-dialog__close {
  color: #909399;
  font-size: 24px;
}

.el-form-item__content {
  display: flex;

  .el-input {
    margin-left: 8px;
  }
}

.code {
  .el-input__inner {
    height: 36px;
    line-height: 36px;
    width: 180px;
  }
}


.el-button--info {
  border: 0;
  height: 32px;
}

.el-input-group__append {
  border: 0;
  width: 94px;
  height: 32px;
  opacity: 1;
  background: #e6eaf3;
  border-radius: 4px;
}
</style>
