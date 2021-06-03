<template>
  <div class="match-box" v-if="football.length > 0 " style="margin-top: 1px;">
    <div class="match-data">
      <table id="list" class="table table-striped" cellspacing="0" cellpadding="0"  style="display: flex;" >
        <tbody >
        <tr class="dd-item data dd-3511228" v-for="(foot, i) in football" :key="i"   :style="i%2==0?('background-color: #f6f8fd'):('background-color: white')"  :class="{  isfontcolor_block:(foot.id == newValue) }">

          <td class="" style="width: 70px" v-if="types==1">
            <!--                    <el-checkbox class = "check" v-model="foot.check"></el-checkbox>-->
            <!--                    <img  @click="hidefoot(i)" class="img" :id="'u819_img' + foot.id" v-if="hover"  @mouseover.native="hover = true"-->
            <!--                         @mouseleave.native="hover = false" width="20px" style="cursor:pointer;" src="../assets/img/u719.png">-->
            <!--                    <img  @click="hidefoot(i)"  src="../assets/img/hovertrue.png">-->
            <i class="hoverfalseimg" :id="'u819_img' + foot.id" @mouseenter="hoverin(foot.id)"
               @mouseleave="hoverout(foot.id)"  @click="hidefoot(i)" style="cursor:pointer;width: 23px;height: 23px;"></i>
          </td>
          <!--赛事-->
          <td class="lab-events" :class="foot.short_name_zh" :style="{background:foot.events_color}" :id="'saishi'+ foot.short_name_zh">
            <!--                    <img :src="foot.events_logo" class = "event_logo" v-if ="foot.events_logo != ''" style="height:28px;width: 26px;"/>-->
            <!--                    <span v-else class = "empty_event_logo"></span>-->
            <a class="event-name lang" href="javascript:void(0)" target="_self" style="text-align:center;width: 100%;position: relative;color:white">&nbsp;&nbsp;&nbsp;{{ foot.short_name_zh }}</a>
          </td>
          <!--时间-->
          <td class="lab-time">
            <span class="time">{{ foot.opening_time_text }}</span>
          </td>

          <!--                <td class="lab-lottery">-->
          <!--                    <span class="text-jc"></span>-->
          <!--                    <span class="text-bd"></span>-->
          <!--                    <span class="text-zc"></span>-->
          <!--                </td>-->
          <!--状态-->
          <td class="lab-status skin-color-s color-red start">
            <div  v-if="foot.status == 2 ||foot.status == 4 ||foot.status == 7 || foot.status == 3 ||foot.status == 5" style="text-align: left;margin-left: 10px"><i class="el-icon-time" v-if="foot.bstimes != '中'"></i>{{foot.bstimes}}<span v-if="foot.bstimes != '中'" class="point-animation" style="position: relative;"></span></div>
            <div  v-else-if="foot.status == 1 || foot.status == 8 || foot.status == 9 || foot.status == 12 || foot.status == 13">{{foot.status_text}}</div>
            <!--                    <div v-else-if=" ">中场</div>-->
            <!--                    <div v-else-if=" "><i class="el-icon-time" v-if="foot.status == 7"></i><span class="point-animation" style="position: relative;">90+</span></div>-->
          </td>
          <!--主队-->
          <td class="lab-team-home bd-left" :class="foot.main_name" :style="iszhujin==foot.id?('background:#ffd6d3;width: 160px;'):('width: 160px;font-weight: 600;color: #333;')" :id="'zhuduiming' + foot.main_name">

            <!--                    <span class="rank homerank hide">-->
            <!--                    </span>-->
            <!--主队--黄牌--->
            <span v-if="foot.main_yellow_card"><span style="border-radius: 3px;font-size: 12px;color: #fff;padding: 0 2px;margin-left: 1px;vertical-align: middle;background-color: #f2bf51;"  v-if="foot.main_yellow_card>0">{{ foot.main_yellow_card }}</span></span>
            <!--主队--红牌牌--->
            <span v-if="foot.main_red_card"><span style="border-radius: 3px;font-size: 12px;color: #fff;padding: 0 2px;margin-left: 1px;vertical-align: middle;background-color: #de1e30;" v-if="foot.main_red_card>0">{{ foot.main_red_card }}</span></span>
            <!--主队--进球--->
            <span class="name color-666 lang " :style="iszhujin==foot.id?('background:#ffd6d3;color:#de1e30;'):('color: #333;')">
                            <transition name="slide-fade">
                                <!--主队--进球图片--->
                                <img width="15px" src="../assets/img/zhudui.gif" v-if="iszhujin==foot.id">
                            </transition>
              <!--主队名--->
                             {{ foot.main_name }}</span>
          </td>
          <!--技术统计-->
          <td class="lab-score color-red">
            <div class="find">
              <el-tooltip class="item" effect="light" placement="right-end"   v-if="foot.status != 1" popper-class="atooltip">
                <div slot="content"  v-if="foot.status!=1">
                  <!--重要事件-->
                  <div style="color:#333;text-align: center;background:#FFf">
                    <div style="background: rgb(57, 187, 243) none repeat scroll 0% 0%;height: 40px;width:107%;padding:15px 5px; position: relative; left:-10px;top:-10px;color:#fff;font-weight: 600; ">
                      <span style="width:120px;text-align: left;padding-left: 5px"> {{ foot.main_name }}  </span>
                      <span   v-if="foot.status!=1" style="width:23px;">{{foot.main_fraction}}</span>-<span   v-if="foot.status!=1" style="width:23px;">{{foot.deputy_fraction}}</span>
                      <span style="margin-left: 8px;padding-left: 5px;width: 120px;text-align: right">{{ foot.deputy_name }}</span>
                    </div>
                    <br>
                    <div class="scroll" v-if="foot.statistics"  style="overflow-y: auto;scrollbar-width: none;-ms-overflow-style: none;max-height: 300px;">
                      <table  v-if="foot.statistics.incidents" class="tab" style="width: 286px;" >
                        <tr   v-for="item in foot.statistics.incidents">
                          <td style="width: 110px;text-align: right">

                            <div v-if="item.position==1">
                              <div  v-if="item.type==1"><span style="width: 100%;height:35px;padding-right: 10px;color:gray">{{item.player_name}}</span><img width="20px" src="../assets/img/syzqico2.png"></div>
                              <div  v-else-if="item.type==3"><span style="width: 100%;height:35px;padding-right: 10px;color:gray">{{item.player_name}}</span><img width="15px" src="../assets/img/huangpai.png"></div>
                              <div  v-else-if="item.type==4"><span style="width: 100%;height:35px;padding-right: 10px;color:gray">{{item.player_name}}</span><img width="15px" src="../assets/img/hongpai.png"></div>
                              <div v-else-if="item.type==8"><img width="15px" src="../assets/img/dianfoot.png"><span style="width: 100%;height:25px;padding-left: 10px;color:gray">{{item.player_name}}</span></div>
                              <!--                                     <div  v-else-if="item.type==19" style="width: 50px;height:25px;color:white"><img width="24px" src="../assets/img/shaozi.png">伤停补时 </div>-->
                              <div  v-else-if="item.type==11" style="width: 100%;height:25px;color:red">中场<img width="20px" src="../assets/img/shaozi.png"></div>
                              <div  v-else-if="item.type==17" style="width: 100%;height:25px;padding-right: 10px;color:gray">{{item.player_name}}<img width="20px" src="../assets/img/wulongfoot.png">乌龙球</div>
                              <div style="color:gray" v-else-if="item.type==9"><span style="color:gray">{{item.out_player_name}}</span><img width="15px" src="../assets/img/huanren.png">
                                <span style="color:#FF9334">{{item.in_player_name}}</span> </div>
                              <div  v-else style="width: 100%;height:25px;padding-right: 10px;color:gray">{{item.player_name}}<img width="20px" src="../assets/img/shaozi.png"></div>
                            </div>
                            <div v-else-if="item.position==0"><img width="20px" src="../assets/img/shaozi.png"></div>
                          </td>
                          <td  style="width: 40px">{{item.time}}' </td>
                          <td  style="width: 110px;text-align: left">
                            <div v-if="item.position==2">
                              <div  v-if="item.type==1"><img width="20px" src="../assets/img/syzqico2.png"><span style="width: 100%;height:25px;padding-left: 10px;color:gray">{{item.player_name}}</span></div>
                              <div  v-else-if="item.type==3"><img width="15px" src="../assets/img/huangpai.png"><span style="width: 100%;height:25px;padding-left: 10px;color:gray">{{item.player_name}}</span></div>
                              <div v-else-if="item.type==4"><img width="15px" src="../assets/img/hongpai.png"><span style="width: 100%;height:25px;padding-left: 10px;color:gray">{{item.player_name}}</span></div>
                              <div v-else-if="item.type==8"><img width="15px" src="../assets/img/dianfoot.png"><span style="width: 100%;height:25px;padding-left: 10px;color:gray">{{item.player_name}}</span></div>
                              <!--                                         <div  v-else-if="item.type==19" style="width: 50px;height:25px;color:white"><img width="24px" src="../assets/img/shaozi.png">伤停补时</div>-->
                              <div  v-else-if="item.type==11" style="width: 100%;height:25px;padding-left: 10px;color:gray"><img width="20px" src="../assets/img/shaozi.png">中场</div>
                              <div  v-else-if="item.type==17" style="width: 100%;height:25px;padding-left: 10px;color:gray"><img width="20px" src="../assets/img/wulongfoot.png">{{item.player_name}} 乌龙球</div>
                              <div style="color:gray" v-else-if="item.type==9"><span style="color:gray">{{item.in_player_name}}</span> <img width="15px" src="../assets/img/huanren.png">
                                <span style="color:#FF9334">{{item.out_player_name}}</span></div>
                              <div  v-else style="width: 100%;height:25px;padding-left: 10px;color:gray"><img width="20px" src="../assets/img/shaozi.png">{{item.player_name}}</div>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                    <!--技术统计-->
                    <div  v-if="foot.statistics">
                      <table v-if="foot.statistics.stats" class="tab">
                        <tr><td colspan="5"><span style="text-align: center;background-color: #f2f3f5;">技术统计</span> </td></tr>
                        <tr>
                          <td v-if="foot.statistics.stats[0]">{{foot.statistics.stats[0].home}}</td>
                          <td v-if="foot.statistics.stats[0]" style="width: 110px"><el-progress v-if="foot.statistics"  class="mirrorRotateLevel" :percentage="jindutiao(foot.statistics.stats[0].home,foot.statistics.stats[0].away)" :show-text="false" color="#ff9334" ></el-progress></td>
                          <td v-if="foot.statistics.stats[0]" style="width: 40px">角球</td>
                          <td v-if="foot.statistics.stats[0]" style="width: 110px"><el-progress v-if="foot.statistics" :percentage="jindutiao2(foot.statistics.stats[0].home,foot.statistics.stats[0].away)" color="rgb(57, 187, 243)" :show-text="false"></el-progress></td>
                          <td v-if="foot.statistics.stats[0]">{{foot.statistics.stats[0].away}}</td>

                          <td v-if="!foot.statistics.stats[0]">0</td>
                          <td v-if="!foot.statistics.stats[0]" style="width: 110px"><el-progress v-if="foot.statistics"  class="mirrorRotateLevel" :percentage="0" color="#ff9334" :show-text="false"></el-progress></td>
                          <td v-if="!foot.statistics.stats[0]" style="width: 40px">角球</td>
                          <td v-if="!foot.statistics.stats[0]" style="width: 110px"><el-progress v-if="foot.statistics" :percentage="0" color="rgb(57, 187, 243)" :show-text="false"></el-progress></td>
                          <td v-if="!foot.statistics.stats[0]">0</td>
                        </tr>
                        <tr>
                          <td v-if="foot.statistics.stats[1]">{{foot.statistics.stats[1].home}}</td>
                          <td v-if="foot.statistics.stats[1]" style="width: 110px"><el-progress v-if="foot.statistics" class="mirrorRotateLevel" :percentage="jindutiao(foot.statistics.stats[1].home,foot.statistics.stats[1].away)" color="#ff9334" :show-text="false"></el-progress></td>
                          <td v-if="foot.statistics.stats[1]" style="width: 40px">黄牌</td>
                          <td v-if="foot.statistics.stats[1]" style="width: 110px"><el-progress v-if="foot.statistics.stats[1]" :percentage="jindutiao2(foot.statistics.stats[1].home,foot.statistics.stats[1].away)" color="rgb(57, 187, 243)" :show-text="false"></el-progress></td>
                          <td v-if="foot.statistics.stats[1]">{{foot.statistics.stats[1].away}}</td>

                          <td v-if="!foot.statistics.stats[1]">0</td>
                          <td v-if="!foot.statistics.stats[1]" style="width: 110px"><el-progress v-if="foot.statistics" class="mirrorRotateLevel" :percentage="0" color="#ff9334" :show-text="false"></el-progress></td>
                          <td v-if="!foot.statistics.stats[1]" style="width: 40px">黄牌</td>
                          <td v-if="!foot.statistics.stats[1]" style="width: 110px"><el-progress v-if="foot.statistics" :percentage="0" color="rgb(57, 187, 243)" :show-text="false"></el-progress></td>
                          <td v-if="!foot.statistics.stats[1]">0</td>
                        </tr>
                        <tr>
                          <td v-if="foot.statistics.stats[2]">{{foot.statistics.stats[2].home}}</td>
                          <td v-if="foot.statistics.stats[2]" style="width: 110px"><el-progress  class="mirrorRotateLevel" v-if="foot.statistics" :percentage="jindutiao(foot.statistics.stats[2].home,foot.statistics.stats[2].away)" color="#ff9334" :show-text="false"></el-progress></td>
                          <td v-if="foot.statistics.stats[2]" style="width: 40px">红牌</td>
                          <td v-if="foot.statistics.stats[2]" style="width: 110px"><el-progress v-if="foot.statistics" :percentage="jindutiao2(foot.statistics.stats[2].home,foot.statistics.stats[2].away)" color="rgb(57, 187, 243)" :show-text="false"></el-progress></td>
                          <td v-if="foot.statistics.stats[2]">{{foot.statistics.stats[2].away}}</td>

                          <td v-if="!foot.statistics.stats[2]">0</td>
                          <td v-if="!foot.statistics.stats[2]" style="width: 110px"><el-progress  class="mirrorRotateLevel" v-if="foot.statistics" :percentage="0" color="#ff9334" :show-text="false"></el-progress></td>
                          <td v-if="!foot.statistics.stats[2]" style="width: 40px">红牌</td>
                          <td v-if="!foot.statistics.stats[2]" style="width: 110px"><el-progress v-if="foot.statistics" :percentage="0" color="rgb(57, 187, 243)" :show-text="false"></el-progress></td>
                          <td v-if="!foot.statistics.stats[2]">0</td>
                        </tr>
                        <tr>
                          <td v-if="foot.statistics.stats[3]">{{foot.statistics.stats[3].home}}</td>
                          <td v-if="foot.statistics.stats[3]" style="width: 110px"><el-progress  class="mirrorRotateLevel" v-if="foot.statistics" :percentage="jindutiao(foot.statistics.stats[3].home,foot.statistics.stats[3].away)" color="#ff9334" :show-text="false"></el-progress></td>
                          <td v-if="foot.statistics.stats[3]" style="width: 40px">点球</td>
                          <td v-if="foot.statistics.stats[3]" style="width: 110px"><el-progress v-if="foot.statistics" :percentage="jindutiao2(foot.statistics.stats[3].home,foot.statistics.stats[3].away)" color="rgb(57, 187, 243)" :show-text="false"></el-progress></td>
                          <td v-if="foot.statistics.stats[3]">{{foot.statistics.stats[3].away}}</td>

                          <td v-if="!foot.statistics.stats[3]">0</td>
                          <td v-if="!foot.statistics.stats[3]" style="width: 110px"><el-progress  class="mirrorRotateLevel" v-if="foot.statistics" :percentage="0" color="#ff9334" :show-text="false"></el-progress></td>
                          <td v-if="!foot.statistics.stats[3]" style="width: 40px">点球</td>
                          <td v-if="!foot.statistics.stats[3]" style="width: 110px"><el-progress v-if="foot.statistics" :percentage="0" color="rgb(57, 187, 243)" :show-text="false"></el-progress></td>
                          <td v-if="!foot.statistics.stats[3]">0</td>
                        </tr>
                        <tr>
                          <td v-if="foot.statistics.stats[4]">{{foot.statistics.stats[4].home}}</td>
                          <td v-if="foot.statistics.stats[4]" style="width: 110px"><el-progress  v-if="foot.statistics" class="mirrorRotateLevel" :percentage="jindutiao(foot.statistics.stats[4].home,foot.statistics.stats[4].away)" color="#ff9334" :show-text="false"></el-progress></td>
                          <td v-if="foot.statistics.stats[4]" style="width: 40px">射正</td>
                          <td v-if="foot.statistics.stats[4]" style="width: 110px"><el-progress v-if="foot.statistics" :percentage="jindutiao2(foot.statistics.stats[4].home,foot.statistics.stats[4].away)" color="rgb(57, 187, 243)" :show-text="false"></el-progress></td>
                          <td v-if="foot.statistics.stats[4]">{{foot.statistics.stats[4].away}}</td>

                          <td v-if="!foot.statistics.stats[4]">0</td>
                          <td v-if="!foot.statistics.stats[4]" style="width: 110px"><el-progress  v-if="foot.statistics" class="mirrorRotateLevel" :percentage="0" color="#ff9334" :show-text="false"></el-progress></td>
                          <td v-if="!foot.statistics.stats[4]" style="width: 40px">射正</td>
                          <td v-if="!foot.statistics.stats[4]" style="width: 110px"><el-progress v-if="foot.statistics" :percentage="0" color="rgb(57, 187, 243)" :show-text="false"></el-progress></td>
                          <td v-if="!foot.statistics.stats[4]">0</td>
                        </tr>
                        <tr>
                          <td v-if="foot.statistics.stats[5]">{{foot.statistics.stats[5].home}}</td>
                          <td v-if="foot.statistics.stats[5]" style="width: 110px"><el-progress v-if="foot.statistics" class="mirrorRotateLevel" :percentage="jindutiao(foot.statistics.stats[5].home,foot.statistics.stats[5].away)" color="#ff9334" :show-text="false"></el-progress></td>
                          <td v-if="foot.statistics.stats[5]" style="width: 40px">射偏</td>
                          <td v-if="foot.statistics.stats[5]" style="width: 110px"><el-progress v-if="foot.statistics" :percentage="jindutiao2(foot.statistics.stats[5].home,foot.statistics.stats[5].away)" color="rgb(57, 187, 243)" :show-text="false"></el-progress></td>
                          <td v-if="foot.statistics.stats[5]">{{foot.statistics.stats[5].away}}</td>

                          <td v-if="!foot.statistics.stats[5]">0</td>
                          <td v-if="!foot.statistics.stats[5]" style="width: 110px"><el-progress v-if="foot.statistics" class="mirrorRotateLevel" :percentage="0" color="#ff9334" :show-text="false"></el-progress></td>
                          <td v-if="!foot.statistics.stats[5]" style="width: 40px">射偏</td>
                          <td v-if="!foot.statistics.stats[5]" style="width: 110px"><el-progress v-if="foot.statistics" :percentage="0" color="rgb(57, 187, 243)" :show-text="false"></el-progress></td>
                          <td v-if="!foot.statistics.stats[5]">0</td>
                        </tr>
                        <tr>
                          <td v-if="foot.statistics.stats[6]">{{foot.statistics.stats[6].home}}</td>
                          <td v-if="foot.statistics.stats[6]" style="width: 110px"><el-progress v-if="foot.statistics" class="mirrorRotateLevel" :percentage="jindutiao(foot.statistics.stats[6].home,foot.statistics.stats[6].away)" color="#ff9334" :show-text="false"></el-progress></td>
                          <td v-if="foot.statistics.stats[6]" style="width: 40px">进攻</td>
                          <td v-if="foot.statistics.stats[6]" style="width: 110px"><el-progress v-if="foot.statistics" :percentage="jindutiao2(foot.statistics.stats[6].home,foot.statistics.stats[6].away)" color="rgb(57, 187, 243)" :show-text="false"></el-progress></td>
                          <td v-if="foot.statistics.stats[6]">{{foot.statistics.stats[6].away}}</td>

                          <td v-if="!foot.statistics.stats[6]">0</td>
                          <td v-if="!foot.statistics.stats[6]" style="width: 110px"><el-progress v-if="foot.statistics" class="mirrorRotateLevel" :percentage="0" color="#ff9334" :show-text="false"></el-progress></td>
                          <td v-if="!foot.statistics.stats[6]" style="width: 40px">进攻</td>
                          <td v-if="!foot.statistics.stats[6]" style="width: 110px"><el-progress v-if="foot.statistics" :percentage="0" color="rgb(57, 187, 243)4" :show-text="false"></el-progress></td>
                          <td v-if="!foot.statistics.stats[6]">0</td>
                        </tr>
                        <tr>
                          <td v-if="foot.statistics.stats[7]">{{foot.statistics.stats[7].home}}</td>
                          <td v-if="foot.statistics.stats[7]" style="width: 110px"><el-progress v-if="foot.statistics" class="mirrorRotateLevel" :percentage="jindutiao(foot.statistics.stats[7].home,foot.statistics.stats[7].away)" color="#ff9334" :show-text="false"></el-progress></td>
                          <td v-if="foot.statistics.stats[7]" style="width: 40px">危险进攻</td>
                          <td v-if="foot.statistics.stats[7]" style="width: 110px"><el-progress v-if="foot.statistics" :percentage="jindutiao2(foot.statistics.stats[7].home,foot.statistics.stats[7].away)" color="rgb(57, 187, 243)" :show-text="false"></el-progress></td>
                          <td v-if="foot.statistics.stats[7]">{{foot.statistics.stats[7].away}}</td>

                          <td v-if="!foot.statistics.stats[7]">0</td>
                          <td v-if="!foot.statistics.stats[7]" style="width: 110px"><el-progress v-if="foot.statistics" class="mirrorRotateLevel" :percentage="0" color="#ff9334" :show-text="false"></el-progress></td>
                          <td v-if="!foot.statistics.stats[7]" style="width: 40px">危险进攻</td>
                          <td v-if="!foot.statistics.stats[7]" style="width: 110px"><el-progress v-if="foot.statistics" :percentage="0" color="rgb(57, 187, 243)" :show-text="false"></el-progress></td>
                          <td v-if="!foot.statistics.stats[7]">0</td>
                        </tr>
                        <tr>
                          <td v-if="foot.statistics.stats[8]">{{foot.statistics.stats[8].home}}</td>
                          <td v-if="foot.statistics.stats[8]" style="width: 110px"><el-progress v-if="foot.statistics"  class="mirrorRotateLevel" :percentage="jindutiao(foot.statistics.stats[8].home,foot.statistics.stats[8].away) " color="#ff9334" :show-text="false"></el-progress></td>
                          <td v-if="foot.statistics.stats[8]" style="width: 40px">控球率</td>
                          <td v-if="foot.statistics.stats[8]" style="width: 110px"><el-progress v-if="foot.statistics" :percentage="jindutiao2(foot.statistics.stats[8].home,foot.statistics.stats[8].away)" color="rgb(57, 187, 243)" :show-text="false"></el-progress></td>
                          <td v-if="foot.statistics.stats[8]">{{foot.statistics.stats[8].away}}</td>

                          <td v-if="!foot.statistics.stats[8]">0</td>
                          <td v-if="!foot.statistics.stats[8]" style="width: 110px"><el-progress v-if="foot.statistics"  class="mirrorRotateLevel" :percentage="0" color="#ff9334" :show-text="false"></el-progress></td>
                          <td v-if="!foot.statistics.stats[8]" style="width: 40px">控球率</td>
                          <td v-if="!foot.statistics.stats[8]" style="width: 110px"><el-progress v-if="foot.statistics" :percentage="0" color="rgb(57, 187, 243)" :show-text="false"></el-progress></td>
                          <td v-if="!foot.statistics.stats[8]">0</td>
                        </tr>
                      </table>
                      <table v-if="!foot.statistics.stats" class="tab">
                        <tr><td colspan="5"><span style="text-align: center">技术统计</span> </td></tr>
                        <tr>
                          <td >0</td>
                          <td  style="width: 110px"><el-progress   class="mirrorRotateLevel" :percentage="0" color="#ff9334" :show-text="false"></el-progress></td>
                          <td  style="width: 40px">角球</td>
                          <td  style="width: 110px"><el-progress  :percentage="0" color="#ff9334" :show-text="false"></el-progress></td>
                          <td >0</td>
                        </tr>
                        <tr>


                          <td >0</td>
                          <td  style="width: 110px"><el-progress  class="mirrorRotateLevel" :percentage="0" color="#ff9334" :show-text="false"></el-progress></td>
                          <td  style="width: 40px">黄牌</td>
                          <td  style="width: 110px"><el-progress  :percentage="0" color="#ff9334" :show-text="false"></el-progress></td>
                          <td >0</td>
                        </tr>
                        <tr>
                          <td >0</td>
                          <td  style="width: 110px"><el-progress  class="mirrorRotateLevel"  :percentage="0" color="#ff9334" :show-text="false"></el-progress></td>
                          <td style="width: 40px">红牌</td>
                          <td  style="width: 110px"><el-progress  :percentage="0" color="#ff9334" :show-text="false"></el-progress></td>
                          <td >0</td>
                        </tr>
                        <tr>
                          <td >0</td>
                          <td  style="width: 110px"><el-progress  class="mirrorRotateLevel"  :percentage="0" color="#ff9334" :show-text="false"></el-progress></td>
                          <td  style="width: 40px">点球</td>
                          <td style="width: 110px"><el-progress  :percentage="0" color="#ff9334" :show-text="false"></el-progress></td>
                          <td >0</td>
                        </tr>
                        <tr>
                          <td >0</td>
                          <td  style="width: 110px"><el-progress   class="mirrorRotateLevel" :percentage="0" color="#ff9334" :show-text="false"></el-progress></td>
                          <td  style="width: 40px">射正</td>
                          <td  style="width: 110px"><el-progress  :percentage="0" color="#ff9334" :show-text="false"></el-progress></td>
                          <td >0</td>
                        </tr>
                        <tr>
                          <td >0</td>
                          <td  style="width: 110px"><el-progress  class="mirrorRotateLevel" :percentage="0" color="#ff9334" :show-text="false"></el-progress></td>
                          <td  style="width: 40px">射偏</td>
                          <td  style="width: 110px"><el-progress  :percentage="0" color="#ff9334" :show-text="false"></el-progress></td>
                          <td >0</td>
                        </tr>
                        <tr>
                          <td >0</td>
                          <td  style="width: 110px"><el-progress  class="mirrorRotateLevel" :percentage="0" color="#ff9334" :show-text="false"></el-progress></td>
                          <td  style="width: 40px">进攻</td>
                          <td  style="width: 110px"><el-progress  :percentage="0" color="#ff9334" :show-text="false"></el-progress></td>
                          <td >0</td>
                        </tr>
                        <tr>
                          <td >0</td>
                          <td  style="width: 110px"><el-progress class="mirrorRotateLevel" :percentage="0" color="#ff9334" :show-text="false"></el-progress></td>
                          <td  style="width: 40px">危险进攻</td>
                          <td  style="width: 110px"><el-progress :percentage="0" color="#ff9334" :show-text="false"></el-progress></td>
                          <td >0</td>
                        </tr>
                        <tr>
                          <td >0</td>
                          <td  style="width: 110px"><el-progress v-if="foot.statistics"  class="mirrorRotateLevel" :percentage="0" color="#ff9334" :show-text="false"></el-progress></td>
                          <td  style="width: 40px">控球率</td>
                          <td  style="width: 110px"><el-progress v-if="foot.statistics" :percentage="0" color="#ff9334" :show-text="false"></el-progress></td>
                          <td >0</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
                <!--主队进球数--> <!--客队进球数-->
                <div class="score"   v-if="foot.status!= 1" @click="footballevent(foot)" @mouseenter="jxtjdata(foot.id,foot.status)"><b class="color-red skin-color-s" style="color: #FF7503; font-size: 15px; font-family: 'Microsoft Yahei', 'PingFang SC', 'Avenir', 'Segoe UI', 'Hiragino Sans GB', STHeiti, 'Microsoft Sans Serif', 'WenQuanYi Micro Hei', sans-serif;"><span   v-if="foot.status != 1">{{foot.main_fraction}}</span>-<span   v-if="foot.status != 1">{{foot.deputy_fraction}}</span></b></div>
              </el-tooltip>
              <!--当不是正在进行的比赛时---显示--VS--->
              <div class="score"   v-if="foot.status == 1" ><b class="color-red skin-color-s" style="color: #666; font-size: 14px; font-family: 'Microsoft Yahei', 'PingFang SC', 'Avenir', 'Segoe UI', 'Hiragino Sans GB', STHeiti, 'Microsoft Sans Serif', 'WenQuanYi Micro Hei', sans-serif;">VS</b></div>
            </div>
          </td>
          <td class="lab-team-away"  :style="iskejin==foot.id?('background:#ffd6d3;width: 160px;'):('width: 160px;font-weight: 600;')" :id="'keduiming' + foot.deputy_name">
            <!--客队名--->
            <span class="name color-666 lang " :class="foot.deputy_name" :style="iskejin==foot.id?('background:#ffd6d3;color:#de1e30;'):('color: #333;')">{{ foot.deputy_name }}
              <!---当客队进球--显示小图标-->
                        <transition name="slide-fade">
                             <img width="15px" src="../assets/img/kedui.gif" v-if="iskejin==foot.id">
                        </transition>
                        </span>
            <!--客队红牌--->
            <span v-if="foot.deputy_red_card"><span style="border-radius: 3px;font-size: 12px;color: #fff;padding: 0 2px;margin-left: 1px;vertical-align: middle;background-color: #de1e30;" v-if="foot.deputy_red_card>0">{{ foot.deputy_red_card }}</span></span>
            <!--客队黄牌--->
            <span v-if="foot.deputy_yellow_card"><span style="border-radius: 3px;font-size: 12px;color: #fff;padding: 0 2px;margin-left: 1px;vertical-align: middle;background-color: #f2bf51;"  v-if="foot.deputy_yellow_card>0">{{ foot.deputy_yellow_card }}</span></span>

            <!--<span class="card awayredcards bgcolor-red hide">0</span>-->
            <!--<span class="card awayyellowcards bgcolor-yellow4 hide">0</span>-->
            <span class="rank awayrank  hide">
                        </span>
          </td>
          <!--半场进球-->
          <td class="lab-half" style="text-align: left;color:#03a9f4"><span  v-if="foot.status!=1">{{foot.main_half_fraction}}</span> - <span   v-if="foot.status!=1">{{foot.deputy_half_fraction}}</span></td>
          <!--角球球-->
          <td class="lab-corner" style="text-align: left;color:#333;"><span   v-if="foot.status!=1">{{foot.main_kick}}</span> - <span   v-if="foot.status!=1">{{foot.deputy_kick}}</span></td>
          <!--直播-->
          <td class="lab-live" @click="footballevent(foot)">
            <div style=" width:26px;height:26px;border-radius: 6px;overflow:hidden;cursor:pointer;">
              <img  src="@/assets/img/icon-202.png" v-if="foot.is_live == 1" style="width: 20px" />
              <img  src="@/assets/img/icon-201.png"  v-if="foot.is_animation == 1 && foot.is_live != 1 "   style="width: 20px" />
            </div>
          </td>
          <!---指数窗口--->
          <td class="lab-sb bd-left" style="display:flex;width: 174px;align-items: center;height: 40px;" >
            <el-tooltip class="item"    placement="top" effect="light" style="padding: 0px;" v-if="foot.status != 1 && foot.status != 8 && foot.status != 9 && foot.status != 13">
              <div slot="content">
                <div style="width: 100%;background: rgb(55, 186, 243) none repeat scroll 0% 0%;height: 30px;line-height: 30px; text-align: center">
                  <span style="color:#fff;width: 100%">{{ foot.main_name }} VS {{ foot.deputy_name }}</span></div><br/>
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
                    <td style="text-align: center;width: 50px"><span style="color:#999;"  v-if="oddsdataya.length>0 && foot.status!=1">{{oddsdataya[1][2] | numberformat}}</span></td>
                    <td style="text-align: center;width: 50px"><span style="color:#666;"  v-if="oddsdataya.length>0 && foot.status!=1">{{oddsdataya[1][3] | numberformat}}</span></td>
                    <td style="text-align: center;width: 50px"><span style="color:#999;"  v-if="oddsdataya.length>0 && foot.status!=1">{{oddsdataya[1][4] | numberformat}}</span></td>
                    <td style="text-align: center;width: 50px"><span style="color:#999;"  v-if="oddsdataou.length>0 && foot.status!=1">{{oddsdataou[1][2] | numberformat}}</span></td>
                    <td style="text-align: center;width: 50px"><span style="color:#666;"  v-if="oddsdataou.length>0 && foot.status!=1">{{oddsdataou[1][3] | numberformat}}</span></td>
                    <td style="text-align: center;width: 50px"><span style="color:#999;"  v-if="oddsdataou.length>0 && foot.status!=1">{{oddsdataou[1][4] | numberformat}}</span></td>
                    <td style="text-align: center;width: 50px"><span style="color:#999;"  v-if="oddsdatada.length>0 && foot.status!=1">{{oddsdatada[1][2] | numberformat}}</span></td>
                    <td style="text-align: center;width: 50px"><span style="color:#666;"  v-if="oddsdatada.length>0 && foot.status!=1">{{oddsdatada[1][3] | numberformat}}</span></td>
                    <td style="text-align: center;width: 50px"><span style="color:#999;"  v-if="oddsdatada.length>0 && foot.status!=1">{{oddsdatada[1][4] | numberformat}}</span></td>
                  </tr>
                </table>
              </div>
              <!---指数显示--->
              <div class="find">
                <table cellpadding="0" cellspacing="0" >
                  <tbody>
                  <tr class="color-999 asian"  v-if="foot.finger">
                    <td class="lab-ratel " style="text-align: right">
                                          <span class="exponent-tow">
                                                <span class="text" v-if="foot.finger.asia" style="color:#999"  @mouseenter="loadoddsone(foot.id)">
                                                    <span  v-if="reversedMessageD1(foot.finger.asia.D1)"> <!--foot.finger.asia.D1 !=undifend-->
                                                       <span v-if="reversedMessage(foot.finger.asia.D1)" class="D1"><!--foot.finger.asia.D1 ==0-->
                                                           <span v-if="reversedMessageA1(foot.finger.asia.A1)" class="A1"><!--foot.finger.asia.A1!=undifend-->
                                                                 {{foot.finger.asia.A1 | numberformat}}
                                                            </span>
                                                        </span>
                                                    </span>
                                                </span>
                                                <span v-if="foot.finger.asia">
                                                    <span v-if="foot.finger.asia.D1 != undefined" style="padding-right: 10px">
                                                        <span v-if="foot.finger.asia.D1 == 1">封</span>
                                                    </span>
                                                </span>
                                            <!-- <span v-else>{{0 | numberformat}}</span> -->
                                          </span>
                    </td>
                    <td class="tdwidth"></td>
                    <td class="lab-bet-odds " style="text-align: right">
                                          <span class="exponent-tow"  >
                                                <span class="text" v-if="foot.finger.asia" style="color:#999"  @mouseenter="loadoddsone(foot.id)">
                                                    <span  v-if="reversedMessageD1(foot.finger.asia.D1)"> <!--foot.finger.asia.D1 !=undifend-->
                                                         <span v-if="reversedMessage(foot.finger.asia.D1)" class="D1"><!--foot.finger.asia.D1 ==0-->
                                                             <span v-if="reversedMessageA1(foot.finger.asia.B1)" class="A1"><!--foot.finger.asia.A1!=undifend-->
                                                                 {{foot.finger.asia.B1 | numberformat}}
                                                            </span>
                                                        </span>
                                                    </span>
                                                </span>
                                                <span v-if="foot.finger.asia">
                                                    <span v-if="foot.finger.asia && foot.finger.asia.D1 != undefined" style="padding-right: 10px">
                                                        <span v-if="foot.finger.asia.D1 == 1">封</span>
                                                    </span>
                                                </span>
                                            <!-- <span v-else>{{0 | numberformat}}</span> -->
                                                 <i class="icon"></i>
                                          </span>
                    </td>
                    <td class="lab-rater " style="text-align: right">
                                          <span class="exponent-tow" >
                                                <span class="text" v-if="foot.finger.asia" style="color:#999"   @mouseenter="loadoddsone(foot.id)">
                                                    <span  v-if="reversedMessageD1(foot.finger.asia.D1)"> <!--foot.finger.asia.D1 !=undifend-->
                                                        <span v-if="reversedMessage(foot.finger.asia.D1)" class="D1"><!--foot.finger.asia.D1 ==0-->
                                                                <span v-if="reversedMessageA1(foot.finger.asia.C1)" class="A1"><!--foot.finger.asia.A1!=undifend-->
                                                                    {{foot.finger.asia.C1 | numberformat}}
                                                                </span>
                                                            </span>
                                                        </span>
                                                    </span>
                                                    <span v-if="foot.finger.asia">
                                                        <span v-if="foot.finger.asia && foot.finger.asia.D1 != undefined" style="padding-right: 10px">
                                                            <span v-if="foot.finger.asia.D1 == 1">封</span>
                                                        </span>
                                                    </span>
                                            <!-- <span v-else>{{0 | numberformat}}</span> -->
                                                    <i class="icon"></i>
                                          </span>

                    </td>
                    <td class="tdwidth"></td>
                  </tr>
                  <tr class="color-666 size" v-if="foot.finger">

                    <td class="lab-ratel " style="text-align: right">
                                          <span class="exponent-tow" >
                                              <span class="text" v-if="reversedMessageasia(foot.finger.bs)" style="color:#666"   @mouseenter="loadoddsone(foot.id)">
                                                    <span  v-if="reversedMessageD1(foot.finger.bs.D1)"> <!--foot.finger.asia.D1 !=undifend-->
                                                        <span v-if="reversedMessage(foot.finger.bs.D1)" class="D1"><!--foot.finger.asia.D1 ==0-->
                                                            <span v-if="reversedMessageA1(foot.finger.bs.A1)" class="A1"><!--foot.finger.asia.A1!=undifend-->
                                                                {{foot.finger.bs.A1 | numberformat}}
                                                            </span>
                                                        </span>
                                                    </span>
                                                </span>
                                                <span v-if="foot.finger.bs">
                                                     <span v-if="foot.finger.bs.D1 != undefined" style="padding-right: 10px">
                                                         <span v-if="foot.finger.bs.D1 == 1">封</span>
                                                    </span>
                                                </span>
                                            <!-- <span v-else>{{0 | numberformat}}</span> -->
                                                <i class="icon"></i>
                                          </span>
                    </td>
                    <td class="tdwidth"><span v-if="foot.finger.bs"><span v-if="reversedMessageD1(foot.finger.bs.A1)"><img v-if="foot.ouzhishu!='#666'" :src="foot.ouzhishu=='#de1e30'?'https://soket.daoyunxiang.com/zssheng.gif':'https://soket.daoyunxiang.com/zsjiang.gif'"></span> </span></td>
                    <td class="lab-bet-odds " style="text-align: right">
                                            <span class="exponent-tow" >
                                                <span class="text"   v-if="reversedMessageasia(foot.finger.bs)" style="color:#666"  @mouseenter="loadoddsone(foot.id)">
                                                    <span  v-if="bsb1d1(foot.finger.bs.D1)"> <!--foot.finger.asia.D1 !=undifend-->
                                                      <span v-if="bsb1d10(foot.finger.bs.D1)" class="D1"><!--foot.finger.asia.D1 ==0-->
                                                          <span v-if="bsb1(foot.finger.bs.B1)" class="A1"><!--foot.finger.asia.A1!=undifend-->
                                                                {{foot.finger.bs.B1 | numberformat}}
                                                            </span>
                                                        </span>
                                                    </span>
                                                </span>
                                               <span v-if="foot.finger.bs">
                                                     <span v-if="foot.finger.bs.D1 != undefined" style="padding-right: 10px">
                                                         <span v-if="foot.finger.bs.D1 == 1">封</span>
                                                    </span>
                                               </span>
                                              <!-- <span v-else>{{0 | numberformat}}</span> -->
                                                <i class="icon"></i>
                                            </span>
                    </td>
                    <td class="lab-rater " style="text-align: right">
                                            <span class="exponent-tow" >
                                               <span class="text"  v-if="reversedMessageasia(foot.finger.bs)" style="color:#666"   @mouseenter="loadoddsone(foot.id)">
                                                    <span  v-if="reversedMessageD1(foot.finger.bs.D1)"> <!--foot.finger.asia.D1 !=undifend-->
                                                         <span v-if="reversedMessage(foot.finger.bs.D1)" class="D1"><!--foot.finger.asia.D1 ==0-->
                                                             <span v-if="reversedMessageA1(foot.finger.bs.C1)" class="A1"><!--foot.finger.asia.A1!=undifend-->
                                                                {{foot.finger.bs.C1 | numberformat}}
                                                            </span>
                                                        </span>
                                                    </span>
                                                </span>
                                                <span v-if="foot.finger.bs">
                                                     <span v-if="foot.finger.bs.D1 != undefined" style="padding-right: 10px">
                                                         <span v-if="foot.finger.bs.D1 == 1">封</span>
                                                    </span>
                                                </span>
                                              <!-- <span v-else>{{0 | numberformat}}</span> -->
                                                <i class="icon"></i>
                                            </span>
                    </td>
                    <td class="tdwidth"><span v-if="foot.finger.bs"><span v-if="reversedMessageD1(foot.finger.bs.C1)"><img v-if="foot.ouzhishu!='#666'" :src="foot.ouzhishu=='#de1e30'?'https://soket.daoyunxiang.com/zssheng.gif':'https://soket.daoyunxiang.com/zsjiang.gif'"> </span></span></td>
                  </tr>
                  </tbody></table>
              </div>
            </el-tooltip>
            <el-tooltip class="item"    placement="top" effect="light" style="padding: 0px;" v-if="foot.status == 1 || foot.status == 8 || foot.status == 9 || foot.status == 13">
              <div slot="content">
                <div style="width: 100%;background: rgb(55, 186, 243) none repeat scroll 0% 0%;height: 30px;line-height: 30px; text-align: center">
                  <span style="color:#fff;width: 100%">{{ foot.main_name }} VS {{ foot.deputy_name }}</span></div><br/>
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
                    <td style="text-align: center;width: 50px"><span style="color:#999;"  v-if="oddsdataya.length>0 && foot.status!=1">{{oddsdataya[1][2] | numberformat}}</span></td>
                    <td style="text-align: center;width: 50px"><span style="color:#666;"  v-if="oddsdataya.length>0 && foot.status!=1">{{oddsdataya[1][3] | numberformat}}</span></td>
                    <td style="text-align: center;width: 50px"><span style="color:#999;"  v-if="oddsdataya.length>0 && foot.status!=1">{{oddsdataya[1][4] | numberformat}}</span></td>
                    <td style="text-align: center;width: 50px"><span style="color:#999;"  v-if="oddsdataou.length>0 && foot.status!=1">{{oddsdataou[1][2] | numberformat}}</span></td>
                    <td style="text-align: center;width: 50px"><span style="color:#666;"  v-if="oddsdataou.length>0 && foot.status!=1">{{oddsdataou[1][3] | numberformat}}</span></td>
                    <td style="text-align: center;width: 50px"><span style="color:#999;"  v-if="oddsdataou.length>0 && foot.status!=1">{{oddsdataou[1][4] | numberformat}}</span></td>
                    <td style="text-align: center;width: 50px"><span style="color:#999;"  v-if="oddsdatada.length>0 && foot.status!=1">{{oddsdatada[1][2] | numberformat}}</span></td>
                    <td style="text-align: center;width: 50px"><span style="color:#666;"  v-if="oddsdatada.length>0 && foot.status!=1">{{oddsdatada[1][3] | numberformat}}</span></td>
                    <td style="text-align: center;width: 50px"><span style="color:#999;"  v-if="oddsdatada.length>0 && foot.status!=1">{{oddsdatada[1][4] | numberformat}}</span></td>
                  </tr>
                </table>
              </div>
              <!---指数显示--->
              <div class="find">
                <table cellpadding="0" cellspacing="0" >
                  <tbody>
                  <tr class="color-999 asian"  v-if="foot.finger">
                    <td class="lab-ratel " style="text-align: right">
                                          <span class="exponent-tow">
                                                <span class="text" v-if="foot.finger.asia" style="color:#999"  @mouseenter="loadoddsone(foot.id)">
                                                    <span  v-if="reversedMessageD1(foot.finger.asia.D)"> <!--foot.finger.asia.D1 !=undifend-->
                                                       <span v-if="reversedMessage(foot.finger.asia.D)" class="D1"><!--foot.finger.asia.D1 ==0-->
                                                           <span v-if="reversedMessageA1(foot.finger.asia.A)" class="A1"><!--foot.finger.asia.A1!=undifend-->
                                                                 {{foot.finger.asia.A | numberformat}}
                                                            </span>
                                                        </span>
                                                    </span>
                                                </span>
                                                <span v-if="foot.finger.asia">
                                                    <span v-if="foot.finger.asia.D != undefined" style="padding-right: 10px">
                                                        <span v-if="foot.finger.asia.D == 1">封</span>
                                                    </span>
                                                </span>
                                            <!-- <span v-else>{{0 | numberformat}}</span> -->
                                          </span>
                    </td>
                    <td class="tdwidth"></td>
                    <td class="lab-bet-odds " style="text-align: right">
                                          <span class="exponent-tow"  >
                                                <span class="text" v-if="foot.finger.asia" style="color:#999"  @mouseenter="loadoddsone(foot.id)">
                                                    <span  v-if="reversedMessageD1(foot.finger.asia.D)"> <!--foot.finger.asia.D1 !=undifend-->
                                                         <span v-if="reversedMessage(foot.finger.asia.D)" class="D1"><!--foot.finger.asia.D1 ==0-->
                                                             <span v-if="reversedMessageA1(foot.finger.asia.B)" class="A1"><!--foot.finger.asia.A1!=undifend-->
                                                                 {{foot.finger.asia.B | numberformat}}
                                                            </span>
                                                        </span>
                                                    </span>
                                                </span>
                                                <span v-if="foot.finger.asia">
                                                    <span v-if="foot.finger.asia && foot.finger.asia.D != undefined" style="padding-right: 10px">
                                                        <span v-if="foot.finger.asia.D == 1">封</span>
                                                    </span>
                                                </span>
                                            <!-- <span v-else>{{0 | numberformat}}</span> -->
                                                 <i class="icon"></i>
                                          </span>
                    </td>
                    <td class="lab-rater " style="text-align: right">
                                          <span class="exponent-tow" >
                                                <span class="text" v-if="foot.finger.asia" style="color:#999"   @mouseenter="loadoddsone(foot.id)">
                                                    <span  v-if="reversedMessageD1(foot.finger.asia.D)"> <!--foot.finger.asia.D1 !=undifend-->
                                                        <span v-if="reversedMessage(foot.finger.asia.D)" class="D1"><!--foot.finger.asia.D1 ==0-->
                                                                <span v-if="reversedMessageA1(foot.finger.asia.C)" class="A1"><!--foot.finger.asia.A1!=undifend-->
                                                                    {{foot.finger.asia.C | numberformat}}
                                                                </span>
                                                            </span>
                                                        </span>
                                                    </span>
                                                    <span v-if="foot.finger.asia">
                                                        <span v-if="foot.finger.asia && foot.finger.asia.D != undefined" style="padding-right: 10px">
                                                            <span v-if="foot.finger.asia.D == 1">封</span>
                                                        </span>
                                                    </span>
                                            <!-- <span v-else>{{0 | numberformat}}</span> -->
                                                    <i class="icon"></i>
                                          </span>

                    </td>
                    <td class="tdwidth"></td>
                  </tr>
                  <tr class="color-666 size" v-if="foot.finger">

                    <td class="lab-ratel " style="text-align: right">
                                          <span class="exponent-tow" >
                                              <span class="text" v-if="reversedMessageasia(foot.finger.bs)" style="color:#666"   @mouseenter="loadoddsone(foot.id)">
                                                    <span  v-if="reversedMessageD1(foot.finger.bs.D)"> <!--foot.finger.asia.D1 !=undifend-->
                                                        <span v-if="reversedMessage(foot.finger.bs.D)" class="D1"><!--foot.finger.asia.D1 ==0-->
                                                            <span v-if="reversedMessageA1(foot.finger.bs.A)" class="A1"><!--foot.finger.asia.A1!=undifend-->
                                                                {{foot.finger.bs.A | numberformat}}
                                                            </span>
                                                        </span>
                                                    </span>
                                                </span>
                                                <span v-if="foot.finger.bs">
                                                     <span v-if="foot.finger.bs.D != undefined" style="padding-right: 10px">
                                                         <span v-if="foot.finger.bs.D == 1">封</span>
                                                    </span>
                                                </span>
                                            <!-- <span v-else>{{0 | numberformat}}</span> -->
                                                <i class="icon"></i>
                                          </span>
                    </td>
                    <td class="tdwidth"><span v-if="foot.finger.bs"><span v-if="reversedMessageD1(foot.finger.bs.A1)"><img v-if="foot.ouzhishu!='#666'" :src="foot.ouzhishu=='#de1e30'?'https://soket.daoyunxiang.com/zssheng.gif':'https://soket.daoyunxiang.com/zsjiang.gif'"></span> </span></td>
                    <td class="lab-bet-odds " style="text-align: right">
                                            <span class="exponent-tow" >
                                                <span class="text"   v-if="reversedMessageasia(foot.finger.bs)" style="color:#666"  @mouseenter="loadoddsone(foot.id)">
                                                    <span  v-if="bsb1d1(foot.finger.bs.D)"> <!--foot.finger.asia.D1 !=undifend-->
                                                      <span v-if="bsb1d10(foot.finger.bs.D)" class="D1"><!--foot.finger.asia.D1 ==0-->
                                                          <span v-if="bsb1(foot.finger.bs.B)" class="A1"><!--foot.finger.asia.A1!=undifend-->
                                                                {{foot.finger.bs.B | numberformat}}
                                                            </span>
                                                        </span>
                                                    </span>
                                                </span>
                                               <span v-if="foot.finger.bs">
                                                     <span v-if="foot.finger.bs.D != undefined" style="padding-right: 10px">
                                                         <span v-if="foot.finger.bs.D == 1">封</span>
                                                    </span>
                                               </span>
                                              <!-- <span v-else>{{0 | numberformat}}</span> -->
                                                <i class="icon"></i>
                                            </span>
                    </td>
                    <td class="lab-rater " style="text-align: right">
                                            <span class="exponent-tow" >
                                               <span class="text"  v-if="reversedMessageasia(foot.finger.bs)" style="color:#666"   @mouseenter="loadoddsone(foot.id)">
                                                    <span  v-if="reversedMessageD1(foot.finger.bs.D)"> <!--foot.finger.asia.D1 !=undifend-->
                                                         <span v-if="reversedMessage(foot.finger.bs.D)" class="D1"><!--foot.finger.asia.D1 ==0-->
                                                             <span v-if="reversedMessageA1(foot.finger.bs.C)" class="A1"><!--foot.finger.asia.A1!=undifend-->
                                                                {{foot.finger.bs.C | numberformat}}
                                                            </span>
                                                        </span>
                                                    </span>
                                                </span>
                                                <span v-if="foot.finger.bs">
                                                     <span v-if="foot.finger.bs.D != undefined" style="padding-right: 10px">
                                                         <span v-if="foot.finger.bs.D == 1">封</span>
                                                    </span>
                                                </span>
                                              <!-- <span v-else>{{0 | numberformat}}</span> -->
                                                <i class="icon"></i>
                                            </span>
                    </td>
                    <td class="tdwidth"><span v-if="foot.finger.bs"><span v-if="reversedMessageD1(foot.finger.bs.C1)"><img v-if="foot.ouzhishu!='#666'" :src="foot.ouzhishu=='#de1e30'?'https://soket.daoyunxiang.com/zssheng.gif':'https://soket.daoyunxiang.com/zsjiang.gif'"> </span></span></td>
                  </tr>
                  </tbody></table>
              </div>
            </el-tooltip>
          </td>
          <!--分析-->
          <td class="lab-data" style="width: 80px;text-align: center;cursor:pointer">
            <span @click="newwindows(foot.id)" :id="'fenxihover' + i"   @mouseenter="fenxihoverin(i)"  @mouseleave="fenxihoverout(i)" class="fenxicolor">分析</span>
          </td>

          <!--人气-->
          <td class="lab-data" style="width: 60px;text-align: center;cursor:pointer" @click="newwindower(foot.id)">
            <span style="color:#9197ad"> <i class="el-icon-user"></i></span>
            <span style="color:#9197ad" >{{foot.popularity}}</span>
          </td>
          <!--                阵容-->
          <td class="lab-data" style="width:60px;text-align: center;cursor:pointer;color: rgb(145, 151, 173);" @click="footballevent(foot)">
            <span  v-if="foot.is_ilineup == 1" >阵容</span>
          </td>
          <!--置顶-->
          <td class="lab-data" style="width:76px;padding-right: 10px;text-align: right;">
            <div class="sticky" @click="footSticky(foot,i)" style="cursor:pointer;" v-if="type==0">
              <!--<i class = "el-icon-upload2"></i>-->
              <img width="14px" :src="ishoverjt==i?zhidinghover:zhiding" @mouseleave="ishoverjt=-1" @mouseover="ishoverjt=i">
            </div>
          </td>
          <!--收藏-->
          <td class="lab-popularity">
            <div class="follow" @click="userFollow(foot,i)" v-if="type != 3" style="cursor:pointer;">
              <!--<i class = "el-icon-star-off"  :class="{'hover': foot.collect}" ></i>-->
              <img width="14px" class="hongxinghover" :id="'gzxing'+i" :src="ishover==i?shoucanghover:shoucang"  @mouseleave="ishover=-1" @mouseover="ishover=i">
            </div>
          </td>
          <td class="lab-func">

          </td>
        </tr>
        <!--              </div>-->
        </tbody></table>
    </div>
  </div>
  <div class = "load" v-else-if="(type == 1 || type == 3) ">
    <div class="loads">
      <img src="@/assets/loadinges.gif" />
      <p style="color: #666666;font-size: 14px;padding-top:5px ">加载中...</p>
    </div>
  </div>
  <notHave v-else-if='(type != 0 && football.length == 0 && type != 4  && type != 1 && type != 3 && type != 5) || (type != 0 && foot.status == 0) '>
  </notHave>
</template>

<script>

import notHave from "@/components/notHave.vue";
import {loadoddsonerer,getincidentser,FootballeventAnalysis} from '@/api'
export default {
  props: ["football","type","state","iszhujin","iskejin","whichcom","isfont","shujuTDname",'isclosed' ,"typees" ,"searchnub",'companys','chuangjianasiaa1',"getTransform"],
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
      numc:'',
      newValue:"",
      hover:false,
      types:1,
      searchnubFoot:"",
      companynub:2,
      chuangjianasiaa11:false,
      chuangjianasiab22:false,
      chuangjianasiac33:false,
      chuangjianbsa11:false,
      chuangjianbsb22:false,
      chuangjianbsc33:false,
      chuangjianbsimg11:false,
      chuangjianbsimg22:false,
      shoucanghover:require("../assets/shoucanghover.png"),
      shoucang:require("../assets/shoucang.png"),
      zhidinghover:require("../assets/zhidinghover.png"),
      zhiding:require("../assets/zhiding.png"),

      foot:{
        finger:{
          asia:{"A":"","D1":""}
        }
      }

    }
  },
  computed: {
    // 计算属性的 getter

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

    this.getFootballeventAnalysis()
  },

  methods:{
    bsb1d1(val){
      return  val!= undefined?true:false
    },
    bsb1d10(val){
      return  val == 0?true:false
    },
    bsb1(val){
      return  val!= undefined?true:false
    },


    reversedMessageasia:function(val) {
      //    console.log(val != undefined?true:false)
      return  val!= undefined?true:false
    },
    reversedMessageD1:function(val) {
      //    console.log(val != undefined?true:false)
      return  val!= undefined?true:false
    },
    reversedMessage: function(val) {
      // console.log(val == 0?true:false)
      return  val == 0?true:false
    },
    reversedMessageA1:function(val) {
      // console.log(val != undefined?true:false)
      return  val != undefined?true:false
    },
    jindutiao(val1,val2){
      if(val2 == 0 &&val1 == 0){
        return 0
      }else {
        return  Number(val1)/(Number(val1)+Number(val2))*100
      }
    },
    jindutiao2(val1,val2){
      if(val2 == 0 &&val1 == 0){
        return 0
      }else {
        return  Number(val2)/(Number(val1)+Number(val2))*100
      }

    },
    fenxihoverin(index){
      $("#fenxihover" + index).addClass("fenxiactive").removeClass("fenxicolor")
    },
    fenxihoverout(index){
      $("#fenxihover" + index).removeClass("fenxiactive").addClass("fenxicolor")
    },
    hoverin(index){
      $("#u819_img" + index).addClass("introactive").removeClass("hoverfalseimg")
    },
    hoverout(index){
      $("#u819_img" + index).addClass("hoverfalseimg").removeClass("introactive")
    },
    hidefoot(xuhao){

      this.football[xuhao].check=true;
      // console.log(xuhao)
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
        // console.log(this.oddsdataya)
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
        // this.getincidents()
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
    },
  },
  watch: {
    searchnub:{
      handler: function (newVal, oldVal) {
        if(newVal !== undefined){
          this.searchnubFoot = newVal
        }
      },
    },
    shujuTDname: {
      handler: function (newVal, oldVal) {
        // console.log(newVal)
        $("#saishi" + newVal[this.searchnubFoot -1]).addClass("searchBgcolor")
        $("#zhuduiming" + newVal[this.searchnubFoot -1]).addClass("searchBgcolor")
        $("#keduiming" + newVal[this.searchnubFoot -1]).addClass("searchBgcolor")

        let that = this
        if(newVal[this.searchnubFoot -1] !== undefined){
          document.getElementsByClassName(newVal[this.searchnubFoot -1])[0].scrollIntoView({behavior:"smooth", block: "center"})
        }

        setTimeout(function () {
          $($("#saishi" + newVal[that.searchnubFoot -1])).removeClass("searchBgcolor")
          $($("#zhuduiming" + newVal[that.searchnubFoot -1])).removeClass("searchBgcolor")
          $($("#keduiming" + newVal[that.searchnubFoot -1])).removeClass("searchBgcolor")
          // console.log(newVal[that.searchnubFoot -1] + "foot.vue/467")
        },1000)
      },
    } ,
    typees:{
      handler: function (newVal, oldVal) {
        this.types = newVal
        // console.log(newVal)
      },
    },
    companys:{
      handler: function (newVal, oldVal) {
        this.companynub = newVal
        // console.log(newVal)
      },
    },

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
  border-bottom: 1px solid #9197ad;
  colot:#333;
  border-left:0px;
  border-right:0px;
}
/*#list > tr:nth-child(even) > td {background-color: #9197ad;}*/
/*#list > tr:nth-child(odd) > td {background-color: white;}*/
.el-progress-bar__outer{
  background: #bec2cf;
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
.isfontcolor_block{
  background:red !important;
}


.hoverfalseimg{
  display: inline-block;
  background: url("../assets/img/hoverfalse.png");
  background-size: 100% 100%;
}
.introactive{
  display: inline-block;
  background: url("../assets/img/hovertrue.png");
  background-size: 100% 100%;
}
.fenxiactive{
  color: #45c0f4;
}
.fenxicolor{
  color: #9197ad;
}


.lab-team-home {
  transition: background-color .8s cubic-bezier(1.0, 0.5, 0.8, 1.0) ;
}
.searchBgcolor{
  background-color:#ffd6d3;
}
/*::-webkit-scrollbar {*/
/*    display: none; !* Chrome Safari *!*/
/*}*/
.scroll::-webkit-scrollbar {
  display: none;
}
.tdwidth{
  width 9px !important;
}
.load{
  height: 500px;
  margin-top: 200px;
  text-align: center;
  img{
    width:55px;
  }
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
.el-tooltip__popper .is-light{
  z-index: 11 !importent;
  width: 396px !importent;
  box-shadow: 5px 5px 21px 11px rgba(162, 140, 137, 0.24), 0 5px 15px 0 rgba(0, 0, 0, 0.2) !important;
  background: #f8f8f8 important;
  border-radius: 4px important;
  font-family: 'Microsoft Yahei', 'PingFang SC', 'Avenir', 'Segoe UI', 'Hiragino Sans GB', STHeiti, 'Microsoft Sans Serif', 'WenQuanYi Micro Hei', sans-serif important;
}
#body  .atooltip{
  display:block;
  z-index: 11 !importent;
  width: 396px !importent;
  box-shadow: 5px 5px 21px 11px rgba(162, 140, 137, 0.24), 0 5px 15px 0 rgba(0, 0, 0, 0.2) !important;
  background: #f8f8f8 important;
  border-radius: 4px important;
  font-family: 'Microsoft Yahei', 'PingFang SC', 'Avenir', 'Segoe UI', 'Hiragino Sans GB', STHeiti, 'Microsoft Sans Serif', 'WenQuanYi Micro Hei', sans-serif important;
}

.point-animation::after {
  content: '′';
  position: absolute;
  top: -2px;
  right: -5px;
  color: #ba9250;
  animation: 1s infinite linear blink;
  animation-name: slidein;
}
.point-animation::after {
  color: #ff4343;
}
@keyframes slidein {
  from {
    color: #ba9250;
  }

  to {
    color: #ff4343;
  }
}
</style>