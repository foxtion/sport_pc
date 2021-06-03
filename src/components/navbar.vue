<template>
  <div id="nav" :class="{ active: active ,navbox22:ishome == 1}"  style="height: 60px" :style="ishome==1?'background:transparent;box-shadow:none':'background:linear-gradient(180deg, #fff 0%, #fbfcff 53%, #f1f6ff 91%, #fff 100%);box-shadow:0 0 5px rgb(0 0 0 / 10%)'">
    <div class="navinner"  :style="ishome==1?'background:transparent;box-shadow:none':'background:linear-gradient(180deg, #fff 0%, #fbfcff 53%, #f1f6ff 91%, #fff 100%);box-shadow:0 0 5px rgb(0 0 0 / 10%)'">
      <div style="display: flex; position: relative;" @mouseleave="cutscore()">
        <img src="../assets/img/loongtvlogo.png" alt class="logo" />
        <ul class="header-menu">
          <li :id="'nav'+i" v-for="(item, i) in navList" :key="i" :class="{ active: item.active }" :style="ishome==1?'color:#fff':'color:#0c0c0c'">
              <span
                  @click="tabFn(item.name, i)"
              >
                  {{ item.name }}
                 <img style="position: absolute;top:-5px"  v-if="item.name === '直播间'"  src="../assets/img/hot.gif"/>
              </span>

              <div style="position: absolute;top:-5px;right:0;color: #dbb16f" v-if="ouzhuobei == true">开发中敬请期待...</div>
              <div class="download-submenu" v-show="showsubmenu">
                <div class="download-submenu-box" style="height:230px">
                  <img src="../assets/img/appdown.png" width="190px" style="float:left">
                  <div style="float:left;margin-left: 15px;">
                    <p style="font-size: 16px;font-weight: 600">一度APP</p><br>
                    <img src="@/assets/code.png" style="border: solid 1px #CCCCCC;width: 135px"/>

                    <p>扫码安装APP</p></div>
                </div>
              </div>
              <div class="team_class" v-show="score" @mouseleave="cutscore()">
                <div class="score"><span @mouseover="changexxk(1)"  :class="[whichball==1?'footorbas':'basorfoot']" @click="tabFn('足球比分', '')">足球</span>
                  <span @mouseover="changexxk(2)" :class="[whichball==2?'footorbas':'basorfoot']" @click="tabFn('篮球比分', '')">篮球</span>
                </div>
              </div>
          </li>
          <!-- <li>
          <router-link to="download">下载APP</router-link>
          </li>-->
        </ul>
      </div>

      <div class="header-right" v-if="isLogin">
        <el-popover width="400" trigger="hover">
          <div style="border-bottom: solid 1px #ebebeb; margin:auto; position:relative; height:220px;">
            <div style="text-align:center;" @click="$router.push({ name: 'mine' })">
              <el-avatar size="large" :src="info.avatar" style="width:100px; height:100px;"></el-avatar>
              <p style = "font-size:20px;letter-spacing:1px; ">
                {{ info.nick_name }}
                <img src="@/assets/img/level.png" style="width: 45px; position: relative; top: 2px;"/>{{ info.level }}
              </p>
              <el-tag type="info" effect="dark" size="small" style="position: absolute; left:5px; top:150px;">Lv.{{ info.level }}</el-tag>
              <div style="width: 70%; position: absolute; left:55px; top:153px;">
                <el-progress :text-inside="true" color="#F1D5B6" background-color="#EBEEF5" :stroke-width="15" :percentage="50"></el-progress>
              </div>
              <el-tag type="info" effect="dark" size="small" style="position: absolute; right:5px; top:150px;">Lv.{{ info.level }}</el-tag>
            </div>

            <div style="font-size: 16px; color: #5A629E; font-weight: normal; line-height:30px; margin-top:50px;">
              <div style="float:left;margin-right:30px;">
                <span>我的钱包</span>
                <img src="@/assets/img/my_coin.png" style="position:relative; top:5px; margin-right:10px;"/>
                <span>{{ info.coin}}</span>
              </div>
              <div style="float:left;">
                <span>龙钻</span>
                <img src="@/assets/img/my_coin.png" style="position:relative; top:5px; margin-right:10px;"/>
                <span>{{ info.coin}}</span>
              </div>
              <div style="float:right; margin-right:0px;width: 68px;height: 27px;vertical-align:center;line-height: 27px;
                                        background: -webkit-linear-gradient(271.510649665691deg, rgba(252, 216, 179, 1) 3%, rgba(185, 153, 119, 1) 97%);
                                        background: -moz-linear-gradient(178.489350334309deg, rgba(252, 216, 179, 1) 3%, rgba(185, 153, 119, 1) 97%);
                                        background: linear-gradient(178.489350334309deg, rgba(252, 216, 179, 1) 3%, rgba(185, 153, 119, 1) 97%);
                                        border: none;border-radius: 5px;display: flex;justify-items: center;align-items: center; padding-left: 17px;color: white;" class="chongzhibtn">
                <!--                                <img src="@/assets/img/score.png" style="position:relative; top:5px; margin-right:10px;"/>-->
                <!--                                <span>{{ info.coin}} </span>-->
                <span style="display: inline-block">充值</span>
              </div>
            </div>
            <el-button size="mini" @click="tuichudl" style="position :absolute;top:0px;right:5px;">退出登录</el-button>
          </div>
          <el-row class="grzxlist">
            <el-col :span="6">
              <img
                  src="@/assets/img/home-active.png"
                  alt
                  @click="$router.push({ name: 'mine' })"
              />
              <p @click="$router.push({ name: 'mine' })">个人中心</p>
            </el-col>
            <el-col :span="6">
              <img
                  src="@/assets/img/concern-active.png"
                  alt
                  @click="$router.push({ name: 'concern' })"
              />
              <p @click="$router.push({ name: 'mine' })">我的关注</p>
            </el-col>

            <el-col :span="6">
              <img
                  src="@/assets/img/message-active.png"
                  alt
                  @click="$router.push({ name: 'message' })"
              />
              <p @click="$router.push({ name: 'mine' })">我的消息</p>
            </el-col>

            <el-col :span="6">
              <img
                  src="@/assets/img/zhubo.png"
                  alt
                  @click="Submit()"
              />
              <p @click=" Submit()">我要直播</p>
            </el-col>
            <!--                        <el-col :span="6">-->
            <!--                            <img src="@/assets/img/subscribe-active.png" alt @click="$router.push({ name: 'myProfile' })" />-->
            <!--                            <p @click="$router.push({ name: 'myProfile' })">个人信息</p>-->
            <!--                        </el-col>-->
          </el-row>

          <div slot="reference" @click="$router.push({ name: 'mine' })">
            <el-avatar size="large" :src="info.avatar"></el-avatar>
          </div>
        </el-popover>
      </div>
      <div class="header-right" v-else>
        <div :class="[regiorlog2==2?'regisbtnsan':'regisbtner']" @mouseover="changelogbtn(1)"  @mouseleave="changelogbtn(2)" @click="denglu" style="font-size: 14px;font-weight: 800">登录</div>
        <div  :class="[regiorlog==2?'regisbtner':'regisbtn']" @click="zhuce"  @mouseover="changeregbtn(1)" @mouseleave="changeregbtn(2)" style="margin-left: 15px; font-size: 14px;font-weight: 800">注册</div>
      </div>
    </div>
    <!--        <el-backtop style="width: 0px">-->
    <!--            <div class="tool-tips-fixed" >-->
    <!--                <img width="100px" ref="erweima" style=" position: absolute;top: -115px;left:-27px;display: none" src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1359915540,789195830&fm=26&gp=0.jpg">-->
    <!--                <a class="down-app link" href="/#/download" target="_blank" @mouseover="changeMask(1)" @mouseout="changeMask(2)">-->
    <!--            <span class="over">-->
    <!--                <i class="ico"><span class="v-a-m">一度<br>APP</span></i>-->
    <!--                <span class="tips"><span class="v-a-m">一度<br>APP</span></span>-->
    <!--            </span>-->

    <!--                </a>-->
    <!--                <a class="link">-->
    <!--            <span class="over" @click="dialogVisible = true">-->
    <!--                <i class="ico iconfont icon-float-feedback"><i style="color:white" class="el-icon-edit-outline"></i></i>-->
    <!--                <span class="tips"><span class="v-a-m" onclick="FeedbackWrap.show()" style="color:white">反馈</span></span>-->
    <!--            </span>-->
    <!--                </a>-->
    <!--                <a class="link" >-->
    <!--            <span class="over">-->
    <!--                <i class="ico iconfont icon-float-backtop"><i class="el-icon-arrow-up" style="color:white;font-size: 25px"></i></i>-->
    <!--                <span class="tips"><span class="v-a-m" style="color:white">回顶部</span></span>-->
    <!--            </span>-->
    <!--                </a>-->
    <!--            </div>-->
    <!--        </el-backtop>-->

    <el-dialog
        title="反馈"
        :visible.sync="dialogVisible"
        width="25%"
        :append-to-body='true'
    >
      <span>问题类型：</span><br><br>
      <el-button type="danger"  style="margin-bottom: 20px" size="small" @click="changefklx('其他')">其他</el-button><el-button type="danger" style="margin-bottom: 20px"  size="small" plain  @click="changefklx('卡顿')">卡顿</el-button>
      <el-button type="danger" style="margin-bottom: 20px"  size="small" plain  @click="changefklx('页面错位')">页面错位</el-button>
      <el-button type="danger" style="margin-bottom: 20px"  size="small" plain  @click="changefklx('死机')">死机</el-button><el-button type="danger" style="margin-bottom: 20px"  size="small" plain  @click="changefklx('页面优化')">页面优化</el-button>
      <el-button type="danger"  style="margin-bottom: 20px" size="small" plain  @click="changefklx('闪退')">闪退</el-button><el-button type="danger"  size="small" plain  @click="changefklx('app')">app</el-button><br><br><br>
      <span>问题详情：</span><br><br>
      <el-input type="textarea" placeholder="我有话要说..." v-model="fankuineir"></el-input><br>
      <img width="150px" src="" ref="tuzhanwei"><el-upload
        action="https://api.daoyunxiang.com/appapi/?service=New.uploadimg"
        list-type="picture-card" auto-upload
    >
      <i class="el-icon-plus"></i>
    </el-upload>


      <br><br><br>
      <span>联系方式(选填，方便我们与您联系)：</span><br><br>
      <el-input v-model="telphone"></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitfk()">提交反馈</el-button>
  </span>
    </el-dialog>
    <div id="asker" style="position:fixed; right:15px;top:360px; width:60px; height:472px">
      <el-tooltip class="item" effect="light" placement="left">
        <div slot="content"  style="color:#dbb16f">问题反馈</div>
        <i @click="dialogVisible = true" class="recordque"></i>
      </el-tooltip>
      <br>
      <br>

      <el-tooltip class="item" effect="light" placement="left">
        <div slot="content" style="color:#dbb16f"> <img width="60px" src="../assets/images/erweima.png"><br>龙牙直播</div>
        <a style="width: 100%;height: 56px;display: inline-block" href="https://app.daoyunxiang.com" target="_blank"> <i class="xiazaiapp"  style="border-radius: 50%;"></i></a>
      </el-tooltip>
      <br>
      <br>
      <el-tooltip class="item" effect="light" placement="left">
        <div slot="content" style="color:#dbb16f;text-align: center"> <img width="60px" src="../assets/images/erweima.png"><br>公众号</div>
        <!--                <img ref="xiazaiappweixin" @click="dialogVisible = true" @mouseover="changeimgyweixin(1)" @mouseleave="changeimgyweixin(2)" class="weixinhover"  style="border-radius: 30px" src="../assets/img/weixi1.jpg">-->
        <i class="xiazaiappweixin"></i>
      </el-tooltip>
      <br>
      <br>
      <el-tooltip class="item zhiCustomBtn" effect="light"  placement="left" >
        <div slot="content"  style="color:#dbb16f;text-align: center;">在线客服</div>
        <!--                <img @click="dialogVisible = true"  src="../assets/img/customer.png">-->
        <a href="https://kf.yidu.tv" target="_blank" style="width: 100%;height: 56px;display: inline-block"><i class="kefuhover"></i></a>
      </el-tooltip>
      <br>
      <br>
      <el-backtop style="right:17px;top: 676px;width: 56px">
        <i class="gototop" @mouseover="changeimgz(1)" @mouseleave="changeimgz(2)" style="border-radius: 50%;" ></i>
      </el-backtop>
    </div>
  </div>
</template>

<script>
import { Login,Getcode,Register,submitfk,GetUserinfo} from '@/api'
export default {
  name: "navbar",
  inject: ["reload"],
  props: {
    active: {
      type: Boolean,
      default() {
        return false;
      }
    },
    isLogin: {
      type: Boolean,
      default() {
        return false;
      }
    },
  },
  watch: {
    isLogin(newVal) {
      this.init();
      // console.log(1111)
    },
  },
  data() {
    return {
      info: {},
      navList: [
        { name: "首页", active: false, url:"#/"},
        { name: "比分", active: false , url:"#/Football"},
        { name: "直播间", active: false , url:"#/LiveType"},
        { name: "资讯", active: false , url:"#/Newlst"},
        { name: "资料库", active: false , url:"comp"},
        { name: "欧洲杯", active: false , url:""},
        { name: "下载APP", active: false , url:""},

      ],
      showsubmenu: false,
      visible: false,
      score: false,
      isLogin:false,
      dialogVisible: false,
      fankuineir:'',
      fktype:'其他',
      fkimg:'',
      telphone:'',
      regiorlog:1,
      whichball:0,
      regiorlog2:1,
      ishome:0,
      ouzhuobei:false,
    };
  },
  mounted() {
    console.log(this.$route.path)
    if(location.hash == "#/"){
      this.ishome = 1
      $('#nav').addClass("navbox2")
      $('.navinner').addClass("navbox")
      $('#nav').addClass("navbox22")
      // this.bus.$emit('scorlles', true)
    }else {
      this.ishome = 0
      $('#nav').removeClass("navbox2")
      $('.navinner').removeClass("navbox")
      $('#nav').removeClass("navbox22")
    }
    console.log(this.$store.state)
    let active = location.hash
    console.log(location.hash)
    this.navList.forEach((item, index) => {
      if(item.url == active){
        this.navList[index].active = true
      }else{
        this.navList[index].active = false
      }

      if(active == "#/Football" || active == "#/Basketball"){
        this.navList[2].active = true
      }
    });
    this.init();
  },
  methods: {
    clickmine(val){
      if(val==1){
        this.ishome = 0
        this.$router.push({ name: 'myHome',query: { id:'1' } })
      }
      if(val==2){
        this.ishome = 0
        this.$router.push({ name: 'concern',query: { id:'1' } })
      }
      if(val==3){
        this.ishome = 0
        this.$router.push({ name: 'message',query: { id:'1' } })
      }
      if(val==4){
        this.ishome = 0
        this.$router.push({ name: 'concern',query: { id:'1' } })
      }
      if(val==1){
        this.ishome = 0
        this.$router.push({ name: 'concern',query: { id:'1' } })
      }
      if(val==5){
        this.ishome = 0
        this.$router.push({ name: 'concern',query: { id:'1' } })
      }
    },
    changexxk(ball)
    {
      if(ball==1){
        this.whichball=2;
      }else{
        this.whichball=1;
      }
    },
    changeregbtn(lei)
    {
      if(lei==1) {
        this.regiorlog = 2;
      } else{
        this.regiorlog=1;
      }
    },
    changelogbtn(lei){
      if(lei==1) {
        this.regiorlog2 = 2;
      } else{
        this.regiorlog2=1;
      }
    },
    changeMask(type)
    {
      if(type==1){
        this.$refs.erweima.style.display="block"
      }else{
        this.$refs.erweima.style.display="none"
      }

    },
    init() {
      let user = JSON.parse(window.localStorage.getItem("user"))
      if(user){
        this.info = user
      }
      // console.log(window.localStorage.getItem("isLogin"))
      if(window.localStorage.getItem("isLogin") == null && window.localStorage.getItem("isLogin") == true){
        this.isLogin = true
      }else {
        this.isLogin = window.localStorage.getItem("isLogin")
      }


      // console.log(this.isLogin)
    },

    cutscore(){
      this.score = false;
    },

    tabFn(name, i) {
      $("#nav" + i).addClass("navclass").siblings().removeClass("navclass")
      switch (name) {
        case "首页":
          this.$router.push("/");
          this.ishome = 1
          this.ouzhuobei = false
          break;
        case "资讯":
          this.$router.push({ name: "Newlst" });
          this.ishome = 0
          this.ouzhuobei = false
          break;
        case "直播间":
          this.$router.push({ name: "LiveType" });
          this.ishome = 0
          this.ouzhuobei = false
          break;
        case "比分":
          this.$router.push({ name: "Football" });
          this.ouzhuobei = false
          break;
        case "足球比分":
          this.$router.push({ name: "Football" });
          this.ishome = 0
          this.ouzhuobei = false
          break;
        case "篮球比分":
          this.$router.push({ name: "Basketball" });
          this.ishome = 0
          this.ouzhuobei = false
          break;
        case "资料库":
          this.$router.push({ name: "comp" ,query:{key:'lst',value:9123}});
          this.ishome = 0
          this.ouzhuobei = false
          break;
        case "下载APP":
          this.$router.push({ name: "download" });
          this.ishome = 0
          this.ouzhuobei = false
          break;
        case "欧洲杯":
          this.$message({
            message: "开发中，敬请期待",
            type: "warning",
          });
          this.ouzhuobei = true
          this.ishome = 0


      }
      this.navList.forEach((item, index) => {
        if (i == index) {
          item.active = true;
        } else {
          item.active = false;
        }
      });

      if(name == '足球比分' || name == '篮球比分'){
        this.navList.forEach((item, index) => {
          if(index == 2){
            item.active = true;
          }else{
            item.active = false;
          }
        });
      }

      this.score = false
    },

    backHome() {
      this.navList = [
        { name: "首页", active: true },
        { name: "全部直播", active: false },
        { name: "赛程", active: false },
      ];
      this.$router.push("/");
    },

    denglu() {
      this.$emit("denglu");
    },

    zhuce() {
      this.$emit("zhuce");
    },
    async submitfker(){
      let data={
        "content":this.fankuineir,
        "contact":this.telphone,
        "type":this.fktype,
        "img":this.fkimg
      }
      let res = await submitfk(data);
      this.$message({
        type: 'info',
        message: res
      });
    },
    submitfk()
    {
      if(this.fankuineir!='' ){
        this.submitfker()
        this.dialogVisible= false
      }else{
        alert("请填写反馈内容")
      }
    },
    tuichudl() {
      this.$confirm("确认退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(() => {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");
        this.$emit("tcdl");
      }).catch(() => {

      });
    },
    changeimgz(type){
      if(type==1){
        this.$refs.gototop.src='https://soket.daoyunxiang.com/backding2.png';
      }else{
        this.$refs.gototop.src='https://soket.daoyunxiang.com/backding.png';
      }
    },
    changeimgy(type)
    {
      if(type==1){
        this.$refs.xiazaiapp.src='https://soket.daoyunxiang.com/downapp2.png';
      }else{
        this.$refs.xiazaiapp.src='https://soket.daoyunxiang.com/downapp.png';
      }
    },
    changeimgx(type)
    {
      if(type==1){
        this.$refs.kefuonline.src='https://soket.daoyunxiang.com/customer2.png';
      }else{
        this.$refs.kefuonline.src='https://soket.daoyunxiang.com/customer.png';
      }
    },

  },
};
</script>
<style scoped src="../style/common-38da6ceed7.css"></style>
<style lang="stylus">
.grzxlist {
  padding: 20px 0;
  .el-col {
    text-align: center;
    cursor: pointer;
  }

  img {
    width: 32px;
  }

  p {
    font-size: 12px;
  }
}

#nav.active {
  background: #fff;
  .navinner {
    .header-menu {
      li {
        color: #fff;
      }
    }
  }
}
.regisbtn{
  color: #DBB16F;
  border:1px solid #DBB16F;
  text-align: center;
  float:left;
  padding: 6px 24px;
  border-radius: 4px;

}
.regisbtner{
  color: white;
  border:1px solid #DBB16F;
  text-align: center;
  padding: 6px 24px;
  float:left;
  border-radius: 4px;
  background: linear-gradient(90deg, #ECCBAB 0%, #DBB16F 100%);
  color: #FFFFFF;
}
.regisbtnsan{
  color: white;
  border:1px solid #DBB16F;
  padding :6px 24px;
  text-align: center;
  float:left;
  border-radius:4px;
  background: linear-gradient(90deg, #ECCBAB 0%, #DBB16F 100%);
  color: #FFFFFF;
}
.footorbas{
  font-size: 16px;
  background : linear-gradient(180deg, rgba(252, 253, 255, 1) 0%, rgba(221, 230, 249, 1) 55%, rgba(254, 254, 255, 1) 100%);
  display:block;
  color:#5A629E;
  float: left;
  padding:5px 10px 5px 10px;
  margin: 16px 10px 10px 22px;
  cursor: pointer;
  letter-spacing :1px;
  box-shadow: 3px 5px 6px 1px #dcdfe7;
  border-radius: 51px;
}
.basorfoot{
  font-size: 16px;
  background : linear-gradient(
      180deg
      , rgba(88, 234, 255, 1) 0%, rgba(87, 184, 250, 1) 55%, rgba(43, 153, 233, 1) 100%);
  display:block;
  color:#FFFFFF;
  float: left;
  padding:5px 10px 5px 10px;
  margin: 16px 10px 10px 22px;
  cursor: pointer;
  letter-spacing :1px;
  box-shadow: 3px 5px 6px 1px #dcdfe7;
  border-radius: 51px;
}
#nav {
  width: 100%;
  background: linear-gradient(
      180deg
      , rgba(255, 255, 255, 1) 0%, rgba(251, 252, 255, 1) 53%, rgba(241, 246, 255, 1) 91%, rgba(255, 255, 255, 1) 100%);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2000;

  .navinner {
    width: 1200px;
    height: 60px;
    margin: 0 auto;
    background: linear-gradient(
        180deg
        , rgba(255, 255, 255, 1) 0%, rgba(251, 252, 255, 1) 53%, rgba(241, 246, 255, 1) 91%, rgba(255, 255, 255, 1) 100%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;

    .logo {
      height: 46px;
      width:120px
      margin-right: 58px;
      cursor: pointer;
    }

    .header-menu {
      display: flex;
      justify-content: space-between;
      align-items: center;

      li {
        padding: 3px 10px;
        line-height: 26px;
        margin: 0 16px;
        font-size: 16px;
        text-align: center;

        cursor: pointer;
        color: #0c0c0c;
      }

      li.active {
        color: #fff;
        background: linear-gradient(
            178.800263761879deg
            , rgba(252, 205, 156, 1) 2%, rgba(205, 151, 85, 1) 98%);
        border-radius: 4px;
      }
      li.navclass{
        color: #fff;
        background: linear-gradient(
            178.800263761879deg
            , rgba(252, 205, 156, 1) 2%, rgba(205, 151, 85, 1) 98%);
        border-radius: 4px;

      }
      li:nth-child(1):hover, li:nth-child(2):hover, li:nth-child(3):hover,li:nth-child(4):hover,li:nth-child(5):hover ，li:nth-child(6):hover {
                                              color: #fff;
                                              background: linear-gradient(
                                                  178.800263761879deg
                                                  , rgba(252, 205, 156, 1) 2%, rgba(205, 151, 85, 1) 98%);
                                              border-radius: 4px;
                                            }
}

.team_class {
  width: 250px;
  border-radius: 4px;
  color: #777;
  cursor: default;
  z-index: 100;
  text-align: center;
  position: absolute;
  left: 179px;
  top: 45px;
  line-height: 100%;
  padding-top: 10px;
}

.score {
  background: #fff;
  border-radius: 8px;
  border: 1px solid #F2F2F2;
  height :60px;
  width:250px;
}

.score span{
  font-size: 16px;
  background : linear-gradient(
      180deg
      , rgba(252, 253, 255, 1) 0%, rgba(221, 230, 249, 1) 55%, rgba(254, 254, 255, 1) 100%);
  display:block;
  color:#5A629E;
  float: left;
  padding:5px 10px 5px 10px;
  margin: 16px 10px 10px 22px;
  cursor: pointer;
  letter-spacing :1px;
  box-shadow: 4px 5px 5px #F2F2F2;
  border-radius: 51px;
}


.score span:hover{
  background: linear-gradient(
      178.800263761879deg
      , rgba(252, 205, 156, 1) 2%, rgba(205, 151, 85, 1) 98%);

  color:#FFFFFF;
}

.score:before {
  display: block;
  position: absolute;
  height: 0;
  width: 0;
  margin: 0;
  padding: 0;
  content: '';
  border: 8px solid transparent;
  border-bottom-color: #fff;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
}

.score p:nth-child(3) {
  margin-top: 6px;
}

.download-submenu {
  width: 390px;
  border-radius: 4px;
  color: #777;
  cursor: default;
  z-index: 100;
  text-align: center;
  position: absolute;
  left: 530px;
  top: 45px;
  line-height: 100%;
  padding-top: 10px;
}


.download-submenu-box {
  padding: 20px;
  font-size: 12px;

  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.2);
}

.download-submenu-box img {

  margin-bottom: 4px;
}

.download-submenu-box p {
  font-size: 12px;
  font-weight: 400;
  line-height: 100%;
}

.download-submenu-box:before {
  display: block;
  position: absolute;
  height: 0;
  width: 0;
  margin: 0;
  padding: 0;
  content: '';
  border: 8px solid transparent;
  border-bottom-color: #fff;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
}

.download-submenu-box p:nth-child(3) {
  margin-top: 6px;
}

.header-right {
  color: #89D3FD;
  span {
    margin: 0 10px;
    cursor: pointer;
  }
  .chongzhibtn{
    width: 68px;
    height: 27px;
    background: -webkit-linear-gradient(271.510649665691deg, rgba(252, 216, 179, 1) 3%, rgba(185, 153, 119, 1) 97%);
    background: -moz-linear-gradient(178.489350334309deg, rgba(252, 216, 179, 1) 3%, rgba(185, 153, 119, 1) 97%);
    background: linear-gradient(178.489350334309deg, rgba(252, 216, 179, 1) 3%, rgba(185, 153, 119, 1) 97%);
    border: none;
    border-radius: 5px;
  }
}
}
}

//.navbox2:hover{
//  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 20%) !important;
//  background-color: rgba(255, 255, 255, 0.08) !important;
//}
.navbox2:hover{
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 20%) !important;
  background-color: rgba(255, 255, 255, 0.08) !important;
}
  .recordque{
    display inline-block
    width 56px
    height 56px
    border-radius 50%
    background url("../assets/images/wenti.png")
    background-size 100% 100%
  }
.recordque:hover{
  background url("../assets/images/wentihover.png")
  background-size 100% 100%
}
  .xiazaiapp{
    display inline-block
    width 56px
    height 56px
    background url("../assets/images/xiazai.png")
    background-size 100% 100%
  }
.xiazaiapp:hover{
  background url("../assets/images/xiazaihover.png")
  background-size 100% 100%
}
  .gototop{
    display inline-block
    width 56px
    height 56px
    background url("../assets/images/zhiding.png")
    background-size 100% 100%
  }
.gototop:hover{
  background url("../assets/images/zhidinghover.png")
  background-size 100% 100%
}
  .kefuhover{
    display inline-block
    width 56px
    height 56px
    background url("../assets/images/kefu.png")
    background-size 100% 100%
  }
.kefuhover:hover{
  background url("../assets/images/kefuhover.png")
  background-size 100% 100%
}
  .xiazaiappweixin{
    display inline-block
    width 56px
    height 56px
    background url("../assets/img/weiin.png")
    background-size 100% 100%
  }
.xiazaiappweixin:hover{
  background url("../assets/images/weixin.png")
  background-size 100% 100%
}
.navbox22{
  position: absolute !important;

}
.el-message--warning{
  top 75px !important
}
</style>
