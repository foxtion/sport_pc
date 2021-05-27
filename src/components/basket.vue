
<template>
    <div v-if="basketball.length > 0">
        <div class = "basketball"  v-for="(basket, i) in basketball" :key="i" v-if="basket.is_retain && basket.is_sticky == 0">  
            <div class = "title">
                <div class = "event">                   
                    <p class = "event_name">
                        <el-checkbox class = "checked" v-model="basket.check"></el-checkbox>
                        <template v-if="basket.short_name_zh != '' ">
                            <img :src="basket.events_logo" class = "event_logo" v-if ="basket.events_logo != ''"/> 
                            <span class="empty" v-else></span>
                            <span>{{basket.short_name_zh}}</span>
                        </template>
                    </p>
                    <p class = "event_status" @click="basketballevent(basket)">
                        <img src="@/assets/img/time1.png" class = "time"/>
                        <span>{{basket.status_text}}</span>
                    </p>
                </div>
                <div class = "section">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                </div>

                <div class = "score">
                    <span>上下</span>
                    <span>全场</span>
                    <span>分差</span>
                    <span>总分</span>
                </div>
                <div class = "finger">
                    <span>让分</span>
                    <span>欧指</span>
                    <span>总分</span>
                </div>
                <div class = "operation" v-if="type !=3">
                    <span>直播</span>
                    <span>关注</span>
                </div>

                <div class = "operation" v-else>
                    <span style="width:160px;">直播</span>
                </div>
            </div>

            <div class = "content">
                <div class="event" @click="basketballevent(basket)">
                    <div class = "time">
                        <span style = "margin-top:20px; font-size:16px;">{{basket.competition_time_text}}</span>
                        <span style = "color:#868686">{{basket.competition_date}}</span>
                    </div>  
                    <div class = "team">
                        <p style ="border-bottom:1px solid #dbdbdb;">
                            <img :src="basket.main_logo" class = "event_logo" v-if="basket.main_logo != ''"/>
                            <span class = "empty" v-else></span>
                            <span>{{basket.main_name}}</span>
                        </p>
                        <p>
                            <img :src="basket.deputy_logo" class = "event_logo" v-if="basket.deputy_logo != ''"/> 
                            <span class = "empty" v-else></span>
                            <span>{{basket.deputy_name}}</span>
                        </p>
                    </div>
                </div>

                <div class = "score">
                    <p class="home_team">
                        <span>{{basket.main_one_score}}</span>
                        <span>{{basket.main_two_score}}</span>
                        <span>{{basket.main_three}}</span>
                        <span>{{basket.main_four}}</span>
                    </p>
                    <p class="away_team">
                        <span>{{basket.deputy_one_score}}</span>
                        <span>{{basket.deputy_two_score}}</span>
                        <span>{{basket.deputy_three}}</span>
                        <span>{{basket.deputy_four}}</span>
                    </p> 
                </div>

                <div class = "section">
                    <p class="home_team">
                        <span>
                            {{basket.main_one_score + basket.main_two_score}}/{{basket.main_three + basket.main_four}}
                        </span>
                        <span :style="baszhujin==basket.id?('background:#ffd6d3;color:red;'):('background:white;color:red;')">{{basket.main_score}}</span>
                        <span>全：{{basket.deputy_score - basket.main_score}}</span>
                        <span>全：{{basket.main_score + basket.deputy_score}}</span>
                    </p>
                    <p class="away_team">
                        <span>{{basket.deputy_one_score + basket.deputy_two_score}}/{{basket.deputy_three + basket.deputy_four}}</span>
                        <span :style="baskejin==basket.id?('background:#ffd6d3;color:red;'):('background:white;color:red;')">{{basket.deputy_score}}</span>
                        <span>半：{{(basket.deputy_one_score + basket.deputy_two_score)  -(basket.main_one_score + basket.main_two_score)}}</span>
                        <span>半：{{basket.main_one_score + basket.main_two_score + basket.deputy_one_score + basket.deputy_two_score}}</span>
                    </p> 
                </div>
                <div class = "finger">
                    <p class="home_team">
                        <span style="color:black"  v-if="basket.zhuouodds>0">{{basket.zhuouodds}}</span><span   v-else>1</span>
                        <span :style="{color:basket.yazhishu}"  v-if="basket.isclosed==0"> 大{{basket.bigodds}}
                        <img v-if="basket.yazhishu!='#FFCC00'  && basket.panodds>0" :src="basket.yazhishu=='#de1e30'?'https://soket.daoyunxiang.com/zssheng.gif':'https://soket.daoyunxiang.com/zsjiang.gif'">
                        </span>
                        <span style="color:black" v-else-if="basket.isclosed == 1"> 封</span><span   v-else>1</span>
                        <span style="color:#666" v-if="basket.panodds>0">{{basket.panodds}}</span><span   v-else>1</span>
                    </p>
                    <p class="away_team">
                        <span style="color:black"  v-if="basket.keouodds>0">{{basket.keouodds}}</span><span   v-else>1</span>
                        <span :style="{color:basket.yazhishuer}" v-if="basket.isclosed==0 ">  小{{basket.smallodds}}
                        <img v-if="basket.yazhishuer!='#FFCC00' && basket.panodds>0" :src="basket.yazhishuer=='#de1e30'?'https://soket.daoyunxiang.com/zssheng.gif':'https://soket.daoyunxiang.com/zsjiang.gif'">
                        </span>
                        <span style="color:black" v-else-if="basket.isclosed == 1"> 封</span><span   v-else>1</span>
                        <span style="color:#666" v-if="basket.panodds>0">{{basket.panodds}}</span><span   v-else>1</span>
                    </p> 
                </div>

                <div class = "operation" v-if="type != 3">
                    <div class="live" @click="basketballevent(basket)" style="cursor:pointer;">
                      <img  src="@/assets/img/a_v.png"  v-if="basket.is_animation == 1" style="width: 26px" />
                            <img  src="@/assets/img/a_f.png" v-else style="width: 26px" />
                        <!--<span v-else style="font-size: 14px; color: #afabab">析</span>-->
                    </div>
                    <div class="sticky" @click="basketSticky(basket,i)"style="left:75px">  
                        <!--<i class = "el-icon-upload2"></i>-->
                        <img width="14px" :src="ishoverjt==i?'https://soket.daoyunxiang.com/icon/hoverjt.png':'https://soket.daoyunxiang.com/icon/jiantou.png'" @mouseleave="ishoverjt=-1" @mouseover="ishoverjt=i">
                    </div>

                    <div class="follow" :style="{marginLeft:(basket.is_animation == 0 ? '0px' : '')}">
                        <!--<i class = "el-icon-thumb"  :class="{'hover': basket.collect}" @click="userFollow(basket,i)"></i>-->
                        <img width="14px" :src="ishover==i?' https://soket.daoyunxiang.com/icon/hoverxx.png':'https://soket.daoyunxiang.com/icon/xing.png'" @mouseleave="ishover=-1" @mouseover="ishover=i">
                    </div> 
                </div>
                <div class = "operation" v-else>
                    <div class="live" style = "width:160px;"  @click="basketballevent(basket)">
                        <img src="@/assets/img/a_f.png" v-if="basket.is_animation == 1"/>
                    </div>
                </div>
            </div>
        </div>  
    </div>
    <notHave v-else-if='(type != 0 && basketball.length == 0 && type != 4) || (type != 0 && state == 0)'></notHave>
</template>

<script>
import notHave from "@/components/notHave.vue";
export default {
    props: ["basketball","type","state","baskejin","baszhujin"],
    name: "basket",
    components: {
        notHave
    },
    data() {
        return {
            ishoverjt:-1,
            ishover:-1
        }
    },


    methods:{       
        userFollow(basket,i){
            let data = {
                "basket":basket,
                "index":i,
                'record':'basket'
            }
            this.$emit('follow',data,)
        },

        basketSticky(basket,index){
            let data = {
                "basket":basket,
                'type':this.type,
                'index':index
            }
            this.$emit('basketSticky',data)
        },

        basketballevent(basket){
            let url = this.$router.resolve({
                name: 'basketballevent',
                query: { event_id: basket.id },
            })

            window.open(url.href, '_blank')    
        },
    }
}
</script>

<style lang="stylus">
    
</style>