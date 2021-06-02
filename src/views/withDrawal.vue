<template>
  <div>
    <el-dialog
      title="提现"
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
          <el-form-item
            prop="account_bank"
            class="baseInput"
            style="margin-left: -36x"
          >
            <a class="xing">*</a>选择提现银行卡：
            <el-card class="box-card">
              <div class="text item">
                {{account_bank }}
              </div>
              <div class="text item">
                {{ identity_card }}
              </div>
              <div class="text item">
               {{name}}
              </div>
            </el-card>
          </el-form-item>
          <el-form-item prop="account" class="baseInput">
            <a class="xing">*</a>提现金额：
            <el-input
              v-model="loginForm.user_cardnum"
              placeholder="请输入提现金额"
              @blur="burchang()"
              style="width: 330px"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="idcard"
            class="baseInput"
            style="margin-left: -15px"
          >
            <a class="xing">*</a>资金安全码：
            <el-input
              v-model="loginForm.idcard"
              type="passward"
              placeholder="输入账号资金安全码"
              style="width: 330px"
              @blur="burchang()"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="idcard"
            class="baseInput"
            style="margin-left: -333px"
          >
            <a class="xing">*</a>实际到账金额：<span
              style="color: #dbb16f"

            >{{loginForm.user_cardnum}}</span
            >元
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :disabled="disabled"
              style="
                width: 108px;
                height: 40px;
                font-size: 16px;
                font-weight: 400;
              "
              :style="{
                background: disabled ? '#d5d5d5' : '#dbb16f  ',
                color: disabled ? '#ffffff' : '#693D12',
                border: disabled ? '1px solid #d5d5d5' : '1px solid #f8c21b',
              }"
              @click="xiayibu('loginForm')"
              >提现</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="formbot">
        <p>
          <span>平台抽取收益分成比列，</span
          >如：平台收益抽成比例为50%,主播提现收益10000.00龙钻，则平台抽取收益50%（5000.00），主播实际提现到账收益为5000.00，未计入提现手续费。
        </p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import envconfig from "../server/config.js";
import { extracCash, UserAccount } from "@/api";
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
      token: "",
      dialogVisible: true,
      checkNumDisabled: false,
      countDown: 60,
      loginForm: {
        user_bank: "", //银行卡
        account_bank: "", //金额
        idcard: "", //资金密码
      },
      disabled: true,
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
      user: {},
      token: "",
      identity_card: "",
      account_bank: "",
      account: "",
      name:''
    };
  },
  created() {},
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
    this.getuserAccount();
  },
  methods: {
     handleClose() {
      this.$router.go(-1);

    },
    getuserAccount() {
      const params = {
        uid: this.user.id,
        token: this.token,
      };
      UserAccount(params).then((res) => {
        if (res.code === 0) {
          this.identity_card = res.info.identity_card;
          this.account_bank = res.info.account_bank;
          this.account = res.info.account;
          this.name = res.info.name
        }
        console.log(res);
      });
    },
    burchang() {
      console.log("111");
      if (

        this.loginForm.user_cardnum &&
        this.loginForm.idcard
      ) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },

    handleClose() {
      this.$router.go(-1);
    },
    xiayibu(formName) {
      debugger;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = {
            uid: this.user.id,
            token: this.token,
            name: this.loginForm.user_bank,
            account: this. identity_card, //账户
            money:this.loginForm.user_cardnum,
            type: 3,
            name:this.name,
            bank_card:this.account_bank,
            secure_pass:this.loginForm.idcard,
            source:'pc'
          };
          extracCash(params).then((res) => {
            if (res.code == 0) {
              this.$message({
                message: res.msg,
                type: "success",
              });
              this.handleClose()
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
#myBank {
  padding: 0;

  >.el-dialog--center .el-dialog__body {
    padding: 25px 25px 0 25px;
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

  .baseInput {
    margin-bottom: 30px;
  }
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

.dute textarea {
  height: 100px;
}

.el-dialog--center .el-dialog__body {
  text-align: initial;
  padding: 5px 25px 30px;
}

.daozhan {
  position: relative;
  left: 0;
}

.active {
  width: 108px;
  height: 40px;
  opacity: 1;
  background: #d5d5d5;
  border-radius: 4px;
  font-size: 16px;
  font-family: PingFang SC, PingFang SC-Regular;
  font-weight: 400;
  text-align: center;
  color: #ffffff;
}

.formbot {
  width: 100%;
  height: 78px;
  background: #f8fafe;
  border: 1px solid #e6eaf3;
  padding: 20px;

  p {
    font-size: 14px;
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    text-align: left;
    line-height: 20px;
    color: #777;

    span {
      color: #333333;
    }
  }
}

.text {
  font-size: 14px;
}

/deep/ .el-card__body {
  padding: 5px 0 0 22px !important;
}

/deep/ .el-card {
  background: #f8f8f8;
}
/deep/.el-dialog--center {
  text-align: center;
  border-radius: 9px;
}
/deep/.el-dialog .el-dialog__header {
  background: #e6eaf3 !important;
  border-radius: 9px 9px 0 0;
  font-weight: 800;
  padding: 12px 10px;
}
.item {
  height: 30px;
  color: #666;
}

.box-card {
  width: 300px;
  height: 110px;
}

.el-dialog__body {
  padding: 0 !important;
}
</style>
