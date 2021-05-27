<template>
    <div id="myHome">
        <div class="myHome-top">
            <div class="change-detail">
                <span @click="$router.push({ name: 'myProfile' })">修改资料</span>
                <div style="float:right;width: 140px;height: 40px;vertical-align:center;line-height: 27px;
                                 border: 1px solid;border-color: #BF965A;border-radius: 5px;display: flex;
                                 justify-items: center;align-items: center; padding-left: 36px;color:#BF965A;margin-top: 20px;" class="chongzhibtn">
                    <!--                                <img src="@/assets/img/score.png" style="position:relative; top:5px; margin-right:10px;"/>-->
                    <!--                                <span>{{ info.coin}} </span>-->
                    <span style="display: inline-block">我要直播</span>
                </div>
            </div>
            <div class="myHome-detail" >
                <img :src="avatar" class ="user_avatar" @mouseenter="is_uploader('show')" />

                <div class="avatar-uploader" @click="uploader" v-if = "is_show" @mouseleave="is_uploader('hide')">               
                    <span class = 'tips'>修改头像</span>
                </div>
                
                <input type="file" @change="uploadfile" ref="avatar" class = "fileImage">

                <div class = "user_details">
                    <div class="nickname">
                        <span class="value" v-if="user.user_nicename != '' ">{{ user.user_nicename }}</span>
                        <span class="value" v-else>{{ user.user_login }}</span>
                    </div>
                    <div class="lv-progress-box">
                        <div>
                            <!--<img src="@/assets/img/level.png" class = "level"/>-->
                            <el-tag type="info" effect="dark" size="small">Lv.{{ user.level }}</el-tag>
                        </div>
                        <div style="width: 40%">
                            <el-progress :percentage="50" color="#ffc71c" :stroke-width="15" ></el-progress>
                        </div>
                        <div>
                            <span>2</span>
                            <span>/</span>
                            <span>100</span>
                        </div>

                    </div>
                    
                    <ul class="sudoku">                                        
<!--                        <li>                     -->
<!--                            <el-popover placement="bottom" width="412" trigger="hover">-->
<!--                                <div class="getjinbi">-->
<!--                                    <div class="title">如何获得金币？</div>-->
<!--                                    <div class="conlist">-->
<!--                                        <img src="@/assets/img/score-tip1.png" alt />-->
<!--                                        <div>-->
<!--                                            <p>登录获得金币</p>-->
<!--                                            <p>每日登录可获得金币，连续登录天数越长，金币越多</p>-->
<!--                                        </div>-->
<!--                                    </div>-->
<!--                                    <div class="conlist">-->
<!--                                        <img src="@/assets/img/score-tip2.png" alt />-->
<!--                                        <div>-->
<!--                                            <p>观看直播获得金币</p>-->
<!--                                            <p>每观看十分钟直播，可以获得5点金币</p>-->
<!--                                        </div>-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                                <div slot="reference">-->
<!--                                    <p style="font-size: 16px; color: #777; font-weight: normal; line-height:30px;">-->
<!--                                        <img src="@/assets/img/my_coin.png" style="position:relative; top:5px; margin-right:5px;"/>-->
<!--                                        <span>{{ user.coin}}</span>-->
<!--                                    </p>-->
<!--                                </div>-->
<!--                            </el-popover>-->
<!--                        </li>-->
<!--                        <li>-->
<!--                            <p style="font-size: 16px; color: #777; font-weight: normal; line-height:30px;">-->
<!--                                <img src="@/assets/img/score.png" style="position:relative; top:5px;margin-right:5px;"/>-->
<!--                                <span>{{ user.coin}} </span>-->
<!--                            </p>-->
<!--                        </li>-->
                        <li>
                            <p style="font-size: 16px; color: #5A629E; font-weight: normal; line-height:30px;">
                                <span>我的钱包</span>
                                <img src="@/assets/img/score.png" style="position:relative; top:5px;margin-right:5px;"/>
                                <span>{{ user.coin}} </span>
                            </p>
                        </li>
                        <li>
                            <p style="font-size: 16px; color: #5A629E; font-weight: normal; line-height:30px;">
                                <span>可提现球钻</span>
                                <span>{{ user.coin}} </span>
                                <img src="@/assets/img/score.png" style="position:relative; top:5px;margin-right:5px;"/>
                            </p>
                            <el-popover placement="bottom" width="412" trigger="hover">
                                <div class="getjinbi">
                                    <div class="title">提现要求最低100球钻可提现，未满100球钻不可提取收益</div>
<!--                                    <div class="conlist">-->
<!--                                        <img src="@/assets/img/score-tip1.png" alt />-->
<!--                                        <div>-->
<!--                                            <p>登录获得金币</p>-->
<!--                                            <p>每日登录可获得金币，连续登录天数越长，金币越多</p>-->
<!--                                        </div>-->
<!--                                    </div>-->
<!--                                    <div class="conlist">-->
<!--                                        <img src="@/assets/img/score-tip2.png" alt />-->
<!--                                        <div>-->
<!--                                            <p>观看直播获得金币</p>-->
<!--                                            <p>每观看十分钟直播，可以获得5点金币</p>-->
<!--                                        </div>-->
<!--                                    </div>-->
                                </div>
<!--                                <div slot="reference">-->
<!--                                    <p style="font-size: 16px; color: #777; font-weight: normal; line-height:30px;">-->
<!--                                        <img src="@/assets/img/my_coin.png" style="position:relative; top:5px; margin-right:5px;"/>-->
<!--                                        <span>{{ user.coin}}</span>-->
<!--                                    </p>-->
<!--                                </div>-->
                            </el-popover>
                        </li>
                        <li>
                            <div style="float:right; margin-right:50px;width: 68px;height: 27px;vertical-align:center;line-height: 27px;
                                        background: -webkit-linear-gradient(271.510649665691deg, rgba(252, 216, 179, 1) 3%, rgba(185, 153, 119, 1) 97%);
                                        background: -moz-linear-gradient(178.489350334309deg, rgba(252, 216, 179, 1) 3%, rgba(185, 153, 119, 1) 97%);
                                        background: linear-gradient(178.489350334309deg, rgba(252, 216, 179, 1) 3%, rgba(185, 153, 119, 1) 97%);
                                        border: none;border-radius: 5px;display: flex;justify-items: center;align-items: center; padding-left: 17px;color: white;" class="chongzhibtn">
                                <!--                                <img src="@/assets/img/score.png" style="position:relative; top:5px; margin-right:10px;"/>-->
                                <!--                                <span>{{ info.coin}} </span>-->
                                <span style="display: inline-block"  @click="$router.push({name: 'recharge'})">充值</span>
                            </div>
                        </li>
                        <li>
                            <div style="float:right; margin-right:50px;width: 68px;height: 27px;vertical-align:center;line-height: 27px;
                                        background: -webkit-linear-gradient(271.510649665691deg, rgba(252, 216, 179, 1) 3%, rgba(185, 153, 119, 1) 97%);
                                        background: -moz-linear-gradient(178.489350334309deg, rgba(252, 216, 179, 1) 3%, rgba(185, 153, 119, 1) 97%);
                                        background: linear-gradient(178.489350334309deg, rgba(252, 216, 179, 1) 3%, rgba(185, 153, 119, 1) 97%);
                                        border: none;border-radius: 5px;display: flex;justify-items: center;align-items: center; padding-left: 17px;color: white;" class="chongzhibtn">
                                <!--                                <img src="@/assets/img/score.png" style="position:relative; top:5px; margin-right:10px;"/>-->
                                <!--                                <span>{{ info.coin}} </span>-->
                                <span style="display: inline-block" @click="$router.push({name: 'withDrawal'})">提现</span>
                            </div>
                        </li>
                        <li>
                            <p style="font-size: 16px; color: #5A629E; font-weight: normal; line-height:30px;">
                                <span>我的粉丝 : </span>
<!--                                <img src="@/assets/img/score.png" style="position:relative; top:5px;margin-right:5px;"/>-->
                                <span>{{ user.coin || 10000}} </span>
                            </p>
                        </li>
                    </ul> 
                </div>              
            </div>
        </div>
    </div>
</template>

<script>
import { UploadPictures,GetUserinfo} from '@/api'
export default {
    name: "myHome",
    data() {
        return {
            avatar: "",
            user: {},
            baseImage:'',
            is_show: false,
            token:''
        }; 
    },
    mounted() {
        let user = JSON.parse(window.localStorage.getItem("user"))  
        this.token = window.localStorage.token 
        console.log(window.localStorage)
        if(user){
            this.user = user.id
            this.avatar = this.user.avatar  
        } else{
            this.$router.push({ name: "/" });
        }  
        this.getUserinfo()
    },
    methods: {
        //充值
        withdrawal(){


        },
        getUserinfo(){
            const params = {
                uid:this.user,
                token:this.token,
                source:'pc'
            }
            console.log(params)
            GetUserinfo(params).then(res=>{
                console.log(res)
            })
        },

        is_uploader(type){
            if(type == 'show'){
                this.is_show = true
            }else{
                this.is_show = false
            }
        },

        uploader(){
            this.$refs.avatar.click()
        },
        
        uploadfile(e){
            var files = e.target.files || e.dataTransfer.files;         
            if (!files.length) return;

            let that = this
            let reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload =function(e){
                that.baseImage = e.target.result
            };
                       
            setTimeout(() => { 
                var data ={
                    "uid":that.user.id,
                    "file":that.baseImage,
                }           
                this.Upload_Pictures(data)
            }, 1000);           
        },

        async Upload_Pictures(data){
            let res = await UploadPictures(data)
            if(res.code == 0){
                this.user.avatar = res.info.avatar
                this.user.avatar_thumb = res.info.avatar_thumb
                this.avatar = res.info.avatar
                window.localStorage.setItem("user",JSON.stringify(this.user))
                this.$message({
                    message: res.msg,
                    type: "success",
                });
            }else{
                this.$message({
                    message: res.msg,
                    type: "warning",
                });
            }
        },        
    }
};
</script>

<style lang="stylus">
.getjinbi {
    color: #333;
    .title {
        margin-left: 5px;
        margin-bottom: 26px;
        font-size: 18px;
        font-weight: 600;
    }

    .conlist {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        img {
            width: 50px;
            margin-right: 10px;
        }

        p:first-child {
            font-size: 14px;
            font-weight: 600;
            color: #000;
            margin-bottom: 4px;
        }

        p:last-child {
            font-size: 12px;
            color: #777;
        }
    }
}

#myHome {   
    background: #fff;
    margin-bottom: 20px;
    .myHome-top {
        position: relative;
        height :180px;
        padding:20px 0px 0px 20px;
        .change-detail {
            position: absolute;
            float: right;
            width: 76px;
            height: 32px;
            top: 35px;
            right: 59px;
            line-height: 32px;
            border-radius: 4px;
            border: 1px solid #bcbcbc;
            font-size: 14px;
            color: #777;
            text-align: center;
            cursor: pointer;
            z-index :200;
        }

        .change-detail:hover {
            color: #f8c21b;
            border: 1px solid #f8c21b;
        }

        .myHome-detail {
            position: relative
            .user_details{
                width:80%;
                height :150px;
                position :absolute;
                left:150px;
            }

            .fileImage{
                display: none;
            }
             
            .avatar-uploader{
                width:120px;
                height :120px;
                border-radius: 50%;
                background:#33333382;
                position:absolute;
                top:20px;
                left:10px;
                cursor: pointer;
                z-index :100; 

                .tips{
                    margin:55px 0px 0px 35px;
                    display: block;
                    color:#ffcd00;
                    font-size:12px;
                    letter-spacing :1px;
                }              
            }

            .user_avatar{
                width: 100px;
                height: 100px;
                margin: 30px 30px 10px 20px;
                float: left;
                cursor: pointer;
                border-radius:50%;
            }

            .nickname {
                width:80%;
                font-size: 24px;
                font-weight: bold;
                float:left;
                margin:25px 20px 10px 0px;
                height :30px;
                line-height :30px;
            }

            .lv-progress-box {
                margin-bottom: 10px;
                justify-content: center;
                align-items: center;
                width : 85%;
                float:left;

                .level{
                    width:50px;
                    position: relative;
                    top:5px;
                    margin-right:5px;
                }

                .el-progress{
                    margin:6px 5px 0 20px;
                }

                .el-progress__text {
                    display: none;
                }

                >div{
                    float:left; 
                    height : 30px;
                    line-height :30px;
                }

                >span {
                    font-size: 14px;
                    font-weight: 600;
                    color: #777;
                }                
            }

            .sudoku {
                height :30px;
                line-height :30px;
                width:85%;
                float:left;
                li {
                    float:left;
                    width :20%;
                        p:first-child {
                        font-size: 20px;
                        font-weight: 600;
                    }

                    p:last-child {
                        font-size: 16px;
                        color: #777;
                    }
                }
            }
        }
    }

    .myHome-bottom {
        margin: 0 50px 156px;
        border-top: solid 1px #eaeaea;
        clear: both;
        .title {
            margin: 50px auto 24px 3px;
            font-size: 24px;
            font-weight: 600;
            letter-spacing 1px;
        }

        .zhgl {
            display: flex;
            justify-content: space-between;

            >div {
                width: 406px;
                padding: 26px 34px 26px 30px;
                border-radius: 4px;
                border: 1px solid #ddd;
                margin-bottom:10px;
                img {
                    float: left;
                    width: 64px;
                    height: 64px;
                    margin-right: 10px;
                }

                .text {
                    float: left;
                    margin-top: 10px;

                    span:first-child {
                        display: inline-block;
                        margin-bottom: 6px;
                        font-size: 16px;
                        font-weight: 600;
                    }

                    span:last-child {
                        font-size: 12px;
                        color: #777;
                    }
                }

                .btn {
                    float: right;
                    width: 68px;
                    height: 26px;
                    font-size: 12px;
                    margin-top: 19px;
                    line-height: 26px;
                    text-align: center;
                    background: #ffc71c;
                    border-radius: 2px;
                    cursor: pointer;
                    color: #fff;
                }
            }
        }
    }
}
</style>