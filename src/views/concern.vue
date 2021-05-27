<template>
  <div id="concern">
    <h4>我的关注</h4>

    <div>
        <el-tabs type="border-card" :stretch='true' @tab-click="followChange" v-model="team">
            <el-tab-pane name="football">
                <span slot="label">
                    足球 <i class="el-icon-football"></i>
                </span>                                                             
                <div class="football_match">
                    <div class="match-data">               
                        <div class="match-card">
                            <div class="text">
                                <span>赛事</span>                       
                            </div>
                            <div class="event_time" >                      
                                <span>时间</span>
                            </div>

                            <div class="status">                      
                                <span>状态</span>
                            </div>

                            <div class="team" >
                                <div class="host">
                                    <span>主队</span>
                                </div>
                                <div class="sorce">
                                    <span style="position: relative; left:20px;">比分</span>
                                </div>
                                <div class="guest">
                                    <span style="position: relative; left:40px;">客队</span>
                                </div>
                            </div>

                            <div class="stage">
                                <span>半场</span>
                                <span>角球</span>
                            </div>

                            <div class="live">
                                <span style="position: relative; left:5px;">直播</span>
                            </div>

                            <div class="follow">
                                <span style="position: relative; right:10px;">关注</span>
                            </div>                   
                        </div>
                    </div>
                    
                    <div style="height: 450px; overflow-y: scroll;" v-if="is_football">
                        <div class="football_conduct" v-if="football_conduct_list.length > 0">
                            <div class = "title">
                                <img src="@/assets/img/foot-begin.png"/>
                                <span>正在进行的比赛</span>
                            </div>
                        </div>
                        
                        <foot :football="football_conduct_list" :type="type" @follow="follow"></foot>

                        <div class="football_conduct" v-if="football_not_list.length > 0">
                            <div class = "title">
                                <img src="@/assets/img/foot-next.png"/>
                                <span>未开始的比赛</span>
                            </div>
                        </div>
                        
                        <foot :football="football_not_list" :type="type" @follow="follow"></foot>
                    </div>

                    <noData v-else></noData>
                </div>                                        
            </el-tab-pane>

            <el-tab-pane name="basketball">
                <span slot="label">
                    <i class="el-icon-basketball"></i>篮球
                </span>
                               
                <template v-if='is_basketball'>
                    <div class="basketball_conduct" v-if="basketball_conduct_list.length > 0">
                        <div class = "title">
                            <img src="@/assets/img/foot-begin.png"/>
                            <span>正在进行的比赛</span>
                        </div>
                    </div>
                    
                    <basket :basketball="basketball_conduct_list" :type="type" @follow="follow"></basket>

                    <div class="basketball_conduct" v-if="basketball_not_list.length > 0">
                        <div class = "title">
                            <img src="@/assets/img/foot-next.png"/>
                            <span>未开始的比赛</span>
                        </div>
                    </div>
                    
                    <basket :basketball="basketball_not_list" :type="type" @follow="follow"></basket>
                </template>
                <noData v-else></noData>                
            </el-tab-pane>
        </el-tabs>
    </div>   
  </div>
</template>

<script>
import noData from "@/components/noData.vue"; 
import notHave from "@/components/notHave.vue";
import foot from "@/components/foot.vue";
import basket from "@/components/basket.vue";
import { FollowFootballList, FollowBasketballList, CancelFollowFootball,CancelFollowBasketball } from '@/api'

export default {
    name: "concern",
    components: {
        noData,
        notHave,
        foot,
        basket
    },

    data() {
        return {
            football_conduct_list: [],
            football_not_list: [],
            basketball_conduct_list: [],
            basketball_not_list: [],
            user_id:0,
            type:0,
            is_football:1,
            is_basketball:1,
            team:'football',
            load_basket:0
        };
    },

    mounted() {
        let user = JSON.parse(window.localStorage.getItem("user"));
        console.log(user)
        if(user){
            this.user_id = user.id
            this.FollowFootball()
        }        
    },

    methods: {
        followChange(tab, event){ 
            this.team = tab.name
            if(this.team == 'basketball'){
                this.FollowBasketball()
            }
        },

        async FollowFootball(){
            let data = {
                'uid' : this.user_id
            }

            let res = await FollowFootballList(data)
            if(res.code == 200 || res.code == 0){
                this.football_conduct_list = res.info.conduct
                this.football_not_list = res.info.not 
                
                if(this.football_conduct_list.length == 0 && this.football_not_list.length == 0){
                    this.is_football = 0
                }
            }           
        },

        async FollowBasketball(){
            let data = {
                 'uid' : this.user_id
            }

            let res = await FollowBasketballList(data)
            if(res.code == 200 || res.code == 0){
                this.basketball_conduct_list = res.info.conduct
                this.basketball_not_list = res.info.not
                if(this.football_conduct_list.length == 0 && this.football_not_list.length == 0){
                    this.is_basketball = 0
                }              
            }
        },

        follow(data){ 
            console.log(data)
            this.$confirm('是否取消关注', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.log(data.record)
                if(data.record == 'foot'){
                    this.CancelFollowFootball(data.foot.id,data.index,data.foot.type)                   
                }else{
                    this.CancelFollowBasketball(data.basket.id,data.index,data.basket.type)                    
                }               
            }).catch(() => {
                     
            });          
        },

        async CancelFollowFootball(id,index,type){
            let data = {
                'uid' : this.user_id,
                'id' : id
            }
        
            let res = await CancelFollowFootball(data)
            if(res.code == 0){
                if(type == 'not'){
                    this.football_not_list.splice(index, 1)
                }

                if(type == 'conduct'){
                    this.football_conduct_list.splice(index, 1)
                }

                if(this.football_conduct_list.length == 0 && this.football_not_list.length == 0){
                    this.is_football = 0
                }

                setTimeout(() =>{
                    this.$message({
                        message: res.msg,
                        type: "success"
                    }) 
                },1000)                            
            }
        },

        async CancelFollowBasketball(id,type){
            let data = {
                'uid' : this.user_id,
                'id':id
            }

            let res = await CancelFollowBasketball(data)
            if(res.code == 0){
                if(type == 'not'){
                    this.basketball_not_list.splice(index, 1)
                }

                if(type == 'conduct'){
                    this.basketball_conduct_list.splice(index, 1)
                }

                if(this.football_conduct_list.length == 0 && this.football_not_list.length == 0){
                    this.is_basketball = 0
                }

                setTimeout(() =>{
                    this.$message({
                        message: res.msg,
                        type: "success"
                    }) 
                },1000) 
            }
        }
    }
};
</script>

<style lang="stylus">
#concern {
    padding: 32px 0 32px 47px;

    >div {
        padding: 0 60px 0 0;
    }

    >h4 {
        font-size: 18px;
        font-weight: 600;
        border-left: 3px solid #ffc71c;
        padding-left: 10px;
        margin-bottom: 20px;
    }

    .el-tabs__item{
        height:60px;
        line-height: 60px;
        font-size:18px;
        letter-spacing:1px;
        border-left-color:#DCDFE6;
        width:50%;
    }

    .el-icon-football{
        font-size:30px;
        position: relative;
        top:5px;
    }

    .el-icon-basketball{
        font-size:30px;
        position: relative;
        top:5px;
        margin-right: 10px;
    }

    .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
        border-right-color:#fff;
    }

    .el-tabs--border-card>.el-tabs__content{
        height: 520px;
    }

    .football_match {
        height :520px;
        .match-data{
           width:100%;
           height: 40px;
           line-height:40px;
        }

        .football_conduct{
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

        .match-box {
            margin-top: 20px;
            .match-data {             
                .match-card {
                    height: 80px;
                    line-height :80px;
                    background: #fff;
                    border-radius: 4px;
                    margin-bottom: 16px;
                    display: flex;
                    align-items: center;
                    cursor: pointer;

                    .text {
                        width: 185px;
                        height :50px;
                        line-height :50px;
                        text-align :center;
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
                        font-size: 16px;
                        text-align :center;
                        span{
                            position: relative;
                            text-align :center;
                            display :table-cell;
                            right:50px;
                        }
                    }

                    .live{
                        width:100px;
                        text-align :center;
                        img{
                            width:35px;
                            position: relative;
                            top:12px;
                            right:20px;
                        }
                    }

                    .follow{
                        width:130px;
                        text-align :center;
                        i{
                            font-size:24px;
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

        .match-data {
            .match-card {                
                background: #d6d6d6;
                box-shadow: -1px 1px 5px #ecebeb;
                border-radius: 4px;
                margin-bottom: 16px;
                display: flex;

                .text {
                    width: 180px;
                    text-align :center;
                    .title {
                        font-size: 16px;
                    }
                }

                .event_time{
                    text-align :center;
                    width:80px;
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
                        width:100px;
                        text-align: center;
                        display: inline-block;                        
                    }

                    .sorce {
                        width:100px;
                        text-align: center;
                        display: inline-block;
                    }

                    .guest {
                        width:100px;
                        text-align: center;
                        display: inline-block;
                    }
                }

                .stage {
                    width:200px;
                    font-size: 16px;
                    text-align :center;
                    position: relative;
                    left:50px;                   
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

    .basketball{
        width:1000px;
        height:120px;
        background: #fff;
        margin-bottom:20px;
        border-radius: 8px;
        .title{
            background:#f8fff4;
            height:40px;
            line-height:40px;
            box-shadow:0 0 1px 1px #ddd;
            width:1000px;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            div{
                float :left;
            }
            .event{
                width:280px;
                line-height:40px;
                height:40px;
                font-size:12px;
                border-right:1px solid #dbdbdb;
                p{
                    line-height:40px;
                    height:40px;
                }
                .event_name {
                    width:130px;
                    float :left;
                    text-align:center;
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
                width:161px;
                line-height:40px;
                height:40px;
                font-size:12px;
                border-right:1px solid #dbdbdb;
                span {
                    display :block; 
                    width:40px; 
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
                width:181px;
                line-height:40px;
                height:40px;
                font-size:12px;                
                span {
                    display :block; 
                    width:60px; 
                    float:left;  
                    text-align:center; 
                    border-right:1px solid #dbdbdb;                      
                }
            }

            .operation{
                width:120px;
                line-height:40px;
                height:40px;
                font-size:12px;
                span {
                    display :block; 
                    width:60px; 
                    float:left;  
                    text-align:center;         
                }
            }
        }

        .content{
            width:1000px;
            height:80px;
            box-shadow:0px 1px 1px 1px #ddd;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
            div{
                float :left;
            }

            .event{
                width:280px;
                border-right:1px solid #dbdbdb;
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
                    width:150px;
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
                width:161px;
                height:80px;
                border-right:1px solid #dbdbdb;
                .home_team{
                    height:40px; 
                    border-bottom:1px solid #dbdbdb;               
                    span{
                        display:block;
                        float:left;
                        text-align:center;
                        width:40px;
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
                        width:40px;
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
                        color:white;    
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
                        color:white;    
                    }                  
                }
            }

            .operation{
                width:120px;
                .live{
                    width:60px;
                    text-align:center;
                    line-height:80px;
                    cursor: pointer;
                    img{
                        width:35px;
                        position:relative;
                        top:10px;
                    }
                }
                .follow{
                    width:60px;
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

    .basketball_conduct{
        line-height :40px;
        height :40px;
        text-align :center;
        width :100%;       
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

    .basketball:hover{
        background: #fff;
        box-shadow: 0px 0px 5px #b3b1b1;
    }   
}
</style>