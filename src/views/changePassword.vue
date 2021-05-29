<template>
<el-dialog
    title="修改密码"
    :center="true"
    :visible.sync="dialogVisible"
    width="850px"
    :close-on-click-modal=false
    :before-close="handleClose">
    <div id="changePassword">
        <!-- <h4 @click="goBack"><i class="el-icon-arrow-left"></i>修改密码</h4> -->

        <el-form :model="loginForm" :rules="loginRule" ref="loginForm" style="width: 668px; margin: 30px auto" v-show="active == 0">
            <el-form-item>
                <a class="xing">*</a>输入旧密码:
                <el-input v-model="loginForm2.past_pass" placeholder="请输入旧密码" show-password style="width: 330px"></el-input>
            </el-form-item>

            <el-form-item prop="pass">
                <a class="xing">*</a>设置新密码:
                <el-input v-model="loginForm2.pass" placeholder="请输入6-16位登录密码" show-password style="width: 330px"></el-input>
            </el-form-item>
            <el-form-item prop="password2">
                 <a class="xing">*</a>输入新密码:
                <el-input v-model="loginForm2.confim_pass" placeholder="请再次输入密码" show-password style="width: 330px"></el-input>
            </el-form-item>
            <el-form-item prop="mobile">
                <a class="xing">*</a>输入手机号:
                <el-input v-model="loginForm.mobile" placeholder="请输入手机号码" readonly style="width: 330px"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <a class="xing">*</a>短信验证码:
                <el-input v-model="loginForm.code" placeholder="获取并输入验证码" style="width: 330px">
                    <template slot="append">
                        <el-button type="info" @click="sendchecknum" :disabled="checkNumDisabled">
                            <span v-if="checkNumDisabled">{{ countDown }}秒后重试</span>
                            <span v-else>获取验证码</span>
                        </el-button>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <div style="width: 108px">
                    <el-button type="primary" style="width: 100%; background: #f8c21b; border-color: #f8c21b" @click="bangding()">
                        确    定
                    </el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
    </el-dialog>
</template>

<script>
import envconfig from "../server/config.js";
import { Getcode,ChangeMobile,ChangePass } from '@/api'
export default {
    name: "changePassword",
    data() {
        return {
            active: 0,
            loginForm: {
                mobile: "",
                code: "",
            },
            loginRule: {
                mobile: [{ required: true, message: "手机号码格式错误", trigger: "blur" }],
                code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
            },
            loginForm2: {
                past_pass: "",
                pass: "",
                confim_pass: "",
            },
            loginRule2: {
                pass: [{ required: true, message: "请输入6-16位登录密码", trigger: "blur" }],
            },
            checkNumDisabled: false,
            countDown: 60,
            dialogVisible: true,
            user:{}
        };
    },
    mounted() {
        this.user = JSON.parse(window.localStorage.getItem("user"))
        this.loginForm.mobile = this.user.mobile;
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        handleClose() {
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

                    this.change_mobile(data)
                }
            });
        },

        async change_mobile(data){
            let res = await ChangeMobile(data)
            if(res.code == 0){
                this.active = 1
            }else{
                this.$message.error(res.msg);
            }
        },

        bangding() {
            if(this.loginForm2.past_pass == ""){
                this.$message({
                    message: "请输入旧密码",
                    type: "warning",
                });
            }

            if(this.loginForm2.confim_pass == ''){
                this.$message({
                    message: "请输入确认密码",
                    type: "warning",
                });
            }

            if(this.loginForm2.pass != this.loginForm2.confim_pass){
                this.$message({
                    message: "密码不一致",
                    type: "warning",
                });
            }

            let data = {
                "uid":this.user.id,
                'past_pass':this.loginForm2.past_pass,
                'pass':this.loginForm2.pass,
                'confim_pass':this.loginForm2.confim_pass
            }
            this.change_pass(data)
        },

        async change_pass(data){
            let res = await ChangePass(data)
            if(res.code == 0){
                this.$message({
                    message: "修改成功",
                    type: "success",
                });
                setTimeout(() => {
                    this.$router.push({ name: "myHome" });
                }, 1000)
            }else{
                this.$message.error(res.msg);
            }
        }
    },
};
</script>

<style lang="stylus">
#changePassword {
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
