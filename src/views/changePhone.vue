<template>
    <div id="changePhone">
        <h4 @click="goBack"><i class="el-icon-arrow-left"></i>改绑手机</h4>
        <el-steps :active="active" align-center simple>
            <el-step title="验证身份"></el-step>
            <el-step title="绑定新手机"></el-step>
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
            <el-form-item>
            <div>
                <el-button type="primary" style="width: 100%; background: #f8c21b; border-color: #f8c21b" @click="xiayibu('loginForm')">
                    下一步
                </el-button>
            </div>
            </el-form-item>
        </el-form>

        <el-form :model="loginForm2" :rules="loginRule2" ref="loginForm2" style="width: 40%; margin: 30px auto" v-show="active == 1">
            <el-form-item prop="mobile">
                <el-input v-model="loginForm2.mobile" placeholder="请输入手机号码"></el-input>
            </el-form-item>

            <el-form-item prop="code">
                <el-input v-model="loginForm2.code" placeholder="获取并输入验证码">
                    <template slot="append">
                        <el-button type="info" @click="sendchecknum2" :disabled="checkNumDisabled2">
                            <span v-if="checkNumDisabled2">{{ countDown2 }}秒后重试</span>
                            <span v-else>获取验证码</span>
                        </el-button>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item>
                <div>
                    <el-button type="primary" style="width: 100%; background: #f8c21b; border-color: #f8c21b" @click="bangding('loginForm2')">
                        绑定
                    </el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import envconfig from "../server/config.js";
import { Getcode,ChangeMobile } from '@/api'
export default {
    name: "changePhone",
    data() {
        return {
            active: 0,
            loginForm: {
                mobile: "",
                code: "",
            },
            loginRule: {
            mobile: [{ required: true, message: "手机号码格式错误", trigger: "blur" }],
            code: [{ required: true, message: "请输入验证码", trigger: "blur" }]},
            checkNumDisabled: false,
            countDown: 60,
            timer: null,
            loginForm2: {
                mobile: "",
                code: "",
            },
            loginRule2: {
                mobile: [{ required: true, message: "手机号码格式错误", trigger: "blur" }],
                code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
            },
            checkNumDisabled2: false,
            countDown2: 60,
            timer2: null,
            user:{}
        }
    },
    mounted() {
        this.user = JSON.parse(window.localStorage.getItem("user"))
        this.loginForm.mobile = this.user.mobile;
    },

    methods: {
        goBack() {
            this.$router.go(-1);
        },
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
                    let data = {
                        "uid" : this.user.id,
                        "mobile" : this.loginForm.mobile,
                        "code": this.loginForm.code,
                        "type":0
                    }

                    if(this.loginForm.mobile == ""){
                        this.$message({
                            message: "请输入手机号码",
                            type: "warning",
                        });
                        return;
                    }

                    if(this.loginForm.code.length < 6){
                        this.$message({
                            message: "请输入有效验证码",
                            type: "warning",
                        });

                        return
                    }

                    this.change_mobile(data,0)                   
                }
            });
        },

        async sendchecknum2() {
            if (this.$REGEXUTIL.isPhone(this.loginForm2.mobile)) {
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
                    "mobile=" + this.loginForm2.mobile + "&" + envconfig.CODE_SALT
                );

                let data = {
                    'mobile':this.loginForm2.mobile,
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

        bangding(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data = {
                        "uid" : this.user.id,
                        "mobile" : this.loginForm2.mobile,
                        "code": this.loginForm2.code,
                        "type":1
                    }

                    if(this.loginForm2.mobile == ""){
                        this.$message({
                            message: "请输入手机号码",
                            type: "warning",
                        });
                        return;
                    }

                    if(this.loginForm2.code.length < 6){
                        this.$message({
                            message: "请输入有效验证码",
                            type: "warning",
                        });

                        return
                    }

                    this.change_mobile(data,1)
                }
            });
        },

        async change_mobile(data,type){
            let res = await ChangeMobile(data)
            if(type == 0){
                if(res.code == 0){
                    this.active = 1
                }else{
                    this.$message.error(res.msg);
                }
            }else{
                if(res.code == 0){
                    this.$message({
                        message: res.msg,
                        type: "success",
                    });

                    this.user.mobile = this.loginForm2.mobile;
                    window.localStorage.setItem("user",JSON.stringify(this.user));
                    setTimeout(() => {
                        this.$router.push({ name: "myHome" });
                    }, 1000)
                }else{
                    this.$message.error(res.msg);
                }
            }           
        }
    }
};
</script>

<style lang="stylus">
#changePhone {
    padding: 32px 0 0 47px;

    h4 {
        cursor: pointer;
        margin-bottom: 40px;
    }

    .el-steps {
        width: 90%;
    }
}
</style>