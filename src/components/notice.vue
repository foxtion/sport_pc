
<template>
    <div class = 'notice' :style="{transform:trans}">
        <div class="time">
            <span>79'</span>
        </div>

        <div class="badge">
            <i class="el-icon-football" :style="{transform:angle}"></i>
            <!-- <i class="el-icon-basketball"></i> -->
        </div>

        <div class="team">
            <span>斯瓦达彼尔姆</span>
            <span>伊泽夫斯克</span>
        </div>

        <div class="type">
            <span>进球</span>
        </div>

        <div class="line"></div>
        <div class="sorce">
            <span style="color:#ff0000">2</span>
            <span>1</span>
        </div>
    </div> 
</template>

<script>
export default {
    props: ["football","type"],
    name: "notice",
    data() {
        return {
            angle:'rotate(0deg)',
            trans:'translate(-10px,50px)'
        }
    },

    mounted() {       
        this.rotation()
    },

    methods:{
        rotation(){
            let angle = 0
            let time = 0
            let timer = setInterval(() => {
                angle++
                time++
                this.angle = 'rotate('+angle+'deg)' 
                if(time > 1000){
                    clearInterval(timer)
                }
            }, time);
        },
    }
}
</script>


<style lang="stylus">
.notice{
    position: fixed;
    width:340px;
    height: 80px;
    background: #fff;
    top:80px;
    right:0px;
    z-index:1000;
    border-radius: 8px;
    box-shadow:0px 0px 5px #b3b1b1;
    >div{
        float:left;       
    }

    .time{
        line-height:80px;
        width:50px;
        text-align: center;
    }

    .badge{
        width:50px;
        line-height:80px;
        text-align: center;
        i{
            font-size: 40px;
            position: relative;
            top:8px;            
        }
    }

    .team{
        width:130px;        
        >span{
            display: block;
            height:40px;
            line-height:40px;
            letter-spacing:1px;
            margin-left:10px;
            font-size:14px;
        }        
    }

    .type{
        width:60px;
        line-height:80px;
        span{
            color:#00f;
            letter-spacing:1px;
            font-size:16px;
        }
    }

    .line{
        width:2px;
        height: 60px;
        background: #807e7e;
        margin-top:10px;
    }

    .sorce{
        width:40px;        
        >span{
            display: block;
            height:40px;
            line-height:40px;
            letter-spacing:1px;
            text-align: center;
            font-size:20px;
            font-weight:500;
            padding-left:5px;
        } 
    }
}
</style>