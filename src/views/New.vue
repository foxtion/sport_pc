
<template>

  <div class="view-container" view-id="44576">
    <h1 style="width: 0px; height: 0px; opacity: 0;">{{news.title}}</h1><div class="main-content">
    <div class="article"><div class="crumbs-container"  style="margin-top: 70px;"><div class="crumbs"><span>当前位置:</span> <a @click="$router.push({name: '/'})">首页</a>
      <span>&gt;</span>  <a @click="$router.push({name: 'Newlst'})">资讯中心</a><span>&gt;</span>
      <span>{{news.title}}</span></div></div>
      <div class="article-detail" style="overflow: hidden;"><div class="title" title="{$data.title}">{{news.title}}</div>
        <div class="article-info"><div class="publish-time">发布时间： {{news.addtime}}</div><div class="author"></div><div class="like">
          <img width="20px" src="../assets/resizeApi.png"> <span class="num">{{news.recommended}}</span></div></div>
        <div v-if="news.thumb.indexOf('http')>-1">
          <img width="90%" :src="news.thumb">
        </div>
        <div v-else>
          <img width="90%" :src="'http://localhost/public'+news.thumb">
        </div>
        <div class="article-content" v-html="news.content">
        </div>
        <div class="tips"><div class="tip-container"></div><div class="votes">


        </div></div></div></div>
    <div class="comments"><!----> <div class="comments-wrapper"><div class="head" >
      <div class="red-line" ></div> <div class="title">最新评论</div> <div class="space-holder"></div> <div class="split-line" ></div></div> <div style="padding-bottom: 1px">


      <div class="comment-item" v-for="item in comment" :key="item">
        <div class="split-line"></div>
        <div class="avatar">

          <el-avatar :size="large" :src="item.avatar"></el-avatar>
        </div>
        <div class="comment-content">
          <div class="nick-name">{{item.name}}</div>
          <div class="text">{{item.content}}
          </div> <div class="other">
          <div class="publish-time">{{item.addtime}}</div>
          <div class="votes"><div class="like">
            <i class="iconfont icon-like"></i>
            <span class="num">0</span></div>

          </div>
        </div>
        </div>
        <div class="replys" style="display: none;"></div>
      </div>


      <div class="load-more"><div class="more_btn">无更多评论</div><br>

      </div> <div class="view" @click="plshow()" style="text-align: right;margin:10px; cursor:pointer"><i class="el-icon-s-comment" style="color:#e74c5b"></i> <span  style="color:#e74c5b">评论</span></div>
    </div>
    </div></div>
    <div style="border-radius: 4px;margin-top: 10px;padding: 20px;display: none;background-color: white" ref="pinglunqu">
      <el-input type="textarea"  v-model="pinglunnr" placeholder="请输入评论内容"
                ref="content"></el-input>
      <div style="margin-top: 10px;text-align: right">
        <el-button type="warning" plain @click="submit()">发表评论</el-button></div>
    </div>
  </div>
    <div class="other-info">  <div class="hot-match"><div class="head"><div class="red-line"></div><div class="title">热点赛事</div><div class="space-holder"></div>
      <a class="look-more" rel="nofollow" href="https://live.leisu.com/lanqiu"><span>查看更多</span>
        <img src="../assets/lsfile/IconsAll_right_arrow@2x-0ba6b05ac7.png" alt=""></a><div class="split-line"></div></div>


    </div> <div class="relative-news" style="margin-top: 20px;"><div class="head"><div class="red-line"></div><div class="title"  style="width:160px">相关情报 &nbsp;&nbsp;&nbsp;</div>

      <div class="space-holder"></div>

    </div>
      <el-divider style="margin: 0 0;"></el-divider>
      <div class="list" style="margin: 20px">
        <div v-for="item in collect" :key="item" style="cursor:pointer"  @click="getData( item.id )">
          <div style="border-radius: 2px;width: 90%;height:155px;overflow:hidden" >
            <img width="100%" :src="item.thumb"></div>
          <p>{{item.title}}</p>
          <p> {{item.addtime}}</p>
          <el-divider></el-divider>
        </div>

      </div></div>

    </div>
    <footerbar></footerbar>
  </div>

</template>

<script>
import footerbar from "@/components/footerbar.vue";
import {Collect,detail,commentlst,comment} from '@/api'

export default {
  name: "New",
  components: {

  },
  data() {
    return {
      news:[],
      collect:'',
      nid:this.$route.params.value,
      pinglunnr:'',
      comment:[]
    };
  },
  filters: {
    formatDate: function (value) {
      var value=Number(value+'000');
      //console.log(value);
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let m = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;

      return  y+'-'+MM + '-' + d + ' ' + h + ':' + m ;
    }
  },

  created() {
    let _this=this;
    this.collecter()
    this.commentlster()
    this.detailer()

  },
  mounted() {
      footerbar
  },

  methods: {
    async collecter(){

      let res = await Collect();
      this.collect=res;
    },
    async detailer(){
      let data={
        "nid":this.nid
      }
      let res = await detail(data);
      this.news=res;
    },
    async commentlster(){
      let data={
        "nid":this.nid
      }
      let res = await commentlst(data);
      this.comment=res;
    },
    async commenter(){
      let uid = window.localStorage.getItem("user");
      if(uid!=null && uid.length>0){
        uid=JSON.parse(uid).uid;
      }else{
        uid='49120';
      }
      let data={
        "content":this.pinglunnr,
        "nid":this.nid,
        "uid":uid
      }
      let res = await comment(data);
      this.$message({
        message:res,
        type: 'success'
      });
    },
    plshow(){
      this.$refs.pinglunqu.style.display="block";
    },
    getData(nid) {
      this.nid=nid;
      this.detailer()
      this.commentlster()
    },
    submit()
    {

      this.commenter()
      this.$refs.content.value="";
      this.pinglunnr='';
      this.commentlster()
    },

  }
};

</script>


<style scoped src="../style/view-7c4ae7376a.css"></style>
<style lang="stylus">

.home {
  background: #f0f1f6;
  margin-top: 72px;

#id_test_video {
  position: relative;

.bofangshezhi {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

.id_test_video_cen {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  z-index: 999;
  font-size: 1rem;
}

.van-ellipsis {
  position: absolute;
  top: 5px;
  left: 10px;
  color: #fff;
  z-index: 999;
  display: flex;
  align-items: center;
  width: 90%;
}

.id_test_video_btm {
  position: absolute;
  width: 100%;
  bottom: 10px;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 999;
  padding: 0 0.32rem;

> div {
  color: #fff;

i {
  font-size: 0.5rem;
  margin: 0 0.1rem;
}
}

> div:first-child {
  font-size: 0.3rem;
  font-weight: 700;
  background: url('~@/assets/fire.png') no-repeat left center;
  background-size: contain;
  padding-left: 0.3rem;
}
}
}
}

.livingroom {
  background-image: url('~@/assets/banner.jpg');
  height: 571px;
  background-position: center;
  background-size: cover;

.videoinner {
  width: 1200px;
  margin: 0 auto;
  display: flex;

>div {
  position: relative;

.joinzbj {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  background: #89d3fd;
  border-color: #89d3fd;
  width: 152px;
  height: 60px;
  font-size: 20px;
  font-weight: 600;
}

.video-player {
  width: 1015px;
  height: 567px;
  background: #000;

.vjs-control-bar {
  display: block;
  display: flex;
}

.vjs-big-play-button {
  display: none;
}
}
}

.videolist {
  height: 567px;
  width: 185px;
  padding: 7px 8px 7px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 0 6px 6px 0;
  overflow: hidden;
  transform: translateZ(0);
  transition: padding-top 0.3s linear;

li {
  display: block;
  background: rgba(0, 0, 0, 0.7);
  cursor: pointer;
  border: 2px solid rgba(255, 255, 255, 0);
  position: relative;
  width: 170px;
  height: 105px;
  background: 0 0;
  border-radius: 6px;
  margin-bottom: 8px;

i {
  position: absolute;
  top: 43px;
  left: -1px;
  margin-left: -15px;
}

img {
  display: block;
  width: 166px;
  height: 102px;
  border-radius: 6px;
}
}

li.active {
  border: 2px solid #ffc71c;
  border-radius: 6px;
}

li:hover {
  border: 2px solid #ffc71c;
  border-radius: 6px;
}

li.active .left-arrow::after, li:hover .left-arrow::after {
  position: absolute;
  content: '';
  border-top: 6px transparent dashed;
  border-left: 7px transparent dashed;
  border-bottom: 6px transparent dashed;
  border-right: 7px #ffc71c solid;
}
}
}
}

.livingbody {
.ssyyswiper {
  width: 1200px;
  height: 132px;
  margin: 40px auto 0;
  border-radius: 6px;

.swiper-slide {
  font-weight: 400;
  padding: 16px 16px 20px;
  background: #fff;
  border-right: 1px solid #d8d8d8;
  max-width: 20%;

.title {
  color: #777;
  font-size: 12px;
  margin: 0 0 20px;
  height: 17px;
  display: flex;
  justify-content: space-between;
  align-items: center;

.icon {
  width: 12px;
  height: 12px;
  vertical-align: middle;
  margin-right: 5px;
}

span {
  display: inline-block;
  vertical-align: middle;
}
}

.box {
  display: flex;
  justify-content: space-between;

.battle-team {
  width: 150px;
  overflow: hidden;
  display: inline-block;

p {
  padding-bottom: 10px;
  text-align: left;

.logo {
  width: 24px;
  height: 24px;
}

.ellipsis {
  display: inline-block;
  width: 112px;
  margin: 0 0 0 6px;
  font-size: 14px;
  font-weight: 400;
  height: 24px;
  line-height: 24px;
}
}
}

.appoinment {
  display: inline-block;
  margin-top: 18px;
  width: 52px;
  height: 25px;
  line-height: 25px;
  background: #ffc71c;
  border-radius: 4px;
  color: #000;
  font-size: 12px;
  cursor: pointer;
  text-align: center;
  color: #fff;
}
}
}

.swiper-slide:last-child {
  border: none;
}
}

.swiper-button-next, .swiper-button-prev {
  font-size: 30px;
  color: #979797;
}

.swiper-button-next:hover, .swiper-button-prev:hover {
  color: #89d3fd;
}

.ssyyswipernext {
  right: -60px;
}

.ssyyswiperprev {
  left: -60px;
}

.swiper-button-next:after, .swiper-button-prev:after {
  font-size: 30px;
}
}

.hotinner {
  width: 1200px;
  margin: 50px auto 0;

.hottitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

img {
  width: 183px;
}

.more {
  margin-top: 12px;
  color: #777;
  font-size: 14px;
  font-weight: 400;
  background: url('~@/assets/icon-more.png') no-repeat right;
  padding-right: 13px;
  background-position: right center;
  background-size: 10px auto;
  cursor: pointer;
  text-decoration: none;
  float: right;
}

.more:hover {
  color: #ffc71c;
  background: url('~@/assets/icon-more-hover.png') no-repeat right;
  background-position: right center;
  background-size: 10px auto;
}
}

.hotcontent {
li {
  width: 285px;
  margin: 0 20px 20px 0;
  background-color: #fff;
  display: inline-block;
  border-radius: 4px;

>div {
  position: relative;
  cursor: pointer;
  width: 100%;
  height: 160px;
  transition: color 0.2s ease-out;

.hotcontentimg {
  position: absolute;
  width: 100%;
  height: 160px;
  border-radius: 6px 6px 0 0;
}

.btn-open {
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 44px;
  height: 44px;
  margin: -25px 0 0 -25px;
  background: url('~@/assets/icon-open@2x.png') no-repeat;
  background-size: 44px auto;
  -webkit-transform: scale(2);
  transform: scale(2);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: all 0.25s ease-out;
  transition: all 0.25s ease-out;
}

.com {
  height: 0;
  width: 49px;
  border-top: 24px solid #218aff;
  border-right: 6px solid transparent;
  border-radius: 0 3px 9px 0;
  color: #fff;
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;

i {
  width: 45px;
  position: relative;
  top: -21px;
  left: 8px;
  font-size: 14px;
  font-style: normal;
  text-align: center;
}
}

.bottom-title {
  font-weight: 400;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 28px;
  line-height: 20px;
  font-size: 14px;
  color: #fff;
  padding: 0 14px 8px;
  letter-spacing: 1px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0.8) 100%);
  display: flex;
  justify-content: space-between;

.num img {
  width: 14px;
  padding-top: 3px;
  padding-right: 2px;
}
}
}

.ellipsis {
  background: #fff;
  height: 40px;
  line-height: 40px;
  font-weight: 400;
  padding: 0 14px;
  font-size: 14px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  color: #000;
}
}

li:nth-child(4n) {
  margin-right: 0;
}

li:hover .btn-open {
  opacity: 1;
  transform: scale(1);
}
}
}

.anchorinner {
  width: 1200px;
  margin: 58px auto 0;
  position: relative;
  background: #fff;

>img {
  position: absolute;
  z-index: 10;
  width: 100%;
  top: -33px;
}

.rmzbswiper {
  padding: 48px 0 38px;
  width: 1100px;
  margin: 0 auto;

.swiper-slide {
  padding: 0 20px;
  text-align: center;
  cursor: pointer;

>img {
  width: 80px;
  height: 80px;
  margin-bottom: 5px;
}
}
}
}

.categoryinner {
  width: 1200px;
  margin: 50px auto 0;

.categoryinnertitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

img {
  width: 132px;
}

.more {
  margin-top: 12px;
  color: #777;
  font-size: 14px;
  font-weight: 400;
  background: url('~@/assets/icon-more.png') no-repeat right;
  padding-right: 13px;
  background-position: right center;
  background-size: 10px auto;
  cursor: pointer;
  text-decoration: none;
  float: right;
}

.more:hover {
  color: #ffc71c;
  background: url('~@/assets/icon-more-hover.png') no-repeat right;
  background-position: right center;
  background-size: 10px auto;
}
}

.categoryinnercontent {
li {
  width: 285px;
  margin: 0 20px 20px 0;
  background-color: #fff;
  display: inline-block;
  border-radius: 4px;
  cursor: pointer;

>div {
  position: relative;
  cursor: pointer;
  width: 100%;
  height: 160px;
  transition: color 0.2s ease-out;

.hotcontentimg {
  position: absolute;
  width: 100%;
  height: 160px;
  border-radius: 6px 6px 0 0;
}

.btn-open {
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 44px;
  height: 44px;
  margin: -25px 0 0 -25px;
  background: url('~@/assets/icon-open@2x.png') no-repeat;
  background-size: 44px auto;
  -webkit-transform: scale(2);
  transform: scale(2);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: all 0.25s ease-out;
  transition: all 0.25s ease-out;
}

.com {
  height: 0;
  width: 49px;
  border-top: 24px solid #218aff;
  border-right: 6px solid transparent;
  border-radius: 0 3px 9px 0;
  color: #fff;
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;

i {
  width: 45px;
  position: relative;
  top: -21px;
  left: 8px;
  font-size: 14px;
  font-style: normal;
  text-align: center;
}
}
}

.ellipsis {
  height: 34px;
  padding: 10px 12px;
  line-height: 20px;
  background: #fff;
  font-weight: 400;
  font-size: 14px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  color: #000;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

h6 {
  padding: 1px 12px;
  color: #777;
  line-height: 25px;
  font-weight: 400;
  display: flex;
  justify-content: space-between;

.avatar {
  width: 20px;
  height: 22px;
  border-radius: 50%;
  float: left;
  padding-top: 2px;
  margin-right: 4px;
}

.num {
  background: url('~@/assets/icon-hot-gray.png') no-repeat 0;
  padding-left: 15px;
  background-size: 12px auto;
  font-size: 12px;
}
}
}

li:nth-child(4n) {
  margin-right: 0;
}

li:hover .btn-open {
  opacity: 1;
  transform: scale(1);
}
}
}
}
</style>