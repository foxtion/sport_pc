
<template>

    <div class="home" style="height:auto">
        <div class="hometop anchor-home-page-top-wrap" style="padding-top: 45px;background-color:transparent;">
            <div class="content">
            <div class="hot-match-label m-t-10 index-model box_h" style="height:365px;cursor:pointer;background-color:transparent;">
                <div class="block">
                    <div class="block_box">
                        <div class="iontopleft"><img src="../assets/img/itopleft.png"/></div>
                        <div class="iontopright"><img src="../assets/img/itopright.png"/></div>
                        <div class="ionbottomleft"><img src="../assets/img/ibottomleft.png"/></div>
                        <div class="ionbottomright"><img src="../assets/img/ibottomright.png"/></div>
                        <div class="bannertv_box">
                            <div class="bannertv_box_left">
                                <!--大直播画面--->
                                <div id="id_test_video" style="width: 100%;height: auto">

                                </div>
                            </div>
                            <div class="bannertv_box_right">
                                <ul>
                                    <li><span :class="{'tvactive':tvactive == 0}" @click="bannertvchechenge(0)" ref="bannerrightRef"></span></li>
                                    <li class="margin_top"><span :class="{'tvactive':tvactive == 1}" @click="bannertvchechenge(1)"></span></li>
                                    <li class="margin_top"><span :class="{'tvactive':tvactive == 2}" @click="bannertvchechenge(2)"></span></li>
                                    <li class="margin_top"><span :class="{'tvactive':tvactive == 3}" @click="bannertvchechenge(3)"></span></li>
                                    <li class="margin_top"><span :class="{'tvactive':tvactive == 4}" @click="bannertvchechenge(4)"></span></li>
                                    <li class="margin_top"><span :class="{'tvactive':tvactive == 5}" @click="bannertvchechenge(5)"></span></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        </div>
      <div class="content">
        <div class="hot-match-label m-t-10 index-model box_h" style="box-shadow: 3px 3px 5px lightgrey;">
          <div class="label-logo">
            <img width="180px" height="50px" src="../assets/lsfile/hot_match-997582c5c7.gif" />
          </div>
          <div class="sbu-line"></div>
          <a  class="sbu-btn" @click="newwindow(9662)" style="cursor:pointer">欧冠杯</a>
          <a class="sbu-btn"  @click="newwindow(9688)" style="cursor:pointer">英超</a>
          <a class="sbu-btn"  @click="newwindow(9955)"  style="cursor:pointer">亚冠杯</a>
          <a class="sbu-btn"  @click="newwindow(9533)" style="cursor:pointer">欧洲杯</a>
          <a class="sbu-btn"  @click="newwindow(9723)" style="cursor:pointer">西甲</a>
          <a class="sbu-btn"  @click="newwindow(9647)" style="cursor:pointer">德甲</a>
          <a class="sbu-btn"  @click="newwindow(9731)" style="cursor:pointer">意甲</a>
          <a class="sbu-btn"  @click="newwindow(9586)" style="cursor:pointer">法甲</a>
          <a class="sbu-btn"  @click="newwindow(9441)" style="cursor:pointer">中超</a>
          <a class="sbu-btn"  @click="newwindow(9749)" style="cursor:pointer">足协杯</a>

          <a class="sbu-btn"  @click="newwindow(9940)" style="cursor:pointer">日职联</a>
          <a class="sbu-btn"  @click="newwindow(9974)" style="cursor:pointer">韩k联</a>
          <a class="sbu-btn"  @click="newwindow(9867)" style="cursor:pointer">澳超</a>
          <a class="sbu-btn"  @click="newwindow(1057)" style="cursor:pointer">NBA</a>
          <a class="sbu-btn"  @click="newwindow(1055)" style="cursor:pointer">CBA</a>
          <a class="more"  @click="newwindows(9123)" style="cursor:pointer"><span>查看更多   </span> <i class="el-icon-right"></i></a>
        </div>



          <div class="news-banner index-model m-t-10" id="newsBanner" style="width: 890px;box-shadow: 3px 3px 5px lightgrey;">
            <div class="icon-title" style="padding: 20px">
              <a class="link"> 最新情报</a>
            </div>

            <img  style="cursor:pointer;border-radius: 6px;" width="510px" height="330px" :src="newlstThumb" @click="$router.push({name: 'New', params: {key: 'newid', value: newlst[0].id }})">
            <span style="width:510px;height: 40px;border-radius: 6px;position:absolute;padding:10px;left:10px;top:350px;color:white;background-image: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0.9) 100%);">{{ newlstTitle }}</span>

            <img src="../assets/img/shuiyin.png" style="position:absolute;left:350px;top:310px;opacity:0.3;">

        <ul class="img-list mt-10"  style="width: 40%">

                <li class="lier" id="bar1"  v-for="item in newlst" :key="item.id" @click="$router.push({name: 'New', params: {key: 'newid', value: item.id }})">

                  <div class="img"  style="cursor:pointer">
                    <img :src="item.thumb " />
                  </div>
                  <div class="txt-area">
                    <div class="inner-txt" style="cursor:pointer">
                      {{ item.title }}
                    </div>
                    <div class="djs">
                      <div class="djs-line"></div>
                    </div>
                  </div></li>

            </ul>

          </div>
        <div id="newsHot" class="news-hot index-model m-t-10" style="width: 300px;box-shadow: 3px 3px 5px lightgrey;">


        <div class="icon-title" style="padding: 20px">
          <span class="more" @click="sjzixun()">换一批 <img src="../assets/img/u132.png" width="12px"></span>
          热点情报 &nbsp;&nbsp;&nbsp;
<!--            <img src="../assets/ico_hot.gif">-->
          </div>
          <div style="height:350px;overflow:hidden">

              <li  v-for="(item,index) in collect" :key="index.id" class="lier" :class="{'active':xuanzhong==index}"  @click="$router.push({name: 'New', params: {key: 'newid', value: item.id }})" @mouseover="showdiv(index)">

                <span class="time">{{item.addtime.substring(10,65)}}</span>
                <span class="title">{{item.title}}</span>
                <div class="txt">{{item.content.substring(0,65)}}</div>
              </li>


            </div>

          </div>
        </div>



        <div class="content">
            <div class="mediaBanner index-model m-t-10" style="width: 1200px;position:relative;overflow:hidden;border-radius: 4px"><img class="guanggaotu" width="100%" src="../assets/img/advert.png" alt="广告图"></div>
          <div class="rank-wrapper" >
            <div id="rankTable" class="rank-area">
              <div class="rank-bar index-model m-t-10" style="width: 300px;height:980px;box-shadow: 3px 3px 5px lightgrey;">
                <div class="sport-option">
                  <div class="sport">
                    <div sport="football" @click="zujifen" ref="zqjfb" class="option">
                      足球积分榜
                    </div>
                    <div sport="basketball"  @click="lanjifen"  ref="lqjfb" class="option active">
                      篮球积分榜
                    </div>
                  </div>

                </div>
                <div  ref="jfkuang1" class="football active" style="width: 285px;display: none">
                  <el-tabs type="border-card" v-model="activeTab"  @tab-click="changetype" >
                    <el-tab-pane name="英超" label="英超">
                  <el-table
                      :data="tableData4"
                      stripe
                      style="width: 100%;font-size: 12px">

                    <el-table-column
                        prop="position"
                        label="排名"
                        width="40">
                        <template slot-scope="scope">
                            <span v-if="scope.row.position=='1'" style="color:red"><img width="20px" src="../assets/img/icon-302.png"> </span>
                            <span v-else-if="scope.row.position=='2'" style="color:red"><img width="20px" src="../assets/img/icon-303.png"> </span>
                            <span v-else-if="scope.row.position=='3'" style="color:red"><img width="20px" src="../assets/img/icon-304.png"> </span>
                            <span v-else style="color: #606266">{{ scope.row.position }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="team_name"
                        label="球队"
                        width="110">
                        <template slot-scope="scope">
                            <span v-if="scope.row.position=='1'" style="color:#FB6508">{{ scope.row.team_name }}</span>
                            <span v-else-if="scope.row.position=='2'" style="color:#02A7F0">{{ scope.row.team_name }}</span>
                            <span v-else-if="scope.row.position=='3'" style="color:#DC9958">{{ scope.row.team_name }}</span>
                            <span v-else style="color: #606266">{{ scope.row.team_name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="won"
                        label="胜/平/负"
                        width="70">
                        <template slot-scope="scope">
                            <span v-if="scope.row.position=='1'" style="color:#FB6508">{{ scope.row.won }}</span>
                            <span v-else-if="scope.row.position=='2'" style="color:#02A7F0">{{ scope.row.won }}</span>
                            <span v-else-if="scope.row.position=='3'" style="color:#DC9958">{{ scope.row.won }}</span>
                            <span v-else style="color: #606266">{{ scope.row.won }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="points"
                        label="积分"
                        width="52"
                    >
                        <template slot-scope="scope">
                            <span v-if="scope.row.position=='1'" style="color:#FB6508">{{ scope.row.points }}</span>
                            <span v-else-if="scope.row.position=='2'" style="color:#02A7F0">{{ scope.row.points }}</span>
                            <span v-else-if="scope.row.position=='3'" style="color:#DC9958">{{ scope.row.points }}</span>
                            <span v-else style="color: #606266">{{ scope.row.points }}</span>
                        </template>
                    </el-table-column>

                  </el-table>
                    </el-tab-pane>
                    <el-tab-pane name="意甲" label="意甲">
                      <el-table
                          :data="tableData5"
                          stripe
                          style="width: 100%;font-size: 12px">

                        <el-table-column
                            prop="position"
                            label="排名"
                            width="40">
                            <template slot-scope="scope">
                                <span v-if="scope.row.position=='1'" style="color:red"><img width="20px" src="../assets/img/icon-302.png"> </span>
                                <span v-else-if="scope.row.position=='2'" style="color:red"><img width="20px" src="../assets/img/icon-303.png"> </span>
                                <span v-else-if="scope.row.position=='3'" style="color:red"><img width="20px" src="../assets/img/icon-304.png"> </span>
                                <span v-else style="color: #606266">{{ scope.row.position }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="team_name"
                            label="球队"
                            width="110">
                            <template slot-scope="scope">
                                <span v-if="scope.row.position=='1'" style="color:#FB6508">{{ scope.row.team_name }}</span>
                                <span v-else-if="scope.row.position=='2'" style="color:#02A7F0">{{ scope.row.team_name }}</span>
                                <span v-else-if="scope.row.position=='3'" style="color:#DC9958">{{ scope.row.team_name }}</span>
                                <span v-else style="color: #606266">{{ scope.row.team_name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="won"
                            label="胜/平/负"
                            width="70">
                            <template slot-scope="scope">
                                <span v-if="scope.row.position=='1'" style="color:#FB6508">{{ scope.row.won }}</span>
                                <span v-else-if="scope.row.position=='2'" style="color:#02A7F0">{{ scope.row.won }}</span>
                                <span v-else-if="scope.row.position=='3'" style="color:#DC9958">{{ scope.row.won }}</span>
                                <span v-else style="color: #606266">{{ scope.row.won }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column
                            prop="points"
                            label="积分"
                            width="52"
                        >
                            <template slot-scope="scope">
                                <span v-if="scope.row.position=='1'" style="color:#FB6508">{{ scope.row.points }}</span>
                                <span v-else-if="scope.row.position=='2'" style="color:#02A7F0">{{ scope.row.points }}</span>
                                <span v-else-if="scope.row.position=='3'" style="color:#DC9958">{{ scope.row.points }}</span>
                                <span v-else style="color: #606266">{{ scope.row.points }}</span>
                            </template>
                        </el-table-column>

                      </el-table>
                    </el-tab-pane>
                    <el-tab-pane name="西甲" label="西甲">
                      <el-table
                          :data="tableData6"
                          stripe
                          style="width: 100%;font-size: 12px">

                        <el-table-column
                            prop="position"
                            label="排名"
                            width="40">
                            <template slot-scope="scope">
                                <span v-if="scope.row.position=='1'" style="color:red"><img width="20px" src="../assets/img/icon-302.png"> </span>
                                <span v-else-if="scope.row.position=='2'" style="color:red"><img width="20px" src="../assets/img/icon-303.png"> </span>
                                <span v-else-if="scope.row.position=='3'" style="color:red"><img  width="20px" src="../assets/img/icon-304.png"> </span>
                                <span v-else style="color: #606266">{{ scope.row.position }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="team_name"
                            label="球队"
                            width="110">
                            <template slot-scope="scope">
                                <span v-if="scope.row.position=='1'" style="color:#FB6508">{{ scope.row.team_name }}</span>
                                <span v-else-if="scope.row.position=='2'" style="color:#02A7F0">{{ scope.row.team_name }}</span>
                                <span v-else-if="scope.row.position=='3'" style="color:#DC9958">{{ scope.row.team_name }}</span>
                                <span v-else style="color: #606266">{{ scope.row.team_name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="won"
                            label="胜/平/负"
                            width="70">
                            <template slot-scope="scope">
                                <span v-if="scope.row.position=='1'" style="color:#FB6508">{{ scope.row.won }}</span>
                                <span v-else-if="scope.row.position=='2'" style="color:#02A7F0">{{ scope.row.won }}</span>
                                <span v-else-if="scope.row.position=='3'" style="color:#DC9958">{{ scope.row.won }}</span>
                                <span v-else style="color: #606266">{{ scope.row.won }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column
                            prop="points"
                            label="积分"
                            width="52"
                        >
                            <template slot-scope="scope">
                                <span v-if="scope.row.position=='1'" style="color:#FB6508">{{ scope.row.points }}</span>
                                <span v-else-if="scope.row.position=='2'" style="color:#02A7F0">{{ scope.row.points }}</span>
                                <span v-else-if="scope.row.position=='3'" style="color:#DC9958">{{ scope.row.points }}</span>
                                <span v-else style="color: #606266">{{ scope.row.points }}</span>
                            </template>
                        </el-table-column>

                      </el-table>
                    </el-tab-pane>
                    <el-tab-pane name="德甲" label="德甲">
                      <el-table
                          :data="tableData7"
                          stripe
                          style="width: 100%;font-size: 12px">

                        <el-table-column
                            prop="position"
                            label="排名"
                            width="40">
                            <template slot-scope="scope">
                                <span v-if="scope.row.position=='1'" style="color:red"><img width="20px" src="../assets/img/icon-302.png"> </span>
                                <span v-else-if="scope.row.position=='2'" style="color:red"><img width="20px" src="../assets/img/icon-303.png"> </span>
                                <span v-else-if="scope.row.position=='3'" style="color:red"><img width="20px" src="../assets/img/icon-304.png"> </span>
                                <span v-else style="color: #606266">{{ scope.row.position }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="team_name"
                            label="球队"
                            width="110">
                            <template slot-scope="scope">
                                <span v-if="scope.row.position=='1'" style="color:#FB6508">{{ scope.row.team_name }}</span>
                                <span v-else-if="scope.row.position=='2'" style="color:#02A7F0">{{ scope.row.team_name }}</span>
                                <span v-else-if="scope.row.position=='3'" style="color:#DC9958">{{ scope.row.team_name }}</span>
                                <span v-else style="color: #606266">{{ scope.row.team_name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="won"
                            label="胜/平/负"
                            width="70">
                            <template slot-scope="scope">
                                <span v-if="scope.row.position=='1'" style="color:#FB6508">{{ scope.row.won }}</span>
                                <span v-else-if="scope.row.position=='2'" style="color:#02A7F0">{{ scope.row.won }}</span>
                                <span v-else-if="scope.row.position=='3'" style="color:#DC9958">{{ scope.row.won }}</span>
                                <span v-else style="color: #606266">{{ scope.row.won }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column
                            prop="points"
                            label="积分"
                            width="52"
                        >
                            <template slot-scope="scope">
                                <span v-if="scope.row.position=='1'" style="color:#FB6508">{{ scope.row.points }}</span>
                                <span v-else-if="scope.row.position=='2'" style="color:#02A7F0">{{ scope.row.points }}</span>
                                <span v-else-if="scope.row.position=='3'" style="color:#DC9958">{{ scope.row.points }}</span>
                                <span v-else style="color: #606266">{{ scope.row.points }}</span>
                            </template>
                        </el-table-column>

                      </el-table>
                    </el-tab-pane>
                    <el-tab-pane name="法甲" label="法甲">
                      <el-table
                          :data="tableData8"
                          stripe
                          style="width: 100%;font-size: 12px">

                        <el-table-column
                            prop="position"
                            label="排名"
                            width="40">
                            <template slot-scope="scope">
                                <span v-if="scope.row.position=='1'" style="color:red"><img width="20px" src="../assets/img/icon-302.png"> </span>
                                <span v-else-if="scope.row.position=='2'" style="color:red"><img width="20px" src="../assets/img/icon-303.png"> </span>
                                <span v-else-if="scope.row.position=='3'" style="color:red"><img width="20px" src="../assets/img/icon-304.png"> </span>
                                <span v-else style="color: #606266">{{ scope.row.position }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="team_name"
                            label="球队"
                            width="110">
                            <template slot-scope="scope">
                                <span v-if="scope.row.position=='1'" style="color:#FB6508">{{ scope.row.team_name }}</span>
                                <span v-else-if="scope.row.position=='2'" style="color:#02A7F0">{{ scope.row.team_name }}</span>
                                <span v-else-if="scope.row.position=='3'" style="color:#DC9958">{{ scope.row.team_name }}</span>
                                <span v-else style="color: #606266">{{ scope.row.team_name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="won"
                            label="胜/平/负"
                            width="70">
                            <template slot-scope="scope">
                                <span v-if="scope.row.position=='1'" style="color:#FB6508">{{ scope.row.won }}</span>
                                <span v-else-if="scope.row.position=='2'" style="color:#02A7F0">{{ scope.row.won }}</span>
                                <span v-else-if="scope.row.position=='3'" style="color:#DC9958">{{ scope.row.won }}</span>
                                <span v-else style="color: #606266">{{ scope.row.won }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column
                            prop="points"
                            label="积分"
                            width="52"
                        >
                            <template slot-scope="scope">
                                <span v-if="scope.row.position=='1'" style="color:#FB6508">{{ scope.row.points }}</span>
                                <span v-else-if="scope.row.position=='2'" style="color:#02A7F0">{{ scope.row.points }}</span>
                                <span v-else-if="scope.row.position=='3'" style="color:#DC9958">{{ scope.row.points }}</span>
                                <span v-else style="color: #606266">{{ scope.row.points }}</span>
                            </template>
                        </el-table-column>

                      </el-table>
                    </el-tab-pane>
                  </el-tabs>
                </div>
                <div class="basketball active" style="width: 280px" ref="jfkuang2" >
                  <el-tabs type="border-card" >
                    <el-tab-pane label="东部">
                      <el-table
                        :data="tableData"
                        stripe
                        style="width: 100%;font-size: 12px">

                      <el-table-column
                          prop="position"
                          label="名次"
                          width="50">
                          <template slot-scope="scope">
                              <span v-if="scope.row.position=='1'" style="color:red"><img width="20px" src="../assets/img/icon-302.png"> </span>
                              <span v-else-if="scope.row.position=='2'" style="color:red"><img width="20px" src="../assets/img/icon-303.png"> </span>
                              <span v-else-if="scope.row.position=='3'" style="color:red"><img width="20px" src="../assets/img/icon-304.png"> </span>
                              <span v-else style="color: #606266">{{ scope.row.position }}</span>
                          </template>
                      </el-table-column>
                      <el-table-column
                          prop="team_name"
                          label="球队"
                          width="65">
                          <template slot-scope="scope">
                          <span v-if="scope.row.position=='1'" style="color:#FB6508">{{ scope.row.team_name }}</span>
                          <span v-else-if="scope.row.position=='2'" style="color:#02A7F0">{{ scope.row.team_name }}</span>
                          <span v-else-if="scope.row.position=='3'" style="color:#DC9958">{{ scope.row.team_name }}</span>
                          <span v-else style="color: #606266">{{ scope.row.team_name }}</span>
                          </template>
                      </el-table-column>
                      <el-table-column
                          prop="won"
                          label="胜"
                          width="40">
                          <template slot-scope="scope">
                          <span v-if="scope.row.position=='1'" style="color:#FB6508">{{ scope.row.won }}</span>
                          <span v-else-if="scope.row.position=='2'" style="color:#02A7F0">{{ scope.row.won }}</span>
                          <span v-else-if="scope.row.position=='3'" style="color:#DC9958">{{ scope.row.won }}</span>
                          <span v-else style="color: #606266">{{ scope.row.won }}</span>
                          </template>
                      </el-table-column>
                      <el-table-column
                          prop="lost"
                          label="负"
                          width="40">
                          <template slot-scope="scope">
                          <span v-if="scope.row.position=='1'" style="color:#FB6508">{{ scope.row.lost }}</span>
                          <span v-else-if="scope.row.position=='2'" style="color:#02A7F0">{{ scope.row.lost }}</span>
                          <span v-else-if="scope.row.position=='3'" style="color:#DC9958">{{ scope.row.lost }}</span>
                          <span v-else style="color: #606266">{{ scope.row.lost }}</span>
                          </template>
                      </el-table-column>
                      <el-table-column
                          prop="won_rate"
                          label="胜率"
                          width="52"
                      >
                          <template slot-scope="scope">
                          <span v-if="scope.row.position=='1'" style="color:#FB6508">{{ scope.row.won_rate }}</span>
                          <span v-else-if="scope.row.position=='2'" style="color:#02A7F0">{{ scope.row.won_rate }}</span>
                          <span v-else-if="scope.row.position=='3'" style="color:#DC9958">{{ scope.row.won_rate }}</span>
                          <span v-else style="color: #606266">{{ scope.row.won_rate }}</span>
                          </template>
                      </el-table-column>

                    </el-table></el-tab-pane>
                    <el-tab-pane label="西部">    <el-table
                        :data="tableData2"
                        stripe
                        style="width: 100%;font-size: 12px">

                      <el-table-column
                          prop="position"
                          label="名次"
                          width="50">
                          <template slot-scope="scope">
                              <span v-if="scope.row.position=='1'" style="color:red"><img width="20px" src="../assets/img/icon-302.png"> </span>
                              <span v-else-if="scope.row.position=='2'" style="color:red"><img width="20px" src="../assets/img/icon-303.png"> </span>
                              <span v-else-if="scope.row.position=='3'" style="color:red"><img width="20px" src="../assets/img/icon-304.png"> </span>
                              <span v-else style="color: #606266">{{ scope.row.position }}</span>
                          </template>
                      </el-table-column>
                      <el-table-column
                          prop="team_name"
                          label="球队"
                          width="65">
                          <template slot-scope="scope">
                              <span v-if="scope.row.position=='1'" style="color:#FB6508">{{ scope.row.team_name }}</span>
                              <span v-else-if="scope.row.position=='2'" style="color:#02A7F0">{{ scope.row.team_name }}</span>
                              <span v-else-if="scope.row.position=='3'" style="color:#DC9958">{{ scope.row.team_name }}</span>
                              <span v-else style="color: #606266">{{ scope.row.team_name }}</span>
                          </template>
                      </el-table-column>
                      <el-table-column
                          prop="won"
                          label="胜"
                          width="40">
                          <template slot-scope="scope">
                              <span v-if="scope.row.position=='1'" style="color:#FB6508">{{ scope.row.won }}</span>
                              <span v-else-if="scope.row.position=='2'" style="color:#02A7F0">{{ scope.row.won }}</span>
                              <span v-else-if="scope.row.position=='3'" style="color:#DC9958">{{ scope.row.won }}</span>
                              <span v-else style="color: #606266">{{ scope.row.won }}</span>
                          </template>
                      </el-table-column>
                      <el-table-column
                          prop="lost"
                          label="负"
                          width="40">
                          <template slot-scope="scope">
                              <span v-if="scope.row.position=='1'" style="color:#FB6508">{{ scope.row.lost }}</span>
                              <span v-else-if="scope.row.position=='2'" style="color:#02A7F0">{{ scope.row.lost }}</span>
                              <span v-else-if="scope.row.position=='3'" style="color:#DC9958">{{ scope.row.lost }}</span>
                              <span v-else style="color: #606266">{{ scope.row.lost }}</span>
                          </template>
                      </el-table-column>
                      <el-table-column
                          prop="won_rate"
                          label="胜率"
                          width="52"
                      >
                          <template slot-scope="scope">
                              <span v-if="scope.row.position=='1'" style="color:#FB6508">{{ scope.row.won_rate }}</span>
                              <span v-else-if="scope.row.position=='2'" style="color:#02A7F0">{{ scope.row.won_rate }}</span>
                              <span v-else-if="scope.row.position=='3'" style="color:#DC9958">{{ scope.row.won_rate }}</span>
                              <span v-else style="color: #606266">{{ scope.row.won_rate }}</span>
                          </template>
                      </el-table-column>

                    </el-table></el-tab-pane>
                    <el-tab-pane label="CBA">    <el-table
                        :data="tableData3"
                        stripe
                        style="width: 100%;font-size: 12px"
                       >

                      <el-table-column
                          prop="position"
                          label="名次"
                          width="40">
                          <template slot-scope="scope">
                              <span v-if="scope.row.position=='1'" style="color:red"><img width="20px" src="../assets/img/icon-302.png"> </span>
                              <span v-else-if="scope.row.position=='2'" style="color:red"><img width="20px" src="../assets/img/icon-303.png"> </span>
                              <span v-else-if="scope.row.position=='3'" style="color:red"><img width="20px" src="../assets/img/icon-304.png"> </span>
                              <span v-else style="color: #606266">{{ scope.row.position }}</span>
                          </template>
                      </el-table-column>
                      <el-table-column
                          prop="team_name"
                          label="球队"
                          width="110"
                        >
                          <template slot-scope="scope">
                              <span v-if="scope.row.position=='1'" style="color:#FB6508">{{ scope.row.team_name }}</span>
                              <span v-else-if="scope.row.position=='2'" style="color:#02A7F0">{{ scope.row.team_name }}</span>
                              <span v-else-if="scope.row.position=='3'" style="color:#DC9958">{{ scope.row.team_name }}</span>
                              <span v-else style="color: #606266">{{ scope.row.team_name }}</span>
                          </template>
                      </el-table-column>
                      <el-table-column
                          prop="won"
                          label="胜"
                          width="45">
                          <template slot-scope="scope">
                              <span v-if="scope.row.position=='1'" style="color:#FB6508">{{ scope.row.won }}</span>
                              <span v-else-if="scope.row.position=='2'" style="color:#02A7F0">{{ scope.row.won }}</span>
                              <span v-else-if="scope.row.position=='3'" style="color:#DC9958">{{ scope.row.won }}</span>
                              <span v-else style="color: #606266">{{ scope.row.won }}</span>
                          </template>
                      </el-table-column>
                      <el-table-column
                          prop="lost"
                          label="负"
                          width="45">
                          <template slot-scope="scope">
                              <span v-if="scope.row.position=='1'" style="color:#FB6508">{{ scope.row.lost }}</span>
                              <span v-else-if="scope.row.position=='2'" style="color:#02A7F0">{{ scope.row.lost }}</span>
                              <span v-else-if="scope.row.position=='3'" style="color:#DC9958">{{ scope.row.lost }}</span>
                              <span v-else style="color: #606266">{{ scope.row.lost }}</span>
                          </template>
                      </el-table-column>
                      <el-table-column
                          prop="won_rate"
                          label="胜率"
                          width="52"
                      >
                          <template slot-scope="scope">
                              <span v-if="scope.row.position=='1'" style="color:#FB6508">{{ scope.row.won_rate }}</span>
                              <span v-else-if="scope.row.position=='2'" style="color:#02A7F0">{{ scope.row.won_rate }}</span>
                              <span v-else-if="scope.row.position=='3'" style="color:#DC9958">{{ scope.row.won_rate }}</span>
                              <span v-else style="color: #606266">{{ scope.row.won_rate }}</span>
                          </template>
                      </el-table-column>

                    </el-table></el-tab-pane>
                  </el-tabs>

 </div>
              </div>
                <div id="shooter" class="rank-area" style="box-shadow: 3px 3px 5px lightgrey;">
                    <div class="rank-bar m-t-10">
                        <div class="sport-option">
                            <div class="sport">
                                <div sport="football" class="option active" ref="ssbaa" @click="sheshouqh(1)">
                                    足球射手榜
                                </div>
                                <div sport="basketball" class="option" ref="ssbbb" @click="sheshouqh(2)">
                                    篮球得分榜
                                </div>
                            </div>
                            <span   @click="newwindows(9123)" style="cursor:pointer;font-size: 13px;color:#1E90FF">查看更多<i style="float: left" class="el-icon-right"></i></span>
                        </div>
                        <div class="football active" ref="ssbanr">
                            <div class="competition-option">
                                <div class="football-competition">
                                    <div v-for="item in sssbmenu" class="competition" :class="{'active':ssbid === item.sid}"  @click="changessb(item.sid)" >
                                        {{item.name}}
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="basketball" ref="ssbbnr">
                            <div class="competition-option">
                                <div class="competition active"  ref="ssbnba" @click="lqssbsj(1)">
                                    NBA
                                </div>
                                <div class="competition " ref="ssbcba" @click="lqssbsj(2)">
                                    CBA
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="rank-list">
                        <div comp_id="82" class="football active"  ref="zssblb">
                            <div class="competition-rank-table">
                                <div class="integral">
                                    <div class="table-head">
                                        <div class="rank-number">
                                            排名
                                        </div>
                                        <div class="name">
                                            球员
                                        </div>
                                        <div class="result">
                                            比赛
                                        </div>
                                        <div class="match-points">
                                            进球
                                        </div>
                                    </div>
                                    <div class="list ">
                                        <div class="item" v-for="(item,index) in shooterdata" v-if="index<20">
                                            <div class="point"></div>
                                            <div class="rank-number">
                                                <div v-if="index==0"><img width="20px" src="../assets/img/icon-302.png"></div>
                                                <div v-else-if="index==1"><img width="20px" src="../assets/img/icon-303.png"></div>
                                                <div v-else-if="index==2"><img width="20px" src="../assets/img/icon-304.png"></div>
                                                <div v-else> {{index+1}}</div>

                                            </div>
                                            <div class="team-name1">
                                                <div v-if="index==0"><img width="25px" :src="item.playerlogo" class="logo" />
                                                    <span class="name-span" style="color:#FB6508">{{item.playername}}</span></div>
                                                <div v-else-if="index==1"><img width="25px" :src="item.playerlogo" class="logo" />
                                                    <span class="name-span" style="color:#02A7F0">{{item.playername}}</span></div>
                                                <div v-else-if="index==2"><img width="25px" :src="item.playerlogo" class="logo" />
                                                    <span class="name-span" style="color:#DC9958">{{item.playername}}</span></div>
                                                <div v-else><img width="25px" :src="item.playerlogo" class="logo" />
                                                    <span class="name-span">{{item.playername}}</span></div>

                                                <!--<div class="tooltips">-->
                                                <!--<div class="tooltip-arrow"></div>-->
                                                <!--<div class="tooltip-inner">-->
                                                <!--费尔南德斯-->
                                                <!--</div>-->
                                                <!--</div>-->
                                            </div>
                                            <div class="result1">
                                                    <span  v-if="index==0" style="color:#FB6508">{{item.matches}}</span>
                                                    <span  v-else-if="index==1" style="color:#02A7F0">{{item.matches}}</span>
                                                    <span v-else-if="index==2" style="color:#DC9958">{{item.matches}}</span>
                                                    <span  v-else>{{item.matches}}</span>
                                            </div>
                                            <div class="match-points1">
                                                <span  v-if="index==0" style="color:#FB6508">{{item.goals}}</span>
                                                <span  v-else-if="index==1" style="color:#02A7F0">{{item.goals}}</span>
                                                <span v-else-if="index==2" style="color:#DC9958">{{item.goals}}</span>
                                                <span  v-else>{{item.goals}}</span>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!--篮球射手帮开始  -->
                        <div comp_id="1" class="basketball"  ref="lssblb">
                            <div class="competition-rank-table">
                                <div class="integral">
                                    <div class="table-head">
                                        <div class="rank-number">排名</div>
                                        <div class="name">球员</div>
                                        <div class="result">球队</div>
                                        <div class="match-points">得分</div></div>
                                    <div class="list " style="">
                                        <div class="item" v-for="(item,index) in shooterlqdata" v-if="index<20">
                                            <div class="point"></div>
                                            <div class="rank-number"> <div v-if="index==0"><img width="20px" src="../assets/img/icon-302.png"></div>
                                                <div v-else-if="index==1"><img width="20px" src="../assets/img/icon-303.png"></div>
                                                <div v-else-if="index==2"><img width="20px" src="../assets/img/icon-304.png"></div>
                                                <div v-else> {{index+1}}</div></div>
                                            <div class="team-name1">
                                                <a v-if="index==0" target="_blank" >
                                                    <img :src="item.playerlogo"  class="logo">
                                                    <span class="name-span" style="color:#FB6508">{{item.playername}}</span>
                                                    <div class="tooltips">
                                                        <div class="tooltip-arrow"></div>
                                                        <div class="tooltip-inner">{{item.playername}}</div></div>
                                                </a>
                                                <a v-else-if="index==1" target="_blank" >
                                                    <img :src="item.playerlogo"  class="logo">
                                                    <span class="name-span" style="color:#02A7F0">{{item.playername}}</span>
                                                    <div class="tooltips">
                                                        <div class="tooltip-arrow"></div>
                                                        <div class="tooltip-inner">{{item.playername}}</div></div>
                                                </a>
                                                <a v-else-if="index==2" target="_blank" >
                                                    <img :src="item.playerlogo"  class="logo">
                                                    <span class="name-span" style="color:#DC9958">{{item.playername}}</span>
                                                    <div class="tooltips">
                                                        <div class="tooltip-arrow"></div>
                                                        <div class="tooltip-inner">{{item.playername}}</div></div>
                                                </a>
                                                <a v-else target="_blank" >
                                                    <img :src="item.playerlogo"  class="logo">
                                                    <span class="name-span">{{item.playername}}</span>
                                                    <div class="tooltips">
                                                        <div class="tooltip-arrow"></div>
                                                        <div class="tooltip-inner">{{item.playername}}</div></div>
                                                </a>
                                            </div>
                                            <div class="result1">
                                                <img :src="item.teamlogo"  class="logo"></div>
                                            <div class="match-points1">
                                                <span  v-if="index==0" style="color:#FB6508">{{item.points}}</span>
                                                <span  v-else-if="index==1" style="color:#02A7F0">{{item.points}}</span>
                                                <span v-else-if="index==2" style="color:#DC9958">{{item.points}}</span>
                                                <span  v-else>{{item.points}}</span>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>

                        <!--篮球射手榜结束 -->
                    </div>

                </div>
            </div>
          </div>
          <div id="maps" class="match-area">
            <div class="match-bar index-model m-t-10">
              <div class="match-type">
                <span class="jdss">焦点赛事</span>

                <a class="link" @click="zqdynr" @mouseover="zhuanyizhuan" >
                  <img width="16px" src="../assets/img/zuqiuzz.png"  :class="{go:rotate , aa :!rotate}">  足球</a>
                <a class="link" @click="lqdynr"  @mouseover="zhuanyizhuan2">
                  <img width="16px"  src="../assets/img/lanqiuzz.png" :class="{go:rotate2 , aa :!rotate2}"> 篮球</a>
              </div>
              <div class="tags-area">

                <a class="link" ref="zuori" @click="yestoday()">昨日</a> <a @click="chatoday()" ref="jinri" class="link active">即时（{{footjx.length}}）</a><a ref="mingri" @click="tommorow()" class="link">明日</a>

<!--                <a class="btn" :class="{'active':paixu==1}" @click="qiehuan(1)" style="width: 100px;padding:0px">赛事排序</a>-->
<!--                <a class="btn" :class="{'active':paixu==2}" @click="qiehuan(2)" style="width: 100px;padding:0px">时间排序</a>-->
              </div>
            </div>
            <div class="time-px" style="margin-bottom: 100px;box-shadow: 3px 3px 5px lightgrey;">
              <div class="index-model live" style="margin-top: 0">
                <div style="overflow:hidden">

                      <table class="table table-striped" style="width: 100%;font-size: 14px;border-width: 1px;border-style: solid;border-color: rgba(215, 215, 215, 1);border-radius: 6px;">
                          <tr style="border-top-left-radius: 12px; border-top-right-radius: 12px;"><td> </td><td></td><td></td><td></td><td>  <img width="20px" src="@/assets/img/icon-101.png"/><span style="font-weight: bold">进行中的比赛</span></td><td></td><td></td>
                              <td><router-link to="/Football"> <span  style="cursor:pointer;font-size: 13px;color:#1E90FF">查看更多<i style="float: left" class="el-icon-right"></i></span>
                              </router-link></td></tr>
                        <tr  v-for="(item,index) in footjx"  v-if="item.competition_time >todaystart && index<5" :key="item.id" :style="index%2==0?('background-color: rgba(242, 242, 242, 0.776470588235294)'):('background-color: white')">
                          <td><img width="25px" :src="qiutu"></td>
                          <td >{{ item.competition_time | formatDate}}</td>
                          <td style="">{{ item.short_name_zh }}</td>
                          <td style="color:#1E90FF">{{ item.status_text }}</td>
                          <td  style="text-align: right">{{ item.main_name }}<img width="25px" :src="item.main_logo"></td>
                          <td class="showscore">{{ item.main_fraction }} - {{ item.deputy_fraction }}</td>
                          <td @click="$router.push({name: footballevent, query: { event_id: item.id}})" style="font-size: 12px"><img width="25px" :src="item.deputy_logo">{{ item.deputy_name }}</td>

                          <td style="cursor:pointer"><a @click="$router.push({name: linkadd, query: { event_id: item.id}})"><img  src="@/assets/img/icon-202.png" title="视频直播"  alt="视频直播" v-if="item.is_animation == 1 " style="width: 20px" />
                              <img  src="@/assets/img/icon-201.png" v-else style="width: 20px" alt="动画直播" title="动画直播"/></a></td></tr>

                        <tr style="border-top-left-radius: 12px; border-top-right-radius: 12px;"><td> </td><td></td><td></td><td></td><td>  <img width="20px" src="@/assets/img/icon-103.png"/><span style="font-weight: bold">已结束的比赛</span></td><td></td><td></td>
                            <td> <router-link to="/Football"> <span  style="cursor:pointer;font-size: 13px;color:#1E90FF">查看更多<i style="float: left" class="el-icon-right"></i></span>
                            </router-link></td>
                        </tr>
                        <tr  v-for="(item,index) in footjs"  v-if=" index < 5" :key="item.id"  :style="index%2==0?('background-color: rgba(242, 242, 242, 0.776470588235294)'):('background-color: white')">
                          <td><img width="25px" :src="qiutu"></td>
                          <td >{{ item.competition_time | formatDate}}</td>
                          <td style="">{{ item.short_name_zh }}</td>
                          <td style="color:#1E90FF;font-size: 15px">{{ item.status_text }}</td>
                          <td  style="text-align: right">{{ item.main_name }}<img width="25px" :src="item.main_logo"></td>
                          <td  class="showscore" style="color:#7F7F7F">{{ item.main_fraction }} - {{ item.deputy_fraction }}</td>
                          <td style="font-size: 12px;"><img width="25px" :src="item.deputy_logo">{{ item.deputy_name }}</td>

                          <td style="cursor:pointer" @click="$router.push({name: linkadd, query: { event_id: item.id}})"><img  src="@/assets/img/icon-202.png"  title="视频直播"  alt="视频直播" v-if="item.is_animation == 1 " style="width: 20px" />
                              <img  src="@/assets/img/icon-201.png" v-else style="width: 20px" alt="动画直播" title="动画直播"/></td></tr>
                        <tr style="border-top-left-radius: 12px; border-top-right-radius: 12px;"><td> </td><td></td><td></td><td></td><td> <img width="20px" src="@/assets/img/icon-102.png"/><span style="font-weight: bold">未开始的比赛</span></td><td></td><td></td>
                            <td><router-link to="/Football"> <span  style="cursor:pointer;font-size: 13px;color:#1E90FF">查看更多<i style="float: left" class="el-icon-right"></i></span>
                            </router-link></td></tr>
                        <tr  v-for="(item,index) in football" v-if="item.competition_time >todaystart && index<5" :key="item.id"  :style="index%2==0?('background-color: rgba(242, 242, 242, 0.776470588235294)'):('background-color: white')">

                          <td><img width="25px" :src="qiutu"></td>
                          <td >{{ item.competition_time | formatDate}}</td>
                          <td style="">{{ item.short_name_zh }}</td>
                          <td style="color:#1E90FF">{{ item.status_text }}</td>
                          <td  style="text-align: right">{{ item.main_name }}<img width="25px" :src="item.main_logo"></td>
                          <td  class="showscore"  style="color:#212529">  VS   </td>
                          <td @click="$router.push({name: linkadd, params: {key: 'event_id', value: item.id }})" style="font-size: 12px"><img width="25px" :src="item.deputy_logo">{{ item.deputy_name }}</td>


                          <td  style="cursor:pointer"><a @click="$router.push({name: linkadd, params: {key: 'event_id', value: item.id }})">
                              <img  src="@/assets/img/icon-202.png"  alt="视频直播" title="视频直播"  v-if="item.is_animation == 1 " style="width: 20px" />
                              <img  src="@/assets/img/icon-201.png" v-else style="width: 20px" alt="动画直播" title="动画直播"/>
                          </a></td></tr>
                      </table>




                </div>
              </div>
              <!---->
            </div>

          </div>
        </div>

        <div class="my-ysf">
          <span class="iconfont icon-close" onclick="gbYSF()"></span>
        </div>

      <div style="font: 0px/0px sans-serif;clear: both;display: block"> </div>

      </div>


</template>

<script>

import {Collect,Getnewlst,englandtable,italitable,spaintable,francetable,germantable,Getfootball,GetBasketball,bastablex,cbatable,bastabled ,Season,shooterload,shooterlanqiuer} from '@/api'
import footerbar from "@/components/footerbar.vue";
export function today() {

  var date = new Date();
  var nowMonth = date.getMonth() + 1;
  if(nowMonth<10){
    nowMonth='0'+nowMonth;
  }

  var strDate = date.getDate();
  if(strDate<10){
    strDate='0'+strDate;
  }
  return date.getFullYear()+'-'+nowMonth+'-'+strDate;
}

export function ztoday() {

  var date = new Date();
  date.setTime(date.getTime()-24*60*60*1000);
  var nowMonth = date.getMonth() + 1;
  if(nowMonth<10){
    nowMonth='0'+nowMonth;
  }

  var strDate = date.getDate();

  if(strDate<10 ){
    strDate='0'+strDate;
  }
  return date.getFullYear()+'-'+nowMonth+'-'+strDate;
}
export function mtoday() {

  var date = new Date();
  date.setTime(date.getTime()+24*60*60*1000);
  var nowMonth = date.getMonth() + 1;
  if(nowMonth<10){
    nowMonth='0'+nowMonth;
  }

  var strDate = date.getDate();

  if(strDate<10 ){
    strDate='0'+strDate;
  }
  return date.getFullYear()+'-'+nowMonth+'-'+strDate;
}

export default {
  name: "Home",
  components: {
      footerbar,
  },
  data() {
    return {
      showset:true,
      tvactive:0,
      timer: null,
      hoverEnterTime: 1000,
      hoverLeaveTime: 1000,
      curIndex :0,
      player: "",
      zhibo: [],
      checkedZb: {},
      schedule: [],
      football:[],
      footjs:[],
      footjx:[],
      newlst:[],
      collect:[],
      qiutu:'https://soket.daoyunxiang.com/icon/syzqico2.png',
      season:[],
      xuanzhong:0,
      paixu:2,
      qiu:'Football.getfootball',
      djf:[],
      xjf:[],
      tableData:[],
      tableData2:[],
      tableData3:[],
      tableData4:[],
      tableData6:[],
      tableData7:[],
      tableData8:[],
      tableData5:[],
      activeTab:'英超',
      linkadd:'footballevent',
      riqi:today(),
      telphone:'',
      lbact:1,
      timerr:'',
      rotate:false,
      rotate2:false,
      lblei:1,
      todaystart: Math.floor(new Date(new Date().toLocaleDateString()).getTime()/1000),
      ssbid:9688,
      shooterdata:[],
      sssbmenu:[
        {"name":"英超","sid":9688},
        {"name":"意甲","sid":9731},
        {"name":"西甲","sid":9723},
        {"name":"德甲","sid":9647},
        {"name":"法甲","sid":9586},
      ],
      shooterlqdata:[],
      newlstThumb:"",
      newlstTitle:'',
    };
  },
  filters: {
    formatDate: function (value) {
      var value=Number(value+'000');
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

      return  MM + '-' + d + ' ' + h + ':' + m ;
    }
  },
  watch: {
    // checkedZb: {
    //   deep: true,
    //   handler(newV, oldV) {
    //     this.$refs.id_test_video.innerHTML = "";
    //     let bfUrl = "";
    //     if (newV.pull.indexOf("rtmp") != -1) {
    //       bfUrl = newV.pull.replace(/rtmp/, "http");
    //       if (bfUrl.indexOf(".m3u8") == -1) {
    //         bfUrl = bfUrl += ".m3u8";
    //       }
    //     } else {
    //       bfUrl = newV.pull;
    //     }
    //
    //     this.player = new TcPlayer("id_test_video", {
    //       m3u8: bfUrl, // 原画m3u8 播放URL
    //       m3u8_hd: bfUrl, // 高清m3u8 播放URL
    //       m3u8_sd: bfUrl, // 标清m3u8 播放URL
    //       flv: bfUrl, // 原画flv 播放URL
    //       flv_hd: bfUrl, // 高清flv 播放URL
    //       flv_sd: bfUrl, // 标清flv 播放URL
    //       mp4: bfUrl,
    //       mp4_hd: bfUrl,
    //       mp4_sd: bfUrl,
    //       rtmp: bfUrl,
    //       rtmp_hd: bfUrl,
    //       rtmp_sd: bfUrl,
    //       width: "1015",
    //       height: "567",
    //       volume: 0.5, // 设置初始音量
    //       live: true, // 设置视频是否为直播类型，将决定是否渲染时间轴等控件，以及区分点直播的处理逻辑
    //       autoplay: true, // 是否自动播放
    //       coverpic: '', // 预览封面
    //       controls: "default", // default 显示默认控件，none 不显示控件，system 移动端显示系统控件
    //       flash: "true", // 是否优先使用 flash 播放视频，备注：该选项只对PC平台生效
    //       h5_flv: true, // 是否启用 flv.js 的播放 flv
    //       x5_player: true, // 是否启用 TBS 的播放 flv
    //       // x5_type: "h5", // 通过 video 属性 “x5-video-player-type” 声明启用同层H5播放器，支持的值：h5
    //       // x5_fullscreen: true, // 通过 video 属性 “x5-video-player-fullscreen” 声明视频播放时是否进入到 TBS 的全屏模式
    //       // x5_orientation: 1, // 通过 video 属性 “x5-video-orientation” 声明 TBS 播放器支持的方向，可选值：0（landscape 横屏）, 1：（portraint竖屏）, 2：（landscape | portrait跟随手机自动旋转）
    //       wording: {
    //         1: "主播不在家耶~等会再来吧~",
    //         2: "主播不在家耶~等会再来吧~",
    //         3: "主播不在家耶~等会再来吧~",
    //         4: "主播不在家耶~等会再来吧~",
    //         5: "主播不在家耶~等会再来吧~",
    //         10: "主播不在家耶~等会再来吧~",
    //         11: "主播不在家耶~等会再来吧~",
    //         12: "主播不在家耶~等会再来吧~",
    //         13: "主播不在家耶~等会再来吧~",
    //         1001: "主播不在家耶~等会再来吧~",
    //         1002: "主播不在家耶~等会再来吧~",
    //         2032: "主播不在家耶~等会再来吧~",
    //         2048: "主播不在家耶~等会再来吧~",
    //       },
    //       listener: function (msg) {
    //         // 进行事件处理
    //       },
    //     });
    //     this.player.play();
    //   },
    // },
  },
  created() {
    this.getfootballer()
    this.collecter()
    this.seasoner()
    this.getnewlster()
    this.bastableder()
    this.bastablexer()
    this.cbatableer()
    this.shooterloader()
  },
  mounted() {
      this.timerr = setInterval(this.gettt, 5000);

      let bfUrl = 'http://ivi.bupt.edu.cn/hls/xjtv.m3u8'
      this.player = new TcPlayer("id_test_video", {
          m3u8: bfUrl, // 原画m3u8 播放URL
          m3u8_hd: bfUrl, // 高清m3u8 播放URL
          m3u8_sd: bfUrl, // 标清m3u8 播放URL
          flv: bfUrl, // 原画flv 播放URL
          flv_hd: bfUrl, // 高清flv 播放URL
          flv_sd: bfUrl, // 标清flv 播放URL
          mp4: bfUrl,
          mp4_hd: bfUrl,
          mp4_sd: bfUrl,
          rtmp: bfUrl,
          rtmp_hd: bfUrl,
          rtmp_sd: bfUrl,
          width: "990",
          height: "583",
          volume: 0.5, // 设置初始音量
          live: true, // 设置视频是否为直播类型，将决定是否渲染时间轴等控件，以及区分点直播的处理逻辑
          autoplay: true, // 是否自动播放
          coverpic: '', // 预览封面
          controls: "default", // default 显示默认控件，none 不显示控件，system 移动端显示系统控件
          flash: "true", // 是否优先使用 flash 播放视频，备注：该选项只对PC平台生效
          h5_flv: true, // 是否启用 flv.js 的播放 flv
          x5_player: true, // 是否启用 TBS 的播放 flv
          // x5_type: "h5", // 通过 video 属性 “x5-video-player-type” 声明启用同层H5播放器，支持的值：h5
          // x5_fullscreen: true, // 通过 video 属性 “x5-video-player-fullscreen” 声明视频播放时是否进入到 TBS 的全屏模式
          // x5_orientation: 1, // 通过 video 属性 “x5-video-orientation” 声明 TBS 播放器支持的方向，可选值：0（landscape 横屏）, 1：（portraint竖屏）, 2：（landscape | portrait跟随手机自动旋转）
          wording: {
              1: "主播不在家耶~等会再来吧~",
              2: "主播不在家耶~等会再来吧~",
              3: "主播不在家耶~等会再来吧~",
              4: "主播不在家耶~等会再来吧~",
              5: "主播不在家耶~等会再来吧~",
              10: "主播不在家耶~等会再来吧~",
              11: "主播不在家耶~等会再来吧~",
              12: "主播不在家耶~等会再来吧~",
              13: "主播不在家耶~等会再来吧~",
              1001: "主播不在家耶~等会再来吧~",
              1002: "主播不在家耶~等会再来吧~",
              2032: "主播不在家耶~等会再来吧~",
              2048: "主播不在家耶~等会再来吧~",
          },
          listener(msg) {

          },

      });
      // this.player.play();
      // this.timer = setInterval(this.zkcixiang, 5000);
    /* var rmzbswiper = new Swiper(".rmzbswiper", {
        slidesPerView: 8,
        spaceBetween: 0,
        // 如果需要前进后退按钮
        navigation: {
        navigation: {
        nextEl: ".rmzbswipernext",
        prevEl: ".rmzbswiperprev",
        },
    }); */

    // var ssyyswiper = new Swiper(".ssyyswiper", {
    //   slidesPerView: 5,
    //   spaceBetween: 0,
    //   // 如果需要前进后退按钮
    //   navigation: {
    //     nextEl: ".ssyyswipernext",
    //     prevEl: ".ssyyswiperprev",
    //   },
    // });

    this.init();
    this.getLiveListByType();

  },

  methods: {
      lqssbsj(type){
          if(type==1){
              this.$refs.ssbnba.className='competition active'
              this.$refs.ssbcba.className='competition'
              this.ssbid=1057
              this.shooterlanqiu();
          }else{
              this.ssbid=1055
              this.shooterlanqiu();
              this.$refs.ssbcba.className='competition active'
              this.$refs.ssbnba.className='competition'
          }
      },
      sheshouqh(lei){
          if(lei==2){
              this.$refs.ssbaa.className="option";
              this.$refs.ssbbb.className="option active";
              this.$refs.ssbbnr.className="basketball active";
              this.$refs.ssbanr.className="football";
              this.$refs.lssblb.className="basketball active";
              this.$refs.zssblb.className="football";
              this.ssbid=1057
              this.shooterlanqiu();
          }else{
              this.$refs.ssbbb.className="option";
              this.$refs.ssbaa.className="option active";
              this.$refs.ssbbnr.className="basketball";
              this.$refs.ssbanr.className="football active";
              this.$refs.lssblb.className="basketball";
              this.$refs.zssblb.className="football active";
          }
      },
      changessb(ssid){
          this.ssbid=ssid
          this.shooterloader()
      },
      zkcixiang(index) {
          clearTimeout(this.timer)
          this.timer = setTimeout(() => {
              this.lbact=index
          }, this.hoverEnterTime)
      },
      zhuanyizhuan()
      {
          this.rotate = !this.rotate;
      },
      changeicoa(xu)
      {
          if(xu==1){

              this.$refs.foot1ico.src='https://soket.daoyunxiang.com/icon/syzqico2.png';
              this.$refs.zuqiuicokk.style.color='rgb(30, 144, 255)';
              this.$refs.zuqiuicokk.style.backgroundImage="url('https://soket.daoyunxiang.com/beijin.png')";
          }else{
              this.$refs.foot1ico.src='https://soket.daoyunxiang.com/icon/syzqico.png';
              this.$refs.zuqiuicokk.style.color='black';
              this.$refs.zuqiuicokk.style.backgroundImage='';
              this.$refs.zuqiuicokk.style.background='#f7f7f8';
          }
      },

      changeicob(xu)
      {
          if(xu==1){

              this.$refs.basketico.src='https://soket.daoyunxiang.com/icon/sylqico2.png';
              this.$refs.lanqiuicokk.style.color='rgb(30, 144, 255)';
              this.$refs.lanqiuicokk.style.backgroundImage="url('https://soket.daoyunxiang.com/beijin.png')";
          }else{
              this.$refs.basketico.src='https://soket.daoyunxiang.com/icon/sylqico.png';
              this.$refs.lanqiuicokk.style.color='black';
              this.$refs.lanqiuicokk.style.backgroundImage='';
              this.$refs.lanqiuicokk.style.background='#f7f7f8';
          }
      },
      changeicoe(xu){
          if(xu==1){

              this.$refs.wangico.src='https://soket.daoyunxiang.com/icon-303.png';
              this.$refs.wangqiuicokk.style.color='rgb(30, 144, 255)';
              this.$refs.wangqiuicokk.style.backgroundImage="url('https://soket.daoyunxiang.com/beijin.png')";
          }else{
              this.$refs.wangico.src='https://soket.daoyunxiang.com/wangold.png';
              this.$refs.wangqiuicokk.style.color='black';
              this.$refs.wangqiuicokk.style.backgroundImage='';
              this.$refs.wangqiuicokk.style.background='#f7f7f8';
          }
      },
      changeicoc(xu)
      {
          if(xu==1){

              this.$refs.fifaico.src='https://soket.daoyunxiang.com/icon-304.png';
              this.$refs.fifaball.style.color='rgb(30, 144, 255)';
              this.$refs.fifaball.style.backgroundImage="url('https://soket.daoyunxiang.com/beijin.png')";
          }else{
              this.$refs.fifaico.src='https://soket.daoyunxiang.com/icon/fifaold.png';
              this.$refs.fifaball.style.color='black';
              this.$refs.fifaball.style.backgroundImage='';
              this.$refs.fifaball.style.background='#f7f7f8';
          }
      },
      changeicod(xu)
      {
          if(xu==1){

              this.$refs.nbaico.src='https://soket.daoyunxiang.com/icon-305.png';
              this.$refs.nbaball.style.color='rgb(30, 144, 255)';
              this.$refs.nbaball.style.backgroundImage="url('https://soket.daoyunxiang.com/beijin.png')";
          }else{
              this.$refs.nbaico.src='https://soket.daoyunxiang.com/icon/nbaold.png';
              this.$refs.nbaball.style.color='black';
              this.$refs.nbaball.style.backgroundImage='';
              this.$refs.nbaball.style.background='#f7f7f8';
          }
      },
      zhuanyizhuan2()
      {
          this.rotate2 = !this.rotate2;
      },
      gettt() {
          this.lbact ++;
          if(this.lbact>5){
              this.lbact=1
          }
      },
    async getfootballer(){

      let data = {
        "type" : 0,
        "time" : this.riqi,
        "select":"1"
      }
      let res = await Getfootball(data);
      this.football=res.info.not;
      if(res.info.conduct !==undefined && res.info.conduct.length > 0  ){
        this.footjx=res.info.conduct;
      }
      this.footjs=res.info.end;
    },
    async collecter(){

      let res = await Collect();
      this.collect=res;
    },
      async sjzixun()
      {
          let data={
              "rand":1
          }
          let res = await Collect(data);
          this.collect=res;
      },
      async shooterloader(){
        let data={
            "sid":this.ssbid
        }
        let res=await shooterload(data);
        this.shooterdata=res.info;
      },
      async shooterlanqiu(){
          let data={
              "sid":this.ssbid
          }
          let res=await shooterlanqiuer(data);
          this.shooterlqdata=res.info;
      },
    async seasoner(){

      let res = await Season();
      this.season=res;
    },
    async getnewlster(){
      let res = await Getnewlst();

      this.newlst=res;
      if(this.newlst[0].thumb !== null && this.newlst[0].thumb !==undefined){
          this.newlstThumb =  this.newlst[0].thumb
      }
      if(this.newlst[0].title !== null && this.newlst[0].title !==undefined){
        this.newlstTitle =  this.newlst[0].title
      }


    },
    async bastableder(){

      let res = await bastabled();
      this.tableData=res;
    },
    async bastablexer(){

      let res = await bastablex();
      this.tableData2=res;
    },
    async englandtableer(){
      let res = await englandtable();
      this.tableData4=res;
    },
    async italitableer(){
      let res = await italitable();
      this.tableData5=res;
    },
    async spaintableer(){
      let res = await spaintable();
      this.tableData6=res;
    },
    async francetableer(){
      let res = await francetable();
      this.tableData8=res;
    },
    async germantableer(){
      let res = await germantable();
      this.tableData7=res;
    },

    async cbatableer(){

      let res = await cbatable();
      this.tableData3=res;
    },
    async getBasketballer(){
      let jintian=today();
      let data = {
        "type" : 0,
        "time" : this.riqi,
        "select":"1"
      }
      let res = await GetBasketball(data);
      this.football=res.info.not;
      if(res.info.conduct !==undefined && res.info.conduct.length > 0  ){
        this.footjx=res.info.conduct;
      }
      this.footjs=res.info.end;
    },

    qiehuan(xu)
    {
      this.paixu=xu;
      this.footjs.reverse();
    },
      changeMask(type)
      {
          if(type==1){
              this.$refs.erweima.style.display="block"
          }else{
              this.$refs.erweima.style.display="none"
          }

      },
      changefklx(type)
      {
          this.fktype=type
      },

    showdiv(index)
    {
      this.xuanzhong=index;
    },
        handle_success(res)
        {
            this.fkimg=res
        },
      newwindow(sid)
      {
          //$router.push({name: 'comp',params:{key:'match',value:9662}})
          let text= this.$router.resolve({
              path: '/comp',query:{key:'match',value:sid}
          });
          window.open(text.href, '_blank')
      },

      xinchuang(dz)
      {
          let text= this.$router.resolve({
              path: '/'+dz
          });
          window.open(text.href, '_blank')
      },
      newwindows(sid)
      {
          //$router.push({name: 'comp',params:{key:'match',value:9662}})
          let text= this.$router.resolve({
              path: '/comp',query:{key:'lst',value:sid}
          });
          window.open(text.href, '_blank')
      },
    lanjifen()
    {
      this.$refs.jfkuang2.style.display='block';
      this.$refs.jfkuang1.style.display='none';
      this.$refs.lqjfb.className='option active';
      this.$refs.zqjfb.className='option';
    },
    lqdynr()
    {
      this.linkadd='basketballevent';
      this.qiu='Basketball.getbasketball';
      this.qiutu='https://www.easyicon.net/api/resizeApi.php?id=1288733&size=32';
      this.getBasketballer()
    },
    zqdynr()
    {
      this.linkadd='footballevent';
      this.qiutu='https://soket.daoyunxiang.com/icon/syzqico2.png';
      this.qiu='Football.getfootball';

      this.getfootballer()
    },
    yestoday()
    {
      this.$refs.mingri.className='link';
      this.$refs.jinri.className='link';
      this.$refs.zuori.className='link active';
      this.riqi=ztoday();
        this.todaystart=Math.floor(new Date(new Date().toLocaleDateString()).getTime()/1000)-60*60*24
      if(this.qiu!='Football.getfootball'){
        this.getBasketballer()
      }else{
        this.getfootballer()
      }

    },
    chatoday()
    {
      this.$refs.mingri.className='link';
      this.$refs.jinri.className='link active';
      this.$refs.zuori.className='link';
      this.riqi=today();
        this.todaystart=Math.floor(new Date(new Date().toLocaleDateString()).getTime()/1000)
      if(this.qiu!='Football.getfootball'){
        this.getBasketballer()
      }else{
        this.getfootballer()
      }
    },
    tommorow()
    {
      this.$refs.mingri.className='link active';
      this.$refs.jinri.className='link';
      this.$refs.zuori.className='link';
      this.riqi=mtoday();
        //this.todaystart=Math.floor(new Date(new Date().toLocaleDateString()).getTime()/1000)+60*60*24
      if(this.qiu!='Football.getfootball'){
        this.getBasketballer()
      }else{
        this.getfootballer()
      }

    },
    zujifen()
    {
      this.englandtableer();
      this.$refs.jfkuang2.style.display='none';
      this.$refs.jfkuang1.style.display='block';
      this.$refs.zqjfb.className='option active';
      this.$refs.lqjfb.className='option';
    },
    changetype:function (val) {

      let _this = this;
      if(val.name=='意甲'){
        this.italitableer()
      }else if(val.name=='西甲'){
        this.spaintableer()
      }else if(val.name=='德甲'){
        this.germantableer()

      }else if(val.name=='法甲'){
        this.francetableer()

      }else{
        this.englandtableer()

      }
    },


    toliveRoom() {
      this.$router.push({
        name: "liveRoom",
        query: { liveuid: this.checkedZb.uid, stream: this.checkedZb.stream },
      });
      /* if (window.localStorage.getItem("token")) {
      } else {
      this.$emit("denglu");
      } */
    },
    toLive(val) {
      this.$router.push({
        name: "liveRoom",
        query: { liveuid: val.uid, stream: val.stream },
      });
      /* if (window.localStorage.getItem("token")) {
      } else {
      this.$emit("denglu");
      } */
    },
    init() {
      if (window.localStorage.getItem("token")) {
        this.$SERVER.getGamelist(JSON.parse(window.localStorage.getItem("user")).id).then((res) => {
          if (res.data.code == 0) {
            this.schedule = res.data.info;
          }
        });
      } else {
        this.$SERVER.getGamelist().then((res) => {
          if (res.data.code == 0) {
            this.schedule = res.data.info;
          }
        });
      }
    },
    isyuyue(value) {
      if (window.localStorage.getItem("isLogin")) {
        if (value.is_appointment == 1) {
          this.cancelAppoint(value.id);
        } else {
          this.addAppoint(value.id);
        }
      } else {
        this.$emit("denglu");
      }
    },
    addAppoint(game_id) {
      this.$SERVER.addAppoint(game_id,JSON.parse(window.localStorage.getItem("userInfo")).id).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          this.init();
        }
      });
    },
    cancelAppoint(game_id) {
      this.$SERVER.cancelAppoint(game_id,JSON.parse(window.localStorage.getItem("user")).id).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: res.data.msg,
            type: "success",
          });
          this.init();
        }
      });
    },
      datalst(qiu)
      {
          if(qiu==1){
              this.lblei='1'
              this.$refs.lqlbtu.style.display="none"
          }else{
              this.lblei='2'
              this.$refs.zqlbtu.style.display="none"
          }
      },
    tabFn(i) {
      this.zhibo.forEach((item, index) => {
        if (i == index) {
          item.active = true;
          this.checkedZb = item;
        } else {
          item.active = false;
        }
      });
    },
    bannertvchechenge(index){
        // this.$refs.lqlbtu.style.display="none"
        if(index == 0){
            this.tvactive = 0
        }
        if(index == 1){
            this.tvactive = 1
        }
        if(index == 2){
            this.tvactive = 2
        }
        if(index == 3){
            this.tvactive = 3
        }
        if(index == 4){
            this.tvactive = 4
        }if(index == 5){
            this.tvactive = 5
        }

    },
    getLiveListByType() {
      /* let obj = {};
      obj.game_type = "0";
      obj.p = 1; */
      this.$SERVER.getLiveListByType("0", 1).then((res) => {
        if (res.data.code == 0) {
          res.data.info.forEach((item, index) => {
            if (index == 0) {
              item.active = true;
              this.checkedZb = item;
            } else {
              item.active = false;
            }
          });
          this.zhibo = res.data.info.slice(0, 5);
        }
      });
    }
  }
};

</script>


<style scoped src="../style/common-38da6ceed7.css"></style>
<style scoped src="../style/mediaRank-91295ba35e.css"></style>
<style scoped src="../style/bootstrap.min.css"></style>
<style scoped src="../style/match_line-e8d9e18dad.css"></style>
<style scoped src="../style/shooter-e525308f8d.css"></style>
<style scoped src="../style/ranklist-1326711018.css"></style>
<style scoped src="../style/swiper-c45a6278a8.css"></style>
<style scoped src="../style/header-5f69c41c89.css"></style>
<style scoped src="../style/home_new-3f5ecf4c69.css"></style>
<style lang="stylus">
    .showscore{
        font-family: 'Arial Narrow Bold', 'Arial Narrow', 'Arial';
        font-weight: 700;
        font-size: 16px;
        color: #FF7503;
    }
.hotfoot{
    border-radius: 6px;
    border-style: solid;
    border-width: 1px;
    float: left;
    text-align: center;
    padding-top:5px;
    /*margin-left: 10px;*/
    border-color: rgba(215, 215, 215, 1);
    background: white;
    width: 80px;
    height:30px;
    color:black;
    font-size: 14px;
}
.hotactive{
    border-radius: 6px;
    border-width: 1px;
    margin-left: 10px;
    padding-top:5px;
    text-align: center;
    float: left;
    border-style: solid;
    background: linear-gradient(
            180deg
            , rgba(88, 234, 255, 1) 0%, rgba(87, 184, 250, 1) 55%, rgba(43, 153, 233, 1) 100%)
    color:white;
    border-color: rgba(215, 215, 215, 1);
    width: 80px;
    height:30px;
    font-size: 14px;
}

.home {

    margin-top: 72px;
    overflow-x: hidden;
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
.aa {
  transition: all .5s;
}

.go {
  transform: rotate(180deg);
  transition: all .5s;
}
.el-carousel__item h3 {
  color: white;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;

}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
  background-image: url("../assets/lsfile/foot-default-4.png");
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
  background-image: url("../assets/lsfile/foot-default-5.png");
}
.list-style:nth-child(odd)>.lbnotact {
  background-color: #99a9bf;
  background-image: url("https://soket.daoyunxiang.com/bkt-default-2.png");
}

.list-style:nth-child(even)>.lbnotact {
  background-color: #d3dce6;
  background-image: url("https://soket.daoyunxiang.com/bkt-default-5.png");
}
.list-style2:nth-child(odd)>.lbnotact2 {
  background-color: #99a9bf;
  background-image: url("https://soket.daoyunxiang.com/foot-default-1.png");
}

.list-style2:nth-child(even)>.lbnotact2  {
  background-color: #d3dce6;
  background-image: url("https://soket.daoyunxiang.com/foot-default-4.png");
}
.lbnotact:hover {
  /*-webkit-transform: scale(1.15, 1.15);*/
  /*transform: scale(1.15, 1.15);*/
    transition: scale 1.5s;
}
.lbnotact2:hover {
  /*-webkit-transform: scale(1.15, 1.15);*/
  /*transform: scale(1.15, 1.15);*/
    transition: scale 1.5s;
}
.guanggaotu:hover {
    /*-webkit-transform: scale(1.15, 1.15);*/
    /*transform: scale(1.04, 1.04);*/
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
                    background: #89D3FD;
                    border-color: #89D3FD;
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
/*直播首页 ---内容头部*/
    .anchor-home-page-top-wrap {
        position: relative;
        width: 100%;
        height: 720px;
        padding-top: 75px;
        background: url("../assets/bg.jpg");
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
    }
    .block_box{
        width: 1199px;
        height: 617px;
        background: rgb(200, 201, 217);
        position: relative;
        border-radius: 28px 28px 28px 28px;
    }
    .ionbottomleft{
        position: absolute;
        left:0;
        bottom: 0;
        z-index: 5;
    }
    .ionbottomright{
        position: absolute;
        right:0;
        bottom: 0;
        z-index: 5;
    }
    .iontopleft{
        position: absolute;
        top:0;
        left: 0;
        z-index: 5;
    }
    .iontopright{
        position: absolute;
        top:0;
        right: 0;
        z-index: 5;
    }

    .ionbottomleft img,.ionbottomright img,.iontopleft img,.iontopright img{
        width: 165px;
        height: 150px;
    }
    .bannertv_box{
        position: relative;
        z-index: 10;
    }
    .bannertv_box_left{
        position: absolute;
        left: 17px;
        top: 17px;
        width: 990px;
        height: 583px;
        background: url("../assets/img/tv.png");
    }
    .bannertv_box_left{
        float: left;
    }
    .bannertv_box_right{
        float: right;
        margin-top: 17px;
        margin-right: 17px;
        z-index: 10;
    }
    .bannertv_box_right span{
        width: 155px;
        height: 88px;
        display: inline-block;
        background: url("../assets/img/smolltv.png");
        background-size: 100% 100%;
    }
    .bannertv_box_right .margin_top{
        margin-top: 8px;
    }
    .bannertv_box_right span.tvactive{
        border: 3px solid #FACD91;
        position: relative;
    }
    .bannertv_box_right span.tvactive::before {
        content: '';
        display: inline-block;
        width: 8px;
        height: 14px;
        background-image: url("../assets/img/ileft.png");
        background-size: 100% 100%;
        position: absolute;
        left: -11px;
        top: 38px;
    }
    .bannertv_box_right span:hover{
        border: 3px solid #FACD91;
    }

</style>