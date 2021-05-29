<template>
    <div id="app">
        <navbar @denglu="denglu" @zhuce="zhuce" :isLogin="isLogin" @tcdl="tcdl" :active="navactive"></navbar>
        <router-view v-if="isRouterAlive" @denglu="denglu" />
        <footerbar></footerbar>

        <!--密码 登录 -->
        <el-dialog title="登录" :visible.sync="showLogin" v-if="loadshow == 1" width="400px" :close-on-click-modal="false" :close-on-press-escape="false">
            <el-form :model="loginForm" :rules="loginRule" ref="loginForm">
                <el-form-item prop="mobile">
                    <el-input v-model="loginForm.mobile" placeholder="请输入手机号码"></el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" show-password placeholder="请输入6-16位登录密码"></el-input>
                </el-form-item>

                <el-form-item>
                    <div style="display: flex;align-items: center;justify-content: space-around;">
                        <el-checkbox v-model="loginForm.checked">登录即代表你已同意</el-checkbox>
                        <span class="yonghuxieyi" @click.stop="toTHXY">《用户服务协议》</span>
                        <span style="cursor: pointer; color: #aeaeae" @click="toforgetPwd">忘记密码</span>
                    </div>
                </el-form-item>

                <el-form-item>
                    <div style="display: flex; justify-content:center">
                        <el-button type="primary" style="background: #f8c21b; border-color: #f8c21b" @click="loginSub('loginForm')" >登录</el-button>
                    </div>
                </el-form-item>

                <el-form-item>
                    <div style="display: flex; justify-content: space-between">
                        <el-link @click="phonenanberload">手机验证码登录</el-link>
                        <el-link @click="zhuce">注册新账号</el-link>
                    </div>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!--手机验证码登录-->
        <el-dialog title="登录" :visible.sync="showLogin" v-if="loadshow == 2" width="400px" :close-on-click-modal="false" :close-on-press-escape="false">
            <el-form :model="phoneloginForm" :rules="phoneloginRule" ref="phoneloginForm">
                <el-form-item prop="mobile">
                    <el-input v-model="phoneloginForm.mobile" placeholder="请输入手机号码"></el-input>
                </el-form-item>

<!--                <el-form-item>-->
<!--                    <el-input placeholder="请输入验证码" v-model="phoneloginForm.code" style="width:237px;margin-right: 10px;"></el-input>-->
<!--                    <el-button type="primary" style="background: #f8c21b; border-color: #f8c21b" @click="phoneloginSub('phoneloginForm')" >获取验证码</el-button>-->
                    <el-form-item prop="code">
                        <el-input v-model="phoneloginForm.code" placeholder="请输入天宸网络验证码">
                            <template slot="append">
                                <el-button type="info" @click="phonesendchecknum" :disabled="checkNumDisabled">
                                    <span v-if="checkNumDisabled">{{ countDown }}秒后重试</span>
                                    <span v-else>获取验证码</span>
                                </el-button>
                            </template>
                        </el-input>
                    </el-form-item>
<!--                </el-form-item>-->

                <el-form-item>
                    <div style="display: flex;align-items: center;">
                        <el-checkbox v-model="phoneloginForm.checked">登录即代表你已同意</el-checkbox>
                        <span class="yonghuxieyi" @click.stop="toTHXY">《用户服务协议》</span>
<!--                        <span style="cursor: pointer; color: #aeaeae" @click="toforgetPwd">忘记密码</span>-->
                    </div>
                </el-form-item>

                <el-form-item>
                    <div style="display: flex; justify-content: center">
                        <el-button type="primary" style="background: #f8c21b; border-color: #f8c21b" @click="phoneloginSub('phoneloginForm')" >登录</el-button>
                    </div>
                </el-form-item>

                <el-form-item>
                    <div style="display: flex; justify-content: space-between">
                        <el-link @click="mimaload">密码登录</el-link>
                        <el-link @click="zhuce">注册新账号</el-link>
                    </div>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 注册 -->
        <el-dialog title="注册" :visible.sync="showRegister" width="400px" :close-on-click-modal="false" :close-on-press-escape="false">
            <el-form :model="registerForm" :rules="registerRule" ref="registerForm">
                <el-form-item prop="mobile">
                    <el-input v-model="registerForm.mobile" placeholder="请输入手机号码"></el-input>
                </el-form-item>

                <el-form-item prop="code">
                    <el-input v-model="registerForm.code" placeholder="请输入天宸网络验证码">
                        <template slot="append">
                            <el-button type="info" @click="sendchecknum" :disabled="checkNumDisabled">
                                <span v-if="checkNumDisabled">{{ countDown }}秒后重试</span>
                                <span v-else>获取验证码</span>
                            </el-button>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item prop="username">
                    <el-input v-model="registerForm.username"  placeholder="请输入用户名"></el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input v-model="registerForm.password" show-password placeholder="请输入6-16位登录密码"></el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input v-model="registerForm.confirm_pass" show-password placeholder="请输入确认密码"></el-input>
                </el-form-item>

                <el-form-item>
                    <div>
                        <el-checkbox v-model="registerForm.checked">我已阅读并同意</el-checkbox>
                        <span class="yonghuxieyi" @click.stop="toTHXY">《用户服务协议》</span>
                    </div>
                </el-form-item>

                <el-form-item>
                    <div style="display: flex; justify-content: space-between">
                        <el-link @click="denglu">登录账号</el-link>
                        <el-button type="primary" style="background: #f8c21b; border-color: #f8c21b" @click="registerSub('registerForm')">
                            注册
                        </el-button>
                    </div>
                </el-form-item>
            </el-form>
        </el-dialog>
  </div>

</template>

<script>
import navbar from "@/components/navbar.vue";
import footerbar from "@/components/footerbar.vue";
import envconfig from "./server/config.js";
import { Login,Getcode,Register,PhoneLogin} from '@/api'
export default {
    name: "App",
    provide() {
        return {
            reload: this.reload
        };
    },
    components: {
        navbar,
        footerbar,
    },
    data() {
        return {
            loadshow:2,
            navactive: false,
            isRouterAlive: true,
            showLogin: false,

            loginForm: {
                mobile: "",
                password: "",
                checked: false,
            },
            phoneloginForm:{
                mobile: "",
                code:"",
                checked: false,
            },
            phoneloginRule:{
                mobile:[{ required: true, message: "手机号码格式错误", trigger: "blur" }],
                code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
            },
            loginRule: {
                mobile: [{ required: true, message: "手机号码格式错误", trigger: "blur" }],
                password: [{ required: true, message: "请输入6-16位登录密码", trigger: "blur" }],
            },
            showRegister: false,
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
                username: [{ required: true, message: "请输入2~15位用户名", trigger: "blur" }],
                password: [{ required: true, message: "请输入6-16位登录密码", trigger: "blur" }],
            },
            checkNumDisabled: false,
            countDown: 60,
            timer: null,
            isLogin: false,
            indexNumTop: 0,
            scrollTop: 0,
        };
    },
    watch: {
        $route: {
            handler() {
                if (this.$route.query.isLogin) {
                    this.showLogin = true;
                }
            },
            deep: true,
        },
    },
    created() {

    },
    mounted() {
        window.addEventListener("scroll", this.getScroll);
        this.initLogin();
    },

    destroyed() {
        window.removeEventListener("scroll", this.getScroll);
    },

    methods: {
        getScroll() {
            this.indexNumTop = $("#app").offset().top;
            this.scrollTop =
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop;
            if (!!document.documentElement.scrollTop && document.documentElement.scrollTop >= 300) {
                this.navactive = true;
            } else {
                this.navactive = false;
            }
        },
        tcdl() {
            window.localStorage.removeItem("isLogin");
            this.$router.push("/");
            this.initLogin();
        },
        initLogin() {
            if (window.localStorage.getItem("isLogin")) {
                this.isLogin = true;
            } else {
                this.isLogin = false;
            }
        },
        reload() {
            this.isRouterAlive = false;
                this.$nextTick(function () {
                this.isRouterAlive = true;
            });
        },
        denglu() {
            this.showRegister = false;
            setTimeout(() => {
                this.showLogin = true;
            }, 200);
        },
        mimaload() {
            this.loadshow = 1;
            // this.showLogin = false;
            // setTimeout(() => {
            //     this.showRegister = true;
            // }, 200);
        },
        phonenanberload(){
            this.loadshow = 2;
        },
        zhuce() {
            this.showLogin = false;
            setTimeout(() => {
                this.showRegister = true;
            }, 200);
        },

        toforgetPwd() {
            this.showLogin = false;
            this.$router.push({ name: "forgetPwd" });
        },

        toTHXY() {
            this.showLogin = false;
            this.showRegister = false;
            this.$router.push({ name: "agreement" });
        },
        //密码登录
        loginSub(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.loginForm.checked) {
                        let data = {
                            'accout': this.loginForm.mobile,
                            'user_pass' : this.loginForm.password
                        }
                        console.log(this.loginForm.mobile+"   " +"    " + this.loginForm.password)
                        this.user_logo(data)
                    } else {
                        this.$message({
                            message: "请仔细阅读并勾选协议",
                            type: "warning",
                        });
                    }
                }
            });
        },

        async user_logo(data){
            let res = await Login(data)
            console.log(res.code +  res.msg)
            if(res.code == 0){
                this.$message({
                    message: res.msg,
                    type: "success",
                });
                window.localStorage.setItem("isLogin", true);
                window.localStorage.setItem("token", res.info.token);
                window.localStorage.setItem("user",JSON.stringify(res.info));
                this.$store.commit('userinfo',res.info)
                setTimeout(() => {
                    this.showRegister = false;
                    this.$router.push("/");
                    this.showLogin = false;
                    this.initLogin();
                }, 1000);

            }else{
                this.$message({
                    message: res.msg,
                    type: "warning",
                });
            }
        },
        //手机验证码登录
        phoneloginSub(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.phoneloginForm.checked) {
                        let data = {
                            'mobile': this.phoneloginForm.mobile,
                            'code' : this.phoneloginForm.code
                        }
                        console.log(this.phoneloginForm.mobile + this.phoneloginForm.code)
                        this.user_phonelogo(data)
                    } else {
                        this.$message({
                            message: "请仔细阅读并勾选协议",
                            type: "warning",
                        });
                    }
                }
            });
        },

        async user_phonelogo(data){
            let res = await PhoneLogin(data)
            console.log(res.code +  res.msg)
            if(res.code == 0){
                this.$message({
                    message: res.msg,
                    type: "success",
                });
                window.localStorage.setItem("isLogin", true);
                window.localStorage.setItem("token", res.info.token);
                window.localStorage.setItem("user",JSON.stringify(res.info));
                setTimeout(() => {
                    this.showRegister = false;
                    this.$router.push("/");
                    this.showLogin = false;
                    this.initLogin();
                }, 1000);

            }else{
                this.$message({
                    message: res.msg,
                    type: "warning",
                });
            }
        },
        //注册
        registerSub(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.registerForm.checked) {
                        if(this.registerForm.password != this.registerForm.confirm_pass){
                            this.$message({
                                message: "两次输入的密码不一致",
                                type: "warning",
                            });
                            return
                        }

                        let data = {
                            "mobile":this.registerForm.mobile,
                            "code":this.registerForm.code,
                            "username":this.registerForm.username,
                            "user_pass":this.registerForm.password,
                            "user_login":this.registerForm.username,
                            "confirm_pass":this.registerForm.confirm_pass,
                            "type":1
                        }

                        this.user_register(data)
                    } else {
                        this.$message({
                            message: "请仔细阅读并勾选协议",
                            type: "warning",
                        });
                    }
                }
            });
        },

        async user_register(data){
            let res = await Register(data)
            if(res.code == 0){
                this.$message({
                    message: res.msg,
                    type: "success",
                });
                window.localStorage.setItem("isLogin", true);
                window.localStorage.setItem("token", res.info.token);
                window.localStorage.setItem("user",JSON.stringify(res.info));
                setTimeout(() => {
                    this.showRegister = false;
                    this.$router.push("/");
                    this.showLogin = false;
                    this.initLogin();
                }, 1000);

            }else{
                this.$message({
                    message: res.msg,
                    type: "warning",
                });
            }
        },
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
                    "type" : 0,
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
        async phonesendchecknum() {
            if (this.$REGEXUTIL.isPhone(this.phoneloginForm.mobile)) {
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
                    "mobile=" + this.phoneloginForm.mobile + "&" + envconfig.CODE_SALT
                );

                let data = {
                    'mobile':this.phoneloginForm.mobile,
                    'sign':sign,
                    "type" : 1,

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
        }
    }
};
</script>

<style lang="stylus">
.yonghuxieyi {
    cursor: pointer;
    color: #ffb600;
}
</style>