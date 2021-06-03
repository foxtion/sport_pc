import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import axios from "axios";
import './style/normalize.css';
import regexUtil from "regex-util";
import md5 from 'js-md5';
import API from "@/server/apis.js"; // 引入api接口
import Vant from 'vant'
import 'vant/lib/index.css'

import vueSwiper from 'vue-awesome-swiper'
import Clipboard from 'clipboard';
import {vueBaberrage} from 'vue-baberrage'
import VueRouter from 'vue-router'
import swiper from './components/swiper.vue'
//import 'vue-video-player/src/custom-theme.css' 
//import VueSocketIO from 'vue-socket.io'

Vue.component('public-swiper',swiper)
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

Vue.use(Vant);
Vue.prototype.$SERVER = API;
Vue.prototype.$REGEXUTIL = regexUtil;
Vue.prototype.$md5 = md5;
Vue.prototype.bus = new Vue()

/*Vue.use(new VueSocketIO({
    debug: true,
    connection: '', 
}))*/


Vue.use(vueSwiper);
Vue.prototype.$axios = axios;
Vue.use(ElementUI);
Vue.prototype.Clipboard = Clipboard;
Vue.use(vueBaberrage);
Vue.config.productionTip = false;

// 路由title设置
router.beforeEach((to, from, next) => {
    // if (to.meta.title) {
    //     document.title = to.meta.title
    // }

    if (to.matched.some(res => res.meta.requireAuth)) {
        if (window.localStorage.getItem("user")) {
            next()
        } else {
            next({
                path: '/'
            })
        }
    } else {
        next()
    }
})

new Vue({
  router,
  store,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')