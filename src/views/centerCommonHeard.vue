<template>
  <div id="content_center">
    <div id="myHome">
      <div class="content_l">
        <img :src="$store.state.user.info.avatar" alt="" />
        <span @click="uploader"></span>
        <input
          type="file"
          @change="uploadfile"
          ref="avatar"
          class="fileImage"
        />
      </div>
      <div class="content_val">
        <div class="setname">
          <i class="dengji"></i
          ><span>{{ $store.state.user.info.nick_name }}</span>
          <i class="xiugai"></i>
        </div>
        <p class="signature">{{ $store.state.user.info.signature }}</p>
        <div class="jdutiao">
          <span><i></i>{{ $store.state.user.info.level }}</span>
          <div style="width: 100%; position: absolute; left: 55px; top: 0px">
            <el-progress
              :text-inside="true"
              color="#F1D5B6"
              background-color="#E0B47E "
              :stroke-width="12"
              :percentage="50"
            ></el-progress>
          </div>
        </div>
        <div class="coin">
          我的钱包：<i class="coinlogo"></i>
          <span>龙钻 {{ $store.state.user.info.coin }} </span>
          <span class="tixian"
            >可提现龙钻 {{ $store.state.user.info.coin }} <i class="tishi"></i
          ></span>

          <span class="paybtn" @click="$router.push({ name: 'recharge' })"
            >充值</span
          >
          <span class="tixianbtn" @click="$router.push({ name: 'withDrawal' })"
            >提现</span
          >
        </div>
      </div>
      <div class="content_r">
        <span class="ican">我要直播</span>
        <span class="fensi">我的粉丝：<i>888</i></span>
      </div>
    </div>
  </div>
</template>

<script>
import { UploadPictures, GetUserinfo } from "@/api";
export default {
  name: "myHome",
  data() {
    return {
      avatar: "",
      user: {},
      baseImage: "",
      is_show: false,
      token: "",
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
    this.getUserinfo();
  },
  methods: {
    //充值
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
          token: this.$store.state.user.info.token,
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

<style lang="stylus" scoped>
#content_center {
  width: 100%;
  background: #fff;
}

#myHome {
  background: #fff;
  margin-bottom: 20px;
  height: 150px;
  padding: 20px;
  box-sizing: border-box;
  background: #fff;
  display: flex;
  width: 1000px;

  .content_l {
    width: 80px;
    height: 100%;
    position: relative;

    img {
      width: 80px;
      height: 80px;
      opacity: 1;
      border-radius: 4px;
      cursor: pointer;
    }

    span {
      position: absolute;
      top: 0;
      display: block;
      width: 80px;
      height: 80px;
      cursor: pointer;

      &:hover {
      }
    }

    .fileImage {
      display: none;
    }
  }

  .content_val {
    flex: 1;
    margin-left: 20px;

    .setname {
      .dengji {
        display: inline-block;
        width: 20px;
        height: 16px;
        background: url('../assets/img/di.png');
      }

      span {
        font-size: 18px;
        font-family: PingFang SC, PingFang SC-Medium;
        font-weight: 500;
        text-align: LEFT;
        color: #333333;
        margin: 0 8px 0 6px;
      }

      .xiugai {
        display: inline-block;
        width: 16px;
        height: 16px;
        background: url('../assets/img/bianji.png');
        cursor: pointer;
      }
    }

    .signature {
      font-size: 14px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      text-align: LEFT;
      color: #666666;
      margin: 8px 0 17px 0;
    }

    .jdutiao {
      width: 300px;
      position: relative;

      span {
        display: inline-block;
        width: 43px;
        height: 21px;
        line-height: 21px;
        color: #fff;
        background: url('../assets/img/1-10.png');
        border: 1px solid #acbfff;
        border-radius: 3px;
        text-align: center;
        margin-left: 4px;
        padding: 0 0 0 12px;
        font-size: 10px;
        position: relative;
      }
    }

    .coin {
      font-size: 14px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      text-align: LEFT;
      color: #333333;
      position: relative;
      margin-top: 11px;

      .coinlogo {
        display: inline-block;
        width: 18px;
        height: 19px;
        background: url('../assets/img/di.png');
        position: relative;
        top: 3px;
      }

      span {
        font-size: 14px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        text-align: LEFT;
        color: #76809c;
        margin-left: 6px;

        .tishi {
          display: inline-block;
          width: 16px;
          height: 16px;
          background: url('../assets/img/tishi.png');
          position: relative;
          top: 3px;
          cursor: pointer;
        }
      }

      .paybtn {
        display: inline-block;
        width: 54px;
        height: 20px;
        opacity: 1;
        background: linear-gradient(90deg, #f27a2e, #f15b43 100%);
        border-radius: 2px;
        font-size: 13px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        text-align: center;
        color: #ffffff;
        line-height: 20px;
        margin-left: 60px;
        cursor: pointer;
      }

      .tixianbtn {
        display: inline-block;
        width: 54px;
        height: 20px;
        line-height: 20px;
        opacity: 1;
        background: #748aff;
        border-radius: 2px;
        font-size: 13px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        text-align: center;
        color: #ffffff;
        margin-left: 10px;
        cursor: pointer;
      }
    }

    .tixian {
      margin-left: 40px !important;
    }
  }

  .content_r {
    width: 100px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    .ican {
      display: block;
      width: 88px;
      height: 34px;
      opacity: 1;
      background: #ffffff;
      border: 1px solid #dbb16f;
      border-radius: 5px;
      line-height: 34px;
      text-align: center;
      font-size: 16px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      text-align: CENTER;
      color: #dbb16f;
      cursor: pointer;
    }

    .fensi {
      font-size: 14px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      text-align: LEFT;
      color: #333333;

      i {
        font-style: normal;
        font-size: 14px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        text-align: LEFT;
        color: #76809c;
      }
    }
  }
}
</style>