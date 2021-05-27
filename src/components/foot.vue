<template>
    <div class="match-box" v-if="football.length > 0 && state > 0" style="margin-top: 1px;">
        <div class="match-data">
<!--            <iframe v-if="state==2 && football.length>0" width="175" height="800px" ref="zhishudata"  frameborder="no" border="0" scrolling="no" style="position:absolute;left:1100px; top:380px;z-index:9999" src="https://api.daoyunxiang.com/static/xigua/oddsdata.html"></iframe>-->
            <table id="list" class="table table-striped" cellspacing="0" cellpadding="0"  ><tbody>
            <tr class="dd-item data dd-3511228"  v-for="(foot, i) in football" :key="i" v-if="foot.is_retain && foot.is_sticky != 1"  :style="i%2==0?('background-color: #f9f9f9'):('background-color: white')">
                <td class="" style="width: 70px">
<!--                    <el-checkbox class = "check" v-model="foot.check"></el-checkbox>-->
                    <img id="u819_img" @click="hidefoot(i)" class="img" width="20px" style="cursor:pointer;" src="../assets/img/u719.png">
                </td>
                <td class="lab-events" :style="{background:foot.events_color}">
<!--                    <img :src="foot.events_logo" class = "event_logo" v-if ="foot.events_logo != ''" style="height:28px;width: 26px;"/>-->
<!--                    <span v-else class = "empty_event_logo"></span>-->
                    <a class="event-name lang" href="javascript:void(0)" target="_self" style="text-align:center;width: 100%;position: relative;color:white">&nbsp;&nbsp;&nbsp;{{ foot.short_name_zh }}</a>
                </td>
                <td class="lab-time">
                    <span class="time">{{ foot.opening_time_text }}</span>
                </td>
                <td class="lab-lottery">
                    <span class="text-jc"></span>
                    <span class="text-bd"></span>
                    <span class="text-zc"></span>
                </td>
                <td class="lab-status skin-color-s color-red start"><div  v-if="state==2 && foot.bstime>0"><i class="el-icon-time" v-if="state==2 "></i>{{foot.bstime}}</div>
                    <div  v-else-if="state==8">未</div>
                <div v-else>{{foot.status_text}}</div>
                </td>
                <td class="lab-team-home bd-left"  :style="iszhujin==foot.id?('background:#ffd6d3;width: 160px;'):('width: 160px;')">

        <span class="rank homerank hide">
        </span>

                    <span style="border-radius: 3px;font-size: 12px;color: #fff;padding: 0 2px;margin-left: 1px;vertical-align: middle;background-color: #f2bf51;"  v-if="foot.yellowhome>0">{{ foot.yellowhome }}</span>
                    <span style="border-radius: 3px;font-size: 12px;color: #fff;padding: 0 2px;margin-left: 1px;vertical-align: middle;background-color: #de1e30;" v-if="foot.redhome>0">{{ foot.redhome }}</span>

                    <span class="name color-666 lang " :style="iszhujin==foot.id?('background:#ffd6d3;color:#de1e30;'):('color:black;')">
                                    <transition name="slide-fade">
<img width="15px" src="../assets/img/jqtsqiu.png" v-if="iszhujin==foot.id">
</transition>
                         {{ foot.main_name }}</span>
                </td>
                <td class="lab-score color-red">
                    <div class="find">
                        <el-tooltip class="item" effect="dark" placement="right-end"   v-if="state!=8">
                            <div slot="content"  v-if="state!=8">

                                <div style="color:white;text-align: center;background: #313131">
                                <div style="background: #1E2020;height: 40px;width:107%;padding:15px 5px; position: relative; left:-10px;top:-10px; ">
                                 <span style="width:120px;text-align: left;padding-left: 5px"> {{ foot.main_name }}  </span>                <span style="margin-left: 8px;padding-left: 5px;width: 130px;text-align: right">{{ foot.deputy_name }}</span>
                                </div>
<br>
                             <table  class="tab"><tr v-for="item in jstjdata" ><td style="width: 110px;">
                                 <div v-if="item.position==1">
                                     <div  v-if="item.type==1"><img width="24px" src="../assets/img/syzqico2.png"></div>
                                     <div  v-else-if="item.type==3"><img width="15px" src="../assets/img/huangpai.png"></div>
                                    <div  v-else-if="item.type==4"><img width="15px" src="../assets/img/hongpai.png"></div>
<!--                                     <div  v-else-if="item.type==19" style="width: 50px;height:25px;color:white"><img width="24px" src="../assets/img/shaozi.png">伤停补时 </div>-->
                                   <div  v-else-if="item.type==11" style="width: 50px;height:25px;color:white">中场<img width="24px" src="../assets/img/shaozi.png"></div>
                                     <div  v-else-if="item.type==17" style="width: 50px;height:25px;color:white">{{item.player_name}}<img width="24px" src="../assets/img/wulongfoot.png">乌龙球</div>
                                     <div style="color:white" v-else-if="item.type==9"><span style="color:gray">{{item.out_player_name}}</span><img width="15px" src="../assets/img/huanren.png">
                                       <span style="color:white">{{item.in_player_name}}</span> </div>
                                   <div  v-else style="width: 100%;height:25px;color:white">{{item.player_name}}<img width="24px" src="../assets/img/shaozi.png"></div>
                                 </div>
                               <div v-else-if="item.position==0"><img width="24px" src="../assets/img/shaozi.png"></div>
                             </td>
                                 <td  style="width: 40px">{{item.time}}' </td>
                                 <td  style="width: 110px">
                                     <div v-if="item.position==2">
                                             <div  v-if="item.type==1"><img width="25px" src="../assets/img/syzqico2.png"></div>
                                             <div  v-else-if="item.type==3"><img width="15px" src="../assets/img/huangpai.png"></div>
                                             <div v-else-if="item.type==4"><img width="15px" src="../assets/img/hongpai.png"></div>
<!--                                         <div  v-else-if="item.type==19" style="width: 50px;height:25px;color:white"><img width="24px" src="../assets/img/shaozi.png">伤停补时</div>-->
                                         <div  v-else-if="item.type==11" style="width: 50px;height:25px;color:white"><img width="24px" src="../assets/img/shaozi.png">中场</div>
                                         <div  v-else-if="item.type==17" style="width: 50px;height:25px;color:white"><img width="24px" src="../assets/img/wulongfoot.png">{{item.player_name}} 乌龙球</div>
                                             <div style="color:white" v-else-if="item.type==9"><span style="color:white">{{item.in_player_name}}</span> <img width="15px" src="../assets/img/huanren.png">
                                               <span style="color:gray">{{item.out_player_name}}</span></div>
                                       <div  v-else style="width: 100%;height:25px;color:white"><img width="24px" src="../assets/img/shaozi.png">{{item.player_name}}</div>
                                     </div>
                                 </td>
                             </tr></table>
                                    <table v-if="jstjscore.length>0" class="tab">
                                 <tr><td colspan="5"><span style="text-align: center">技术统计</span> </td></tr>
                                 <tr>
                                     <td>{{jstjscore[2][4]}}</td>
                                     <td style="width: 110px"><el-progress  class="mirrorRotateLevel" :percentage="jstjscore[2][4]*10" color="#e6a23c" :show-text="false"></el-progress></td>
                                     <td style="width: 40px">角球</td>
                                     <td style="width: 110px"><el-progress :percentage="jstjscore[3][4]*10" color="#e6a23c" :show-text="false"></el-progress></td>
                                     <td>{{jstjscore[3][4]}}</td>  </tr>
                                    <tr>
                                        <td>{{jstjscore[2][2]}}</td>
                                        <td style="width: 110px"><el-progress  class="mirrorRotateLevel" :percentage="jstjscore[2][2]*10" color="#e6a23c" :show-text="false"></el-progress></td>
                                        <td style="width: 40px">红牌</td>
                                        <td style="width: 110px"><el-progress :percentage="jstjscore[3][2]*10" color="#e6a23c" :show-text="false"></el-progress></td>
                                        <td>{{jstjscore[3][2]}}</td>
                                    </tr>
                                    <tr>
                                        <td>{{jstjscore[2][3]}}</td>
                                        <td style="width: 110px"><el-progress  class="mirrorRotateLevel" :percentage="jstjscore[2][3]*10" color="#e6a23c" :show-text="false"></el-progress></td>
                                        <td style="width: 40px">黄牌</td>
                                        <td style="width: 110px"><el-progress :percentage="jstjscore[3][3]*10" color="#e6a23c" :show-text="false"></el-progress></td>
                                        <td>{{jstjscore[3][3]}}</td>  </tr>
                                    <tr>
                                        <td>{{jstjscore[2][6]}}</td>
                                        <td style="width: 110px"><el-progress  class="mirrorRotateLevel" :percentage="jstjscore[2][6]*10" color="#e6a23c" :show-text="false"></el-progress></td>
                                        <td style="width: 40px">点球</td>
                                        <td style="width: 110px"><el-progress :percentage="jstjscore[3][6]*10" color="#e6a23c" :show-text="false"></el-progress></td>
                                        <td>{{jstjscore[3][6]}}</td>
                                    </tr>
                             </table>
                                </div>
                            </div>
                        <div class="score"   v-if="state!=8" @mouseenter="jxtjdata(foot.id,state)"><b class="color-red skin-color-s" style="color: #FF7503; font-size: 16px; font-family: 'Arial Narrow Bold', 'Arial Narrow', 'Arial';"><span   v-if="state!=8">{{foot.main_fraction}}</span>-<span   v-if="state!=8">{{foot.deputy_fraction}}</span></b></div>
                        </el-tooltip>
                        <div class="score"   v-if="state==8" ><b class="color-red skin-color-s" style="color: #666; font-size: 14px; font-family: 'Arial Narrow Bold', 'Arial Narrow', 'Arial';">VS</b></div>
                    </div>
                </td>
                <td class="lab-team-away"  :style="iskejin==foot.id?('background:#ffd6d3;width: 160px;'):('width: 160px;')">

                    <span class="name color-666 lang " :style="iskejin==foot.id?('background:#ffd6d3;color:#de1e30;'):('color:black;')">{{ foot.deputy_name }}

                    <transition name="slide-fade">
     <img width="15px" src="@/assets/img/jqtsqiu.png" v-if="iskejin==foot.id">
</transition>
                    </span>
                    <span style="border-radius: 3px;font-size: 12px;color: #fff;padding: 0 2px;margin-left: 1px;vertical-align: middle;background-color: #de1e30;" v-if="foot.redaway>0">{{ foot.redaway }}</span>
                    <span style="border-radius: 3px;font-size: 12px;color: #fff;padding: 0 2px;margin-left: 1px;vertical-align: middle;background-color: #f2bf51;"  v-if="foot.yellowaway>0">{{ foot.yellowaway }}</span>

                    <!--<span class="card awayredcards bgcolor-red hide">0</span>-->
                    <!--<span class="card awayyellowcards bgcolor-yellow4 hide">0</span>-->
                    <span class="rank awayrank  hide">
        </span>
                </td>
                <td class="lab-half" style="text-align: left;color:#03a9f4"><span  v-if="state!=8">{{foot.main_half_fraction}}</span> - <span   v-if="state!=8">{{foot.deputy_half_fraction}}</span></td>
                <td class="lab-corner" style="text-align: left"><span   v-if="state!=8">{{foot.main_kick}}</span> - <span   v-if="state!=8">{{foot.deputy_kick}}</span></td>
                <td class="lab-live" @click="footballevent(foot)">
                    <div style=" width:26px;height:26px;border-radius: 6px;overflow:hidden;cursor:pointer;"><img  src="@/assets/img/icon-202.png"  v-if="foot.is_animation == 1 " style="width: 20px" />
                        <img  src="@/assets/img/icon-201.png" v-else style="width: 20px" />

                    </div>
                </td>
                <td class="lab-sb bd-left" >
                    <el-tooltip class="item"    placement="top" effect="light">
                        <div slot="content">
                            <div style="width: 100%;background: #f0f1f6;height: 30px;padding-top:8px;text-align: center">
                                <span style="color:#de1e30;width: 100%">{{ foot.main_name }} VS {{ foot.deputy_name }}</span></div><br/>
                            <label style="margin-left: 95px">亚</label>
                            <label style="margin-left: 140px">欧</label>
                            <label style="margin-left: 155px">大</label><br/>
                            <table><tr><td> <span style="color:#666"> 初始 </span></td>
                            <td style="text-align: center;width: 50px"><span style="color:#999;" v-if="oddsdataya.length>0">{{oddsdataya[numa][2] | numberformat}}</span></td>
                                <td style="text-align: center;width: 50px"><span style="color:#666;"  v-if="oddsdataya.length>0">{{oddsdataya[numa][3] | numberformat}}</span></td>
                                          <td style="text-align: center;width: 50px"><span style="color:#999;"  v-if="oddsdataya.length>0">{{oddsdataya[numa][4] | numberformat}}</span></td>
                                          <td style="text-align: center;width: 50px"><span style="color:#999;"   v-if="oddsdataou.length>0">{{oddsdataou[numb][2] | numberformat}}</span></td>
                                          <td style="text-align: center;width: 50px"><span style="color:#666;"  v-if="oddsdataou.length>0">{{oddsdataou[numb][3] | numberformat}}</span></td>
                                          <td style="text-align: center;width: 50px"><span style="color:#999;"  v-if="oddsdataou.length>0">{{oddsdataou[numb][4] | numberformat}}</span></td>
                                          <td style="text-align: center;width: 50px"><span style="color:#999;"  v-if="oddsdatada.length>0">{{oddsdatada[numc][2] | numberformat}}</span></td>
                                          <td style="text-align: center;width: 50px"><span style="color:#666;"  v-if="oddsdatada.length>0">{{oddsdatada[numc][3] | numberformat}}</span></td>
                                          <td style="text-align: center;width: 50px"><span style="color:#999;"  v-if="oddsdatada.length>0">{{oddsdatada[numc][4] | numberformat}}</span></td>
                            </tr>
<tr><td> <span style="color:#666"> 即时 </span></td>
                            <td style="text-align: center;width: 50px"><span style="color:#999;"  v-if="oddsdataya.length>0">{{oddsdataya[0][2] | numberformat}}</span></td>
                                <td style="text-align: center;width: 50px"><span style="color:#666;"  v-if="oddsdataya.length>0">{{oddsdataya[0][3] | numberformat}}</span></td>
                                          <td style="text-align: center;width: 50px"><span style="color:#999;"  v-if="oddsdataya.length>0">{{oddsdataya[0][4] | numberformat}}</span></td>
                                          <td style="text-align: center;width: 50px"><span style="color:#999;"  v-if="oddsdataou.length>0">{{oddsdataou[0][2] | numberformat}}</span></td>
                                          <td style="text-align: center;width: 50px"><span style="color:#666;"  v-if="oddsdataou.length>0">{{oddsdataou[0][3] | numberformat}}</span></td>
                                          <td style="text-align: center;width: 50px"><span style="color:#999;"  v-if="oddsdataou.length>0">{{oddsdataou[0][4] | numberformat}}</span></td>
                                          <td style="text-align: center;width: 50px"><span style="color:#999;"  v-if="oddsdatada.length>0">{{oddsdatada[0][2] | numberformat}}</span></td>
                                          <td style="text-align: center;width: 50px"><span style="color:#666;"  v-if="oddsdatada.length>0">{{oddsdatada[0][3] | numberformat}}</span></td>
                                          <td style="text-align: center;width: 50px"><span style="color:#999;"  v-if="oddsdatada.length>0">{{oddsdatada[0][4] | numberformat}}</span></td>
                            </tr>
<tr><td> <span style="color:#666"> 赛中 </span></td>
                            <td style="text-align: center;width: 50px"><span style="color:#999;"  v-if="oddsdataya.length>0 && state!=8">{{oddsdataya[1][2] | numberformat}}</span></td>
                                <td style="text-align: center;width: 50px"><span style="color:#666;"  v-if="oddsdataya.length>0 && state!=8">{{oddsdataya[1][3] | numberformat}}</span></td>
                                          <td style="text-align: center;width: 50px"><span style="color:#999;"  v-if="oddsdataya.length>0 && state!=8">{{oddsdataya[1][4] | numberformat}}</span></td>
                                          <td style="text-align: center;width: 50px"><span style="color:#999;"  v-if="oddsdataou.length>0 && state!=8">{{oddsdataou[1][2] | numberformat}}</span></td>
                                          <td style="text-align: center;width: 50px"><span style="color:#666;"  v-if="oddsdataou.length>0 && state!=8">{{oddsdataou[1][3] | numberformat}}</span></td>
                                          <td style="text-align: center;width: 50px"><span style="color:#999;"  v-if="oddsdataou.length>0 && state!=8">{{oddsdataou[1][4] | numberformat}}</span></td>
                                          <td style="text-align: center;width: 50px"><span style="color:#999;"  v-if="oddsdatada.length>0 && state!=8">{{oddsdatada[1][2] | numberformat}}</span></td>
                                          <td style="text-align: center;width: 50px"><span style="color:#666;"  v-if="oddsdatada.length>0 && state!=8">{{oddsdatada[1][3] | numberformat}}</span></td>
                                          <td style="text-align: center;width: 50px"><span style="color:#999;"  v-if="oddsdatada.length>0 && state!=8">{{oddsdatada[1][4] | numberformat}}</span></td>
                            </tr>
                            </table>
                        </div>
                    <div class="find">
                        <table cellpadding="0" cellspacing="0" >
                            <tbody>
                            <tr class="color-999 asian">
                                <td class="lab-ratel p-t-5">
                        <span class="exponent-tow" >

                            <span class="text" style="color:#999" v-if="foot.isclosed==0 && foot.homeodds!=null"  @mouseenter="loadoddsone(foot.id)">{{foot.homeodds | numberformat}}</span>
                            <span v-else-if="foot.isclosed==1 ">封</span>
                            <span v-else></span>
                        </span>
                                </td>
                                <td class="lab-bet-odds p-t-5">

                        <span class="exponent-tow" >
                            <span class="text" data-num="-0.75" v-if="foot.isclosed==0 && foot.drawodds!=null" style="color:#999"  @mouseenter="loadoddsone(foot.id)">{{foot.drawodds | numberformat}}</span>
                            <span v-else-if="foot.isclosed==1 ">封</span>
                            <span v-else></span>
                            <i class="icon"></i>
                        </span>
                                </td>
                                <td class="lab-rater p-t-5">

                        <span class="exponent-tow">
                            <span class="text" style="color:#999" v-if="foot.isclosed==0 && foot.awayodds!=null"  @mouseenter="loadoddsone(foot.id)">{{foot.awayodds | numberformat}}</span>
                            <span v-else-if="foot.isclosed==1 ">封</span>
                             <span v-else></span>
                            <i class="icon"></i>
                        </span>
                                </td>
                            </tr>
                            <tr class="color-666 size">

                            <td class="lab-ratel p-b-5">
                            <span class="exponent-tow">
                            <span class="text"  v-if="foot.isclosedou==0 && foot.homeoddsou!=null" :style="{color:foot.ouzhishu}">{{foot.homeoddsou | numberformat}}<img v-if="foot.ouzhishu!='#666'" :src="foot.ouzhishu=='#de1e30'?'https://soket.daoyunxiang.com/zssheng.gif':'https://soket.daoyunxiang.com/zsjiang.gif'"> </span>
                            <span v-else-if="foot.isclosedou==1 ">封</span>
                                <span v-else></span>
                                <i class="icon"></i>
                            </span>
                            </td>
                            <td class="lab-bet-odds p-b-5">

                            <span class="exponent-tow">
                            <span class="text" v-if="foot.isclosedou==0 && foot.drawoddsou!=null" data-num="3.25" style="color:#666">{{foot.drawoddsou | numberformat}}</span>
                                <span v-else-if="foot.isclosedou==1 ">封</span>
                                 <span v-else></span>
                            <i class="icon"></i>
                            </span>
                            </td>
                            <td class="lab-rater p-b-5">

                            <span class="exponent-tow">
                            <span class="text"  v-if="foot.isclosedou==0 && foot.awayoddsou!=null" :style="{color:foot.ouzhishu}" >{{foot.awayoddsou | numberformat}}<img v-if="foot.ouzhishu!='#666'" :src="foot.ouzhishu=='#de1e30'?'https://soket.daoyunxiang.com/zssheng.gif':'https://soket.daoyunxiang.com/zsjiang.gif'"> </span>
                            <span v-else-if="foot.isclosedou==1 ">封</span>
                                <span v-else></span>
                            <i class="icon"></i>
                            </span>
                            </td>
                            </tr>
                            </tbody></table>
                    </div>
                    </el-tooltip>
                </td>
              <td class="lab-data" style="width: 80px;text-align: center;cursor:pointer">
                <span style="color:#666" @click="newwindows(foot.id)">分析</span>
              </td>
              <td class="lab-data" style="width: 60px;text-align: center;cursor:pointer" @click="newwindower(foot.id)">
               <span style="color:#999"> <i class="el-icon-user"></i></span>
                <span style="color:#666" >{{foot.popularity}}</span>
              </td>
                <td class="lab-data" style="padding-right: 10px;text-align: right;">
                    <div class="sticky" @click="footSticky(foot,i)" style="cursor:pointer;">
                        <!--<i class = "el-icon-upload2"></i>-->
                        <img width="14px" :src="ishoverjt==i?'https://soket.daoyunxiang.com/icon/hoverjt.png':'https://soket.daoyunxiang.com/icon/jiantou.png'" @mouseleave="ishoverjt=-1" @mouseover="ishoverjt=i">
                    </div>
                </td>
                <td class="lab-popularity">
                    <div class="follow" @click="userFollow(foot,i)" v-if="type != 3" style="cursor:pointer;">
                        <!--<i class = "el-icon-star-off"  :class="{'hover': foot.collect}" ></i>-->
                        <img width="14px" :id="'gzxing' + i" :src="ishover==i?' https://soket.daoyunxiang.com/icon/hoverxx.png':'https://soket.daoyunxiang.com/icon/xing.png'" @mouseleave="ishover=-1" @mouseover="ishover=i">
                    </div>
                </td>
                <td class="lab-func">

                </td>
            </tr>
            </tbody></table>
        </div>
    </div>
    <notHave v-else-if='(type != 0 && football.length == 0 && type != 4) || (type != 0 && state == 0)'></notHave>
</template>

<script>
    import notHave from "@/components/notHave.vue";
    import {loadoddsonerer,getincidentser} from '@/api'
    export default {
        props: ["football","type","state","iszhujin","iskejin","whichcom"],
        name: "foot",
        components: {
            notHave
        },
        data() {
            return {
              zscolor:'#666',
                ishoverjt:-1,
                ishover:-1,
                searchid:0,
                oddsdataya:[],
              oddsdataou:[],
              oddsdatada:[],
                jstjid:'',
                jstjdata:[],
                jstjscore:[],
              numa:'',
              numb:'',
              numc:''
            }
        },
      filters: {
        numberformat: function (value) {
          let aaaa=value.toString();
          var valuer=aaaa.split('.');
          if(valuer.length>1){
          if(valuer[1].length==1){
            valuer[1]=valuer[1]+'00';
          }else if(valuer[1].length==2){
            valuer[1]=valuer[1]+'0';
          }
          var valuenew=valuer[0]+'.'+valuer[1];

          }else{
            if(aaaa!='' && aaaa!=null){
              var valuenew=aaaa+'.000';
            }

          }
          return  valuenew ;
        }

      },

        mounted() {

        },

        methods:{
            hidefoot(xuhao){

                 this.football[xuhao].check=true;

                this.$emit('hidefoot')
            },
            userFollow(foot,i){
                let data = {
                    "foot":foot,
                    "index":i,
                    'record':'foot'
                }

                this.$emit('follow',data)
            },
            loadoddsone(mid){
                this.searchid=mid,
                this.loadoddsoner()
            },
            async loadoddsoner()
            {
                let data={
                    "mid":this.searchid,
                    "zscom":this.whichcom
                }
                if(this.searchid!='' && parseInt(this.searchid)>0){
                    let res = await loadoddsonerer(data)

                  this.oddsdataya=res.ya
                  this.numa=res.ya.length-1
                  this.oddsdataou=res.ou
                  this.numb=res.ou.length-1
                  this.oddsdatada=res.da
                  this.numc=res.da.length-1
                }
            },
            footSticky(foot,index){
                let data = {
                    "foot":foot,
                    'type':this.type,
                    'index':index
                }
                this.$emit('footSticky',data)
            },

            jxtjdata(jid,state){
                if(state!=8){
                    this.jstjid=  jid;
                    this.getincidents()
                }

            },
            async getincidents(){
                let data ={
                    'jid':this.jstjid
                }
                let res = await getincidentser(data)
                this.jstjdata=res.incidents
                this.jstjscore=res.score
            },
            footballevent(foot){
                let url = this.$router.resolve({
                    name: "footballevent",
                    query: {event_id:foot.id}
                });

                window.open(url.href, '_blank');
            },
          newwindows(sid){

            let text= this.$router.resolve({
              path: '/footanalysis',query:{"event_id":sid}
            });
            window.open(text.href, '_blank')
          },
          newwindower(eid){
            let text= this.$router.resolve({
              path: '/footballevent',query:{"event_id":eid}
            });
            window.open(text.href, '_blank')
          }
        }
    }
</script>
<style scoped src="../style/score-new-61f91b5fb0.css"></style>

<style lang="stylus">
.lab-events
{
    border-width: 1px;
    border-style: solid;
    border-color: rgba(242, 242, 242, 1);
}
table.tab td
{
  height:35px;
  border-bottom:1px solid #000000;
  border-left:0px;
  border-right:0px;
}
/*#list > tr:nth-child(even) > td {background-color: #F5F5F5;}*/
/*#list > tr:nth-child(odd) > td {background-color: white;}*/
.el-progress-bar__outer{
  background: black;
}
    .mirrorRotateLevel {
        -moz-transform:scaleX(-1);
        -webkit-transform:scaleX(-1);
        -o-transform:scaleX(-1);
        transform:scaleX(-1);
        /*兼容IE*/
        filter:FlipH;
    }
    .check{
        position: relative;
        left:10px;
    }
    .slide-fade-enter-active {
        transition: all .4s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter
    {
        transform: translateY(10px);
        opacity: 0;
    }
</style>