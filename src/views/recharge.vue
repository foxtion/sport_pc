<template>
    <div id="recharge">
        <h4>用户充值</h4>
        <div>
            <p>充值金额:</p>
            <div class="rechargenum" style="overflow: hidden">
                <ul>
                    <li  class="item"
                    v-for="(item, index) in longzuan"
                    :key="index"
                    :class="{active: active === index}"
                    @click="change(item, index)"><p>龙钻</p><p>¥{{ item.zuan }}</p></li>
                    <li><p><el-input v-model="other"  placeholder="其它" @blur="burchang()"></el-input></p></li>
                </ul>
            </div>
            <div class="rechargeMode">
                <p>支付方式:</p>
                <ul>
                    <li :class="{payactive : payactive ==1 }"  @click="changepay(1)"><i></i><span>支付宝</span></li>
                    <li :class="{payactive : payactive ==2 }"  @click="changepay(2)"><i></i><span>微信</span></li>
                </ul>
            </div>
            <div class="rechargenubms">
                <p>应付金额:<span>{{ money }}</span><span>元</span></p>
            </div>
        </div>
        <el-form :model="registerForm"  ref="registerForm">
            <el-form-item>
                <div style="display: flex; justify-content: center">

                    <el-button type="primary" style="width: 140px;height: 40px;background: linear-gradient(180deg, rgba(237, 205, 176, 1) 0%, rgba(218, 175, 107, 1) 103%); border-color: #f8c21b" @click="registerSub('registerForm')">
                        充值
                    </el-button>
                    <el-button type="primary" style="width: 140px;height: 40px;background: linear-gradient(180deg, rgba(237, 205, 176, 1) 0%, rgba(218, 175, 107, 1) 103%); border-color: #f8c21b" @click="cancel()">
                        取消
                    </el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {Getcode,SecurityPass} from '@/api'
    import envconfig from "../server/config.js";
    export default {
        name: "recharge",
        data() {
            return {
                active: 0,
                payactive: 1,
                longzuan: [
                    {zuan: 1, idnex: 0},
                    {zuan: 10, idnex: 1},
                    {zuan: 50, idnex: 2},
                    {zuan: 100, idnex: 3},
                    {zuan: 500, idnex: 4},
                    {zuan: 1000, idnex: 5},
                    ],
                radio7: '1',
                other: 0,
                money:1,
                registerForm: {
                    mobile: "",
                    code: "",
                    password: "",
                    checked: false,
                },
                // registerRule: {
                //     mobile: [{ required: true, message: "手机号码格式错误", trigger: "blur" }],
                //     code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
                //     username: [{ required: true, message: "请输入密码不少于6位", trigger: "blur" }],
                //     password: [{ required: true, message: "请输入相同的密码", trigger: "blur" }],
                // },
                // checkNumDisabled: false,
                // countDown: 60,
                // timer: null,
            };
        },
        mounted() {
            this.user = JSON.parse(window.localStorage.getItem("user"))
            this.token = window.localStorage.getItem("token")
            console.log(this.token)
            if(this.user){
                this.iszb = this.user.iszb;
                this.user_nicename = this.user.user_nicename;
                this.sex = this.user.sex;
                this.birthday = this.user.birthday;
                this.user_email = this.user.user_email;
            }
        },

        methods: {
            change(val, index){
                this.active = index;
                this.money = val.zuan
            },
            changepay(e) {
                this.payactive = e
            },
            burchang(){
                this.money = this.other
            },
            registerSub(formName) {
            //     this.$refs[formName].validate((valid) => {
            //         if (valid) {
            //             // if (this.registerForm.checked) {
            //             if(this.registerForm.password != this.registerForm.confirm_pass){
            //                 this.$message({
            //                     message: "两次输入的密码不一致",
            //                     type: "warning",
            //                 });
            //                 return
            //             }
            //
            //             let data = {
            //                 "uid":this.user.id,
            //                 "token":this.token,
            //                 "pass":this.registerForm.password,
            //                 "mobile":this.registerForm.mobile,
            //                 "code":this.registerForm.code,
            //                 // "username":this.registerForm.username,
            //                 // "user_pass":this.registerForm.password,
            //                 // "user_login":this.registerForm.username,
            //                 // "confirm_pass":this.registerForm.confirm_pass,
            //                 "type":1
            //             }
            //
            //             this.user_register(data)
            //             // } else {
            //             //     this.$message({
            //             //         message: "请仔细阅读并勾选协议",
            //             //         type: "warning",
            //             //     });
            //             // }
            //         }
            //     });
            // },
            //
            // async user_register(data){
            //     let res = await SecurityPass(data)
            //     console.log(res.code + res.msg)
            //     if(res.code == 0){
            //         // this.$message({
            //         //     message: res.msg,
            //         //     type: "success",
            //         // });
            //         // window.localStorage.setItem("isLogin", true);
            //         // window.localStorage.setItem("token", res.info.token);
            //         // window.localStorage.setItem("user",JSON.stringify(res.info));
            //         // setTimeout(() => {
            //         this.$router.push({ name: "myHome" });
            //         // this.showRegister = false;
            //         // this.$router.push("/");
            //         // this.showLogin = false;
            //         // this.initLogin();
            //         // }, 1000);
            //         alert(1111111)
            //
            //     }else{
            //         this.$message({
            //             message: res.msg,
            //             type: "warning",
            //         });
            //     }
            // },
            // //获取验证码
            // async sendchecknum() {
            //
            //     if (this.$REGEXUTIL.isPhone(this.registerForm.mobile)) {
            //         const timer_COUNT = 60;
            //         if (!this.timer) {
            //             this.countDown = timer_COUNT;
            //             this.checkNumDisabled = true;
            //             this.timer = setInterval(() => {
            //                 if (this.countDown > 0 && this.countDown <= timer_COUNT) {
            //                     this.countDown--;
            //                 } else {
            //                     this.checkNumDisabled = false;
            //                     clearInterval(this.timer);
            //                     this.timer = null;
            //                 }
            //             }, 1000);
            //         }
            //
            //         let sign = this.$md5(
            //             "mobile=" + this.registerForm.mobile + "&" + envconfig.CODE_SALT
            //         );
            //
            //         let data = {
            //             'mobile':this.registerForm.mobile,
            //             'sign':sign,
            //             "type" : 3,
            //         }
            //
            //         let res = await Getcode(data)
            //         console.log(res.code + res.msg)
            //         if(res.code == 0){
            //             this.$message({
            //                 message: res.msg,
            //                 type: "success",
            //             });
            //         }else{
            //             this.$message.error(res.msg);
            //             this.checkNumDisabled = false;
            //             clearInterval(this.timer);
            //             this.timer = null;
            //         }
            //     } else {
            //         this.$message.error("请输入有效手机号");
            //     }
            },
            cancel(){
                this.$router.push({ name: "myHome" });
            }
        },
    };
</script>

<style lang="stylus">
    #recharge {
        padding: 32px 0 0 47px;

    h4 {
        font-size: 18px;
        font-weight: 600;
        border-left: 3px solid #ffc71c;
        padding-left: 10px;
        margin-bottom: 40px;
    }

    .baseInput {
        margin-bottom: 30px;

    >p {
        margin-bottom: 4px;
        font-size: 14px;
        color: #777;
    }
    }
    .rechargenum > ul li{
        width: 108px;
        height: 45px;
        border-radius: 6px;
        border:1px solid rgba(215, 215, 215, 1);
        float:left;
        margin-right:22px;
        margin-bottom: 20px;
        margin-top: 10px;
        >p{
            font-size: 14px;
            margin-top: 4px;
            text-align: center;
            font-weight: 700
        }
        >p:nth-child(1){
            color: rgb(191, 150, 90)
        }


    }
    .rechargenum > ul li:hover{
        border-color: rgba(2, 167, 240, 1);
    }
    .rechargenum > ul li.active{
        border-color: rgba(2, 167, 240, 1);
    }
    .rechargenum > ul li:last-child > p {
        margin-top:0 !important;
        height: 100px;
    .el-input__inner{
        height: 42px;
        border: 0;
    }
    }
    .rechargeMode> ul li.payactive{
        border-color: rgba(2, 167, 240, 1);
    }
    .rechargeMode{
        overflow: hidden;
         >ul li{
            width: 108px;
            height: 45px;
            border-radius: 6px;
            border:1px solid rgba(215, 215, 215, 1);
            float:left;
            margin-right:22px;
            margin-bottom: 20px;
            margin-top: 10px;
            padding: 5px 8px;
             display: flex;
             /* justify-content: center; */
             align-items: center;
            >i{
                width: 34px;
                height: 35px;
                display: inline-block;
                background: #0c5460;
            }
            >span{
                font-weight: 700;
                font-size: 14px;
                margin-left: 10px;
            }
        }
    }
        .rechargenubms{
            margin-bottom: 30px;
             > p span:nth-child(1){
                 font-weight: 700;
                 font-style: normal;
                 font-size: 20px;
                 color: #BF965A;
                 margin: 0 20px;
            }
             > p span:nth-child(2){
                 font-weight: 700;
                 font-style: normal;
                 font-size: 18px;
             }
        }
    }
</style>
