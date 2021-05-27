<template>
  <div class="course-wrapper">
    <h1>新手主播教程</h1>
    <p>
      <b>一、 软件介绍</b>
      <br />Q：什么是OBS？
      <br />A：OBS是目前最好用的直播软件，并且支持MAC的OS X系统。
    </p>
    <p>
      Q：好用不？
      <br />A：国外软件有中文无广告全免费，安装就含32位与64位版本，通吃各种电脑。
    </p>
    <p>
      Q：哪下载？为啥用它？
      <br />
      <img src="@/assets/picture/01.jpg" />
    </p>
    <p>
      A:登入
      <a href="https://obsproject.com/download" target="_blank">https://obsproject.com/download</a>，选择对应系统点击绿色按钮下载安装程序。
      <br />OBS优点：绿色，傻瓜，好用，有深度。
    </p>
    <p>
      <b>二、 通用快速上手指南</b>
    </p>
    <p>
      打开OBS软件
      <br />
      <img src="@/assets/picture/02.jpg" />
    </p>
    <p>
      1.设置参数：选“设定”
      <br />
      <img src="@/assets/picture/03.jpg" />
    </p>
    <p>
      2.广播设定：录制课程模式：选择只输出文件；做直播模式选择：直播流（去个人中心把FMS URL 和串流吗复制到这来。
      <br />
      <img src="@/assets/picture/04.jpg" />
      <br />
      <img src="@/assets/picture/05.jpg" />
    </p>
    <p>
      3.编码——视频录制，如图一所述设置好（这样设置的参数就能录制出1080原画课程)。视频直播，如图二设置好。
      <br />
      <img src="@/assets/picture/06.jpg" />
    </p>
    <p>
      4.影像——显卡选择，录制视频和直播设置基本一样。基本解析度代表电脑分辨率，是多少填多少。压缩分辨率代表：视频网站上传的视频分级比如、蓝光1080（1920*1080）、超清、高清、和分辨率有关。
      <br />
      <img src="@/assets/picture/07.jpg" />
    </p>
    <p>
      5.音效选择（有外置声卡的请选择外置声卡，没有就选择默认。）其他参数就选择默认就可以了。
      <br />
      <img src="@/assets/picture/08.jpg" />
    </p>
    <p>
      6.参数选择完毕。1、右键添加场景。2、选择来源：右键添加显示器获取或直播源（在显示器获取、图片、文字、游戏源、基础上选择position/size，可以更改屏幕大小、居中，水平）。
      <br />
      <img src="@/assets/picture/09.jpg" />
    </p>
    <p>
      7.开始串流预览，预览没问题就开始录制或直播了。
      <br />
      <img src="@/assets/picture/10.jpg" />
    </p>
    <p>
      OBS视频教程地址：
      <a
        href="https://www.bilibili.com/video/av5658051/"
        target="_blank"
      >https://www.bilibili.com/video/av5658051/</a>
    </p>
    <p>
      <b>三、常见问题</b>
    </p>
    <p>
      1、D3DX10_43.dll错误，80004005错误，请确保
      <br />DIRECTX
      <br />C++
      <br />NET FRAMEWORK 4.0程序是最新的。
    </p>
    <p>
      2、别人老说我画面卡怎么回事？
      <br />
      <img src="@/assets/picture/11.jpg" />
      <br />打开OBS界面，看是否有跳帧，丢帧现象。跳帧，说明你CPU吃不消，降低分辨率。丢帧，说明你最大比特率（码率）太高了，实际上传速度达不到，才会丢帧，降低码率。这种情况小区共享宽带特别常见。
    </p>
    <p>
      3、为什么我看不到直播画面/直播不了/提示重新连接？
      <br />
      <img src="@/assets/picture/12.jpg" />
      <br />看一下软件右下角是否为灰色，灰色表示未推流成功，请检查网络、电脑防火墙和直播码是否正确。
      <br />
      <br />
      <img src="@/assets/picture/13.jpg" />
      <br />绿色表示正常推流。（黄色和红色表示直播掉帧，请根据自己的上传速度进行直播设置。）
    </p>
    <p>
      <b>【小技巧】</b>
    </p>
    <p>
      1、可以按住Ctrl键移动物件一次多个视窗拖曳按住，Shift键调整高度宽度会动到该物件比例（会拉到有点长有点扁，拉不好！看字体与画面会模糊）请注意
      <br />2、检视视窗里Ctrl + ↑
      ↓键盘上下键，可对任物件上前后景位置调整
      <br />3、某些游戏发现抓取不到的时候，尝试关闭Aero去抓取!
      <br />4、OBS支援按键发话!!不想狂飙脏话的时候好用!或是有家人叫骂时很即时能反应!
      <br />5、断网后有可能造成直播码失效（直播码有效期8小时），需要重新获取一下直播码才可以推送成功！
    </p>
  </div>
</template>

<script>
export default {
  name: "course",
  data() {
    return {};
  },
};
</script>

<style scoped>
@import "../style/course.css";
</style>