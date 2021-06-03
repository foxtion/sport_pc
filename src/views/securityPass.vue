<template>
  <el-dialog
    title="设置支付密码"
    :center="true"
    :visible.sync="dialogVisible"
    width="668px"
    :close-on-click-modal="false"
    :before-close="handleClose"
  >
    <div id="securitypass">
      <el-form
        :model="registerForm"
        :rules="registerRule"
        ref="registerForm"
        style="width: 668px; margin: 30px auto"
      >
        <el-form-item prop="password">
          <a class="xing">*</a>设置新密码:
          <el-input
            v-model="registerForm.password"
            show-password
            placeholder="输入新密码"
            style="width: 330px"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <a class="xing">*</a>确认新密码:
          <el-input
            v-model="registerForm.confirm_pass"
            show-password
            placeholder="重复输入新密码"
            style="width: 330px"
          ></el-input>
        </el-form-item>
        <el-form-item prop="mobile">
          <a class="xing">*</a>当前手机号:
          <div style="width: 330px; padding-left: 12px; margin-left: 8px">
            {{ registerForm.mobile }}
          </div>
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
          <div style="margin-left:255px">
            <el-button
              type="primary"
              style="
                background: linear-gradient(90deg, #eccbab, #dbb16f 100%);
                border-color: #f8c21b;
                width: 108px;
                height: 40px;
                font-size: 16px;
                font-weight: 400;
              "
              @click="registerSub('registerForm')"
            >
              确定
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import { Getcode, SecurityPass,GetUserinfo } from "@/api";
import envconfig from "../server/config.js";
export default {
  name: "SecurityPass",
  data() {
    return {
      registerForm: {
        mobile: "",
        code: "",
        username: "",
        password: "",
        mobile: "",
        checked: false,
      },
      registerRule: {
        mobile: [
          { required: true, message: "手机号码格式错误", trigger: "blur" },
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        username: [
          { required: true, message: "请输入密码不少于6位", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入相同的密码", trigger: "blur" },
        ],
      },
      checkNumDisabled: false,
      countDown: 60,
      timer: null,
      dialogVisible: true,
      token: "",
    };
  },
  mounted() {
    this.user = JSON.parse(window.localStorage.getItem("user"));
    this.token = window.localStorage.getItem("token");
    this.registerForm.mobile = this.user.mobile;
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
    GetUserinfo() {
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
    registerSub(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
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
            pass: this.registerForm.password,
            mobile: this.registerForm.mobile,
            code: this.registerForm.code,
            type: 1,
          };

          this.user_register(data);
        }
      });
    },

    async user_register(data) {
      let res = await SecurityPass(data);
      console.log(res.code + res.msg);
      if (res.code == 200) {
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.GetUserinfo()
        setTimeout(() => {
          this.$router.push({ name: "myHome" });
        }, 1000);
      } else {
        this.$message({
          message: res.msg,
          type: "warning",
        });
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

<style lang="stylus">
#securitypass {
  .el-dialog--center .el-dialog__body {
    padding: 0px 25px 4px;
  }

  h4 {
    font-size: 18px;
    font-weight: 600;
    border-left: 3px solid #ffc71c;
    padding-left: 10px;
    margin-bottom: 40px;
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
  margin: 10px 0 5px -54px;
}

.code {
  .el-input__inner {
    height: 36px;
    line-height: 36px;
    width: 180px;
  }
}
</style>
