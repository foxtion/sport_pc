<template>
    <div id="myHome">
        <div class="myHome-bottom">
            <div class="title">我的资料</div>
            <div class="title">账号管理</div>
            <div class="zhgl">
                <div>
                    <img src="@/assets/img/phone.png" />
                    <div class="text">
                        <span>我的手机</span>
                        <br />
                        <span>已经绑定手机号码</span>
                    </div>
                    <div class="btn" @click="$router.push({ name: 'changePhone' })">
                        更换手机
                    </div>
                </div>
                <div>
                    <img src="@/assets/img/password.png" />
                    <div class="text">
                        <span>我的密码</span>
                        <br />
                        <span>已经设置密码</span>
                    </div>
                    <div class="btn" @click="$router.push({name: 'changePassword'})">更改密码</div>
                </div>
            </div>
            <div class="zhgl">
                <div>
                    <img src="@/assets/img/phone.png" />
                    <div class="text">
                        <span>绑定银行卡</span>
                        <br />
                        <span>未绑定银行卡</span>
                    </div>
                    <div class="btn" @click="$router.push({ name: 'bindBankCard' })">
                        绑定银行卡
                    </div>
                </div>
                <div>
                    <img src="@/assets/img/password.png" />
                    <div class="text">
                        <span>设置支付密码</span>
                        <br />
                        <span>未设置支付密码</span>
                    </div>
                    <div class="btn" @click="$router.push({name: 'SecurityPass'})">设置支付密码</div>
                </div>
            </div>
            <div class="zhgl">
                <div>
                    <img src="@/assets/img/phone.png" />
                    <div class="text">
                        <span>立即认证</span>
                        <br />
                        <span>未认证</span>
                    </div>
                    <div class="btn" @click="$router.push({ name: 'realName' })">
                        立即认证
                    </div>
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