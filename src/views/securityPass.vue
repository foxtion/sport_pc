<template>
<el-dialog
        title="更换手机"
        :center="true"
        :visible.sync="dialogVisible"
        width="850px"
        :close-on-click-modal=false
        :before-close="handleClose">
    <div id="myProfile">
        <el-form :model="registerForm" :rules="registerRule" ref="registerForm" style="width: 668px; margin: 30px auto">
            <el-form-item prop="password">
                <a class="xing">*</a>输入新密码:
                <el-input v-model="registerForm.password" show-password placeholder="请输入密码不少于6位" style="width: 330px"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <a class="xing">*</a>确认新密码:
                <el-input v-model="registerForm.confirm_pass" show-password placeholder="请输入相同的密码" style="width: 330px"></el-input>
            </el-form-item>
            <el-form-item prop="mobile">
                <a class="xing">*</a>输入手机号:
                <el-input v-model="registerForm.mobile" placeholder="请输入手机号码" style="width: 330px"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <a class="xing">*</a>输入验证码:
                <el-input v-model="registerForm.code" placeholder="请输入天宸网络验证码" style="width: 330px">
                    <template slot="append">
                        <el-button type="info" @click="sendchecknum" :disabled="checkNumDisabled">
                            <span v-if="checkNumDisabled">{{ countDown }}秒后重试</span>
                            <span v-else>获取验证码</span>
                        </el-button>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <div style="display: flex; justify-content: space-between">

                    <el-button type="primary" style="background: #f8c21b; border-color: #f8c21b" @click="registerSub('registerForm')">
                        确定
                    </el-button>
                    <el-button type="primary" style="background: #f8c21b; border-color: #f8c21b" @click="cancel()">
                        取消
                    </el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</el-dialog>
</template>

<script>
    import {Getcode,SecurityPass} from '@/api'
     import envconfig from "../server/config.js";
    export default {
        name: "SecurityPass",
        data() {
            return {
                registerForm: {
                    mobile: "",
                    code: "",
                    username: "",
                    password: "",
                    checked: false,
                },
                registerRule: {
                    mobile: [{ required: true, message: "手机号码格式错误", trigger: "blur" }],
                    code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
                    username: [{ required: true, message: "请输入密码不少于6位", trigger: "blur" }],
                    password: [{ required: true, message: "请输入相同的密码", trigger: "blur" }],
                },
                checkNumDisabled: false,
                countDown: 60,
                timer: null,
                dialogVisible:true,
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
            handleClose() {
            this.$router.go(-1);
            },
            registerSub(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // if (this.registerForm.checked) {
                            if(this.registerForm.password != this.registerForm.confirm_pass){
                                this.$message({
                                    message: "两次输入的密码不一致",
                                    type: "warning",
                                });
                                return
                            }

                            let data = {
                                "uid":this.user.id,
                                "token":this.token,
                                "pass":this.registerForm.password,
                                "mobile":this.registerForm.mobile,
                                 "code":this.registerForm.code,
                                // "username":this.registerForm.username,
                                // "user_pass":this.registerForm.password,
                                // "user_login":this.registerForm.username,
                                // "confirm_pass":this.registerForm.confirm_pass,
                                 "type":1
                            }

                            this.user_register(data)
                        // } else {
                        //     this.$message({
                        //         message: "请仔细阅读并勾选协议",
                        //         type: "warning",
                        //     });
                        // }
                    }
                });
            },

            async user_register(data){
                let res = await SecurityPass(data)
                console.log(res.code + res.msg)
                if(res.code == 0){
                    // this.$message({
                    //     message: res.msg,
                    //     type: "success",
                    // });
                    // window.localStorage.setItem("isLogin", true);
                    // window.localStorage.setItem("token", res.info.token);
                    // window.localStorage.setItem("user",JSON.stringify(res.info));
                    // setTimeout(() => {
                    this.$router.push({ name: "myHome" });
                        // this.showRegister = false;
                        // this.$router.push("/");
                        // this.showLogin = false;
                        // this.initLogin();
                    // }, 1000);
                    alert(1111111)

                }else{
                    this.$message({
                        message: res.msg,
                        type: "warning",
                    });
                }
            },
            //获取验证码
            async sendchecknum() {

                if (this.$REGEXUTIL.isPhone(this.registerForm.mobile)) {
                    const timer_COUNT = 60;
                    if (!this.timer) {
                        this.countDown = timer_COUNT;
                         this.checkNumDisabled = true;
                        this.timer = setInterval(() => {
                            if (this.countDown > 0 && this.countDown <= timer_COUNT) {
                                this.countDown--;
                            } else {
                                this.checkNumDisabled = false;
                                clearInterval(this.timer);
                                this.timer = null;
                            }
                        }, 1000);
                    }

                    let sign = this.$md5(
                        "mobile=" + this.registerForm.mobile + "&" + envconfig.CODE_SALT
                    );

                    let data = {
                        'mobile':this.registerForm.mobile,
                        'sign':sign,
                        "type" : 3,
                    }

                    let res = await Getcode(data)
                    console.log(res.code + res.msg)
                    if(res.code == 0){
                        this.$message({
                            message: res.msg,
                            type: "success",
                        });
                    }else{
                        this.$message.error(res.msg);
                        this.checkNumDisabled = false;
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                } else {
                    this.$message.error("请输入有效手机号");
                }
            },
            cancel(){
                this.$router.push({ name: "myHome" });
            }
        },
    };
</script>

<style lang="stylus">
    #myProfile {
        padding: 32px 0 0 47px;

    h4 {
        font-size: 18px;
        font-weight: 600;
        border-left: 3px solid #ffc71c;
        padding-left: 10px;
        margin-bottom: 40px;
    }
    .el-form-item {
        display: flex;
        justify-content: center;
        color:#434A66;
        .xing{
            color:#FF5D5D;
            padding-right: 1px;
        }
    }
    .baseInput {
        margin-bottom: 30px;

    >p {
        margin-bottom: 4px;
        font-size: 14px;
        color: #777;
    }
    }
    }
</style>
