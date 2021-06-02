<template>
  <div id="reserve">
    <div class="content-top">
      <span></span>
      <h3 class="fonth3">我的预约</h3>
    </div>
    <div v-for="(item, index) in datalist" :key="index">
      <p class="yytime">{{ item.addtime }}</p>
      <div class="yycontent">
        <div class="yyicon">
          <div class="yyleft">
            <div>
              <img :src="item.game_details.main_logo" alt="" /><span>{{
                item.game_details.main_name
              }}</span
              ><span>{{ item.game_details.main_fraction }}</span>
            </div>
            <div>
              <img :src="item.game_details.events_logo" alt="" /><span>{{
                item.game_details.deputy_name
              }}</span
              ><span>{{ item.game_details.deputy_fraction }}</span>
            </div>
          </div>
          <div class="yycenter">
            <div class="duiwu">
              <p>{{ item.game_details.name_zh }}</p>
              <span> {{ item.game_details.competition_time_text }} </span>
            </div>
            <div
              v-if="item.game_details.is_make === 0"
              class="yybtn"
              @click="appointclick(item, index)"
            >
              预约
            </div>
            <div v-else class="nyybtn" @click="cancelclick(item,index)">取消预约</div>
          </div>
        </div>

        <div class="yyright">
          <public-swiper
            :option="item.info"
            :name="'top_game_' + index"
            view="6"
            :loop="false"
            :autoplay="0"
            height="74px"
            width="480px"
            className="egameTop_swiper"
            swiperPage="egameTop_swiper"
            v-if="datalist"
          >
            <template slot-scope="options">
              <div
                class="game_topList"
                :key="options.options.game_id"
                :class="{ changs_maintain: options.options.state == 3 }"
              >
                <div class="xxx1">
                  <img :src="options.options.img_cn" class="game_logo" alt="" />
                  <p class="p_title">{{ options.options.name_cn }}</p>
                </div>
              </div>
            </template>
            <div
              class="prevButton"
              slot="prevButton"
              v-if="item.game_details.length > 6"
            >
              <img
                class="nextIcon"
                src="../../assets/img/xiayiyean.png"
                alt=""
              />
            </div>
            <div
              class="nextButton"
              slot="nextButton"
              v-if="item.game_details.length > 6"
            >
              <img
                class="prevIcon"
                src="../../assets/img/shangyiyean.png"
                alt=""
              />
            </div>
          </public-swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AppointmentList, cancelAppointment, appointment } from "@/api";
export default {
  data() {
    return {
      datalist: [],
      clickNum: 0,
      user: {},
      token: "",
    };
  },
  mounted() {
    this.user = JSON.parse(window.localStorage.getItem("user"));
    this.token = window.localStorage.token;
    this.getmentList();
  },
  methods: {
    appointclick(item, index) {
      //预约
      const params = {
        uid: this.user.id,
        token: this.token,
        game_status: item.game_status,
        game_id: item.game_id,
        game_type: item.game_type,
        gametime: item.gametime,
        game_details: item.game_details,
        source: "pc",
      };
      appointment(params).then((res) => {
        if (res.code === 0) {
          this.$message({
            type: "success",
            message: res,
          });

          console.log(res);
          this.getmentList();
        } else {
          this.$message({
            type: "erro",
            message: res,
          });
        }
      });
    },
    cancelclick(item,index){
      //取消预约
      const params = {
        uid: this.user.id,
        token: this.token,
        game_id: item.game_id,
        game_type: item.game_type,
        source: "pc",
      };
      cancelAppointment(params).then((res) => {
        if (res.code === 0) {
          this.$message({
            type: "success",
            message: res,
          });

          console.log(res);
          this.getmentList();
        } else {
          this.$message({
            type: "erro",
            message: res,
          });
        }
      });
    },
    getmentList() {
      const params = {
        uid: this.user.id,
        token: this.token,
      };
      AppointmentList(params).then((res) => {
        this.datalist = [];
        console.log(res);
        res.info.map((item) => {
          console.log(item, "-----------------");
          // var date = new Date(item.addtime * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
          // var Y = date.getFullYear() + "年";
          // var M =
          //   (date.getMonth() + 1 < 10
          //     ? "0" + (date.getMonth() + 1)
          //     : date.getMonth() + 1) + "月";
          // var D = date.getDate() + "日";
          // var h = date.getHours() + ":";
          // var m = date.getMinutes() + ":";
          // var s = date.getSeconds();
          item.addtime = this.timestampToTime(item.addtime).slice(5, 11);
          item.game_details.competition_time = this.timestampToTime(
            item.game_details.competition_time
          ).slice(11);

          this.datalist.push(item);
        });
      });
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "年";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "月";
      var D = date.getDate() + "日";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
  },
};
</script>

<style lang="stylus" scoped>
#reserve {
  .content-top {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    span {
      display: inline-block;
      width: 28px;
      height: 28px;
      background: url('../../assets/img/myyuyue.png') no-repeat center;
      position: relative;
      top: 2px;
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

  .yytime {
    font-size: 24px;
    font-family: PingFang SC, PingFang SC-Heavy;
    font-weight: 800;
    text-align: left;
    color: #333333;
    letter-spacing: 0px;
    margin-top: 16px;
  }

  .yycontent {
    width: 1506px;
    height: 120px;
    padding: 22px 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    background: #fff;
    margin-top: 16px;
    border: 1px solid #e6eaf3;
    border-radius: 5px;

    .yyicon {
      width: 600px;
      display: flex;

      .yyleft {
        width: 245px;
        border-right: 1px solid #E6EAF3;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        div {
          display: flex;
          align-items: center;

          img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
          }

          span:nth-of-type(1) {
            margin: 0 0 0 8px;
            font-size: 14px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            text-align: RIGHT;
            color: #333333;
            display: inline-block;
            width: 175px;
            text-align: left;
          }

          span:nth-of-type(2) {
            // margin: 0 0 0 110px;
            font-size: 24px;
            font-family: PingFang SC, PingFang SC-Medium;
            font-weight: 500;
            text-align: CENTER;
            color: #333333;
          }
        }
      }

      .yycenter {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        box-sizing: border-box;

        .duiwu {
          p {
            font-size: 12px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            text-align: left;
            color: #888888;
          }

          span {
            display: block;
            font-size: 14px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            text-align: left;
            color: #333333;
            margin: 8px 0 0 0;
          }
        }

        .yybt1 {
          width: 68px;
          height: 26px;
          opacity: 1;
          background: #ffffff;
          border: 1px solid #ce995b;
          border-radius: 5px;
          text-align: center;
          line-height: 26px;
          font-size: 13px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          color: #ce995b;
        }

        .yybtn {
          width: 68px;
          height: 26px;
          text-align: center;
          line-height: 26px;
          background: linear-gradient(90deg, #eccbab, #dbb16f 100%);
          border-radius: 2px;
          font-size: 13px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          color: #7e3a18;
          cursor: pointer;
        }

        .nyybtn {
          width: 68px;
          height: 26px;
          text-align: center;
          line-height: 26px;
          // background: linear-gradient(90deg, #eccbab, #dbb16f 100%);
          border: 1px solid #777;
          border-radius: 2px;
          font-size: 13px;
          // font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          color: #7e3a18;
          cursor: pointer;
        }
      }
    }

    .yyright {
      .game_topList {
        .xxx1 {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;

          .game_logo {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            margin: 0 auto;
          }

          .p_title {
            font-size: 13px;
            font-family: PingFang SC, PingFang SC-Regular;
            font-weight: 400;
            text-align: center;
            color: #333333;
            margin-top: 4px;
          }
        }
      }
    }
  }
}
</style>
<style>
.prevButton {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 999;
  width: 25px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: #fff;
}
.prevButton img {
  width: 25px;
}
.nextButton img {
  width: 25px;
}
.nextButton {
  position: absolute;
  top: 0px;
  right: 0;
  z-index: 999;
  height: 100%;
  width: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: #fff;
}
.swiper-container {
  padding: 0 20px;
}
</style>
