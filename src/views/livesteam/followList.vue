<template>
  <div>
    <div class="content-top">
      <span></span>
      <h3 class="fonth3">我的关注</h3>
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
              <!-- <i>{{
                tabname === 5
                  ? "其他"
                  : tabname === 4
                  ? "电竞"
                  : tabname === 3
                  ? "网球"
                  : tabname === 2
                  ? "篮球"
                  : tabname === 1
                  ? "足球"
                  : ""
              }}</i> -->
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
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @prev-click="prev"
        @next-click="next"
      >
      </el-pagination>
    </div>
    <no-data v-else></no-data>
  </div>
</template>

<script>
import noData from "@/components/noData.vue";
import { LiveClass, FollowLiveList } from "@/api";
export default {
  name: "LiveType",
  components: {
    noData,
  },
  data() {
    return {
      total:100,
      sendlist: [],
      zhibo: [
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
      classactive: 1,
      activebgimg: 1,
      user: {},
      token: "",
      plisst:'1'
    };
  },
  mounted() {
    this.user = JSON.parse(window.localStorage.getItem("user"));
    this.token = window.localStorage.token;
    this.getzblist('1');
  },
  methods: {
    getzblist(listp) {
      const params = {
        uid: this.user.id,
        token: this.token,
        p: listp,
        source: "pc",
      };
      this.zhibo = [];
      FollowLiveList(params).then((res) => {
        console.log(res.info);
        this.total = res.info.total
        this.zhibo = res.info.list;
      });
    },
    prev(val) {
      console.log(val);
      this.getzblist(val);
    },
    next(val) {
      console.log(val);
      this.getzblist(val);
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
      this.tvactive = idex;
      this.activebgimg = index;
    },
    liveTvclassChange(index) {
      this.classactive = index;
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

.content-top {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  span {
    display: inline-block;
    width: 28px;
    height: 28px;
    // background: url('../../assets/img/zhubo.png') no-repeat center;
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
</style>