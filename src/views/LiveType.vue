<template>
  <div class="liveTypewrapperinner">
    <div class="liveTypenav">
      <div class="liveTvtop">
        <ul>
          <li :class="{ tvactive: tvactive == 1 }" @click="liveTvlistChange(1)">
            <i :class="{ activebgimg: activebgimg == 1 }"></i><span>直播</span>
          </li>
          <li :class="{ tvactive: tvactive == 2 }" @click="liveTvlistChange(2)">
            <i :class="{ activebgimg: activebgimg == 2 }"></i><span>榜单</span>
          </li>
          <li :class="{ tvactive: tvactive == 3 }" @click="liveTvlistChange(3)">
            <i :class="{ activebgimg: activebgimg == 3 }"></i><span>关注</span>
          </li>
          <li :class="{ tvactive: tvactive == 4 }" @click="liveTvlistChange(4)">
            <i :class="{ activebgimg: activebgimg == 4 }"></i><span>赛程</span>
          </li>
          <li :class="{ tvactive: tvactive == 5 }" @click="liveTvlistChange(5)">
            <i :class="{ activebgimg: activebgimg == 5 }"></i><span>预约</span>
          </li>
        </ul>
      </div>
      <div class="liveTvbottom">
        <div class="liveTvbottomt"><span>分类</span></div>
        <ul>
          <!-- <li><span :class="{'classactive':classactive == 1}" @click="liveTvclassChange(1)">全部</span></li>
          <li><span :class="{'classactive':classactive == 2}" @click="liveTvclassChange(2)">足球</span></li>
          <li><span :class="{'classactive':classactive == 3}" @click="liveTvclassChange(3)">篮球</span></li>
          <li><span :class="{'classactive':classactive == 4}" @click="liveTvclassChange(4)">网球</span></li>
          <li><span :class="{'classactive':classactive == 5}" @click="liveTvclassChange(5)">电竞</span></li>
          <li><span :class="{'classactive':classactive == 6}" @click="liveTvclassChange(6)">其它</span></li> -->
          <li
            v-for="(item, index) in LiveClasslist"
            :key="item.id"
            @click="tabtype(item, index)"
          >
            <span :class="{ classactive: classactive === index }">
              {{ item.name }}
            </span>
          </li>
        </ul>
      </div>
      <!--      <span-->
      <!--        v-for="(item, i) in sendlist"-->
      <!--        :key="item.id"-->
      <!--        :class="{ active: item.active }"-->
      <!--        @click="tabFn(item, i)"-->
      <!--      >-->
      <!--        {{ item.name }}-->
      <!--        <b class="pa"></b>-->
      <!--      </span>-->
    </div>
    <div class="liveTvright">
      <router-view> </router-view>
    </div>
  </div>
</template>

<script>
import noData from "@/components/noData.vue";
import { LiveClass } from "@/api";
export default {
  name: "LiveType",
  components: {
    noData,
  },
  data() {
    return {
      LiveClasslist: [],
      sendlist: [],
      zhibo: [
        {
          pull: 111,
          thumb: 222,
          isrecommend: 1,
          title: "俄罗斯级联赛 克拉斯诺...",
          user_nicename: 44444,
          online: 5555,
        },
        {
          pull: 111,
          thumb: 222,
          isrecommend: 1,
          title: "俄罗斯乙级联赛 克拉斯诺...",
          user_nicename: 44444,
          online: 5555,
        },
        {
          pull: 111,
          thumb: 222,
          isrecommend: 1,
          title: "俄罗斯乙级联赛 克拉斯诺...",
          user_nicename: 44444,
          online: 5555,
        },
        {
          pull: 111,
          thumb: 222,
          isrecommend: 1,
          title: "俄罗斯乙级联赛 克拉斯诺...",
          user_nicename: 44444,
          online: 5555,
        },
        {
          pull: 111,
          thumb: 222,
          isrecommend: 1,
          title: "俄罗斯乙级联赛 克拉斯诺...",
          user_nicename: 44444,
          online: 5555,
        },
        {
          pull: 111,
          thumb: 222,
          isrecommend: 1,
          title: "俄罗斯乙级联赛 克拉斯诺...",
          user_nicename: 44444,
          online: 5555,
        },
        {
          pull: 111,
          thumb: 222,
          isrecommend: 1,
          title: "俄罗斯乙级联赛 克拉斯诺...",
          user_nicename: 44444,
          online: 5555,
        },
        {
          pull: 111,
          thumb: 222,
          isrecommend: 1,
          title: "俄罗斯乙级联赛 克拉斯诺...",
          user_nicename: 44444,
          online: 5555,
        },
      ],
      tvactive: 1,
      classactive: 0,
      activebgimg: 1,
    };
  },
  mounted() {
    this.$SERVER.getGameType().then((res) => {
      if (res.data.code == 0) {
        res.data.info.forEach((item, i) => {
          if (i == 0) {
            item.active = true;
            this.active = item.name;
            this.getzblist(item.id);
          } else {
            item.active = false;
          }
        });
        this.sendlist = res.data.info;
      }
    });
    this.getLiveClass();
  },
  methods: {
    // getzblist(id) {
    //   this.$SERVER.getLiveListByType(id, 1).then((res) => {
    //     if (res.data.code == 0) {
    //       this.zhibo = res.data.info;
    //     }
    //   });
    // },
    //获取直播分类
    getLiveClass() {
      let params = {
        source: "pc",
        type: "2",
      };
      LiveClass(params).then((res) => {
        console.log(res.info);
        res.info.map((item) => {
          this.LiveClasslist.push(item);
        });
      });
    },
    tabFn(val, i) {
      this.getzblist(val.id);
      this.sendlist.forEach((item, index) => {
        if (i == index) {
          item.active = true;
        } else {
          item.active = false;
        }
      });
    },
    tabtype(item, index) {
      this.classactive = index;
    },
    toLive(val) {
      this.$router.push({
        name: "liveRoom",
        query: { liveuid: val.uid, stream: val.stream },
      });
      /* if (window.localStorage.getItem("token")) {
      } else {
        this.$emit("denglu");
      } */
    },
    liveTvlistChange(index) {
      this.tvactive = index;
      this.activebgimg = index;
      if (index == 1) {
        this.$router.push({ name: "liveLists" });
      }
      if (index == 2) {
        this.$router.push({ name: "myList" });
      }
      if (index == 3) {
        this.$router.push({ name: "followList" });
      }
      if (index == 4) {
        this.$router.push({ name: "fixturelist" });
      }
      if (index == 5) {
        this.$router.push({ name: "reserve" });
      }
    },
    liveTvclassChange(index) {
      this.classactive = index;
    },
  },
};
</script>

<style lang="stylus">
.liveTypewrapperinner {
  width: 1750px;
  margin: 0 auto;
  position relative;
  height 474px
  .liveTypenav {
    border-width: 0px;
    position: absolute;
    left: 0px;
    top: 60px;
    width: 100px;
    height: 984px;
    background: -webkit-linear-gradient(90.1269007437983deg, rgba(109, 48, 55, 1) 0%, rgba(49, 58, 126, 1) 100%);
    background: -moz-linear-gradient(-0.126900743798345deg, rgba(109, 48, 55, 1) 0%, rgba(49, 58, 126, 1) 100%);
    background: linear-gradient(-0.126900743798345deg, rgba(109, 48, 55, 1) 0%, rgba(49, 58, 126, 1) 100%);
    border: none;
    border-radius: 0px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;

    .liveTvtop {
      height: 45%;

      >ul li.tvactive {
        background: url('../assets/img/ionilleft.svg');
        color: rgb(240, 198, 130);
      }

      >ul li:hover {
        background: url('../assets/img/ionilleft.svg');
        color: rgb(240, 198, 130);
        background-size: 100% 100%;
      }

      >ul li:first-child:hover >i {
        background: url('../assets/img/icontvleft1.png');
        background-size: 100% 100%;
      }

      >ul li:nth-child(2):hover >i {
        background: url('../assets/img/icontvleft3.png');
        background-size: 100% 100%;
      }

      >ul li:nth-child(3):hover >i {
        background: url('../assets/img/icontvleft4.png');
        background-size: 100% 100%;
      }

      >ul li:nth-child(4):hover >i {
        background: url('../assets/img/icontvleft2.png');
        background-size: 100% 100%;
      }

      >ul li:nth-child(5):hover >i {
        background: url('../assets/img/icontvleft2.png');
        background-size: 100% 100%;
      }

      >ul li:first-child >i.activebgimg {
        background: url('../assets/img/icontvleft1.png');
        background-size: 100% 100%;
      }

      >ul li:nth-child(2) >i.activebgimg {
        background: url('../assets/img/icontvleft3.png');
        background-size: 100% 100%;
      }

      >ul li:nth-child(3) >i.activebgimg {
        background: url('../assets/img/icontvleft4.png');
        background-size: 100% 100%;
      }

      >ul li:nth-child(4) >i.activebgimg {
        background: url('../assets/img/icontvleft2.png');
        background-size: 100% 100%;
      }

      >ul li:nth-child(5) >i.activebgimg {
        background: url('../assets/img/icontvleft2.png');
        background-size: 100% 100%;
      }

      >ul li {
        position: relative;
        border-width: 0;
        width: 100px;
        height: 45px;
        line-height: 32px;
        display: flex;
        font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
        font-weight: 700;
        font-style: normal;
        font-size: 14px;
        color: #AAAAAA;
        padding: 10px;
        margin: 10px 0;

        /* >img{ */
        /* border-width: 0px; */
        /* position: absolute; */
        /* left: 0px; */
        /* top: 0px; */
        /* width: 101px; */
        /* height: 45px; */
        /* } */
        /* >i:first-child{ */
        /*
        /*} */
        >i {
          width: 25px;
          height: 25px;
          margin-right: 7px;
          margin-left: 5px;
        }
      }

      >ul li:first-child >i {
        background: url('../assets/img/icontvleft.png');
        background-size: 100% 100%;
      }

      >ul li:nth-child(2) >i {
        background: url('../assets/img/iconlistleft.png');
        background-size: 100% 100%;
      }

      >ul li:nth-child(3) >i {
        background: url('../assets/img/iconlivelde.png');
        background-size: 100% 100%;
      }

      >ul li:nth-child(4) >i {
        background: url('../assets/img/icondataleft.png');
        background-size: 100% 100%;
      }

      >ul li:nth-child(5) >i {
        background: url('../assets/img/icondataleft.png');
        background-size: 100% 100%;
      }
    }

    .liveTvbottom {
      height: 55%;
      border-top: 1px solid slategray;

      .liveTvbottomt {
        align-self: center;
        padding: 2px 2px 2px 2px;
        box-sizing: border-box;
        width: 100%;
        font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
        font-weight: 700;
        font-style: normal;
        font-size: 14px;
        color: #AAAAAA;
        text-align: center;
        width: 100px;
        height: 45px;
        line-height: 45px;
      }

      >ul li {
        align-self: center;
        box-sizing: border-box;
        width: 100%;
        font-family: 'Arial Negreta', 'Arial Normal', 'Arial', sans-serif;
        font-weight: 700;
        font-style: normal;
        font-size: 14px;
        color: #AAAAAA;
        text-align: center;
        width: 100px;
        height: 45px;
        vertical-align: middle;
        display: flex;
        align-items: center;
        justify-content: center;

        >span {
          display: inline-block;
          width: 60px;
          height: 26px;
          border-radius: 4px;
          background-color: #7B7998;
          /* opacity: 0.9; */
          line-height: 26px;
        }
      }

      >ul li >span.classactive {
        color: #FACD91;
        border: 1px solid #FACD91;
      }

      >ul li >span:hover {
        color: #FACD91;
        border: 1px solid #FACD91;
      }
    }

    /* span { */
    /* cursor: pointer; */
    /* position: relative; */
    /* display: inline-block; */
    /* margin: 0 28px 24px; */
    /* font-size: 18px; */
    /* color: #777; */
    /* float: left; */
    /* height: 40px; */
    /* } */
    /* span.active { */
    /* bottom: 6px; */
    /* padding-bottom: 8px; */
    /* color: #000; */
    /* font-size: 24px; */
    /* font-weight: 600; */
    /* .pa { */
    /* position: absolute; */
    /* bottom: -7px; */
    /* width: 100%; */
    /* height: 6px; */
    /* left: 0; */
    /* right: 0; */
    /* border-radius: 3px; */
    /* border-bottom: 6px solid #ffb600; */
    /* border-bottom-color: #f8c21b !important; */
    /* } */
    /* } */
  }
  .liveTvright {
    border-width: 0px;
    position: absolute;
    left: 120px;
    top: 80px;
    width: 1600px;
    height: 960px;
    overflow-y: auto;
    .categoryinnercontent {
      li {
        width: 272px;
        margin: 0 20px 20px 0;
        background-color: #fff;
        display: inline-block;
        border-radius: 4px;
        cursor: pointer;

        >div {
          position: relative;
          cursor: pointer;
          width: 100%;
          height: 148px;
          transition: color 0.2s ease-out;

          .hotcontentimg {
            position: absolute;
            width: 100%;
            height: 148px;
            border-radius: 6px 6px 0 0;
          }

          .btn-open {
            opacity: 0;
            position: absolute;
            top: 50%;
            left: 50%;
            width: 44px;
            height: 44px;
            margin: -25px 0 0 -25px;
            background: url('~@/assets/icon-open@2x.png') no-repeat;
            background-size: 44px auto;
            -webkit-transform: scale(2);
            transform: scale(2);
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            -webkit-transition: all 0.25s ease-out;
            transition: all 0.25s ease-out;
          }

          .com {
            height: 0;
            width: 49px;
            border-top: 24px solid #218aff;
            border-right: 6px solid transparent;
            border-radius: 0 3px 9px 0;
            color: #fff;
            position: absolute;
            top: 10px;
            left: 0;
            right: 0;

            i {
              width: 45px;
              position: relative;
              top: -21px;
              left: 8px;
              font-size: 14px;
              font-style: normal;
              text-align: center;
            }
          }

          .comzu {
            height: 23px;
            width: 43px;
            color: #fff;
            position: absolute;
            top: 10px;
            right: 2px;
            border-radius: 5px;
            background-image: linear-gradient(to right, #F1D5B6, #CDAE8E);

            i {
              width: 45px;
              line-height: 23px;
              position: relative;
              left: 8px;
              font-size: 14px;
              font-style: normal;
              text-align: center;
            }
          }
        }

        .ellipsebottom {
          padding: 1px 12px;
          color: #777;
          line-height: 25px;
          font-weight: 400;

          .ellipsis {
            line-height: 20px;
            background: #fff;
            font-weight: 400;
            font-size: 16px;
            border-bottom-left-radius: 6px;
            border-bottom-right-radius: 6px;
            color: #000;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          .avatar {
            width: 43px;
            height: 43px;
            border-radius: 50%;
            float: left;
            padding-top: 2px;
            margin-right: 4px;
          }

          .num {
            background: url('~@/assets/icon-hot-gray.png') no-repeat 0;
            padding-left: 15px;
            background-size: 12px auto;
            font-size: 12px;
          }
        }
      }

      li:nth-child(4n) {
        /* margin-right: 0; */
      }

      li:hover .btn-open {
        opacity: 1;
        transform: scale(1);
      }
    }
  }
}
.liveTvright::-webkit-scrollbar{
  width:5px;
  height:5px;
  display none;
  /**/
}
.liveTvright::-webkit-scrollbar-track{
  background: rgb(239, 239, 239);
  border-radius:2px;
}
.liveTvright::-webkit-scrollbar-thumb{
  background: #bfbfbf;
  border-radius:10px;
}
.liveTvright::-webkit-scrollbar-thumb:hover{
  background: #bfbfbf;
}
.liveTvright::-webkit-scrollbar-corner{
  background: #179a16;
}
</style>
