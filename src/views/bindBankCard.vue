<template>
  <el-dialog
    title="绑定银行卡"
    :center="true"
    :visible.sync="dialogVisible"
    width="668px"
    :close-on-click-modal="false"
    :before-close="handleClose"
  >
    <div id="myBank">
      <el-form
        :model="loginForm"
        :rules="loginRule"
        ref="loginForm"
        style="width: 668px; margin: 30px auto"
      >
        <el-form-item prop="account_bank" class="baseInput">
          <a class="xing">*</a>开户银行:
          <el-input
            v-model="loginForm.user_bank"
            placeholder="例：中国银行"
            style="width: 330px"
          ></el-input>
        </el-form-item>
        <el-form-item prop="account" class="baseInput">
          <a class="xing">*</a>银行卡号:
          <el-input
            v-model="loginForm.user_cardnum"
            placeholder="请输入银行卡号"
            style="width: 330px"
          ></el-input>
        </el-form-item>
        <el-form-item prop="name" class="baseInput">
          <a class="xing">*</a>真实姓名:
          <el-input
            v-model="loginForm.name"
            placeholder="请输入真实姓名"
            style="width: 330px"
          ></el-input>
        </el-form-item>
        <el-form-item prop="idcard" class="baseInput">
          <a class="xing">*</a>身份证号:
          <el-input
            v-model="loginForm.idcard"
            placeholder="请输入身份证号码"
            style="width: 330px"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="line"></div>
        </el-form-item>
        <el-form-item prop="mobile">
          <a class="xing">*</a>当前手机号:
          <div style="width: 330px; padding-left: 12px; margin-left: 8px">
            {{ loginForm.mobile }}
          </div>
        </el-form-item>
        <el-form-item prop="code">
          <a class="xing">*</a>短信验证码:
          <el-input
            v-model="loginForm.code"
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
            @click="xiayibu('loginForm')"
            >确定绑定</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import envconfig from "../server/config.js";
import { Getcode, UserBindAccount, GetUserinfo } from "@/api";
export default {
  name: "bindBankCard",
  data() {
    return {
      sex: "0",
      birthday: "",
      user_email: "",
      notice: "",
      start_live_remind: "1",
      start_game_remind: "1",
      small_window_play: "1",
      iszb: "0",
      user: {},
      // user_bank:"",
      // user_bankcity:"",
      // user_cardnum:"",
      token: "",
      dialogVisible: true,
      checkNumDisabled: false,
      countDown: 60,
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
      name: "",
      user_cardnum: "",
      user_bank: "",
      idcard: "",
    };
  },
  created() {
    this.token = window.localStorage.getItem("token");
  },
  mounted() {
    this.user = JSON.parse(window.localStorage.getItem("user"));
    this.token = window.localStorage.getItem("token");
    this.loginForm.mobile = this.user.mobile;
    if (this.user) {
      this.iszb = this.user.iszb;
      // this.user_nicename = this.user.user_nicename;
      this.sex = this.user.sex;
      this.birthday = this.user.birthday;
      this.user_email = this.user.user_email;
    }
  },
  methods: {
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
          "mobile" + this.loginForm.mobile + "&" + envconfig.CODE_SALT
        );

        let data = {
          mobile: this.loginForm.mobile,
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
    handleClose() {
      this.$router.push({ name: "myHome" });
    },
    xiayibu(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            uid: this.user.id,
            mobile: this.loginForm.mobile,
            code: this.loginForm.code,
            type: 3,
            token: this.token,
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
          this.bangding();
        }
      });
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
    bangding() {
      if (this.loginForm.name == "") {
        this.$message({
          message: "请输入姓名",
          type: "warning",
        });
        return;
      }
      if (this.loginForm.idcard == "") {
        this.$message({
          message: "请输入身份证号",
          type: "warning",
        });
        return;
      }
      if (this.loginForm.user_cardnum == "") {
        this.$message({
          message: "请输入银行",
          type: "warning",
        });
        return;
      }
      if (this.loginForm.account == "") {
        this.$message({
          message: "请输入银行卡号",
          type: "warning",
        });
        return;
      }

      let data = {
        uid: this.user.id,
        mobile: this.loginForm.mobile,
        code: this.loginForm.code,
        token: this.token,
        type: 3,
        identity_card: this.loginForm.idcard,
        name: this.loginForm.name,
        account_bank: this.loginForm.user_bank,
        account: this.loginForm.user_cardnum,
      };
      this.change_bank(data);
    },
    async change_bank(data) {
      let res = await UserBindAccount(data);
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.getUserinfo();
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
#myBank {
  padding: 0;

  >.el-dialog--center .el-dialog__body {
    padding: 30px 25px 4px;
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

  .el-form-item {
    display: flex;
    justify-content: center;
    color: #434A66;

    .xing {
      color: #FF5D5D;
      padding-right: 1px;
    }
  }

  .baseInput {
    margin-bottom: 30px;
  }
}

.el-dialog .el-dialog__header {
  background: #E6EAF3 !important;
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

.line {
  border: 1px solid #e6eaf3;
  border-radius: 9px;
  width: 588px;
  margin: 10px 0 5px -54px;
}
</style>
