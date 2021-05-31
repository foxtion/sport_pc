<template>
  <div id="content_center">
    <div id="myHome">
      <div class="content_l">
        <img :src="$store.state.user.info.avatar" alt="" />
      </div>
      <div class="content_val">
        <div class="setname">
          <i class="dengji"></i
          ><span>{{ $store.state.user.info.nick_name }}</span>
          <i class="xiugai" @click="xiugai"></i>
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

          <!-- <span class="paybtn" @click="$router.push({ name: 'recharge' })" -->
          <span class="paybtn" @click="goRecharge"
            >充值</span
          >
          <!-- <span class="tixianbtn" @click="$router.push({ name: 'withDrawal' })" -->
          <span class="tixianbtn" @click="tixian">提现</span>
        </div>
      </div>
      <div class="content_r">
        <span class="ican" @click="Submit">我要直播</span>
        <span class="fensi">我的粉丝：<i>888</i></span>
      </div>
    </div>
    <el-dialog
      title="基础资料"
      :center="true"
      :visible.sync="dialogVisible"
      :auto-upload="false"
      :limit="1"
      width="668px"
      :close-on-click-modal="false"
      :before-close="handleClose"
      class="content_l"
    >
      <el-form
        :model="Form"
        ref="Form"
        style="
          width: 633px;
          margin: 30px auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        "
      >
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar photos" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <a class="changephoto">点击图片修改头像</a>
        </el-upload>
        <el-form-item prop="nick_name">
          用户昵称:
          <el-input
            v-model="Form.nick_name"
            placeholder="请输入昵称"
            style="width: 330px; margin-left: 8px"
          ></el-input>
        </el-form-item>
        <el-form-item prop="signature">
          <p>个性签名:</p>
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 5 }"
            v-model="Form.signature"
            placeholder="输入签名"
            style="width: 330px; margin-left: 8px"
            class="sign"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div style="width: 108px">
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
              @click="uploadfile"
            >
              确 定
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <fullMoney :rechargeShow="rechargeShow" @closeRecharge="closeRecharge"/>
  </div>
</template>

<script>
import { GetUserinfo,uploadPicturesBase64,changeNick } from "@/api";
import fullMoney from './fullMoney'
export default {
  name: "myHome",
  components: {
    fullMoney,
  },
  data() {
    return {
      avatar: "",
      user: {},
      baseImage: "",
      is_show: false,
      token: "",
      Form: {
        nick_name: this.$store.state.user.info.nick_name,
        signature: this.$store.state.user.info.signature,
      },
      dialogImageUrl: "",
      imageUrl: "",
      // loginRule: {
      //   mobile: [{ required: true, message: "手机号码格式错误", trigger: "blur" }],
      //   code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      // },
      dialogVisible: false,
      rechargeShow: false
    };
  },
  mounted() {
    this.user = JSON.parse(window.localStorage.getItem("user"));
    this.token = window.localStorage.token;
    this.getUserinfo();
  },
  methods: {

    goRecharge() {
      this.rechargeShow = true
      // this.$router.push({ name: 'recharge' })
    },
    closeRecharge() {
      this.rechargeShow = false
    },
    tixian(){
      if(!true){
        this.$router.push({ name: 'bindBankCard' })
      }
      else{
        this.$router.push({ name: 'withDrawal' })
      }
    },
    async Submit() {
      if (this.$store.state.user.isauth.is_auth === "1") {
        this.$router.push({ name: "liveSet" });
      } else {
        this.$router.push({ name: "realName" });
      }
    },
    //充值
    withdrawal() {},
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
      var images = URL.createObjectURL(file.raw);
      images = URL.createObjectURL(file.raw);
      this.imageUrl = this.imageUrlToBase64(images);
    },
    // 将图片转换为Base64
    imageUrlToBase64(img) {
      // 一定要设置为let，不然图片不显示
      let image = new Image();
      // 解决跨域问题
      image.setAttribute("crossOrigin", "anonymous");
      let image2 = img;
      image.src = image2;
      // image.onload为异步加载
      image.onload = () => {
        this.getImage(image);
      };
    },
    getImage(image) {
      let canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      let context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, image.width, image.height);
      let quality = 0.8;
      // 这里的dataurl就是base64类型
      this.imageUrl = canvas.toDataURL("image/jpeg", quality);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 png 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
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

    uploader() {
      this.$refs.avatar.click();
    },

    uploadfile(e) {
      setTimeout(() => {
        let data = {
          source: "pc",
          uid: this.user.id,
          token: this.token,
          nick_name: this.Form.nick_name,
          signature: this.Form.signature,
        };
        this.change_Nick(data);
        this.updatephoto();
      }, 1000);
    },
    updatephoto() {
      setTimeout(() => {
        let data = {
          token: this.token,
          source: "pc",
          uid: this.user.id,
          file: this.imageUrl,
        };
        console.log(data, 0);
        if (data.file !== "") {
          this.upload_PicturesBase64(data);
        }
      }, 1000);
    },
    xiugai() {
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    async upload_PicturesBase64(data) {
      let res = await uploadPicturesBase64(data);
      if (res.code == 0) {
        window.localStorage.setItem("user", JSON.stringify(this.user));
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.getUserinfo();

        this.handleClose();
      } else {
        this.$message({
          message: res.msg,
          type: "warning",
        });
      }
    },
    async change_Nick(data) {
      let res = await changeNick(data);
      if (res.code == 0) {
        // this.user.avatar = res.info.avatar;
        // this.user.avatar_thumb = res.info.avatar_thumb;
        // this.avatar = res.info.avatar;
        window.localStorage.setItem("user", JSON.stringify(this.user));
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.getUserinfo();

        this.handleClose();
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
/deep/ .el-form-item__content {
  display: flex;
}

/deep/ .el-dialog--center {
  text-align: center;
  border: 1px solid #e6eaf3;
  border-radius: 9px;
}

/deep/.photos {
  width: 144px;
  height: 144px;
}

/deep/.el-form-item {
  display: flex;
  justify-content: center;
  color: #434A66;
}

/deep/ .el-dialog .el-dialog__header {
  background: #E6EAF3 !important;
  border-radius: 9px 9px 0 0;
  font-weight: 800;
  padding: 12px 10px;
}

/deep/.el-progress-bar__outer {
  height: 16px !important;
}
</style>
<style lang="stylus" scoped>
#content_center {
  width: 100%;
  background: #fff;
}

.sign {
  .el-input__inner {
    height: 90px;
  }
}

.avatar-uploader {
  width: 144px;
  height: 144px;
  border: 1px solid;
  margin-bottom: 40px;
  position: relative;
}

.changephoto {
  position: absolute;
  bottom: 1px;
  left: 16px;
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

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 144px;
  height: 144px;
  line-height: 144px;
  text-align: center;
}

.avatar {
  width: 144px;
  height: 144px;
  display: block;
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
    }

    span {
      position: absolute;
      top: 0;
      display: block;
      width: 80px;
      height: 80px;

      &:hover {
      }
    }

    .fileImage {
      display: none;
    }
  }

  .el-dialog--center {
    text-align: center;
    border: 1px solid #e6eaf3;
    border-radius: 9px;
  }

  .photos {
    width: 144px;
    height: 144px;
  }

  .el-form-item {
    display: flex;
    justify-content: center;
    color: #434A66;
  }

  .el-dialog .el-dialog__header {
    background: #E6EAF3 !important;
    border-radius: 9px 9px 0 0;
    font-weight: 800;
    padding: 12px 10px;
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

      .el-progress-bar__outer {
        height: 16px;
      }

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
        background: url('../assets/img/my_coin.png');
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
