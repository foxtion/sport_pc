<template>
  <div class="home" id="homer" ref="homerr" style="margin-top: 0;background: none">
    <div v-if="!is_load" class="matchwrappercomp" ref="neikuangg" style="overflow: hidden;margin-bottom: 40px">
      <div style="width: 40%;margin: 20px;border-radius: 4px">
        <el-col :span="12">
          <h4 style="background-color: white;padding: 20px">资料库</h4>
          <el-menu

              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose">
            <!--            <el-submenu index="1">-->
            <!--              <template slot="title">-->
            <!--                <i class="el-icon-football"></i>-->
            <!--                <span>足球赛事</span>-->
            <!--              </template>-->

            <!--              <el-menu-item index="1-1" @click="qiehuan('9662')">欧冠杯</el-menu-item>-->
            <!--              <el-menu-item index="1-2" @click="qiehuan('9688')">英超</el-menu-item>-->
            <!--              <el-menu-item index="1-2" @click="qiehuan('9955')">亚冠杯</el-menu-item>-->
            <!--              <el-menu-item index="1-2" @click="qiehuan('9533')">欧洲杯</el-menu-item>-->
            <!--              <el-menu-item index="1-2" @click="qiehuan('9723')">西甲</el-menu-item>-->
            <!--              <el-menu-item index="1-2" @click="qiehuan('9647')">德甲</el-menu-item>-->
            <!--              <el-menu-item index="1-2" @click="qiehuan('9731')">意甲</el-menu-item>-->
            <!--              <el-menu-item index="1-2" @click="qiehuan('9586')">法甲</el-menu-item>-->
            <!--              <el-menu-item index="1-2" @click="qiehuan('9441')">中超</el-menu-item>-->
            <!--              <el-menu-item index="1-2" @click="qiehuan('9749')">足协杯</el-menu-item>-->
            <!--              <el-menu-item index="1-2" @click="qiehuan('9940')">日职联</el-menu-item>-->
            <!--              <el-menu-item index="1-2" @click="qiehuan('9974')">韩K联</el-menu-item>-->
            <!--              <el-menu-item index="1-2" @click="qiehuan('9867')">澳超</el-menu-item>-->

            <!--            </el-submenu>-->
            <!--            <el-submenu index="2">-->

            <!--              <template slot="title">-->
            <!--                <i class="el-icon-basketball"></i>-->
            <!--                <span>篮球赛事</span>-->
            <!--              </template>-->
            <!--              <el-menu-item index="1-2" @click="qiehuanlq('1057')">NBA</el-menu-item>-->
            <!--              <el-menu-item index="1-2" @click="qiehuanlq('1055')">CBA</el-menu-item>-->
            <!--            </el-submenu>-->
            <el-submenu index="2">

              <template slot="title">
                <i class="el-icon-basketball"></i>
                <span>热门赛事</span>
              </template>
              <el-menu-item index="1-2" v-for="(item,i) in  seasonlst" v-if="item.area_id==1" :id="item.sid"
                            @click="qiehuan(item.sid)"><img width="30px" height="30px" :src="item.logo">
                {{item.short_name_zh}}
              </el-menu-item>

            </el-submenu>
            <el-submenu index="3">

              <template slot="title">
                <i class="el-icon-basketball"></i>
                <span>国际赛事</span>
              </template>
              <el-menu-item index="1-2" v-for="(item,i) in  seasonlst" v-if="item.area_id==1" :id="item.sid"
                            @click="qiehuan(item.sid)"><img width="30px" height="30px" :src="item.logo">
                {{item.short_name_zh}}
              </el-menu-item>

            </el-submenu>
            <el-submenu index="4">

              <template slot="title">
                <i class="el-icon-basketball"></i>
                <span>欧洲</span>
              </template>
              <el-menu-item index="1-2" v-for="(item,i) in  seasonlst" v-if="item.area_id==2" :id="item.sid"
                            @click="qiehuan(item.sid)"><img width="30px" height="30px" :src="item.logo">
                {{item.short_name_zh}}
              </el-menu-item>

            </el-submenu>
            <el-submenu index="5">

              <template slot="title">
                <i class="el-icon-basketball"></i>
                <span>美洲</span>
              </template>
              <el-menu-item index="1-2" v-for="(item,i) in  seasonlst" v-if="item.area_id==3" :id="item.sid"
                            @click="qiehuan(item.sid)"><img width="30px" height="30px" :src="item.logo">
                {{item.short_name_zh}}
              </el-menu-item>

            </el-submenu>
            <el-submenu index="6">

              <template slot="title">
                <i class="el-icon-basketball"></i>
                <span>亚洲</span>
              </template>
              <el-menu-item index="1-2" v-for="(item,i) in  seasonlst" v-if="item.area_id==4" :id="item.sid"
                            @click="qiehuan(item.sid)"><img width="30px" height="30px" :src="item.logo">
                {{item.short_name_zh}}
              </el-menu-item>

            </el-submenu>
          </el-menu>
        </el-col>
      </div>

      <el-card class="box-card" style="width: 75%;padding:20px;float:right">
        <div style="overflow: hidden;margin-top:-75px" id="changhezi">
          <div v-if="moshi=='lst'" style="padding-top: 50px">
            <!--                <label>-->
            <!--                    <div style="background-color: #89D3FD;width: 4px;height:16px"></div><h5 style="position: relative;top:-20px;left: 10px">国际</h5><br>-->
            <!--                    <div v-for="item in seasonlst"  v-if="item.area_id==1" style="margin:15px;border-radius: 4px;background-color:#d3d3d3;width:160px;float:left;padding:15px;color:blue;cursor:pointer" @click="qiehuan(item.sid)">-->
            <!--                        <img width="30px" height="30px" :src="item.logo">          {{item.short_name_zh}}-->
            <!--                    </div></label>-->
            <!--                <label>-->
            <!--                    <div style="background-color: #89D3FD;width: 4px;height:16px"></div><h5 style="position: relative;top:-20px;left: 10px">欧洲</h5><br>-->
            <!--                    <div v-for="item in seasonlst"  v-if="item.area_id==2" style="margin:15px;border-radius: 4px;background-color:#d3d3d3;width:160px;float:left;padding:15px;color:blue;cursor:pointer" @click="qiehuan(item.sid)">-->
            <!--                        <img width="30px" height="30px" :src="item.logo">          {{item.short_name_zh}}-->
            <!--                    </div></label>-->
            <!--                <label>-->
            <!--                    <div style="background-color: #89D3FD;width: 4px;height:16px"></div><h5 style="position: relative;top:-20px;left: 10px">美洲</h5><br>-->
            <!--                    <div v-for="item in seasonlst"  v-if="item.area_id==3" style="margin:15px;border-radius: 4px;background-color:#d3d3d3;width:160px;float:left;padding:15px;color:blue;cursor:pointer" @click="qiehuan(item.sid)">-->
            <!--                        <img width="30px" height="30px" :src="item.logo">          {{item.short_name_zh}}-->
            <!--                    </div></label>-->
            <!--                <label>-->
            <!--                    <div style="background-color: #89D3FD;width: 4px;height:16px"></div><h5 style="position: relative;top:-20px;left: 10px">亚洲</h5><br>-->
            <!--                    <div v-for="item in seasonlst"  v-if="item.area_id==4" style="margin:15px;border-radius: 4px;background-color:#d3d3d3;width:160px;float:left;padding:15px;color:blue;cursor:pointer" @click="qiehuan(item.sid)">-->
            <!--                        <img width="30px" height="30px" :src="item.logo">          {{item.short_name_zh}}-->
            <!--                    </div></label>-->
          </div>
          <!--<iframe  width='100%' height='820' frameborder="0" security="restricted" :src="match"></iframe>-->
          <div style="margin: 50px"><img width="160px" :src="seasondata[0].seasonlogo">
            <h3>{{seasondata[0].competition}}</h3></div>
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="比赛" name="first">
              <table class="table table-bordered">
                <tr>
                  <th>比赛时间</th>
                  <th>主队</th>
                  <th>比分</th>
                  <th>客队</th>
                  <th>半场比分</th>
                  <th>比赛状态</th>
                </tr>
                <tr v-for="item in seasondata">
                  <td>{{item.match_time | formatDate}}</td>
                  <td @click="teamdetailer(item.home_team_id)" style="cursor:pointer;color:blue"><img
                      v-if="item.homelogo !=''" width="25px;" style="margin-right: 10px" :src="item.homelogo">{{item.home}}
                  </td>
                  <!--                                    <td>{{item.data.home_half_vals[0]}} - {{item.away_scores[0]}}</td>-->
                  <td @click="teamdetailer(item.away_team_id)" style="cursor:pointer;color:blue"><img
                      v-if="item.awaylogo !=''" width="25px;" style="margin-right: 10px" :src="item.awaylogo">{{item.away}}
                  </td>
                  <!--                                    <td style="color:gray">{{item.data.home_half_vals[1]}} - {{item.away_scores[1]}}</td>-->
                  <td>{{item.status_id}}</td>
                </tr>
              </table>
            </el-tab-pane>
            <el-tab-pane label="积分" name="second">
              <table class="table table-bordered">
                <tr>
                  <th>排名</th>
                  <th>球队</th>
                  <th>场次</th>
                  <th>胜</th>
                  <th>平</th>
                  <th>负</th>
                  <th>进球</th>
                  <th>失球</th>
                  <th>净胜球</th>
                  <th>主场积分</th>
                  <th>客场积分</th>
                  <th>总积分</th>
                </tr>

                <tr v-for="item in scoredata">
                  <td>{{item.position}}</td>
                  <td @click="teamdetailer(item.team_id)" style="cursor:pointer;color:blue"><img
                      v-if="item.teamlogo !=''" width="25px" :src="item.teamlogo">{{item.teamname}}
                  </td>
                  <td>{{item.total}}</td>
                  <td style="background-color: #F8F8FC;">{{item.won}}</td>
                  <td style="background-color: #F8F8FC;">{{item.draw}}</td>
                  <td style="background-color:#F8F8FC;">{{item.loss}}</td>
                  <td>{{item.goals}}</td>
                  <td>{{item.goals_against}}</td>
                  <td>{{item.goal_diff}}</td>
                  <td>{{item.home_points}}</td>
                  <td>{{item.away_points}}</td>
                  <td style="background-color: #F8F8FC;">{{item.points}}</td>
                </tr>
              </table>
            </el-tab-pane>
            <el-tab-pane label="球队" name="three" v-if="activeName=='three'">
              <table class="table table-bordered">
                <tr>
                  <th>号码</th>
                  <th>球员</th>
                  <th style="width: 120px"> 出生日</th>
                  <th>身高(cm)</th>
                  <th>体重(kg)</th>
                  <th>位置</th>
                  <th>国籍</th>
                  <th>身价(€)</th>
                </tr>

                <tr v-for="item in teamdetail">
                  <td>{{item.shirt_number}}</td>
                  <td><img width="25px" :src="item.player.logo">{{item.player.name_zh}}</td>
                  <td style="width: 120px">{{item.player.birthday | formatbirth}}</td>
                  <td style="background-color: #F8F8FC;">{{item.player.height}}</td>
                  <td style="background-color: #F8F8FC;">{{item.player.weight}}</td>
                  <td>{{item.position}}</td>
                  <td>{{item.player.nationality}}</td>
                  <td>{{item.player.market_value}}</td>
                </tr>
              </table>
            </el-tab-pane>

          </el-tabs>
          <!--                    <div class="listbottom">-->
          <!--                        <div class="bottomtitle"><span>联盟之最</span></div>-->
          <!--                        <div class="bottombox">-->
          <!--                            <div class="bottomboxtop"><p>胜率PK</p></div>-->
          <!--                        </div>-->
          <!--                    </div>-->

        </div>

      </el-card>

    </div>
    <!--<footerbar></footerbar>-->
    <div class = "load" v-else>
      <div class="loads">
        <img src="@/assets/loadinges.gif" />
        <p style="color: #666666;font-size: 14px;padding-top:5px ">加载中...</p>
      </div>
    </div>
  </div>

</template>

<script>

import footerbar from "@/components/footerbar.vue";
import {seasondata, seasonscore, teamdetail, lqseasondata, lqseasonscore, lqteamdetail, seasonlst} from '@/api'

export default {
  name: "comp",
  components: {
    footerbar
  },
  data() {
    return {
      activeName: 'first',
      match: 'https://tiyu.baidu.com/match/欧冠/tab/排名/',
      seasondata: [],
      sid: this.$route.query.value,
      scoredata: [],
      teamid: '',
      teamdetail: [],
      seasonlst: [],
      moshi: '',
      is_load:1,
    };
  },
  filters: {
    formatDate: function (value) {
      var value = Number(value + '000');
      //console.log(value);
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let m = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;

      return y + '-' + MM + '-' + d + ' ' + h + ':' + m;
    },
    formatbirth: function (value) {
      var value = Number(value + '000');
      //console.log(value);
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;

      return y + '-' + MM + '-' + d;
    }
  },
  created() {
    if (this.$route.query.key == 'lst') {
      this.seasonlster()
      this.seasoner()
      this.moshi = 'lst'

    } else {
      this.moshi = ''
      this.seasoner()
      this.seasonscore()
    }
  },

  mounted() {

  },

  methods: {
    async seasonlster() {
      let res = await seasonlst();
      this.seasonlst = res;
      this.is_load = 0
      setTimeout(function () {
        document.getElementById("homer").offsetHeight = document.getElementById("changhezi").offsetHeight + 100;
      }, 800);
      this.$refs.neikuangg.offsetHeight = this.$refs.homerr.offsetHeight - 50;
    },
    async seasonscore() {
      let data = {
        "sid": this.sid
      }
      if (this.sid == '1057' || this.sid == '1055') {
        let res = await lqseasonscore(data);
        this.scoredata = res;
      } else {
        let res = await seasonscore(data);
        this.scoredata = res;
      }
      setTimeout(function () {
        document.getElementById("homer").offsetHeight = document.getElementById("changhezi").offsetHeight + 30;
      }, 800);
      this.$refs.neikuangg.offsetHeight = this.$refs.homerr.offsetHeight - 50;
    },
    async lqseasoner() {
      //console.log(566222)
      let data = {
        "sid": this.sid
      }
      let res = await lqseasondata(data);
      this.seasondata = res;
      // console.log(res)
      setTimeout(function () {
        document.getElementById("homer").offsetHeight = document.getElementById("changhezi").offsetHeight + 30;
      }, 800);
      this.$refs.neikuangg.offsetHeight = this.$refs.homerr.offsetHeight - 50;
    },
    async seasoner() {
      //console.log(566222)
      let data = {
        "sid": this.sid
      }
      if (this.sid == '1057' || this.sid == '1055') {
        let res = await lqseasondata(data);
        this.seasondata = res;
      } else {
        let res = await seasondata(data);
        this.seasondata = res;
        console.log(res)
      }
      setTimeout(function () {
        document.getElementById("homer").offsetHeight = document.getElementById("changhezi").offsetHeight + 30;
      }, 900);
      this.$refs.neikuangg.offsetHeight = this.$refs.homerr.offsetHeight - 50;
    },
    async teamdetailer(qid) {
      //console.log(qid)


      this.teamid = qid
      let data = {
        "qid": this.teamid
      }
      if (this.sid == '1057' || this.sid == '1055') {
        let res = await lqteamdetail(data)
        this.teamdetail = res
      } else {
        let res = await teamdetail(data)
        this.teamdetail = res
      }
      this.activeName = 'three'
      setTimeout(function () {
        document.getElementById("homer").offsetHeight = document.getElementById("changhezi").offsetHeight + 30;
      }, 1100);
    },

    qiehuan(ming) {
      this.sid = ming
      this.seasoner()
      this.seasonscore()
      this.moshi = ''
      this.activeName = 'first'
      $("#" + this.sid).addClass("is-active").siblings().removeClass("is-active")

    },
    qiehuanlq(qid) {
      this.moshi = ''
      this.sid = qid
      this.lqseasoner()
      this.activeName = 'first'

    }
  }
};
</script>
<style scoped src="../style/bootstrap.min.css"></style>
<style scoped src="../style/common-38da6ceed7.css"></style>
<style lang="stylus">
.matchwrappercomp {
  width: 1150px;
  margin: 60px auto 0;


  .selected {
    width: 600px;
    line-height: 30px;
    background: #f7f7f9;
    display: inline-flex;

    .number {
      text-align: center;
      width: 100px;
      color: #f00;
      padding-left: 20px;

      span {
        display: block;
        float: left;
        margin-right: 5px;
      }

    }
    .selected_event {
      width: 500px;

      span {
        display: block;
        float: left;
        padding: 0px 10px 0px 10px;
        margin: 5px 5px 5px 5px;
        height: 25px;
        line-height: 25px;
        background: #fff;
        border-radius: 3px;
        font-size: 14px;

        i {
          cursor: pointer;
        }

      }
    }
  }

  .event_frame {
    width: 550px;
    height: 800px
    overflow-y: auto;

    position:relative
    .event_list {
      width: 500px;
      clear: both;

      .event_letter {
        width: 100%;
        height: 40px;
        line-height: 40px;

        span {
          font-size: 20px;
          margin-left: 20px;
        }

      }

      .event {
        margin-left: 15px;

        span {
          display: block;
          float: left;
          padding: 0px 10px 0px 10px;
          margin: 5px 5px 5px 5px;
          background: #f2f2f5;
          border-radius: 3px;
          font-size: 14px;
          height: 25px;
          line-height: 23px;
          cursor: pointer;
          border: 1px solid #716b6b;
          color: #7b7676;
          letter-spacing: 1px;
        }

        .checked {
          background: #cdddf1;
          color: #1f1e1e;
          letter-spacing: 1px;
        }

      }
    }

    .letter_list {
      width: 30px;
      position: fixed;
      right: 50px;
      top: 150px;
      z-index: 1000;

      span {
        display: block;
        width: 25px;
        heigth: 25px;
        line-height: 25px;
        border-radius: 50%;
        background: #f1efef;
        margin-top: 5px;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
      }

    }
  }

  .liveTypenav {
    display: flex;
    height: 42px;

    span {
      cursor: pointer;
      position: relative;
      display: inline-block;
      margin: 0 20px 0px 0px;
      width: 80px;
      text-align: center;
      height: 35px;
      line-height: 32px;
      font-size: 16px;
      color: #777;
      float: left;
      letter-spacing: 3px;
      background: #f9f9f9;
      border-radius: 3px;
      border: 1px solid #cac8c8;
      padding-left: 5px;
    }

    span.active {
      box-shadow: 0px 1px 2px #949494;
      background: #fff;
      border: none;
      padding-top: 2px;
      color: #101010;
      font-weight: 500;
    }

    span.checked {
      box-shadow: 0px 1px 2px #949494;
      background: #6ca4de;
      border: none;
      padding-top: 2px;
      color: #f1e9e9;
      font-weight: 500;
    }

  }

  .el-input__inner {
    width: 130px;
    height: 60px;
    text-align: center;
    position: absolute;
    top: 0px;
    left: 0px;
  }

  .date-list {

    ul {
      position: relative;
      left: 140px;
      bottom: 3px;

      .item {
        position: relative;
        display: inline-block;
        padding-top: 5px;
        text-align: center;
        cursor: pointer;
        width: 130px;
        height: 60px;
        background: #efefef;
        margin-right: 10px;
        border-radius: 3px;
        border: 1px solid #d0cece;

        .day {
          font-size: 16px;
          color: #777;
          height: 25px;
          line-height: 25px;
        }

        .date {
          font-size: 14px;
          color: #777;
          height: 25px;
          line-height: 25px;
        }

      }

      .item.current {
        box-shadow: 1px 1px 4px #888;
        background: #fff;
        border: none;
      }

      .item.current .day {
        font-size: 16px;
        color: #000;
      }

      .item.current .date {
        font-size: 16px;
        color: #000;
        letter-spacing: 1px;
        display: block;
      }

    }
  }

  .match-box {
    margin-top: 20px;

    .match-data {

      .match-card {
        height: 80px;
        line-height: 80px;
        background: #fff;
        border-radius: 4px;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        cursor: pointer;

        .text {
          width: 185px;
          height: 50px;
          line-height: 50px;
          text-align: center;

          .event_logo {
            width: 50px;
            padding: 5px;
            position: relative;
            right: 10px;
          }

          .empty_event_logo {
            display: block;
            width: 35px;
            height: 35px;
            background: #f1f1f1;
            border-radius: 50%;
            position: relative;
            top: 10px;
            left: 30px;
            float: left;
          }

          .title {
            display: inline-block;
            font-size: 16px;
            color: #777;
          }

        }

        .event_time {
          width: 90px;
          text-align: center;
        }

        .status {
          width: 90px;
          text-align: center;
        }

        .team {
          width: 380px;
          display: flex;
          align-items: center;

          .host {
            width: 130px;
            font-size: 14px;
            line-height: 80px;
            height: 80px;
            text-align: center;
            position: relative;

            span {
              display: block;
              width: 100%;
              height: 40px;
              line-height: 40px;
              position: absolute;
              bottom: 0px;
            }

            img {
              width: 30px;
              height: 30px;
              margin-bottom: 5px;
            }

            .empty_logo {
              display: block;
              width: 35px;
              height: 35px;
              background: #f1f1f1;
              border-radius: 50%;
              position: relative;
              top: 10px;
              left: 45px;
            }

          }

          .sorce {
            width: 100px;
            text-align: center;

            span {
              display: inline-block;
              font-size: 22px;
              font-weight: bold;
              width: 30px;
              text-align: center;
            }

          }

          .guest {
            width: 130px;
            font-size: 14px;
            line-height: 80px;
            height: 80px;
            text-align: center;
            position: relative;

            span {
              display: block;
              width: 100%;
              height: 40px;
              line-height: 40px;
              position: absolute;
              bottom: 0px;
            }

            img {
              width: 30px;
              height: 30px;
              margin-bottom: 5px;
            }

          }
        }

        .stage {
          font-size: 16px;
          text-align: center;

          span {
            width: 100px;
            text-align: center;
            display: table-cell;
          }

        }

        .live {
          width: 100px;
          text-align: center;

          img {
            width: 35px;
            position: relative;
            top: 12px;
          }

        }

        .follow {
          width: 130px;
          text-align: center;

          i {
            font-size: 24px;
          }

          hover {
            color: red;
          }

        }

        .scswipernext:after, .scswiperprev:after {
          font-size: 14px;
          color: #000;
        }

      }

      .match-card:hover {
        background: #fff;
        box-shadow: -1px 1px 5px #b3b1b1;
      }

    }
  }

  .football_match {
    margin-top: 34px;
    height: 50px;
    line-height: 50px;

    .match-data {

      .match-card {
        background: #fff;
        border-radius: 4px;
        margin-bottom: 16px;
        display: flex;

        .text {
          width: 200px;
          text-align: center;

          .title {
            font-size: 16px;
          }

        }

        .event_time {
          text-align: center;
          width: 100px;
        }

        .status {
          text-align: center;
          width: 100px;
        }

        .team {
          width: 400px;
          text-align: center;
          font-size: 16px;

          .host {
            width: 110px;
            text-align: center;
            display: inline-block;
          }

          .sorce {
            width: 110px;
            text-align: center;
            display: inline-block;
          }

          .guest {
            width: 110px;
            text-align: center;
            display: inline-block;
          }

        }

        .stage {
          width: 200px;
          font-size: 16px;
          text-align: center;
          position: relative;
          left: 25px;

          span {
            width: 100px;
            text-align: center;
            display: table-cell;
          }

        }

        .live {
          width: 150px;
          text-align: center;
          position: relative;
          left: 25px;
        }

        .follow {
          width: 150px;
          text-align: center;
        }

      }
    }
  }

  .football_conduct {
    line-height: 40px;
    height: 40px;
    text-align: center;
    width: 100%;
    margin-top: 20px;

    .title {
      position: relative;
      right: 50px;
    }

    span {
      display: inline-flex;
      font-size: 18px;
      margin-left: 20px;
      height: 40px;
      line-height: 40px;
      letter-spacing: 1px;
    }

    img {
      width: 25px;
      display: inline-flex;
      position: relative;
      top: 5px;
    }

  }

  .football_end {
    line-height: 40px;
    height: 40px;
    text-align: center;
    width: 100%;
    margin-top: 20px;

    .title {
      position: relative;
      right: 50px;
    }

    span {
      display: inline-flex;
      font-size: 18px;
      margin-left: 20px;
      height: 40px;
      line-height: 40px;
      letter-spacing: 1px;
    }

    img {
      width: 25px;
      display: inline-flex;
      position: relative;
      top: 5px;
    }

  }

  .football_not {
    line-height: 40px;
    height: 40px;
    text-align: center;
    width: 100%;
    margin-top: 20px;

    .title {
      position: relative;
      right: 50px;
    }

    span {
      display: inline-flex;
      font-size: 18px;
      margin-left: 20px;
      height: 40px;
      line-height: 40px;
      letter-spacing: 1px;
    }

    img {
      width: 25px;
      display: inline-flex;
      position: relative;
      top: 5px;
    }

  }

  .box-card{
    #changhezi{
      .el-tabs__item {
        width: 84px;
        height: 32px;
        border-width: 1px;
        border-style: solid;
        border-color: rgba(242, 242, 242, 1);
        border-radius: 5px;

        line-height: 32px;
        color: #555555;
        text-align: center;
      }
      .el-tabs__item:hover{
        background: linear-gradient(180deg, rgba(87, 238, 255, 1) 0%, rgba(129, 211, 248, 1) 49%, rgba(37, 149, 230, 1) 94%);
        color: #fff;
      }
      .el-tabs__item:nth-child(2){
        margin-left: 30px;
      }

      .el-tabs__nav{
        border: 0;
      }
      .el-tabs--card>.el-tabs__header{
        border-bottom: 0;
      }
      .el-tabs__item.is-active{
        background: linear-gradient(180deg, rgba(87, 238, 255, 1) 0%, rgba(129, 211, 248, 1) 49%, rgba(37, 149, 230, 1) 94%);
        color: #fff;
      }
    }
    .listbottom{
      overflow: hidden;
      .bottomtitle{
        font-family: 'Arial Narrow Bold', 'Arial Narrow', 'Arial', sans-serif;
        font-weight: 700;
        font-style: normal;
        font-size: 14px;
        color: #FFFFFF;
        background: url("../assets/img/bottomtitile.svg");
        width: 100px;
        height: 33px;
        text-align: center;
        line-height: 33px;
      }
      .bottombox{
        width: 502px;
        height: 196px;
        background: inherit;
        background-color: inherit;
        background-color: rgba(242, 242, 242, 1);
        border: none;
        border-radius: 5px;
      }
    }
  }

}
.is-active{
  color: #007aff;
}
.loads{
  width: 100px;
  height: 100px;
  background:#f0f1f4;
  box-shadow: 0 0 10px #cecece;
  margin: auto;
  padding: 12px;
  border-radius: 5px;
  color:#666;
}
.load{
  height: 500px;
  text-align: center;
  margin-top: 200px;
  img{
    width:55px;
  }
}
.matchwrappercomp .box-card #changhezi .el-tabs__item:hover,.matchwrappercomp .box-card #changhezi .el-tabs__item.is-active{
      background #dbb16f !important
    }
</style>