<template>
  <div class="content">
    <div class="qie-header">
      <div class="header">
        <a href="javascript:;" class="logo">
          <img src="@/assets/img/logo.png" />
        </a>
      </div>
      <div class="tab-line">
        <div
          class="tab-item android"
          :class="{ action: showanzhuo }"
          id="apk"
          @click="tabFn(1)"
        >
          <span>安卓APP</span>
        </div>
        <div
          class="tab-item ios-down"
          :class="{ action: showios }"
          @click="tabFn(2)"
        >
          <span>苹果APP</span>
        </div>
        <div
          class="tab-item ios-d"
          :class="{ action: showwy }"
          @click="tabFn(3)"
        >
          <span>苹果网页版</span>
        </div>
      </div>
    </div>
    <div class="tab ios-desktop" id="desktop" v-show="showwy">
      <h1>添加到桌面教程</h1>
      <div class="step">
        <p class="step-wenan">1、用苹果手机打开Safari浏览器</p>
        <p class="step-tip">
          点击网址进入首页 ，
          <a href="https://yidu.daoyunxiang.com/" class="goHome"
            >https://yidu.daoyunxiang.com/</a
          >
        </p>
        <img class="step-image" src="@/assets/download/web1.jpg" />
      </div>
      <div class="step">
        <p class="step-wenan">2、单击浏览器底部正中间的分享按钮。</p>
        <img class="step-image" src="@/assets/download/web2.jpg" />
      </div>
      <div class="step">
        <p class="step-wenan">3、在弹出的分享窗口中，单击“添加到主屏幕”</p>
        <p class="step-tip">
          （按钮在底部靠右侧位置，小屏幕手机可能需要往右滑动屏幕才能找到）
        </p>
        <img class="step-image" src="@/assets/download/web3.jpg" />
      </div>
      <div class="step">
        <p class="step-wenan">4、在弹出的窗口中，单击顶部右侧位置“添加”按钮</p>
        <img class="step-image" src="@/assets/download/web4.jpg" />
      </div>
      <div class="step">
        <p class="step-wenan">
          5、添加成功，桌面多了【一度直播】网站打开快捷方式
        </p>
        <img class="step-image" src="@/assets/download/web5.jpg" />
      </div>

      <!-- <div class="desk-foot">
        <a class="downAPP foot-item" href="http://yuyanlive.com/">
          <span>去添加</span>
        </a>
        <a class="downURL foot-item" href="javascript:$(&#39;.ios-down&#39;).click()">
          <span>下载APP</span>
        </a>
        <a
          class="downURL foot-item"
          href="https://www.yuyanlive.com/download/?from=gdt202009#desktop"
        >
          <span>重新阅读</span>
        </a>
      </div>-->
    </div>
    <div class="tab ios-download" id="iostop" v-show="showios">
      <h1>APP教程</h1>
      <div class="step">
        <p class="step-wenan">
          1.
          <a href="https://testflight.apple.com/join/PrfQQeJ2" target="_blank"
            >点击下载</a
          >或手机扫描二维码进入TestFlight，安装后不要卸载TestFlight
          <br />
          <br />
          <img class="step-image" src="@/assets/download/ios1.jpg" />
          如果已安装Testflight，直接点击【开始测试】，如果未安装，则继续按照下面的步骤先安装Testflight
        </p>
      </div>
      <div class="step">
        <p class="step-wenan">2.安装Testflight</p>
        <img class="step-image" src="@/assets/download/ios2.jpg" />
      </div>
      <div class="step">
        <p class="step-wenan">
          3.打开Testflight
          <img class="step-image" src="@/assets/download/ios3.jpg" />
        </p>
      </div>
      <div class="step">
        <p class="step-wenan">4.点击【继续】</p>
        <img class="step-image" src="@/assets/download/ios4.jpg" />
      </div>
      <div class="step">
        <p class="step-wenan">5.接受Testflight协议</p>
        <img class="step-image" src="@/assets/download/ios5.jpg" />
      </div>
      <div class="step">
        <p class="step-wenan">
          6.返回浏览器，点击【开始测试】，安装一度直播APP
        </p>
        <img class="step-image" src="@/assets/download/ios6.jpg" />
      </div>
      <br />
      <br />
      <br />
      <!-- <div class="ios-foot">
        <a
          class="downAPP foot-item"
          href="https://testflight.apple.com/join/PrfQQeJ2"
          target="_blank"
        >
          <span>立即下载</span>
        </a>
        <a
          class="downURL foot-item"
          href="https://www.yuyanlive.com/download/?from=gdt202009#iostop"
        >
          <span>重新阅读</span>
        </a>
      </div>-->
    </div>
    <div class="tab android-download" v-show="showanzhuo">
      <a
        class="android-download-btn download"
        href="https://zb-download.oss-cn-shenzhen.aliyuncs.com/yuyan-live-111_20200910.apk"
        >点击安卓APP安装包</a
      >
      <br />
      <br />或
      <br />
      <br />扫描二维码
      <br />
      <br />
      <img class="code" src="@/assets/download/down_logo.png" />
    </div>
  </div>
</template>

<script>
export default {
  name: "download",
  data() {
    return {
      showanzhuo: true,
      showios: false,
      showwy: false,
    };
  },
  methods: {
    tabFn(i) {
      if (i == 1) {
        this.showanzhuo = true;
        this.showios = false;
        this.showwy = false;
      } else if (i == 2) {
        this.showanzhuo = false;
        this.showios = true;
        this.showwy = false;
      } else {
        this.showanzhuo = false;
        this.showios = false;
        this.showwy = true;
      }
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  font-size: 18px;
  padding: 20px;
}

.content {
  background: #fff;
  padding: 10px;
  max-width: 750px;
  margin: 100px auto 0;
}

.header {
  height: 80px;
  text-align: center;
}

.header img {
  height: 80px;
  margin-top: 10px;
}

.tab-line {
  height: 50px;
  width: 100%;
  display: flex;
  height: 50px;
  margin-top: 20px;
}

.tab-item {
  width: 100%;
  flex: 1;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
  background-color: #1c1a3c;
  color: #fff;
}

.action {
  background: #89d3fd;
  color: #fff;
}

.android-download {
  min-height: 800px;
  text-align: center;
  padding: 50px;
}

.ios-desktop img {
  width: 100%;
}

.desk-foot {
  position: fixed;
  bottom: 0;
  display: flex;
  width: 100%;
  background: #fff;
  height: 50px;
  max-width: 750px;
  margin-left: -10px;
}

.foot-item {
  flex: 1;
  text-align: center;
  line-height: 50px;
  text-decoration: none;
}

.foot-item span {
  background: #89d3fd;
  padding: 6px 15px;
  border-radius: 50px;
  color: #fff;
  font-size: 14px;
  text-decoration: none;
}

/* .ios-download {} */

.ios-download img {
  width: 100%;
}

.ios-foot {
  position: fixed;
  bottom: 0;
  display: flex;
  width: 100%;
  background: #fff;
  height: 50px;
  max-width: 750px;
  margin-left: -10px;
}

.code {
  width: 150px !important;
}

.yindao {
  position: fixed;
  top: 0;
  left: 0;
}

.yindao img {
  width: 100%;
}

@font-face {
  font-family: uc-nexus-iconfont;
  src: url(
        chrome-extension://pogijhnlcfmcppgimcaccdkmbedjkmhi/res/font_9qmmi8b8jsxxbt9.woff
      )format("woff"),
    url(
        chrome-extension://pogijhnlcfmcppgimcaccdkmbedjkmhi/res/font_9qmmi8b8jsxxbt9.ttf
      )format("truetype");
}
</style>