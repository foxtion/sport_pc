<template>
    <div class="matchwrapper" style="background: url(../assets/img/mainbackground.jpg);">
        <el-drawer title="赛事" :visible.sync="drawer" :with-header="false" :before-close="CloseSelectEvent"> 
            <div class = "selected">
                <div class = "number" v-if='selected_event.length > 0'>
                    <span>已选</span>
                    <span>({{selected_event.length}})</span>
                </div>
                <div class = "selected_event">
                    <span v-for="(v, i) in selected_event" :key="i" v-if='i < 20'>
                        {{v.name}}
                        <i class = "el-icon-close" @click="CancelEvent(v)"></i>
                    </span>
                </div>
            </div>

            <div class = "event_frame" v-bind:style="{height:frame_height}">
                <div class = "event_list" v-for="(val, i) in event" :key="i">
                    <div class = "event_letter">
                        <span>{{val.letter}}</span>
                    </div>
                    
                    <div class = "event" v-for="(v, k) in val.event" :key="k">
                        <span @click="checked_event(val,i,k)" :class="{ checked: v.check }">{{v.name}}</span>
                    </div>
                </div>
                <div class = "letter_list" v-if="hide">
                    <span  v-for="(val, i) in letter" :key="i">
                        {{ val }}
                    </span> 
                </div>
            </div>
        </el-drawer>
<!--        <div class = "fixed">-->
<!--            <div class="fixedtooler" style="height: 220px; position:absolute;right: -60px;top:295px;">-->
<!--                 <el-button type="primary" plain  @click="goAnchor('playing')">进行中</el-button><br>-->
<!--                <el-button type="primary" plain  @click="goAnchor('waiting')">未开赛</el-button><br>-->
<!--                    <el-button type="primary" plain  @click="goAnchor('ended')" style="width: 82px">完场</el-button><br>-->
<!--                <el-button type="primary" plain style="width: 82px">异常</el-button><br>-->
<!--            </div>-->
<!--        </div>-->
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
            <div class="fixedtool">
                <img src="https://soket.daoyunxiang.com/rightbtn7.png" ref="jinxingz" @mouseover="changebtna(1)" @mouseleave="changebtna(2)" @click="goAnchor('#playing')" width="100%">
                <img src="../assets/img/rightbtn2.png" ref="wanchangl" @mouseover="changebtnb(1)" @mouseleave="changebtnb(2)" @click="goAnchor('#waiting')" width="100%">
                <img src="../assets/img/rightbtn4.png" ref="weikais" @mouseover="changebtnc(1)" @mouseleave="changebtnc(2)" @click="goAnchor('#ended')" width="100%">
                <img src="../assets/img/rightbtn6.png" ref="yichangya" @mouseover="changebtnd(1)" @mouseleave="changebtnd(2)" @click="goAnchor('#abnormal')" width="100%">

            </div>
            <div style="width: 102px;height:auto;border-radius: 5px;background: white;position: absolute;top:190px;left:-130px;color:#787878;font-size: 12px">
                <img width="100%" style="position: relative;top:-30px" src="../assets/img/hotevent.png">
                <div style="height: 400px;overflow-y:auto" class="scrollbarnone">
                    <div  v-for="item in saishilstdata"  :style="hoteventtool==item.id?'background:#58eaff;height: 25px;cursor:pointer;width: 100%;padding-left: 12px':'background:white;cursor:pointer;height: 25px;width: 100%;padding-left: 12px'"  @click="changehotevent(item.id,item.count)">
                        <img :src="item.logo" width="12px">    {{item.short_name_zh}}</div>
                </div>
<!--                <div ref="weizhankaid" style="display: none">-->
<!--                    <div  v-for="item in saishilstdata" v-if="parseInt(item.count)<6 && parseInt(item.count)>1" :style="hoteventtool==item.id?'background:#58eaff;height: 25px;cursor:pointer;width: 100%;padding-left: 12px':'background:white;cursor:pointer;height: 25px;width: 100%;padding-left: 12px'"  @click="changehotevent(item.id,item.count)">-->
<!--                        <img :src="item.logo" width="12px">    {{item.short_name_zh}}</div>-->
<!--                </div>-->
                <el-divider></el-divider>
<!--                            <div style="text-align: center;height: 20px;cursor:pointer;" @click="showallhot"><i :class="kaiorhe==1?'el-icon-arrow-down':'el-icon-arrow-up'"></i></div>-->
            </div>
        </div>

        <div class="liveTypenav">

            <span  v-for="(item, i) in classify" :key="i" style=" width: 50px; font-size: 14px;" :class="{ active: item.active }" @click="select_type(item, i)">
                {{ item.name }}
            </span>
            <span style="width: 65px; font-size: 14px;text-align: left;padding-left: 10px;cursor:default" class="span" >
               收藏 <div style="background: #FE5746;color:white;font-size: 12px;border-radius:50%;width: 25px;height:25px;padding-left: 8px;top: -38px;left: 32px;position: relative;line-height: 25px">{{follownum}}</div>
            </span>
            <span v-if="hidefootball.length>0" class="span active" style=" width: 160px; font-size: 14px;" @click="showfoot">全部（隐藏{{hidefootball.length}}场）</span>
            <span style="width:64px;font-size: 14px;margin-left: 260px" :class="saishifocus==1?'span active':'span'" id="sskuangan" @mouseover="matchselectys(1)" @mouseleave="matchselectys(2)" @click="showeventer"  v-if="type != 4">赛事<i class="el-icon-caret-bottom"></i></span>
            <span style="width:74px;font-size: 14px;margin-left: 10px" @click="selectzs" :class="zoushifocus==1?'span active':'span'" id="xzzsan"  @mouseover="oddsselectys(1)" @mouseleave="oddsselectys(2)" v-if="type != 4">走势 <i class="el-icon-caret-bottom"></i></span>
            <span style="width:110px;font-size: 14px;margin-left: 10px"  id="companyan" :class="compafocus==1?'span active':'span'" @click="showcompany"  @mouseover="comselectys(1)" @mouseleave="comselectys(2)">	{{comnow}} <i class="el-icon-caret-bottom"></i></span>
            <!--<span style="width:100px;font-size: 14px"    @click="selectdatevisible  = true">选择日期</span>   &lt;!&ndash;  @click="select_event" &ndash;&gt;-->
            <pormpt></pormpt> 

            <span class="search" style="border-width: 1px;border-style: solid; border-color:lightgray" @click="showSearch" v-if="is_search"  ><i class = 'el-icon-search' ></i>搜索</span>
            <template v-else>
                <el-autocomplete  placeholder="ctrl+f 搜索赛事名称或球队名称" v-model="likefoot" :fetch-suggestions="queryfoot" @select="searchHistory" @keyup.enter.native="submitSearch" class = "query" >
                </el-autocomplete>
                <i class="el-icon-circle-close el-input__icon close" slot="suffix" @click="hideSearch"></i>
            </template>

        </div>
        <div  class="download-submenu"  ref="zssjkuang"  style="display: none;left:980px;height:200px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)" >
            <i class="xsanjiao" ></i>
            <div class="download-submenu-box" style="height:150px">
                <el-checkbox-group v-model="checkedzoushi" @change="hanlezoushidata">
                    <el-checkbox  v-for="item in zoushidata" :label="item">{{item}}</el-checkbox>
                </el-checkbox-group>
                <button  style="width: 22%;margin:5px;padding: 5px;cursor:pointer;" @click="handleCheckAllChanger">全选</button>  <button @click="handleCheckotherChanger" style="width: 22%;margin:5px;padding: 5px;cursor:pointer;">反选</button>
                <button style="width: 22%;margin:5px;padding: 5px;cursor:pointer;" @click="confirmzs">确定</button>
                <button style="width: 22%;margin:5px;padding: 5px;cursor:pointer;" @click="hidezoushikuang">取消</button>
            </div>
        </div>
        <div  class="download-submenu" ref="oddscomk" style="padding:0;display: none;left:1026px;height:auto;width:120px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)" >
            <i class="xsanjiao" ></i>
            <div style="font-size: 14px;line-height: 20px">
                <br>
                <div :style="whichcom==2?'background:#58eaff;text-align: center':'background:white;text-align: center'" @click="chancompany(2)" >BET365</div><br>
                <div  :style="whichcom==10?'background:#58eaff;text-align: center':'background:white;text-align: center'" @click="chancompany(10)">易胜博</div><br>
                <div  :style="whichcom==11?'background:#58eaff;text-align: center':'background:white;text-align: center'" @click="chancompany(11)">韦德</div><br>
                <div  :style="whichcom==14?'background:#58eaff;text-align: center':'background:white;text-align: center'" @click="chancompany(14)">12bet</div><br>
                <div  :style="whichcom==19?'background:#58eaff;text-align: center':'background:white;text-align: center'" @click="chancompany(19)">竞彩官方</div><br>
                <div  :style="whichcom==3?'background:#58eaff;text-align: center':'background:white;text-align: center'" @click="chancompany(3)">皇冠</div><br>
                <div :style="whichcom==5?'background:#58eaff;text-align: center':'background:white;text-align: center'" @click="chancompany(5)">立博</div><br>
                <div :style="whichcom==7?'background:#58eaff;text-align: center':'background:white;text-align: center'" @click="chancompany(7)">澳彩</div><br>
                <div :style="whichcom==9?'background:#58eaff;text-align: center':'background:white;text-align: center'" @click="chancompany(9)">威廉希尔</div><br>
            </div>
        </div>

        <div  class="download-submenu"  ref="sskuanger"  style="display: none;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
            <i class="xsanjiao" ></i>
          <div class="download-submenu-box">
            <h4>A</h4>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox class="saishichackz" v-for="item in saishilstdata" :label="item.id" v-if="item.zubie=='A'" >{{item.short_name_zh}}<span style="color:#999"> [{{item.count}}]</span></el-checkbox> </el-checkbox-group>
            <el-divider></el-divider>
            <h4>B</h4>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox class="saishichackz" v-for="item in saishilstdata" :label="item.id" v-if="item.zubie=='B'" >{{item.short_name_zh}}<span style="color:#999"> [{{item.count}}]</span></el-checkbox> </el-checkbox-group>
            <el-divider></el-divider>
            <h4>D</h4>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox class="saishichackz" v-for="item in saishilstdata" :label="item.id" v-if="item.zubie=='D'" >{{item.short_name_zh}}<span style="color:#999"> [{{item.count}}]</span></el-checkbox> </el-checkbox-group>
            <el-divider></el-divider>
            <h4>F</h4>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox class="saishichackz" v-for="item in saishilstdata"  :label="item.id" v-if="item.zubie=='F'" >{{item.short_name_zh}}<span style="color:#999"> [{{item.count}}]</span></el-checkbox> </el-checkbox-group>
            <el-divider></el-divider>
            <h4>G</h4>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox class="saishichackz" v-for="item in saishilstdata" :label="item.id"  v-if="item.zubie=='G'" >{{item.short_name_zh}}<span style="color:#999"> [{{item.count}}]</span></el-checkbox> </el-checkbox-group>
            <el-divider></el-divider>
            <h4>H</h4>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox class="saishichackz" v-for="item in saishilstdata" :label="item.id"  v-if="item.zubie=='H'" >{{item.short_name_zh}}<span style="color:#999"> [{{item.count}}]</span></el-checkbox> </el-checkbox-group>
            <el-divider></el-divider>
            <h4>J</h4>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox class="saishichackz" v-for="item in saishilstdata" :label="item.id"  v-if="item.zubie=='J'" >{{item.short_name_zh}}<span style="color:#999"> [{{item.count}}]</span></el-checkbox> </el-checkbox-group>
            <el-divider></el-divider>
            <h4>K</h4>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox class="saishichackz" v-for="item in saishilstdata" :label="item.id"  v-if="item.zubie=='K'" >{{item.short_name_zh}}<span style="color:#999"> [{{item.count}}]</span></el-checkbox> </el-checkbox-group>
            <el-divider></el-divider>
            <h4>L</h4>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox class="saishichackz" v-for="item in saishilstdata" :label="item.id"  v-if="item.zubie=='L'" >{{item.short_name_zh}}<span style="color:#999"> [{{item.count}}]</span></el-checkbox> </el-checkbox-group>
            <h4>M</h4>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox class="saishichackz" v-for="item in saishilstdata" :label="item.id"  v-if="item.zubie=='M'" >{{item.short_name_zh}}<span style="color:#999"> [{{item.count}}]</span></el-checkbox> </el-checkbox-group>
            <el-divider></el-divider>
            <h4>N</h4><el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox class="saishichackz" v-for="item in saishilstdata" :label="item.id" v-if="item.zubie=='N'" >{{item.short_name_zh}}<span style="color:#999"> [{{item.count}}]</span></el-checkbox> </el-checkbox-group>
            <el-divider></el-divider>
            <h4>O</h4><el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox class="saishichackz" v-for="item in saishilstdata" :label="item.id" v-if="item.zubie=='O'" >{{item.short_name_zh}}<span style="color:#999"> [{{item.count}}]</span></el-checkbox> </el-checkbox-group>
            <el-divider></el-divider>
            <h4>P</h4><el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox class="saishichackz" v-for="item in saishilstdata" :label="item.id" v-if="item.zubie=='P'" >{{item.short_name_zh}}<span style="color:#999"> [{{item.count}}]</span></el-checkbox> </el-checkbox-group>
            <el-divider></el-divider>
            <h4>Q</h4><el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox class="saishichackz" v-for="item in saishilstdata" :label="item.id"  v-if="item.zubie=='Q'" >{{item.short_name_zh}}<span style="color:#999"> [{{item.count}}]</span></el-checkbox> </el-checkbox-group>
            <el-divider></el-divider>
            <h4>R</h4><el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox class="saishichackz" v-for="item in saishilstdata" :label="item.id"  v-if="item.zubie=='R'" >{{item.short_name_zh}}<span style="color:#999"> [{{item.count}}]</span></el-checkbox> </el-checkbox-group>
            <el-divider></el-divider>
            <h4>S</h4><el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox class="saishichackz" v-for="item in saishilstdata" :label="item.id" v-if="item.zubie=='S'" >{{item.short_name_zh}}<span style="color:#999"> [{{item.count}}]</span></el-checkbox> </el-checkbox-group>
            <el-divider></el-divider>
            <h4>T</h4><el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox class="saishichackz" v-for="item in saishilstdata" :label="item.id" v-if="item.zubie=='T'" >{{item.short_name_zh}}<span style="color:#999"> [{{item.count}}]</span></el-checkbox> </el-checkbox-group>
            <el-divider></el-divider>
            <h4>W</h4><el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox class="saishichackz" v-for="item in saishilstdata" :label="item.id" v-if="item.zubie=='W'" >{{item.short_name_zh}}<span style="color:#999"> [{{item.count}}]</span></el-checkbox> </el-checkbox-group>
            <el-divider></el-divider>
            <h4>X</h4><el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox  class="saishichackz" v-for="item in saishilstdata" :label="item.id" v-if="item.zubie=='X'" >{{item.short_name_zh}}<span style="color:#999"> [{{item.count}}]</span></el-checkbox> </el-checkbox-group>
            <el-divider></el-divider>
            <h4>Y</h4><el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox class="saishichackz"  v-for="item in saishilstdata"  :label="item.id" v-if="item.zubie=='Y'" >{{item.short_name_zh}}<span style="color:#999"> [{{item.count}}]</span></el-checkbox>  </el-checkbox-group>
            <el-divider></el-divider>
            <h4>Z</h4><el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox  class="saishichackz" v-for="item in saishilstdata" :label="item.id" v-if="item.zubie=='Z'" >{{item.short_name_zh}}<span style="color:#999"> [{{item.count}}]</span></el-checkbox>
        </el-checkbox-group>
            <el-divider></el-divider>
        </div>
            <div  style="padding:10px;height:57px;border:1px solid #ddd;background: white;width: 110%;position: relative;left: -20px;">
<!--                <button  style="margin:5px;width: 47%;float: left;padding: 5px;cursor:pointer;"  @click="fivemain">五大联赛</button>-->
<!--                <button   style="margin:5px;width: 47%;float: left;padding: 5px;cursor:pointer;"  @click="firstmatches">一级赛事</button><br><br><br>-->
                <button   style="width: 22%;margin:5px;padding: 5px;cursor:pointer;"   @click="handleCheckAllChange">全选</button>
                <button  style="width: 22%;margin:5px;padding: 5px;cursor:pointer;"  @click="handleCheckotherChange">反选</button>
                <button  style="width: 22%;margin:5px;padding: 5px;cursor:pointer;" @click="CloseSelectEvent">确 定</button>
                <button  style="width: 22%;margin:5px;padding: 5px;cursor:pointer;" @click=" CloseSelectEventer">取消</button>
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
<!--        <div class="mediaBanner index-model m-t-10" style="width: 1150px;margin-top: 10px;position:relative;overflow:hidden;border-radius: 4px"><img class="guanggaotu" width="100%" src="../assets/img/advert.png"></div>-->

        <div class="football_match">           
            <div class="match-data">               
                <div class="match-card" style="font-size: 14px;color:#666;height: 30px; line-height: 30px;background: linear-gradient(270deg, rgb(119, 213, 245) 0%, rgb(55, 186, 243) 33%, rgb(56, 186, 243) 52%, rgb(73, 192, 244) 67%, rgb(2, 167, 240) 100%);">
                    <div class="text" style="width: 120px;text-align: right;color:white">
<!--                        <el-checkbox class = "checked" v-model="checkedAll" @change='checked_All' v-if="type != 4"></el-checkbox>-->
<!--                        <el-checkbox class = "checked" v-model="checkedAll_hot" @change='checked_All' v-else></el-checkbox>-->
                        <span>赛事</span>                       
                    </div>
                    <div class="event_time" :style="{width: '90px'}">      <!--(type == 3 ? '70px' :  -->
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
                    <div class="follow" v-if="type != 3"  style="color:white">
                        <span>功能</span>
                    </div>                   
                </div>
            </div>
        </div>
        <div ref="jinqiutishikuang" style="display:none;position:fixed;top:100px;z-index:9998;left:39%;width:400px;height:80px;padding-left:50px;padding-top:22px;background:url('https://api.daoyunxiang.com/static/images/jinqiu.png');background-size:100%;" >
<!--        <div ref="jinqiutishikuang" style="display:none;position:fixed;top:100px;z-index:9998;left:39%;width:400px;height:80px;padding-left:50px;padding-top:22px;background:url('https://api.daoyunxiang.com/static/images/jinqiu.png');background-size:100%;" v-for="(item,index) in jinqiutishikuangDate">-->
            <img id="zhuanqiuq"   :class="{go:rotate , aa :!rotate}"  width="35px" src="../assets/img/zuqiuzz.png">
            <div style="margin-left: 30px;position: relative;top: -52px;text-align: center">
                <span style="color:grey; font-size :13px">一度体育</span><br><br>
                <span style="color:#F9A60C;font-weight: bold;font-size:14px">{{jqfwenben}}</span>  -  <span style="font-size:14px">{{wjfwenben}}</span></div> <br><button @click="closetisshi" style="padding: 5px;position: relative;top: -135px; left: 350px;">×</button>
        </div>

        <div ref="kejinqiutishikuang" style="display:none;position:fixed;z-index:9999;top:200px;left:39%;width:400px;height:80px;padding-left:20px;padding-top:20px;background:url('https://api.daoyunxiang.com/static/images/jinqiuke.png');background-size:100%;">
            <img style="position: relative;left:310px;"  :class="{go2:rotate2 , aa :!rotate2}"  width="35px" src="../assets/img/zuqiuzz.png">
            <div style="margin-left: 30px;position: relative;top: -50px;left:-30px;text-align: center">  <span style="color:grey; font-size :13px">一度体育<br><br>
            </span><span style="font-size:14px"> {{jqfwenben}}  </span> - <span style="color:#5BBEDB;font-weight: bold;font-size:14px"> {{wjfwenben}}</span>
            </div>
            <br><button @click="closetisshi" style="padding: 5px;position: relative;top: -140px; left: 360px;">×</button>
        </div>
        <audio src="https://api.daoyunxiang.com/static/pormpt/victory.mp3" controls  id="audiooo" hidden="true" muted></audio>
        <footSticky :football="football_sticky_list" :type="type" @hidefoot="hidefoot" :iszhujin="iszhujin" :iskejin="iskejin" :state="title.conduct" @CancelfootSticky="CancelfootSticky" v-if="type == 0 || type == 4">
        </footSticky>

        <template v-if="!is_load">
            <div v-if = 'is_hot == 0'>
                <div v-if="type == 0 || type == 2">
                    <div class="football_title" v-if="type == 0 && football_conduct_list.length > 0 && title.conduct == 2" >
                        <div class = "title" >
                            <img width="20px" src="@/assets/img/icon-101.png"/>
                            <span id="playing">正在进行的比赛</span>
                        </div>
                    </div>
                    
                    <foot  ref="ch" :football="football_conduct_list"  :isclosed="isclosed" :type="type" :iszhujin="iszhujin" :whichcom="whichcom" :iskejin="iskejin" :state="title.conduct" :isfont="isfont" :shujuTrID="shujuTrID" @hidefoot="hidefoot" @follow="follow" @footSticky="footSticky"></foot>
                </div>

                <div v-if="type == 0 || type == 1">
                    <div class="football_title" v-if="type == 0 && football_not_list.length > 0 && title.not == 8">
                        <div class = "title">
                            <img width="20px" src="@/assets/img/icon-102.png"/>
                            <span id="waiting">未开始的比赛</span>
                        </div>
                    </div>
                                <foot :football="football_not_list" :type="type" :whichcom="whichcom" :state="title.not" :isfont="isfont" :shujuTrID="shujuTrID" @follow="follow" @hidefoot="hidefoot" @footSticky="footSticky"></foot>
                </div>

                <div v-if="type == 0 || type == 3">
                    <div class="football_title" v-if="type == 0 && football_end_list.length > 0 && title.end == 1">
                        <div class = "title">
                            <img width="20px" src="@/assets/img/icon-103.png"/>
                            <span id="ended">已完结的比赛</span>
                        </div>
                    </div>

                    <foot :football="football_end_list" :type="type" :state="title.end" :whichcom="whichcom" :shujuTrID="shujuTrID" @follow="follow" @hidefoot="hidefoot" @footSticky="footSticky"></foot>
                </div>
                <div v-if="type == 0 || type == 1">
                    <div class="football_title" v-if="type == 0 && football_abnormal_list.length > 0 && title.end == 1">
                        <div class = "title">
                            <img width="20px" src="@/assets/img/icon-103.png"/>
                            <span id="abnormal">异常的比赛</span>
                        </div>
                    </div>
                    <foot :football="football_abnormal_list" :type="type" :state="title.end" :whichcom="whichcom" :shujuTrID="shujuTrID" @follow="follow" @hidefoot="hidefoot" @footSticky="footSticky"></foot>
                </div>
            </div>

            <div v-else-if="is_hot == 1">
                <div v-if="type == 4">
                    <div class="football_title" v-if="football_hot_conduct_list.length > 0 && title.hot_conduct == 1" >
                        <div class = "title">
                            <img width="20px" src="@/assets/img/icon-101.png"/>
                            <span>正在进行的比赛</span>
                        </div>
                    </div>
                    
                    <foot ref="foot" :football="football_hot_conduct_list" :iszhujin="iszhujin"  :whichcom="whichcom" :iskejin="iskejin" :shujuTrID="shujuTrID" @hidefoot="hidefoot" :type="type" @follow="follow" @footSticky="footSticky"></foot>
                </div>

                <div v-if="type == 4" >
                    <div class="football_title" v-if="football_hot_not_list.length > 0 && title.hot_not == 8">
                        <div class = "title">
                            <img width="20px" src="@/assets/img/icon-102.png"/>
                            <span>未开始的比赛</span>
                        </div>
                    </div>
                            
                    <foot :football="football_hot_not_list" :type="type"  :whichcom="whichcom" :shujuTrID="shujuTrID" @follow="follow"  @hidefoot="hidefoot" @footSticky="footSticky"></foot>
                </div>

                <div v-if="type == 4">
                    <div class="football_title" v-if="football_hot_end_list.length > 0 && title.hot_end == 1">
                        <div class = "title">
                            <img width="20px" src="@/assets/img/icon-103.png"/>
                            <span>已完结的比赛</span>
                        </div>
                    </div>
                    <foot :football="football_hot_end_list" :type="type" @follow="follow"  :whichcom="whichcom" :shujuTrID="shujuTrID" @hidefoot="hidefoot" @footSticky="footSticky"></foot>
                </div>
            </div>
            <div  style="margin-top:30px"><div class="football-footer m-t-20 m-b-20"><div class="top" style="margin-top: 100px;">
                <div style="height:55px;background-color: #f7f7f8;width: 130px;text-align: center;font-size: 16px;color: #787878;float:left;padding-top: 17px;">图例说明</div>
                <div style="width: 1020px;height:55px;background-color:white;float:left;padding: 15px;font-size: 12px;"><span style="margin: 0 10px;">
                <img width="15px" src="../assets/img/syzqico2.png">   进球</span>
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
                <span style="margin: 0 10px;"><img width="15px" src="https://soket.daoyunxiang.com/icon/xing.png">   收藏</span></div></div>
                </div></div>

<!--            <no-data v-else-if="football_sticky_list.length == 0 && is_hot == 2"></no-data>-->
        </template> 
        <div class = "load" v-else>
            <img src="@/assets/loading.gif" />
        </div>

    </div>   
</template>

<script>


        var wser = new WebSocket("wss://soket.daoyunxiang.com:8989");
        wser.onmessage = function (evt) {
            var receivedmsg = evt.data;
            immediater(receivedmsg);
        }

        setTimeout(function () {
            oIndex
            tIndex
            sIndex
            fIndex

        },30000)
import noData from "@/components/noData.vue";
import notHave from "@/components/notHave.vue";
import foot from "@/components/foot.vue";

import pormpt from "@/components/pormpt.vue";
import footSticky from "@/components/footSticky.vue";
import config from "_s/config.js";
import {Getfootball,FollowFootball,CancelFollowFootball,selectsaishier} from '@/api'
    import footerbar from "@/components/footerbar.vue";
export default {
    name: "Football",
    components: {
        noData,
        notHave,
        foot,
        pormpt,
        footSticky,
        footerbar
    },
    data() {
        return {
            classify: [
//                {'name':'全部','type' : 0, 'active': true},
//                {'name':'热门','type' : 4, 'active': false},
               {'name':'即时','type' : 0, 'active': true},
                {'name':'赛果','type' : 3, 'active': false},
                {'name':'赛程','type' : 1, 'active': false},
                // {'name':'完整','type' : 0, 'active': true},
            ],
            week: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            select_date: [],
            schedule: [],
            filter_time:'',
            football_end_list: [],
            football_abnormal_list: [],
            football_not_list: [],
            football_conduct_list: [],
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
            is_hot:0,
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
            hidefootball:[],
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
            shujuTrID:null,
            selcet:1,
            isclosed:0,
            oIndex:null,
            tIndex:null,
            sIndex:null,
            fIndex:null,

        };
    },

    watch:{        
        filter_time(val){
            this.time = val
            this.football()
        }
    },

    mounted() {
        window.immediater = this.immediater;
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
        }
        
        let format = this.format_date(0)
        this.time = format.now
       
        this.football()

        let retainfoot = JSON.parse(window.localStorage.getItem("retainEvnet_foot_"+this.time));
        this.hidefootball = retainfoot ? retainfoot :[]
        this.retainfootball = parseInt(this.total - this.hidefootball.length)
        // let sticky_id = JSON.parse(window.localStorage.getItem("sticky_foot_"+this.time));
        // sticky_id = sticky_id ? sticky_id:[]
        // if(sticky_id.length > 0){
        //     console.log(sticky_id)
        //
        //     this.filterSticky(this.football_conduct_list,sticky_id)
        //     this.filterSticky(this.football_not_list,sticky_id)
        //     this.filterSticky(this.football_end_list,sticky_id)
        //     this.filterSticky(this.football_hot_conduct_list,sticky_id)
        //     this.filterSticky(this.football_hot_not_list,sticky_id)
        //     this.filterSticky(this.football_hot_end_list,sticky_id)
        // }
        this.selectsaishi();
      setInterval(this.restart, 100000);
    },

    created() {
        window.addEventListener('scroll', this.jtscroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.jtscroll);
    },
    methods: {
        showcompany()
        {
            if(this.$refs.oddscomk.style.display=='none'){
                this.$refs.oddscomk.style.display='block';
            }else{
                this.$refs.oddscomk.style.display='none';
            }
            var companyan=document.getElementById("companyan");
            this.$refs.oddscomk.style.left=companyan.offsetLeft+'px';
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
        handleCheckAllChange(val) {
            this.isIndeterminate = false;



          if(this.checkedCities.length>0){
              this.checkedCities =[];
              for(var h=0;h<this.saishilstdata.length;h++){


                  $('.el-checkbox__input').removeClass('is-checked')
                  $('.el-checkbox').removeClass('is-checked')

              }


          }else{
              for(var h=0;h<this.saishilstdata.length;h++){
                  this.checkedCities[h]=this.saishilstdata[h].id;



                 $('.el-checkbox__input').addClass('is-checked')
                  $('.el-checkbox').addClass('is-checked')

              }
          }
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
            this.whichcom=com;
            if(com==2){
                this.comnow='BET365';
            }else if(com==10){
                this.comnow='易胜博';
            }else if(com==11){
                this.comnow='韦德';
            }else if(com==14){
                this.comnow='12bet';
            }else if(com==19){
                this.comnow='竞彩官方';
            }else if(com==3){
                this.comnow='皇冠';
            }else if(com==5){
                this.comnow='立博';
            }else if(com==7) {
                this.comnow = '澳彩';
            }else{
                this.comnow = '威廉希尔';
            }
            this.$refs.oddscomk.style.display='none';
        },
        changehotevent(event,chang)
        {
            this.hoteventtool=event;
            this.select_event_id[0]=event;
            if(this.select_event_id.length > 0 || this.click_event){
                this.football()
            }
            for (var ll = 0; ll < this.football_conduct_list.length; ll++) {
                if (this.football_conduct_list[ll]["id"] != event) {
                    this.hidefootball.push(this.football_conduct_list[ll]["id"]);
                }

            }
            for (var ll = 0; ll < this.football_not_list.length; ll++) {
                if (this.football_not_list[ll]["id"] != event) {
                    this.hidefootball.push(this.football_not_list[ll]["id"]);
                }

            }
            for (var ll = 0; ll < this.football_end_list.length; ll++) {
                if (this.football_end_list[ll]["id"] != event) {
                    this.hidefootball.push(this.football_end_list[ll]["id"]);
                }

            }
        },
        hanlezoushidata(value){
            let checkedCount = value.length;
            this.checkAller = checkedCount === this.zoushidata.length;
            this.isIndeterminateer = checkedCount > 0 && checkedCount < this.zoushidata.length;
        },
        handleCheckotherChange(){
                 var newarray=[];
                for(var h=0;h<this.saishilstdata.length;h++){
                    if(this.checkedCities.includes(this.saishilstdata[h].id)==false){
                        newarray.push(this.saishilstdata[h].id);
                    }

                }
            this.checkedCities=newarray;
        },

        handleCheckotherChanger(){
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
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.saishilstdata.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.saishilstdata.length;
        },
        async selectsaishi(){
            let res = await selectsaishier()
            this.saishilstdata=res
        },
        async football(){                                     //调数据接口
            let events_id = ''
            if(this.select_event_id.length > 0){
                events_id = this.select_event_id.toString()
            }

            let data = {
                'uid' : this.user_id,
                "type" : 0,
                "time" : this.time,
                "events_id":events_id,
                "pici":this.fenpijz
            }
            //this.is_load = 1
            let res = await Getfootball(data)
            if((res.code == 0 || res.code == 200) && res.code !== null && res.code !== undefined){

                this.is_load = 0
                this.click_event = false
                let record = res.info

                this.football_end_list = record.end.length > 0 ? record.end : []
                this.football_not_list = record.not.length > 0 ? record.not : []
                this.football_abnormal_list = record.abnormal.length > 0 ? record.abnormal : []
                this.football_conduct_list = record.conduct.length > 0 ? record.conduct : []

                this.football_hot_end_list = record.hot.end.length > 0 ? record.hot.end : []
                this.football_hot_not_list = record.hot.not.length > 0 ? record.hot.not : []
                this.football_hot_conduct_list = record.hot.conduct.length > 0 ? record.hot.conduct : []
                
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
                    if(state_conduct && state_end && state_not){                        
                        this.is_hot = 2
                    }
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

        },
        closetisshi()
        {
            this.$refs.kejinqiutishikuang.style.display = "none";
            this.$refs.jinqiutishikuang.style.display = "none";
        },
        brush_time(index){
            let date = ''           
            this.select_date.forEach((val,key) => {
                if(key == index){
                    this.select_date[index].active = true;
                    if(val.time == "今天"){  
                        let format = this.format_date(0)                     
                        date = format.now
                    }else{
                        date = val.time
                    }                   
                }else{
                    this.select_date[key].active = false;
                }
            })

            this.classify.forEach((item, index) => {
                if (index == 0) {
                    item.active = true;
                    this.type = item.type
                } else {
                    item.active = false;
                }
            }); 

            this.time = date
            this.select_event_id = []
            this.football()
        }, 

        async follow(data){ 
            let football = data.foot
            let index = data.index
            let type = football.type 
            if(!this.user){
                this.$parent.showLogin = true             
            }else{
                if(football.collect == 0){                    
                    let data = {
                        "event" : JSON.stringify(football),
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
                        gzxing.src='https://soket.daoyunxiang.com/dianxx.png';
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
                       this.$set(this.event, i,val)
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

        CloseSelectEvent(){
            this.$refs.sskuanger.style.display = "none";
            this.drawer = false
            this.search_events = true
            this.is_event = false
            this.select_event_id=this.checkedCities;
            if((this.select_event_id.length > 0 && this.select_event_id.length !== null)|| this.click_event){
                this.football()
            }                    
        },
        CloseSelectEventer(){
            this.$refs.sskuanger.style.display = "none";
        },
        select_event(){
            this.is_event = 1
            this.drawer = true
        },
       
        select_type(val, i) {
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
                    if(this.type == 3){
                        let date = this.format_date(i,"reduce")
                        active = i == 0 ? true : false;                      
                        if(date.time=="今天" && date.now == this.time){
                            active = true
                        }
                        this.select_date.unshift({"time":date.time,"week":date.week,"active":active})  
                    }

                    if(this.type == 0){
                        let date = this.format_date(i,"add")
                        active = date.time == this.time ? true : false;
                        if(date.time=="今天" && date.now == this.time){
                            active = true
                        }
                                           
                        this.select_date.push({"time":date.time,"week":date.week,"active":active})
                    }                                   
                }
            }

            if(this.type == 1){
                let format = this.format_date(0)               
                for(let i = 0; i <= 6; i++){
                    let date = this.format_date(i,'add')                    
                    let week = {
                        "time":date.time,
                        "week":date.week,
                        'active':i == 0 ? true : false
                    }                                        
                    this.select_date.push(week)
                }

                if(this.time != format.now){
                    this.select_date.forEach((val,i) => {
                        if(val.time == this.time){
                            val.active = true
                        }else{
                            val.active = false
                        }
                    })
                }               
            }

            if(this.type == 4){      
                this.is_hot = 1         
                if(this.football_hot_end_list.length == 0 && this.football_hot_not_list.length == 0 && this.football_hot_conduct_list.length == 0){
                    this.is_hot = 2
                }
                
                let state_conduct = this.is_retainfoot(this.football_hot_conduct_list)
                let state_end = this.is_retainfoot(this.football_hot_end_list)
                let state_not = this.is_retainfoot(this.football_hot_not_list)
                if(!state_conduct && !state_end && !state_not){                        
                    this.is_hot = 2
                } 
            }else{                
                this.is_hot = 0
                if(this.football_end_list.length == 0 && this.football_not_list.length == 0 && this.football_conduct_list.length == 0){
                    this.is_hot = 2
                }
            }

            this.format_event(this.type)
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
              if(this.$refs.weizhankaid.style.display=='none'){
                  this.$refs.weizhankaid.style.display="inline";
                  this.kaiorhe=2;
              }else{
                  this.$refs.weizhankaid.style.display="none";
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

            var zssjann=document.getElementById("xzzsan");
            this.$refs.zssjkuang.style.left=zssjann.offsetLeft+'px';

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
            if(type==1){
                this.compafocus=1;
            }else{
                this.compafocus=0;
            }
        },

        showfoot(){
            if(this.hoteventtool!=0){
                this.hidefootball = []
                this.hoteventtool=0;
                this.select_event_id=[];
                this.football()

                return
            }
            window.localStorage.removeItem("retainEvnet_foot_"+this.time);
            if(this.hidefootball.length>50){
                this.hidefootball = []
                this.title.conduct = 1
                this.title.end = 1
                this.title.not = 8
                this.title.hot_not = 8
                this.title.hot_end = 1
                this.title.hot_conduct = 1
                this.football()
            }
            this.hidefootball = []
            this.retainfootball = this.total
            this.is_hot = 0

            this.showFootList(this.football_conduct_list)
            this.showFootList(this.football_not_list)
            this.showFootList(this.football_end_list)
            this.showFootList(this.football_hot_conduct_list)
            this.showFootList(this.football_hot_end_list)
            this.showFootList(this.football_hot_not_list)

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
            if(this.type != 4){
                let state_conduct = this.is_retainfoot(this.football_conduct_list)
                let state_not = this.is_retainfoot(this.football_not_list)
                if(!state_conduct && !state_not){
                    this.$message({
                        message: '请选择要关注的赛事',
                        type: "warning",
                    });

                    return
                } 
                
                let football = []                
                let conduct = this.followEventlist(this.football_conduct_list,'conduct')
                if(conduct){
                    conduct.forEach((v,i) =>{
                        football.push(v)                     
                    })
                }

                let not = this.followEventlist(this.football_not_list,'not')
                if(not){
                    not.forEach((v,i) =>{
                        football.push(v)                      
                    })
                }

                if(football.length > 0){
                    let data = []
                    let foot_id = []
                    football.forEach((v,i) =>{
                        if(i < 20){                            
                            data.push(v)
                            foot_id.push(v.id)
                        }                       
                    })

                    this.batchfollowfoot(data,foot_id,0)
                }                
            }else{
                let state_conduct = this.is_retainfoot(this.football_hot_conduct_list)
                let state_not = this.is_retainfoot(this.football_hot_not_list)
                if(!state_conduct && !state_not){
                    this.$message({
                        message: '请选择要关注的赛事',
                        type: "warning",
                    });

                    return
                }

                let football = []               
                let hot_conduct = this.followEventlist(this.football_hot_conduct_list,'hot_conduct')
                if(hot_conduct){
                    hot_conduct.forEach((v,i) =>{
                        football.push(v)                     
                    })
                }

                let hot_not = this.followEventlist(this.football_hot_not_list,'hot_not') 
                if(hot_not){
                    hot_not.forEach((v,i) =>{
                        football.push(v)                     
                    })
                }

                if(football.length > 0){
                    let data = []
                    let foot_id = []
                    football.forEach((v,i) =>{
                        if(i < 20){                            
                            data.push(v)
                            foot_id.push(v.id)
                        }                       
                    })

                    this.batchfollowfoot(data,foot_id,1)
                }
            }
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

        footSticky(foot){
            let football = foot.foot  
            let type = foot.type
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
                }                
                window.localStorage.setItem("sticky_foot_"+this.time,JSON.stringify(sticky_id))
            }else{
                sticky.push(football)
                sticky_id.push(football.id)
                this.StickyUpdateFoot(football,index,type)
                window.localStorage.setItem("sticky_foot_"+this.time,JSON.stringify(sticky_id))
            }
        },

        CancelfootSticky(foot){
            let football = foot.foot  
            let type = foot.type
            let index = foot.index
            let list =[]

            switch(football.type){
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
            this.is_search = 1
        },

        showSearch(){
            this.is_search = 0

        },
        submitSearch(){     //搜索

            //并没有输入关键字时，就不要再搜索了
            if(this.likefoot===''||this.likefoot==null){

                return;
            }

            let likefoot = this.likefoot
            let isfont = this.font
            let shujuTrID
            let football_conduct_list = this.football_conduct_list
            let football_end_list = this.football_end_list
            let football_not_list = this.football_not_list
            let football_abnormal_list = this.football_abnormal_list
            let football_hot_end_list = this.football_hot_end_list
            let football_hot_not_list = this.football_hot_not_list
            let football_hot_conduct_list = this.football_hot_conduct_list

            this.football_conduct_list.forEach(function (element,index) {

                if (element.deputy_name.indexOf(likefoot) >= 0)
                {
                    isfont = 1
                    shujuTrID = (football_conduct_list)[index].id

                }else if(element.main_name.indexOf(likefoot) >= 0)
                {
                    isfont = 1
                    shujuTrID = (football_conduct_list)[index].id
                }else if(element.short_name_zh.indexOf(likefoot) >= 0)
                {
                    isfont = 1
                    shujuTrID = (football_conduct_list)[index].id
                }

            })

            this.football_end_list.forEach(function (element,index) {
                if (element.deputy_name.indexOf(likefoot) >= 0)
                {
                    isfont = 1
                    shujuTrID = (football_end_list)[index].id

                }else if(element.main_name.indexOf(likefoot) >= 0)
                {

                    isfont = 1
                    shujuTrID = (football_end_list)[index].id

                }else if(element.short_name_zh.indexOf(likefoot) >= 0)
                {

                    isfont = 1
                    shujuTrID = (football_end_list)[index].id
                }

            })
            this.football_not_list.forEach(function (element,index) {
                if (element.deputy_name.indexOf(likefoot) >= 0)
                {
                    isfont = 1
                    shujuTrID = (football_not_list)[index].id

                }else if(element.main_name.indexOf(likefoot) >= 0)
                {

                    isfont = 1
                    shujuTrID = (football_not_list)[index].id

                }else if(element.short_name_zh.indexOf(likefoot) >= 0)
                {

                    isfont = 1
                    shujuTrID = (football_not_list)[index].id
                }

            })
            this.football_abnormal_list.forEach(function (element,index) {
                if (element.deputy_name.indexOf(likefoot) >= 0)
                {
                    isfont = 1
                    shujuTrID = (football_abnormal_list)[index].id

                }else if(element.main_name.indexOf(likefoot) >= 0)
                {

                    isfont = 1
                    shujuTrID = (football_abnormal_list)[index].id

                }else if(element.short_name_zh.indexOf(likefoot) >= 0)
                {

                    isfont = 1
                    shujuTrID = (football_abnormal_list)[index].id
                }

            })
            this.football_hot_end_list.forEach(function (element,index) {
                if (element.deputy_name.indexOf(likefoot) >= 0)
                {
                    isfont = 1
                    shujuTrID = (football_hot_end_list)[index].id

                }else if(element.main_name.indexOf(likefoot) >= 0)
                {

                    isfont = 1
                    shujuTrID = (football_hot_end_list)[index].id

                }else if(element.short_name_zh.indexOf(likefoot) >= 0)
                {

                    isfont = 1
                    shujuTrID = (football_hot_end_list)[index].id
                }

            })
            this.football_hot_not_list.forEach(function (element,index) {
                if (element.deputy_name.indexOf(likefoot) >= 0)
                {
                    isfont = 1
                    shujuTrID = (football_hot_not_list)[index].id

                }else if(element.main_name.indexOf(likefoot) >= 0)
                {

                    isfont = 1
                    shujuTrID = (football_hot_not_list)[index].id

                }else if(element.short_name_zh.indexOf(likefoot) >= 0)
                {

                    isfont = 1
                    shujuTrID = (football_hot_not_list)[index].id
                }

            })
            this.football_hot_conduct_list.forEach(function (element,index) {
                if (element.deputy_name.indexOf(likefoot) >= 0)
                {
                    isfont = 1
                    shujuTrID = (football_hot_conduct_list)[index].id

                }else if(element.main_name.indexOf(likefoot) >= 0)
                {

                    isfont = 1
                    shujuTrID = (football_hot_conduct_list)[index].id

                }else if(element.short_name_zh.indexOf(likefoot) >= 0)
                {

                    isfont = 1
                    shujuTrID = (football_hot_conduct_list)[index].id
                }

            })

            this.isfont = isfont
            this.shujuTrID = shujuTrID
        },
        goAnchor(id){
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
        endhide()
        {
            this.$refs.jinqiutishikuang.style.display="none";
            this.iskejin=-1;
            this.iszhujin=-1;
            this.$refs.kejinqiutishikuang.style.display="none";
        },
        immediater(data)
        {
            if(data!==undefined){
                var data=JSON.parse(data);

                 if(data.sport_id==1 && data.type=='matches'){
                    if(this.football_conduct_list.length>0) {

                        //红牌 黄牌 主场进球 客场进球 红牌  黄牌  主场半场  客场半场  主场角球  半场角球

                        // if(data.homeodds>0){              //亚指数
                        //     //平局
                        //     $('#drawodds'+ data.match_id).html(data.drawodds)
                        //     // console.log(data.drawodds)
                        //     // 主场
                        //     $('#homeodds'+ data.match_id).html(data.homeodds)
                        //     //客场
                        //     $('#awayodds'+ data.match_id).html(data.awayodds)
                        //     //是否封盘
                        //       this.isclosed = data.isclosed;
                        //     console.log(data.isclosed)
                        //
                        //
                        // }
                        // else if(data.homeoddsou>0 || data.awayoddsou>0){             //大小球
                        //     if(data.homeoddsou> $('#homeoddsou'+ data.match_id).text()){
                        //         this.ouzhishu='#de1e30';
                        //         let that=this;
                        //         let iii=ii;
                        //         // setTimeout(function () {
                        //         //     that.ouzhishu='#666'
                        //         // }, 3000);
                        //     }else if(data.homeoddsou< $('#homeoddsou'+ data.match_id).text()){
                        //         this.ouzhishu='#85c900';
                        //         let that=this;
                        //         let iii=ii;
                        //         // setTimeout(function () {
                        //         //     that.ouzhishu='#666'
                        //         // }, 3000);
                        //     }
                        //     if(data.awayoddsou< $('#awayoddsou'+ data.match_id).text()){
                        //         this.ouzhishu='#85c900';
                        //         let that=this;
                        //         let iii=ii;
                        //         // setTimeout(function () {
                        //         //     that.ouzhishu='#666'
                        //         // }, 3000);
                        //     }else if(data.awayoddsou> $('#awayoddsou'+ data.match_id).text()){
                        //         this.ouzhishu='#de1e30';
                        //         let that=this;
                        //         let iii=ii;
                        //         // setTimeout(function () {
                        //         //     that.ouzhishu='#666'
                        //         // }, 3000);
                        //     }
                        //
                        //     //平局
                        //     $('#drawoddsou'+ data.match_id).html(data.drawoddsou)
                        //     // console.log(data.drawodds)
                        //     // 主场
                        //     $('#homeoddsou'+ data.match_id).html(data.homeoddsou)
                        //     //客场
                        //     $('#awayoddsou'+ data.match_id).html(data.awayoddsou)
                        //     //是否封盘
                        //     this.isclosed = data.isclosed;
                        //     if(parseInt(data.bstime)>0  && parseInt(data.bstime)<110){
                        //         $('#bstime' + data.match_id).html(data.bstime)
                        //     }
                        // }
                        //  if (parseInt(data.awayscore) > $('#kechangIN'+ data.match_id +"").text() && parseInt(data.awayscore)>0) {
                        //
                        //     //this.iskejin = this.football_conduct_list[ii].id;
                        //     this.$refs.kejinqiutishikuang.style.display = "inline";
                        //     this.$refs.jinqiutishikuang.style.display = "none";
                        //     this.rotate = !this.rotate;
                        //     this.rotate2 = !this.rotate2;
                        //     this.wjfwenben = data.awayscore + '   ' + $('#kechangName'+ data.match_id).text() + '   ' +$('#bstime'+ data.match_id).text()+"'";
                        //     this.jqfwenben = $('#zhuchangName'+ data.match_id +"").text() + '   ' + data.homescore;
                        //     // let paly_url = JSON.parse(window.localStorage.getItem("paly_url"));
                        //     // document.getElementById("audiooo").src = paly_url.url;
                        //     // document.getElementById("audiooo").load();
                        //     // document.getElementById("audiooo").play();
                        //     let _this = this;
                        //     let timerr = setTimeout(this.endhide, 6500);
                        //
                        //     //客场全场进球
                        //     $('#kechangIN'+ data.match_id +"").html(data.awayscore)
                        //     //客场半场
                        //     $('#kechanghalf'+ data.match_id +"").html(data.awayhalfscore)
                        //     //客场角球
                        //     $('#deputykick'+ data.match_id +"").html(data.awayjiaoscore)
                        //  }else {
                        //     if (parseInt(data.bstime) > 0 && parseInt(data.bstime) < 110) {
                        //         $('#bstime' + data.match_id).html(data.bstime)
                        //     }
                        //     if (parseInt(data.redhome) > 0) {
                        //         $('#redhome' + data.match_id).html(data.redhome)
                        //     }
                        //     if (parseInt(data.yellowhome) > 0) {
                        //         $('#yellowhome' + data.match_id).html(data.yellowhome)
                        //     }
                        //     if (parseInt(data.yellowaway) > 0) {
                        //         $('#yellowaway' + data.match_id).html(data.yellowaway)
                        //     }
                        //     if (parseInt(data.redaway) > 0) {
                        //         $('#redaway' + data.match_id).html(data.redaway)
                        //     }
                        //     //主场进球
                        //     //
                        //     if (parseInt(data.homescore) > $('#zhuchangIN' + data.match_id + "").html(data.homescore) && parseInt(data.homescore) > 0) {
                        //         // let noticdedata = JSON.parse(window.localStorage.getItem("isnoticed"+this.time));
                        //         // if(noticdedata.indexOf(data.match_id+'>'+data.homescore+':'+awayscore)==-1) {
                        //         this.iszhujin = this.football_conduct_list[ii].id;
                        //         this.$refs.jinqiutishikuang.style.display = "inline";
                        //         this.$refs.kejinqiutishikuang.style.display = "none";
                        //         this.rotate = !this.rotate;
                        //         this.wjfwenben = data.awayscore + '   ' + $('#kechangName' + data.match_id).text() + '   ' + $('#bstime' + data.match_id).text() + "'";
                        //         this.jqfwenben = $('#zhuchangName' + data.match_id + "").text() + '   ' + data.homescore;
                        //         let paly_url = JSON.parse(window.localStorage.getItem("paly_url"));
                        //         document.getElementById("audiooo").src = paly_url.url;
                        //         document.getElementById("audiooo").load();
                        //         document.getElementById("audiooo").play();
                        //         let _this = this;
                        //         let timerr = setTimeout(this.endhide, 6500);
                        //         // }
                        //         //主场全场进球
                        //         $('#zhuchangIN' + data.match_id + "").html(data.homescore)
                        //         //主场半场
                        //         $('#zhuchanghalf' + data.match_id + "").html(data.homehalfscore)
                        //         //主场角球
                        //         $('#mainkick' + data.match_id + "").html(data.homejiaoscore)
                        //
                        //
                        //         // if(noticdedata.length>0){
                        //         //     noticdedata.push(data.match_id+'>'+data.homescore+':'+awayscore);
                        //         // }else{
                        //         //     noticdedata[0]=  data.match_id+'>'+data.homescore+':'+awayscore;
                        //         // }
                        //         // window.localStorage.setItem("isnoticed"+this.time,JSON.stringify(noticdedata))
                        //     }
                        //     // for (var ii = 0; ii < this.football_conduct_list.length; ii++) {
                        //     //     console.log(this.football_conduct_list[ii].deputy_fraction)
                        //     // }
                        // }
                        //主场半场


                        for (var ii = 0; ii < this.football_conduct_list.length; ii++) {
                            if (this.football_conduct_list[ii].id == data.match_id) {
                                if(data.homeodds>0){
                                    this.football_conduct_list[ii].drawodds = data.drawodds;
                                    this.football_conduct_list[ii].homeodds = data.homeodds;
                                    this.football_conduct_list[ii].awayodds = data.awayodds;
                                    this.football_conduct_list[ii].isclosed = data.isclosed;
                                 }else if(data.homeoddsou>0 || data.awayoddsou>0){
                                    if(data.homeoddsou> this.football_conduct_list[ii].homeoddsou){
                                        this.football_conduct_list[ii].ouzhishu='#de1e30';
                                        let that=this;
                                        let iii=ii;
                                        this.oIndex = setTimeout(function () {
                                            that.football_conduct_list[iii].ouzhishu='#666'

                                        }, 3000);
                                    }else if(data.homeoddsou< this.football_conduct_list[ii].homeoddsou){
                                        this.football_conduct_list[ii].ouzhishu='#85c900';
                                        let that=this;
                                        let iii=ii;
                                        this.tIndex = setTimeout(function () {
                                            that.football_conduct_list[iii].ouzhishu='#666'

                                        }, 3000);
                                    }
                                    if(data.awayoddsou< this.football_conduct_list[ii].awayoddsou){
                                        this.football_conduct_list[ii].ouzhishu='#85c900';
                                        let that=this;
                                        let iii=ii;
                                        this.sIndex = setTimeout(function () {
                                            that.football_conduct_list[iii].ouzhishu='#666'

                                        }, 3000);
                                    }else if(data.awayoddsou> this.football_conduct_list[ii].awayoddsou){
                                        this.football_conduct_list[ii].ouzhishu='#de1e30';
                                        let that=this;
                                        let iii=ii;
                                        this.fIndex =  setTimeout(function () {
                                            that.football_conduct_list[iii].ouzhishu='#666'

                                        }, 3000);
                                    }

                                    this.football_conduct_list[ii].drawoddsou = data.drawoddsou;
                                    this.football_conduct_list[ii].homeoddsou = data.homeoddsou;
                                    this.football_conduct_list[ii].awayoddsou = data.awayoddsou;
                                    this.football_conduct_list[ii].isclosedou = data.isclosedou;
                                    if(parseInt(data.bstime)>0  && parseInt(data.bstime)<110){
                                        this.football_conduct_list[ii].bstime = data.bstime;
                                    }

                                }
                                else{  //其它情况
                                    if(parseInt(data.bstime)>0  && parseInt(data.bstime)<110){
                                        this.football_conduct_list[ii].bstime = data.bstime;
                                    }
                                    if(parseInt(data.redhome)>0){
                                        this.football_conduct_list[ii].redhome = parseInt(data.redhome);
                                    }
                                    if(parseInt(data.yellowhome)>0){
                                        this.football_conduct_list[ii].yellowhome = parseInt(data.yellowhome);
                                    }
                                    if(parseInt(data.yellowaway)>0){
                                        this.football_conduct_list[ii].yellowaway = parseInt(data.yellowaway);
                                    }
                                    if(parseInt(data.redaway)>0){
                                        this.football_conduct_list[ii].redaway = parseInt(data.redaway);
                                    }

                                    if (parseInt(data.homescore) > this.football_conduct_list[ii].main_fraction && parseInt(data.homescore)>0) {
                                        // let noticdedata = JSON.parse(window.localStorage.getItem("isnoticed"+this.time));
                                        // if(noticdedata.indexOf(data.match_id+'>'+data.homescore+':'+awayscore)==-1) {
                                        this.iszhujin = this.football_conduct_list[ii].id;
                                        this.$nextTick(() => {
                                            this.$refs.jinqiutishikuang.style.display = "inline";
                                            this.$refs.kejinqiutishikuang.style.display = "none";

                                        })

                                        this.rotate = !this.rotate;
                                        this.wjfwenben = data.awayscore + '   ' + this.football_conduct_list[ii].deputy_name+ '   ' +this.football_conduct_list[ii].bstime+"'";
                                        this.jqfwenben = this.football_conduct_list[ii].main_name + '   ' + data.homescore;
                                        // let paly_url = JSON.parse(window.localStorage.getItem("paly_url"));
                                        // document.getElementById("audiooo").src = paly_url.url;
                                        // document.getElementById("audiooo").load();
                                        // document.getElementById("audiooo").play();
                                        let _this = this;
                                        let timerr = setTimeout(this.endhide, 6500);
                                        // }
                                        this.football_conduct_list[ii].main_fraction = parseInt(data.homescore);
                                        this.football_conduct_list[ii].main_half_fraction = parseInt(data.homehalfscore);
                                        this.football_conduct_list[ii].main_kick = parseInt(data.homejiaoscore);

                                        // if(noticdedata.length>0){
                                        //     noticdedata.push(data.match_id+'>'+data.homescore+':'+awayscore);
                                        // }else{
                                        //     noticdedata[0]=  data.match_id+'>'+data.homescore+':'+awayscore;
                                        // }
                                        // window.localStorage.setItem("isnoticed"+this.time,JSON.stringify(noticdedata))
                                    }

                                else if (parseInt(data.awayscore) > this.football_conduct_list[ii].deputy_fraction && parseInt(data.awayscore)>0) {
                                    this.iskejin = this.football_conduct_list[ii].id;
                                    this.$refs.kejinqiutishikuang.style.display = "inline";
                                    this.$refs.jinqiutishikuang.style.display = "none";
                                    this.rotate = !this.rotate;
                                    this.rotate2 = !this.rotate2;
                                    this.wjfwenben = data.awayscore + '   ' + this.football_conduct_list[ii].deputy_name+ '   ' +this.football_conduct_list[ii].bstime+"'";
                                    this.jqfwenben = this.football_conduct_list[ii].main_name + '   ' + data.homescore;
                                    // let paly_url = JSON.parse(window.localStorage.getItem("paly_url"));
                                    // document.getElementById("audiooo").src = paly_url.url;
                                    // document.getElementById("audiooo").load();
                                    // document.getElementById("audiooo").play();
                                    let _this = this;
                                    let timerr = setTimeout(this.endhide, 6500);

                                    this.football_conduct_list[ii].deputy_fraction = parseInt(data.awayscore);
                                    this.football_conduct_list[ii].deputy_half_fraction = parseInt(data.awayhalfscore);
                                    this.football_conduct_list[ii].deputy_kick = parseInt(data.awayjiaoscore);


                                }
                                if (data.status == '8' || data.status == 8 ) { //状态是8就把此数据去掉，放入已完成列表
                                    this.football_conduct_list.splice(ii,1);
                                }

                                }
                             }

                         }

                      }
                    if(this.football_hot_conduct_list.length>0) {
                        for (var ii = 0; ii < this.football_hot_conduct_list.length; ii++) {

                            if (this.football_hot_conduct_list[ii].id == data.match_id) {
                                if(data.homeodds>0){
                                    this.football_hot_conduct_list[ii].drawodds = data.drawodds;
                                    this.football_hot_conduct_list[ii].homeodds = data.homeodds;
                                    this.football_hot_conduct_list[ii].awayodds = data.awayodds;
                                    this.football_hot_conduct_list[ii].isclosed = data.isclosed;

                                }else if(data.homeoddsou>0 || data.awayoddsou>0) {

                                    if (data.homeoddsou > this.football_hot_conduct_list[ii].homeoddsou) {
                                        this.football_hot_conduct_list[ii].ouzhishu = '#de1e30';
                                        let that = this;
                                        let iii = ii;
                                        setTimeout(function () {
                                            that.football_hot_conduct_list[iii].ouzhishu = '#666'
                                        }, 3000);
                                    } else if (data.homeoddsou < this.football_hot_conduct_list[ii].homeoddsou) {
                                        this.football_hot_conduct_list[ii].ouzhishu = '#85c900';
                                        let that = this;
                                        let iii = ii;
                                        setTimeout(function () {
                                            that.football_hot_conduct_list[iii].ouzhishu = '#666'
                                        }, 3000);
                                    }
                                    if (data.awayoddsou < this.football_hot_conduct_list[ii].awayoddsou) {
                                        this.football_hot_conduct_list[ii].ouzhishu = '#85c900';
                                        let that = this;
                                        let iii = ii;
                                        setTimeout(function () {
                                            that.football_hot_conduct_list[iii].ouzhishu = '#666'
                                        }, 3000);
                                    } else if (data.awayoddsou > this.football_hot_conduct_list[ii].awayoddsou) {
                                        this.football_hot_conduct_list[ii].ouzhishu = '#de1e30';
                                        let that = this;
                                        let iii = ii;
                                        setTimeout(function () {
                                            that.football_hot_conduct_list[iii].ouzhishu = '#666'
                                        }, 3000);
                                    }
                                    this.football_hot_conduct_list[ii].drawoddsou = data.drawoddsou;
                                    this.football_hot_conduct_list[ii].homeoddsou = data.homeoddsou;
                                    this.football_hot_conduct_list[ii].awayoddsou = data.awayoddsou;
                                    if(parseInt(data.bstime)>0  && parseInt(data.bstime)<110){
                                        this.football_hot_conduct_list[ii].bstime = data.bstime;
                                    }

                                    this.football_hot_conduct_list[ii].isclosedou = data.isclosedou;

                                }else{

                                    if(parseInt(data.bstime)>0 && parseInt(data.bstime)<110){
                                        this.football_hot_conduct_list[ii].bstime = data.bstime;
                                    }
                                    if(parseInt(data.redhome)>0){
                                    this.football_hot_conduct_list[ii].redhome = parseInt(data.redhome);
                                    }
                                    if(parseInt(data.yellowhome)>0){
                                        this.football_hot_conduct_list[ii].yellowhome = parseInt(data.yellowhome);
                                    }
                                   if(parseInt(data.yellowaway)>0){
                                       this.football_hot_conduct_list[ii].yellowaway = parseInt(data.yellowaway);
                                   }
                                    if(parseInt(data.redaway)>0){
                                        this.football_hot_conduct_list[ii].redaway = parseInt(data.redaway);
                                    }

                                    if (parseInt(data.homescore) > this.football_hot_conduct_list[ii].main_fraction  && parseInt(data.homescore)>0) {

                                            this.iszhujin = this.football_hot_conduct_list[ii].id;
                                            this.$refs.jinqiutishikuang.style.display = "inline";
                                            this.$refs.kejinqiutishikuang.style.display = "none";
                                            this.rotate = !this.rotate;
                                            this.wjfwenben = data.awayscore + '   ' + this.football_conduct_list[ii].deputy_name+ '   ' +this.football_hot_conduct_list[ii].bstime+"'";
                                            this.jqfwenben = this.football_hot_conduct_list[ii].main_name + '   ' + data.homescore;
                                            let paly_url = JSON.parse(window.localStorage.getItem("paly_url"));
                                            document.getElementById("audiooo").src = paly_url.url;
                                            document.getElementById("audiooo").load();
                                            document.getElementById("audiooo").play();
                                            let _this = this;
                                            setTimeout(function () {
                                                _this.endhide()
                                            }, 5500);

                                        this.football_hot_conduct_list[ii].main_fraction = parseInt(data.homescore);
                                        this.football_hot_conduct_list[ii].main_half_fraction = parseInt(data.homehalfscore);
                                        this.football_hot_conduct_list[ii].main_kick = parseInt(data.homejiaoscore);

                                    }

                                    else if (parseInt(data.awayscore) > this.football_hot_conduct_list[ii].deputy_fraction && parseInt(data.awayscore)>0) {

                                            this.iskejin = this.football_hot_conduct_list[ii].id;
                                            this.$refs.kejinqiutishikuang.style.display = "inline";
                                            this.$refs.jinqiutishikuang.style.display = "none";
                                            this.rotate = !this.rotate;
                                            this.rotate2 = !this.rotate2;
                                            this.wjfwenben = data.awayscore + '   ' + this.football_conduct_list[ii].deputy_name+ '   ' +this.football_hot_conduct_list[ii].bstime+"'";
                                            this.jqfwenben = this.football_hot_conduct_list[ii].main_name + '   ' + data.homescore;
                                            let paly_url = JSON.parse(window.localStorage.getItem("paly_url"));
                                            document.getElementById("audiooo").src = paly_url.url;
                                            document.getElementById("audiooo").load();
                                            document.getElementById("audiooo").play();
                                            let _this = this;
                                            setTimeout(function () {
                                                _this.endhide()
                                            }, 5500);

                                        this.football_hot_conduct_list[ii].deputy_fraction = parseInt(data.awayscore);
                                        this.football_hot_conduct_list[ii].deputy_half_fraction = parseInt(data.awayhalfscore);
                                        this.football_hot_conduct_list[ii].deputy_kick = parseInt(data.awayjiaoscore);

                                }
                                if (data.status == '8' || data.status == 8) {
                                    this.football_hot_conduct_list.splice(ii,1);
                                }
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
.matchwrapper {
    width: 1150px;
    margin: 75px auto 0;
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
        height: 42px;
        //position: fixed;        
        span {
            cursor: pointer;
            position: relative;
            display: inline-block;
            margin: 0 5px 0px 0px;
            width:80px;
            text-align :center;
            height :35px;
            font-weight: 700;
            line-height :32px;
            font-size: 16px;
            color: #666;
            float: left;
            letter-spacing :3px;
            background : #f9f9f9;
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
            color:#0400B4;
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
            right:30px;
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
        top: 120px;
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
            position:relative;
            bottom:5px;
            z-index :500;

            .el-input__inner{
                width:140px;
                height :60px;
                text-align:center;
                position :absolute;
                top:0px;
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
        margin-top: 20px;
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
        margin-top: 5px;
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
        line-height: 500px;
        text-align: center;
        img{
            width:120px;
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
        .title{
            position: relative;

        }

        span{
            display :inline-flex;
            font-size:14px;
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
            right:-70px;
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

      
}
</style>