<template>
    <footer class="footer-wrapper" style="background:-webkit-linear-gradient(
270deg
, rgba(63, 71, 100, 1) 0%, rgba(58, 65, 89, 1) 81%, rgba(63, 71, 100, 1) 99%); ">
        <div class="inner clearfix">
            <div class="logo-footer">
                <img src="../assets/img/bg10.png" style="width: 340px;position: relative;top: -16px;left:69px"/>
<!--                <img src="@/assets/img/logo.png"  style="width: 130px;position: relative;top: -18px;left: -230px;"/>-->
                <span style="font-weight: bold;font-size: 18px;color:white;position: relative;top: -30px;left: -160px;">一度体育yidu.tv</span>
            </div>
            <div class="guide" style="color:white">
                <div>
                    <span style="font-weight: 500;font-size: 18px">平台相关</span>
<!--                    <span style="color:gray">/Platform Related</span> -->
                    <br>
                    <br><span style="color:#D7D7D7">意见反馈</span>   <br>
                    <router-link :to="{ name: 'agreement' }" target="_blank"><span style="color:#D7D7D7">用户协议</span></router-link><br>
                    <span style="color:#D7D7D7"> 联系客服</span>
                </div>
                <div>
                    <span style="font-weight: 500;font-size: 18px">友情链接 </span>
<!--                    <span style="color:gray">/Links</span>-->
                    <br>
                    <br><a style="color:#D7D7D7" href="https://tiyu.baidu.com/">百度体育</a>
                    <br><a style="color:#D7D7D7" href="https://www.dongqiudi.com/">懂球帝</a>
                    <br><a style="color:#D7D7D7" href="http://3jk.r2253.com/">来聊</a>
                </div>
                <div>
                    <span style="font-weight: 500;font-size: 18px">联系我们</span>
<!--                    <span style="color:gray">/Contact</span>-->
                    <br>
                    <br><img width="20px" src="../assets/img/logoicon.png"><span style="color:#D7D7D7">官方网站</span> <br>  <span style="font-size: 13px;color:#D7D7D7">yidu.daoyunxiang.com</span>
                    <br>
                    <img width="20px" src="https://upload.wikimedia.org/wikipedia/zh/thumb/4/46/Sina_Weibo_logo.svg/1200px-Sina_Weibo_logo.svg.png"><span style="color:#D7D7D7">新浪微博 @一度</span>
                </div>
                <div style="margin-left:50px">   <img width="100px"  src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1359915540,789195830&fm=26&gp=0.jpg"><br>
                    <span style="color:#D7D7D7">一度体育APP</span></div>
            </div>
            <div class="desc" style="color:#D7D7D7">
                <el-divider></el-divider>
                <p>
                    Copyright © 2021-2025 一度体育, All rights reserved.
                </p>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: "footerbar",

    data() {
        return {};
    },
    methods: {},
};
</script>

<style lang="stylus">
footer {
    // margin-top: 570px;
    width: 100%;
    background: #10263b;
    display: block;
}

footer .inner {
    width: 1200px;
    margin: auto;
    text-align: center;
}

footer .inner .guide {
    padding-top: 47px;
}

footer .inner .guide>div {
    display: inline-block;
    font-size: 16px;
    height: 22px;
    line-height: 22px;
}

footer .inner .guide>div a {
    color: #fff;
}

footer .inner .guide div:nth-child(2) {
    margin: 0 65px;
}

footer .inner .desc {
    font-size: 14px;
    margin-top: 14px;
    padding-bottom: 50px;
    color: #798088;
}

@media screen and (max-width: 1400px) {
    footer .inner {
        width: 100%;
    }
}

.footer-wrapper {
    background: linear-gradient(
            180deg
            , rgba(63, 71, 100, 1) 0%, rgba(58, 65, 89, 1) 81%, rgba(63, 71, 100, 1) 99%);
}

.footer-wrapper .inner .logo-footer {

    padding-top: 16px;
    margin: 0 auto;
}



.footer-wrapper .inner .guide {
    padding-top: 5px;
}

.footer-wrapper .inner .guide a {
    color: #9698ff;
}

.footer-wrapper .inner .desc {
    color: #5b5dae;
    padding-bottom: 25px;
}
</style>