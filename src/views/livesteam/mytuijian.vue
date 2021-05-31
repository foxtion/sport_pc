<template>
  <div style="margin:24px 0 24px 15px;">
    <div class="content-top">
      <span></span>
      <h3 class="fonth3">直播推荐</h3>
    </div>
    <div v-if="zhibo.length > 0">
      <ul class="categoryinnercontent" style="margin-top: 24px">
        <li v-for="item in zhibo" :key="item.id" @click="toLive(item)">
          <div>
            <img :src="item.thumb" alt class="hotcontentimg" />
            <span class="com">
              <i>推荐</i>
            </span>
            <span class="comzu">
              <i>篮球</i>
            </span>
            <i class="btn-open"></i>
          </div>

          <div
            class="ellipsebottom"
            style="
              height: 55px;
              display: flex;
              ustify-content: center;
              align-items: center;
            "
          >
            <span>
              <img class="avatar" :src="item.avatar" />
            </span>
            <div
              class="userabout"
              style="padding-top: 10px; padding-left: 10px; flex: 1"
            >
              <div class="itemtitle">
                <h4 class="ellipsis">{{ item.title }}</h4>
              </div>
              <div class="userbottome">
                <div class="username" style="float: left; font-size: 12px">
                  {{ item.nick_name }}
                </div>
                <div class="frier" style="float: right">
                  <span class="num">{{ item.total }}</span>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-else> 
        暂无数据
    </div>
  </div>
</template>

<script>
import noData from "@/components/noData.vue";
import { LiveClass, LiveSports } from "@/api";

export default {
  name: "LiveType",
  components: {
    noData,
  },
  data() {
    return {
      sendlist: [],
      zhibo: [],
      tvactive: 1,
      classactive: 1,
      activebgimg: 1,
      currentpage: 1,
      user: {},
      listp: "1",
      total: 100,
    };
  },
  mounted() {
    this.user = JSON.parse(window.localStorage.getItem("user"));
    this.getzblist(1);
  },
  methods: {
    getzblist() {
      const parms = {
        p: '1',
        game_type: 0,
        source: "pc",
      };
      this.zhibo = [];
      console.log(parms);
      LiveSports(parms).then((res) => {
        console.log(res.info);
        this.total = Number(res.info.total);
        this.zhibo = res.info.list.slice(0,4);
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
    toLive(val) {
      console.log(window.localStorage);
      // return
      this.$router.push({
        name: "liveRoom",
        query: { liveuid: val.uid, stream: val.stream },
      });
      /* if (window.localStorage.getItem("token")) {
                } else {
                  this.$emit("denglu");
                } */
    },
  },
};
</script>

<style lang="stylus" scoped>
.liveTvright {
  border-width: 0px;
  // position: absolute;
  padding: 30px 0 0 0;
  left: 120px;
  top: 80px;
  width: 1600px;
  height: 905px;

  .categoryinnercontent {
    li {
      width: 285px;
      height: 226px;
      opacity: 1;
      background: #ffffff;
      border: 1px solid #e6eaf3;
      border-radius: 7px;
      box-shadow: 0px 9px 18px 0px rgba(0, 0, 0, 0.1);

      >div {
        position: relative;
        cursor: pointer;
        width: 100%;
        width: 285px;
        height: 160px;
        transition: color 0.2s ease-out;

        .hotcontentimg {
          position: absolute;
          width: 100%;
          height: 160px;
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
          right: 12px;
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
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          text-align: left;
          color: #333333;
        }

        .avatar {
          width: 46px;
          height: 46px;
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

.content-top {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  span {
    display: inline-block;
    width: 28px;
    height: 28px;
    background: url('../../assets/img/zhubo.png') no-repeat center;
  }

  .fonth3 {
    margin-left: 5px;
    font-size: 22px;
    font-family: PingFang SC, PingFang SC-Medium;
    font-weight: 600;
    text-align: left;
    color: #333333;
  }
}

.el-pagination {
  margin-left: 513px;
}
</style>