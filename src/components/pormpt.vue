
<template>
    <div>
        <audio :src="paly_url" controls autoplay="autoplay" ref="audio" hidden="true"></audio>
        <el-dropdown @command="pormptType">
            <span class="el-dropdown-link" style = "width:100px;left:30px; background: linear-gradient(180deg, rgba(87, 238, 255, 1) 0%, rgba(129, 211, 248, 1) 49%, rgba(37, 149, 230, 1) 94%);;font-size: 14px">
            <i class = "el-icon-turn-off-microphone" style="color: white;"></i>
            <strong style="margin:0px 5px 0px 10px; color:#fff; font-weight: 500;">{{pormpt_default.name}}</strong>
            <i class="el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">                    
                <el-dropdown-item v-for="(val, i) in pormpt" :command="val.type" :class="{active:val.type == pormpt_default.type}">
                    {{val.name}}
                </el-dropdown-item>
            </el-dropdown-menu>               
        </el-dropdown>
    </div> 
</template>

<script>
import config from "_s/config.js";
export default {
    name: "pormpt",
    data() {
        return {
            pormpt:[
                {'name':'鼓咚','type':'gudong'},
                {'name':'警报','type':'jingbao'},
                {'name':'卡通','type':'katong'},
                {'name':'默认','type':'moren'},
                {'name':'踢球','type':'tiqiu'},
                {'name':'小号','type':'xiaohao'},
                // {'name':'胜利','type':'victory'}
            ],
            pormpt_default:{'name':'默认','type':'moren'},
            paly_url:''
        }
    },

    mounted() {        
        let paly_url = JSON.parse(window.localStorage.getItem("paly_url")); 
        paly_url =  paly_url ?　paly_url:'';     
        if(paly_url != ''){            
            this.paly_url = paly_url.url
            this.pormpt.forEach((val,i) => {
                if(val.type == paly_url.type){
                    this.pormpt_default = val
                }
            })
        }else{
            this.paly_url = config.api + '/static/pormpt/moren.mp3'
            window.localStorage.setItem("paly_url", JSON.stringify({"url":this.paly_url,'type':'default'}));
        }

    },

    methods:{
        pormptType(v){
            switch(v){
                case 'gudong':
                    this.paly_url = config.api + '/static/pormpt/gudong.mp3'
                    break;
                case 'jingbao':
                    this.paly_url = config.api + '/static/pormpt/jingbao.mp3'
                    break;
                case 'katong':
                    this.paly_url = config.api + '/static/pormpt/katong.mp3'
                    break;
                case 'moren':
                    this.paly_url = config.api + '/static/pormpt/moren.mp3'
                    break;
                case 'tiqiu':
                    this.paly_url = config.api + '/static/pormpt/tiqiu.mp3'
                    break;
                case 'xiaohao':
                    this.paly_url = config.api + '/static/pormpt/xiaohao.mp3'
                    break;
            }

            if(v != 'mute'){
                this.$refs.audio.currentTime = 0;
                setTimeout(() => {
                    this.$refs.audio.play();
                }, 10);                
            } 

            this.pormpt.forEach((val,i) => {
                if(val.type == v){
                    this.pormpt_default = val
                }
            })       
            window.localStorage.setItem("paly_url", JSON.stringify({"url":this.paly_url,'type':v}));
        }
    }
}
</script>


<style lang="stylus">
.el-dropdown-menu__item{
    padding:0px 35px;   
} 

.el-dropdown-menu{
    top:130px !important;
    color: #555555;
     background:white;
    box-shadow: 4px 5px 5px #c5c5c5;
    .active{
        color: #0400B4;
        height:35px;
        box-shadow: 4px 5px 5px #c5c5c5;
        background: linear-gradient(
                180deg
                , rgba(87, 238, 255, 1) 0%, rgba(129, 211, 248, 1) 49%, rgba(37, 149, 230, 1) 94%);
        border-radius:8px;
    }
}
</style>