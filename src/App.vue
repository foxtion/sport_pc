<template>
  <div id="app">
    <navbar @denglu="denglu" @zhuce="zhuce" :isLogin="isLogin" @tcdl="tcdl" :active="navactive"></navbar>
    <router-view v-if="isRouterAlive" @denglu="denglu" />
    <footerbar v-if="this.$store.state.user.footer"></footerbar>

    <!-- 密碼登录 -->
    <el-dialog title="密码登录" :visible.sync="showLogin" width="400px" :close-on-click-modal="false" :close-on-press-escape="false">
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
          <div style="display: flex; justify-content: space-between">
            <el-button  type="primary" style="background:#dbb16f ; border-color: #dbb16f;width: 100%" @click="loginSub('loginForm')" >登录</el-button>
          </div>
          <div style="display: flex; justify-content: space-between" class="btn">
            <el-link @click="yanzhenma" style="color: #dbb16f;">验证码登录</el-link>
            <el-link @click="zhuce" style="color: #dbb16f">注册新账号</el-link>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 验证码登录 -->
    <el-dialog title="验证码登录" :visible.sync="showLoginyangzhengma" width="400px" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form :model="loginFormyanzhengma" :rules="loginRuleyanzhengma" ref="loginForm">
        <el-form-item prop="mobile">
          <el-input v-model="loginFormyanzhengma.mobile" placeholder="请输入手机号码"></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-input v-model="loginFormyanzhengma.code" placeholder="请输入天宸网络验证码">
            <template slot="append">
              <el-button type="info" @click="sendchecknumyazhengma" :disabled="checkNumDisabledyanzhengma">
                <span v-if="checkNumDisabledyanzhengma">{{ countDownyanzhengma }}秒后重试</span>
                <span v-else>获取验证码</span>
              </el-button>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <div style="display: flex;align-items: center;justify-content: space-around;">
            <el-checkbox v-model="loginForm.checked">登录即代表你已同意</el-checkbox>
            <span class="yonghuxieyi" @click.stop="toTHXY">《用户服务协议》</span>
            <span style="cursor: pointer; color: #aeaeae" @click="toforgetPwd">忘记密码</span>
          </div>
        </el-form-item>

        <el-form-item>
          <div style="display: flex; justify-content: space-between">
            <el-button  type="primary" style="background:#dbb16f ; border-color: #dbb16f;width: 100%" @click="loginSub('loginForm')" >登录</el-button>
          </div>
          <div class="btn" style="display: flex; justify-content: space-between" >
            <el-link @click="mima" style="color: #dbb16f;">密码登录</el-link>
            <el-link @click="zhuce" style="color: #dbb16f;">注册新账号</el-link>
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
          <div style="display: flex; justify-content: space-between" class="btn">

            <el-button type="primary" style="background:  #dbb16f; border-color:  #dbb16f;width: 100%" @click="registerSub('registerForm')">
              注册
            </el-button>
          </div>
          <div style="display: flex; justify-content: space-between">
            <el-link style="color:  #dbb16f ;" @click="denglu">登录账号</el-link>
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
import { Login,Getcode,Register} from '@/api'
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
      navactive: false,
      isRouterAlive: true,
      showLogin: false,
      showLoginyangzhengma:false,
      loginForm: {
        mobile: "",
        password: "",
        checked: true,
      },
      loginRule: {
        mobile: [{ required: true, message: "手机号码格式错误", trigger: "blur" }],
        password: [{ required: true, message: "请输入6-16位登录密码", trigger: "blur" }],
      },
      loginFormyanzhengma: {
        mobile: "",
        code: "",
        checked: true,
      },
      loginRuleyanzhengma: {
        mobile: [{ required: true, message: "手机号码格式错误", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      showRegister: false,
      registerForm: {
        mobile: "",
        code: "",
        username: "",
        password: "",
        checked: true,
      },
      registerRule: {
        mobile: [{ required: true, message: "手机号码格式错误", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        username: [{ required: true, message: "请输入2~15位用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入6-16位登录密码", trigger: "blur" }],
      },
      checkNumDisabled: false,
      checkNumDisabledyanzhengma:false,
      countDown: 60,
      countDownyanzhengma: 60,
      timer: null,
      timeryanzhengma: null,
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
    console.log(this.$route,'路由-------------------------------------------------------------')
  },
  mounted() {
    window.addEventListener("scroll", this.getScroll);
    this.initLogin();
    this.bbtn();
  },

  destroyed() {
    window.removeEventListener("scroll", this.getScroll);
  },

  methods: {
    bbtn(){
      let that =this
      this.bus.$on("load",(message)=>{   //这里最好用箭头函数，不然this指向有问题
        that.showLogin = message
      })
    },
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
      // console.log(window.localStorage.getItem("isLogin"))
      // if (window.localStorage.getItem("isLogin")==null ||window.localStorage.getItem("isLogin") == true ||window.localStorage.getItem("isLogin") == false) {
      //     this.isLogin = true;
      // } else {
      //     this.isLogin = true;
      // }
      this.isLogin = true;
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
    zhuce() {
      this.showLogin = false;
      setTimeout(() => {
        this.showRegister = true;
      }, 200);
    },
    yanzhenma(){
      this.showLogin = false;
      setTimeout(() => {
        this.showLoginyangzhengma = true;
      }, 200);
    },
    mima(){
      this.showLoginyangzhengma = false;
      setTimeout(() => {
        this.showLogin = true;
      },200);
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

    loginSub(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.loginForm.checked) {
            let data = {
              'accout': this.loginForm.mobile,
              'user_pass' : this.loginForm.password
            }

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
      if(res.code == 0){
        this.$message({
          message: res.msg,
          type: "success",
        });
        window.localStorage.setItem("isLogin", true);
        window.localStorage.setItem("token", res.info.token);
        window.localStorage.setItem("user",JSON.stringify(res.info));
        this.isLogin = true
        setTimeout(() => {
          this.showRegister = false;
          this.$router.push("/");
          this.showLogin = false;

        }, 1000);


      }else{
        this.$message({
          message: res.msg,
          type: "warning",
        });
      }
    },

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
        this.isLogin = true
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
    async sendchecknumyazhengma() {
      if (this.$REGEXUTIL.isPhone(this.loginFormyanzhengma.mobile)) {
        const timer_COUNT = 60;
        if (!this.timeryanzhengma) {
          this.countDownyanzhengma = timer_COUNT;
          this.checkNumDisabledyanzhengma = true;
          this.timeryanzhengma = setInterval(() => {
            if (this.countDownyanzhengma > 0 && this.countDownyanzhengma <= timer_COUNT) {
              this.countDownyanzhengma--;
            } else {
              this.checkNumDisabledyanzhengma = false;
              clearInterval(this.timeryanzhengma);
              this.timeryanzhengma = null;
            }
          }, 1000);
        }

        let sign = this.$md5(
            "mobile=" + this.loginFormyanzhengma.mobile + "&" + envconfig.CODE_SALT
        );

        let data = {
          'mobile':this.loginFormyanzhengma.mobile,
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
          this.checkNumDisabledyanzhengma = false;
          clearInterval(this.timeryanzhengma);
          this.timeryanzhengma = null;
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
  color: #dbb16f  !important;
}
.el-dialog__header{
  text-align center
}
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #dbb16f !important;
  border-color: #dbb16f  !important;
}
:root {
  --swiper-theme-color: #dbb16f !important;
}
.el-checkbox__input.is-focus .el-checkbox__inner{
  border-color #dbb16f !important;
}
.el-checkbox__input.is-checked+.el-checkbox__label{
  color #dbb16f !important;
}

.el-link.is-underline:hover::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 0;
  bottom: 0;
  border-bottom: 1px solid  #dbb16f !important;
}
</style>