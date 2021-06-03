<template>
  <div id="fixturelist">
      <div class="left_fixturelist">
        <div class="left_title">全部赛事</div>
        <div  class="nav-item-box">
          <div class="nav-item-header">
            <div class="header-left">
              <img src="../../assets/img/foot.png" class="icons"/>
              <div class="title">足球</div>
            </div>
            <div class="header-right">今日<span class="number">{{ football.length? football.length : 0}}</span>场比赛</div>
          </div>
          <div class="nav-item-content" :style="open? 'overflow: hidden;height: 106px;' : 'overflow: inherit'">
            <div v-for="(item, index) in football"
            :key = "index"
            class="gamename"
            @click="getmatch(item, index)">{{ item.name}}</div>
            </div>
            <div v-if="open == true" class="unfold" @click="open = false">展开<i class="arrows"></i></div>
            <div  v-else class="put"@click="open = true">收起<i class="noarrows"></i></div>
        </div>
        <div  class="nav-item-box">
          <div class="nav-item-header">
            <div class="header-left">
              <img src="../../assets/img/basketball.png" class="icons"/>
              <div class="title">篮球</div>
            </div>
            <div class="header-right">今日<span class="number">{{ basketball.length? basketball.length : 0}}</span>场比赛</div>
          </div>
          <div class="nav-item-content" :style="open2? 'overflow: hidden;height: 106px;' : 'overflow: inherit'">
            <div v-for="(item, index) in basketball"
            :key = "index"
            class="gamename"
            @click="getmatch(item, index)">{{ item.name}}</div>
          </div>
            <div v-if="open2 == true" class="unfold" @click="open2 = false">展开<i class="arrows"></i></div>
            <div  v-else class="put"@click="open2 = true">收起<i class="noarrows"></i></div>
        </div>
      </div>
      <div class="top__fixturelist">
        <DateWeek ref="dateWeek" @searchCompetitionData="searchCompetitionData"/>
      </div>
      <div class="time_fixturelist">
        <div class="date">
          <div class="times">
            {{ date }}
          </div>
          <div v-if="active == 1" class="match">
            ({{ match.length? match.length : 0}}场比赛)
          </div>
          <div v-else class="match">
            ({{ list.length? list.length : 0}}场比赛)
          </div>
        </div>
        <div class="live">
          <div :class="{active : active == 1}" @click="active = 1" class="living">直播中</div>
          <div :class="{active : active == 2}" @click="active = 2" class="all">所有</div>
        </div>
      </div>
      <div v-if="active == 1" class="right_fixturelist">
        <div  v-for="(item, index) in match"
          :key = "index"
          class="game_nav">
          <div class="left_game">
            <div class="team_top">
              <div class="team"><img class="teamicon" :src='item.main_logo'/><div class="teams">{{ item.main_name}}</div></div>
              <div class="score">{{ item.main_fraction}}</div>
            </div>
            <div class="team_down">
              <div class="team"><img class="teamicon" :src='item.deputy_logo'/><div class="teams">{{ item.deputy_name}}</div></div>
              <div class="score">{{ item.deputy_fraction }}</div>
            </div>
          </div>
          <div class="center_game">
            <div class="playingteam">{{ item.name_zh }}</div>
            <div class="playingtime">{{ item.competition_time_text }}</div>
            <div class="playto">
              <div v-if="item.is_live == 1" class="playing">去观看</div>
              <div v-if="item.is_make == 0 && item.is_live == 0 && item.status == 1" class="yuyue" @click="appointclick(item, index)">预约</div>
              <div v-if="item.is_make == 1 && item.is_live == 0 && item.status == 1" class="playover" @click="appointclick(item, index)">已预约</div>
              <a v-if="item.is_make == 0 && item.is_live == 0 && item.status == 1" class="noplay">未开始</a>
              <div v-if="item.status == 8" class="playover">已结束</div>
              <a v-if="item.is_live == 1">直播中...</a>
            </div>
          </div>
          <div class="right_game">
           <public-swiper
              :option="item.anchor"
              :name="'top_game_' + index"
              view="6"
              :loop="false"
              :autoplay="0"
              height="74px"
              width="480px"
              className="egameTop_swiper"
              swiperPage="egameTop_swiper"
            >
              <template slot-scope="options">
                <div
                  class="game_topList"
                  :key="options.options.uid"
                  :class="{ changs_maintain: options.options.state == 3 }"
                >
                  <div class="xxx1">
                    <img :src="options.options.avatar" class="game_logo" alt="" />
                    <p class="p_title">{{ options.options.nick_name }}</p>
                  </div>
                </div>
              </template>
              <div
                class="prevButton"
                slot="prevButton"
                v-if="item.anchor.length > 6"
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
                v-if="item.anchor.length > 6"
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
      <div v-else class="right_fixturelist">
        <div  v-for="(item, index) in list"
          :key = "index"
          class="game_nav">
          <div class="left_game">
            <div class="team_top">
              <div class="team"><img class="teamicon" :src='item.main_logo'/><div class="teams">{{ item.main_name}}</div></div>
              <div class="score">{{ item.main_fraction}}</div>
            </div>
            <div class="team_down">
              <div class="team"><img class="teamicon" :src='item.deputy_logo'/><div class="teams">{{ item.deputy_name}}</div></div>
              <div class="score">{{ item.deputy_fraction }}</div>
            </div>
          </div>
          <div class="center_game">
            <div class="playingteam">{{ item.name_zh }}</div>
            <div class="playingtime">{{ item.competition_time_text }}</div>
            <div class="playto">
              <div v-if="item.is_live == 1" class="playing">去观看</div>
              <div v-if="item.is_make == 0 && item.is_live == 0 && item.status == 1" class="yuyue" @click="appointclick(item, index)">预约</div>
              <div v-if="item.is_make == 1 && item.is_live == 0 && item.status == 1" class="playover" @click="appointclick(item, index)">已预约</div>
              <a v-if="item.is_make == 0 && item.is_live == 0 && item.status == 1" class="noplay">未开始</a>
              <div v-if="item.status == 8" class="playover">已结束</div>
              <a v-if="item.is_live == 1">直播中...</a>
            </div>
          </div>
          <div class="right_game">
           <public-swiper
              :option="item.anchor"
              :name="'top_game_' + index"
              view="6"
              :loop="false"
              :autoplay="0"
              height="74px"
              width="480px"
              className="egameTop_swiper"
              swiperPage="egameTop_swiper"
            >
              <template slot-scope="options">
                <div
                  class="game_topList"
                  :key="options.options.uid"
                  :class="{ changs_maintain: options.options.state == 3 }"
                >
                  <div class="xxx1">
                    <img :src="options.options.avatar" class="game_logo" alt="" />
                    <p class="p_title">{{ options.options.nick_name }}</p>
                  </div>
                </div>
              </template>
              <div
                class="prevButton"
                slot="prevButton"
                v-if="item.anchor.length > 6"
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
                v-if="item.anchor.length > 6"
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
import { GetLiveListByType,football,basketball,appointment } from "@/api";
import DateWeek from '../dateWeek'

  export default {
    components: {
        DateWeek
    },
    data() {
      return {
        uid: "",
        open: true,
        open2: true,
        token: "",
        active:2,
        balls:[],
        football: [],
        match:[],
        list:[],
        date:'',
        // time:'',
        basketball: []
      };
    },
    created() {
      this.getbasketball()
      var year = ''
      const data = {
        source: 'pc',
        time: year
      }
      football(data).then(res => {
        if (res.code == 200 ) {
          this.football = res.info.filter
          this.list = res.info.list
        }
        })
    },
    mounted() {
      this.user = JSON.parse(window.localStorage.getItem("user"));
      this.token = window.localStorage.token;
      this.getLiveListByType();
      this.date = this.$children[0].currentDate.date
    },
    methods: {
      to(e){
        this.active = e
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
    appointclick(item, index) {
      //预约
      const params = {
        uid: this.user.id,
        token: this.token,
        game_status: item.game_status,
        game_id: item.id,
        game_type: 1,
        gametime: item.competition_time,
        game_details:JSON.stringify(item) ,
        game_status: item.status,
        source: "pc",
      };
      appointment(params).then((res) => {
        if (res.code === 300) {
          this.$message({
            type: "success",
            message: res.msg,
          });

          this.getmentList();
        } else {
          this.$message({
            type: "erro",
            message: res.msg,
          });
        }
      });
    },
      getLiveListByType() {
        const params = {
          uuid: this.user.id,//登录的uid
          token: this.token, //登录的token
          type: 1, //直播分类 1足球、2篮球、3网球、4电球、5其他
          p: "1", //页数
          source: "pc", //来源设备
        };
        GetLiveListByType(params).then((res) => {
        });
      },
      getmatch(item,index) {
        this.match = this.football[index].game
      },
      searchCompetitionData(val){
        console.log(val)
        var year = ''
        if (val !== undefined) {
          this.date = val.date
          year = val.year
        }
        const data = {
          source: 'pc',
          time: year
        }
        football(data).then(res => {
          if (res.code == 200 ) {
            this.football = res.info.filter
            this.list = res.info.list
          }
        })
      },
      getbasketball(){
        const data = {
          source: 'pc'
        }
        basketball(data).then(res => {
          if (res.code == 200 ) {
            this.basketball = res.info.filter
          }
        })
      },
    },
  };
</script>

<style lang="stylus">
.left_fixturelist{
  width: 234px;
  min-height: 684px;
  opacity: 1;
  background: #ffffff;
  border: 1px solid #e6eaf3;
  border-radius: 5px;
  float:left;
  .left_title{
    width: 210px;
    height: 30px;
    opacity: 0.7;
    background: #ffffff;
    border: 1px solid #693d12;
    border-radius: 5px;
    font-size: 13px;
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    text-align: center;
    line-height 26px;
    color: #693d12;
    margin-top: 16px;
    margin-left:12px;
  }
  .nav-item-box{
    margin-left:12px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    margin-bottom:20px;
    .nav-item-header{
      width:210px;
      height:20px;
      .header-left{
        .icons{
          width: 16px;
          height: 16px;
          opacity: 1;
          float:left;
        }
        .title{
          float:left;
          width: 28px;
          height: 20px;
          opacity: 1;
          font-size: 14px;
          font-weight: 400;
          text-align: LEFT;
          color: #76809c;
          margin-left:4px;
          font-size: 13px;
        }
      }
      .header-right{
        float:right;
        font-size:13px;
        height: 18px;
        opacity: 1;
        font-size: 13px;
        font-weight: 400;
        text-align: RIGHT;
        color: #76809c;
        .number{
          color:#DBB16F;
          font-size: 14px;
        }
      }
    }
    .nav-item-content{
      .gamename{
        width: 66px;
        height: 30px;
        opacity: 1;
        background: #ffffff;
        border: 1px solid #e6eaf3;
        border-radius: 5px;
        text-align: center;
        line-height: 28px;
        color: #434a66;
        font-size: 13px;
        font-family: PingFang SC, PingFang SC-Regular;
        cursor:pointer;
        margin-bottom:6px;
        margin-right:6px;
        float:left;
      }
      .gamename:hover{
        background: linear-gradient(90deg,#eccbab, #dbb16f 100%);
      }
    }
  }
}
.unfold{
        width: 210px;
        height: 20px;
        opacity: 1;
        background: #f2f4f9;
        float: left;
        text-align: center;
        position:relative;
        cursor: pointer;
        font-size: 12px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        line-height: 20px;
        .arrows{
          width: 0;
          height: 0;
          border-right: 5px solid transparent;
          border-left: 5px solid transparent;
          border-top: 5px solid #515151;
          position: absolute;
          top: 8px;
          right: 75px;
        }
      }
      .put{
        width: 210px;
        height: 20px;
        opacity: 1;
        background: #f2f4f9;
        float: left;
        text-align: center;
        position:relative;
        cursor: pointer;
        font-size: 12px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        line-height: 20px;
        .noarrows{
          width: 0;
          height: 0;
          border-right: 5px solid transparent;
          border-left: 5px solid transparent;
          border-bottom: 5px solid #515151;
          position: absolute;
          top: 8px;
          right: 75px;
        }
      }
.top__fixturelist{
  float:left;
  width: 946px;
  height: 56px;
  opacity: 1;
  background: #ffffff;
  border: 1px solid #e6eaf3;
  border-radius: 5px;
  margin-left:20px;
  .time-week .time-week-item {
    width: 100px;
    .time{
      padding-top: 12px;
    }
    .lable{
      padding-bottom: 11px;
    }
  }
  .time-week .time-week-main {
    width: 904px;
  }
}
.time_fixturelist{
  width: 946px;
  height: 60px;
  float:left;
  margin-left:20px;
  display: flex;
  align-items: center;
  .date{
    float:left;
    height:32px;
    .times{
      line-height:32px;
      color:#333;
      float:left;
      font-size: 24px;
      font-family: PingFang SC, PingFang SC-Heavy;
      font-weight: 800;
    }
    .match{
      float:left;
      color:#693D12;
      font-size:14px;
      padding-top: 12px;
      margin-left: 10px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
    }
  }
  .live{
    display: flex;
    .living{
      width: 66px;
      height: 32px;
      opacity: 1;
      border-radius: 4px;
      margin-left:30px;
      text-align: center;
      line-height: 32px;
      color:#76809C;
      background: #fff;
      cursor: pointer;
      border: 1px solid rgba(118,128,156,0.50);
    }
    .active{
      background: linear-gradient(90deg,#eccbab, #dbb16f 100%) !important;
      color:#693D12 !important;
    }
    .all{
      width: 66px;
      height: 32px;
      opacity: 1;
      background: #fff;
      border-radius: 4px;
      margin-left:12px;
      text-align: center;
      line-height: 32px;
      color:#76809C;
      cursor: pointer;
      border: 1px solid rgba(118,128,156,0.50);
    }
  }
}
.right_fixturelist{
  float:left;
  height: calc(100vh - 295px);
  border-radius: 4px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 8px;
  .game_nav{
    background: #ffffff;
    width: 946px;
    height: 120px;
    opacity: 1;
    border: 1px solid #e6eaf3;
    border-radius: 5px;
    margin-left:20px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    .left_game{
      height:80px;
      width:233px;
      border-right: 1px solid #E6EAF3;
      .team_top{
        padding: 0 20px;
        height:32px;
        width:233px;
        display: flex;
        justify-content: space-between;
        line-height: 32px;
      }
      .team_down{
        padding: 0 20px;
        width:233px;
        line-height: 32px;
        height:32px;
        display: flex;
        justify-content: space-between;
        margin-top: 12px;
      }
      .score{
        font-size:24px;
      }
      .team{
        .teamicon{
          width: 32px;
          height: 32px;
          display: inline-block;
          float:left;
        }
        .teams{
          line-height:32px;
          float:left;
          color:#333;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          padding-left: 10px;
          width: 130px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .center_game{
      height:80px;
      width:245px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-evenly;
      padding-left: 24px;
      .playingteam{
        font-size: 12px;
        color:#888;
      }
      .playingtime{
        font-size:14px;
        color:#333;
      }
      .playto{
        display:flex;
        a{
          line-height:26px;
          padding-left: 7px;
          color:#F15C43;
          font-size:14px;
        }
        .noplay{
          line-height:26px;
          padding-left: 7px;
          color: #ccc;
          font-size:14px;
        }
      }
      .playover{
        width: 66px;
        height: 26px;
        opacity: 1;
        background: #e6eaf3;
        border-radius: 4px;
        text-align: center;
        line-height: 26px;
        color:#76809C;
      }
      .yuyue{
        width: 66px;
        height: 26px;
        opacity: 1;
        background: linear-gradient(90deg,#eccbab, #dbb16f 100%);
        border-radius: 4px;
        text-align: center;
        line-height: 26px;
        color:#fff;
        cursor: pointer;
      }
      .playing{
        width: 66px;
        height: 26px;
        opacity: 1;
        background: linear-gradient(90deg,#f27a2e, #f15b43 100%);
        border-radius: 4px;
        text-align: center;
        line-height: 26px;
        cursor:pointer;
        color:#fff;
      }
    }
    .right_game{
      height:80px;
      width:468px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      .bunko{
        width: 48px;
        height: 48px;
        opacity: 1;
        background: #ffffff;
        border: 1px solid #e6eaf3;
        border-radius: 50%;
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
