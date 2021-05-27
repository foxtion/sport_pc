<template>    
    <div class="matchwrapper">       
        <el-drawer title="赛事" :visible.sync="drawer" :with-header="false" :before-close="CloseSelectEvent"> 
            <div class = "selected">
                <div class = "number" v-if='selected_event.length > 0'>
                    <span>已选</span>
                    <span>({{selected_event.length}})</span>
                </div>
                <div class = "selected_event">
                    <span v-for="(v, k) in selected_event" :key="k" v-if='k < 20'>
                        {{v.name}} 
                        <i class = "el-icon-close"  @click="CancelEvent(v)"></i>
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

        <div class = "fixed">
            <div class="fixedtool" >
                <div style="margin-top:5px;" @click="followbasket">
                    <p class = "icon" style="font-size: 18px;"><i class = "el-icon-thumb"></i></p>
                    <p class = 'text'>关注</p>
                </div>   
                <div @click="retainbasket">
                    <p class = "icon">
                        <span class = "retain_num" v-if="retainbasketball >= 10 && !is_load">
                            {{retainbasketball}}
                        </span>
                        <span class = "retain_num" v-else-if="retainbasketball < 10 && !is_load" style="width:15px;">
                            {{retainbasketball}}
                        </span>
                        <span  style="font-size: 18px;"><i class = "el-icon-check"></i></span>
                    </p>
                    <p class = 'text'>保留</p>
                </div>   
                <div class = "hidebasket" @click="hidebasket">
                    <p class = "icon">
                        <span class = "hide_num" v-if="hidebasketball.length >= 10 && !is_load && !is_load">
                            {{hidebasketball.length}}
                        </span>                        
                        <span class = "hide_num" v-else-if="hidebasketball.length > 0 && hidebasketball.length < 10 && !is_load" style="width:15px;">
                            {{hidebasketball.length}}
                        </span>
                        <span  style="font-size: 18px;"> <i class = "el-icon-view"></i></span>
                    </p>
                    <p class = 'text'>隐藏</p>
                </div>
                <div @click="showbasket">
                    <p class = "icon" style="font-size: 18px;"><i class = "el-icon-zoom-in"></i></p>
                    <p class = 'text' style="border-bottom:none">显示</p>
                </div>   
            </div>
        </div>
        <div class="liveTypenav">
            <span style="font-size: 14px;width:70px;"  v-for="(item, i) in classify" :key="i" :class="{ active: item.active }" @click="select_type(item, i)">
                {{ item.name }}
            </span>  
            <span style="width:100px;font-size: 14px" :class="{ checked: is_event }" @click="select_event" v-if="type != 4">选择赛事</span>
            <span style="width:100px;font-size: 14px" :class="{ checked: is_event }" @click="showriqizu" v-if="type != 4">选择日期</span>
            <pormpt></pormpt>

            <span class="search" @click="showSearch" v-if="is_search"><i class = 'el-icon-search'></i>搜索</span>
            <template v-else>
                <el-autocomplete  placeholder="ctrl+f 搜索赛事名称或球队名称" v-model="likebasket" :fetch-suggestions="querybasket" @select="searchHistory" class = "query" >
                </el-autocomplete>
                <i class="el-icon-circle-close el-input__icon close" slot="suffix" @click="hideSearch"></i>
            </template>
        </div>

        <div class="date-list">
            <div class = "filter_time" v-if ="type==1">
                <el-date-picker v-model="filter_time"  value-format="yyyy-MM-dd" type="date"  placeholder="选择日期"  :picker-options="picker_end">
                </el-date-picker>
            </div> 

            <div class = "filter_time" v-if ="type==3">           
                <el-date-picker v-model="filter_time"  value-format="yyyy-MM-dd" type="date"  placeholder="选择日期"  :picker-options="picker_not">
                </el-date-picker>
            </div>
            <ul style="display: none" ref="riqizu">
                <li class="item" v-for="(item, i) in select_date" :key="i" :class="{current: item.active}" @click="brush_time(i)">
                    <span class="day">{{item.time}}</span>
                    <br />
                    <span class="date">{{item.week}}</span>
                </li>
            </ul>   

        </div>
<!--        <div class="mediaBanner index-model m-t-10" style="width: 1150px;margin-top: 15px;position:relative;overflow:hidden;border-radius: 4px"><img class="guanggaotu" width="100%" src="../assets/img/advert.png"></div>-->
        <template v-if="!is_load">
            <basketSticky :basketball="basketball_sticky_list" @CancelbasketSticky="CancelbasketSticky" v-if="type == 0 || type == 4"></basketSticky> 
            <div v-if = 'is_hot == 0'>
                <div v-if="type == 0 || type == 2">
                    <div class="basketball_title" v-if="type == 0 && basketball_conduct_list.length > 0 && title.conduct == 1"">
                        <div class = "title">
                            <img src="@/assets/img/b-begin.png"/>
                            <span>正在进行的比赛</span>
                        </div>
                    </div>
                    
                    <basket :basketball="basketball_conduct_list" :baskejin="baskejin" :baszhujin="baszhujin" :type="type" :state="title.conduct" @follow="follow" @basketSticky="basketSticky">
                    </basket>                      
                </div>
                <div v-if="type == 0 || type == 1">
                    <div class="basketball_title" v-if="type == 0 && basketball_not_list.length > 0 && title.not == 1">
                        <div class = "title">
                            <img src="@/assets/img/foot-next.png"/>
                            <span>未开始的比赛</span>
                        </div>
                    </div>

                    <basket :basketball="basketball_not_list" :type="type" :state="title.not" @follow="follow" @basketSticky="basketSticky"></basket>                             
                </div>

                <div v-if="type == 0 || type == 3">
                    <div class="basketball_title" v-if="type == 0 && basketball_end_list.length > 0 && title.end == 1">
                        <div class = "title">
                            <img src="@/assets/img/foot-end.png"/>
                            <span>已完结的比赛</span>
                        </div>
                    </div>

                    <basket :basketball="basketball_end_list" :type="type" :state="title.end" @follow="follow" @basketSticky="basketSticky"></basket>
                </div>    
            </div>

            <div v-else-if = 'is_hot == 1'>               
                <div class="basketball_title" v-if="basketball_hot_conduct_list.length > 0 && title.hot_conduct == 1">
                    <div class = "title">
                        <img src="@/assets/img/b-begin.png"/>
                        <span>正在进行的比赛</span>
                    </div>
                </div>               
                <basket :basketball="basketball_hot_conduct_list" :baskejin="baskejin" :baszhujin="baszhujin"  :type="type" @follow="follow" @basketSticky="basketSticky"></basket>
                                
                <div class="basketball_title" v-if="basketball_hot_not_list.length > 0 && title.hot_not == 1">
                    <div class = "title">
                        <img src="@/assets/img/foot-next.png"/>
                        <span>未开始的比赛</span>
                    </div>
                </div>
                <basket :basketball="basketball_hot_not_list" :type="type" @follow="follow" @basketSticky="basketSticky"></basket>                                  
                               
                <div class="basketball_title" v-if="type == 4 && basketball_hot_end_list.length > 0 && title.hot_end == 1">
                    <div class = "title">
                        <img src="@/assets/img/foot-end.png"/>
                        <span>已完结的比赛</span>
                    </div>
                </div>
                <basket :basketball="basketball_hot_end_list" :type="type" @follow="follow" @basketSticky="basketSticky"></basket>                    
                   
            </div>
    <audio src="https://api.daoyunxiang.com/static/pormpt/victory.mp3" controls  id="audiooo" hidden="true" muted></audio>
            <no-data v-if="basketball_sticky_list.length == 0 && is_hot == 2"></no-data>
        </template>        
        <div class = "load" v-else>
            <img src="@/assets/loading.gif" />
        </div>

        <!-- <notice></notice> -->
        
        
    </div>      
</template>

<script>
    var wser=new WebSocket("wss://soket.daoyunxiang.com:8989");
    wser.onmessage = function (evt) {
        var receivedmsg = evt.data;
        immediater(receivedmsg);
    }
import noData from "@/components/noData.vue";
import notHave from "@/components/notHave.vue";
import basket from "@/components/basket.vue"; 
import notice from "@/components/notice.vue";
import pormpt from "@/components/pormpt.vue";
import basketSticky from "@/components/basketSticky.vue";
import config from "_s/config.js";
import {GetBasketball,FollowBasketball,CancelFollowBasketball,LiveClass} from '@/api'

export default {
    name: "Basketball",
    components: {
        noData,
        notHave,
        basket,
        notice,
        pormpt,
        basketSticky
    },
    data() {
        return {
            classify: [
                {'name':'全部','type' : 0, 'active': true},
                {'name':'热门','type' : 4, 'active': false},
                {'name':'即时','type' : 2, 'active': false},
                {'name':'赛果','type' : 3, 'active': false},
                {'name':'赛程','type' : 1, 'active': false},
            ],
            week: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            select_date: [],
            schedule: [],
            filter_time:'',
            basketball_end_list: [],
            basketball_not_list: [],
            basketball_conduct_list: [],

            basketball_hot_end_list: [],
            basketball_hot_not_list: [],
            basketball_hot_conduct_list: [],

            basketball_sticky_list:[],

            filter: {
                'all':[],'conduct':[],'end':[],"hot":[],'not':[]
            },
            is_hot:0,
            is_load:1,
            type:0,
            is_event:0,
            user:{},
            user_id:0,
            drawer: false,
            search_events:false,
            event:[],
            letter:[],
            timerer:'',
            selected_event:[],
            select_event_id:[],
            hide:0,
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
            click_event:false,
            title:{"not":1,'conduct':1,'end':1,'hot_not':1,'hot_conduct':1,'hot_end':1},
            retainEvnet:[],
            time:'',
            hidebasketball:[],
            retainbasketball:0,
            total:0,
            likebasket:'',
            is_search:1,
            baszhujin:-1,
            baskejin:-1
        };
    },

    watch:{
        filter_time(val){
            this.time = val
            this.basketball()
        }
    },

    mounted() {
        window.immediater = this.immediater;
        let height=document.documentElement.clientHeight - 50;
        this.frame_height = height + 'px'
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
        this.getLiveClass()
        this.basketball()
       // this.timerer = setInterval(this.basketball, 10000);
        let hidebasket =  JSON.parse(localStorage.getItem("retainEvnet_basket_"+this.time));
        this.hidebasketball = hidebasket ? hidebasket :[]
        this.retainbasketball = parseInt(this.total - this.hidebasketball.length)

        //this.linkSocket()
    },
//    beforeDestroy() {
//        clearInterval(this.timerer);
//    },
    methods: {
        //获取直播分类
        getLiveClass(){
           let params = {
          source:'pc',
          type:'2'
      }
      LiveClass(params).then((res)=>{
          console.log(res)
          
      })
        },
        async basketball(){
            let data = {
                'uid' : this.user_id,
                "type" : 0,
                "time" : this.time,
                "events_id":this.select_event_id
            }
           // this.is_load = 1
            let res = await GetBasketball(data) 
            if(res.code == 0 || res.code == 200){
                this.is_load = 0
                this.click_event = false
                let record = res.info

                this.basketball_end_list = record.end.length > 0 ? record.end : []
                this.basketball_not_list = record.not.length > 0 ? record.not : []
                this.basketball_conduct_list = record.conduct.length > 0 ? record.conduct : []

                this.basketball_hot_end_list = record.hot.end.length > 0 ? record.hot.end : []
                this.basketball_hot_not_list = record.hot.not.length > 0 ? record.hot.not : []
                this.basketball_hot_conduct_list = record.hot.conduct.length > 0 ? record.hot.conduct : []

                let retainEvnet = JSON.parse(window.localStorage.getItem("retainEvnet_basket_"+this.time));
                retainEvnet = retainEvnet ? retainEvnet :[]
                if(retainEvnet){
                    this.retainBasketList(this.basketball_conduct_list,retainEvnet,'conduct')
                    this.retainBasketList(this.basketball_not_list,retainEvnet,'not')
                    this.retainBasketList(this.basketball_end_list,retainEvnet,'end')

                    this.retainBasketList(this.basketball_hot_conduct_list,retainEvnet,'hot_conduct')
                    this.retainBasketList(this.basketball_hot_not_list,retainEvnet,'hot_not')
                    this.retainBasketList(this.basketball_hot_end_list,retainEvnet,'hot_end') 
                    
                    let state_conduct = this.is_retainbasket(this.basketball_conduct_list)
                    let state_end = this.is_retainbasket(this.basketball_end_list)
                    let state_not = this.is_retainbasket(this.basketball_not_list)
                    if(state_conduct && state_end && state_not){                     
                        this.is_hot = 2
                    }
                }

                let total = parseInt(this.basketball_end_list.length + this.basketball_not_list.length + this.basketball_conduct_list.length)
                this.total = total
                let retain_num = parseInt(total - retainEvnet.length)
                this.retainbasketball = retain_num

                if(record.end.length == 0 && record.not.length == 0 && record.conduct.length == 0){

                    this.is_list = 2
                }
                
                if(this.search_events == false){
                    this.filter = res.info.filter
                    this.format_event(this.type) 
                }
            }            
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
            let format = this.format_date(0)
            this.select_event_id = []
            this.basketball()
        },

        async follow(data){ 
            let basketball = data.basket
            let index = data.index
            let type = basketball.type
            
            if(!this.user){
                this.$parent.showLogin = true             
            }else{
                if(basketball.collect == 0){
                    basketball.collect = 1;
                    let data = {
                        "event" : JSON.stringify(basketball),
                        "uid" :this.user_id
                    }

                    let res = await FollowBasketball(data)
                    if(res.code == 0){
                        if(type == "not"){
                            this.$set(this.basketball_not_list,index,basketball)
                        }

                        if(type == "conduct"){                           
                            this.$set(this.basketball_conduct_list,index,basketball)
                        }

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
                    basketball.collect = 0;
                    let data = {
                        "id" : basketball.id,
                        "uid" : this.user_id
                    }
                    let res = await CancelFollowBasketball(data)
                    if(res.code == 0){
                        if(this.type == 1){
                            this.$set(this.basketball_not_list,index,basketball)
                        }

                        if(this.type == 2){
                            this.$set(this.basketball_conduct_list,index,basketball)
                        }

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

        select_event(){
            this.is_event = 1
            this.drawer = true
        },

        CloseSelectEvent(){
            this.drawer = false
            this.search_events = true
            this.is_event = false
            if(this.select_event_id > 0 || this.click_event){
                this.basketball()  
            }                    
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
                if(this.basketball_hot_end_list.length == 0 && this.basketball_hot_not_list.length == 0 && this.basketball_hot_conduct_list.length == 0){
                    this.is_hot = 2
                } 
                
                let state_conduct = this.is_retainbasket(this.basketball_hot_conduct_list)
                let state_end = this.is_retainbasket(this.basketball_hot_end_list)
                let state_not = this.is_retainbasket(this.basketball_hot_not_list)
                if(!state_conduct && !state_end && !state_not){                        
                    this.is_hot = 2
                }
            }else{                
                this.is_hot = 0
                if(this.basketball_end_list.length == 0 && this.basketball_not_list.length == 0 && this.basketball_conduct_list.length == 0){
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
            if(this.selected_event.length > 0){
                this.selected_event.forEach((val,i) => {
                    if(val.check == true){
                        this.select_event_id.push(val.events_id)
                    }
                })
            }
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

        selected_event_list(event){       
            if(event.check){
                this.selected_event.unshift(event)
                this.select_event_id = event.events_id
            }else{                
                let data = []
                let events_id = []
                this.selected_event.forEach((item, index) => {
                    if(item.check == true){
                        data.push(item)
                        events_id.push(item.events_id)
                    }
                });
                                
                if(events_id.length > 0){
                    this.select_event_id = events_id.join(",")
                }
                
                this.selected_event = data
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
            
            if(data.length > 0){
                let letter  = []
                data.forEach((val, key) => {
                    letter.push(val.letter)
                });

                letter = Array.from(new Set(letter))
                this.letter = letter
                if(letter.length > 0){
                    letter.forEach((val, key) => {
                        let list = this.filter_event(data,val)
                        if(list.length > 0){
                            this.event.push({"letter":val,'event':list})
                        }                       
                    });
                }
            } 
        },

        filter_event(data,letter){
            let list = []
            data.forEach((val, key) => {
                if(val.letter == letter && val.letter != ''){
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
            //console.log("连接成功")
        },

        onMessage(res){
            let format = this.format_date(0)
            if(format.now != this.time){
                return
            }
            let data = res.data
            if(data){
                let record = JSON.parse(res.data)
                //console.log(record)
                if(record.type == 'basketball'){
                    let basket = JSON.parse(record.data)
                    if(basket.conduct.length > 0){
                        if(this.basketball_conduct_list.length > 0){
                            this.updateBasket(this.basketball_conduct_list,basket.conduct,0, 'conduct')                            
                        }

                        if(this.basketball_hot_conduct_list.length > 0){
                            this.updateBasket(this.basketball_hot_conduct_list,basket.conduct,1,'conduct') 
                        }
                        
                        let not = this.basketball_not_list
                        if(not.length > 0){
                            not.forEach((v,i) => {
                                let event = findEvent(basket.conduct,v.id)
                                if(typeof(event.id) != 'undefined'){
                                    not.splice(i, 1)
                                }
                            })
                        }
                        
                        let not_hot = this.basketball_hot_not_list
                        if(not_hot.length > 0){
                            not_hot.forEach((v,i) =>{
                                let event = findEvent(basket.conduct,v.id)
                                if(typeof(event.id) != 'undefined'){
                                    not_hot.splice(i, 1)
                                } 
                            })
                        }
                    }

                    if(basket.not.length > 0){
                        if(this.basketball_not_list.length > 0){
                            this.updateBasket(this.basketball_not_list,basket.not,0, 'not')                            
                        }

                        if(this.basketball_not_conduct_list.length > 0){
                            this.updateBasket(this.basketball_hot_not_list,basket.not,1,'not') 
                        }                        
                    }

                    if(basket.end.length > 0){
                        if(this.basketball_end_list.length > 0){
                            this.updateBasket(this.basketball_end_list,basket.end,0, 'end')                           
                        }

                        if(this.basketball_hot_conduct_list.length > 0){
                            this.updateBasket(this.basketball_hot_end_list,basket.end,1,'end') 
                        }

                        let conduct = this.basketball_conduct_list
                        if(conduct.length > 0){
                            conduct.forEach((v,i) => {
                                let event = findEvent(basket.end,v.id)
                                if(typeof(event.id) != 'undefined'){
                                    conduct.splice(i, 1)
                                }
                            })
                        }
                        
                        let conduct_hot = this.basketball_hot_conduct_list
                        if(conduct_hot.length > 0){
                            conduct_hot.forEach((v,i) =>{
                                let event = findEvent(basket.end,v.id)
                                if(typeof(event.id) != 'undefined'){
                                    conduct_hot.splice(i, 1)
                                } 
                            })
                        }
                    }
                }
            }          
        },

        updateBasket(data,ball,is_hot,type){
            data.forEach((v,i) => {
                let event = this.findEvent(ball,v.id)
                if(typeof(event.id) != 'undefined'){

                    v.main_one_score = event.main_one_score  
                    v.main_two_score = event.main_two_score    
                    v.main_three = event.main_three   
                    v.main_four = event.main_four  
                    v.main_penalty = event.main_penalty
                    v.main_score = event.main_score
                    
                    v.deputy_one_score = event.deputy_one_score  
                    v.deputy_two_score = event.deputy_two_score    
                    v.deputy_three = event.deputy_three   
                    v.deputy_four = event.deputy_four  
                    v.deputy_penalty = event.deputy_penalty
                    v.deputy_score = event.deputy_score

                    v.status = event.status
                    v.status_text = event.status_text
                    v.remaining_time = event.remaining_time

                    if(type == 'conduct'){
                        if(is_hot == 0){
                            this.$set(this.basketball_conduct_list, i,v)
                        }else{
                            this.$set(this.basketball_hot_conduct_list, i,v)
                        }
                    }

                    if(type == 'not'){
                        if(is_hot == 0){
                            this.$set(this.basketball_not_list, i,v)
                        }else{
                            this.$set(this.basketball_hot_not_list, i,v)
                        }
                    }

                    if(type == 'end'){
                        if(is_hot == 0){
                            this.$set(this.basketball_end_list, i,v)
                        }else{
                            this.$set(this.basketball_hot_end_list, i,v)
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

        retainbasket(){
            if(this.type != 4){
                let state_conduct = this.is_retainbasket(this.basketball_conduct_list)
                let state_end = this.is_retainbasket(this.basketball_end_list)
                let state_not = this.is_retainbasket(this.basketball_not_list)
                if(!state_conduct && !state_end && !state_not){
                    this.$message({
                        message: '请选择要保留的赛事',
                        type: "warning",
                    });

                    return
                } 
                
                this.draw(this.basketball_conduct_list,'conduct','retain')
                this.draw(this.basketball_end_list,'end','retain')
                this.draw(this.basketball_not_list,'not','retain')
                this.calculate()
            }else{
                let state_conduct = this.is_retainbasket(this.basketball_hot_conduct_list)
                let state_end = this.is_retainbasket(this.basketball_hot_end_list)
                let state_not = this.is_retainbasket(this.basketball_hot_not_list)
                if(!state_conduct && !state_end && !state_not){
                    this.$message({
                        message: '请选择要保留的赛事',
                        type: "warning",
                    });

                    return
                }
                
                this.draw(this.basketball_hot_conduct_list,'hot_conduct','retain')
                this.draw(this.basketball_hot_end_list,'hot_end','retain')
                this.draw(this.basketball_hot_not_list,'hot_not','retain')
                this.calculate()
            }
        },

        hidebasket(){
          //  console.log("hidebasket")
            if(this.type != 4){
                let state_conduct = this.is_retainbasket(this.basketball_conduct_list)
                let state_end = this.is_retainbasket(this.basketball_end_list)
                let state_not = this.is_retainbasket(this.basketball_not_list)
                if(!state_conduct && !state_end && !state_not){
                    this.$message({
                        message: '请选择要隐藏的赛事',
                        type: "warning",
                    });

                    return
                }
                
                if(state_conduct && state_end && state_not){
                    
                }
                                
                this.draw(this.basketball_conduct_list,'conduct')
                this.draw(this.basketball_end_list,'end')
                this.draw(this.basketball_not_list,'not')
                this.calculate()
            }else{
                let state_conduct = this.is_retainbasket(this.basketball_hot_conduct_list)
                let state_end = this.is_retainbasket(this.basketball_hot_end_list)
                let state_not = this.is_retainbasket(this.basketball_hot_not_list)
                if(!state_conduct && !state_end && !state_not){
                    this.$message({
                        message: '请选择要隐藏的赛事',
                        type: "warning",
                    });

                    return
                }
                
                this.draw(this.basketball_hot_conduct_list,'hot_conduct','hide')
                this.draw(this.basketball_hot_end_list,'hot_end','hide')
                this.draw(this.basketball_hot_not_list,'hot_not','hide')

                this.calculate()
            }
        },

        showbasket(){
            window.localStorage.removeItem("retainEvnet_basket_"+this.time);
            this.hidebasketball = []
            this.retainbasketball = this.total
            this.is_hot = 0
            this.showBasketList(this.basketball_conduct_list)
            this.showBasketList(this.basketball_not_list)
            this.showBasketList(this.basketball_end_list)
            this.showBasketList(this.basketball_hot_conduct_list)
            this.showBasketList(this.basketball_hot_end_list)
            this.showBasketList(this.basketball_hot_not_list)
        },

        showBasketList(data){
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
            let hidebasket =  JSON.parse(localStorage.getItem("retainEvnet_basket_"+this.time));
            hidebasket = hidebasket ? hidebasket :[]
            if(hidebasket.length > 0){
                this.hidebasketball = hidebasket.filter(function(value,index,self){
                    return self.indexOf(value) ===index;
                });               
                this.retainbasketball = parseInt(this.total - this.hidebasketball.length)
                if(this.retainbasketball == 0){
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

            window.localStorage.setItem("retainEvnet_basket_"+this.time, JSON.stringify(this.retainEvnet));
            if(!state){
                switch(type){
                    case 'conduct':
                        this.title.conduct = 0 
                        break
                    case 'end':
                        this.title.end = 0 
                        break
                    case 'not':
                        this.title.not = 0 
                        break
                    case 'hot_not':
                        this.title.hot_not = 0 
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

        is_retainbasket(data){
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

        retainBasketList(data,Evnetid,mark){
            if(data.length > 0){
                let list = []
                switch(mark){
                    case 'conduct':
                        list = this.basketball_conduct_list
                        break
                    case 'end':
                        list = this.basketball_end_list
                        break
                    case 'not':
                        list = this.basketball_not_list
                        break 
                    case 'hot_conduct':
                        list = this.basketball_hot_conduct_list
                        break    
                    case 'hot_end':
                        list = this.basketball_hot_end_list
                        break    
                    case 'hot_not':
                        list = this.basketball_hot_not_list
                        break    
                }
                let status = false
                data.forEach((val,i) =>{
                    let state = this.checkbasket(val,Evnetid)
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
                            this.title.not = 0
                            break 
                        case 'hot_conduct':
                            this.title.hot_conduct = 0
                            break    
                        case 'hot_end':
                            this.title.hot_end = 0
                            break    
                        case 'hot_not':
                            this.title.hot_not = 0
                            break     
                    }
                }                
            }
        },

        followbasket(){
            if(this.type != 4){
                let state_conduct = this.is_retainbasket(this.basketball_conduct_list)
                let state_not = this.is_retainbasket(this.basketball_not_list)
                if(!state_conduct && !state_not){
                    this.$message({
                        message: '请选择要关注的赛事',
                        type: "warning",
                    });

                    return
                } 
                
                let basketball = []                
                let conduct = this.followEventlist(this.basketball_conduct_list,'conduct')
                if(conduct){
                    conduct.forEach((v,i) =>{
                        basketball.push(v)                     
                    })
                }

                let not = this.followEventlist(this.basketball_not_list,'not')
                if(not){
                    not.forEach((v,i) =>{
                        basketball.push(v)                      
                    })
                }

                if(basketball.length > 0){
                    let data = []
                    let basket_id = []
                    basketball.forEach((v,i) =>{
                        if(i < 20){                            
                            data.push(v)
                            basket_id.push(v.id)
                        }                       
                    })

                    this.batchfollowbasket(data,basket_id,0)
                }                
            }else{
                let state_conduct = this.is_retainbasket(this.basketball_hot_conduct_list)
                let state_not = this.is_retainbasket(this.basketball_hot_not_list)
                if(!state_conduct && !state_not){
                    this.$message({
                        message: '请选择要关注的赛事',
                        type: "warning",
                    });

                    return
                }

                let basketball = []               
                let hot_conduct = this.followEventlist(this.basketball_hot_conduct_list,'hot_conduct')
                if(hot_conduct){
                    hot_conduct.forEach((v,i) =>{
                        basketball.push(v)                     
                    })
                }

                let hot_not = this.followEventlist(this.basketball_hot_not_list,'hot_not') 
                if(hot_not){
                    hot_not.forEach((v,i) =>{
                        basketball.push(v)                     
                    })
                }

                if(basketball.length > 0){
                    let data = []
                    let basket_id = []
                    basketball.forEach((v,i) =>{
                        if(i < 20){                            
                            data.push(v)
                            basket_id.push(v.id)
                        }                       
                    })

                    this.batchfollowbasket(data,basket_id,1)
                }
            }
        },

        followEventlist(data,sign){
            if(!this.user){
                this.$parent.showLogin = true
                return 
            }
            
            let basket = []
            data.forEach((val,i) =>{
                if(val.check && val.collect == 0){ 
                    basket.push(val)                  
                }                                                 
            })

            return basket;                     
        },

        async batchfollowbasket(basket,basket_id,is_hot){
            let data = {
                "event" : JSON.stringify(basket),
                "uid" : this.user_id
            }          
            let res = await FollowBasketball(data)
            if(res.code == 0){
                if(is_hot == 0){
                    this.basketball_conduct_list.forEach((v,i) =>{
                        let status = this.checkbasket(v,basket_id)
                        if(status){
                            this.basketball_conduct_list[i].collect = 1
                        }
                    })

                    this.basketball_not_list.forEach((v,i) =>{
                        let status = this.checkbasket(v,basket_id)
                        if(status){
                            this.basketball_not_list[i].collect = 1
                        }
                    })
                }else{
                    this.basketball_hot_conduct_list.forEach((v,i) =>{
                        let status = this.checkbasket(v,basket_id)
                        if(status){
                            this.basketball_hot_conduct_list[i].collect = 1
                        }
                    })

                    this.basketball_hot_not_list.forEach((v,i) =>{
                        let status = this.checkbasket(v,basket_id)
                        if(status){
                            this.basketball_hot_not_list[i].collect = 1
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
        
        basketSticky(basket){
           // console.log(basket)
            let basketball = basket.basket  
            let type = basket.type
            let index = basket.index
            let sticky = this.basketball_sticky_list
            let sticky_id = JSON.parse(window.localStorage.getItem("sticky_basket_"+this.time));
            sticky_id = sticky_id ? sticky_id : []
            
            if(sticky_id.length > 0){
                sticky_id = sticky_id.filter(function(value,index,self){
                    return self.indexOf(value) ===index;
                });
            }
        
            if(sticky.length > 0){
                let state = true
                sticky.forEach((v,i) => {                   
                    if(v.id != basketball.id){
                        state = false
                    }                                     
                })

                if(!false){
                    sticky.push(basketball)
                    sticky_id.push(basketball.id)
                    this.StickyUpdateBasket(basketball,index,type)
                }                
                window.localStorage.setItem("sticky_basket_"+this.time,JSON.stringify(sticky_id))
            }else{
                sticky.push(basketball)
                sticky_id.push(basketball.id)
                this.StickyUpdateBasket(basketball,index,type)
                window.localStorage.setItem("sticky_basket_"+this.time,JSON.stringify(sticky_id))
            }                       
        },

        CancelbasketSticky(basket){
            let basketball = basket.basket  
            let type = basket.type
            let index = basket.index
            let list =[]
           
            switch(basketball.type){
                case 'conduct':
                    list = this.basketball_conduct_list
                    break
                case 'end':
                    list = this.basketball_end_list
                    break
                case 'not':
                    list = this.basketball_not_list
                    break 
                case 'hot_conduct':
                    list = this.basketball_hot_conduct_list
                    break    
                case 'hot_end':
                    list = this.basketball_hot_end_list
                    break    
                case 'hot_not':
                    list = this.basketball_hot_not_list
                    break    
            }
            
            if(list.length > 0){
                list.forEach((val,i) => {
                    if(val.id == basketball.id){
                        list[i].is_sticky = 0
                        this.basketball_sticky_list.splice(index, 1)
                    }
                }) 
            }

            let sticky_id = JSON.parse(window.localStorage.getItem("sticky_basket_"+this.time));            
            sticky_id = sticky_id ? sticky_id : []
            if(sticky_id.length > 0){
                sticky_id.forEach((val,i) => {
                    if(val == basketball.id){
                        sticky_id.splice(index, 1)
                    }
                })

                window.localStorage.setItem("sticky_basket_"+this.time,JSON.stringify(sticky_id))
            }           
        },

        StickyUpdateBasket(basket,index,type){           
            switch(basket.type){
                case 'conduct':
                    this.basketball_conduct_list[index].is_sticky = 1
                    break;
                case 'not':
                    this.basketball_not_list[index].is_sticky = 1
                    break;
                case 'end':
                    this.basketball_end_list[index].is_sticky = 1
                    break;
                case 'hot_conduct':
                    this.basketball_hot_conduct_list[index].is_sticky = 1
                    break;
                case 'hot_not':
                    this.basketball_hot_not_list[index].is_sticky = 1
                    break;
                case 'hot_end':
                    this.basketball_hot_end_list[index].is_sticky = 1
                    break;
            }           
        },

        filterSticky(data,sticky_ids){
            if(data.length > 0){
                data.forEach((basket,i) =>{
                    let state = this.checkbasket(basket,sticky_ids)
                    if(state){
                        data[i].is_sticky = 0
                        this.basketball_sticky_list.push(basket)
                    }
                })
            }
        },

        checkbasket(basket,ids){
            let state = false
            ids.forEach((v,i) =>{
                if(v == basket.id){
                    state = true
                }                  
            })

            return state
        },


        showriqizu()
        {
          this.$refs.riqizu.style.display="inline";
        },
        searchHistory(){

        },

        hideSearch(){
            this.is_search = 1
        },

        showSearch(){
            this.is_search = 0
        },

        immediater(data)
        {
            if(data!==undefined){
                var data=JSON.parse(data);
                if(data.sport_id==2){
                    if(this.basketball_conduct_list.length>0){
                    for(var ii=0; ii<this.basketball_conduct_list.length;ii++){
                        if(this.basketball_conduct_list[ii].id==data.match_id){
                            if(parseInt(data.panodds)>0){
                                if(data.bigodds>this.basketball_conduct_list[ii].bigodds){
                                    this.basketball_conduct_list[ii].yazhishu='#de1e30';
                                    let that=this;
                                    let iii=ii;
                                    setTimeout(function () {
                                        that.basketball_conduct_list[iii].yazhishu='#FFCC00'
                                    }, 2000);
                                }else if(data.bigodds<this.basketball_conduct_list[ii].bigodds){
                                    this.basketball_conduct_list[ii].yazhishu='#85c900';
                                    let that=this;
                                    let iii=ii;
                                    setTimeout(function () {
                                        that.basketball_conduct_list[iii].yazhishu='#FFCC00'
                                    }, 2000);
                                }
                                if(data.smallodds>this.basketball_conduct_list[ii].smallodds){
                                    this.basketball_conduct_list[ii].yazhishuer='#de1e30';
                                    let that=this;
                                    let iii=ii;
                                    setTimeout(function () {
                                        that.basketball_conduct_list[iii].yazhishuer='#FFCC00'
                                    }, 2000);
                                }else if(data.smallodds<this.basketball_conduct_list[ii].smallodds){
                                    this.basketball_conduct_list[ii].yazhishuer='#85c900';
                                    let that=this;
                                    let iii=ii;
                                    setTimeout(function () {
                                        that.basketball_conduct_list[iii].yazhishuer='#FFCC00'
                                    }, 2000);
                                }
                                this.basketball_conduct_list[ii].panodds=data.panodds;
                                this.basketball_conduct_list[ii].bigodds=data.bigodds;
                                this.basketball_conduct_list[ii].smallodds=data.smallodds;
                                this.basketball_conduct_list[ii].isclosed=data.isclosed;
                            }else if(parseInt(data.panouodds)>0){
                                this.basketball_conduct_list[ii].panouodds=data.panouodds;
                                this.basketball_conduct_list[ii].zhuouodds=data.zhuouodds;
                                this.basketball_conduct_list[ii].keouodds=data.keouodds;
                                this.basketball_conduct_list[ii].isclosed=data.isclosed;
                            } else{
                            var homescore=data.homescore.split(",");
                            var awayscore=data.awayscore.split(",");
                            if(parseInt(homescore[0])>this.basketball_conduct_list[ii].main_one_score || parseInt(homescore[1])>this.basketball_conduct_list[ii].main_two_score || parseInt(homescore[2])>this.basketball_conduct_list[ii].main_three || parseInt(homescore[3])>this.basketball_conduct_list[ii].main_four){
                                this.baszhujin=this.basketball_conduct_list[ii].id;

                                let paly_url = JSON.parse(window.localStorage.getItem("paly_url"));
                                document.getElementById("audiooo").src = paly_url.url;
                                document.getElementById("audiooo").load();
                                document.getElementById("audiooo").play();
                                let _this = this;
                                setTimeout(function () {
                                    _this.baszhujin=-1;
                                }, 4000);
                            }

                                if(parseInt(awayscore[0])>this.basketball_conduct_list[ii].deputy_one_score || parseInt(awayscore[1])>this.basketball_conduct_list[ii].deputy_two_score || parseInt(awayscore[2])>this.basketball_conduct_list[ii].deputy_three || parseInt(awayscore[3])>this.basketball_conduct_list[ii].deputy_four){
                                    this.baskejin=this.basketball_conduct_list[ii].id;
                                    let paly_url = JSON.parse(window.localStorage.getItem("paly_url"));
                                    document.getElementById("audiooo").src = paly_url.url;
                                    document.getElementById("audiooo").load();
                                    document.getElementById("audiooo").play();
                                    let _this = this;
                                    setTimeout(function () {
                                        _this.baskejin=-1;
                                    }, 4000);
                                }
                            this.basketball_conduct_list[ii].main_one_score=parseInt(homescore[0]);
                            this.basketball_conduct_list[ii].main_two_score=parseInt(homescore[1]);
                            this.basketball_conduct_list[ii].main_three=parseInt(homescore[2]);
                            this.basketball_conduct_list[ii].main_four=parseInt(homescore[3]);
                            this.basketball_conduct_list[ii].main_score=parseInt(homescore[0])+parseInt(homescore[1])+parseInt(homescore[2])+parseInt(homescore[3]);
                            this.basketball_conduct_list[ii].deputy_one_score=parseInt(awayscore[0]);
                            this.basketball_conduct_list[ii].deputy_two_score=parseInt(awayscore[1]);
                            this.basketball_conduct_list[ii].deputy_three=parseInt(awayscore[2]);
                            this.basketball_conduct_list[ii].deputy_four=parseInt(awayscore[3]);
                            this.basketball_conduct_list[ii].deputy_score=parseInt(awayscore[0])+parseInt(awayscore[1])+parseInt(awayscore[2])+parseInt(awayscore[3]);
                            }
                        }
                    }
                }
                if(this.basketball_hot_conduct_list.length>0){
                    for(var ii=0; ii<this.basketball_hot_conduct_list.length;ii++){
                        if(this.basketball_hot_conduct_list[ii].id==data.match_id){
                            if(parseInt(data.panodds)>0){
                                if(data.bigodds>this.basketball_hot_conduct_list[ii].bigodds){
                                    this.basketball_hot_conduct_list[ii].yazhishu='#de1e30';
                                    let that=this;
                                    let iii=ii;
                                    setTimeout(function () {
                                        that.basketball_hot_conduct_list[iii].yazhishu='#FFCC00'
                                    }, 2000);
                                }else if(data.bigodds<this.basketball_hot_conduct_list[ii].bigodds){
                                    this.basketball_hot_conduct_list[ii].yazhishu='#85c900';
                                    let that=this;
                                    let iii=ii;
                                    setTimeout(function () {
                                        that.basketball_hot_conduct_list[iii].yazhishu='#FFCC00'
                                    }, 2000);
                                }
                                if(data.smallodds>this.basketball_hot_conduct_list[ii].smallodds){
                                    this.basketball_hot_conduct_list[ii].yazhishuer='#de1e30';
                                    let that=this;
                                    let iii=ii;
                                    setTimeout(function () {
                                        that.basketball_hot_conduct_list[iii].yazhishuer='#FFCC00'
                                    }, 2000);
                                }else if(data.smallodds<this.basketball_hot_conduct_list[ii].smallodds){
                                    this.basketball_hot_conduct_list[ii].yazhishuer='#85c900';
                                    let that=this;
                                    let iii=ii;
                                    setTimeout(function () {
                                        that.basketball_hot_conduct_list[iii].yazhishuer='#FFCC00'
                                    }, 2000);
                                }
                                this.basketball_hot_conduct_list[ii].panodds=data.panodds;
                                this.basketball_hot_conduct_list[ii].bigodds=data.bigodds;
                                this.basketball_hot_conduct_list[ii].smallodds=data.smallodds;
                                this.basketball_hot_conduct_list[ii].isclosed=data.isclosed;
                            }else if(parseInt(data.panouodds)>0){
                                this.basketball_hot_conduct_list[ii].panouodds=data.panouodds;
                                this.basketball_hot_conduct_list[ii].zhuouodds=data.zhuouodds;
                                this.basketball_hot_conduct_list[ii].keouodds=data.keouodds;
                                this.basketball_hot_conduct_list[ii].isclosed=data.isclosed;
                            } else{
                                var homescore=data.homescore.split(",");
                                var awayscore=data.awayscore.split(",");
                                if(parseInt(homescore[0])>this.basketball_hot_conduct_list[ii].main_one_score || parseInt(homescore[1])>this.basketball_hot_conduct_list[ii].main_two_score || parseInt(homescore[2])>this.basketball_hot_conduct_list[ii].main_three || parseInt(homescore[3])>this.basketball_hot_conduct_list[ii].main_four){
                                    this.baszhujin=this.basketball_hot_conduct_list[ii].id;

                                    let paly_url = JSON.parse(window.localStorage.getItem("paly_url"));
                                    document.getElementById("audiooo").src = paly_url.url;
                                    document.getElementById("audiooo").load();
                                    document.getElementById("audiooo").play();
                                    let _this = this;
                                    setTimeout(function () {
                                        _this.baszhujin=-1;
                                    }, 4000);
                                }

                                if(parseInt(awayscore[0])>this.basketball_hot_conduct_list[ii].deputy_one_score || parseInt(awayscore[1])>this.basketball_hot_conduct_list[ii].deputy_two_score || parseInt(awayscore[2])>this.basketball_hot_conduct_list[ii].deputy_three || parseInt(awayscore[3])>this.basketball_hot_conduct_list[ii].deputy_four){
                                    this.baskejin=this.basketball_hot_conduct_list[ii].id;
                                    let paly_url = JSON.parse(window.localStorage.getItem("paly_url"));
                                    document.getElementById("audiooo").src = paly_url.url;
                                    document.getElementById("audiooo").load();
                                    document.getElementById("audiooo").play();
                                    let _this = this;
                                    setTimeout(function () {
                                        _this.baskejin=-1;
                                    }, 4000);
                                }
                                this.basketball_hot_conduct_list[ii].main_one_score=parseInt(homescore[0]);
                                this.basketball_hot_conduct_list[ii].main_two_score=parseInt(homescore[1]);
                                this.basketball_hot_conduct_list[ii].main_three=parseInt(homescore[2]);
                                this.basketball_hot_conduct_list[ii].main_four=parseInt(homescore[3]);
                                this.basketball_hot_conduct_list[ii].main_score=parseInt(homescore[0])+parseInt(homescore[1])+parseInt(homescore[2])+parseInt(homescore[3]);
                                this.basketball_hot_conduct_list[ii].deputy_one_score=parseInt(awayscore[0]);
                                this.basketball_hot_conduct_list[ii].deputy_two_score=parseInt(awayscore[1]);
                                this.basketball_hot_conduct_list[ii].deputy_three=parseInt(awayscore[2]);
                                this.basketball_hot_conduct_list[ii].deputy_four=parseInt(awayscore[3]);
                                this.basketball_hot_conduct_list[ii].deputy_score=parseInt(awayscore[0])+parseInt(awayscore[1])+parseInt(awayscore[2])+parseInt(awayscore[3]);
                            }
                        }
                    }
                }

                }
            }
        }
    }
};
</script>

<style lang="stylus" >
.matchwrapper {
    width: 1150px;
    margin: 100px auto 0;
    position: relative;
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
        span {
            cursor: pointer;
            position: relative;
            display: inline-block;
            margin: 0 20px 0px 0px;
            width:70px;
            text-align :center;
            height :35px;
            line-height :32px;
            font-size: 16px;
            color: #555555;
            float: left;
            letter-spacing :3px;
            background : #f9f9f9;
            border-radius: 3px;
            box-shadow: 2px 2px 5px #dedede;
            padding-left:5px;
        }

        span.active {
            box-shadow: 0px 1px 2px #949494;
            background :linear-gradient(
                    180deg
                    , rgba(87, 238, 255, 1) 0%, rgba(129, 211, 248, 1) 49%, rgba(37, 149, 230, 1) 94%);
            border:none;   
            padding-top:2px;  
            color:#0400B4;
            font-weight:500;
        }

        span.checked {
            box-shadow: 0px 1px 2px #949494;
            background :#6ca4de;  
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

        .search:hover{
            background : #c8c7f7;
            color:#fff;
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

    .date-list {
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

    .load{
        height: 500px;
        line-height: 500px;
        text-align: center;
        img{
            width:120px;
        }
    }

    .basketball{
        width:1150px;
        height:120px;
        background: #fff;
        margin-top:30px;
        border-radius: 8px;
        .title{
            background:#f8fff4;
            height:40px;
            line-height:40px;
            box-shadow:0 0 1px 1px #ddd;
            width:1150px;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            div{
                float :left;
            }
            .event{
                width:300px;
                line-height:40px;
                height:40px;
                font-size:12px;
                border-right:1px solid #dbdbdb;
                cursor: pointer;
                p{
                    line-height:40px;
                    height:40px;
                }
                .event_name {
                    width:150px;
                    float :left;
                    text-align:center;
                    .checked{
                        position: absolute;
                        left:10px;
                    }
                    .empty{
                        font-size:14px;
                        width:25px;
                        height:25px;
                        background:#f1f1f1;
                        display:block;
                        float:left;
                        border-radius: 50%;
                        margin:7px 0px 0px 20px;
                    }             
                    .event_logo{
                        height:20px;
                        position :relative;
                        top:5px;
                        margin-right:10px;
                    } 
                }

                .event_status{ 
                    width:149px; 
                    float :left;
                    text-align:center;                  
                    .time{
                        position :relative;
                        top:3px;
                        margin-right:10px;         
                    }                   
                }             
            }

            .section{
                width:201px;
                line-height:40px;
                height:40px;
                font-size:12px;
                border-right:1px solid #dbdbdb;
                span {
                    display :block; 
                    width:50px; 
                    float:left;  
                    text-align:center;         
                }
            }

            .score{
                width:241px;
                line-height:40px;
                height:40px;
                font-size:12px;                
                span {
                    border-right:1px solid #dbdbdb;
                    display :block; 
                    width:60px; 
                    float:left;  
                    text-align:center;         
                }
            }

            .finger{
                width:241px;
                line-height:40px;
                height:40px;
                font-size:12px;                
                span {
                    display :block; 
                    width:80px; 
                    float:left;  
                    text-align:center; 
                    border-right:1px solid #dbdbdb;                      
                }
            }

            .operation{
                width:160px;
                line-height:40px;
                height:40px;
                font-size:12px;
                span {
                    display :block; 
                    width:80px; 
                    float:left;  
                    text-align:center;         
                }
            }
        }

        .content{
            height:80px;
            width:100%;
            box-shadow:0px 1px 1px 1px #ddd;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
            div{
                float :left;
            }

            .event{
                width:300px;
                border-right:1px solid #dbdbdb;
                cursor: pointer;
                div{
                    float:left;
                }
                .time{
                    height:80px; 
                    width:129px;
                    text-align:center;
                    border-right:1px solid #eee;                   
                    span{
                        display:block;
                        height:20px;
                        font-size:14px;
                        margin-left:15px;
                    }              
                }

                .team{
                    height:80px;
                    width:170px;
                    font-size:12px;
                    p{
                        height:40px;
                        line-height:40px; 
                        text-align:center;
                         .empty{
                            font-size:14px;
                            width:25px;
                            height:25px;
                            background:#f1f1f1;
                            border-radius: 50%;
                            margin:7px 0px 0px 25px;
                        }
                    }
                    img{
                        height:25px;
                        position :relative;
                        top:7px;
                        margin-right:5px;
                    }
                }
            }

            .score{
                width:201px;
                height:80px;
                border-right:1px solid #dbdbdb;
                .home_team{
                    height:40px; 
                    border-bottom:1px solid #dbdbdb;               
                    span{
                        display:block;
                        float:left;
                        text-align:center;
                        width:50px;
                        line-height :40px;
                        font-size:12px;                       
                    }                 
                }

                .away_team{
                    height:40px;                 
                    span{
                        display:block;
                        float:left;
                        text-align:center;
                        width:50px;
                        line-height :40px;
                        font-size:12px;
                    }                  
                }
            }

            .section{
                width:241px;
                height:80px;               
                .home_team{
                    height:40px; 
                    border-bottom:1px solid #dbdbdb;               
                    span{
                        display:block;
                        float:left;
                        text-align:center;
                        width:60px;
                        line-height :40px;
                        border-right:1px solid #dbdbdb;
                        font-size:12px;
                    }                 
                }

                .away_team{
                    height:40px;                 
                    span{
                        display:block;
                        float:left;
                        text-align:center;
                        width:60px;
                        line-height :40px;
                        border-right:1px solid #dbdbdb;
                        font-size:12px;
                    }                  
                }
            }

            .finger{
                width:241px;
                height:80px;                
                .home_team{
                    height:40px;
                    border-bottom:1px solid #dbdbdb;                
                    span{
                        display:block;
                        float:left;
                        text-align:center;
                        width:80px;
                        line-height :40px;
                        border-right:1px solid #dbdbdb;
                        font-size:12px;
                        color:white;    
                    }                 
                }

                .away_team{
                    height:40px;                 
                    span{
                        display:block;
                        float:left;
                        text-align:center;
                        width:80px;
                        line-height :40px;
                        border-right:1px solid #dbdbdb;
                        font-size:12px;
                        color:white;    
                    }                  
                }
            }

            .operation{
                width:160px;
                position: relative;
                .live{
                    width:80px;
                    text-align:center;
                    line-height:80px;
                    cursor: pointer;                   
                    img{                       
                        width:35px;
                        position:relative;
                        top:10px;
                    }
                }

                .sticky{
                    width:20px;
                    line-height:80px;
                    font-size: 18px;
                    cursor: pointer;
                    text-align:center;
                    position: absolute;
                }
                .follow{
                    width:80px;
                    text-align:center;
                    line-height:80px;
                    i{
                        font-size:24px;
                        cursor:pointer;
                    }

                    .hover{
                        color:#073af1;
                        font-size:26px;
                        font-weight:bold;
                    }
                }
            }
        }
    }

    .basketball:hover{
        background: #fff;
        box-shadow: 0px 0px 5px #b3b1b1;
    }

    .basketball_title{
        line-height :40px;
        height :40px;
        text-align :center;
        width :100%;
        margin-top:20px;

        .title{
            position: relative;
            right:50px;
        }

        span{
            display :inline-flex;
            font-size:18px;
            margin-left :20px;
            height :40px;
            line-height :40px;
            letter-spacing :1px;
        }

        img {
            width:25px;
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
            width:55px;
            height: 210px;
            background: #fff;
            color: #666;
            position:absolute;
            left: -60px;
            top:60px
            box-shadow:0px 0px 5px #b3b1b1;
            border-radius: 5px;
            font-size:10px;
            top:295px
            >div{
                width:45px;
                height: 50px;
                border-left:1px solid #fff; 
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
                        background: #00f;
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
                    margin-left:10px;
                    height: 25px;
                    line-height: 30px;
                }
            }

            >div:hover{
                color:#ff0000;
                border-left:2px solid #ff0000;
                cursor: pointer;
            }
        }
    }     
}
</style>