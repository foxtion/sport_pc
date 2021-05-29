<template>
    <el-dialog
        title="更换手机"
        :center="true"
        :visible.sync="dialogVisible"
        width="850px"
        :close-on-click-modal=false
        :before-close="handleClose">
    <div id="changePhone">
        <el-form :model="loginForm" :rules="loginRule" ref="loginForm" style="width: 668px; margin: 30px auto" v-show="active == 0">
            <el-form-item prop="mobile">
                <a class="xing">*</a>输入手机号:
                <el-input v-model="loginForm.mobile" placeholder="请输入手机号码" style="width: 330px"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <a class="xing">*</a>输入验证码:
                <el-input v-model="loginForm.code" placeholder="获取并输入验证码" style="width: 330px">
                    <template slot="append">
                        <el-button type="info" @click="sendchecknum" :disabled="checkNumDisabled">
                            <span v-if="checkNumDisabled">{{ countDown }}秒后重试</span>
                            <span v-else>获取验证码</span>
                        </el-button>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item prop="mobile">
                <a class="xing">*</a>输入手机号:
                <el-input v-model="loginForm2.mobile" placeholder="请输入手机号码" style="width: 330px"></el-input>
            </el-form-item>

            <el-form-item prop="code">
                <a class="xing">*</a>输入验证码:
                <el-input v-model="loginForm2.code" placeholder="获取并输入验证码" style="width: 330px">
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
                        绑    定
                    </el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
    </el-dialog>
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
            dialogVisible: true,
            user:{}
        }
    },
    mounted() {
        this.user = JSON.parse(window.localStorage.getItem("user"))
        this.loginForm.mobile = this.user.mobile;
    },

    methods: {
        handleClose() {
            this.$router.go(-1);
            },
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
    h4 {
        cursor: pointer;
        margin-bottom: 40px;
    }

    .el-steps {
        width: 90%;
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
}
.el-dialog .el-dialog__header {
    background: #E6EAF3 !important;
}
</style>
