<template>
    <div id="forgetPwd">
        <div>
            <div class="title">
                <span class="text">修改密码</span>
            </div>
            <el-steps :active="active" align-center simple>
                <!-- <el-step title="验证身份"></el-step> -->
                <el-step title="修改新密码"></el-step>
                <el-step title="修改成功"></el-step>
            </el-steps>
            <el-form :model="loginForm" :rules="loginRule" ref="loginForm" style="width: 40%; margin: 30px auto" v-show="active == 0">
                <el-form-item prop="mobile">
                    <el-input v-model="loginForm.mobile" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input v-model="loginForm.code" placeholder="获取并输入验证码">
                        <template slot="append">
                            <el-button type="info" @click="sendchecknum" :disabled="checkNumDisabled">
                                <span v-if="checkNumDisabled">{{ countDown }}秒后重试</span>
                                <span v-else>获取验证码</span>
                            </el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" placeholder="请输入6-16位登录密码" show-password></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.confirm_pass" placeholder="确认密码" show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <div>
                        <el-button type="primary"  style="width: 100%; background: #f8c21b; border-color: #f8c21b" 
                            @click="xiayibu('loginForm')">
                            修改密码
                        </el-button>
                    </div>
                </el-form-item>
            </el-form>

            <div style="width: 40%; margin: 30px auto; text-align: center" v-show="active == 1">
                <img src="@/assets/img/success.png" alt style="width: 100px; height: 100px; margin-bottom: 6px"/>
                <p style="font-size: 16px; color: #777; margin-bottom: 26px">
                    您已成功设置新密码
                </p>
                <el-button type="primary" style="width: 100%; background: #f8c21b; border-color: #f8c21b" @click="toLogin">
                    去登陆
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
import {Getcode,UserFindPass} from '@/api'
import envconfig from "../server/config.js";
export default {
    name: "forgetPwd",
    data() {
        return {
            active: 0,
            loginForm: {
                mobile: "",
                code: "",
                password: "",
                confirm_pass: "",
            },
            loginRule: {
            mobile: [{required: true, message: "手机号码格式错误", trigger: "blur" }],
            code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
            password: [{ required: true, message: "请输入6-16位登录密码", trigger: "blur" }]},
            checkNumDisabled: false,
            countDown: 60,
            timer: null,
        };
    },
    methods: {
        async sendchecknum() {
            if (this.$REGEXUTIL.isPhone(this.loginForm.mobile)) {
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
                    "mobile=" + this.loginForm.mobile + "&" + envconfig.CODE_SALT
                );

                let data = {
                    'mobile':this.loginForm.mobile,
                    'sign':sign,
                    "type" : 1
                }

                let res = await Getcode(data)
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
        xiayibu(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.loginForm.password != this.loginForm.confirm_pass){
                        this.$message({
                            message: "两次输入的密码不一致",
                            type: "warning",
                        });
                        return
                    }
                    let data = {
                       "mobile":this.loginForm.mobile,
                       "user_pass":this.loginForm.password,
                       "confirm_pass":this.loginForm.confirm_pass,
                       "code":this.loginForm.code
                    }
                    this.FindPass(data)                   
                }
            });
        },

        async FindPass(data){
           let res = await UserFindPass(data)
           if(res.code == 0){
               this.active = 1;
           }else{
               this.$message.error(res.msg);
           }
        },
        wancheng(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // this.active = 2;
                }
            });
        },
        toLogin() {
            this.$router.push({ path: "/", query: { isLogin: true } });
        },
    },
};
</script>

<style lang="stylus">
#forgetPwd {
    >div {
        width: 1000px;
        margin: 0 auto;
        margin-top: 144px;
        padding: 68px 68px 105px;
        background: #fff;

        .title {
            margin-bottom: 32px;
            font-size: 24px;
            font-weight: 600;
        }
    }
}
</style>