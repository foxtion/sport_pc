<template>
  <div >
    <div class="mengban"  v-if="isshowmengban" style="top: 119px;position: absolute;width: 100%;height: 100%;background:rgb(320,320,321); opacity: 0;z-index: 10" @click="hidemengban"></div>
    <div class="matchwrapperfoot" style="position:relative">
      <div class = "fixed" style="display:none;line-height: 0.8;">
        <div class="fixedtool" style="height: 208px;">
          <div style="margin-top:5px;" @click="followfoot">
            <p class = "icon" style="font-size: 18px;"><i class = "el-icon-thumb"></i></p>
            <p class = 'text'>关注</p>
          </div>
          <div @click="retainfoot">
            <p class = "icon">
                        <span class = "retain_num" v-if="retainfootball >= 10 && !is_load">
                            {{retainfootball}}
                        </span>
              <span class = "retain_num" v-else-if="retainfootball < 10 && !is_load" style="width:15px;">
                            {{retainfootball}}
                        </span>
              <span  style="font-size: 18px;"> <i class = "el-icon-check"></i></span>
            </p>
            <p class = 'text'>保留</p>
          </div>
          <div @click="hidefoot">
            <p class = "icon">
                        <span class = "hide_num" v-if="hidefootball.length >= 10 && !is_load && !is_load">
                            {{hidefootball.length}}
                        </span>
              <span class = "hide_num" v-else-if="hidefootball.length > 0 && hidefootball.length < 10 && !is_load" style="width:15px;">
                            {{hidefootball.length}}
                        </span>
              <span  style="font-size: 18px;"><i class = "el-icon-view"></i>      </span>
            </p>
            <p class = 'text'>隐藏</p>
          </div>
          <div @click="showfoot">
            <p class = "icon" style="font-size: 18px;"><i class = "el-icon-zoom-in"></i></p>
            <p class = 'text' style="border-bottom:none;line-height: 20px;">显示</p>
          </div>
        </div>
      </div>

      <div class = "fixed" >
        <div class="fixedtool" v-if="fixedtoolxianshi">
          <span class="zhengzai zhengactive"  style="width: 62px;height: 59px" ref="jinxingz" @click="goAnchor1('#playing')"></span>
          <span class="weikai"  style="width: 62px;height: 59px" ref="jinxingz" @click="goAnchor2('#waiting')"></span>
          <span class="wanchang"  style="width: 62px;height: 59px" ref="jinxingz" @click="goAnchor3('#ended')"></span>
          <span class="yichang"  style="width: 62px;height: 59px" ref="jinxingz" @click="goAnchor4('#abnormal')"></span>
        </div>
        <!--左侧热门足球栏-->
        <div style="width: 102px;height:auto;border-radius: 5px;position: absolute;top:63px;left:-130px;color:#787878;font-size: 12px;box-shadow: 0px 2px 5px #dedede;">
          <img width="100%" style="position: relative;top:2px" src="../assets/img/hotevent.png">
          <div style="height: 400px;overflow-y:auto" class="scrollbarnone" :style="heightlong==heightlongs ?'height:700px':'height:400px'">
            <div  v-for="item in saishilstdata"  v-model="saishilstdatamodel" :id="'listshover' +item.events_id" :style="hoteventtool==item.events_id?'background:#58a0ff;line-height: 25px;color: rgb(255, 255, 255);height: 25px;cursor:pointer;width: 100%;padding-left: 12px':'background:white;cursor:pointer;height: 25px;width: 100%;padding-left: 12px;color: rgb(120, 120, 120);line-height: 25px;'"    @click="changehotevent(item.events_id,item.count)">
              <img :src="item.logo" width="12px">    {{item.name}}
            </div>
          </div>
          <div style="text-align: center;height: 20px;cursor:pointer;background: #fff;" @click="showallhot"><i :class="kaiorhe==1?'el-icon-arrow-down':'el-icon-arrow-up'"></i></div>
        </div>
      </div>
      <!--顶部按钮-->
      <div class="liveTypenav" id="searchBar">
        <div>
                <span   v-for="(item, i) in classify" :key="i" v-if="is_shoucang != i"  style=" width: 50px; font-size: 14px;margin-right: 15px;" :class="{ active: item.active }" @click="select_type(item, i)">
                    {{ item.name }}
                    <div v-if="i==3 && (follownum + shoucangnub)> 0" style="background: #FE5746;color:white;font-size: 12px;border-radius:50%;width: 21px;height:21px;padding-left: 5px;top: -40px;left: 38px;position: relative;line-height: 21px">{{follownum + shoucangnub}}</div>
                </span>
          <span v-if="hidefootball>0" class="span active" style=" width: 160px; font-size: 14px;" @click="showfoot">全部（隐藏{{hidefootball}}场）</span>
        </div>
        <div>
          <span style="width:64px;font-size: 14px;" :class="saishifocus==1?'span active':'span'" id="sskuangan" @mouseover="matchselectys(1)" @mouseleave="matchselectys(2)" @click="showeventer"  v-if="type != 4">赛事<i class="el-icon-caret-bottom"></i></span>
          <span style="width:74px;font-size: 14px;margin-left: 10px" @click="selectzs" :class="zoushifocus==1?'span active':'span'" id="xzzsan"  @mouseover="oddsselectys(1)" @mouseleave="oddsselectys(2)" v-if="type != 4">走势 <i class="el-icon-caret-bottom"></i></span>
          <span style="width:110px;font-size: 14px;margin-left: 10px"  id="companyan" :class="compafocus==1?'span active':'span'" @click="showcompany"  @mouseover="comselectys(1)" @mouseleave="comselectys(2)">	{{comnow}} <i class="el-icon-caret-bottom"></i></span>
          <!--<span style="width:100px;font-size: 14px"    @click="selectdatevisible  = true">选择日期</span>   &lt;!&ndash;  @click="select_event" &ndash;&gt;-->


          <span class="search" style="border-width: 1px;border-style: solid; border-color:lightgray" @click="showSearch" v-if="is_search"  ><i class = 'el-icon-search' ></i>搜索</span>
          <template v-else  style="float: left">
            <el-autocomplete  placeholder="搜索球队名称" v-model="likefoot" :fetch-suggestions="queryfoot" @select="searchHistory" @keyup.native="submitSearch"  class = "query" >
            </el-autocomplete>
            <div style="float: left;position: absolute;top:22px;right: 219px">{{searchnub}}/{{shujuTDnamelength}}</div>
            <div class="up" @click="searchjianpanUp"></div>
            <div class="down" @click="searchjianpanDown"></div>
            <i class="el-icon-circle-close el-input__icon close" slot="suffix" @click="hideSearch"></i>
          </template>
          <pormpt style="float:right"></pormpt>
        </div>
      </div>
      <!--日历--->
      <div class="date-lists " v-if="rilixianshi">

        <ul  ref="riqizu">
          <li class="item" v-for="(item, i) in select_date" :key="i" :class="{current: item.active}" @click="brush_time(i)">
            <span class="day">{{item.time}}</span>
            <br />
            <span class="date">{{item.week}}</span>
          </li>
          <li  class="item" style="position: relative">
            <i><img src="../assets/img/rilitubiao.png" style="width: 20px;height: 20px;position: absolute;left: 10px;top:21px;z-index:2"> </i>
            <i><img src="../assets/img/riqixiajiantou.png" style="width: 14px;height: 8px;position: absolute;right: 19px;top:28px;z-index:2"></i>
            <!--赛程-->
            <div class = "filter_time" v-if ="type==1">
              <el-date-picker :editable="false" v-model="filter_timesaicheng" @change="saichengriqiselect($event)" format="MM-dd" value-format="MM-dd" type="date"  placeholder="选择日期"  :picker-options="picker_end">
              </el-date-picker>
            </div>
            <!--赛果-->
            <div class = "filter_time" v-if ="type==3">
              <el-date-picker :editable="false"  v-model="filter_time" format="MM-dd" value-format="MM-dd" type="date" @change="saiguoriqiselect($event)" placeholder="选择日期"  :picker-options="picker_not">
              </el-date-picker>
            </div>
          </li>
        </ul>
      </div>
      <!--走势-->
      <div  class="download-submenu zssjkuangs"  ref="zssjkuang"  style="top:57px;display: none;left:980px;height:200px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)" >
        <i class="xsanjiao" ></i>
        <div class="download-submenu-box" style="height:150px">
          <el-checkbox-group v-model="checkedzoushi" @change="hanlezoushidata">
            <el-checkbox  v-for="item in zoushidata" :label="item" checked="checked">{{item}}</el-checkbox>
          </el-checkbox-group>
          <button  style="width: 22%;margin:5px;padding: 5px;cursor:pointer;" @click="handleCheckAllChanger">全选</button>
          <button @click="handleCheckotherChanger" style="width: 22%;margin:5px;padding: 5px;cursor:pointer;">反选</button>
          <button style="width: 22%;margin:5px;padding: 5px;cursor:pointer;" @click="confirmzs">确定</button>
          <button style="width: 22%;margin:5px;padding: 5px;cursor:pointer;" @click="hidezoushikuang">取消</button>
        </div>
      </div>
      <!--盘口-->
      <div  class="download-submenu oddscomks" ref="oddscomk" style="top:57px;padding:0;display: none;left:1026px;height:auto;width:120px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)" >
        <i class="xsanjiao" ></i>
        <div style="font-size: 14px;line-height: 20px">
          <br>
          <div  :id="i" class="companylist" v-for="(item,i ) in companylist"  @click="chancompany(i)">{{item}}</div>
          <br>
        </div>
      </div>
      <!--赛事-->
      <div  class="download-submenu sskuanger"  ref="sskuanger"  style="top:57px;display: none;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
        <i class="xsanjiao" ></i>
        <div class="download-submenu-box">
          <h4>A</h4>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox class="saishichackz" v-for="item in saishilstdata" :label="item.events_id" v-if="item.letter=='A'" checked="checked">{{item.name}}</el-checkbox> </el-checkbox-group>
          <el-divider></el-divider>
          <h4>B</h4>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox class="saishichackz" v-for="item in saishilstdata" :label="item.events_id" v-if="item.letter=='B'"  checked="checked">{{item.name}}</el-checkbox> </el-checkbox-group>
          <el-divider></el-divider>
          <h4>E</h4>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox class="saishichackz" v-for="item in saishilstdata" :label="item.events_id" v-if="item.letter=='E'"  checked="checked">{{item.name}}</el-checkbox> </el-checkbox-group>
          <el-divider></el-divider>
          <h4>D</h4>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox class="saishichackz" v-for="item in saishilstdata" :label="item.events_id" v-if="item.letter=='D'"  checked="checked">{{item.name}}</el-checkbox> </el-checkbox-group>
          <el-divider></el-divider>
          <h4>F</h4>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox class="saishichackz" v-for="item in saishilstdata"  :label="item.events_id" v-if="item.letter=='F'"  checked="checked">{{item.name}}</el-checkbox> </el-checkbox-group>
          <el-divider></el-divider>
          <h4>G</h4>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox class="saishichackz" v-for="item in saishilstdata" :label="item.events_id"  v-if="item.letter=='G'"  checked="checked">{{item.name}}</el-checkbox> </el-checkbox-group>
          <el-divider></el-divider>
          <h4>H</h4>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox class="saishichackz" v-for="item in saishilstdata" :label="item.events_id"  v-if="item.letter=='H'"   checked="checked">{{item.name}}</el-checkbox> </el-checkbox-group>
          <el-divider></el-divider>
          <h4>J</h4>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox class="saishichackz" v-for="item in saishilstdata" :label="item.events_id"  v-if="item.letter=='J'"  checked="checked">{{item.name}}</el-checkbox> </el-checkbox-group>
          <el-divider></el-divider>
          <h4>K</h4>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox class="saishichackz" v-for="item in saishilstdata" :label="item.events_id"  v-if="item.letter=='K'"  checked="checked">{{item.name}}</el-checkbox> </el-checkbox-group>
          <el-divider></el-divider>
          <h4>L</h4>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox class="saishichackz" v-for="item in saishilstdata" :label="item.events_id"  v-if="item.letter=='L'"  checked="checked">{{item.name}}</el-checkbox> </el-checkbox-group>
          <h4>M</h4>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox class="saishichackz" v-for="item in saishilstdata" :label="item.events_id"  v-if="item.letter=='M'"  checked="checked">{{item.name}}</el-checkbox> </el-checkbox-group>
          <el-divider></el-divider>
          <h4>N</h4><el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox class="saishichackz" v-for="item in saishilstdata" :label="item.events_id" v-if="item.letter=='N'"  checked="checked">{{item.name}}</el-checkbox> </el-checkbox-group>
          <el-divider></el-divider>
          <h4>O</h4><el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox class="saishichackz" v-for="item in saishilstdata" :label="item.events_id" v-if="item.letter=='O'"  checked="checked">{{item.name}}</el-checkbox> </el-checkbox-group>
          <el-divider></el-divider>
          <h4>P</h4><el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox class="saishichackz" v-for="item in saishilstdata" :label="item.events_id" v-if="item.letter=='P'"  checked="checked">{{item.name}}</el-checkbox> </el-checkbox-group>
          <el-divider></el-divider>
          <h4>Q</h4><el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox class="saishichackz" v-for="item in saishilstdata" :label="item.events_id"  v-if="item.letter=='Q'"  checked="checked">{{item.name}}</el-checkbox> </el-checkbox-group>
          <el-divider></el-divider>
          <h4>R</h4><el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox class="saishichackz" v-for="item in saishilstdata" :label="item.events_id"  v-if="item.letter=='R'"  checked="checked">{{item.name}}</el-checkbox> </el-checkbox-group>
          <el-divider></el-divider>
          <h4>S</h4><el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox class="saishichackz" v-for="item in saishilstdata" :label="item.events_id" v-if="item.letter=='S'"  checked="checked">{{item.name}}</el-checkbox> </el-checkbox-group>
          <el-divider></el-divider>
          <h4>T</h4><el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox class="saishichackz" v-for="item in saishilstdata" :label="item.events_id" v-if="item.letter=='T'"  checked="checked">{{item.name}}</el-checkbox> </el-checkbox-group>
          <el-divider></el-divider>
          <h4>W</h4><el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox class="saishichackz" v-for="item in saishilstdata" :label="item.events_id" v-if="item.letter=='W'"  checked="checked">{{item.name}}</el-checkbox> </el-checkbox-group>
          <el-divider></el-divider>
          <h4>X</h4><el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox  class="saishichackz" v-for="item in saishilstdata" :label="item.events_id" v-if="item.letter=='X'"  checked="checked">{{item.name}}</el-checkbox> </el-checkbox-group>
          <el-divider></el-divider>
          <h4>Y</h4><el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox class="saishichackz"  v-for="item in saishilstdata"  :label="item.events_id" v-if="item.letter=='Y'"  checked="checked">{{item.name}}</el-checkbox>  </el-checkbox-group>
          <el-divider></el-divider>
          <h4>Z</h4><el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox  class="saishichackz" v-for="item in saishilstdata" :label="item.events_id" v-if="item.letter=='Z'"  checked="checked">{{item.name}}</el-checkbox>
        </el-checkbox-group>
          <el-divider></el-divider>
        </div>
        <div  style="padding:10px;height:57px;border:1px solid #ddd;background: white;width: 110%;position: relative;left: -20px;">
          <button style="width: 22%;margin:5px;padding: 5px;cursor:pointer;" v-model="checkAll" :disabled="isdisabledFn" @click="handleCheckAllChange">全选</button>
          <button  style="width: 22%;margin:5px;padding: 5px;cursor:pointer;"  @click="handleCheckotherChange">反选</button>
          <button  style="width: 22%;margin:5px;padding: 5px;cursor:pointer;"  @click="CloseSelectEvent">确定</button>
          <button  style="width: 22%;margin:5px;padding: 5px;cursor:pointer;"  @click=" CloseSelectEventer">取消</button>
        </div>
      </div>
      <div class="date-list" v-if="selectdatevisible==true">
        <div class = "filter_time" v-if ="type==1">
          <el-date-picker v-model="filter_time"  value-format="yyyy-MM-dd" type="date"  placeholder="选择日期"  :picker-options="picker_end">
          </el-date-picker>
        </div>

        <div class = "filter_time" v-if ="type==3">
          <el-date-picker v-model="filter_time"  value-format="yyyy-MM-dd" type="date"  placeholder="选择日期"  :picker-options="picker_not">
          </el-date-picker>
        </div>
        <ul>
          <li style="margin-right: 60px;padding-top: 0px;width: 90px; height: 50px;" class="item" v-for="(item, i) in select_date" :key="i" :class="{current: item.active}" @click="brush_time(i)">
            <span style="font-size: 14px;" class="day">{{item.time}}</span>
            <br />
            <span style="font-size: 12px;" class="date">{{item.week}}</span>
          </li>
        </ul>
      </div>
      <!--表头-->
      <div class="football_match" id="searchBarbiaotou">
        <div class="match-data">
          <div class="match-card" style="font-size: 14px;color:#666;height: 30px;width: 1200px; line-height: 30px;background:#dbb16f">
            <div class="text" style="width: 120px;text-align: right;color:white">
              <span class=" checked" style="left:-44px">隐藏</span>
              <span class="checked" style="top:0px;left:0px">赛事</span>
            </div>
            <div class="event_time" :style="{width: '90px'}">
              <span style="width:55px;color:white">时间</span>
            </div>

            <div class="status" style="width: 35px;color:white">
              <span >状态</span>
            </div>
            <!--{width:(type == 3 ? '370px' : '400px')}-->
            <div class="team" style="width:290px;font-size: 14px;color:#666">
              <div class="host" :style="{width: '120px'}">
                <span style="color:white">主队</span>
              </div>
              <div class="sorce" :style="{width: '70px'}">
                <span  style="color:white">比分</span>
              </div>
              <div class="guest"  style="width:70px">
                <span style="color:white">客队</span>
              </div>
            </div>
            <div class="stage" style="width:120px;font-size: 14px;color:#666">
              <span style="width:65px;color:white">半场</span>
              <span style="width:35px;color:white">角球</span>
            </div>

            <div class="live" style="width:35px;color:white">
              <span>直播</span>
            </div>
            <div class="live" style="width:170px;color:white">
              <span>走势</span>
            </div>
            <div class="live" style="width:80px;color:white">
              <span>数据中心</span>
            </div>
            <div class="live" style="width:60px;color:white">
              <span>人气</span>
            </div>
            <div class="live" style="width:60px;color:white">
              <span>阵容</span>
            </div>
            <div class="follow" v-if="type != 3"  style="color:white">
              <span>功能</span>
            </div>
          </div>
        </div>
      </div>
      <!--主队进球弹窗（黄色）--><!--客队进球提示框（蓝色）-->
      <div style="position:fixed;top:100px;z-index:9998;left:39%;" v-if="zhuduijinqiulist.length > 0 || keduijinqiulist.length > 0">
        <div v-for="(item ,i) in zhuduijinqiulist"  style="width:400px;height:80px;padding-left:50px;padding-top:22px;background:url('https://api.daoyunxiang.com/static/images/jinqiu.png');background-size:100%;" >
          <img id="zhuanqiuq"  width="35px" src="../assets/img/zhudui.gif">
          <div style="margin-left: 30px;position: relative;top: -52px;text-align: center">
            <span style="color:grey; font-size :13px">一度体育</span><br><br>
            <span style="color:#F9A60C;font-weight: bold;font-size:14px">{{item.zhuduiwenben}}</span>  -  <span style="font-size:14px">{{item.keduiwenben}}</span></div>
          <br><button @click="zhuduiclosetisshi(i)" style="padding: 5px;position: relative;top: -135px; left: 350px;">×</button>
        </div>
        <div v-for="(item ,i) in keduijinqiulist"  style="width:400px;height:80px;padding-left:20px;padding-top:20px;background:url('https://api.daoyunxiang.com/static/images/jinqiuke.png');background-size:100%;">
          <img style="position: relative;left:310px;"  width="35px" src="../assets/img/kedui.gif">
          <div style="margin-left: 30px;position: relative;top: -50px;left:-30px;text-align: center">  <span style="color:grey; font-size :13px">一度体育<br><br>
              </span><span style="font-size:14px"> {{item.zhuduiwenben}}  </span> - <span style="color:#5BBEDB;font-weight: bold;font-size:14px"> {{item.keduiwenben}}</span>
          </div>
          <br><button @click="keduiclosetisshi(i)" style="padding: 5px;position: relative;top: -140px; left: 360px;">×</button>
        </div>
      </div>

      <audio src="https://api.daoyunxiang.com/static/pormpt/victory.mp3" controls  id="audiooo" hidden="true" muted></audio>
      <!--置顶-->
      <footSticky :football="football_sticky_list" :type="type" @hidefoot="hidefoot" :iszhujin="iszhujin" :iskejin="iskejin" :state="title.conduct" @CancelfootSticky="CancelfootSticky" v-if="type == 0 || type == 4">
      </footSticky>

      <div v-if="is_load==1">
        <div v-if="is_hot ==10">
          <div  class="alllist" style="min-height: 240px">
            <div v-if="type == 0 || type == 2 || type==5">
              <div class="football_title" v-if="type == 0 && football_conduct_list.length > 0 && title.conduct == 2 ||type == 5&& football_conduct_list.length >0" >
                <div class = "title" >
                  <!--正在-->
                  <img width="20px" src="@/assets/img/icon-101.png"/>
                  <span id="playing">正在进行的比赛</span>
                </div>
              </div>

              <foot   :football="football_conduct_list"  :searchnub="searchnub" :isclosed="isclosed" :typees="typees" :type="type" :iszhujin="iszhujin" :whichcom="whichcom" :iskejin="iskejin" :state="title.conduct" :isfont="isfont" :shujuTDname="shujuTDname" :chuangjianasiaa1="chuangjianasiaa1" @hidefoot="hidefoot" @follow="follow" @footSticky="footSticky"></foot>
            </div>

            <div v-if="type == 0 || type == 1 || type==5">
              <div class="football_title" v-if="type == 0 && football_not_list.length > 0 && title.not == 8 ||type == 5 && football_not_list.length > 0">
                <div class = "title">
                  <img width="20px" src="@/assets/img/icon-102.png"/>
                  <span id="waiting">未开始的比赛</span>
                </div>
              </div>
              <div class="1111">
                <foot :football="football_not_list" :type="type" :searchnub="searchnub" :whichcom="whichcom" :typees="typees" :state="title.not" :isfont="isfont" :shujuTDname="shujuTDname" @follow="follow" @hidefoot="hidefoot" @footSticky="footSticky"></foot>
              </div>
            </div>

            <div v-if="type == 0 || type == 3 || type==5">
              <div class="football_title" v-if="type == 0 && football_end_list.length > 0 && title.end == 1 || type == 5 && football_end_list.length > 0">
                <div class = "title">
                  <img width="20px" src="@/assets/img/icon-103.png"/>
                  <span id="ended">已完结的比赛</span>
                </div>
              </div>

              <foot :football="football_end_list" :type="type" :searchnub="searchnub" :state="title.end" :typees="typees" :whichcom="whichcom" :shujuTDname="shujuTDname" @follow="follow" @hidefoot="hidefoot" @footSticky="footSticky"></foot>
            </div>
            <div v-if="type == 0 || type==5">
              <div class="football_title" v-if="type == 0 && football_unusual_list.length > 0 && title.end == 1 || type == 5 && football_unusual_list.length > 0">
                <div class = "title">
                  <img width="20px" src="@/assets/img/icon-103.png"/>
                  <span id="abnormal">异常的比赛</span>
                </div>
              </div>
              <foot :football="football_unusual_list" :searchnub="searchnub" :type="type" :state="title.end" :typees="typees" :whichcom="whichcom" :shujuTDname="shujuTDname" @follow="follow" @hidefoot="hidefoot" @footSticky="footSticky"></foot>
            </div>
            <div style="overflow: hidden;border: 1px solid #e6e6e6;background: #fff">
              <div class="football-footer m-t-20 m-b-20">
                <div class="top" style="">
                  <div style="height:55px;background-color: #f7f7f8;width: 130px;text-align: center;font-size: 16px;color: #787878;float:left;padding-top: 17px;">图例说明</div>
                  <div style="width: 1018px;height:55px;background-color:white;float:left;padding: 15px;font-size: 12px;">
                                <span style="margin: 0 10px;">
                                    <img width="15px" src="../assets/img/syzqico2.png">   进球
                                </span>
                    <span style="margin: 0 10px;"><img width="15px" src="../assets/img/dianfoot.png">   点球</span>
                    <span style="margin: 0 10px;"><img width="15px" src="../assets/img/dianquishishe.png">   点球射失</span>
                    <span style="margin: 0 10px;"><img width="15px" src="../assets/img/wulongfoot.png">   乌龙球</span>
                    <span style="margin: 0 10px;"><img width="15px" src="../assets/img/huanren.png">   换人</span>
                    <span style="margin: 0 10px;"><img width="15px" src="../assets/img/jiaoqui.png">   角球</span>
                    <span style="margin: 0 10px;"><img width="15px" src="../assets/img/huangpai.png">   黄牌</span>
                    <span style="margin: 0 10px;"><img width="15px" src="../assets/img/hongpai.png">   红牌</span>
                    <span style="margin: 0 10px;"><img width="15px" src="../assets/img/huanghong.png">   两黄变一红</span>
                    <!--                    <span style="margin: 0 10px;"><img width="15px" src="../assets/img/shoushang.png">   受伤离场</span>-->

                    <span style="margin: 0 10px;"><img width="15px" src="../assets/img/icon-201.png">   动画</span>
                    <span style="margin: 0 10px;"><img width="15px" src="../assets/img/icon-202.png">   视频</span>
                    <span style="margin: 0 10px;"><img width="15px" src="../assets/img/u719.png">   隐藏</span>
                    <span style="margin: 0 10px;"><img width="15px" src="https://soket.daoyunxiang.com/icon/jiantou.png">   置顶</span>
                    <span style="margin: 0 10px;"><img width="15px" src="https://soket.daoyunxiang.com/icon/xing.png">   收藏</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="is_hot == 20">
          <div  class="alllist" style="min-height: 240px">
            <div v-if="type == 0 || type == 2">
              <div class="football_title" v-if="type == 0 && football_conduct_hot_list.length > 0 && title.conduct == 2" >
                <div class = "title" >
                  <!--正在-->
                  <img width="20px" src="@/assets/img/icon-101.png"/>
                  <span id="playing">正在进行的比赛</span>
                </div>
              </div>

              <foot   :football="football_conduct_hot_list"  :searchnub="searchnub" :isclosed="isclosed" :typees="typees" :type="type" :iszhujin="iszhujin" :whichcom="whichcom" :iskejin="iskejin" :state="title.conduct" :isfont="isfont" :shujuTDname="shujuTDname" :chuangjianasiaa1="chuangjianasiaa1" @hidefoot="hidefoot" @follow="follow" @footSticky="footSticky"></foot>
            </div>

            <div v-if="type == 0 || type == 1">
              <div class="football_title" v-if="type == 0 && football_not_hot_list.length > 0 && title.not == 8">
                <div class = "title">
                  <img width="20px" src="@/assets/img/icon-102.png"/>
                  <span id="waiting">未开始的比赛</span>
                </div>
              </div>
              <div class="1111">
                <foot :football="football_not_hot_list" :type="type" :searchnub="searchnub" :whichcom="whichcom" :typees="typees" :state="title.not" :isfont="isfont" :shujuTDname="shujuTDname" @follow="follow" @hidefoot="hidefoot" @footSticky="footSticky"></foot>
              </div>
            </div>

            <div v-if="type == 0 || type == 3 ">
              <div class="football_title" v-if="type == 0 && football_end_hot_list.length > 0 && title.end == 1">
                <div class = "title">
                  <img width="20px" src="@/assets/img/icon-103.png"/>
                  <span id="ended">已完结的比赛</span>
                </div>
              </div>

              <foot :football="football_end_hot_list" :type="type" :searchnub="searchnub" :state="title.end" :typees="typees" :whichcom="whichcom" :shujuTDname="shujuTDname" @follow="follow" @hidefoot="hidefoot" @footSticky="footSticky"></foot>
            </div>
            <div v-if="type == 0">
              <div class="football_title" v-if="type == 0 && football_unusual_hot_list.length > 0 && title.end == 1">
                <div class = "title">
                  <img width="20px" src="@/assets/img/icon-103.png"/>
                  <span id="abnormal">异常的比赛</span>
                </div>
              </div>
              <foot :football="football_unusual_hot_list" :searchnub="searchnub" :type="type" :state="title.end" :typees="typees" :whichcom="whichcom" :shujuTDname="shujuTDname" @follow="follow" @hidefoot="hidefoot" @footSticky="footSticky"></foot>
            </div>
            <div style="overflow: hidden;border: 1px solid #e6e6e6;background: #fff">
              <div class="football-footer m-t-20 m-b-20">
                <div class="top" style="">
                  <div style="height:55px;background-color: #f7f7f8;width: 130px;text-align: center;font-size: 16px;color: #787878;float:left;padding-top: 17px;">图例说明</div>
                  <div style="width: 1018px;height:55px;background-color:white;float:left;padding: 15px;font-size: 12px;">
                        <span style="margin: 0 10px;">
                            <img width="15px" src="../assets/img/syzqico2.png">   进球
                        </span>
                    <span style="margin: 0 10px;"><img width="15px" src="../assets/img/dianfoot.png">   点球</span>
                    <span style="margin: 0 10px;"><img width="15px" src="../assets/img/dianquishishe.png">   点球射失</span>
                    <span style="margin: 0 10px;"><img width="15px" src="../assets/img/wulongfoot.png">   乌龙球</span>
                    <span style="margin: 0 10px;"><img width="15px" src="../assets/img/huanren.png">   换人</span>
                    <span style="margin: 0 10px;"><img width="15px" src="../assets/img/jiaoqui.png">   角球</span>
                    <span style="margin: 0 10px;"><img width="15px" src="../assets/img/huangpai.png">   黄牌</span>
                    <span style="margin: 0 10px;"><img width="15px" src="../assets/img/hongpai.png">   红牌</span>
                    <span style="margin: 0 10px;"><img width="15px" src="../assets/img/huanghong.png">   两黄变一红</span>
                    <span style="margin: 0 10px;"><img width="15px" src="../assets/img/icon-201.png">   动画</span>
                    <span style="margin: 0 10px;"><img width="15px" src="../assets/img/icon-202.png">   视频</span>
                    <span style="margin: 0 10px;"><img width="15px" src="../assets/img/u719.png">   隐藏</span>
                    <span style="margin: 0 10px;"><img width="15px" src="https://soket.daoyunxiang.com/icon/jiantou.png">   置顶</span>
                    <span style="margin: 0 10px;"><img width="15px" src="https://soket.daoyunxiang.com/icon/xing.png">   收藏</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class = "load" v-else>
        <div class="loads">
          <img src="@/assets/loadinges.gif" />
          <p style="color: #666666;font-size: 14px;padding-top:5px ">加载中...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import noData from "@/components/noData.vue";
import notHave from "@/components/notHave.vue";
import foot from "@/components/foot.vue";

import pormpt from "@/components/pormpt.vue";
import footSticky from "@/components/footSticky.vue";
import config from "_s/config.js";
import {Getfootball,FollowFootball,CancelFollowFootball,selectsaishier ,getcompany,FollowFootballList} from '@/api'
import footerbar from "@/components/footerbar.vue";
export default {
  name: "Football",
  components: {
    noData,
    notHave,
    foot,//列表
    pormpt,
    footSticky,//置顶
    footerbar
  },
  data() {
    return {
      data:"",
      classify: [
        {'name':'即时','type' : 0, 'active': true},
        {'name':'赛果','type' : 3, 'active': false},
        {'name':'赛程','type' : 1, 'active': false},
        {'name':'收藏','type': 5, 'active': false},
      ],
      week: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      schedule: [],
      filter_time:'',
      filter_timesaicheng:'',
      football_end_list: [],
      football_abnormal_list: [],
      football_not_list: [],
      football_conduct_list: [],
      football_unusual_list:[],
      football_end_hot_list: [],
      football_unusual_hot_list:[],
      football_not_hot_list: [],
      football_conduct_hot_list: [],
      football_end_list_list: [],
      football_unusual_list_list:[],
      football_not_list_list: [],
      football_conduct_list_list: [],
      football_conduct_list_splice:[],
      football_end_list_splice: [],
      football_not_list_splice: [],
      football_unusual_list_splice:[],
      football_all_list_splice:[],
      timerr:'',
      timenew:'',
      football_hot_end_list: [],
      football_hot_not_list: [],
      football_hot_conduct_list: [],

      football_sticky_list: [],

      football_search_end_list: [],
      football_search_not_list: [],
      football_search_conduct_list: [],

      filter: {
        'all':[],'conduct':[],'end':[],"hot":[],'not':[]
      },
      type:0,
      is_event:0,
      user:{},
      user_id:0,
      drawer: false,
      event:[],
      letter:[],
      selected_event:[],
      select_event_id: [],
      hide:0,
      search_events:false,
      picker_not:{
        disabledDate(time) {
          return time.getTime() > Date.now() || time.getTime() < Date.now() - 3600 * 1000 * 24 * 15;
        }
      },
      picker_end:{
        disabledDate(time) {
          return time.getTime() < Date.now() || time.getTime() > Date.now() + 3600 * 1000 * 24 * 15;
        }
      },
      frame_height:'800px',
      is_load:1,
      click_event:false,
      checkedAll:false,
      checkedAll_hot:false,
      retainEvnet:[],
      title:{"not":8,'conduct':2,'end':1,'hot_not':8,'hot_conduct':2,'hot_end':1},
      time:'',
      hidefootball:0,
      retainfootball:0,
      total:0,
      likefoot:'',
      is_search:1,
      jqfwenben:'',
      wjfwenben:'',
      rotate:false,
      rotate2:false,
      iszhujin:-1,
      iskejin:-1,
      oukejiang:-1,
      ouzhuzeng:-1,
      matchlstlogVisible:false,
      saishilstdata:[],
      checkedCities:[],
      checkAll: false,
      isIndeterminate: true,
      isIndeterminateer:true,
      checkAller:false,
      selectdatevisible:false,
      fenpijz:1,
      zoushidata:["无走势","0.5","1.5","1.75","2.0","2.25","2.5","2.75","3.0","3.25","3.5","3.75","4.0","4.25","4.5","5.5","6.0"],
      checkedzoushi:["无走势","0.5","1.5","1.75","2.0","2.25","2.5","2.75","3.0","3.25","3.5","3.75","4.0","4.25","4.5","5.5","6.0"],
      isfirst:0,
      saishifocus:0,
      zoushifocus:0,
      compafocus:0,
      hoteventtool:0,
      whichcom:2,
      comnow:'BET365',
      kaiorhe:1,
      follownum:0,
      isfont:0,
      shujuTDname:[],
      selcet:1,
      isclosed:0,
      oIndex:null,
      tIndex:null,
      sIndex:null,
      fIndex:null,
      typees:1,
      football_undetermined_list:[],
      isshowmengban:false,
      fixedtoolxianshi:true,
      select_date: [],
      checkOrderList:[],
      rilixianshi:false,
      shezhitankuangxianshi:true,
      searchnub:0,
      shujuTDnamelength:0,
      companylist:[],
      companys:2,
      checkedCitieses:[],
      checkedlist:[],
      zhuduijinqiulist:[],
      keduijinqiulist:[],
      chuangjianasiaa1:false,
      isdisabledFn:true,
      shoucangnub:0,
      is_shoucang:5,
      heightlong:1,
      heightlongs:0,
      renmenArray: [],
      saishilstdatamodel:[],
      ishotclick:1,
      is_hot:0,
      select_hot_id:"",
      bisaizhuantai:"",
      worker: null,

      curPageconduct:1,
      curPagenot:1,
      curPageend:1,
      curPageunusual:1,
      pageSize:16,
      prevY: 0,
      arr:[],

      websock: null, //建立的连接
      lockReconnect: false, //是否真正建立连接
      timeout: 28 * 100, //3秒一次心跳
      timeoutObj: null, //外层心跳倒计时
      serverTimeoutObj: null, //内层心跳检测
      timeoutnum: null //断开 重连倒计时
    };
  },
  created() {

    this.initWebSocket()
  },
  watch:{
    //监听赛程
    filter_time(val){
      var data = new Date()
      var year = data.getFullYear()
      this.time =year+"-" +this.filter_time

      this.footballsaicheng()
    },
    //监听赛果
    filter_timesaicheng(val){
      var data = new Date()
      var year = data.getFullYear()
      this.time =year+"-" +this.filter_timesaicheng
      this.footballsaiguo()
    },

  },

  mounted() {

    // window.immediater = this.immediater;
    window. oIndex = this. oIndex;
    window. tIndex = this. tIndex;
    window. sIndex = this. sIndex;
    window. fIndex = this. fIndex;
    let height=document.documentElement.clientHeight - 50;
    if(height < 500){
      this.frame_height = 800 + 'px'
    }else{
      this.frame_height = height + 'px'
    }
    this.user = JSON.parse(window.localStorage.getItem("user"))
    for(let i = 0; i <= 6; i++){
      let date = this.format_date(i,'add')
      this.select_date.push({"time":date.time,"week":date.week,"active":i == 0 ? true : false})
    }
    let user = JSON.parse(window.localStorage.getItem("user"));
    if(user){
      this.user = user
      this.user_id = user.id
      this.getfollowes()
    }
    let format = this.format_date(0)
    this.time = format.now
    if(!user){
      this.is_shoucang = 3
    }

    this.retainfootball = parseInt(this.total - this.hidefootball.length)
    this.company()
    // setInterval(this.restart, 100000);
    window.addEventListener('scroll', this.handleScroll,true)
    this.screenHeight = 788;
    this.startes = 0;
    this.end = this.startes + this.visibleCount;
    this.football()
    // this.worker = this.$worker.run(()=>{},[]).then(res => {
    //
    // }).catch(e=>console.log(e))
  },

  computed: {
    newdataList: function() {
      return  this.sortKey(this.football_conduct_list, "opening_time_text");
    },
    //列表总高度
    listHeight(){
      return this.football_all_list_splice.length * this.itemSize;
    },
    listsHeight(){
      console.log(this.end * this.itemSize)
      return this.end * this.itemSize;
    },
    //可显示的列表项数
    visibleCount(){
      console.log(this.screenHeight)
      return Math.ceil(this.screenHeight / this.itemSize)

    },
    //偏移量对应的style
    getTransform(){
      return `translate3d(0,${this.startOffset}px,0)`;
    },
    visibleData(){
      console.log(this.football_all_list_splice.slice(this.startes, Math.min(this.end,this.football_all_list_splice.length)))
      return this.football_all_list_splice.slice(this.startes, Math.min(this.end,this.football_all_list_splice.length));
    },

  },

  methods: {
    initWebSocket() {
      //初始化weosocket
      const wsuri = "wss://soket.daoyunxiang.com:9293";
      //   const wsuri = "ws://107.148.224.65:9293";
      this.websock = new WebSocket(wsuri);
      this.websock.onopen = this.websocketonopen;
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    reconnect() {
      //重新连接
      var that = this;
      if (that.lockReconnect) {
        // 是否真正建立连接
        return;
      }
      that.lockReconnect = true;
      //没连接上会一直重连，设置延迟避免请求过多
      that.timeoutnum && clearTimeout(that.timeoutnum);
      // 如果到了这里断开重连的倒计时还有值的话就清除掉
      that.timeoutnum = setTimeout(function() {
        //然后新连接
        that.initWebSocket();
        that.lockReconnect = false;
      }, 50);
    },
    reset() {
      //重置心跳
      var that = this;
      //清除时间（清除内外两个心跳计时）
      clearTimeout(that.timeoutObj);
      clearTimeout(that.serverTimeoutObj);
      //重启心跳
      that.start();
    },
    start() {
      //开启心跳
      var self = this;
      self.timeoutObj && clearTimeout(self.timeoutObj);
      // 如果外层心跳倒计时存在的话，清除掉
      self.serverTimeoutObj && clearTimeout(self.serverTimeoutObj);
      // 如果内层心跳检测倒计时存在的话，清除掉
      self.timeoutObj = setTimeout(function() {
        // 重新赋值重新发送 进行心跳检测
        //这里发送一个心跳，后端收到后，返回一个心跳消息，
        if (self.websock.readyState == 1) {
          //如果连接正常
          self.websock.send("heartCheck");
        } else {
          //否则重连
          self.reconnect();
        }

      }, self.timeout);
      // 300毫秒一次
    },

    websocketonopen(e) {
      //连接建立之后执行send方法发送数据
      console.log("成功");
      let actions = { test: "12345" };
      // this.websocketsend(JSON.stringify(actions));
    },
    websocketonerror() {
      //连接建立失败重连
      console.log("失败");
      this.initWebSocket();
    },
    websocketonmessage(e) {
      //数据接收
      let redata = e.data;
      this.immediater(redata)
      this.reset();
    },
    websocketsend(Data) {
      //数据发送
      this.websock.send(Data);
    },
    websocketclose(e) {
      //关闭
      console.log("断开连接");
    },
    //获取当前时间戳
    dangqiantime(){
      let date = new Date()
      var time1 = date.getTime()
      return time1/1000
    } ,
    //赛程日历选择器
    saichengriqiselect(val){

      var riqi = new Date()
      var year = riqi.getFullYear()

      this.select_date =[]
      this.time = year + "-"+ val

      var list = [{active:false},{active:false},{active:false},{active:false},{active:false},{active:false},{active:false}]
      for(let i = 0; i <= 6; i++) {
        let date = this.format_date(i, 'add')
        if (date.time == this.time) {
          list[i].active = true
        }else {
        }
        console.log( list[i].active)
        if (i == 0) {
          let week = {
            "time": date.time,
            "week": date.week,
            'active': list[i].active
          }
          this.select_date.push(week)
        } else {
          var timer = date.time.slice(5, 10)
          let week = {
            "time": timer,
            "week": date.week,
            'active':list[i].active
          }
          this.select_date.push(week)
        }
      }
    },
    //赛果日历选择器
    saiguoriqiselect(val){
      this.select_date = []
      var riqi = new Date()
      var year = riqi.getFullYear()

      this.select_date =[]
      this.time = year + "-"+ val
      var list = [{active:false},{active:false},{active:false},{active:false},{active:false},{active:false},{active:false}]
      for(let i = 0; i <= 6; i++) {
        let date = this.format_date(i,"reduce")

        if (date.time == this.time) {
          list[i].active = true
          // console.log(111)
        }else {

        }
        // console.log( list[i].active)
        if (i == 0) {
          let week = {
            "time": date.time,
            "week": date.week,
            'active': list[i].active
          }
          this.select_date.unshift(week)
        } else {
          var timer = date.time.slice(5, 10)
          let week = {
            "time": timer,
            "week": date.week,
            'active':list[i].active
          }
          this.select_date.unshift(week)
        }
      }
    },
    sortKey(array, key) {
      return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        //   console.log()
        return x - y;
      });
    },
    handleScroll () { //改变元素#searchBar的top值
      // console.log(111)
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if(this.rilixianshi == true){
        if(scrollTop >100){
          $('#searchBar').addClass("erjinavfixed")
          $('.date-lists').addClass("rilefixed")
          $('#searchBarbiaotou').addClass("biaotousaiguofixed")
        }else{
          $('#searchBar').removeClass("erjinavfixed")
          $('.date-lists').removeClass("rilefixed")
          $('#searchBarbiaotou').removeClass("biaotousaiguofixed")
        }
      }else {
        if(scrollTop >100){
          $('#searchBar').addClass("erjinavfixed")
          $('#searchBarbiaotou').addClass("biaotoufixed")
        }else{
          $('#searchBar').removeClass("erjinavfixed")
          $('#searchBarbiaotou').removeClass("biaotoufixed")
        }
      }

    },
    shezhi(){
      this.shezhitankuangxianshi = true;
    },
    lhoverenter(index){
      $("#listshover" + index).css({"background":"#58a0ff","color":"#FFF"})
    },
    lihoverleave(index){
      $("#listshover" + index).css({"background":"#fff","color":"#787878"})
    },
    hidemengban(){
      this.isshowmengban = false
      this.$refs.sskuanger.style.display="none";
      this.$refs.zssjkuang.style.display="none";
      this.$refs.oddscomk.style.display="none";
    },
    hidefoot1(){
    },
    showcompany()
    {
      if(this.$refs.oddscomk.style.display=='none'){
        this.$refs.oddscomk.style.display='block';
      }else{
        this.$refs.oddscomk.style.display='none';
      }
      var companyan=document.getElementById("companyan");
      this.$refs.oddscomk.style.left=companyan.offsetLeft+'px';
      this.$refs.sskuanger.style.display="none";
      this.$refs.zssjkuang.style.display="none";
      this.$refs.oddscomk.style.display="inline";
    },
    jtscroll(){
      var scrollTop = document.documentElement.scrollTop;

      var windowHeight = document.documentElement.clientHeight ;

      var scrollHeight = document.documentElement.scrollHeight;
      if(scrollTop+windowHeight>scrollHeight-100){
        if(this.fenpijz<3){
          this.is_load = 1;
          this.football();
          this.fenpijz+=1;
        }
      }
    },
    //全选
    handleCheckAllChange(val) {
      this.isdisabledFn = true
      this.isIndeterminate = false;
      this.checkedCities =[]
      this.saishilstdata.forEach(item=>{  //当全选被选中的时候，循环遍历源数据，把数据的每一项加入到默认选中的数组去
        this.checkedCities.push(item.events_id)
      })
      this.checkedCities = val ? this.checkedCities : []
      console.log( this.checkedCities)
    },
    restart()
    {
      this.isfirst=3;
      this.football()

      let retainfoot = JSON.parse(window.localStorage.getItem("retainEvnet_foot_"+this.time));
      this.hidefootball = retainfoot ? retainfoot :[]
      this.retainfootball = parseInt(this.total - this.hidefootball.length)

    },
    confirmzs(){
      if(this.checkedzoushi.length<this.zoushidata.length) {
        for (var h = 0; h < this.zoushidata.length; h++) {
          if (this.checkedzoushi.includes(this.zoushidata[h]) == false) {
            for (var ll = 0; ll < this.football_conduct_list.length; ll++) {
              if (this.football_conduct_list[ll]["drawoddsou"] == this.zoushidata[h]) {
                this.hidefootball.push(this.football_conduct_list[ll]["id"]);
              }
            }
          }
        }
        let state_conduct = this.is_retainfooter(this.football_conduct_list)
        this.drawerer(this.football_conduct_list, 'conduct')
        this.calculate()
      }
      console.log(this.checkedzoushi)
      this.$refs.zssjkuang.style.display="none";
    },
    handleCheckAllChanger(val) {
      this.isIndeterminateer = false;
      if(this.checkedzoushi.length>0){
        this.checkedzoushi =[];
      }else{
        this.checkedzoushi=this.zoushidata;
      }

    },
    chancompany(com)
    {
      for(let i = 0;i < this.football_conduct_list.length;i++) {
        //换盘口
        this.$set(this.football_conduct_list[i].finger,"asia", {"A1":"","B1":"","C1":"","D1":0})
        this.$set(this.football_conduct_list[i].finger,"bs", {"B1":"","D1":0})

      }
      this.companys = com;
      if(com==2){
        this.comnow='BET365';
      }else if(com==3){
        this.comnow='皇冠';
      }else if(com == 4){
        this.comnow='10BET';
      }else if(com == 5){
        this.comnow='立博';
      }else if(com == 6){
        this.comnow='明陞';
      }else if(com == 7){
        this.comnow='澳彩';
      }else if(com == 8){
        this.comnow='SNAI';
      }else if(com == 9){
        this.comnow='威廉希尔';
      }else if(com == 10){
        this.comnow='易胜博';
      }else if(com == 11){
        this.comnow='韦德';
      }else if(com == 12){
        this.comnow='EuroBet';
      }else if(com == 13){
        this.comnow='Iwetten';
      }else if(com == 14){
        this.comnow='12bet';
      }else if(com == 15){
        this.comnow='利记';
      }else if(com == 16){
        this.comnow='盈禾';
      }else if(com == 17){
        this.comnow='18Bet';
      }else if(com == 18){
        this.comnow='Fun88';
      }else if(com == 19){
        this.comnow='竞彩官方';
      }else if(com == 21){
        this.comnow='188';
      }else if(com == 22){
        this.comnow='平博';
      }

      $("#" + com).addClass("companylistbg").siblings().removeClass("companylistbg")
      this.$refs.oddscomk.style.display='none';
    },
    changehotevent(event,chang)
    {

      this.is_hot = 20
      this.select_hot_id=event
      this.hoteventtool=event;
      this.select_event_id[0]=event;

      //正在赛事筛选
      var conduct_hot_result = [];
      for(let i=0;i<this.football_conduct_list_list.length;i++){
        var obj = this.football_conduct_list_list[i]
        var id = obj.events_id;
        var isExist = false;

        var aj =  this.select_hot_id;


        if(aj == id){
          isExist = true;

        }

        if(isExist){
          conduct_hot_result.push(obj);
        }

      }
      this.football_conduct_hot_list = conduct_hot_result
      //完场赛事筛选
      var end_hot_result = [];
      for(let i=0;i<this.football_end_list_list.length;i++){
        var obj = this.football_end_list_list[i]
        var id = obj.events_id;
        var isExist = false;
        var aj =  this.select_hot_id;
        // console.log(aj)
        if(aj == id){
          isExist = true;

        }
        if(isExist){
          end_hot_result.push(obj);
        }

      }
      this.football_end_hot_list = end_hot_result
      //未开始赛事筛选
      var not_hot_result = [];
      for(let i=0;i<this.football_not_list_list.length;i++){
        var obj = this.football_not_list_list[i]
        var id = obj.events_id;
        var isExist = false;
        var aj =  this.select_hot_id;
        console.log(aj)
        console.log(this.football_not_hot_list)
        if(aj == id){
          isExist = true;

        }
        if(isExist){
          not_hot_result.push(obj);
        }

      }
      this.football_not_hot_list = not_hot_result

      //未开始赛事筛选
      var unusual_hot_result = [];
      for(let i=0;i<this.football_unusual_list_list.length;i++){
        var obj = this.football_unusual_list_list[i]
        var id = obj.events_id;
        var isExist = false;
        var aj =  this.select_hot_id;
        // console.log(aj)
        if(aj == id){
          isExist = true;

        }
        if(isExist){
          unusual_hot_result.push(obj);
        }

      }
      this.football_unusual_hot_list = unusual_hot_result
      this.hidefootball = ((this.football_conduct_list_list.length +this.football_not_list_list.length+this.football_end_list_list.length +this.football_unusual_list_list.length) - (this.football_conduct_hot_list.length +this.football_not_hot_list.length+this.football_end_hot_list.length +this.football_unusual_hot_list.length))


    },
    hanlezoushidata(value){
      let checkedCount = value.length;
      this.checkAller = checkedCount === this.zoushidata.length;
      this.isIndeterminateer = checkedCount > 0 && checkedCount < this.zoushidata.length;
    },
    handleCheckotherChange(){//赛事反选
      var newarray=[];
      this.isdisabledFn = false
      for(var h=0;h<this.saishilstdata.length;h++){
        if(this.checkedCities.includes(this.saishilstdata[h].events_id)==false){
          newarray.push(this.saishilstdata[h].events_id);
        }

      }
      this.checkedCities=newarray;
      // console.log(this.checkedCities)
    },

    handleCheckotherChanger(){//反选
      var newarray=[];
      for(var h=0;h<this.zoushidata.length;h++){
        if(this.checkedzoushi.includes(this.zoushidata[h])==false){
          newarray.push(this.zoushidata[h]);
        }

      }
      this.checkedzoushi=newarray;
    },
    fivemain(){
      this.select_event_id=["82","108","129","120","142"];

      this.football()
      this.matchlstlogVisible  = false
    },
    firstmatches(){
      this.select_event_id=["1","7","9","10","11","12","13","14","17","18","19","22","23","24","25","26","27","28","29","30","31","32","34","35","36","2770","2998"];

      this.football()
      this.matchlstlogVisible  = false
    },
    //赛事选择
    handleCheckedCitiesChange(value) {
      console.log(value)
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.saishilstdata.length;    //全选和选中的条数
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.saishilstdata.length; //不全选
      // console.log(this.checkOrderList)

      this.checkOrderList = value; //选中的条数
    },
    async company(){
      let res = await getcompany()
      this.companylist = res.info
      // console.log(this.companylist)
    },
    //接口
    async football(){
      let data = {}
      let user = JSON.parse(window.localStorage.getItem("user"));
      if(user){
        data = {
          'uid' : this.user_id,
          "type" : 0,
          "time" : this.time,
          // "events_id":events_id,
          "pici":this.fenpijz
        }
      }else{
        data = {
          // 'uid' : this.user_id,
          "type" : 0,
          "time" : this.time,
          // "events_id":events_id,
          "pici":this.fenpijz
        }
      }

      this.is_load = 0
      let res = await Getfootball(data)
      // console.log(res)
      if((res.code == 0 || res.code == 200)){
        this.is_hot = 10
        this.is_load = 1
        this.click_event = false
        let record = res.info

        //赛事
        this.saishilstdata =  record.filter.all.length > 0 ? record.filter.all: []
        //正在进行
        this.football_conduct_list = record.conduct.length > 0 ? record.conduct : []
        //未开始
        this.football_not_list = record.not.length > 0 ? record.not : []
        //完场
        this.football_end_list  = record.end.length > 0 ? record.end : []
        //异常
        this.football_unusual_list = record.unusual.length > 0 ? record.unusual : []


        //正在进行
        this.football_conduct_hot_list = this.football_conduct_list_splice = this.football_conduct_list_list =  record.conduct.length > 0 ? record.conduct : []
        //未开始
        this.football_not_hot_list = this.football_not_list_splice = this.football_not_list_list = record.not.length > 0 ? record.not : []
        //完场
        this.football_end_hot_list = this.football_end_list_splice = this.football_end_list_list = record.end.length > 0 ? record.end : []
        //异常
        this.football_unusual_hot_list = this.football_unusual_list_splice = this.football_unusual_list_list = record.unusual.length > 0 ? record.unusual : []

        // if(this.football_conduct_list_splice.length > 0){
        //   this.football_conduct_list_splice.unshift({names:"正在进行中的比赛"})
        // }
        // if(this.football_not_list_splice.length > 0){
        //   this.football_not_list_splice.unshift({names:"未开始的比赛"})
        // }
        // if(this.football_end_list_splice.length > 0){
        //   this.football_end_list_splice.unshift({names:"已完成的比赛"})
        // }
        // if(this.football_unusual_list_splice.length > 0){
        //   this.football_unusual_list_splice.unshift({names:"异常的比赛"})
        // }
        this.football_all_list_splice = this.football_conduct_list_splice.concat(this.football_not_list_splice).concat(this.football_end_list_splice).concat(this.football_unusual_list_splice)


        // eventBus.$off(this.scrollEvent); // 关闭上一次的监听
        eventBus.$on('startes',function (startes){
          this.startes = startes
        });
        eventBus.$on('startes',function (end){
          this.end = end
        });
        let heightval =  this.football_all_list_splice.length * this.itemSize
        eventBus.$emit("heightval",heightval)
        //时间显示
        for(let i=0;i<this.football_conduct_list.length;i++){
          if(this.football_conduct_list[i].status > 3){
            let bstime = Math.floor(( this.dangqiantime() - this.football_conduct_list[i].opening_time)/60.0) + 46
            this.$set( this.football_conduct_list[i],"bstimes",bstime)
            if(bstime >90){
              this.$set(this.football_conduct_list[i],"bstimes","90+")
            }else if(60 > bstime && bstime >45){
              this.$set( this.football_conduct_list[i],"bstimes","中")
            }
            else{
              this.$set(this.football_conduct_list[i],"bstimes",bstime)
            }

          }else{
            let bstime = Math.floor(( this.dangqiantime() - this.football_conduct_list[i].opening_time)/60) + 1
            if(bstime >90){
              this.$set(this.football_conduct_list[i],"bstimes","90+")
            }else if(60 > bstime && bstime >45){
              this.$set( this.football_conduct_list[i],"bstimes","中")
            }
            else{
              this.$set(this.football_conduct_list[i],"bstimes",bstime)
            }
            // console.log(this.dangqiantime())
            // console.log(this.football_conduct_list[i].opening_time)
            // console.log(bstime)
          }
        }
        let that = this
        setInterval(function (){
          // console.log(that.football_conduct_list)
          for(let i=0;i<that.football_conduct_list.length;i++){
            if(that.football_conduct_list[i].status > 3){
              let bstime = Math.floor(( that.dangqiantime() - that.football_conduct_list[i].opening_time)/60.0) +46

              if(bstime >90){
                that.$set( that.football_conduct_list[i],"bstimes","90+")
              }else if(60 >bstime && bstime > 45){
                that.$set( that.football_conduct_list[i],"bstimes","中")
              }else{
                that.$set(that.football_conduct_list[i],"bstimes",bstime)
              }
            }else{
              let bstime = Math.floor(( that.dangqiantime() - that.football_conduct_list[i].opening_time)/60) + 1
              if(bstime >90){
                that.$set( that.football_conduct_list[i],"bstimes","90+")
              }else if(60 >bstime && bstime > 45){
                that.$set( that.football_conduct_list[i],"bstimes","中")
              }else{
                that.$set(that.football_conduct_list[i],"bstimes",bstime)
              }

              if(that.football_conduct_list[i].status == 1){
                that.$set(that.football_conduct_list[i],"status_text",bstime)
              }

            }
          }

        },6000)

        // this.football_hot_end_list = record.hot.end.length > 0 ? record.hot.end : []
        // this.football_hot_not_list = record.hot.not.length > 0 ? record.hot.not : []
        // this.football_hot_conduct_list = record.hot.conduct.length > 0 ? record.hot.conduct : []


        let retainEvnet = JSON.parse(window.localStorage.getItem("retainEvnet_foot_"+this.time));
        retainEvnet = retainEvnet ? retainEvnet:[]
        if(retainEvnet.length > 0){

          this.retainFootList(this.football_conduct_list,retainEvnet,'conduct')
          this.retainFootList(this.football_not_list,retainEvnet,'not')
          this.retainFootList(this.football_end_list,retainEvnet,'end')

          this.retainFootList(this.football_hot_conduct_list,retainEvnet,'hot_conduct')
          this.retainFootList(this.football_hot_not_list,retainEvnet,'hot_not')
          this.retainFootList(this.football_hot_end_list,retainEvnet,'hot_end')

          let state_conduct = this.is_retainfoot(this.football_conduct_list)
          let state_end = this.is_retainfoot(this.football_end_list)
          let state_not = this.is_retainfoot(this.football_not_list)
          // if(state_conduct && state_end && state_not){
          //     this.is_hot = 2
          // }
        }

        let total = parseInt(this.football_end_list.length + this.football_not_list.length + this.football_conduct_list.length)
        this.total = total

        let retain_num = parseInt(total - retainEvnet.length)
        this.retainfootball = retain_num

        let sticky_id = JSON.parse(window.localStorage.getItem("sticky_foot_"+this.time));
        sticky_id = sticky_id ? sticky_id:[]
        if(sticky_id.length > 0){
          this.filterSticky(this.football_conduct_list,sticky_id)
          this.filterSticky(this.football_not_list,sticky_id)
          this.filterSticky(this.football_end_list,sticky_id)
        }

        if(record.end.length == 0 && record.not.length == 0 && record.conduct.length == 0){
          this.is_hot = 2
        }

        if(this.search_events == false){
          this.filter = res.info.filter
          this.format_event(this.type)
        }
      }
    },
    showeventer(){

      if(this.saishilstdata.length==0){
        this.selectsaishi()
      }
      this.isshowmengban = true
      // for(var h=0;h<this.saishilstdata.length;h++){
      //     this.checkedCities[h]=this.saishilstdata[h].id;
      // }
      if(this.$refs.sskuanger.style.display == "none"){

        this.$refs.sskuanger.style.display = "inline";
        var xzssann=document.getElementById("sskuangan");

        this.$refs.sskuanger.style.left=xzssann.offsetLeft+'px';
      }else{
        this.$refs.sskuanger.style.display = "none";
      }
      this.$refs.sskuanger.style.display="inline";
      this.$refs.zssjkuang.style.display="none";
      this.$refs.oddscomk.style.display="none";
    },
    closetisshi()
    {
      this.$refs.kejinqiutishikuang.style.display = "none";
      this.$refs.jinqiutishikuang.style.display = "none";
    },
    zhuduiclosetisshi(index){
      this.zhuduijinqiulist.splice(index,1)

    },
    keduiclosetisshi(index){
      this.keduijinqiulist.splice(index,1)
    },
    //日历
    brush_time(index){
      let date = ''
      this.select_date.forEach((val,key) => {
        if(key == index){
          this.select_date[index].active = true;
          if(val.time == "今天"){
            let format = this.format_date(0)
            date =format.now

          }else{
            var datedata = new Date();
            var year=   datedata.getFullYear(); //获取完整的年份(4位)
            date = year+"-"+val.time

          }
        }else{
          this.select_date[key].active = false;
        }
      })
      for(let i=0;i<this.classify.length;i++){
        if(this.classify[i].active){
          this.type = this.classify[i].type
          console.log(this.type)
        }
      }

      this.time = date
      this.select_event_id = []

      this.football()
    },
    //收藏
    async getfollowes(){
      let data = {}
      let user = JSON.parse(window.localStorage.getItem("user"));
      if(user){
        data = {
          'uid' : this.user_id,
        }
      }

      let res = await FollowFootballList(data)
      if((res.code == 0 || res.code == 200)){
        this.is_load = 2
        this.is_hot = 30
        this.click_event = false
        let recordes = res.info
        let endnub = 0
        let notnub = 0
        let conductnub = 0
        let unusualnub = 0

        if(res.info.end){
          endnub = recordes.end.length
        }

        //未开始
        if(res.info.not){
          notnub = recordes.not.length
        }

        //正在进行
        if(res.info.conduct){
          conductnub = recordes.conduct.length
        }
        //异常
        if(res.info.unusual){
          unusualnub = recordes.unusual.length
        }
        this.shoucangnub = (endnub + notnub + conductnub + unusualnub)
      }

    },
    //收藏
    async getfollow(){
      let data = {
        'uid' : this.user_id,
      }
      this.is_load = 0

      let res = await FollowFootballList(data)
      if((res.code == 0 || res.code == 200)){
        this.is_load = 1
        this.is_hot = 10
        this.click_event = false
        let recordes = res.info
        this.football_end_list = []
        this.football_not_list = []
        this.football_conduct_list = []
        this.football_unusual_list = []
        let endnub = 0
        let notnub = 0
        let conductnub = 0
        let unusualnub = 0

        //完场
        if(res.info.end){
          endnub = recordes.end.length
          this.football_end_list = recordes.end.length > 0 ? recordes.end : []
        }

        //未开始
        if(res.info.not){
          notnub = recordes.not.length
          this.football_not_list = recordes.not.length > 0 ? recordes.not : []
        }

        //正在进行
        if(res.info.conduct){
          conductnub = recordes.conduct.length
          this.football_conduct_list = recordes.conduct.length > 0 ? recordes.conduct : []

        }
        //异常
        if(res.info.unusual){
          unusualnub = recordes.unusual.length
          this.football_unusual_list = recordes.unusual.length > 0 ? recordes.unusual : []
        }

        this.shoucangnub = (endnub + notnub + conductnub + unusualnub)

      }

    },
    async follow(data){

      let football = data.foot
      let footballes = []
      footballes.push(football)
      // console.log(footballes[0])
      let index = data.index
      let type = football.type
      if(!this.user){
        this.$parent.showLogin = true
      }else{
        if(football.collect == 0){
          let data = {
            "event" : JSON.stringify(footballes),
            "uid" :this.user_id
          }

          let res = await FollowFootball(data)
          if(res.code == 0 && res.code !== null && res.code !== undefined){
            football.collect = 1;
            if(type == "not"){
              this.$set(this.football_not_list,index,football)
            }

            if(type == "conduct"){
              this.$set(this.football_conduct_list,index,football)
            }
            var gzxing=document.getElementById("gzxing"+index);
            gzxing.src='http://img.lailiao8l.com/img/img/yidu/shoucangzhiding.png';
            this.follownum+=1;
            this.$message({
              message: res.msg,
              type: "success"
            })
          }else{
            this.$message({
              message: '网络异常',
              type: "warning",
            });
          }
        }else{
          let data = {
            "id" : football.id,
            "uid" : this.user_id
          }
          // console.log(football.id)
          let res = await CancelFollowFootball(data)
          if(res.code == 0 && res.code !== null && res.code !== undefined){
            football.collect = 0;
            if(this.type == 1){
              this.$set(this.football_not_list,index,football)
            }

            if(this.type == 2){
              this.$set(this.football_conduct_list,index,football)
            }
            var gzxing=document.getElementById("gzxing"+index);
            gzxing.src='https://soket.daoyunxiang.com/icon/xing.png';
            this.follownum+=-1;
            this.$message({
              message: res.msg,
              type: "success"
            })
          }else{
            this.$message({
              message: '网络异常',
              type: "warning",
            });
          }
        }
      }
    },

    CancelEvent(events){
      let data = []
      this.click_event = true
      this.selected_event.forEach((val,i) => {
        if(val.events_id != events.events_id){
          data.unshift(val)
        }
      })

      this.selected_event = data
      let data_event = this.event
      data_event.forEach((val,i) => {
        val.event.forEach((v,k) => {
          if(v.events_id == events.events_id){
            val.event[k].check = false
            this.$set(this.event, i,val)  //i索引或者key(不确定)
          }
        })
      })

      this.select_event_id = []
      if(this.selected_event.length > 0 && this.selected_event.length !== null){
        this.selected_event.forEach((val,i) => {
          if(val.check == true){
            this.select_event_id.push(val.events_id)
          }
        })
      }
    },

    CloseSelectEvent(){ //赛事确定
      this.$refs.sskuanger.style.display = "none"; //赛事窗口
      this.drawer = false
      this.search_events = true
      this.is_event = false
      this.select_event_id=this.checkedCities; //选中的赛事id
      // console.log( this.select_event_id)
      this.is_hot =30


      //正在赛事筛选
      var conduct_result = [];
      for(let i=0;i<this.football_conduct_list_list.length;i++){
        var obj = this.football_conduct_list_list[i]
        var id = obj.events_id;
        var isExist = false;
        // console.log(this.checkedCities)
        // console.log(this.checkedCities.length)
        for(let j = 0; j < this.checkedCities.length; j++){
          // console.log(111)
          var aj = this.checkedCities[j];

          if(aj == id){
            isExist = true;

            break;
          }
        }
        if(isExist){
          conduct_result.push(obj);
        }

      }
      this.football_conduct_list = conduct_result
      //完场赛事筛选
      var end_result = [];
      for(let i=0;i<this.football_end_list_list.length;i++){
        var obj = this.football_end_list_list[i]
        var id = obj.events_id;
        var isExist = false;
        for(var j = 0; j < this.checkedCities.length; j++){
          var aj = this.checkedCities[j];
          // console.log(aj)
          if(aj == id){
            isExist = true;
            break;
          }
        }
        if(isExist){
          end_result.push(obj);
        }

      }
      this.football_end_list = end_result
      //未开始赛事筛选
      var not_result = [];
      for(let i=0;i<this.football_not_list_list.length;i++){
        var obj = this.football_not_list_list[i]
        var id = obj.events_id;
        var isExist = false;
        for(var j = 0; j < this.checkedCities.length; j++){
          var aj = this.checkedCities[j];
          // console.log(aj)
          if(aj == id){
            isExist = true;
            break;
          }
        }
        if(isExist){
          not_result.push(obj);
        }

      }
      this.football_not_list = not_result

      //未开始赛事筛选
      var unusual_result = [];
      for(let i=0;i<this.football_unusual_list_list.length;i++){
        var obj = this.football_unusual_list_list[i]
        var id = obj.events_id;
        var isExist = false;
        for(var j = 0; j < this.checkedCities.length; j++){
          var aj = this.checkedCities[j];
          // console.log(aj)
          if(aj == id){
            isExist = true;
            break;
          }
        }
        if(isExist){
          unusual_result.push(obj);
        }

      }
      this.football_unusual_list = unusual_result
      console.log(this.football_conduct_list.length+"--" +this.football_end_list.length+"--"+this.football_not_list.length+"--" +this.football_unusual_list.length)
      this.hidefootball =((this.football_conduct_list_list.length + this.football_end_list_list.length + this.football_not_list_list.length + this.football_unusual_list_list.length)- (this.football_conduct_list.length + this.football_end_list.length + this.football_not_list.length + this.football_unusual_list.length))
      console.log(this.hidefootball)
    },
    CloseSelectEventer(){
      this.$refs.sskuanger.style.display = "none";
    },
    select_event(){
      this.is_event = 1
      this.drawer = true
    },
    //即时 赛程 赛果 按钮
    select_type(val, i){
      var date = new Date();
      let upper = 10
      var year=   date.getFullYear(); //获取完整的年份(4位)
      let month = date.getMonth()+1;
      if(month < 10){
        month = "0"+ month;
      }
      let Day = date.getDate()
      if(Day < upper){
        Day = "0" + date.getDate()
      }
      var datadata = year +"-"+month + "-"+Day

      if(val.name == "即时"){
        this.fixedtoolxianshi = true
        this.rilixianshi = false;
      }else if(val.name == "收藏"){
        this.rilixianshi = false;
        this.fixedtoolxianshi = false
      }else {
        this.fixedtoolxianshi = false
        this.rilixianshi = true;
      }

      this.select_event_id = []
      this.selected_event = []
      this.select_date = []
      this.classify.forEach((item, index) => {
        if (i == index) {
          item.active = true;
          this.type = item.type
        } else {
          item.active = false;
        }
      });

      this.is_event = 0
      if(this.type == 3 || this.type == 0){
        let active = false
        for(let i = 0; i <= 6; i++){
          //赛果
          if(this.type == 3){
            let date = this.format_date(i,"reduce")
            active = i == 0 ? true : false;
            if(date.time=="今天" && date.now == this.time){
              active = true
            }
            this.time = datadata
            if(i==0){
              this.select_date.unshift({"time":date.time,"week":date.week,"active":active})
            }
            else {
              var timer = date.time.slice(5,10)
              this.select_date.unshift({"time":timer,"week":date.week,"active":active})
            }
          }
          //即时
          if(this.type == 0){
            let date = this.format_date(i,"add")
            active = date.time == this.time ? true : false;
            if(date.time=="今天"){
              active = true
            }
            let format = this.format_date(0)
            this.time = datadata
            this.select_date.push({"time":date.time,"week":date.week,"active":active})
            this.is_hot =30
            this.screenHeight = 788;

          }
        }
        this.football()
      }
      //赛程
      if(this.type == 1){
        let format = this.format_date(0)
        this.time = datadata
        let active = false
        for(let i = 0; i <= 6; i++){
          active = i == 0 ? true : false;
          let date = this.format_date(i,'add')
          if(date.time=="今天" && date.now == this.time){
            active = true
          }
          if(i==0){
            let week = {
              "time":date.time,
              "week":date.week,
              'active':i == 0 ? true : false
            }
            this.select_date.push(week)
          }else {
            var timer = date.time.slice(5,10)
            let week = {
              "time":timer,
              "week":date.week,
              'active':i == 0 ? true : false
            }
            this.select_date.push(week)
          }
        }
        this.football()
      }
      //收藏
      if(this.type == 5){
        this.getfollow()
      }
    },
    checked_event(event,index,key){
      let list = event
      this.click_event = true
      if(list.event[key].check == false){
        list.event[key].check = true
        this.selected_event_list(list.event[key])
      }else{
        list.event[key].check = false
        this.selected_event_list(list.event[key])
      }
      let data = list
      this.$set(this.event, index,data)
    },

    format_date(day,type){
      let upper = 10
      let date = new Date();

      let month = date.getMonth()+1;
      if(month < 10){
        month = "0"+ month;
      }

      let Day = date.getDate()
      if(Day < upper){
        Day = "0" + date.getDate()
      }
      let now_time = date.getFullYear()+"-"+month+"-"+Day;
      let now_week = date.getDay()
      if(day == 0){
        return {"time":'今天',"week":this.week[now_week],"now":now_time};
      }

      let time = new Date(date);
      if(type == "add"){
        time.setDate(date.getDate()+day);
      }else{
        time.setDate(date.getDate()-day);
      }

      let week = time.getDay()
      let format_month = (time.getMonth()+1)
      if(format_month < upper){
        format_month = "0" + format_month
      }

      let format_day = time.getDate()
      if(format_day < upper){
        format_day = "0" + format_day
      }
      let format = time.getFullYear()+"-"+format_month+"-"+format_day;
      return {"time":format,"week":this.week[week]};
    },
    showallhot()
    {
      if(this.heightlongs == 0){
        this.heightlongs = 1
        this.kaiorhe=2;
      }else if( this.heightlongs == 1){
        this.heightlongs = 0
        this.kaiorhe=1;
      }
    },
    selected_event_list(event){
      let data = []
      if(event.check){
        this.selected_event.unshift(event)
      }else{
        this.selected_event.forEach((item, index) => {
          if(item.check == true){
            data.push(item)
          }
        });
        this.selected_event = data
      }

      this.select_event_id = []
      if(this.selected_event.length > 0 && this.selected_event.length !== null){
        this.selected_event.forEach((val,i) => {
          if(val.check == true){
            this.select_event_id.push(val.events_id)
          }
        })
      }
    },

    format_event(type){
      let data = []
      this.event = []
      switch(this.type){
        case 0:
          data = this.filter.all
          break;
        case 1:
          data = this.filter.not
          break;
        case 2:
          data = this.filter.conduct
          break;
        case 3:
          data = this.filter.end
          break;
      }

      if(data.length > 0 && data.length !== null){
        let letter  = []
        data.forEach((val, key) => {
          letter.push(val.letter)
        });

        letter = Array.from(new Set(letter))
        this.letter = letter
        if(letter.length > 0 && letter.length !== null){
          letter.forEach((val, key) => {
            let list = this.filter_event(data,val)
            this.event.push({"letter":val,'event':list})
          });
        }
      }
    },

    filter_event(data,letter){
      let list = []
      data.forEach((val, key) => {
        if(val.letter == letter){
          val.check = false
          list.push(val)
        }
      });

      return list;
    },

    linkSocket(){
      this.websock = new WebSocket(config.SOCKET)
      this.websock.onopen = this.onOpen
      this.websock.onmessage = this.onMessage;
    },

    onOpen(e){
      console.log("连接成功")
    },
    selectzs()
    {
      if(this.$refs.zssjkuang.style.display=='none'){
        this.$refs.zssjkuang.style.display="inline";
      }else{
        this.$refs.zssjkuang.style.display="none";
      }
      this.isshowmengban = true
      var zssjann=document.getElementById("xzzsan");
      this.$refs.zssjkuang.style.left=zssjann.offsetLeft+'px';
      this.$refs.sskuanger.style.display="none";
      this.$refs.zssjkuang.style.display="inline";
      this.$refs.oddscomk.style.display="none";

    },
    onMessage(res){
      let format = this.format_date(0)
      if(format.now != this.time){
        return
      }
      let data = res.data
      if(data){
        let record = JSON.parse(res.data)
        if(record.type == 'football'){
          let foot = JSON.parse(record.data)
          if(foot.conduct.length > 0 && foot.conduct.length !== null){
            if(this.football_conduct_list.length > 0 && this.football_conduct_list.length !== null){
              this.updateFoot(this.football_conduct_list,foot.conduct,0,'conduct')
            }

            if(this.football_hot_conduct_list.length > 0 ){
              this.updateFoot(this.football_hot_conduct_list,foot.conduct,1,'conduct')
            }

            let not = this.football_not_list
            if(not.length > 0 && not.length !== null){
              not.forEach((v,i) => {
                let event = findEvent(foot.conduct,v.id)
                if(typeof(event.id) != 'undefined'){
                  not.splice(i, 1)
                }
              })
            }

            let not_hot = this.football_hot_not_list
            if(not_hot.length > 0 && not_hot.length !== null){
              not_hot.forEach((v,i) =>{
                let event = findEvent(foot.conduct,v.id)
                if(typeof(event.id) != 'undefined'){
                  not_hot.splice(i, 1)
                }
              })
            }
          }

          if(foot.not.length > 0 &&  foot.not.length !== null){
            if(this.football_not_list.length > 0 && this.football_not_list.length !== null){
              this.updateFoot(this.football_not_list,foot.not,0,'not')
            }

            if(this.football_hot_not_list.length > 0 && this.football_hot_not_list.length !== null){
              this.updateFoot(this.football_hot_not_list,foot.not,1,'not')
            }
          }

          if(foot.end.length > 0 && foot.end.length !== null){
            if(this.football_end_list.length > 0 &&　this.football_end_list.length　!== null){
              this.updateFoot(this.football_end_list,foot.end,0,'end')
            }

            if(this.football_hot_end_list.length > 0){
              this.updateFoot(this.football_hot_end_list,foot.end,1,'end')
            }

            let conduct = this.football_conduct_list
            if(conduct.length > 0){
              conduct.forEach((v,i) => {
                let event = findEvent(foot.end,v.id)
                if(typeof(event.id) != 'undefined'){
                  conduct.splice(i, 1)
                }
              })
            }

            let conduct_hot = this.football_hot_conduct_list
            if(conduct_hot.length > 0){
              conduct_hot.forEach((v,i) =>{
                let event = findEvent(foot.end,v.id)
                if(typeof(event.id) != 'undefined'){
                  conduct_hot.splice(i, 1)
                }
              })
            }
          }
        }
      }
    },

    updateFoot(data,ball,is_hot,type){
      data.forEach((v,i) => {
        let event = this.findEvent(ball,v.id)
        if(typeof(event.id) != 'undefined'){

          v.main_extra = event.main_extra
          v.main_fraction = event.main_fraction
          v.main_half_fraction = event.main_half_fraction
          v.main_kick = event.main_kick
          v.main_penalty = event.main_penalty

          v.deputy_extra = event.deputy_extra
          v.deputy_fraction = event.deputy_fraction
          v.deputy_half_fraction = event.deputy_half_fraction
          v.deputy_kick = event.deputy_kick
          v.deputy_penalty = event.deputy_penalty
          v.status = event.status
          v.status_text = event.status_text

          if(type == 'conduct'){
            if(is_hot == 0){
              this.$set(this.football_conduct_list, i,v)
            }else{
              this.$set(this.football_hot_conduct_list, i,v)
            }
          }

          if(type == 'not'){
            if(is_hot == 0){
              this.$set(this.football_not_list, i,v)
            }else{
              this.$set(this.football_hot_not_list, i,v)
            }
          }

          if(type == 'end'){
            if(is_hot == 0){
              this.$set(this.football_end_list, i,v)
            }else{
              this.$set(this.football_hot_end_list, i,v)
            }
          }
        }
      })
    },

    findEvent(data,id){
      let record = {}
      data.forEach((v,i) => {
        if(v.id == id){
          record = v
        }
      })

      return record;
    },

    checked_All(){
      if(this.typees == 1 ){
        this.typees = 2

      }else if(this.typees == 2){
        this.typees = 1

      }

      if(this.type != 4){
        if(this.checkAll){
          this.changeState(this.football_conduct_list,0)
          this.changeState(this.football_end_list,0)
          this.changeState(this.football_not_list,0)
          this.checkAll = false
        }else{
          this.changeState(this.football_conduct_list,1)
          this.changeState(this.football_end_list,1)
          this.changeState(this.football_not_list,1)
          this.checkAll = true
        }
      }else{
        if(this.checkAll){
          this.changeState(this.football_hot_conduct_list,0)
          this.changeState(this.football_hot_end_list,0)
          this.changeState(this.football_hot_not_list,0)
          this.checkAll = false
        }else{
          this.changeState(this.football_hot_conduct_list,1)
          this.changeState(this.football_hot_end_list,1)
          this.changeState(this.football_hot_not_list,1)
          this.checkAll = true
        }
      }
    },

    changeState(data,type){
      data.forEach((val,i) =>{
        if(type){
          data[i].check = true
        }else{
          data[i].check = false
        }
      })
    },

    retainfoot(){
      if(this.type != 4){
        let state_conduct = this.is_retainfoot(this.football_conduct_list)
        let state_end = this.is_retainfoot(this.football_end_list)
        let state_not = this.is_retainfoot(this.football_not_list)
        if(!state_conduct && !state_end && !state_not){
          this.$message({
            message: '请选择要保留的赛事',
            type: "warning",
          });

          return
        }

        this.draw(this.football_conduct_list,'conduct','retain')
        this.draw(this.football_end_list,'end','retain')
        this.draw(this.football_not_list,'not','retain')

        this.calculate()
      }else{
        let state_conduct = this.is_retainfoot(this.football_hot_conduct_list)
        let state_end = this.is_retainfoot(this.football_hot_end_list)
        let state_not = this.is_retainfoot(this.football_hot_not_list)
        if(!state_conduct && !state_end && !state_not){
          this.$message({
            message: '请选择要保留的赛事',
            type: "warning",
          });

          return
        }

        this.draw(this.football_hot_conduct_list,'hot_conduct','retain')
        this.draw(this.football_hot_end_list,'hot_end','retain')
        this.draw(this.football_hot_not_list,'hot_not','retain')

        this.calculate()
      }
    },
    changebtna(type)
    {
      if(type==1){
        this.$refs.jinxingz.src="https://soket.daoyunxiang.com/rightbtn7.png";
      }else{
        this.$refs.jinxingz.src="https://soket.daoyunxiang.com/rightbtn8.png";
      }
    },
    changebtnb(type)
    {
      if(type==1){
        this.$refs.wanchangl.src="https://soket.daoyunxiang.com/rightbtn1.png";
      }else{
        this.$refs.wanchangl.src="https://soket.daoyunxiang.com/rightbtn2.png";
      }
    },

    changebtnc(type)
    {
      if(type==1){
        this.$refs.weikais.src="https://soket.daoyunxiang.com/rightbtn3.png";
      }else{
        this.$refs.weikais.src="https://soket.daoyunxiang.com/rightbtn4.png";
      }
    },

    changebtnd(type)
    {
      if(type==1){
        this.$refs.yichangya.src="https://soket.daoyunxiang.com/rightbtn5.png";
      }else{
        this.$refs.yichangya.src="https://soket.daoyunxiang.com/rightbtn6.png";
      }
    },
    hidefoot(){
      if(this.type != 4){
        let state_conduct = this.is_retainfoot(this.football_conduct_list)
        let state_end = this.is_retainfoot(this.football_end_list)
        let state_not = this.is_retainfoot(this.football_not_list)
        if(!state_conduct && !state_end && !state_not){
          this.$message({
            message: '请选择要隐藏的赛事',
            type: "warning",
          });

          return
        }

        if(state_conduct && state_end && state_not){

        }

        this.draw(this.football_conduct_list,'conduct')
        this.draw(this.football_end_list,'end')
        this.draw(this.football_not_list,'not')

        this.calculate()
      }else{
        let state_conduct = this.is_retainfoot(this.football_hot_conduct_list)
        let state_end = this.is_retainfoot(this.football_hot_end_list)
        let state_not = this.is_retainfoot(this.football_hot_not_list)
        if(!state_conduct && !state_end && !state_not){
          this.$message({
            message: '请选择要隐藏的赛事',
            type: "warning",
          });

          return
        }

        this.draw(this.football_hot_conduct_list,'hot_conduct','hide')
        this.draw(this.football_hot_end_list,'hot_end','hide')
        this.draw(this.football_hot_not_list,'hot_not','hide')

        this.calculate()
      }

    },
    matchselectys(type)
    {
      if(type==1){
        this.saishifocus=1;
      }else{
        this.saishifocus=0;
      }
    },

    oddsselectys(type){
      if(type==1){
        this.zoushifocus=1;
      }else{
        this.zoushifocus=0;
      }
    },

    comselectys(type){
      this.isshowmengban =true
      if(type==1){
        this.compafocus=1;
      }else{
        this.compafocus=0;
      }
    },
    //全部隐藏多少场
    showfoot(){
      // if(this.hoteventtool!=0){
      //     this.hidefootball = []
      //     this.hoteventtool=0;
      //     this.select_event_id=[];
      //     // this.football()
      //
      //     return
      // }
      // window.localStorage.removeItem("retainEvnet_foot_"+this.time);
      // if(this.hidefootball.length>50){
      //     this.hidefootball = []
      //     this.title.conduct = 1
      //     this.title.end = 1
      //     this.title.not = 8
      //     this.title.hot_not = 8
      //     this.title.hot_end = 1
      //     this.title.hot_conduct = 1
      //     // this.football()
      // }
      this.hidefootball = []
      // this.retainfootball = this.total

      this.football()

      // this.showFootList(this.football_conduct_list)
      // this.showFootList(this.football_not_list)
      // this.showFootList(this.football_end_list)
      // this.showFootList(this.football_hot_conduct_list)
      // this.showFootList(this.football_hot_end_list)
      // this.showFootList(this.football_hot_not_list)

    },

    showFootList(data){
      if(data.length > 0){
        data.forEach((v,i) => {
          if(!v.is_retain){
            data[i].is_retain = 1
            data[i].check = false
          }
        })
      }
    },

    calculate(){
      let hidefoot =  JSON.parse(localStorage.getItem("retainEvnet_foot_"+this.time));
      hidefoot = hidefoot ? hidefoot :[]
      if(hidefoot.length > 0){
        this.hidefootball = hidefoot.filter(function(value,index,self){
          return self.indexOf(value) ===index;
        });
        this.retainfootball = parseInt(this.total - this.hidefootball.length)
        if(this.retainfootball == 0){
          this.is_hot = 2
        }
      }
    },

    draw(data,type,sign){
      let state = false
      data.forEach((val,i) =>{
        if(sign == 'retain'){
          if(val.check){
            state = true
          }else{
            data[i].is_retain = 0
            this.retainEvnet.push(val.id)
          }
        }else{
          if(val.check){
            data[i].is_retain = 0
            this.retainEvnet.push(val.id)
          }else{
            state = true
          }
        }
      })

      window.localStorage.setItem("retainEvnet_foot_"+this.time, JSON.stringify(this.retainEvnet));
      if(!state){
        switch(type){
          case 'conduct':
            this.title.conduct = 0
            break
          case 'end':
            this.title.end = 0
            break
          case 'not':
            this.title.not = 8
            break
          case 'hot_not':
            this.title.hot_not = 8
            break
          case 'hot_end':
            this.title.hot_end = 0
            break
          case 'hot_conduct':
            this.title.hot_conduct = 0
            break
        }
      }
    },

    drawerer(data,type,sign)
    {
      let state = false
      data.forEach((val, i) => {

        if (this.hidefootball.includes(val.id)) {
          data[i].is_retain = 0
          this.retainEvnet.push(val.id)
        } else {
          state = true
        }

      })

      window.localStorage.setItem("retainEvnet_foot_"+this.time, JSON.stringify(this.retainEvnet));
    },
    hidezoushikuang()
    {
      this.$refs.zssjkuang.style.display="none";
    },
    is_retainfoot(data){
      if(data.length==0){
        return false
      }
      let state = false
      data.forEach((val,i) =>{
        if(val.check){
          state = true
        }
      })
      // console.log(state)
      return state;
    },


    is_retainfooter(data){

      let state = false
      data.forEach((val,i) =>{
        if(this.hidefootball.includes(val.id)){
          state = true
        }
      })

      return state;
    },

    retainFootList(data,Evnetid,mark){
      if(data.length > 0){
        let list = []
        switch(mark){
          case 'conduct':
            list = this.football_conduct_list
            break
          case 'end':
            list = this.football_end_list
            break
          case 'not':
            list = this.football_not_list
            break
          case 'hot_conduct':
            list = this.football_hot_conduct_list
            break
          case 'hot_end':
            list = this.football_hot_end_list
            break
          case 'hot_not':
            list = this.football_hot_not_list
            break
        }
        let status = false
        data.forEach((val,i) =>{
          let state = this.checkfoot(val,Evnetid)
          if(state){
            list[i].is_retain = 0
          }else{
            status = true
          }
        })

        if(!status){
          switch(mark){
            case 'conduct':
              this.title.conduct = 0
              break
            case 'end':
              this.title.end = 0
              break
            case 'not':
              this.title.not = 8
              break
            case 'hot_conduct':
              this.title.hot_conduct = 0
              break
            case 'hot_end':
              this.title.hot_end = 0
              break
            case 'hot_not':
              this.title.hot_not = 8
              break
          }
        }
      }
    },

    followfoot(){

      // if(this.type != 4){
      //     let state_conduct = this.is_retainfoot(this.football_conduct_list)
      //     let state_not = this.is_retainfoot(this.football_not_list)
      //     if(!state_conduct && !state_not){
      //         this.$message({
      //             message: '请选择要关注的赛事',
      //             type: "warning",
      //         });
      //         console.log(11111)
      //         return
      //     }
      //
      //     let football = []
      //     let conduct = this.followEventlist(this.football_conduct_list,'conduct')
      //     if(conduct){
      //         conduct.forEach((v,i) =>{
      //             football.push(v)
      //         })
      //     }
      //
      //     let not = this.followEventlist(this.football_not_list,'not')
      //     if(not){
      //         not.forEach((v,i) =>{
      //             football.push(v)
      //         })
      //     }
      //
      //     if(football.length > 0){
      //         let data = []
      //         let foot_id = []
      //         football.forEach((v,i) =>{
      //             if(i < 20){
      //                 data.push(v)
      //                 foot_id.push(v.id)
      //             }
      //         })
      //
      //         this.batchfollowfoot(data,foot_id,0)
      //     }
      // }else{
      //     let state_conduct = this.is_retainfoot(this.football_hot_conduct_list)
      //     let state_not = this.is_retainfoot(this.football_hot_not_list)
      //     if(!state_conduct && !state_not){
      //         this.$message({
      //             message: '请选择要关注的赛事',
      //             type: "warning",
      //         });
      //       console.log(12222222222222)
      //         return
      //     }
      //
      //     let football = []
      //     let hot_conduct = this.followEventlist(this.football_hot_conduct_list,'hot_conduct')
      //     if(hot_conduct){
      //         hot_conduct.forEach((v,i) =>{
      //             football.push(v)
      //         })
      //     }
      //
      //     let hot_not = this.followEventlist(this.football_hot_not_list,'hot_not')
      //     if(hot_not){
      //         hot_not.forEach((v,i) =>{
      //             football.push(v)
      //         })
      //     }
      //
      //     if(football.length > 0){
      //         let data = []
      //         let foot_id = []
      //         football.forEach((v,i) =>{
      //             if(i < 20){
      //                 data.push(v)
      //                 foot_id.push(v.id)
      //             }
      //         })
      //
      //         this.batchfollowfoot(data,foot_id,1)
      //     }
      // }
    },

    followEventlist(data,sign){
      if(!this.user){
        this.$parent.showLogin = true
        return
      }

      let foot = []
      data.forEach((val,i) =>{
        if(val.check && val.collect == 0){
          foot.push(val)
        }
      })

      return foot;
    },

    async batchfollowfoot(foot,foot_id,is_hot){
      let data = {
        "event" : JSON.stringify(foot),
        "uid" : this.user_id
      }
      let res = await FollowFootball(data)
      if(res.code == 0 && res.code !== null && res.code !== undefined){
        if(is_hot == 0){
          this.football_conduct_list.forEach((v,i) =>{
            let status = this.checkfoot(v,foot_id)
            if(status){
              this.football_conduct_list[i].collect = 1
            }
          })

          this.football_not_list.forEach((v,i) =>{
            let status = this.checkfoot(v,foot_id)
            if(status){
              this.football_not_list[i].collect = 1
            }
          })
        }else{
          this.football_hot_conduct_list.forEach((v,i) =>{
            let status = this.checkfoot(v,foot_id)
            if(status){
              this.football_hot_conduct_list[i].collect = 1
            }
          })

          this.football_hot_not_list.forEach((v,i) =>{
            let status = this.checkfoot(v,foot_id)
            if(status){
              this.football_hot_not_list[i].collect = 1
            }
          })
        }

        setTimeout(() => {
          this.$message({
            message: res.msg,
            type: "success",
          });
        }, 1000);
      }
    },
    //置顶
    footSticky(foot){

      let football = foot.foot
      let type = football.type
      let index = foot.index
      let sticky = this.football_sticky_list
      let sticky_id = JSON.parse(window.localStorage.getItem("sticky_foot_"+this.time));
      sticky_id = sticky_id ? sticky_id : []

      if(sticky_id.length > 0){
        sticky_id = sticky_id.filter(function(value,index,self){
          return self.indexOf(value) ===index;
        });
      }

      if(sticky.length > 0){
        let state = true
        sticky.forEach((v,i) => {
          if(v.id != football.id){
            state = false
          }
        })

        if(!state){
          sticky.push(football)
          sticky_id.push(football.id)
          this.StickyUpdateFoot(football,index,type)
          if(type == "conduct"){
            this.football_conduct_list.splice(index, 1)
          }
          if(type == "not"){
            this.football_not_list.splice(index, 1)
          }
          if(type == "end"){
            this.football_end_list.splice(index, 1)
          }
          if(type == "unusual"){
            this.football_unusual_list.splice(index, 1)
          }

        }
        window.localStorage.setItem("sticky_foot_"+this.time,JSON.stringify(sticky_id))
      }else{
        this.StickyUpdateFoot(football,index,type)
        if(type == "conduct"){
          this.football_conduct_list.splice(index, 1)
        }
        if(type == "not"){
          this.football_not_list.splice(index, 1)
        }
        if(type == "end"){
          this.football_end_list.splice(index, 1)
        }
        if(type == "unusual"){
          this.football_unusual_list.splice(index, 1)
        }
        sticky.push(football)
        window.localStorage.setItem("sticky_foot_"+this.time,JSON.stringify(sticky_id))
      }
    },
    //置顶  回归置顶
    CancelfootSticky(foot){

      let football = foot.foot
      let type = football.type
      let index = foot.index
      let list =[]
      let sticky = this.football_sticky_list
      //  console.log(football)

      switch(type){
        case 'conduct':
          list = this.football_conduct_list
          this.football_conduct_list.push(football)
          sticky.splice(index, 1)
          break
        case 'end':
          list = this.football_end_list
          this.football_end_list.push(football)
          sticky.splice(index, 1)
          break
        case 'not':
          list = this.football_not_list
          this.football_not_list.push(football)
          sticky.splice(index, 1)
          break
        case 'unusual':
          list = this.football_unusual_list
          this.football_unusual_list.push(football)
          sticky.splice(index, 1)
          break
          // case 'hot_end':
          //     list = this.football_hot_end_list
          //     break
          // case 'hot_not':
          //     list = this.football_hot_not_list
          //     break
      }

      if(list.length > 0){
        list.forEach((val,i) => {
          if(val.id == football.id){
            list[i].is_sticky = 0
            this.football_sticky_list.splice(index, 1)
          }
        })
      }
      let sticky_id = JSON.parse(window.localStorage.getItem("sticky_foot_"+this.time));
      sticky_id = sticky_id ? sticky_id : []

      if(sticky_id.length > 0){
        sticky_id.forEach((val,i) => {
          if(val == football.id){
            sticky_id.splice(index, 1)
          }
        })

        window.localStorage.setItem("sticky_foot_"+this.time,JSON.stringify(sticky_id))

      }
    },

    StickyUpdateFoot(foot,index,type){
      switch(foot.type){
        case 'conduct':
          this.football_conduct_list[index].is_sticky = 1
          break;
        case 'not':
          this.football_not_list[index].is_sticky = 1
          break;
        case 'end':
          this.football_end_list[index].is_sticky = 1
          break;
        case 'hot_conduct':
          this.football_hot_conduct_list[index].is_sticky = 1
          break;
        case 'hot_not':
          this.football_hot_not_list[index].is_sticky = 1
          break;
        case 'hot_end':
          this.football_hot_end_list[index].is_sticky = 1
          break;
      }
    },

    filterSticky(data,sticky_ids){
      if(data.length > 0){
        data.forEach((foot,i) =>{
          let state = this.checkfoot(foot,sticky_ids)
          if(state){
            data[i].is_sticky = 1
            if(this.isfirst==0){
              this.football_sticky_list.push(foot)
            }

          }
        })
      }
    },


    filterStickysan(data,sticky_ids){
      if(data.length > 0){
        data.forEach((item,i) =>{
          if(sticky_ids.indexOf(item.id)>-1){
            data[i].is_sticky = 1
          }
        })
      }
    },

    queryfoot(keyword,cb){

      if(keyword != ''){
        if(this.type == 0){
          this.football_conduct_list.forEach((val,i) => {
            if(val.name_zh.indexOf(keyword) >= 0){

              checkfoot(this.football_search_conduct_list)
            }
          })
        }
      }

    },
    searchHistory(val){

    },

    hideSearch(){
      this.likefoot = ""
      this.searchnub = 0
      this.shujuTDnamelength = 0
      this.is_search = 1
    },

    showSearch(){
      this.is_search = 0

    },
    searchjianpanUp(){

      //并没有输入关键字时，就不要再搜索了
      if(this.likefoot===''||this.likefoot==null){

        return;
      }

      let likefoot = this.likefoot.trim()
      // let isfont = this.font
      let shujuTDname = []
      let football_conduct_list = this.football_conduct_list
      let football_end_list = this.football_end_list
      let football_not_list = this.football_not_list
      let football_abnormal_list = this.football_abnormal_list
      let football_hot_end_list = this.football_hot_end_list
      let football_hot_not_list = this.football_hot_not_list
      let football_hot_conduct_list = this.football_hot_conduct_list


      football_not_list.filter((item)=>{
        if(item.deputy_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.deputy_name);
        }
        if(item.main_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.main_name);
        }
        // if(item.short_name_zh.indexOf(likefoot) != -1){
        //     shujuTDname.push(item.short_name_zh);
        // }
      })
      // console.log(shujuTDname + "football_not_list")
      football_conduct_list.filter((item)=>{
        if(item.deputy_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.deputy_name);
        }
        if(item.main_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.main_name);
        }
        // if(item.short_name_zh.indexOf(likefoot) != -1){
        //     shujuTDname.push(item.short_name_zh);
        // }
      })
      // console.log(shujuTDname + "football_conduct_list")
      football_end_list.filter((item)=>{
        if(item.deputy_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.deputy_name);
        }
        if(item.main_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.main_name);
        }
        // if(item.short_name_zh.indexOf(likefoot) != -1){
        //     shujuTDname.push(item.short_name_zh);
        // }
      })
      // console.log(shujuTDname + "football_end_list")
      football_abnormal_list.filter((item)=>{
        if(item.deputy_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.deputy_name);
        }
        if(item.main_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.main_name);
        }
        // if(item.short_name_zh.indexOf(likefoot) != -1){
        //     shujuTDname.push(item.short_name_zh);
        // }
      })
      // console.log(shujuTDname + "football_abnormal_list")
      football_hot_end_list.filter((item)=>{
        if(item.deputy_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.deputy_name);
        }
        if(item.main_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.main_name);
        }
        // if(item.short_name_zh.indexOf(likefoot) != -1){
        //     shujuTDname.push(item.short_name_zh);
        // }
      })
      // console.log(shujuTDname + "football_hot_end_list")
      football_hot_not_list.filter((item)=>{
        if(item.deputy_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.deputy_name);
        }
        if(item.main_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.main_name);
        }
        // if(item.short_name_zh.indexOf(likefoot) != -1){
        //     shujuTDname.push(item.short_name_zh);
        // }
      })
      // console.log(shujuTDname + "football_hot_not_list")
      football_hot_conduct_list.filter((item)=>{
        if(item.deputy_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.deputy_name);
        }
        if(item.main_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.main_name);
        }
        // if(item.short_name_zh.indexOf(likefoot) != -1){
        //     shujuTDname.push(item.short_name_zh);
        // }
      })
      // console.log(shujuTDname + "football_hot_conduct_list")
      this.shujuTDname = shujuTDname
      this.shujuTDnamelength = this.shujuTDname.length
      // console.log(this.shujuTDname)

      this.searchnub = this.searchnub-1
      if(this.searchnub < 0){
        this.searchnub = 0
      }

      this.shujuTDname = shujuTDname
    },
    searchjianpanDown(){
      //并没有输入关键字时，就不要再搜索了
      if(this.likefoot===''||this.likefoot==null){

        return;
      }

      let likefoot = this.likefoot.trim()
      // let isfont = this.font
      let shujuTDname = []
      let football_conduct_list = this.football_conduct_list
      let football_end_list = this.football_end_list
      let football_not_list = this.football_not_list
      let football_abnormal_list = this.football_abnormal_list
      let football_hot_end_list = this.football_hot_end_list
      let football_hot_not_list = this.football_hot_not_list
      let football_hot_conduct_list = this.football_hot_conduct_list


      football_not_list.filter((item)=>{
        if(item.deputy_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.deputy_name);
        }
        if(item.main_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.main_name);
        }
        // if(item.short_name_zh.indexOf(likefoot) != -1){
        //     shujuTDname.push(item.short_name_zh);
        // }
      })
      // console.log(shujuTDname + "football_not_list")
      football_conduct_list.filter((item)=>{
        if(item.deputy_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.deputy_name);
        }
        if(item.main_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.main_name);
        }
        // if(item.short_name_zh.indexOf(likefoot) != -1){
        //     shujuTDname.push(item.short_name_zh);
        // }
      })
      // console.log(shujuTDname + "football_conduct_list")
      football_end_list.filter((item)=>{
        if(item.deputy_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.deputy_name);
        }
        if(item.main_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.main_name);
        }
        // if(item.short_name_zh.indexOf(likefoot) != -1){
        //     shujuTDname.push(item.short_name_zh);
        // }
      })
      // console.log(shujuTDname + "football_end_list")
      football_abnormal_list.filter((item)=>{
        if(item.deputy_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.deputy_name);
        }
        if(item.main_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.main_name);
        }
        // if(item.short_name_zh.indexOf(likefoot) != -1){
        //     shujuTDname.push(item.short_name_zh);
        // }
      })
      // console.log(shujuTDname + "football_abnormal_list")
      football_hot_end_list.filter((item)=>{
        if(item.deputy_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.deputy_name);
        }
        if(item.main_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.main_name);
        }
        // if(item.short_name_zh.indexOf(likefoot) != -1){
        //     shujuTDname.push(item.short_name_zh);
        // }
      })
      // console.log(shujuTDname + "football_hot_end_list")
      football_hot_not_list.filter((item)=>{
        if(item.deputy_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.deputy_name);
        }
        if(item.main_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.main_name);
        }
        // if(item.short_name_zh.indexOf(likefoot) != -1){
        //     shujuTDname.push(item.short_name_zh);
        // }
      })
      // console.log(shujuTDname + "football_hot_not_list")
      football_hot_conduct_list.filter((item)=>{
        if(item.deputy_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.deputy_name);
        }
        if(item.main_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.main_name);
        }
        // if(item.short_name_zh.indexOf(likefoot) != -1){
        //     shujuTDname.push(item.short_name_zh);
        // }
      })
      // console.log(shujuTDname + "football_hot_conduct_list")
      this.shujuTDname = shujuTDname
      this.shujuTDnamelength = this.shujuTDname.length
      // console.log(this.shujuTDname)

      this.searchnub = this.searchnub+1
      if(this.searchnub > this.shujuTDnamelength){
        this.searchnub = this.shujuTDnamelength
      }

      this.shujuTDname = shujuTDname
      // console.log(this.searchnub)
    },
    submitSearch(){     //搜索

      //并没有输入关键字时，就不要再搜索了
      if(this.likefoot===''||this.likefoot==null){
        this.shujuTDnamelength = 0
        return;
      }

      let likefoot = this.likefoot.trim()
      // let isfont = this.font
      let shujuTDname = []
      let football_conduct_list = this.football_conduct_list
      let football_end_list = this.football_end_list
      let football_not_list = this.football_not_list
      let football_abnormal_list = this.football_abnormal_list
      let football_hot_end_list = this.football_hot_end_list
      let football_hot_not_list = this.football_hot_not_list
      let football_hot_conduct_list = this.football_hot_conduct_list


      football_not_list.filter((item)=>{
        if(item.deputy_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.deputy_name);
        }
        if(item.main_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.main_name);
        }
        // if(item.short_name_zh.indexOf(likefoot) != -1){
        //     shujuTDname.push(item.short_name_zh);
        // }
      })
      // console.log(shujuTDname + "football_not_list")
      football_conduct_list.filter((item)=>{
        if(item.deputy_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.deputy_name);
        }
        if(item.main_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.main_name);
        }
        // if(item.short_name_zh.indexOf(likefoot) != -1){
        //     shujuTDname.push(item.short_name_zh);
        // }
      })
      // console.log(shujuTDname + "football_conduct_list")
      football_end_list.filter((item)=>{
        if(item.deputy_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.deputy_name);
        }
        if(item.main_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.main_name);
        }
        // if(item.short_name_zh.indexOf(likefoot) != -1){
        //     shujuTDname.push(item.short_name_zh);
        // }
      })
      // console.log(shujuTDname + "football_end_list")
      football_abnormal_list.filter((item)=>{
        if(item.deputy_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.deputy_name);
        }
        if(item.main_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.main_name);
        }
        // if(item.short_name_zh.indexOf(likefoot) != -1){
        //     shujuTDname.push(item.short_name_zh);
        // }
      })
      // console.log(shujuTDname + "football_abnormal_list")
      football_hot_end_list.filter((item)=>{
        if(item.deputy_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.deputy_name);
        }
        if(item.main_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.main_name);
        }
        // if(item.short_name_zh.indexOf(likefoot) != -1){
        //     shujuTDname.push(item.short_name_zh);
        // }
      })
      // console.log(shujuTDname + "football_hot_end_list")
      football_hot_not_list.filter((item)=>{
        if(item.deputy_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.deputy_name);
        }
        if(item.main_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.main_name);
        }
        // if(item.short_name_zh.indexOf(likefoot) != -1){
        //     shujuTDname.push(item.short_name_zh);
        // }
      })
      // console.log(shujuTDname + "football_hot_not_list")
      football_hot_conduct_list.filter((item)=>{
        if(item.deputy_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.deputy_name);
        }
        if(item.main_name.indexOf(likefoot) != -1){
          shujuTDname.push(item.main_name);
        }
        // if(item.short_name_zh.indexOf(likefoot) != -1){
        //     shujuTDname.push(item.short_name_zh);
        // }
      })
      // console.log(shujuTDname + "football_hot_conduct_list")
      this.shujuTDname = shujuTDname
      this.shujuTDnamelength = this.shujuTDname.length
      // console.log(this.shujuTDname)
    },
    goAnchor1(id){


      $(".zhengzai").addClass("zhengactive");
      $(".weikai").removeClass("weiactive");
      $(".wanchang").removeClass("wanactive");
      $(".yichang").removeClass("yiactive");
      //正在进行
      this.football_conduct_list = this.football_conduct_list_splice
      document.querySelector(id).scrollIntoView({behavior:"smooth", block: "center"})
    },
    goAnchor2(id){

      $(".weikai").addClass("weiactive");
      $(".zhengzai").removeClass("zhengactive");
      // $(".weikai").removeClass("weiactive");
      $(".wanchang").removeClass("wanactive");
      $(".yichang").removeClass("yiactive");
      //正在进行
      this.football_conduct_list = this.football_conduct_list_splice
      //未开始
      this.football_not_list = this.football_not_list_splice

      document.querySelector(id).scrollIntoView({behavior:"smooth", block: "center"})
    },
    goAnchor3(id){

      $(".wanchang").addClass("wanactive");
      $(".zhengzai").removeClass("zhengactive");
      $(".weikai").removeClass("weiactive");
      // $(".wancheng").removeClass("wanactive");
      $(".yichang").removeClass("yiactive");
      //正在进行
      this.football_conduct_list = this.football_conduct_list_splice
      //未开始
      this.football_not_list = this.football_not_list_splice
      //完场
      this.football_end_list = this.football_end_list_splice
      document.querySelector(id).scrollIntoView({behavior:"smooth", block: "center"})
    },
    goAnchor4(id){

      $(".yichang").addClass("yiactive");
      $(".zhengzai").removeClass("zhengactive");
      $(".weikai").removeClass("weiactive");
      $(".wanchang").removeClass("wanactive");
      // $(".yichang").removeClass("yiactive");
      //正在进行
      this.football_conduct_list = this.football_conduct_list_splice
      //未开始
      this.football_not_list = this.football_not_list_splice
      //完场
      this.football_end_list = this.football_end_list_splice
      //异常
      this.football_unusual_list = this.football_unusual_list_splice
      document.querySelector(id).scrollIntoView({behavior:"smooth", block: "center"})
    },
    checkfoot(foot,ids){
      let state = false
      ids.forEach((v,i) =>{
        if(v == foot.id){
          state = true
        }
      })

      return state
    },
    zhuendhide()
    {
      this.zhuduijinqiulist.splice(0,1)
      this.iszhujin=-1;
      // clearTimeout(this.zhutimerr)
    },
    keendhide(){
      this.keduijinqiulist.splice(0,1)
      this.iskejin=-1;
      // clearTimeout(this.ketimerr)
    },
    immediater(redata)
    {

      if(redata!==undefined){
        var data= JSON.parse(redata)
        //  console.log(data+ "22222222222")
        // if(data.sport_id==1 && data.type=='matches'){
        if(this.football_conduct_list.length>0) {
          //红牌 黄牌 主场进球 客场进球 红牌  黄牌  主场半场  客场半场  主场角球  半场角球
          if(data.type == 'foot_goal'){  //足球进球
            // console.log(data)
            for(let i = 0;i < this.football_conduct_list.length;i++){
              // console.log(data.match_id + "-----------"+this.football_conduct_list[i])
              if ( this.football_conduct_list[i].id == data.match_id){
                if(data.team == 1 || data.team == "1"){//如果是主队
                  if((data.home_status == 1 ||data.home_status == "1")){//如果主队进球
                    //  console.log("//如果主队进球 ")
                    //主队进球
                    this.iszhujin = this.football_conduct_list[i].id;
                    this.wjfwenben = this.football_conduct_list[i].deputy_fraction + '   ' + this.football_conduct_list[i].deputy_name+ '   ' +data.goal_time+"'";
                    this.jqfwenben = this.football_conduct_list[i].main_name + '   ' +  data.home_score;
                    let obj = {"zhuduiwenben": this.jqfwenben,"keduiwenben": this.wjfwenben }
                    this.zhuduijinqiulist.push(obj)
                    this.football_conduct_list[i].main_fraction = parseInt( data.home_score);
                    this.football_conduct_list[i].main_half_fraction = parseInt(data.home_half_val)
                    this.football_conduct_list[i].deputy_fraction = parseInt( data.away_score);
                    let _this = this;
                    this.zhutimerr = setTimeout(_this.zhuendhide, 6500);
                    let paly_url = JSON.parse(window.localStorage.getItem("paly_url"));
                    document.getElementById("audiooo").src = paly_url.url;
                    // console.log(this.football_conduct_list[i].main_half_fraction)
                    // console.log(data.home_half_val)
                    // clearTimeout(timerr)
                    //主队红牌
                    this.football_conduct_list[i].main_red_card = parseInt(data.home_red_card);
                    //主队黄牌
                    this.football_conduct_list[i].main_yellow_card = parseInt(data.home_yellow_card);
                    //主队角球
                    this.football_conduct_list[i].main_kick = parseInt( data.home_kick_val);
                    //客队红牌
                    this.football_conduct_list[i].deputy_red_card = parseInt(data.away_red_card);
                    //客队黄牌
                    this.football_conduct_list[i].deputy_yellow_card = parseInt(data.away_yellow_card);
                    //客队角球
                    this.football_conduct_list[i].deputy_kick = parseInt(data.away_kick_val);
                  }

                  if((data.home_status == 2 ||data.home_status == "2")){//如果主队红牌
                    //  console.log("//如果主队红牌")
                    //主队红牌
                    this.football_conduct_list[i].main_red_card = parseInt(data.home_red_card);

                  }

                  if((data.home_status == 3 ||data.home_status == "3")){//如果主队黄牌
                    //  console.log("//如果主队黄牌")
                    //主队黄牌
                    this.football_conduct_list[i].main_yellow_card = parseInt(data.home_yellow_card);
                  }

                  if((data.home_status == 4 ||data.home_status == "4")){//如果主队角球
                    //  console.log("//如果主队角球 ")
                    //主队角球
                    this.football_conduct_list[i].main_kick = parseInt( data.home_kick_val);
                  }

                }
                if(data.team == 2 || data.team == "2"){//如果是客队
                  if((data.away_status == 1||data.away_status == "1")){//客队进球
                    // console.log("//客队进球 ")
                    //客队进球
                    this.wjfwenben =  data.away_score + '   ' + this.football_conduct_list[i].deputy_name+ '   ' +data.goal_time+"'";
                    this.jqfwenben = this.football_conduct_list[i].main_name + '   ' + this.football_conduct_list[i].main_fraction;
                    let obj = {"zhuduiwenben": this.jqfwenben,"keduiwenben": this.wjfwenben }
                    this.keduijinqiulist.push(obj)
                    this.iskejin = this.football_conduct_list[i].id;
                    this.football_conduct_list[i].deputy_fraction = parseInt( data.away_score);
                    this.football_conduct_list[i].deputy_half_fraction = parseInt(data.away_half_val)
                    this.football_conduct_list[i].main_fraction = parseInt( data.home_score);
                    let paly_url = JSON.parse(window.localStorage.getItem("paly_url"));
                    document.getElementById("audiooo").src = paly_url.url;
                    let _this = this;
                    this.ketimerr = setTimeout(_this.keendhide, 6500);
                    // console.log(this.football_conduct_list[i].deputy_half_fraction)
                    // console.log(data.away_half_val)
                    //客队红牌
                    this.football_conduct_list[i].deputy_red_card = parseInt(data.away_red_card);
                    //客队黄牌
                    this.football_conduct_list[i].deputy_yellow_card = parseInt(data.away_yellow_card);
                    //客队角球
                    this.football_conduct_list[i].deputy_kick = parseInt(data.away_kick_val);
                    //主队红牌
                    this.football_conduct_list[i].main_red_card = parseInt(data.home_red_card);
                    //主队黄牌
                    this.football_conduct_list[i].main_yellow_card = parseInt(data.home_yellow_card);
                    //主队角球
                    this.football_conduct_list[i].main_kick = parseInt( data.home_kick_val);
                  }
                  if((data.away_status == 2||data.away_status == "2")){//客队红牌
                    // console.log("//客队红牌 ")
                    //客队红牌
                    this.football_conduct_list[i].deputy_red_card = parseInt(data.away_red_card);
                  }
                  if((data.away_status == 3||data.away_status == "3")){//客队黄牌
                    //  console.log("//客队黄牌 ")
                    //客队黄牌
                    this.football_conduct_list[i].deputy_yellow_card = parseInt(data.away_yellow_card);
                  }
                  if((data.away_status == 4||data.away_status == "4")){//客队角球
                    //  console.log("//客队角球 ")
                    //客队角球
                    this.football_conduct_list[i].deputy_kick = parseInt(data.away_kick_val);
                  }
                }
              }
            }
          }
          else if(data.type == 'logout') {

            // console.log("out")
          }else if(data.type == "success"){
            // console.log("连接成功")
          }
          else if(data.type == "foot_finger"){             //足球指数
            // console.log(data.list + "--------2875")
            if(data.company == this.companys){  //如果socket传过来公司等于页面选中的公司
              for(let i = 0;i < this.football_conduct_list.length;i++){
                if(data.list){
                  for(let j=0;j<data.list.length;j++){
                    // console.log(data.list[j].match_id + "data.list[j].match_id")
                    if(data.list[j].match_id == this.football_conduct_list[i].id){
                      //  console.log(data.list[j])
                      if(data.list[j].asia && this.checkedCities.length >0){
                        if(data.list[j].asia.A1){
                          if(data.list[j].asia.A1 > data.list[j].asia.A){
                            this.football_conduct_list[i].ouzhishu='#de1e30';
                            let that=this;
                            let iii=i;
                            this.oIndex = setTimeout(function () {
                              that.football_conduct_list[iii].ouzhishu='#666'
                              clearTimeout(this.oIndex)
                            }, 3000);
                          }else if(data.list[j].asia.A1 < data.list[j].asia.A){
                            this.football_conduct_list[i].ouzhishu='#85c900';
                            let that=this;
                            let iii=i;
                            this.tIndex = setTimeout(function () {
                              that.football_conduct_list[iii].ouzhishu='#666'
                              clearTimeout(this.tIndex)
                            }, 3000);
                          }

                        }
                      }

                      if(data.list[j].bs && this.checkedCities.length >0){
                        if(data.list[j].bs.C1){
                          if(data.list[j].bs.C1 > data.list[j].bs.C){
                            this.football_conduct_list[i].ouzhishu='#de1e30';
                            let that=this;
                            let iii=i;
                            this.fIndex =  setTimeout(function () {
                              that.football_conduct_list[iii].ouzhishu='#666'
                              clearTimeout(this.fIndex)
                            }, 3000);
                          }
                          else if(data.list[j].bs.C1  < data.list[j].bs.C){
                            this.football_conduct_list[i].ouzhishu='#85c900';
                            let that=this;
                            let iii=i;
                            this.sIndex = setTimeout(function () {
                              that.football_conduct_list[iii].ouzhishu='#666'
                              clearTimeout(this.sIndex)
                            }, 3000);
                          }
                        }

                      }


                      //让球
                      if(data.list[j].asia){
                        if(data.list[j].asia.C1){
                          this.$set(this.football_conduct_list[i].finger,"asia", {"A1":data.list[j].asia.A1,"B1":data.list[j].asia.B1,"C1":data.list[j].asia.C1,"D1":data.list[j].asia.D1})
                          this.$forceUpdate()
                          // console.log(this.football_conduct_list[i].finger.asia.A1)
                          // console.log(this.football_conduct_list[i].finger.asia.D1)
                        }else {
                          // this.$set(this.football_conduct_list[i].finger,"asia", {"C1":data.list[j].asia.C1})
                          this.$forceUpdate()
                          //  console.log(this.football_conduct_list[i].finger.asia.D1)
                        }


                      }


                      //大小球
                      if(data.list[j].hasOwnProperty("bs")){
                        if(data.list[j].bs.D1){
                          if(data.list[j].bs.D1 == 0){
                            this.$set(this.football_conduct_list[i].finger,"bs", {"A1":data.list[j].bs.A1,"B1":Number(data.list[j].bs.B1),"C1":data.list[j].bs.C1,"D1":data.list[j].bs.D1})
                          }else if(data.list[j].bs.D1 == 1){
                            this.$set(this.football_conduct_list[i].finger,"bs", {"D1":data.list[j].bs.D1})
                          }

                          this.$forceUpdate()
                          // console.log(this.football_conduct_list[i].finger.bs.D1)
                        }else {
                          // this.$set(this.football_conduct_list[i].finger,"bs", {"C1":data.list[j].bs.C1})
                          this.$forceUpdate()

                        }
                      }
                    }
                  }
                }
              }
            }
          }
          else if(data.type == "foot_statistics"){
            // console.log(data)
            //技术统计
            for(let i = 0;i < this.football_conduct_list.length;i++){
              if(this.football_conduct_list[i].id == data.id){
                if(data.stats){
                  if(data.stats.length > 0){
                    // console.log(data.stats)
                    this.football_conduct_list[i].statistics.stats = []
                    this.football_conduct_list[i].statistics.stats.push({"home":data.stats[0].home ,"away":data.stats[0].away})
                    this.football_conduct_list[i].statistics.stats.push({"home":data.stats[1].home,"away":data.stats[1].away})
                    this.football_conduct_list[i].statistics.stats.push({"home":data.stats[2].home,"away":data.stats[2].away})
                    this.football_conduct_list[i].statistics.stats.push({"home":data.stats[3].home,"away":data.stats[3].away})
                    this.football_conduct_list[i].statistics.stats.push({"home":data.stats[4].home,"away":data.stats[4].away})
                    this.football_conduct_list[i].statistics.stats.push({"home":data.stats[5].home,"away":data.stats[5].away})
                    this.football_conduct_list[i].statistics.stats.push({"home":data.stats[6].home,"away":data.stats[6].away})
                    this.football_conduct_list[i].statistics.stats.push({"home":data.stats[7].home,"away":data.stats[7].away})
                    this.football_conduct_list[i].statistics.stats.push({"home":data.stats[8].home,"away":data.stats[8].away})
                  }
                }
              }
            }
            for(let i = 0;i < this.football_conduct_list.length;i++){ //重要事件
              if(this.football_conduct_list[i].id == data.id){
                if(data.incidents){
                  for(let j=0;j<=data.incidents.length;j++){
                    if(data.incidents[j]){
                      // console.log(data.incidents[j])
                      //重要事件
                      if(data.incidents[j].type == 1){

                        this.football_conduct_list[i].statistics.incidents.unshift({ "position":data.incidents[j].position,"type":data.incidents[j].type ,"player_name":data.incidents[j].player_name,"time":data.incidents[j].time})
                      }
                      else if(data.incidents[j].type == 3){
                        this.football_conduct_list[i].statistics.incidents.unshift({ "position":data.incidents[j].position,"type":data.incidents[j].type ,"player_name":data.incidents[j].player_name,"time":data.incidents[j].time})
                      }
                      else  if(data.incidents[j].type == 4){
                        this.football_conduct_list[i].statistics.incidents.unshift({ "position":data.incidents[j].position,"type":data.incidents[j].type ,"player_name":data.incidents[j].player_name,"time":data.incidents[j].time})
                      }
                      else  if(data.incidents[j].type == 8){
                        this.football_conduct_list[i].statistics.incidents.unshift({ "position":data.incidents[j].position,"type":data.incidents[j].type ,"player_name":data.incidents[j].player_name,"time":data.incidents[j].time})
                      }
                      else  if(data.incidents[j].type == 9){
                        this.football_conduct_list[i].statistics.incidents.unshift({ "position":data.incidents[j].position,"type":data.incidents[j].type ,"out_player_name":data.incidents[j].out_player_name,"time":data.incidents[j].time,"in_player_name":data.incidents[j].in_player_name})
                      }
                      else if(data.incidents[j].type == 11){
                        this.football_conduct_list[i].statistics.incidents.unshift({ "position":data.incidents[j].position,"type":data.incidents[j].type})
                      }
                      else if(data.incidents[j].type == 17){
                        this.football_conduct_list[i].statistics.incidents.unshift( { "position":data.incidents[j].position,"type":data.incidents[j].type ,"player_name":data.incidents[j].player_name,"time":data.incidents[j].time})
                      }else{
                        this.football_conduct_list[i].statistics.incidents.unshift({ "position":data.incidents[j].position,"type":data.incidents[j].type,"player_name":data.incidents[j].player_name})
                      }


                    }
                  }
                }
              }
            }
            let football_conduct_list_statusId
            let football_conduct_list_status

            if(data.score){
              if(!Array.isArray(data.score)){
                // console.log(data.score)
                for(let i = 0;i < this.football_conduct_list.length;i++) {
                  if(this.football_conduct_list[i].id == data.id) {

                    football_conduct_list_statusId = this.football_conduct_list[i].id
                    football_conduct_list_status = this.football_conduct_list[i]
                    // football_conduct_list_status = this.football_conduct_list[i]
                  }
                }
                for(let i = 0;i < this.football_not_list.length;i++) {
                  if (this.football_not_list[i].id == data.id) {
                    football_conduct_list_statusId = this.football_not_list[i].id
                    football_conduct_list_status = this.football_not_list[i]
                  }
                }
                if(data.score.status != 2 && data.score.status != 3 &&　data.score.status != 4　&& data.score.status != 5 && data.score.status != 7){
                  // console.log(data.score)
                  this.football_conduct_list.splice(this.football_conduct_list.findIndex(item => item.id ==data.id), 1)
                }

                if (data.score.status != 1 ) { //开始进行 //取消 推迟
                  console.log(data.score)
                  this.football_not_list.splice(this.football_not_list.findIndex(item => item.id ==data.id), 1)
                }


                if (data.score.status == 8) { //完场
                  this.football_end_list.unshift(football_conduct_list_status)
                  // this.football_conduct_list.remove(football_conduct_list_status)
                }
                if(data.score.status == 10){//中断
                  this.football_unusual_list.unshift(football_conduct_list_status)
                  // this.football_conduct_list.remove(football_conduct_list_status)
                }
                if (data.score.status == 2) { //上半场
                  console.log(data.score)
                  football_conduct_list_status.status = 2
                  this.football_conduct_list.unshift(football_conduct_list_status)
                  // this.football_not_list.remove(football_conduct_list_status)
                }
                if (data.score.status == 12 || data.score.status == 9) { //取消 推迟
                  this.football_unusual_list.unshift(football_conduct_list_status)
                  // this.football_not_list.remove()
                }
              }
            }
          }
        }
      }
    }
  },
  beforeDestroy() {
    clearTimeout(this.oIndex);
    clearTimeout(this.tIndex);
    clearTimeout(this.sIndex);
    clearTimeout(this.fIndex);

    this.oIndex = null;
    this.tIndex = null;
    this.sIndex = null;
    this.fIndex = null;
  },
  destroyed () {//离开该页面需要移除这个监听的事件
    window.removeEventListener('scroll', this.handleScroll)
    this.worker = null

  },
};
</script>

<style scoped src="../style/score-new-61f91b5fb0.css"></style>

<style lang="stylus" >
.scrollbarnone::-webkit-scrollbar{
  display: none; /* Chrome Safari */
}
.xsanjiao{
  width:0;
  height:0;
  border-left: 10px solid #f0f1f6;
  border-right: 10px solid #f0f1f6;
  border-bottom: 10px solid #fff;
  position: absolute;
  top:-9px;
  left:15px;
}
.aa {
  transition: all .5s;
}

.go {
  transform: rotate(280deg);
  transition: all .5s;
}

.go2 {
  transform: rotate2(280deg);
  transition: all .5s;
}
.matchwrapperfoot {
  width: 1200px;
  margin: 62px auto 0px;
  .selected{
    width:600px;
    line-height :30px;
    background:#f7f7f9;
    display:inline-flex;
    .number{
      text-align :center;
      width:100px;
      color:#f00;
      padding-left:20px;
      span{
        display: block;
        float:left;
        margin-right :5px;
      }
    }
    .selected_event{
      width:500px;
      span{
        display:block;
        float:left;
        padding:0px 10px 0px 10px;
        margin:5px 5px 5px 5px;
        height:25px;
        line-height :25px;
        background:#fff;
        border-radius :3px;
        font-size:14px;

        i{
          cursor: pointer;
        }
      }
    }
  }

  .event_frame{
    width:550px;
    height:800px
    overflow-y:auto;
    position:relative
    .event_list{
      width:500px;
      clear:both;
      .event_letter{
        width:100%;
        height :40px;
        line-height :40px;
        span{
          font-size:20px;
          margin-left:20px;
        }
      }

      .event{
        margin-left:15px;
        span{
          display:block;
          float:left;
          padding:0px 10px 0px 10px;
          margin:5px 5px 5px 5px;
          background:#f2f2f5;
          border-radius :3px;
          font-size:14px;
          height:25px;
          line-height :23px;
          cursor:pointer;
          border:1px solid #716b6b;
          color:#7b7676;
          letter-spacing :1px;
        }

        .checked{
          background:#cdddf1;
          color:#1f1e1e;
          letter-spacing :1px;
        }
      }
    }

    .letter_list{
      width :30px;
      position :fixed;
      right:50px;
      top:150px;
      z-index:1000;
      span{
        display:block;
        width:25px;
        heigth:25px;
        line-height:25px;
        border-radius :50%;
        background:#f1efef;
        margin-top:5px;
        text-align :center;
        font-size:14px;
        cursor: pointer;
      }
    }
  }
  .guanggaotu:hover {
    -webkit-transform: scale(1.15, 1.15);
    transform: scale(1.04, 1.04);
  }
  .liveTypenav {
    display: flex;
    height:60px;
    padding: 13px 0;
    justify-content: space-between;

    span {
      cursor: pointer;
      position: relative;
      display: inline-block;
      margin: 0 8px 0px 0px;
      width:80px;
      text-align :center;
      height :35px;
      font-weight: 700;
      line-height :32px;
      font-size: 16px;
      color: #666;
      float: left;
      letter-spacing :3px;
      background : #fff;
      border-radius: 3px;
      box-shadow: 2px 2px 5px #dedede;
      padding-left:5px;
    }

    span.active {

      background : linear-gradient(
          180deg

          , rgba(87, 238, 255, 1) 0%, rgba(129, 211, 248, 1) 49%, rgba(37, 149, 230, 1) 94%);
      border:none;
      padding-top:2px;
      color:#FFF;
      font-weight:500;
    }

    span.checked {
      box-shadow: 0px 1px 2px lightgrey;
      background : linear-gradient(
          180deg
          , rgba(87, 238, 255, 1) 0%, rgba(129, 211, 248, 1) 49%, rgba(37, 149, 230, 1) 94%);
      border:none;
      padding-top:2px;
      color:#f1e9e9;
      font-weight:500;
    }

    .search{
      margin-left:30px;
      background : #fff;
      box-shadow: 0px 1px 2px #ece7e7;
      font-size:14px;
      i{
        margin-right:5px;
      }
    }



    .query{
      margin-left:30px;
      .el-input__inner{
        height: 35px;
        width:250px;
      }
    }

    .close{
      font-size:20px;
      position: relative;
      right:36px;
      bottom:2px;
      cursor: pointer;
      color: #c1bdbd;
    }
  }

  .download-submenu {

    width: 450px;
    border-radius: 4px;
    color: #777;
    cursor: default;
    z-index: 100;
    background: white;
    position: absolute;
    height: 426px;
    left: 880px;
    top:57px;
    line-height: 100%;
    padding: 20px;
  }

  .download-submenu-box {

    width: 430px;
    border-radius: 4px;
    color: #777;
    cursor: default;
    z-index: 199;
    background: white;
    height: 350px;
    overflow: auto;
    line-height: 100%;
    padding: 20px;
  }

  .date-list {
    //position: fixed;
    //top:150px;
    .filter_time{
      height:60px;
      width:140px;
      float:left;
      margin-right:10px;
      margin-top:-15px;
      position:relative;
      bottom:5px;
      z-index :1 !important;

      .el-input__inner{
        width:140px;
        height :60px;
        text-align:center;
        position :absolute;
        top:-15px !important;
        left:0px;
        z-index :1000;
        cursor:pointer;
      }
    }

    ul {
      position:relative;
      top:10px;
      .item {
        position: relative;
        display: inline-block;
        padding-top:5px;
        text-align: center;
        overflow: hidden;
        cursor: pointer;
        width:130px;
        height : 60px;
        background : #efefef;
        margin-right:10px;
        border-radius:3px;
        border:1px solid #d0cece;
        .day {
          font-size: 16px;
          color: #777;
          height :25px;
          line-height :25px;
        }

        .date {
          font-size: 14px;
          color: #777;
          height :25px;
          line-height :25px;
        }
      }

      .item.current {
        box-shadow: 1px 1px 4px #888;
        background :#fff;
        border:none;
      }

      .item.current .day {
        font-size: 16px;
        color: #000;
      }

      .item.current .date {
        font-size: 16px;
        color: #000;
        letter-spacing :1px;
        display :block;
      }
    }
  }

  .match-box {

    .match-data {
      .match-card {
        height: 80px;
        line-height :80px;
        background: #fff;
        border-radius: 4px;
        margin-bottom: 16px;
        font-size: 14px;
        color:#666;
        display: flex;
        align-items: center;

        .text {
          width: 185px;
          height :50px;
          line-height :50px;
          text-align :center;
          cursor: pointer;
          .event_logo{
            width:50px;
            padding:5px;
            position :relative;
            right:10px;
          }

          .empty_event_logo{
            display:block;
            width:35px;
            height :35px;
            background :#f1f1f1;
            border-radius: 50%;
            position :relative;
            top:10px;
            left:30px;
            float:left;
          }

          .title {
            display: inline-block;
            font-size: 16px;
            color: #777;
          }
        }

        .event_time{
          width:90px;
          text-align :center;
        }

        .status{
          width:90px;
          text-align :center;
        }

        .team {
          width :380px;
          display: flex;
          align-items: center;
          font-size: 14px;
          color:#666;
          cursor: pointer;
          .host {
            width: 150px;
            font-size: 14px;
            line-height :80px;
            height :80px;
            text-align:center;
            position :relative;
            span {
              display :block;
              width:100%;
              height :40px;
              line-height :40px;
              position :absolute;
              bottom :0px;
            }

            img {
              width: 30px;
              height: 30px;
              margin-bottom:5px;
            }

            .empty_logo{
              display:block;
              width:35px;
              height :35px;
              background :#f1f1f1;
              border-radius: 50%;
              position :relative;
              top:10px;
              left:45px;
            }
          }

          .sorce {
            width:100px;
            text-align: center;
            span {
              display : inline-block;
              font-size:22px;
              font-weight:bold;
              width:30px;
              text-align :center;
            }
          }

          .guest {
            width: 150px;
            font-size: 14px;
            line-height :80px;
            height :80px;
            text-align:center;
            position :relative;
            span {
              display :block;
              width:100%;
              height :40px;
              line-height :40px;
              position :absolute;
              bottom :0px;
            }

            img {
              width: 30px;
              height: 30px;
              margin-bottom:5px;
            }
          }
        }

        .stage {
          font-size: 14px;
          color:#666;
          text-align :center;
          span{
            width:100px;
            text-align :center;
            display :table-cell;
          }
        }

        .live{
          width:100px;
          text-align :center;
          cursor: pointer;
          img{
            width:35px;
            position: relative;
            top:12px;

          }
        }

        .sticky{
          width: 30px;
          text-align: center;
          font-size: 18px;
          cursor: pointer;
        }

        .follow{
          width:100px;
          text-align :center;
          i{
            font-size:24px;
            position: relative;
            right:15px;
            cursor: pointer;
          }

          .hover{
            color:#073af1;
            font-size:26px;
            font-weight:bold;
          }
        }

        .scswipernext:after, .scswiperprev:after {
          font-size: 14px;
          color: #000;
        }
      }

      .match-card:hover{
        background: #fff;
        box-shadow: -1px 1px 5px #b3b1b1;
      }
    }
  }

  .football_match {
    height :30px;
    line-height:50px;

    .match-data {
      .match-card {
        background: #fff;
        border-radius: 4px;
        margin-bottom: 16px;
        font-size: 14px;
        display: flex;

        .text {
          width: 200px;
          text-align :center;
          .checked{
            position: relative;
            right:55px;
          }
          .title {
            font-size: 14px;
          }
        }

        .event_time{
          text-align :center;
          width:100px;
        }

        .status{
          text-align :center;
          width:100px;
        }

        .team {
          width:400px;
          text-align :center;
          font-size: 16px;
          .host {
            width:110px;
            text-align: center;
            display: inline-block;
          }

          .sorce {
            width:110px;
            text-align: center;
            display: inline-block;
          }

          .guest {
            width:110px;
            text-align: center;
            display: inline-block;
          }
        }

        .stage {
          width:200px;
          font-size: 16px;
          text-align :center;
          position: relative;
          left:25px;
          span{
            width:100px;
            text-align :center;
            display :table-cell;
          }
        }

        .live{
          width:150px;
          text-align :center;
          position: relative;
          left:25px;
        }

        .follow{
          width:150px;
          text-align :center;
        }
      }
    }
  }

  .load{
    height: 500px;
    margin-top: 200px;
    text-align: center;
    img{
      width:55px;
    }
  }

  .football_title{
    line-height :40px;
    height :60px;
    text-align :center;
    width :100%;
    padding-top: 10px;
    margin-top:1px;
    background:white;

    color:#9197ad;
    .title{
      position: relative;

    }

    span{
      display :inline-flex;
      font-size:15px;
      margin-left :20px;
      height :40px;
      line-height :40px;
      letter-spacing :1px;
    }

    img {
      width:20px;
      display :inline-flex;
      position :relative;
      top:5px;
    }
  }

  .fixed{
    width:1150px;
    height: 100px;
    position: fixed;

    .fixedtool{
      width:62px;
      height: auto;
      background: #fff;
      position:absolute;
      overflow: hidden;
      right:-146px;
      line-height: 0.8;
      box-shadow:0px 0px 5px #b3b1b1;
      border-radius: 5px;
      color:#666;
      font-size:10px;
      top: 295px;
      >div{
        width:55px;
        height: 50px;

        position: relative;
        >p{
          height: 25px;
          line-height: 25px;
          text-align: center;
          .retain_num{
            position: absolute;
            font-size:13px;
            top:-4px;
            left:-3px;
            width:22px;
            height: 14px;
            line-height: 14px;
            background: #2483D6;
            color:#fff;
            border-radius: 3px;
          }

          .hide_num{
            position: absolute;
            font-size:13px;
            top:-4px;
            left:-3px;
            width:22px;
            height: 14px;
            line-height: 14px;
            background: #f00;
            color:#fff;
            border-radius: 3px;
          }
        }
        .icon{
          position: relative;
          top:5px;
          left:5px;
        }

        .text{
          border-bottom:1px solid #cac5c5;
          margin-left:3px;
          font-size: 10px;
          height: 25px;
          line-height: 30px;
        }
      }

      >div:hover{
        background: linear-gradient(
            180deg
            , rgba(88, 234, 255, 1) 0%, rgba(87, 184, 250, 1) 55%, rgba(43, 153, 233, 1) 100%);
        color:black;

        cursor: pointer;
      }
    }
  }

  .zhengzai{
    background: url("../assets/img/rightbtn8.png");
    display: inline-block;
  }
  .zhengactive{
    background: url("../assets/img/rightbtn7.png");
    display: inline-block;
  }
  .zhengzai:hover{
    background: url("../assets/img/rightbtn7.png");
    display: inline-block;
  }
  .weikai{
    background: url("../assets/img/rightbtn2.png");
    display: inline-block;
  }
  .weiactive{
    background: url("../assets/img/rightbtn1.png");
    display: inline-block;
  }
  .weikai:hover{
    background: url("../assets/img/rightbtn1.png");
    display: inline-block;
  }
  .wanchang{
    background: url("../assets/img/rightbtn4.png")
    display: inline-block;
  }
  .wanactive{
    background: url("../assets/img/rightbtn3.png")
    display: inline-block;
  }
  .wanchang:hover{
    background: url("../assets/img/rightbtn3.png")
    display: inline-block;
  }
  .yichang{
    background: url("../assets/img/rightbtn6.png")
    display: inline-block;
  }
  .yiactive{
    background: url("../assets/img/rightbtn5.png")
    display: inline-block;
  }
  .yichang:hover{
    background: url("../assets/img/rightbtn5.png")
    display: inline-block;
  }
  .hoverfalseimg{
    display: inline-block;
    background: url("../assets/img/hoverfalse.png");
    background-size: 100% 100%;
  }
  .listshover{
    background:#58a0ff;
    line-height: 25px;
    color: rgb(255, 255, 255);
    height: 25px;
    cursor:pointer;
    width: 100%;
    padding-left: 12px
  }
}
.scrollbarnone {
  div:hover {
    background:#58a0ff !important;
    color: white !important;
  }

}
.date-lists {
  .filter_time{
    height:60px;
    width:140px;
    float:left;
    margin-right:10px;
    position:relative;
    bottom:5px;
    z-index :1;

    .el-input__inner{
      width:140px;
      height :60px;
      text-align:center;
      position :absolute;
      top:-15px;
      left:0px;
      z-index :1000;
      cursor:pointer;
    }
  }

  ul {
    position:relative;
    border: 1px solid #e6e6e6;
    display: flex;
    .item {
      position: relative;
      display: inline-block;
      padding-top:5px;
      text-align: center;
      cursor: pointer;
      width:148.5px;
      height : 60px;
      left :10px;
      /*background : #efefef;*/
      /*margin-right:1px;*/
      background:#fff;
      overflow hidden;
      box-shadow: inset 0 -1px 0 0 #eeeeee, inset -1px 0 0 0 #eeeeee;
      /*border-radius:3px;*/
      /*border:1px solid #d0cece;*/
      font-family: 'Microsoft Yahei', 'PingFang SC', 'Avenir', 'Segoe UI', 'Hiragino Sans GB', STHeiti, 'Microsoft Sans Serif', 'WenQuanYi Micro Hei', sans-serif !important;
      .day {
        font-size: 18px;
        color: #333;
        height :25px;
        line-height :25px;
        font-family: 'Microsoft Yahei', 'PingFang SC', 'Avenir', 'Segoe UI', 'Hiragino Sans GB', STHeiti, 'Microsoft Sans Serif', 'WenQuanYi Micro Hei', sans-serif !important;
      }

      .date {
        font-size: 12px;
        color: #333;
        height :25px;
        line-height :25px;
        font-family: 'Microsoft Yahei', 'PingFang SC', 'Avenir', 'Segoe UI', 'Hiragino Sans GB', STHeiti, 'Microsoft Sans Serif', 'WenQuanYi Micro Hei', sans-serif !important;
      }

    }
    .item:last-child{
      background:none;
      overflow:hidden;
    }
    .item:last-child .filter_time{
      bottom: 0px !important;
      margin-top -12px;
    }
    .item:last-child .el-input__inner{
      border none;
      width: 148px;
      font-size 16px;
    }
    .item:nth-child(1){
      border-top-left-radius: 4px;
    }
    .item.current {
      /*box-shadow: 1px 1px 4px #888;*/
      background :#fff;
      border:none;
    }

    .item.current .day {
      font-size: 18px;
      color: #23abfb;
    }

    .item.current .date {
      font-size: 12px;
      letter-spacing :1px;
      display :block;
      color: #23abfb;
    }
  }
}
.el-autocomplete{
  float: left;
}
.liveTypenav .up{
  width: 16px;
  height: 16px;
  margin-right: 10px;
  cursor: pointer;
  background: url("../assets/up.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top:22px;
  right: 187px;
}
.liveTypenav .down{
  width: 16px;
  height: 16px;
  margin-right: 10px;
  cursor: pointer;
  background: url("../assets/down.png");
  background-repeat: no-repeat;
  background-size:100% 100%;
  position: absolute;
  top:22px;
  right: 167px;
}
.matchwrapperfoot .liveTypenav .query .el-input__inner{
  width: 266px;
}
.erjinavfixed{
  position: fixed;
  top:60px;
  background-color: #f5f5f5;
  width: 1200px;
  opacity: 1!important;
  height: 60px !important;
  padding: 13px 0;
  z-index: 20;
}
.biaotoufixed{
  position: fixed;
  top:120px;
  margin-top: 0 !important;
  z-index: 20;
}
.el-autocomplete-suggestion{
  display: none;
}
.companylist{
  background: white;
  text-align: center;
  padding: 5px
}
.companylist:hover{
  background: rgb(55, 186, 243) ;
  color: white ;
}
.companylistbg{
  background: rgb(55, 186, 243) ;
  color: white ;
}
.sskuanger .el-checkbox{
  width: 80px;
}
.zssjkuangs .el-checkbox{
  width: 50px;
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
.date-lists .item:hover span {
  color: #23abfb !important;
}
.el-picker-panel{
  top:190px !important;
}
.filter_time .el-input__inner{
  z-index:1 !important;
}
.filter_time  .el-input__suffix{
  display none;
}
.rilefixed{
  position fixed;
  top:120px;
  z-index :999;
}
.biaotousaiguofixed{
  position fixed;
  top:180px;
  z-index :999;
}
.date-lists ul .item:last-child .filter_time{
  margin-top: -6px !important;
}

.el-checkbox__inner {
  width :8px !important;
  border-radius :50% !important;
  border :solid 8px  !important;
  border-image: url("../assets/quedingbiankuang.jpg") 18 18 18 18 !important;
}
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner  {
  border-radius :50% !important;
  width :14px !important;
  border-image:none !important;
  border 0px !important;
  background url("../assets/quding.jpg") no-repeat !important;
  background-size  100% 100%  !important;
  background-color transparent !important;

}
.el-checkbox__inner::after {
  border: 0px !important;
}

//.infinite-list-container::-webkit-scrollbar {
//  display: none; /* Chrome Safari */
//}
.infinite-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.infinite-list {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
  text-align: center;
}
.matchwrapperfoot .liveTypenav span.active{
  background #dbb16f !important;
}
.date-lists ul .item.current .date,.date-lists ul .item.current .day{
  color #dbb16f !important;
}
</style>