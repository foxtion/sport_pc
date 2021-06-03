let webHost = window.location.host
let api = ''
const VERSION = ['1.0.0']
const SOURCE = 'pc'
const SUFFIX = "/appapi/?service="
const CODE_SALT="76576076c1f5f657b634e966c8836a06"
const SOCKET="ws://172.16.127.58:9293"
//const SOCKET=""
/*if (webHost === '172.16.127.74:82') {
    api = 'http://172.16.127.74:81'
} else if (webHost === 'localhost:82') {
    api = 'http://localhost:81'
} else if(webHost == '107.148.224.65:85'){
    api='http://107.148.224.65:85';
}else{
    api = 'https://api.daoyunxiang.com'
}*/

  // api = 'http://107.148.224.65:84'
   // api ="http://107.148.224.65:3306"
    api = 'http://107.148.224.65:84' //正式
export default {api,VERSION,SOURCE,SUFFIX,CODE_SALT,SOCKET}