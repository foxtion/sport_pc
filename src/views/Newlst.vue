
<template>

  <div class="view-container" view-id="44576">
    <h1 style="width: 0px; height: 0px; opacity: 0;">{{news.title}}</h1><div class="main-content">
    <div style="height: 70px"></div>
    <!--轮播图 -->
    <div class="article el-tabs--border-card">
      <div class="mod18"><span id="prev" style="background-color: rgba(0, 0, 0, 0.7);" class="btn prev"></span><span id="next" style="background-color: rgba(0, 0, 0, 0.7);" class="btn next"></span> <span id="prevTop" class="btn prev" style="display: none;"></span> <span id="nextTop" style="display: none;" class="btn next"></span>
        <div id="picBox" class="picBox">
          <ul class="cf" ref="picBoxULref">
            <li  v-for="(item, index) in newlst"   ref="picBoxLIref" @click="$router.push({name: 'New', params: {key: 'newid', value: item.id }})">
              <a href="#"><img style="width: 884px;" :src='item.thumb' alt=""></a>
              <span>{{ item.title}}</span>
            </li>
          </ul>
        </div>

        <div id="listBox" class="listBox">
          <ul class="cf" ref="listBoxULref">
            <li class="on" v-for="(item, index) in newlst"  ref="listBoxLIref" style="display: flex;justify-content: flex-start">
              <i class="arr2"></i><a href="#"><img style="width: 100%;height:100%;" :src='item.thumb' alt=""></a>
            </li>

          </ul>
        </div>
        <div class="clear"></div>
      </div>
    </div>

    <div class="article">
      <el-tabs type="border-card" @tab-click="changetype">
        <el-tab-pane name="" label="全部" >
          <div v-for="item in news" :key="item" style="margin:15px;cursor:pointer">
            <div style="border-radius: 4px;width: 34%;height:158px;overflow:hidden" >
              <img width="100%" :src="item.thumb" @click="$router.push({name: 'New', params: {key: 'newid', value: item.id }})"></div>
            <el-card class="box-card" style="width: 65%;float:right;margin-top: -152px;">
              <div slot="header" class="clearfix"  @click="$router.push({name: 'New', params: {key: 'newid', value: item.id }})">
                <span style="font-weight:bold;">{{item.title.substring(0,28)}}</span>
                <el-button style="float: right; padding: 3px 0;color:#1E90FF;" type="text">♥点赞</el-button>
              </div>
              <div  class="text item" style="color:gray ;font-size: 15px"  @click="$router.push({name: 'New', params: {key: 'newid', value: item.id }})">
                {{item.content.substring(0,95)+'....'}}
                <p>{{item.addtime}}</p>
              </div>
            </el-card>
          </div>
          <el-pagination
              background
              @current-change="yeChange"
              layout="prev, pager, next"
              :total="total">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane name="足球" label="足球">
          <div v-for="item in zqlst" :key="item" style="margin:15px;cursor:pointer"  @click="$router.push({name: 'New', params: {key: 'newid', value: item.id }})">

            <div style="border-radius: 4px;width: 34%;height:158px;overflow:hidden" >
              <img width="100%" :src="item.thumb"></div>
            <el-card class="box-card" style="width: 65%;float:right;margin-top: -152px;">
              <div slot="header" class="clearfix">
                <span style="font-weight:bold;">{{item.title.substring(0,28)}}</span>
                <el-button style="float: right; padding: 3px 0;color:#1E90FF;" type="text">♥点赞</el-button>
              </div>
              <div  class="text item" style="color:gray ;font-size: 15px">
                {{item.content.substring(0,95)+'....'}}
                <p>{{item.addtime}}</p>
              </div>
            </el-card>

          </div>
        </el-tab-pane>
        <el-tab-pane name="篮球" label="篮球">
          <div v-for="item in lqlst" :key="item" style="margin:15px;cursor:pointer" @click="$router.push({name: 'New', params: {key: 'newid', value: item.id }})">

            <div style="border-radius: 4px;width: 34%;height:158px;overflow:hidden" >
              <img width="100%" :src="item.thumb"></div>
            <el-card class="box-card" style="width: 65%;float:right;margin-top: -152px;">
              <div slot="header" class="clearfix">
                <span style="font-weight:bold;">{{item.title.substring(0,28)}}</span>
                <el-button style="float: right; padding: 3px 0;color:#1E90FF;" type="text">♥点赞</el-button>
              </div>
              <div  class="text item" style="color:gray ;font-size: 15px">
                {{item.content.substring(0,95)+'....'}}
                <p>{{item.addtime}}</p>
              </div>
            </el-card>

          </div></el-tab-pane>
        <el-tab-pane name="新闻" label="新闻">
          <div v-for="item in xwlst" :key="item" style="margin:15px;cursor:pointer" @click="$router.push({name: 'New', params: {key: 'newid', value: item.id }})">

            <div style="border-radius: 4px;width: 34%;height:158px;overflow:hidden" >
              <img width="100%" :src="item.thumb"></div>
            <el-card class="box-card" style="width: 65%;float:right;margin-top: -152px;">
              <div slot="header" class="clearfix">
                <span style="font-weight:bold;">{{item.title.substring(0,28)}}</span>
                <el-button style="float: right; padding: 3px 0;color:#1E90FF;" type="text">♥点赞</el-button>
              </div>
              <div  class="text item" style="color:gray ;font-size: 15px">
                {{item.content.substring(0,95)+'....'}}
                <p>{{item.addtime}}</p>
              </div>
            </el-card>

          </div>
        </el-tab-pane>
        <el-tab-pane name="公告" label="公告">
          <div v-for="item in gglst" :key="item" style="margin:15px;cursor:pointer" @click="$router.push({name: 'New', params: {key: 'newid', value: item.id }})">

            <div style="border-radius: 4px;width: 34%;height:158px;overflow:hidden" >
              <img width="100%" :src="item.thumb"></div>
            <el-card class="box-card" style="width: 65%;float:right;margin-top: -152px;">
              <div slot="header" class="clearfix">
                <span style="font-weight:bold;">{{item.title.substring(0,28)}}</span>
                <el-button style="float: right; padding: 3px 0;color:#1E90FF;" type="text">♥点赞</el-button>
              </div>
              <div  class="text item" style="color:gray ;font-size: 15px">
                {{item.content.substring(0,95)+'....'}}
                <p>{{item.addtime}}</p>
              </div>
            </el-card>

          </div>
        </el-tab-pane>

        <el-tab-pane name="电竞" label="电竞">
          <div v-for="item in djlst" :key="item" style="margin:15px;cursor:pointer" @click="$router.push({name: 'New', params: {key: 'newid', value: item.id }})">

            <div style="border-radius: 4px;width: 34%;height:158px;overflow:hidden" >
              <img width="100%" :src="item.thumb"></div>
            <el-card class="box-card" style="width: 65%;float:right;margin-top: -152px;">
              <div slot="header" class="clearfix">
                <span style="font-weight:bold;">{{item.title.substring(0,28)}}</span>
                <el-button style="float: right; padding: 3px 0;color:#1E90FF;" type="text">♥点赞</el-button>
              </div>
              <div  class="text item" style="color:gray ;font-size: 15px">
                {{item.content.substring(0,95)+'....'}}
                <p>{{item.addtime}}</p>
              </div>
            </el-card>

          </div>
        </el-tab-pane>
        <el-tab-pane name="NBA" label="NBA">
          <div v-for="item in nba" :key="item" style="margin:15px;cursor:pointer" @click="$router.push({name: 'New', params: {key: 'newid', value: item.id }})">

            <div style="border-radius: 4px;width: 34%;height:158px;overflow:hidden" >
              <img width="100%" :src="item.thumb"></div>
            <el-card class="box-card" style="width: 65%;float:right;margin-top: -152px;">
              <div slot="header" class="clearfix">
                <span style="font-weight:bold;">{{item.title.substring(0,28)}}</span>
                <el-button style="float: right; padding: 3px 0;color:#1E90FF;" type="text">♥点赞</el-button>
              </div>
              <div  class="text item" style="color:gray ;font-size: 15px">
                {{item.content.substring(0,95)+'....'}}
                <p>{{item.addtime}}</p>
              </div>
            </el-card>

          </div>
        </el-tab-pane>
        <el-tab-pane name="CBA" label="CBA">    <div v-for="item in cba" :key="item" style="margin:15px;cursor:pointer" @click="$router.push({name: 'New', params: {key: 'newid', value: item.id }})">

          <div style="border-radius: 4px;width: 34%;height:158px;overflow:hidden" >
            <img width="100%" :src="item.thumb"></div>
          <el-card class="box-card" style="width: 65%;float:right;margin-top: -152px;">
            <div slot="header" class="clearfix">
              <span style="font-weight:bold;">{{item.title.substring(0,28)}}</span>
              <el-button style="float: right; padding: 3px 0;color:#1E90FF;" type="text">♥点赞</el-button>
            </div>
            <div  class="text item" style="color:gray ;font-size: 15px">
              {{item.content.substring(0,95)+'....'}}
              <p>{{item.addtime}}</p>
            </div>
          </el-card>

        </div></el-tab-pane>
      </el-tabs>


    </div>


  </div>
    <div class="other-info">  <div class="hot-match">
      <div class="head" ><div class="red-line"></div><div class="title">热点赛事</div><div class="space-holder"></div>
        <div class="split-line"></div></div>


    </div>

      <div class="relative-news" style="margin-top: 20px;"><div class="head"><div class="red-line" style="background-color: #03a9f4;"></div><div class="title" style="width:160px">资讯热点 &nbsp;&nbsp;&nbsp;</div>
        <div class="space-holder"></div>

      </div>
        <div class="list" style="margin: 20px;cursor:pointer">
          <div v-for="item in collect" :key="item" style="cursor:pointer;margin-bottom: 10px"  @click="$router.push({name: 'New', params: {key: 'newid', value: item.id }})">
            <div style="border-radius: 2px;width: 90%;height:140px;overflow:hidden" >
              <img width="100%" :src="item.thumb"></div>
            <p style="margin: 5px 0;font-size: 14px;width: 90%">{{item.title}}</p>
            <p style="margin: 5px 0;font-size: 12px"> {{item.newaddtime}}</p>
            <!--            <el-divider></el-divider>-->
          </div>
          <!--            <p v-html = 'collect.content'></p>-->

        </div>
      </div>
    </div>

  </div>

</template>

<script>

import {Collect,zixunlst,newtype,Getnewlst} from '@/api'
import footerbar from "@/components/footerbar.vue";
export default {
  name: "Newlst",
  components: {
    footerbar
  },
  data() {
    return {
      newlst:[],
      news:[],
      collect:'',
      total:0,
      lqlst:[],
      zqlst:[],
      xwlst:[],
      gglst:[],
      djlst:[],
      nba:[],
      cba:[],
      type:'',
      yema:1,
      transition:"",
      w1:884,
      w2:127,
      newArr:[]
    };
  },
  filters: {
    formatDate: function (value) {
      var value=Number(value);
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h % 12 == 0 ? 12 : h % 12;
      let m = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;

      return y + '-'+ MM + '-' + d + ' ' + h + ':' + m ;
    }
  },


  created() {
    this.collecter()
    this.newlister()
    this.getnewlster()
  },
  mounted() {
    // window.this = this
    // this.rollgig()

    this.$nextTick(function() {
      this.rollgig()
      // console.log(this.$refs.picBoxLIref)
    })
  },


  methods: {
    //右侧资讯热点
    async collecter(){

      let res = await Collect();
      this.collect=res;
      this.newlst=res;
      // console.log(res)
      for(let i=0;i<this.collect.length;i++){
        // console.log(Date.parse(this.collect[i].addtime))
        // this.newArr = this.collect[i].push({'newaddtime':this.$options.filters['formatDate'] (Date.parse(this.collect[i].addtime))})
        this.collect[i]['newaddtime'] = this.$options.filters['formatDate'] (Date.parse(this.collect[i].addtime))
      }

    },
    async newlister(){
      let data = {
        "yema":this.yema
      }
      let res = await zixunlst(data);
      this.news=res;
      this.total=res[0].total;
    },

    async newtypeer(){
      let data = {
        "type":this.type
      }
      let res = await newtype(data);
      if(this.type=='足球'){
        this.zqlst=res
      }else if(this.type=='篮球'){
        this.lqlst=res
      }else if(this.type=='新闻'){
        this.xwlst=res
      }else if(this.type=='公告'){
        this.gglst=res
      }else if(this.type=='电竞'){
        this.djlst=res
      }else if(this.type=='NBA'){
        this.nba=res
      }else if(this.type=='CBA'){
        this.cba=res
      }else{
        this.news=res;
        this.total=res[0].total;
      }
    },
    async seasoner(){

      let res = await Season();
      this.season=res;

    },
    async getnewlster(){
      let res = await Getnewlst();
      // this.newlst=res;
      // this.rollgig()
      // console.log(this.newlst)
      // for(var i =0;i<this.newlst.length;i++){
      //   console.log(this.newlst[i].thumb)
      // }
    },
    changetype:function (val){
      //console.log(val.name);
      let _this=this;

      if(val.name=='足球'){
        this.type="足球";
        this.newtypeer()

      }else if(val.name=='篮球'){
        this.type="篮球";
        this.newtypeer()
      }else if(val.name=='新闻'){
        this.type="新闻";
        this.newtypeer()
      }else if(val.name=='公告'){
        this.type="公告";
        this.newtypeer()
      }else if(val.name=='电竞'){
        this.type="电竞";
        this.newtypeer()
      }else if(val.name=='NBA'){
        this.type="NBA";
        this.newtypeer()
      }else if(val.name=='CBA'){
        this.type="CBA";
        this.newtypeer()
      }else{
        this.newlister()
      }

    },
    yeChange(value){

      this.yema=value;
      this.newlister()
    },
    rollgig(){
      // this.transition = t




      function G(s){
        return document.getElementById(s);
      }

      function getStyle(obj, attr){
        if(obj.currentStyle){
          return obj.currentStyle[attr];
        }else{
          return window.getComputedStyle(obj, false)[attr];
        }
      }

      function Animate(obj, json){
        if(obj.timer){
          clearInterval(obj.timer);
        }
        obj.timer = setInterval(function(){
          // console.log()
          for(var attr in json){
            var iCur = parseInt(getStyle(obj, attr));
            iCur = iCur ? iCur : 0;
            var iSpeed = (json[attr] - iCur) / 5;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            obj.style[attr] = iCur + iSpeed + 'px';
            if(iCur == json[attr]){
              clearInterval(obj.timer);
            }
          }
        }, 30);
      }

      var oPic = G("picBox");
      var oList = G("listBox");

      var oPrev = G("prev");
      var oNext = G("next");
      var oPrevTop = G("prevTop");
      var oNextTop = G("nextTop");

      var oPicLi = oPic.getElementsByTagName("li");
      var oListLi = oList.getElementsByTagName("li");
      var len1 = this.newlst.length;
      var len2 = 10;

      var oPicUl = oPic.getElementsByTagName("ul")[0];
      var oListUl = oList.getElementsByTagName("ul")[0];


      this.$nextTick(res=>{
        // if(this.$refs.picBoxLIref[1].clientWidth !== undefined ){
        //   this.w1 = (this.$refs.picBoxLIref[1].clientWidth)
        //   // console.log(this.w1)
        // }
        // if(this.$refs.listBoxLIref[1].clientWidth !== undefined){
        //   this.w2 = (this.$refs.listBoxLIref[1].clientWidth)
        // }
        this.w1 = 884
        this.w2 = 127
      })
      //
      // this.$nextTick(res=>{
      //   this.$refs.picBoxULref.$el.width = this.w1 * len1 + "px";
      //   // console.log(this.$refs.picBoxULref.$el.width)
      //   this.$refs.listBoxULref.$el.width = this.w2 * len2 + "px";
      // })


      // console.log(11111111)
      // console.log(oPicLi)

      let index = 0;
      let num = 5;
      let num2 = Math.ceil(num / 2);
      console.log(num2)
      let that = this
      function Change(){

        Animate(oPicUl, {left: - index * that.w1});

        if(index < num2){
          Animate(oListUl, {left: 0});
        }else if(index + num2 <= len2){
          Animate(oListUl, {left: - (index - num2 + 1) * that.w2});
        }else{
          Animate(oListUl, {left: - (len2 - num) * that.w2});
        }

        for (var i = 0; i < len2; i++) {
          oListLi[i].className = "";
          if(i == index){
            oListLi[i].className = "on";
          }
        }
      }

      oNextTop.onclick = oNext.onclick = function(){

        index ++;
        index = index == len2 ? 0 : index;
        Change();
      }

      oPrev.onmouseover = oNext.onmouseover = oPrevTop.onmouseover = oNextTop.onmouseover = function(){
        clearInterval(timer);
      }
      oPrev.onmouseout = oNext.onmouseout = oPrevTop.onmouseout = oNextTop.onmouseout = function(){
        timer=setInterval(autoPlay,4000);
      }

      oPrevTop.onclick = oPrev.onclick = function(){

        index --;
        index = index == -1 ? len2 -1 : index;
        Change();
      }

      var timer=null;
      timer=setInterval(autoPlay,4000);
      function autoPlay(){
        index ++;
        index = index == len2 ? 0 : index;
        Change();
      }



      // for (var i = 0; i < len2; i++) {
      //   oListLi[i].index = i;
      //   oListLi[i].onclick = function(){
      //     // index = that.index;
      //     Change();
      //   }
      // }

    },

  },

};
</script>


<style scoped src="../style/view-7c4ae7376a.css"></style>
<style scoped src="../style/style.css"></style>
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
          background: #f8c21b;
          border-color: #f8c21b;
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
      color: #f8c21b;
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
#prev{
  background-image: url("../assets/img/downleft.png")  !important;
  background-repeat:no-repeat !important;
  background-size: 18px 18px !important;
  background-position: center center;
  border-radius: 2px;
}
#prev:hover{
  background-color: rgba(0, 0, 0, 0.9) !important;
}
#next{
  background-image: url("../assets/img/downright.png") !important;
  background-repeat:no-repeat !important;
  background-size: 18px 18px !important;
  background-position: center center;
  border-radius: 2px;
}
#next:hover{
  background-color: rgba(0, 0, 0, 0.9) !important;
}
</style>