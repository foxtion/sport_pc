
<template>
    <div>
        <div class="notice">
            <i class="el-icon-bell"></i>
            <span class = 'inform'>公告:</span>
            <div class="inform_message">
                中新网北京1月22日电 (记者 张素) 针对中方宣布对蓬佩奥等人实施制裁
            </div>
        </div>
        <el-tabs>
            <el-tab-pane label="聊天室">
                <div class="scoller chatroom" id="chatplace" style="overflow:scroll; ">

                </div>                       
            </el-tab-pane>                                           
        </el-tabs>
        <div style="padding: 5px 0"> 
            <div style="padding: 0 10px; display: flex; align-items: center">
                <el-popover placement="top" trigger="click">
                    <div>
                        <ul style="display: flex; width: 330px; flex-wrap: wrap">
                            <li data-id="grinning" style="font-size: 24px" v-for="item in emojilist" :key="item" @click="addemoji(item)">
                                {{ item }}
                            </li>
                        </ul> 
                    </div>
                    <img slot="reference"  src="@/assets/img/xiao.png" alt style="width: 20px; width: 20px; margin-right: 14px; cursor: pointer;" />
                </el-popover>                           
            </div>                       
            <div style="display: flex; align-items: center; padding: 0 10px; height: 60px;">
                <el-input placeholder="请输入内容" type="textarea" rows="2" resize="none"   v-model="sendContent"></el-input>
                <el-button @click="sendXiaoXii" type="primary" style=" height: 54px; border-radius: 0; background: #f8c21b; border-color: #f8c21b;">
                    发送
                </el-button>
            </div>
        </div>
    </div>   
</template>

<script>
let wser = new WebSocket("wss://soket.daoyunxiang.com:8989");

var userdata = JSON.parse(window.localStorage.getItem("user"));
if(userdata!==null){
  var usernamer=userdata.user_nicename
    var uid=userdata.uid
}else{
  var usernamer='';
}

var queryyy = window.location.toString();

var pair = queryyy.split("=");

 var roomid= pair[1];

wser.onopen = function()
{
  if(usernamer!=''){
    wser.send('{"type":"login","channel":"'+roomid+'","username":"'+usernamer+'","sign":""}');
  }
};
wser.onmessage = function (evt)
{
  var received_msg = evt.data;
  if(received_msg.indexOf("ping")==-1){

    var neir=JSON.parse(received_msg);
    if(neir.channel==roomid){
    if(neir.type=='say'){
      if(neir.id==uid){
        document.getElementById("chatplace").innerHTML = document.getElementById("chatplace").innerHTML+'<br> <img width="20px" src="'+neir.avatar+'"> <span style="color:#6daade;">'+neir.username+"</span>： "+neir.content;

      }else{
        document.getElementById("chatplace").innerHTML = document.getElementById("chatplace").innerHTML+'<br> <img width="20px" src="'+neir.avatar+'"> <span style="color:#6daade;">'+neir.username+"</span>：  <span style='color:HotPink '>"+neir.content+"</span>";
      }
    }else if(neir.type=='login'){
      document.getElementById("chatplace").innerHTML = document.getElementById("chatplace").innerHTML+'<br><div class="notification">欢迎 <span style="color:#6daade;"> '+neir.username+'</span> <span style="color:green;"> 进入聊天室</span></div>';
    }
  }
  }
};
export default {
  data() {
    return {
      emojilist: [
        "😀","😁","😃", "😄", "😅", "😆","😇","😉", "😊","🙂", "😋","😍","😘", "😗","😙","😚", "😜","😝", "😛", "😎",
        "🙄", "😳","😡", "😕","😫", "😤","😨","😥","😪", "😓", "😵", "😲", "🤧", "😷", "🤒", "🤕","😴", "💤", "👏",
        "🤙","👍", "👎", "👊", "✊", "✌", "👌", "✋", "🤚", "💪", "🤝", "👈","👉","🖕","🖐","👄","👂", "👀","🎅", "🌞", "🌙",
        "⭐", "⚡","🔥", "❄️", "⚽", "🏀", "🏈", "⚾", "🎁", "🎉", "✒️", "📝", "❤️", "💛",  "💚", "🆚", "💬", "🕐",
      ],
      'sendContent':'',
      user:'',
      usernamer:'',
      avatar:'',
        uid:0
    }
  },


  methods: {

    sendXiaoXii(val)
    {
      this.user = JSON.parse(window.localStorage.getItem("user"));
      if(this.user!==null){
        this.usernamer=this.user.user_nicename,
            this.avatar=this.user.avatar,
            this.uid=this.user.uid
      }else{
      alert("请先登录")
        return
       this.usernamer=usernamer;
      }
      if(this.sendContent==''){
          return
      }
      var signature='channel='+roomid+'&content='+this.sendContent+'&type=say&username='+this.usernamer+'$key=900150983cd24fb0d6963f7d28e17f72'
        signature=this.$md5(signature);
      wser.send('{"type":"say","channel":"'+roomid+'","username":"'+this.usernamer+'","avatar":"'+this.avatar+'","id":"'+this.uid+'","content":"'+this.sendContent+'","sign":"'+signature+'"}');
      this.sendContent='';
    },
    addemoji(val) {
      this.sendContent += val;
    },


  },
}
</script>


<style lang="stylus">
    .chat {
        width: 330px;
        height: 720px;      

        .notice {
            padding: 14px;

            .inform{
                font-size: 16px;
                font-family: '黑体';
                margin-left: 5px;
                line-height: 30px;
                height: 30px;
            }

            .inform_message{
                font-size:14px;
                line-height: 20px;
            }
        }

        .el-tabs__nav-scroll {
            display: flex;
            justify-content: center;
        }

        .el-tabs__item.is-active {
            font-weight: bold;
            color: #000;
        }

        .el-tabs__item:hover {
            color: #000;
        }

        .el-tabs__active-bar {
            background-color: #ffb600;
        }

        .scoller {
            height: 470px;
            overflow-y: overlay;

            .notification{
                width:100%;
                line-height: 30px;
                height: 30px;
                background:#fcd798;
                font-size:14px;
                padding-left:10px;

                >span{
                    letter-spacing: 1px;
                }
                
                .login_user{
                    color:#a3abe5;
                    margin:0px 10px 0px 10px;
                }                       
            }

            .user{
                width:100%;
                line-height: 25px;
                height: 25px;
                font-size:14px;
                text-align: left;
                letter-spacing: 1px;
                .name{
                    color:#a3abe5;
                }

                .colon{
                    margin-right: 5px;
                }
            }

            .current_use{
                width:100%;
                line-height: 25px;
                height: 25px;
                font-size:14px;
                text-align: right;
                padding-right: 10px;
                letter-spacing: 1px;
                .name{
                    color:#f00;
                }

                .colon{
                    margin-left: 5px;
                }
            }
        }

        .rankinglist {
            li {
                height: 60px;
                padding: 0 14px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                >div {
                    display: flex;
                    align-items: center;

                    span:nth-child(1) {
                        width: 16px;
                        height: 16px;
                        text-align: center;
                        line-height: 16px;
                        font-size: 14px;
                        font-weight: bold;
                    }

                    .el-avatar {
                        margin: 0 5px 0 13px;
                    }

                    span:nth-child(3) {
                        font-size: 14px;
                        margin-right: 10px;
                    }
                }
            }
        }

        .scoller::-webkit-scrollbar {
            display: none;
        }

        .chatroom {
            background: #f4f4f4;

            .van-image {
                vertical-align: middle;
            }
        }

        .giftdonghua {
            position: absolute;
            left: 0;
            width: 50%;
            height: 50px;
            background: rgba(0, 0, 0, 0.5);
            top: 43%;
            border-radius: 0 50px 50px 0;
            z-index: 999;
            color: #fff;
            padding: 0 32px;
            font-size: 14px;

            p {
                line-height: 25px;
            }

            p:first-child {
                color: #f8c21b;
                font-weight: bold;
                font-size: 18px;
            }
        }

        .el-textarea__inner {
            border-radius: 0;
        }
    }
</style>