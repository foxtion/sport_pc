<template>
    <div class="matchwrapper">
        <div class="liveTypenav">
            <span  v-for="(item, i) in sendlist" :key="i" :class="{ active: item.active }" @click="tabFn(item, i)">
                {{ item.name }}
                <b class="pa"></b>
            </span>
        </div>
        <!-- <div class="date-list">
            <ul>
                <li class="item" v-for="(item, i) in sendlist" :key="i" :class="{active: item.active}" @click="tabFn(item, i)">
                    <span class="day">{{item.xq}}</span>
                    <br />
                    <span class="date">{{item.rq}}</span>
                </li>
            </ul>   
        </div>-->

        <div class="match-box" v-if="schedule.length > 0">
            <div class="match-data" v-for="(item, i) in schedule" :key="i">
                <h4 style="margin: 0 0 15px">{{ item.time }}</h4>
                    <div class="match-card" v-for="item2 in item.list" :key="item2.id">
                    <!-- :class="{active: item2.is_appointment == '1'}" -->
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
                        <div class="swiper-container scswiper" style="margin: 0 50px; width: 336px">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide" v-for="item3 in item2.userlist" :key="item3.uid">
                                <img class="avatar" :src="item3.avatar"
                                    @click=" $router.push({
                                        name: 'liveRoom',
                                        query: { liveuid: item3.uid, stream: item3.stream },
                                    })
                                    "
                                    style="  width: 40px; height: 40px; border-radius: 50%; cursor: pointer;"
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
                    <div  class="subscribe"  v-if="item2.is_appointment == 0"   @click="isyuyue(item2)">
                        预约
                    </div>
                    <div  class="subscribe"  v-else style="background: #ccc"  @click="isyuyue(item2)">
                        已预约
                    </div>
                </div>
            </div>
        </div>
        <no-data v-else></no-data>
    </div>
</template>

<script>
import noData from "@/components/noData.vue";
import { GameType,GetGameScheduleList} from '@/api'

export default {
    name: "Match",
    components: {
        noData,
    },
    data() {
        return {
            sendlist: [],
            schedule: [],
        };
    },

    mounted() {
        this.Gameclass()

        /*this.$SERVER.scgetGameType().then((res) => {
            console.log(res)
            if (res.code == 0) {
                res.info.forEach((item, i) => {
                    if (i == 0) {
                        item.active = true;
                        this.getGameScheduleListByType(item.id);
                    } else {
                        item.active = false;
                    }
                });

                this.sendlist = res.data.info;
            }
        });*/

        var scswiper = new Swiper(".scswiper", {
            slidesPerView: 6,
            spaceBetween: 14,
            // 如果需要前进后退按钮
            navigation: {
                nextEl: ".scswipernext",
                prevEl: ".scswiperprev",
            }
        });
    },

    methods: {
        async Gameclass(){
           let res = await GameType()
           if(res.code == 0){
               this.sendlist = res.info;
               res.info.forEach((item, i) => {
                    if (i == 0) {
                        item.active = true;
                        this.getGameScheduleListByType(item.id);
                    } else {
                        item.active = false;
                    }
                });
           }
           console.log(res)
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
            this.$SERVER .addAppoint( game_id,JSON.parse(window.localStorage.getItem("user")).id).then((res) => {
                if (res.data.code == 0) {
                    this.$message({
                        message: res.data.msg,
                        type: "success",
                    });
                    this.getGameScheduleListByType("0");
                }
            });
        },

        cancelAppoint(game_id) {
            this.$SERVER.cancelAppoint(game_id,JSON.parse(window.localStorage.getItem("user")).id).then((res) => {
                if (res.data.code == 0) {
                    this.$message({
                        message: res.data.msg,
                        type: "success",
                    });
                    this.getGameScheduleListByType("0");
                }
            });
        },
        
        async getGameScheduleListByType(id) {
            let uid = "";
            if (window.localStorage.getItem("token")) {
                uid = JSON.parse(window.localStorage.getItem("user")).id;
            }

            let data = {
                'uid' : uid,
                "id" : id
            }
            let res = await GetGameScheduleList(data) 
            if(res.code == 0){
                this.schedule = res.info;
            }
            console.log(res)
            /* this.$SERVER.getGameScheduleListByType(id, uid).then((res) => {
                if (res.data.code == 0) {
                    this.schedule = res.data.info;
                } else {
                    this.schedule = [];
                }
            }); */
        },

        tabFn(val, i) {
            this.sendlist.forEach((item, index) => {
                if (i == index) {
                    item.active = true;
                    this.getGameScheduleListByType(item.id);
                } else {
                    item.active = false;
                }
            });
        }
    }
};
</script>

<style lang="stylus" >
.matchwrapper {
  width: 1150px;
  margin: 114px auto 0;

  .liveTypenav {
    display: flex;
    height: 42px;

    span {
      cursor: pointer;
      position: relative;
      display: inline-block;
      margin: 0 28px 24px;
      font-size: 18px;
      color: #777;
      float: left;
      height: 40px;
    }

    span.active {
      bottom: 6px;
      padding-bottom: 8px;
      color: #000;
      font-size: 24px;
      font-weight: 600;

      .pa {
        position: absolute;
        bottom: -7px;
        width: 100%;
        height: 6px;
        left: 0;
        right: 0;
        border-radius: 3px;
        border-bottom: 6px solid #ffb600;
        border-bottom-color: #f8c21b !important;
      }
    }
  }

  .date-list {
    ul {
      .item {
        position: relative;
        display: inline-block;
        width: 126px;
        padding: 4px 0;
        text-align: center;
        cursor: pointer;

        .day {
          font-size: 14px;
          color: #777;
        }

        .date {
          font-size: 18px;
          color: #777;
        }
      }

      .item.active .date {
        font-size: 24px;
        color: #000;
      }

      .item.active:after {
        content: '';
        display: block;
        position: absolute;
        width: 60px;
        height: 6px;
        margin-top: 8px;
        left: 50%;
        transform: translateX(-50%);
        background: #f8c21b;
        border-radius: 3px;
      }
    }
  }

  .match-box {
    margin-top: 34px;

    .match-data {
      .match-card {
        height: 120px;
        background: #fff;
        border-radius: 4px;
        margin-bottom: 16px;
        display: flex;
        align-items: center;

        .text {
          width: 120px;
          margin: 38px 14px auto 36px;

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
            margin-right: 4px;
            display: inline-block;
            width: 142px;
            font-size: 16px;
            vertical-align: middle;

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
            padding: 0 24px;
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
          margin-left: 65px;

          .arrow {
            display: inline-block;
            border: 5px solid transparent;
            border-left-width: 8px;
            border-left-color: #000;
          }
        }

        .subscribe {
          background: #f8c21b;
          color: #fff;
          width: 80px;
          height: 34px;
          line-height: 34px;
          border-radius: 17px;
          font-size: 14px;
          text-align: center;
          cursor: pointer;
          margin-left: 65px;
        }
      }

      .match-card.active {
        border-right: solid 7px #f8c21b;
      }
    }
  }
}
</style>