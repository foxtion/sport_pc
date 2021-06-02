<template>
  <div id="myHome">
    <div class="myHome-b">
      <h4 class="hfour"><span>我的资料</span></h4>
      <div class="myxsizi">
        <h3 class="tabbody">
          贵族专属<span class="tabtit"
            >五大贵族 显赫身份 尊贵特权 奢华福利</span
          >
        </h3>
        <div class="imgbg"></div>
      </div>
      <div class="myxsizi">
        <h3 class="tabbody">账号设置</h3>
        <div class="settinguser">
          <ul>
            <li>
              <div class="li-l li01"></div>
              <div class="li-c">
                <p class="p1">
                  当前手机号：<span>{{ $store.state.user.info.mobile }}</span>
                </p>
                <p class="p2">您可以享受手机相关的安全及提醒服务</p>
              </div>
              <div class="li-r" @click="$router.push({ name: 'changePhone' })">
                修改手机号
              </div>
            </li>
            <li>
              <div class="li-l li02"></div>
              <div class="li-c">
                <p class="p1">登录密码</p>
                <p class="p2">保障您的账号安全</p>
              </div>
              <div
                class="li-r"
                @click="$router.push({ name: 'changePassword' })"
              >
                修改密码
              </div>
            </li>
            <li>
              <div class="li-l li03"></div>
              <div class="li-c">
                <p class="p1" v-if="isAccountBank">银行卡已绑定</p>
                <p class="p1" v-else>银行卡未绑定</p>
                <p class="p2">完善银行卡信息，便于提取直播收益</p>
              </div>
              <div class="li-r" v-if="isAccountBank" @click="tokefu">
                已绑定
              </div>
              <div class="li-r" v-else @click="$router.push({ name: 'bindBankCard' })">
                绑定银行卡
              </div>
            </li>
            <li>
              <div class="li-l li04"></div>
              <div class="li-c">
                <p class="p1">暂未设置支付密码</p>
                <p class="p2">保障您的账号资金安全，便于提取收益</p>
              </div>
              <div class="li-r" @click="$router.push({ name: 'SecurityPass' })">
                设置密码
              </div>
            </li>
            <li>
              <div class="li-l li05"></div>
              <div class="li-c">
                <p class="p1">
                  {{
                    $store.state.user.isauth.is_auth === "1"
                      ? "已实名"
                      : "尚未实名认证"
                  }}
                </p>
                <p class="p2">认证后可申请直播间</p>
              </div>
              <div class="li-r" @click="shimin">
                {{
                  $store.state.user.isauth.is_auth === "1"
                    ? "已认证"
                    : "立即认证"
                }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { UploadPictures, GetUserinfo, UserAccount ,IsAuth} from "@/api";
export default {
  name: "myHome",
  data() {
    return {
      avatar: "",
      user: {},
      baseImage: "",
      is_show: false,
      token: "",
      activeName: "first",
      isAccountBank: false
    };
  },
  mounted() {
    let user = JSON.parse(window.localStorage.getItem("user"));
    this.token = window.localStorage.token;
    console.log(window.localStorage);
    if (user) {
      this.user = user.id;
      this.avatar = this.user.avatar;
    } else {
      this.$router.push({ name: "/" });
    }
    // this.getUserinfo()
    // this.getIsAuth()
    this.getuserAccount()
  },
  created() {
    console.log(this.$store.state.user, 88888)
  },
  methods: {
     getIsAuth(){
      const params = {
        uid:this.user.id,
        token:this.token,
        source:'pc'

      }
      IsAuth(params).then(res=>{
        console.log(res)
        this.$store.commit('isAuth',res.info)
      })
    },
    tokefu() {
      this.$confirm("已绑定，修改请联系在线客服", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
        })
        .catch(() => {
        });
    },
     getuserAccount() {
      let user = JSON.parse(window.localStorage.getItem("user"));
      const params = {
        uid: user.id,
        token: this.token,
      };
      UserAccount(params).then((res) => {
        if (res.info.account_bank) {
          this.isAccountBank = true
        }
      });
    },
    //充值
    handleClick(tab, event) {
      console.log(tab, event);
    },
    shimin(){
      if( this.$store.state.user.isauth.is_auth !== "1"){
        this.$router.push({ name: 'realName' })
      }
    },
    withdrawal() {},
    getUserinfo() {
      const params = {
        uid: this.user,
        token: this.token,
        source: "pc",
      };
      console.log(params);
      GetUserinfo(params).then((res) => {
        console.log(res);
      });
    },

    is_uploader(type) {
      if (type == "show") {
        this.is_show = true;
      } else {
        this.is_show = false;
      }
    },

    uploader() {
      this.$refs.avatar.click();
    },

    uploadfile(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      let that = this;
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = function (e) {
        that.baseImage = e.target.result;
      };

      setTimeout(() => {
        var data = {
          uid: that.user.id,
          file: that.baseImage,
        };
        this.Upload_Pictures(data);
      }, 1000);
    },

    async Upload_Pictures(data) {
      let res = await UploadPictures(data);
      if (res.code == 0) {
        this.user.avatar = res.info.avatar;
        this.user.avatar_thumb = res.info.avatar_thumb;
        this.avatar = res.info.avatar;
        window.localStorage.setItem("user", JSON.stringify(this.user));
        this.$message({
          message: res.msg,
          type: "success",
        });
      } else {
        this.$message({
          message: res.msg,
          type: "warning",
        });
      }
    },
  },
};
</script>

<style lang="stylus">
.getjinbi {
  color: #333;

  .title {
    margin-left: 5px;
    margin-bottom: 26px;
    font-size: 18px;
    font-weight: 600;
  }

  .conlist {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    img {
      width: 50px;
      margin-right: 10px;
    }

    p:first-child {
      font-size: 14px;
      font-weight: 600;
      color: #000;
      margin-bottom: 4px;
    }

    p:last-child {
      font-size: 12px;
      color: #777;
    }
  }
}

#myHome {
  .myHome-top {
    position: relative;
    height: 180px;
    padding: 20px 0px 0px 20px;

    .change-detail {
      position: absolute;
      float: right;
      width: 76px;
      height: 32px;
      top: 35px;
      right: 59px;
      line-height: 32px;
      border-radius: 4px;
      border: 1px solid #bcbcbc;
      font-size: 14px;
      color: #777;
      text-align: center;
      cursor: pointer;
      z-index: 200;
    }

    .change-detail:hover {
      color: #f8c21b;
      border: 1px solid #f8c21b;
    }

    .myHome-detail {
      position: relative;

      .user_details {
        width: 80%;
        height: 150px;
        position: absolute;
        left: 150px;
      }

      .fileImage {
        display: none;
      }

      .avatar-uploader {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background: #33333382;
        position: absolute;
        top: 20px;
        left: 10px;
        cursor: pointer;
        z-index: 100;

        .tips {
          margin: 55px 0px 0px 35px;
          display: block;
          color: #ffcd00;
          font-size: 12px;
          letter-spacing: 1px;
        }
      }

      .user_avatar {
        width: 100px;
        height: 100px;
        margin: 30px 30px 10px 20px;
        float: left;
        cursor: pointer;
        border-radius: 50%;
      }

      .nickname {
        width: 80%;
        font-size: 24px;
        font-weight: bold;
        float: left;
        margin: 25px 20px 10px 0px;
        height: 30px;
        line-height: 30px;
      }

      .lv-progress-box {
        margin-bottom: 10px;
        justify-content: center;
        align-items: center;
        width: 85%;
        float: left;

        .level {
          width: 50px;
          position: relative;
          top: 5px;
          margin-right: 5px;
        }

        .el-progress {
          margin: 6px 5px 0 20px;
        }

        .el-progress__text {
          display: none;
        }

        >div {
          float: left;
          height: 30px;
          line-height: 30px;
        }

        >span {
          font-size: 14px;
          font-weight: 600;
          color: #777;
        }
      }

      .sudoku {
        height: 30px;
        line-height: 30px;
        width: 85%;
        float: left;

        li {
          float: left;
          width: 20%;

          p:first-child {
            font-size: 20px;
            font-weight: 600;
          }

          p:last-child {
            font-size: 16px;
            color: #777;
          }
        }
      }
    }
  }

  .myHome-b {
    // padding: 0 20px;
    // width: 1000px;
    height: auto;
    box-sizing: border-box;

    .myxsizi {
      margin-top: 16px;
      padding-left: 20px;

      .tabbody {
        font-size: 14px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        text-align: LEFT;
        color: #333333;

        .tabtit {
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          text-align: LEFT;
          color: #666666;
          margin-left: 16px;
        }
      }

      .imgbg {
        width: 976px;
        height: 90px;
        background: url('../assets/img/gzzs.png');
        margin-top: 12px;
      }

      .settinguser {
        margin-top: 6px;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            width: 468px;
            height: 80px;
            opacity: 1;
            background: #f6f9ff;
            padding: 20px;
            margin: 8px 0;
            box-sizing: border-box;
            display: flex;

            .li-l {
              width: 48px;
              height: 48px;
              opacity: 1;
              background: #ececec;
              border-radius: 50%;
              margin-top: -5px;
            }

            .li01 {
              background: url('../assets/img/shouji.png');
              background-size: 100% 100%;
            }

            .li02 {
              background: url('../assets/img/mima.png');
              background-size: 100% 100%;
            }

            .li03 {
              background: url('../assets/img/ziyuan.png');
              background-size: 100% 100%;
            }

            .li04 {
              background: url('../assets/img/zhifumima.png');
              background-size: 100% 100%;
            }

            .li05 {
              background: url('../assets/img/cedaohang-kehuguanli.png');
              background-size: 100% 100%;
            }

            .li-c {
              flex: 1;
              margin-left: 12px;

              .p1 {
                font-size: 14px;
                font-family: PingFang SC, PingFang SC-Regular;
                font-weight: 400;
                text-align: LEFT;
                color: #333333;

                span {
                  color: #76809c;
                }
              }

              .p2 {
                font-size: 14px;
                font-family: PingFang SC, PingFang SC-Regular;
                font-weight: 400;
                text-align: LEFT;
                color: #76809c;
                margin-top: 8px;
              }
            }

            .li-r {
              width: 94px;
              height: 30px;
              opacity: 1;
              background: #ffffff;
              border: 1px solid rgba(118, 128, 156, 0.5);
              border-radius: 51px;
              font-size: 14px;
              font-family: PingFang SC, PingFang SC-Regular;
              font-weight: 400;
              text-align: center;
              line-height: 30px;
              color: #76809c;

              &:hover {
                background: linear-gradient(90deg, #eccbab, #dbb16f 100%);
                border-radius: 50px;
                border: 0;
                color: #693D12;
                cursor: pointer;
              }
            }
          }

          li:nth-of-type(2n) {
            margin-left: 24px;
          }
        }
      }
    }
  }

  .myHome-bottom {
    margin: 0 50px 156px;
    border-top: solid 1px #eaeaea;
    clear: both;

    .title {
      margin: 50px auto 24px 3px;
      font-size: 24px;
      font-weight: 600;
      letter-spacing: 1px;
    }

    .zhgl {
      display: flex;
      justify-content: space-between;

      >div {
        width: 406px;
        padding: 26px 34px 26px 30px;
        border-radius: 4px;
        border: 1px solid #ddd;
        margin-bottom: 10px;

        img {
          float: left;
          width: 64px;
          height: 64px;
          margin-right: 10px;
        }

        .text {
          float: left;
          margin-top: 10px;

          span:first-child {
            display: inline-block;
            margin-bottom: 6px;
            font-size: 16px;
            font-weight: 600;
          }

          span:last-child {
            font-size: 12px;
            color: #777;
          }
        }

        .btn {
          float: right;
          width: 68px;
          height: 26px;
          font-size: 12px;
          margin-top: 19px;
          line-height: 26px;
          text-align: center;
          background: #ffc71c;
          border-radius: 2px;
          cursor: pointer;
          color: #fff;
        }
      }
    }
  }
}

.tab-first {
  font-size: 14px !important;
  color: #333333 !important;
}

.hfour {
  font-size: 18px;
  font-weight: 600;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #e6eaf3;

  span {
    display: inline-block;
    font-size: 20px;
    font-family: PingFang SC, PingFang SC-Medium;
    font-weight: 600;
    text-align: center;
    color: #333333;
    height: 100%;
    border-bottom: 1px solid #dbb16f;
    line-height: 60px;
    margin-left: 20px;
  }
}
</style>
