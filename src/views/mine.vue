<template>
  <div id="mine">
    <div class="content-mine">
      <span class="contentval">个人中心</span>
    </div>
    <div class="my-menu-wrapper">
      <ul>
        <li
          class="item"
          v-for="(item, i) in menu"
          :key="item.icon"
          :class="{ active: item.active }"
          @click="tabFn(item.name, i)"
        >
          <i :class="[item.icon]"></i>
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
    <div>
      <centerCommonHeard />
      <div class="center">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import centerCommonHeard from './centerCommonHeard'
export default {
  name: "mine",
  components: {
    centerCommonHeard,
  },
  data() {
    return {
      menu: [
        {
          name: "我的资料",
          active: true,
          icon: "datum",
        },
        {
          name: "站内信",
          active: false,
          icon: "xin",
        },
        {
          name: "我的关注",
          active: false,
          icon: "mysee",
        },
        {
          name: "我的等级",
          active: false,
          icon: "grade",
        },
        {
          name: "我的钱包",
          active: false,
          icon: "pay",
        },
        {
          name: "房间管理",
          active: false,
          icon: "room",
        },
        {
          name: "开播设置",
          active: false,
          icon: "setting",
        },
        {
          name: "申请主播",
          active: false,
          icon: "apply",
        },
        //{ name: "我的反馈", active: false,icon:'el-icon-postcard'},
        // { name: "我的资料", active: true, icon:'el-icon-user-solid'},
        // { name: "我的消息", active: false,icon:'el-icon-thumb' },
        // { name: "我的粉丝", active: false,icon:'el-icon-thumb' },
        // { name: "我的关注", active: false,icon:'el-icon-thumb' },
        // { name: "我的预约", active: false,icon:'el-icon-thumb' },
        // { name: "我的反馈", active: false,icon:'el-icon-thumb' },
        // { name: "我的礼物", active: false,icon:'el-icon-thumb' },
        // { name: "申请主播", active: false,icon:'el-icon-thumb' },
      ],
      user: {},
      token:''
    };
  },
  watch: {
    "$store.state.myCenterIndex": function () {
      this.menu.forEach((item, index) => {
        if (this.$store.state.myCenterIndex == index) {
          item.active = true;
        } else {
          item.active = false;
        }
      });
    },
  },
  mounted() {
    this.user = JSON.parse(window.localStorage.getItem("user"));
     this.token = window.localStorage.token;
     this.getUserinfo()
  },
  methods: {
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
    tabFn(val, i) {
      this.getUserinfo()
      switch (val) {
        /*case "我的首页":
                    this.$router.push({ name: "myProfile" });
                    break;*/
        case "我的资料":
          this.$router.push({ name: "myHome" });
          break;
        case "站内信":
          this.$router.push({ name: "message" });
          break;
        // case "我的粉丝":
        //     this.$router.push({ name: "myFans" });
        //     break;
        case "我的关注":
          this.$router.push({ name: "concern" });
          break;
        case "我的等级":
          this.$router.push({ name: "level" });
          break;
        // case "我的预约":
        //     this.$router.push({ name: "subscribe" });
        //     break;
        // case "我的反馈":
        //     this.$router.push({ name: "feedback" });
        //     break;
        // case "我的礼物":
        // this.$router.push({ name: "giftList" });
        // break;
        case "我的钱包":
          this.$router.push({ name: "myMoney" });
          break;
        case "房间管理":
          this.$router.push({ name: "Livelist" });
          break;
        case "开播设置":
          this.$router.push({ name: "liveSet" });
          break;
        case "申请主播":
          this.$router.push({ name: "applyAnchor" });
          break;
      }

      //console.log(i)

      this.menu.forEach((item, index) => {
        if (i == index) {
          item.active = true;
        } else {
          item.active = false;
        }
      });
    },
  },
};
</script>

<style lang="stylus">
#mine {
  width: 1200px;
  margin: 0 auto;
  margin-top: 75px;
  padding-top: 80px;
  display: flex;
  justify-content: space-between;
  // position: relative;
  padding-bottom 168px

  /* height :700px; */
  .content-mine {
    position: absolute;
    top: 0;
    height: 61px;
    width: 100%;
    background: #fff;

    .contentval {
      display: block;
      width: 168px;
      height: 100%;
      line-height: 61px;
      font-size: 24px;
      text-align: center;
      color: #333333;
      font-size: 24px;
      font-family: PingFang SC, PingFang SC-Heavy;
      font-weight: 800;
    }
  }

  .center {
    background: #fff;
    border: 1px solid #ccc;
    padding-bottom: 20px;
  }

  >div {
    border-radius: 8px;
  }

  >div:last-child {
    flex: 1;
    margin-left: 20px;
  }

  .my-menu-wrapper {
    box-shadow: 0px 0px 20px rgba(119, 119, 119, 0.16);
    border-radius: 8px;
    width: 168px;
    height: 400px;
    background: #fff;

    .item {
      width: 100%;
      height: 49px;
      line-height: 45px;
      font-size: 14px;
      background: #fff;
      cursor: pointer;
      letter-spacing: 1px;
      padding: 0 15px;

      i {
        display: inline-block;
        width: 23px;
        height: 23px;
        position: relative;
        top: 4px;
      }

      span {
        margin-left: 5px;
      }

      .datum {
        background: url('../assets/img/datum.png') no-repeat center;
        background-size: 100% 100%;
      }

      .xin {
        background: url('../assets/img/xin.png') no-repeat center;
        background-size: 100% 100%;
      }

      .mysee {
        background: url('../assets/img/mysee.png') no-repeat center;
        background-size: 100% 100%;
      }

      .grade {
        background: url('../assets/img/grade.png') no-repeat center;
        background-size: 100% 100%;
      }

      .pay {
        background: url('../assets/img/pay.png') no-repeat center;
        background-size: 100% 100%;
      }

      .room {
        background: url('../assets/img/room.png') no-repeat center;
        background-size: 100% 100%;
      }

      .setting {
        background: url('../assets/img/setting.png') no-repeat center;
        background-size: 100% 100%;
      }

      .apply {
        background: url('../assets/img/apply.png') no-repeat center;
        background-size: 100% 100%;
      }

      &:hover {
        color: rgb(191, 150, 90);

        .datum {
          background: url('../assets/img/datumactive.png') no-repeat center;
          background-size: 100% 100%;
        }

        .xin {
          background: url('../assets/img/xinactive.png') no-repeat center;
          background-size: 100% 100%;
        }

        .mysee {
          background: url('../assets/img/myseeactive.png') no-repeat center;
          background-size: 100% 100%;
        }

        .grade {
          background: url('../assets/img/gradeactive.png') no-repeat center;
          background-size: 100% 100%;
        }

        .pay {
          background: url('../assets/img/payactive.png') no-repeat center;
          background-size: 100% 100%;
        }

        .room {
          background: url('../assets/img/roomactive.png') no-repeat center;
          background-size: 100% 100%;
        }

        .setting {
          background: url('../assets/img/settingactive.png') no-repeat center;
          background-size: 100% 100%;
        }

        .apply {
          background: url('../assets/img/applyactive.png') no-repeat center;
          background-size: 100% 100%;
        }
      }
    }

    .item.title {
      height: 70px;
      font-size: 24px;
      font-weight: 600;
      cursor: default;
      position: relative;
      bottom: 5px;
      text-align: center;
      margin-left: 5px;
    }

    .item.boundary {
      border-top: 1px solid #ddd;
      border-radius: 4px;
      height: 10px;
    }

    .item.active {
      background: #ececec;
      color: #CC9F49;
      letter-spacing: 1px;
      border-left: 4px solid #DBB16F;
      background: #fff9f3;
      // background: linear-gradient(
      //   89.3179396068274deg,
      //   rgba(237, 205, 176, 1) 0%,
      //   rgba(218, 175, 107, 1) 100%
      // );

      .datum {
        background: url('../assets/img/datumactive.png') no-repeat center;
        background-size: 100% 100%;
      }

      .xin {
        background: url('../assets/img/datumactive.png') no-repeat center;
        background-size: 100% 100%;
      }

      .mysee {
        background: url('../assets/img/myseeactive.png') no-repeat center;
        background-size: 100% 100%;
      }

      .grade {
        background: url('../assets/img/gradeactive.png') no-repeat center;
        background-size: 100% 100%;
      }

      .pay {
        background: url('../assets/img/payactive.png') no-repeat center;
        background-size: 100% 100%;
      }

      .room {
        background: url('../assets/img/roomactive.png') no-repeat center;
        background-size: 100% 100%;
      }

      .setting {
        background: url('../assets/img/settingactive.png') no-repeat center;
        background-size: 100% 100%;
      }

      .apply {
        background: url('../assets/img/applyactive.png') no-repeat center;
        background-size: 100% 100%;
      }
    }

    .item i.active {
      margin-right: 5px;
      font-size: 26px;
      margin-left: 10px;
      color: #064dec;
    }

    .item i {
      margin-right: 5px;
      font-size: 26px;
      margin-left: 10px;
      color: #c3c5ca;
    }

    .item span {
      position: relative;
      bottom: 2px;
    }
  }
}
</style>
