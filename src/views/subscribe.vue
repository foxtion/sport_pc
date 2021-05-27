<template>
  <div id="subscribe">
    <div class="match-data" v-for="(item, i) in subscribelist" :key="i">
      <h4>{{ item.time }}</h4>
      <!-- :class="{active: index == 2}" -->
      <div v-for="item2 in item.list" :key="item2.id" class="match-card">
        <div class="text">
          <span class="title ellipsis">{{ item2.sponsor_name }}</span>
          <br />
          <span class="time">{{ item2.time }}</span>
        </div>
        <div class="team">
          <div class="host">
            <span class="host-name ellipsis">{{ item2.team_one_name }}</span>
            <img class="host-icon match-cover" :src="item2.team_one_logo" />
          </div>
          <span class="vs">VS</span>
          <div class="guest">
            <img class="guest-icon match-cover" :src="item2.team_two_logo" />
            <span class="guest-name ellipsis">{{ item2.team_two_name }}</span>
          </div>
        </div>
        <div style="position: relative">
          <div
            class="swiper-container scswiper"
            style="margin: 0 50px; width: 236px"
          >
            <div class="swiper-wrapper">
              <div
                class="swiper-slide"
                v-for="item3 in item2.userlist"
                :key="item3.uid"
              >
                <img
                  class="avatar"
                  :src="item3.avatar"
                  style="
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    cursor: pointer;
                  "
                />
              </div>
            </div>
          </div>
          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev scswiperprev"></div>
          <div class="swiper-button-next scswipernext"></div>
        </div>
        <!-- <div class="living" v-if="index == 2">
          <div class="arrow"></div>
          <span>直播中...</span>
        </div>-->
        <div
          class="subscribe"
          v-if="item2.is_appointment == 0"
          @click="isyuyue(item2)"
        >
          预约
        </div>
        <div
          class="subscribe"
          style="background: #ccc"
          @click="isyuyue(item2)"
          v-else
        >
          已预约
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "subscribe",
  data() {
    return { subscribelist: [] };
  },
  mounted() {
    this.init();
    var scswiper = new Swiper(".scswiper", {
      slidesPerView: 5,
      spaceBetween: 8,
      // 如果需要前进后退按钮
      navigation: {
        nextEl: ".scswipernext",
        prevEl: ".scswiperprev",
      },
    });
  },
  methods: {
    init() {
      // this.$SERVER
      //   .appointList(JSON.parse(window.localStorage.getItem("userInfo")).id)
      //   .then((res) => {
      //     if (res.data.code == 0) {
      //       this.subscribelist = res.data.info;
      //     } else {
      //       this.subscribelist = [];
      //     }
      //   });
    },
    isyuyue(value) {
      if (window.localStorage.getItem("isLogin")) {
        if (value.is_appointment == 1) {
          this.cancelAppoint(value.id);
        } else {
          this.addAppoint(value.id);
        }
      } else {
        this.$emit("denglu");
      }
    },
    addAppoint(game_id) {
      this.$SERVER
        .addAppoint(
          game_id,
          JSON.parse(window.localStorage.getItem("userInfo")).id
        )
        .then((res) => {
          if (res.data.code == 0) {
            this.$message({
              message: res.data.msg,
              type: "success",
            });
            this.init();
          }
        });
    },
    cancelAppoint(game_id) {
      this.$SERVER
        .cancelAppoint(
          game_id,
          JSON.parse(window.localStorage.getItem("userInfo")).id
        )
        .then((res) => {
          if (res.data.code == 0) {
            this.$message({
              message: res.data.msg,
              type: "success",
            });
            this.init();
          }
        });
    },
  },
};
</script>

<style lang="stylus">
#subscribe {
  padding: 32px 36px 0;

  .match-data {
    >h4 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 16px;
    }

    .match-card {
      height: 100px;
      background: #fff;
      border-radius: 4px;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      border: 1px solid #ddd;
      padding-left: 25px;

      .text {
        .title {
          display: inline-block;
          max-width: 120px;
          font-size: 14px;
          color: #777;
        }

        .time {
          font-size: 18px;
          font-weight: 600;
          color: #000;
          text-align: left;
        }
      }

      .team {
        line-height: 120px;
        display: flex;
        align-items: center;

        .host {
          text-align: right;

          span {
            display: inline-block;
            width: 86px;
            vertical-align: middle;
            margin-right: 5px;
          }

          img {
            display: inline-block;
            width: 48px;
            height: 48px;
            vertical-align: middle;
          }
        }

        .vs {
          display: inline-block;
          padding: 0 4px;
          font-size: 22px;
          font-weight: 600;
          vertical-align: middle;
        }

        .guest {
          text-align: left;
          margin-left: 4px;
          display: inline-block;
          width: 142px;
          font-size: 16px;
          vertical-align: middle;

          img {
            display: inline-block;
            width: 48px;
            height: 48px;
            vertical-align: middle;
          }

          span {
            display: inline-block;
            width: 86px;
            vertical-align: middle;
            margin-left: 5px;
          }
        }
      }

      .scswipernext:after, .scswiperprev:after {
        font-size: 14px;
        color: #000;
      }

      .living {
        font-size: 14px;
        margin-left: 20px;

        .arrow {
          display: inline-block;
          border: 5px solid transparent;
          border-left-width: 8px;
          border-left-color: #000;
        }
      }

      .subscribe {
        background: #d8d8d8;
        color: #333;
        width: 80px;
        height: 34px;
        line-height: 34px;
        border-radius: 17px;
        font-size: 14px;
        text-align: center;
        cursor: pointer;
        margin-left: 20px;
      }
    }

    .match-card.active {
      border-right: solid 7px #f8c21b;
    }
  }
}
</style>