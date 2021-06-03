<template>
  <el-dialog
    title="修改密码"
    :center="true"
    :visible.sync="dialogVisible"
    width="668px"
    :close-on-click-modal="false"
    :before-close="handleClose"
  >
    <div id="changePassword">
      <!-- <h4 @click="goBack"><i class="el-icon-arrow-left"></i>修改密码</h4> -->

      <el-form
        :model="loginForm2"
        :rules="loginRule"
        ref="loginForm2"
        style="width: 668px; margin: 30px auto"
        v-show="active == 0"
      >
        <!-- <el-form-item>
                <a class="xing">*</a>输入旧密码:
                <el-input v-model="loginForm2.past_pass" placeholder="请输入旧密码" show-password style="width: 330px"></el-input>
            </el-form-item> -->

        <el-form-item prop="pass">
          <a class="xing">*</a>设置新密码:
          <el-input
            v-model="loginForm2.pass"
            placeholder="输入新密码"
            show-password
            style="width: 330px"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password2">
          <a class="xing">*</a>确认新密码:
          <el-input
            v-model="loginForm2.confim_pass"
            placeholder="重复输入新密码"
            show-password
            style="width: 330px"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="line"></div>
        </el-form-item>
        <el-form-item prop="mobile">
          <a class="xing">*</a>当前手机号:
          <div style="width: 330px; padding-left: 12px; margin-left: 8px">
            {{ loginForm2.mobile }}
          </div>
        </el-form-item>
        <el-form-item prop="code">
          <a class="xing">*</a>短信验证码:
          <el-input
            v-model="loginForm2.code"
            placeholder="请输入验证码"
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
          <div style="width: 108px;margin-left: 255px;">
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
              @click="xiayibu('loginForm2')"
            >
              确 定
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import envconfig from "../server/config.js";
import { Getcode, ChangeMobile, ChangePass, GetUserinfo } from "@/api";
export default {
  name: "changePassword",
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
      loginForm2: {
        mobile: "",
        code: "",
        // past_pass: "",
        pass: "",
        confim_pass: "",
      },
      loginRule2: {
        pass: [
          { required: true, message: "请输入6-16位登录密码", trigger: "blur" },
        ],
      },
      checkNumDisabled: false,
      countDown: 60,
      dialogVisible: true,
      user: {},
      token: "",
    };
  },
  created() {
    this.token = window.localStorage.getItem("token");
  },
  mounted() {
    this.user = JSON.parse(window.localStorage.getItem("user"));
    this.loginForm2.mobile = this.user.mobile;
  },
  methods: {
    goBack() {
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
    handleClose() {
      this.$router.go(-1);
    },
    async sendchecknum() {
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
          token: this.token,
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
            code: this.loginForm2.code,
            token: this.token,
            type: 0,
          };

          if (this.loginForm2.mobile == "") {
            this.$message({
              message: "请输入手机号码",
              type: "warning",
            });
            return;
          }

          if (this.loginForm2.code.length < 6) {
            this.$message({
              message: "请输入有效验证码",
              type: "warning",
            });

            return;
          }
          this.bangding();
        }
      });
    },

    async change_mobile(data) {
      let res = await ChangeMobile(data);
      if (res.code == 0) {
      } else {
        this.$message.error(res.msg);
      }
    },

    bangding() {
      if (this.loginForm2.past_pass == "") {
        this.$message({
          message: "请输入旧密码",
          type: "warning",
        });
      }

      if (this.loginForm2.confim_pass == "") {
        this.$message({
          message: "请输入确认密码",
          type: "warning",
        });
      }

      if (this.loginForm2.pass != this.loginForm2.confim_pass) {
        this.$message({
          message: "密码不一致",
          type: "warning",
        });
      }

      let data = {
        uid: this.user.id,
        past_pass: this.loginForm2.past_pass,
        pass: this.loginForm2.pass,
        mobile: this.loginForm2.mobile,
        code: this.loginForm2.code,
        token: this.token,
        confim_pass: this.loginForm2.confim_pass,
      };
      this.change_pass(data);
    },

    async change_pass(data) {
      let res = await ChangePass(data);
      if (res.code == 0) {
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.getUserinfo()
        setTimeout(() => {
          this.$router.push({ name: "myHome" });
        }, 1000);
      } else {
        this.$message.error(res.msg);
      }
    },
  },
};
</script>

<style lang="stylus">
#changePassword {
  .el-dialog--center .el-dialog__body {
    padding: 0px 25px 4px;
  }

  h4 {
    cursor: pointer;
    margin-bottom: 40px;
  }

  .el-steps {
    width: 90%;
  }

  .el-form-item__content {
    display: flex;

    .el-input {
      margin-left: 8px;
    }
  }

  /deep/.el-form-item {
    display: flex;
    justify-content: center;
    color: #434A66;

    .xing {
      color: #FF5D5D;
      padding-right: 1px;
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

.line {
  border: 1px solid #e6eaf3;
  border-radius: 9px;
  width: 588px;
  margin: 10px 0 5px -26px;
}

.code {
  .el-input__inner {
    height: 36px;
    line-height: 36px;
    width: 180px;
  }
}
</style>
