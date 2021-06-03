<template>
  <footer class="footer-wrapper" style="background:-webkit-linear-gradient(
270deg
, rgba(63, 71, 100, 1) 0%, rgba(58, 65, 89, 1) 81%, rgba(63, 71, 100, 1) 99%);padding-top: 15px ">
    <div class="inner clearfix">
<!--      <div class="logo-footer">-->
<!--        <img src="../assets/img/bg10.png" style="width: 340px;position: relative;top: -16px;left:69px"/>-->
<!--        &lt;!&ndash;                <img src="@/assets/img/logo.png"  style="width: 130px;position: relative;top: -18px;left: -230px;"/>&ndash;&gt;-->
<!--        <span style="font-weight: bold;font-size: 14px;color:white;position: relative;top: -30px;left: -160px;">一度体育yidu.tv</span>-->
<!--      </div>-->
      <div class="guide" style="color:white;overflow: hidden;display: flex;justify-content: center">

        <div>
          <span style="font-weight: 500;font-size: 14px">友情链接 </span>
          <!--                    <span style="color:gray">/Links</span>-->
          <br>
                              <br><a class="footerhover" style="color:#8d93a1;font-size: 12px" href="https://tiyu.baidu.com/">百度体育</a>
                              <br><a class="footerhover" style="color:#8d93a1;font-size: 12px" href="https://www.dongqiudi.com/">懂球帝</a>
                              <br><a class="footerhover" style="color:#8d93a1;font-size: 12px" href="http://3jk.r2253.com/">来聊</a>
        </div>
        <div>
          <span  style="font-weight: 500;font-size: 14px">平台相关</span>
          <!--                    <span style="color:gray">/Platform Related</span> -->
          <br>
          <br>
          <span class="footerhover" style="color:#8d93a1;font-size: 12px" @click="dialogVisiblechenge" >意见反馈</span>
          <br>
          <router-link :to="{ name: 'agreement' }" target="_blank">
            <span class="footerhover" style="color:#8d93a1;font-size: 12px">用户协议</span>
          </router-link><br>
          <a href="https://ydtyyxgs.qiyukf.com/client?k=bf315a6df962fb17feb5471f325047e3&wp=1&shuntId=0">
             <span style="color:#8d93a1;font-size: 12px" class="footerhover" >
            主播帮助
            </span>
          </a>
        </div>
        <div style="margin-right: 54px">
          <span style="font-weight: 500;font-size: 14px">龙牙APP </span>
          <!--                    <span style="color:gray">/Links</span>-->
          <br>
          <br><span style="color: #8d93a1;font-size:12px">IOS/Android下载</span>
          <br><img width="90px" src="../assets/images/erweima.png">
          <br>
        </div>
        <div>
          <span style="font-weight: 500;font-size: 14px">关注我们</span>
          <!--                    <span style="color:gray">/Contact</span>-->
          <br>
          <br><span style="color:#8d93a1;font-size: 12px">公众号</span>
          <br><img width="90px" src="../assets/images/erweima.png">
          <br>
        </div>
        <div style="margin-left: 30px">
          <span style="font-weight: 500;font-size: 14px">联系我们</span>
          <!--                    <span style="color:gray">/Contact</span>-->
          <br>

          <!--                    <br><img width="20px" src="../assets/img/logoicon.png"><span style="color:#D7D7D7">官方网站</span> <br>  <span style="font-size: 13px;color:#D7D7D7">yidu.daoyunxiang.com</span>-->
          <br>

          <span style="color:#8d93a1;font-size: 12px">微博: @龙牙体育官微</span>
          <br><span style="color:#8d93a1;font-size: 12px">公众号: @龙牙体育平台</span>
          <br><span style="color:#8d93a1;font-size: 12px">邮箱: paidaxing09@gmail.com</span>
        </div>

        <!--                <div style="margin-left:50px">   <img width="100px"  src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1359915540,789195830&fm=26&gp=0.jpg"><br>-->
        <!--                    <span style="color:#D7D7D7">龙牙体育APP</span></div>-->
      </div>
      <div>
        <el-divider style="margin: 10px 0;background-color:#8d93a1"></el-divider>
       <a href="https://beian.miit.gov.cn/"> <p class="copyright"><span>琼ICP备2021003679号</span><b>|</b><span>桂网文（2019）5333-055号</span><b>|</b><span>增值电信业务经营许可证:桂B2-20200107</span></p></a>
      </div>
      <div>
        <ul class="imgs"><li><img src="https://img.fshtb.cn/assets/image/01@3x.0f33df302006ea9b0d9f8f034c94826c.png" alt="中国互联网诚信示范企业"></li><li><img src="https://img.fshtb.cn/assets/image/02@3x.3c49d316de0256ec621ced0617a72715.png" alt="违法和不良信息举报中心"></li><li><img src="https://img.fshtb.cn/assets/image/03@3x.903ce92aa01881483ec3353c7bad542c.png" alt="网络110报警服务"></li><li><img src="https://img.fshtb.cn/assets/image/04@3x.fd40a128b26ce2c5e070fad7642ae028.png" alt="中国互联网协会"></li><li><img src="https://img.fshtb.cn/assets/image/05@3x.70c7e10fccfc228b2c29a178e15cc15e.png" alt="中国互联网协会信用评价中心"></li><li><img src="https://img.fshtb.cn/assets/image/06@3x.f87c07bc675ea8a3c0a3f3c6d6217a03.png" alt="诚信网站"></li></ul>
      </div>
      <div class="desc" style="color:#8d93a1;font-size: 12px">

        <p>
          Copyright © 2021-2025 龙牙体育, All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "footerbar",

  data() {
    return {
    };
  },
  methods: {
    dialogVisiblechenge(){
      this.bus.$emit('bload', true)
    }
  },
};
</script>

<style lang="stylus">
footer {
  /*margin-top: 200px;*/
  width: 100%;
  background: #212224;
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
  /*display: inline-block;*/
  font-size: 16px;
  line-height: 22px;
  float: left;
  text-align: left;
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
  padding-bottom: 10px;
}
.footerhover:hover{
  color: #57bbfa !important;
}
.copyright {
  padding-top: 8px;
  font-size: 12px;
  color:#8d93a1;
}
.copyright > span:hover{
  color: #57bbfa !important;
}
.imgs {
  font-size: 0;
  text-align: center;
  margin: 8px 0 8px 0;
  min-width: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
}
.imgs li {
  vertical-align: bottom;
  display: inline-block;
  margin-right: 22px;
  border-radius: 3px;
  background-color: #4e5057;
  width: 97px;
  height: 38px;
}
.imgs li img {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}
.el-divider{
  background-color: #bbbcbd !important;
}
</style>