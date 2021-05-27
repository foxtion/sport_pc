<template>
    <div id="zbj" style="height:6500px">
      <div class="zbjroom">
            <div class = "event_title" style="margin-top: 70px">
                <div class = "home_name">
                    <span class = "team">{{info.main_name}}</span>
                    <img :src="info.main_logo" class = "team_logo"/>
                    <span class = "fraction">{{info.main_score}}</span>
                </div>
                <div class = "sorce">
                    <p class = "event_name">{{info.event_name}}</p>
                    <p class = "event_time"> {{info.matchtime}}</p>
                    <p class = "event_flag">VS</p>
                    <p class = "now_sorce">{{info.status}}</p>
                </div>
                <div class = "away_name">
                    <span class = "fraction">{{info.away_score}}</span>
                    <img :src="info.away_logo" class = "team_logo" />
                    <span class = "team">{{info.away_name}}</span>
                </div>
            </div>

        <div style="position:fixed;left:140px;top:200px; width: 200px;font-size: 12px; " v-if="lsjfb!=null">

          <div style="color:#2483d6; border-left: 4px solid #2483d6;padding-left: 12px;">联赛积分榜</div><br>
        <table style="background: white">
          <tr v-for="item in lsjfb" style="height: 22px"><td style="color:#999;padding: 10px">{{ item.position }}</td><td style="color:#666;padding: 10px">{{ item.teamname }}</td><td style="color:#666;padding: 10px">{{ item.points }}</td></tr>
        </table>
        </div>
        <div style="position:fixed;right:220px;top:200px; width: 90px;font-size: 14px; " >
          <el-button type="primary" @click="jumpmd('lishijiaofeng')" plain>交锋</el-button><br>
          <el-button type="primary" @click="jumpmd('jinqizhanji')" plain>战绩</el-button><br>
          <el-button type="primary" @click="jumpmd('liansaijifen')" plain>积分</el-button><br>
          <el-button type="primary" @click="jumpmd('jinqiufenbu')" plain>进球</el-button><br>
          <el-button type="primary" @click="jumpmd('shangtingqingkuang')" plain>伤停</el-button><br>
          <el-button type="primary" @click="jumpmd('jinqisaicheng')" plain>赛程</el-button><br>

        </div>
      <div class="rate" >
        <el-tag style="margin-left: 340px;font-size: 16px">数据分析</el-tag><el-tag  style="margin-left: 20px;font-size: 16px" type="info" @click="$router.push({name: 'footballevent',query: {event_id :event_id }})">让球</el-tag>
        <el-tag style="margin-left: 20px;font-size: 16px" type="info" @click="$router.push({name: 'footballevent',query: {event_id :event_id }})">胜负</el-tag>
        <el-tag style="margin-left: 20px;font-size: 16px" type="info" @click="$router.push({name: 'footballevent',query: {event_id :event_id }})">进球数</el-tag>
        <el-tag style="margin-left: 20px;font-size: 16px" type="info" @click="$router.push({name: 'footballevent',query: {event_id :event_id }})">三合一</el-tag>
        <el-tag style="margin-left: 20px;font-size: 16px" type="info" @click="$router.push({name: 'footballevent',query: {event_id :event_id }})">技术统计</el-tag>
        <br>
        <div id="lishijiaofeng" style="color:rgb(36, 131, 214);text-align: center;font-size: 20px"> 历史交锋</div>

        <table style="width: 100%;line-height: 25px;font-size: 14px;background: white"  class="table table-bordered" v-if="sjfxdata.length>0">
          <tr><td>赛事</td><td>比赛日期</td><td>主队</td><td>比分</td><td>客队</td><td>半场</td><td>角球</td><td>胜负</td><td>胜负</td><td>让球</td></tr>
          <tr v-for="item in sjfxdata"><td>{{item[12]}}</td><td>{{item[13]}}</td><td :style="item[5][0]==info.mainid?('color:#de1e30;'):('color:black;')">{{item[14]}}</td><td>{{item[5][2]}} - {{item[6][2]}}</td><td>{{item[15]}}</td>
            <td>{{item[5][3]}} - {{item[6][3]}}</td><td>{{item[5][6]}} - {{item[6][6]}}</td><td>
              <span v-if="item[5][2]>item[6][2]" style="color:#de1e30">胜</span>
              <span v-else-if="item[5][2]<item[6][2]" style="color:#85c900">负</span>
              <span v-else style="color:DeepSkyBlue">平</span>
            </td><td ><span v-if="item[16]!=null">{{item[16]}}</span></td><td><span v-if="item[17]!=null">{{item[17]}}</span></td>
          </tr>
        </table>
        <table v-else style="width: 100%;background: white"><tr><td style="color:#999;text-align: center">暂无历史交锋</td></tr></table>
        <div style="width: 1200px;height:auto;">
        <div id="jinqizhanji" style="color:rgb(36, 131, 214);text-align: center;font-size: 20px"> 近期战绩</div>
        <table style="width: 49%;line-height: 25px;font-size: 12px;float:left;background: white"  class="table table-bordered"  v-if="jqzjdata.length>0">
          <tr><td>赛事</td><td>比赛日期</td><td>主队</td><td>比分</td><td>客队</td><td>半场</td><td>胜负</td></tr>
          <tr v-for="itemer in jqzjdata" v-if="itemer[5][0]==info.mainid"><td>{{itemer[12]}}</td><td>{{itemer[13]}}</td><td style="color: #de1e30;">{{itemer[14]}}</td><td>{{itemer[5][2]}} - {{itemer[6][2]}}</td><td>{{itemer[15]}}</td>
            <td>{{itemer[5][3]}} - {{itemer[6][3]}}</td><td>
              <span v-if="itemer[5][2]>itemer[6][2]" style="color:#de1e30">胜</span>
              <span v-else-if="itemer[5][2]<itemer[6][2]" style="color:#85c900">负</span>
              <span v-else style="color:DeepSkyBlue">平</span>
            </td>
          </tr>
          <tr v-for="itemer in jqzjdata" v-if="itemer[6][0]==info.mainid"><td>{{itemer[12]}}</td><td>{{itemer[13]}}</td><td>{{itemer[14]}}</td><td>{{itemer[5][2]}} - {{itemer[6][2]}}</td><td style="color: #de1e30;">{{itemer[15]}}</td>
            <td>{{itemer[5][3]}} - {{itemer[6][3]}}</td><td>
              <span v-if="itemer[6][2]>itemer[5][2]" style="color:#de1e30">胜</span>
              <span v-else-if="itemer[6][2]<itemer[5][2]" style="color:#85c900">负</span>
              <span v-else style="color:DeepSkyBlue">平</span>
            </td>
          </tr>
        </table>
        <table style="width: 49%;line-height: 25px;font-size: 12px;margin-left: 20px;float:left;background: white"  class="table table-bordered"  v-if="jqzjdata.length>0">
          <tr><td>赛事</td><td>比赛日期</td><td>主队</td><td>比分</td><td>客队</td><td>半场</td><td>胜负</td></tr>
          <tr v-for="itemer in jqzjdata" v-if="itemer[5][0]==info.awayid"><td>{{itemer[12]}}</td><td>{{itemer[13]}}</td><td style="color: #de1e30;">{{itemer[14]}}</td><td>{{itemer[5][2]}} - {{itemer[6][2]}}</td><td>{{itemer[15]}}</td>
            <td>{{itemer[5][3]}} - {{itemer[6][3]}}</td><td>
              <span v-if="itemer[5][2]>itemer[6][2]" style="color:#de1e30">胜</span>
              <span v-else-if="itemer[5][2]<itemer[6][2]" style="color:#85c900">负</span>
              <span v-else style="color:DeepSkyBlue">平</span>
            </td>
          </tr>
          <tr v-for="itemer in jqzjdata" v-if="itemer[6][0]==info.awayid"><td>{{itemer[12]}}</td><td>{{itemer[13]}}</td><td>{{itemer[14]}}</td><td>{{itemer[5][2]}} - {{itemer[6][2]}}</td><td style="color: #de1e30;">{{itemer[15]}}</td>
            <td>{{itemer[5][3]}} - {{itemer[6][3]}}</td><td>
              <span v-if="itemer[6][2]>itemer[5][2]" style="color:#de1e30">胜</span>
              <span v-else-if="itemer[6][2]<itemer[5][2]" style="color:#85c900">负</span>
              <span v-else style="color:DeepSkyBlue">平</span>
            </td>
          </tr>
        </table>
        <table v-else style="width: 100%;background: white"><tr><td style="color:#999;text-align: center">暂无近期战绩</td></tr></table>
        </div><br>
        <div style="width: 1200px;height:auto;">
          <table id="liansaijifen" style="width: 100%"><tr><td style="color:rgb(36, 131, 214);text-align: center;font-size: 20px">联赛积分</td></tr></table>

        <table style="width: 49%;line-height: 25px;font-size: 12px;float:left;background: white"  class="table table-bordered" v-if="tablesmain!=null">
          <tr><td colspan="10">  <span >  <img :src="info.main_logo" width="25px" />   {{info.main_name}}</span></td></tr>
          <tr><td></td><td>	比赛场数</td><td>胜场数</td><td>负场数</td><td>平数</td><td>进球</td><td>失球</td><td>净胜球</td><td>积分</td><td>排名</td></tr>
          <tr v-for="item in tablesall" v-if="item.team_id==info.mainid"><td>总成绩</td><td>{{item.played}}</td><td>{{item.won}}</td><td>{{item.lost}}</td><td>{{item.drawn}}</td><td>{{item.goals}}</td><td>{{item.against}}</td>
            <td>{{item.diff}}</td><td>
              {{item.pts}}
            </td><td >{{item.position}}</td>
          </tr>
          <tr v-for="item in tablesmain" v-if="item.team_id==info.mainid"><td>主场</td><td>{{item.played}}</td><td>{{item.won}}</td><td>{{item.lost}}</td><td>{{item.drawn}}</td><td>{{item.goals}}</td><td>{{item.against}}</td>
            <td>{{item.diff}}</td><td>
              {{item.pts}}
            </td><td >{{item.position}}</td>
          </tr>
          <tr v-for="item in tablesaway" v-if="item.team_id==info.mainid"><td>客场</td><td>{{item.played}}</td><td>{{item.won}}</td><td>{{item.lost}}</td><td>{{item.drawn}}</td><td>{{item.goals}}</td><td>{{item.against}}</td>
            <td>{{item.diff}}</td><td>
              {{item.pts}}
            </td><td >{{item.position}}</td>
          </tr>
        </table>

        <table style="width: 49%;line-height: 25px;font-size: 12px;float:left;margin-left: 20px;background: white"  class="table table-bordered" v-if="tablesmain!=null">
          <tr><td colspan="10">  <span >  <img :src="info.away_logo" width="25px" />   {{info.away_name}}</span></td></tr>
          <tr><td></td><td>	比赛场数</td><td>胜场数</td><td>负场数</td><td>平数</td><td>进球</td><td>失球</td><td>净胜球</td><td>积分</td><td>排名</td></tr>
          <tr v-for="item in tablesall" v-if="item.team_id==info.awayid"><td>总成绩</td><td>{{item.played}}</td><td>{{item.won}}</td><td>{{item.lost}}</td><td>{{item.drawn}}</td><td>{{item.goals}}</td><td>{{item.against}}</td>
            <td>{{item.diff}}</td><td>
              {{item.pts}}
            </td><td >{{item.position}}</td>
          </tr>
          <tr v-for="item in tablesmain" v-if="item.team_id==info.awayid"><td>主场</td><td>{{item.played}}</td><td>{{item.won}}</td><td>{{item.lost}}</td><td>{{item.drawn}}</td><td>{{item.goals}}</td><td>{{item.against}}</td>
            <td>{{item.diff}}</td><td>
              {{item.pts}}
            </td><td >{{item.position}}</td>
          </tr>
          <tr v-for="item in tablesaway" v-if="item.team_id==info.awayid"><td>客场</td><td>{{item.played}}</td><td>{{item.won}}</td><td>{{item.lost}}</td><td>{{item.drawn}}</td><td>{{item.goals}}</td><td>{{item.against}}</td>
            <td>{{item.diff}}</td><td>
              {{item.pts}}
            </td><td >{{item.position}}</td>
          </tr>
        </table>
        <table v-else style="width: 100%;background: white"><tr><td style="color:#999;text-align: center">暂无联赛积分</td></tr></table>
          </div><br>

        <table id="jinqiufenbu" style="width: 100%"><tr><td style="color:rgb(36, 131, 214);text-align: center;font-size: 20px">进球分布</td></tr></table>
        <table style="width: 49%;line-height: 25px;font-size: 12px;float:left;background: white"  class="table table-bordered" v-if="distributionmain.hasOwnProperty('all')">
          <tr><td colspan="7"> <span >  <img :src="info.main_logo" width="25px" />   {{info.main_name}}</span></td></tr>

          <tr><td>	</td><td>0-15'</td><td>15-30'</td><td>30-45'</td><td>45-60'</td><td>60-75'</td><td>75-90'</td></tr>
          <tr ><td>总</td><td>{{distributionmain.all.scored[0][0]}}</td><td>{{distributionmain.all.scored[1][0]}}</td><td>{{distributionmain.all.scored[2][0]}}</td><td>{{distributionmain.all.scored[3][0]}}</td><td>{{distributionmain.all.scored[4][0]}}</td>
            <td>{{distributionmain.all.scored[5][0]}}</td>
          </tr>
          <tr ><td>主</td><td>{{distributionmain.home.scored[0][0]}}</td><td>{{distributionmain.home.scored[1][0]}}</td><td>{{distributionmain.home.scored[2][0]}}</td><td>{{distributionmain.home.scored[3][0]}}</td><td>{{distributionmain.home.scored[4][0]}}</td>
            <td>{{distributionmain.home.scored[5][0]}}</td>
          </tr>
          <tr ><td>客</td><td>{{distributionmain.away.scored[0][0]}}</td><td>{{distributionmain.away.scored[1][0]}}</td><td>{{distributionmain.away.scored[2][0]}}</td><td>{{distributionmain.away.scored[3][0]}}</td><td>{{distributionmain.away.scored[4][0]}}</td>
            <td>{{distributionmain.away.scored[5][0]}}</td>
          </tr>
        </table>
        <table style="width: 49%;line-height: 25px;font-size: 12px;float:left;margin-left: 20px;background: white"  class="table table-bordered" v-if="distributionaway.hasOwnProperty('all')">
          <tr><td colspan="7"><span >  <img :src="info.away_logo" width="25px" />   {{info.away_name}}</span></td></tr>
          <tr><td>	</td><td>0-15'</td><td>15-30'</td><td>30-45'</td><td>45-60'</td><td>60-75'</td><td>75-90'</td></tr>
          <tr ><td>总</td><td>{{distributionaway.all.scored[0][0]}}</td><td>{{distributionaway.all.scored[1][0]}}</td><td>{{distributionaway.all.scored[2][0]}}</td><td> {{distributionaway.all.scored[3][0]}}</td><td>{{distributionaway.all.scored[4][0]}}</td>
            <td>{{distributionaway.all.scored[5][0]}}</td>
          </tr>
          <tr ><td>主</td><td>{{distributionaway.home.scored[0][0]}}</td><td>{{distributionaway.home.scored[1][0]}}</td><td>{{distributionaway.home.scored[2][0]}} </td><td>{{distributionaway.home.scored[3][0]}}</td><td>{{distributionaway.home.scored[4][0]}}</td>
            <td>{{distributionaway.home.scored[5][0]}}</td>
          </tr>
          <tr ><td>客</td><td>{{distributionaway.away.scored[0][0]}}</td><td>{{distributionaway.away.scored[1][0]}}</td><td>{{distributionaway.away.scored[2][0]}} </td><td>{{distributionaway.away.scored[3][0]}}</td><td>{{distributionaway.away.scored[4][0]}}</td>
            <td>{{distributionaway.away.scored[5][0]}}</td>
          </tr>
        </table>
        <table v-else style="width: 100%;background: white"><tr><td style="color:#999;text-align: center">暂无进球分布</td></tr></table>
        <div  id="shangtingqingkuang" style="color:rgb(36, 131, 214);text-align: center;font-size: 20px"> 伤停情况</div>
        <table style="width: 100%;line-height: 25px;font-size: 12px;float:left;background: white"  class="table table-bordered" v-if="injury.home.length>0 && injury.away.length>0">

          <tr><td>球队</td><td>球员名字</td><td>球员位置</td><td>头像</td><td>伤停原因</td><td>影响场次</td><td>状态</td></tr>
         <tr v-if="injury.home!=null" v-for="item in injury.home"><td>{{info.main_name}}</td><td>{{item.name}}</td><td>{{item.position}}</td>
           <td><img :src="'http://cdn.sportnanoapi.com/football/player/'+item.logo" width="25px"> </td><td>{{item.reason}}</td><td>{{item.missed_matches}}</td><td>{{item.type}}</td></tr>
          <tr v-if="injury.away!=null" v-for="item in injury.away"><td>{{info.away_name}}</td><td>{{item.name}}</td><td>{{item.position}}</td>
            <td><img :src="'http://cdn.sportnanoapi.com/football/player/'+item.logo" width="25px"> </td><td>{{item.reason}}</td><td>{{item.missed_matches}}</td><td>{{item.type}}</td></tr>
        </table>
        <table v-else-if="injury.home.length==0 && injury.away.length==0" style="width: 100%"><tr><td style="color:#999;text-align: center">暂无伤停情况</td></tr></table>
        <div  id="jinqisaicheng" style="color:rgb(36, 131, 214);text-align: center;font-size: 20px"> 近期赛程</div>
        <table style="width: 49%;line-height: 25px;font-size: 12px;float:left;background: white"  class="table table-bordered">
          <tr><td colspan="6">  <span >  <img :src="info.main_logo" width="25px" />   {{info.main_name}}</span></td></tr>
          <tr><td>赛事</td><td>	日期</td><td>主队</td><td>比分</td><td>客队</td><td>状态</td></tr>
          <tr v-for="item in jqscdata" v-if="item.home_team_id==info.mainid || item.away_team_id==info.mainid" :style="item.id==event_id?('color:#de1e30;'):('color:#666;')"><td>{{info.event_name}}</td>
            <td>{{item.match_time | formatDate}}</td><td>{{item.home_team_name}}</td><td>{{item.home_scores[0]}} : {{item.away_scores[0]}}</td><td>{{item.away_team_name}}</td><td>{{item.status_id}}</td>
          </tr>
        </table>
        <table style="width: 49%;line-height: 25px;font-size: 12px;float:left;margin-left: 20px;background: white"  class="table table-bordered">
          <tr><td colspan="6">   <span >  <img :src="info.away_logo" width="25px" />   {{info.away_name}}</span></td></tr>
          <tr><td>赛事</td><td>	日期</td><td>主队</td><td>比分</td><td>客队</td><td>状态</td></tr>
          <tr v-for="item in jqscdata" v-if="item.home_team_id==info.awayid || item.away_team_id==info.awayid"  :style="item.id==event_id?('color:#de1e30;'):('color:#666;')"><td>{{info.event_name}}</td>
            <td>{{item.match_time | formatDate}}</td><td>{{item.home_team_name}}</td><td>{{item.home_scores[0]}} : {{item.away_scores[0]}}</td><td>{{item.away_team_name}}</td><td>{{item.status_id}}</td>
          </tr>
        </table>

        <br><br><br>
        </div>

      </div>

    </div>
</template>

<script>
import footerbar from "@/components/footerbar.vue";
import { FootballAnalysiser } from '@/api'

export default {
    name: "footanalysis",
    components: {
      footerbar
    },
    data() {
        return {
          event_id:this.$route.query.event_id,
          sjfxdata:[],
          jqzjdata:[],
          first_offer:[],
          instant_disk:[],
          teams:[],
          info:[],
          distribution:[],
          tablesmain:[],
          tablesaway:[],
          tablesall:[],
          injury:[],
          distributionmain:[],
          distributionaway:[],
          jqscdata:[]
        };
    },
  filters: {
    formatDate: function (value) {
      var value=Number(value+'000');
      //console.log(value);
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      return  y + '-' + MM + '-' + d  ;
    }
  },

  created(){
        this.Gameanalysis()
  },

    mounted() {
      this.event_id=this.$route.query.event_id,
        this.Gameanalysis()

    },
  
    methods: {
        async Gameanalysis(){
            let data = {
                'id' :this.event_id
            }
            let res = await FootballAnalysiser(data) ;
            if(res.code == 0 || res.code == 200){
                this.first_offer = res.info.first;
                this.instant_disk = res.info.im;
              this.sjfxdata=res.info.history;
              this.jqzjdata=res.info.jinqirecord;
              this.teams=res.info.teams;
              this.injury=res.info.injury;
              this.info=res.info.info;
              this.lsjfb=res.info.lsjfb;
              this.jqscdata=res.info.saicheng;
              if(res.info.table.hasOwnProperty('data')){
                this.tablesmain=res.info.table.data.home;
              }
              if(res.info.table.hasOwnProperty('data')){
                this.tablesaway=res.info.table.data.away;
              }
              if(res.info.table.hasOwnProperty('data')){
                this.tablesall=res.info.table.data.all;
              }
              if(res.info.goal_distribution.hasOwnProperty('home')){
                this.distributionmain=res.info.goal_distribution.home;
              }
             if(res.info.goal_distribution.hasOwnProperty('away')){
               this.distributionaway=res.info.goal_distribution.away;
             }

            }
        },
      jumpmd(type){
        window.location.hash ='#'+type
      }

    },


};
</script>
<style scoped src="../style/bootstrap.min.css"></style>
<style lang="stylus">
#zbj {
.zbjroom {
  height: auto;
  margin-top:100px;
.event_title{
  margin: auto;
  width:1200px;
  height: 120px;
  background: white;
  border-radius:5px;
  line-height:120px;
>div{
  float: left;
}

.home_name{
  width:500px;
  height: 120px;
  text-align: right;
  line-height: 120px;

.team{
  position: relative;
  bottom: 10px;
  font-size: 20px;
  letter-spacing:1px;
}

.fraction{
  margin:0px 10px 0px 10px;
  font-size:40px;
}

img{
  position: relative;
  top:15px;
  height: 65px;
  margin:0px 10px 0px 20px;
}
}

.sorce{
  width:200px;
  height: 120px;
>p{
  text-align:center;
}

.event_name{
  margin-top:5px;
  height: 25px;
  line-height:25px;
  font-size:14px;
  color:#a1a1a1;
}

.event_time{
  height: 20px;
  line-height:20px;
  font-size:14px;
  color:#a1a1a1;
}

.event_flag{
  height: 30px;
  line-height:30px;
  font-size:18px;
  letter-spacing: 1px;
}

.now_sorce{
  height: 30px;
  line-height:30px;
  font-size:14px;
  color:#a1a1a1;
}
}

.away_name{
  width:500px;
  height: 120px;
  text-align: left;
  line-height: 120px;

.team{
  position: relative;
  bottom: 10px;
  font-size: 20px;
  letter-spacing:1px;
}

.fraction{
  margin:0px 10px 0px 10px;
  font-size:40px;
}

img{
  position: relative;
  top:15px;
  height: 65px;
  margin:0px 10px 0px 20px;
}
}
}

.rate{
  margin: auto;
  width:1200px;
  height: 90px;
  background: white;
  border-radius:5px;
  line-height:120px;
  margin-top:20px;

.classify{
  width:100%;
  height: 30px;
  line-height:30px;
>span{
  width:240px;
  display: block;
  float:left;
  text-align: center;
  letter-spacing: 1px;
  font-size: 14px;
  border-right: 1px solid #dedede;
  height: 20px;
  line-height: 20px;
  margin-top:5px;
}
}

.rate_table{
  width:100%;
  height: 30px;
  line-height:30px;
  border-top:1px solid #dedede;
>div{
  width:240px;
  display: block;
  float:left;
  text-align: center;
  letter-spacing: 1px;
  font-size: 14px;
}

.title{
span{
  display: block;
  border-right: 1px solid #dedede;
  height: 20px;
  line-height: 20px;
  margin-top:5px;
}
}

.rate_fraction{
>span{
  width:79px;
  display: block;
  float:left;
  text-align: center;
  letter-spacing: 1px;
  font-size: 14px;
}

.vertical{
  height: 20px;
  line-height: 20px;
  margin-top:5px;
  width:1px;
  background: #dedede;
  margin-left:2px;
}
}

}
}

.zbjroominner {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  height: 100%;
  padding: 10px 0;
  justify-content: space-between;
>div {
  background: #fff;
  border-radius: 4px;
}

.media {
  width: 860px;
  height: 720px;
  position: relative;
.classify{
  width: 100%;
  height: 40px;
  line-height:40px;
.animation{
  width:50%;
  background: #464545;
  float: left;
  text-align: center;
  font-size: 14px;
  letter-spacing: 1px;
  color:#676060;
  cursor: pointer;

img{
  position: relative;
  top:7px;
  margin-right:10px;
}
}

.video{
  width:50%;
  background:#636161;
  float: left;
  text-align: center;
  font-size: 14px;
  letter-spacing: 1px;
  color:#92949e;
  cursor: pointer;
img{
  position: relative;
  top:7px;
  margin-right:10px;
}
}

>div:hover{
  color:#eca609;
  font-weight: bold;
}

.hover{
  color:#eca609;
  font-weight: bold;
}
}
.animation_content{
  width:100%;
  height: 530px;
  background:#4c4b4b;
.content{
  width:100%;
  background:#4c4b4b;
#animation_content{
  width:800px;
  height: 530px;
  margin-left:30px;
}
}
}

.video_content{
  width:100%;
  height: 530px;
  background: #343434;

.content{
  width:100%;
  height: 530px;
  background: #4c4b4b;
}
}

.evnet_status{
  width:100%;
  height: 150px;
  background: #3e3e3e;
  padding-top:10px;
.team_control{
  height: 50px;
  line-height:50px;
  width:100%;

>div{
  float:left;
}

.home_state{
  width:200px;
  height: 40px;
>div{
  float:left;
  width: 60px;
  text-align:center;
  height: 40px;
img{
  margin-right: 10px;
  width:20px;
  position: relative;
  top:5px;
}

span{
  color:#fff;
  font-size:14px;
  position: relative;
  top:5px;
}
}
}

.ball_control{
  width:460px;
  height: 40px;
>div{
  float:left;
}

.home_control{
  width:200px;
  height: 40px;
span{
  display: block;
  float:left;
  width:30px;
  height: 40px;
  line-height:52px;
  text-align: center;
  font-size:14px;
  color:#fff;
}

.progress{
  width:160px;
  float:left;
.el-progress{
  transform:rotate(180deg);
  position: relative;
  top:23px;
}
}

}

.control{
  width:60px;
  height: 40px;
  text-align: center;
  font-size: 14px;
  color:#fff;
  letter-spacing: 1px;
}

.away_control{
  width:200px;
  height: 40px;
span{
  display: block;
  float: right;
  width:30px;
  height: 40px;
  line-height:52px;
  text-align: center;
  font-size:14px;
  color:#fff;
}

.progress{
  width:160px;
  float:left;
  margin-left:10px;
.el-progress{
  position: relative;
  top:23px;
}
}
}
}

.away_state{
  width:200px;
  height: 40px;
>div{
  float: right;
  width: 60px;
  text-align:center;
  height: 40px;
img{
  margin-right: 10px;
  width:20px;
  position: relative;
  top:5px;
  left:10px;
}

span{
  color:#fff;
  font-size:14px;
  position: relative;
  top:5px;
}
}
}
}

.home_score{
  width:430px;
  height: 90px;
  float:left;
.home_line{
  height: 40px;
  line-height:40px;
>span{
  display: block;
  float:left;
  width:40px;
  text-align: center;
  font-size: 14px;
  letter-spacing: 1px;
  color: #fff;
}

.middle{
  margin:0px 8px 0px 8px;
}
.progress{
  width:145px;
  float:left;
.el-progress{
  transform:rotate(180deg);
  position: relative;
  top:17px;
}
}
}
}

.away_score{
  width:430px;
  height: 90px;
  float:left;

.away_line{
  height: 40px;
  line-height:40px;
>span{
  display: block;
  float:left;
  width:40px;
  height: 40px;
  line-height:40px;
  text-align: center;
  font-size: 14px;
  letter-spacing: 1px;
  color: #fff;
}

.middle{
  margin:0px 8px 0px 8px;
}
.progress{
  width:145px;
  float:left;
.el-progress{
  position: relative;
  top:17px;
}
}
}
}
}
}
}
}

.diagram{
  width:1200px;
  height: 220px;
  background: #fff;
  box-shadow:0 2px 6px rgba(4,0,0,0.1);
  margin: 50px auto;
  position: relative;

.team-box{
  width:240px;
  float: left;
.home_team{
  line-height: 100px;
  font-size:18px;
  text-align: center;
  letter-spacing: 1px;
.logo{
  height: 50px;
  line-height: 50px;
img{
  height: 35px;
}
}

.name{
  height: 50px;
  line-height: 50px;
}
}

.away_team{
  line-height: 100px;
  font-size:18px;
  text-align: center;
  letter-spacing: 1px;
.logo{
  height: 50px;
  line-height: 50px;
img{
  height: 35px;
  margin-top:15px;
}
}

.name{
  height: 50px;
  line-height: 50px;
}
}
}

.dividing_line{
  height: 160px;
  width:900px;
  position: relative;
  top:35px;
  display: flex;
.boundary{
  width:160px;
  border-left:1px solid #cccccc;
  height: 160px;
  float:left;
}

.boundary_end{
  width:1px;
  border-left:1px solid #cccccc;
  height: 160px;
  background: cornsilk;
}
span{
  font-size:12px;
  color:#cccccc;
  position: relative;
  bottom:20px;
  right:6px;
}
}

.team_progress{
  height: 160px;
  width:900px;
  position: absolute;
  top:25px;
  left:240px;

.home_progress{
  height: 80px;
  line-height: 80px;
  position: relative;

.incident{
  height: 80px;
  position: absolute;
  padding:0px 5px 0px 5px;
  z-index: 1000;
  bottom: 10px;
  min-width:200px;
.is_hover{
  display: none;
}

.incident_info{
  border-radius: 8px;
  box-shadow: 1px 1px 2px #9c9c9c;
  position: relative;
  right:50%;
  padding:5px 5px 0px 5px;
  height: 45px;
  background: #fff;
>p{
span{
  display: block;
  font-size:12px;
  height: 20px;
  line-height: 20px;
  letter-spacing:1px;
}
}

.thing{
  float:left;
  padding-left:5px;
}

.time{
  width:35px;
  height: 35px;
  text-align: center;
  line-height: 35px;
  color:#fff;
  background: #f8c21b;
  border-radius: 5px;
  font-size:16px;
  margin-left:10px;
  float:right;
}
}

.mark{
  width:25px;
  height: 30px;
  clear:both;
  line-height: 30px;
  position: absolute;
  top:50px;
  cursor: pointer;
img{
  margin-top:5px;
}

}
}
}

.away_progress{
  height: 80px;
  line-height: 80px;
  position: relative;
.incident{
  height: 80px;
  position: absolute;
  padding:0px 5px 0px 5px;
  z-index: 1000;
  bottom: 10px;
  min-width:200px;
.is_hover{
  display: none;
}
.incident_info{
  border-radius: 8px;
  box-shadow: 1px 1px 2px #9c9c9c;
  position: relative;
  right:50%;
  padding:5px 5px 0px 5px;
  height: 45px;
  background: #fff;
>p{
span{
  display: block;
  font-size:12px;
  height: 20px;
  line-height: 20px;
  letter-spacing:1px;
}
}

.thing{
  float:left;
  padding-left:5px;
}

.time{
  width:35px;
  height: 35px;
  text-align: center;
  line-height: 35px;
  color:#fff;
  background: #f8c21b;
  border-radius: 5px;
  font-size:16px;
  margin-left:10px;
  float:right;
}
}

.mark{
  width:100px;
  height: 30px;
  clear:both;
  line-height: 30px;
  position: absolute;
  top:50px;
  cursor: pointer;
img{
  margin-top:5px;
}

}
}
}
}
}

.team_detail{
  width:1200px;
  background: #fff;
  box-shadow:0 2px 6px rgba(4,0,0,0.1);
  margin: 50px auto;
  position: relative;

.el-tabs__header{
  padding:10px 20px 0px 20px;
}

.el-drawer__header{
  padding:0px 0px 0px 36%;
  height:50px;
  line-height: 50px;
span{
  color:#f00;
  font-size:20px;
  font-weight:bold;
  letter-spacing:1px;
}
}

.el-tabs__item{
  padding:0 40px 0px 40px;
  height:50px;
  line-height: 50px;
  letter-spacing: 1px;
  text-align: center;
  font-size:18px;
  font-family: math;
}

.block{
  padding:10px 20px 10px 20px;

.el-timeline-item__node--normal{
  top:25px;
}

.el-timeline-item__tail{
  top:25px;
}

.event_logo{
  width:25px;
  float:left;
  margin-right:20px;
}

p{
  height: 25px;
  line-height: 25px;
  font-size: 14px;
}
}

.lineup{
  padding:10px 10px 10px 10px;
  width:100%;
.team{
  height: 150px;
>div{
  float:left;
}

.home_team{
  width:40%;
  text-align: center;
.logo{
  height: 50px;
img{
  height: 50px;
}
}

.name{
  height: 60px;
  line-height: 60px;
  font-size:26px;
  letter-spacing: 1px;
}
}

.mark{
  height: 60px;
  width:20%;
p{
  text-align: center;
  color:rgba(221,221,221,1);
  font-size:70px;
  font-family:'Noto Sans S Chinese';
  height: 60px;
}

}

.away_team{
  width:40%;
  text-align: center;
.logo{
  height: 50px;
img{
  height: 50px;
}
}

.name{
  height: 60px;
  line-height: 60px;
  font-size:26px;
  letter-spacing: 1px;
}
}
}

.lineup_list{
>div{
  display: block;
  float:left;
}
.home_lineup{
  width:340px;
  background: #eee;

.change_player{
  height: 40px;
  line-height: 40px;
  border-top:1px solid #DEDEDE;
p{
  float:left;
  width:50%;
span{
  display: block;
  float:left;
  font-size:12px;
}
}

.in_player{
span{
  float: right;
}

img{
  width: 30px;
  height: 30px;
  position: relative;
  top:10px;
}

i{
  float:right;
  width:20px;
  height:20px;
  line-height: 20px;
  font-size:16px;
  position:relative;
  top:10px;
  right:5px;
  color:#a79d9d;
  border-radius:50%;
  background:#d8d2d2;
  text-align:center;
  margin-left:5px;
}
}

.out_player{
  position: relative;
img{
  width: 30px;
  height: 30px;
  position: relative;
  top:10px;
}

i{
  float:left;
  width:20px;
  height:20px;
  line-height: 20px;
  font-size:16px;
  position:relative;
  top:10px;
  right:15px;
  color:#a79d9d;
  border-radius:50%;
  background:#d8d2d2;
  text-align:center;
  margin-left:10px;
}

.name{
  position: absolute;
  left:60px;
  bottom:10px;
  width:110px;
  text-align: left;
}
}
}

p{
  height: 40px;
  line-height: 40px;
  border-top:1px solid #DEDEDE;
  text-align:right;
i{
  float:right;
  width:30px;
  height:30px;
  line-height: 30px;
  font-size:24px;
  position:relative;
  top:5px;
  right:10px;
  color:#a79d9d;
  border-radius:50%;
  background:#d8d2d2;
  text-align:center;
  margin-left:10px;
}

>div{
  float:left;
}

>span{
  display: block;
  float: right;
  margin-right: 10px;
  height: 30px;
img{
  position: relative;
  height:30px;
  width:30px;
}

.event_icon{
  width: 20px;
  top:5px;
}

.avatar{
  top:6px;
}
}

.jersey{
  font-size:12px;
  width:20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  border-radius: 50%;
  background: #000000;
  color: #fff;
  position: relative;
  top:10px;
}

.name{
  font-size:14px;
}

.time{
  font-size:14px;
}
}

.substitute{
  font-size: 14px;
  letter-spacing: 1px;
  box-shadow:0 2px 1px 0 rgba(0,0,0,0.1);
  text-align: center;
}
}

.court{
  width:500px;
  height: 786px;
  background: url('~@/assets/img/football_team_bg.png') no-repeat;

.home_player{
  width: 100%;
  height: 393px;
  position: relative;

.player{
  height: 40px;
  line-height: 40px;
  position: absolute;
  z-index: 200;
>span{
  display: block;
}
img{
  position: relative;
  left:0px;
  top:0px;
  width: 30px;
}

.jersey{
  font-size:12px;
  width:20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  border-radius: 50%;
  background: #000000;
  color: #fff;
  position: absolute;
  top:8px;
  left:-17px;
}

.name{
  font-size:12px;
  height: 20px;
  line-height: 20px;
  position: relative;
  left:-45%;
  bottom:18px;
  color:#fff;
  width:120px;
  text-align: center;
}

.sorce{
  position: absolute;
  top:0px;
  left:30px;
  font-size:14px;
  color:#f97605;
}
}
}

.away_player{
  width: 100%;
  height: 393px;
  position: relative;
.player{
  height: 40px;
  line-height: 40px;
  position: absolute;
  z-index: 200;
  text-align:right;
>span{
  display: block;
}
img{
  position: relative;
  left:0px;
  top:0px;
  width: 30px;
}

.jersey{
  font-size:12px;
  width:20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  border-radius: 50%;
  background: #fff;
  color: #000;
  position: absolute;
  top:5px;
  right:-20px;
}

.name{
  font-size:12px;
  height: 20px;
  line-height: 20px;
  position: relative;
  left:40%;
  bottom:18px;
  color:#fff;
}

.sorce{
  position: absolute;
  top:0px;
  right:30px;
  font-size:14px;
  color:#f97605;
}
}
}
}

.away_lineup{
  width:340px;
  background: #eee;
p{
  height: 40px;
  line-height: 40px;
  border-top:1px solid #DEDEDE;
  text-align:left;

i{
  float:left;
  width:30px;
  height:30px;
  line-height: 30px;
  font-size:24px;
  position:relative;
  top:5px;
  right:0px;
  color:#a79d9d;
  border-radius:50%;
  background:#d8d2d2;
  text-align:center;
  margin-left:10px;
}

>span{
  display: block;
  float: left;
  margin-left: 10px;
  height: 30px;
img{
  position: relative;
  width:25px;
}

.event_icon{
  width: 20px;
  top:5px;
}

.avatar{
  top:6px;
}
}

.jersey{
  font-size:12px;
  width:20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  border-radius: 50%;
  background: #000000;
  color: #fff;
  position: relative;
  top:10px;
}

.name{
  font-size:14px;
}

.time{
  font-size:14px;
}
}

.substitute{
  font-size: 14px;
  letter-spacing: 1px;
  box-shadow:0 2px 1px 0 rgba(0,0,0,0.1);
  text-align: center;
}
}
}
}

.finger{
  padding:0px 20px 20px 20px;
.el-tabs__header{
  padding:0px 20px 0px 0px;
}

.el-table__empty-text{
  font-size:30px;
  letter-spacing:1px;
  font-weight:500;
  display: block;
  height: 400px;
  line-height: 400px;
}

.el-tabs__item{
  padding:0px 40px 0px 40px;
  height:40px;
  line-height: 40px;
  letter-spacing: 1px;
  text-align: center;
  font-size:16px;
  font-family: math;
}

.el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover{
  color:#409EFF;
}

.el-table th>.cell{
  text-align: center;
}

.el-table .cell{
  text-align: center;
}

.first_offer{
  width: 420px;
>span{
  display: block;
  float:left;
  width:125px;
  text-align: center;
}
}

.instant_disk{
  width: 420px;
>span{
  display: block;
  float:left;
  width:125px;
  text-align: center;
}
}

.move{
  text-align: right;
  cursor: pointer;
  height: 30px;
  line-height: 30px;
}
}

.el-tabs__header{
  padding:10px 0px 0px 20px;
}

.el-tabs--left .el-tabs__header.is-left{
  margin-right:0px;
}

.el-table .cell{
  text-align: center;
}

.demo-drawer__content{
  margin-top:5px;
.finger_list{
.el-table__footer-wrapper, .el-table__header-wrapper{
  display: none;
}

.el-table__body{
  margin-top:10px;
}
}

.el-tabs__active-bar .is-left{
  height:35px;
}

.el-tabs__item.is-active{
  background:#b2c0f3;
  border-radius: 5px;
  color:#fff;
  height:35px;
  line-height: 35px;
}

.el-tabs__item{
  padding:0 10px 0px 10px;
  height:35px;
  line-height: 35px;
  font-size:14px;
  margin-right:15px;
}

.header{
  position: absolute;
  height: 40px;
  line-height: 40px;
  width:575px;
  top:50px;
  background: #e2dbdb;
  z-index: 100;
  border-bottom:1px solid #b9b4b4;
  font-size:14px;
  color:#9a9292;
  letter-spacing:1px;
>span{
  display: block;
  float: left;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
}

.el-table td, .el-table th{
  height: 35px;
  line-height: 35px;
  padding:0px;
}
}

.ball{
.el-table td, .el-table th{
  height: 35px;
  line-height: 35px;
  padding:0px;
}

.el-table_1_column_1{
  border-right: 1px solid #ecedef;
}

.el-table_1_column_2{
  border-right: 1px solid #ecedef;
}

.el-table_1_column_3{
  border-right: 1px solid#ecedef;
}
}

.victory_defeat{
.el-table td, .el-table th{
  height: 35px;
  line-height: 35px;
  padding:0px;
}

p{
  height: 30px;
  line-height: 30px;
}
}

.total_goals{
.el-table td, .el-table th{
  height: 35px;
  line-height: 35px;
  padding:0px;
}

.el-table_3_column_11{
  border-right: 1px solid #ecedef;
}

.el-table_3_column_12{
  border-right: 1px solid #ecedef;
}

.el-table_3_column_13{
  border-right: 1px solid#ecedef;
}
}

.corner_kick{
.el-table td, .el-table th{
  height: 35px;
  line-height: 35px;
  padding:0px;
}

.el-table_4_column_15{
  border-right: 1px solid #ecedef;
}

.el-table_4_column_16{
  border-right: 1px solid #ecedef;
}

.el-table_4_column_17{
  border-right: 1px solid#ecedef;
}
}
}

.vcp-controls-panel.show{
  display: none;
}

}

</style>



