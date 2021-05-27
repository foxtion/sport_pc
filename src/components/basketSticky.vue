
<template>
    <div v-if="basketball.length > 0">
        <div class = "basketball"  v-for="(basket, i) in basketball" :key="i" v-if="basket.is_retain">  
            <div class = "title">
                <div class = "event" >                   
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
                        <span style = "color:red;">{{basket.main_score}}</span>
                        <span>全：{{basket.deputy_score - basket.main_score}}</span>
                        <span>全：{{basket.main_score + basket.deputy_score}}</span>
                    </p>
                    <p class="away_team">
                        <span>{{basket.deputy_one_score + basket.deputy_two_score}}/{{basket.deputy_three + basket.deputy_four}}</span>
                        <span style = "color:red;">{{basket.deputy_score}}</span>
                        <span>半：{{(basket.deputy_one_score + basket.deputy_two_score)  -(basket.main_one_score + basket.main_two_score)}}</span>
                        <span>半：{{basket.main_one_score + basket.main_two_score + basket.deputy_one_score + basket.deputy_two_score}}</span>
                    </p> 
                </div>
                <div class = "finger">
                    <p class="home_team">
                        <span>1</span>
                        <span>1</span>
                        <span>1</span>
                    </p>
                    <p class="away_team">
                        <span>1</span>
                        <span>1</span>
                        <span>1</span>
                    </p> 
                </div>

                <div class = "operation" v-if="type != 3">
                    <div class="live" @click="basketballevent(basket)">
                        <img src="@/assets/img/a_f.png" v-if="basket.is_animation == 1 "/>
                        <!-- <img src="@/assets/img/a_v.png" v-else/> -->
                    </div>
                    <div class="sticky" @click="CancelbasketSticky(basket,i)" style="left:75px">
                        <i class = "el-icon-download"></i>
                    </div>
                    <div class="follow" :style="{marginLeft:(basket.is_animation == 0 ? '75px' : '')}">
                        <i class = "el-icon-thumb"  :class="{'hover': basket.collect}" @click="userFollow(basket,i)"></i> 
                    </div>
                </div>
                <div class = "operation" v-else>
                    <div class="live" style = "width:160px;" @click="basketballevent(basket)">
                        <img src="@/assets/img/a_f.png" v-if="basket.is_animation == 1"/>
                        <!-- <img src="@/assets/img/a_v.png" v-else/> -->
                    </div>
                </div>
            </div>
        </div>  
    </div>
</template>

<script>
export default {
    props: ["basketball","type"],
    name: "basketSticky",
    data() {
        return {
            
        }
    },

    mounted() {

    },

    methods:{       
        CancelbasketSticky(basket,index){
            let data = {
                "basket":basket,
                'type':this.type,
                'index':index
            }
            this.$emit('CancelbasketSticky',data)
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