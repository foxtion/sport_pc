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
            <div class="header-right">今日<span class="number">{{ football.length}}</span>场比赛</div>
          </div>
          <div class="nav-item-content" :style="open? 'overflow: hidden;height: 106px;' : 'overflow: inherit'">
            <div v-for="(item, index) in football"
            :key = "index"
            class="gamename">{{ item.name}}</div>
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
            <div class="header-right">今日<span class="number">{{ basketball.length}}</span>场比赛</div>
          </div>
          <div class="nav-item-content" :style="open2? 'overflow: hidden;height: 106px;' : 'overflow: inherit'">
            <div v-for="(item, index) in basketball"
            :key = "index"
            class="gamename">{{ item.name}}</div>
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
            05月15日
          </div>
          <div class="match">
            ({{ basketball.length + football.length}}场比赛)
          </div>
        </div>
        <div class="live">
          <div class="living active">直播中</div>
          <div class="all">所有</div>
        </div>
      </div>
      <div class="right_fixturelist">
        <div class="game_nav">
          <div class="left_game">
            <div class="team_top">
              <div class="team"><img class="teamicon" src='../../assets/img/foot.png'/><div class="teams">莱斯特城</div></div>
              <div class="score">1</div>
            </div>
            <div class="team_down">
              <div class="team"><img class="teamicon" src='../../assets/img/foot.png'/><div class="teams">莱斯特城</div></div>
              <div class="score">10</div>
            </div>
          </div>
          <div class="center_game">
            <div class="playingteam">英格兰足球超级联赛</div>
            <div class="playingtime">22:00</div>
            <div class="playto">
              <!-- <div class="playover">已结束</div> -->
              <div class="playing">去观看</div><a>直播中...</a>
            </div>
          </div>
          <div class="right_game">
            <div class="bunko"></div>
            <div class="bunko"></div>
            <div class="bunko"></div>
            <div class="bunko"></div>
            <div class="bunko"></div>
            <div class="bunko"></div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { GetLiveListByType,football,basketball } from "@/api";
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
        balls:[],
        football: [],
        basketball: []
      };
    },
    created() {
      this.getfootball()
      this.getbasketball()
    },
    mounted() {
      this.uid = JSON.parse(window.localStorage.getItem("user"));
      this.token = window.localStorage.token;
      this.getLiveListByType();
    },
    methods: {
      getLiveListByType() {
        const params = {
          uid: this.uid, //登录的uid
          token: this.token, //登录的token
          type: 1, //直播分类 1足球、2篮球、3网球、4电球、5其他
          p: "1", //页数
          source: "pc", //来源设备
        };
        GetLiveListByType(params).then((res) => {
          console.log(res, 1111);
        });
      },
      getfootball(){
        const data = {
          source: 'pc'
        }
        football(data).then(res => {
          if (res.code == 200 ) {
            this.football = res.info.filter
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
  height: 52px;
  opacity: 1;
  background: #ffffff;
  border: 1px solid #e6eaf3;
  border-radius: 5px;
  margin-left:20px;
  .time-week .time-week-item {
    width: 100px;
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
      font-size:24px;
      color:#333;
      float:left;
    }
    .match{
      float:left;
      color:#693D12;
      font-size:14px;
      padding-top: 12px;
      margin-left: 10px;
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
    }
    .active{
      background: linear-gradient(90deg,#eccbab, #dbb16f 100%);
      color:#693D12;
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
          font-size: 16px;
          padding-left: 10px;
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
