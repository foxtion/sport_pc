import Vue from "vue";
import axios from "axios";
import store from '@/store'
import envconfig from "./config.js";
import router from '@/router'
import qs from 'qs'
import md5 from 'js-md5';
import {
  Toast
} from "vant";
Vue.use(Toast);

let LOADINGQUEUE = {}  //loading队列
let NOTIPCODE = {}     //不需要提示的非200code

axios.defaults.transformRequest = (data) => qs.stringify(data)
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

const destroy = (url) => {
    delete LOADINGQUEUE[url]
    if (!Object.keys(LOADINGQUEUE).length) {
        Toast.clear()
    }
}

const getUrl = ({ baseURL, url }) => {
    return baseURL + url
}

//发起请求前
axios.interceptors.request.use(
    (config) => {
        let url = config.url.split("?service=")
        if (LOADINGQUEUE[url[1]]) {
            if (LOADINGQUEUE[url[1]] === 'c') {
                Toast.loading({
                    mask: true,
                    loadingType: 'spinner',
                    duration: 0,
                    message: '请求中...'
                })
            } 
        }

        let s = ''
        for(var i in config.params){
            if(config.params[i] != '' || config.params[i] == '0'){
                s += '&'+i + "="+config.params[i]
            }
        }
        
        let date = parseInt(new Date().getTime() / 1000)
        config.headers["Token"] = md5(config.url + s + '&time='+date +"&sign=" + envconfig.CODE_SALT)+"&"+date
        return config
    },(error) => {
        // Toast.fail({
        //     mask: true,
        //     message: '网络不给力',
        //     duration: 1000
        // })
        return Promise.reject(error)
    }
);

// 响应拦截
axios.interceptors.response.use(
    (response) => {
        const url = getUrl(response.config)
        if (Object.keys(LOADINGQUEUE).length) {
            destroy(url)
        }       
        const res = response.data.data 
        if(res){
            if (res.code === 404) {
                Toast.fail({
                    mask: true,
                    message: '非法请求',
                    duration: 1000,
                    onOpened () {
                        Toast.clear()
                    }
                })            
                return res;           
            }else{
                if(res.code == 700){
                    window.localStorage.removeItem("token");
                    window.localStorage.removeItem("user"); 
                    window.localStorage.setItem("isLogin", false);
                    Toast.fail({
                        mask: true,
                        message: '请重新登陆',
                        duration: 1000,
                        onClose: () => {
                            router.push({
                                path: '/'
                            })
                        }
                    })
                }else{
                    Toast.clear()
                    return res;
                }                                
            }
        }              
    },(error) => {
        // Toast.fail({
        //     mask: true,
        //     message: '网络不给力',
        //     duration: 1000,
        //     onOpened () {
        //         Toast.clear()
        //     }
        // })

        return Promise.reject(error)
    }
)
Vue.prototype.$ajax = axios

//get请求  统一传入对象的参数
export function get ({ url, params, needLoading, noTipcode }) {     
    if(url == 'Basketball.getbasketball') {
        needLoading = ''
    } 
    noTipcode && !NOTIPCODE[url] && (NOTIPCODE[url] = noTipcode)   
    needLoading && !LOADINGQUEUE[url] && (LOADINGQUEUE[url] = needLoading)
    
    if(typeof(params) == 'undefined'){
        params = {}
    }
    url = envconfig.api + envconfig.SUFFIX + url
    params.source = envconfig.SOURCE
    params.version = envconfig.VERSION[envconfig.VERSION.length - 1]
    return axios.get(url, {
        params
    })
}

//post请求  统一传入对象的参数
export function post ({ url, params, needLoading, noTipcode },config) {
    noTipcode && !NOTIPCODE[url] && (NOTIPCODE[url] = noTipcode)
    needLoading && !LOADINGQUEUE[url] && (LOADINGQUEUE[url] = needLoading) 
    if(typeof(params) == 'undefined'){
        params = {}
    }
    url = envconfig.api + envconfig.SUFFIX + url
    params.source = envconfig.SOURCE
    params.version = envconfig.VERSION[envconfig.VERSION.length - 1]
    return new Promise(function (resolve, reject) {
        let promise = axios.post(url, params,config)  
        
        promise.then(function (response) { 
            return resolve(response)             
        }).catch(function (error) {
            reject(error)
        })
    })  
}


export default class Axios {
    axios(method, url, params, config) {
        return new Promise((resolve, reject) => {
            if (typeof params !== "object") params = {};
                let _option = Object.assign({
                    method,
                    url,
                    baseURL: envconfig.api,
                    timeout: 30000,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                },
                config
            );
            _option.headers = {
                ..._option.headers,
                token: window.localStorage.getItem("token") || ""
            };

            // 处理get、post传参问题
            method.toUpperCase() != "GET" ? 
            (_option.data = Object.prototype.toString.call(params) === '[object FormData]' ? params : {
                ...params,
            }) :
                (_option.params = params);
                axios.request(_option).then(
                res => {
                    console.log(res)
                    //resolve(res.data);
                },
                error => {
                    if (error.response) {
                        reject(error.response.data);
                    } else {
                        reject(error);
                    }
                }
            );
        });
    }
}