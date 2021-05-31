<template>
  <div id="zbj">
    <div class="zbjroom">
      <div class="zbjroominner">
        <div class="media">
          <div class="mediatop">
            <div>
              <el-avatar
                size="large"
                :src="anchor.avatar"
                style="width: 60px; height: 60px; margin-right: 12px"
              ></el-avatar>
              <div>
                <h4 style="margin-bottom: 10px">
                  国际友谊 乌兹别克斯坦 - 加纳
                </h4>
                <p>{{ info.title }}</p>
                <p>
                  <span>{{ anchor.user_nicename }}</span>
                  <span>呆萌的小小 房间号:{{ info.liveclassid }}</span>
                  <span>{{ info.room_num }}</span>
                </p>
              </div>
            </div>

            <div class="mediatop_right">
              <div style="overflow: hidden">
                <ul>
                  <li><i></i><span>888</span></li>
                  <li><span> + 关注</span></li>
                  <li><span>立即下载</span></li>
                </ul>
              </div>
              <div>
                <p>
                  <span>举报/投诉</span><span><i></i>分享</span>
                </p>
              </div>
              <!--                            <el-button type="primary" round style="background: #f8c21b; border-color: #f8c21b" v-if="info.is_attention == 0" @click="guanzhu">-->
              <!--                                关注-->
              <!--                            </el-button>-->
              <!--                            <el-button type="primary"  round style="background: #d8d8d8; border-color: #d8d8d8"  v-else  @click="guanzhu">-->
              <!--                                已关注-->
              <!--                            </el-button>-->

              <!--                            <el-popover placement="bottom" width="164" trigger="hover">-->
              <!--                                <div style="text-align: center">-->
              <!--                                    <img src="@/assets/code.png" alt style="height: 120px; width: 120px" />-->
              <!--                                    <p style="font-size: 12px; color: #777">扫一扫</p>-->
              <!--                                    <p style="font-size: 12px; color: #777">手机同步观看直播</p>-->
              <!--                                </div>-->
              <!--                                <i slot="reference" class="el-icon-menu"></i>-->
              <!--                            </el-popover>-->
              <!--                            <el-popover placement="bottom" trigger="hover">-->
              <!--                                <div style="text-align: center; cursor: pointer" @click="jubao">-->
              <!--                                    举报-->
              <!--                                </div>-->
              <!--                                <i slot="reference" class="el-icon-arrow-down"></i>-->
              <!--                            </el-popover>-->
            </div>
          </div>
          <!---视频播放-->
          <div style="position: relative">
            <div id="id_test_video">
              <!--                            <el-switch v-model="dmisShow"  inactive-text="弹幕开关" active-color="#f8c21b" style="position: absolute; top: 4px; right: 10px; z-index: 999">-->
              <!--                            </el-switch>-->
              <!--                            <div class="swiper-container livingRoomBox" v-show="notHome">-->
              <!--                                <div class="swiper-wrapper">-->
              <!--                                    <div class="swiper-slide" v-for="(item, i) in zhibo" :key="i" @click="toLive(item)">-->
              <!--                                        <div>-->
              <!--                                            <img :src="item.thumb" alt class="hotcontentimg" />-->
              <!--                                            <span class="com" v-show="item.isrecommend == '1'">-->
              <!--                                                <i>推荐</i>-->
              <!--                                            </span>-->
              <!--                                            <i class="btn-open"></i>-->
              <!--                                            <h5 class="bottom-title">-->
              <!--                                                <span class="name">{{ item.user_nicename }}</span>-->
              <!--                                                <span class="num">-->
              <!--                                                    <img src="@/assets/icon-hot-white.png" alt="热度" />-->
              <!--                                                    <span>{{ item.online }}</span>-->
              <!--                                                </span>-->
              <!--                                            </h5>-->
              <!--                                        </div>-->
              <!--                                        <h4 class="ellipsis">{{ item.game_title }}</h4>-->
              <!--                                    </div>-->
              <!--                                </div>-->
              <!--                            </div>-->
              <!--                            -->
              <!--                            &lt;!&ndash; @click.stop="set" &ndash;&gt;-->
              <div class="bofangshezhi" v-show="showset">
                <!--                                <van-icon  class="id_test_video_cen" name="play-circle-o" color="#f8c21b" v-if="!showBoFang" @click.stop="bofang" />-->
                <!--                                <div class="id_test_video_btm">-->
                <!--                                    <div>{{ info.room_num }}</div>-->
                <!--                                    <div>-->
                <!--                                        <van-icon  name="comment-o" :color="showBarrage ? '#f8c21b' : '#fff'" @click.stop="showBarrage = !showBarrage"/>-->
                <!--                                        <van-icon name="pause-circle-o" v-if="showBoFang" @click.stop="zanting" />-->
                <!--                                        <van-icon name="play-circle-o" v-else @click.stop="bofang" />-->
                <!--                                        <van-icon name="scan" @click.stop="quanping" />-->
                <!--                                    </div>-->
                <!--                                </div>-->
              </div>
            </div>
            <!--                        <v-barrage :arr="arr" :isPause="isPause" v-if="dmisShow" :percent="50"></v-barrage>-->
          </div>
          <!-- justify-content: space-between; -->
          <div class="mediabtm">
            <div style="display: flex; width: 100%">
              <img src="@/assets/liveNoble/balance.png" />
              <div>
                <div style="display: flex">
                  <img
                    src="@/assets/left-arrow.png"
                    style="height: 48px; margin-right: 10px;cursor: pointer;"
                    @click="leftArrow"
                  />
                  <div class="time-week-main" style="display: flex">
                    <div
                      v-for="(item, index) in giftData"
                      class="gift-main"
                      :key="index"
                    >
                      <!-- {{}} -->
                      <el-popover placement="top" trigger="hover" popper-class="gift-popover" @hide="clearGiftNum">
                        <div class="gift-main-popover" >
                          <div style="display: flex">
                            <img :src="item.icon" style="width: 111px;" />
                            <div>
                              <p style="font-size: 16px">
                                {{ item.name }}
                                <span style="color: #dbb16f; font-size: 13px"
                                  >({{ item.price }} 钻石)</span
                                >
                              </p>
                              <p style="color: #9193b4; font-size: 13px">
                                {{ item.description }}
                              </p>
                            </div>
                          </div>
                          <div style="display: flex; margin: 2px 20px 10px 20px">
                            <div @click="getGiftNum(88, item)" style="cursor: pointer;color: #9193b4; font-size: 13px; width: 44px; height: 22px; line-height: 22px; text-align: center;border: 1px solid #e6eaf3;margin-right: 10px;">
                              88
                            </div>
                            <div @click="getGiftNum(100, item)" style="cursor: pointer;color: #9193b4; font-size: 13px; width: 44px; height: 22px; line-height: 22px; text-align: center;border: 1px solid #e6eaf3;margin-right: 10px;">
                              100
                            </div>
                            <div @click="getGiftNum(520, item)" style="cursor: pointer;color: #9193b4; font-size: 13px; width: 44px; height: 22px; line-height: 22px; text-align: center;border: 1px solid #e6eaf3;margin-right: 10px;">
                              520
                            </div> <div @click="getGiftNum(666, item)" style="cursor: pointer;color: #9193b4; font-size: 13px; width: 44px; height: 22px; line-height: 22px; text-align: center;border: 1px solid #e6eaf3;margin-right: 10px;">
                              666
                            </div> <div @click="getGiftNum(1314, item)" style="cursor: pointer;color: #9193b4; font-size: 13px; width: 44px; height: 22px; line-height: 22px; text-align: center;border: 1px solid #e6eaf3;margin-right: 10px;">
                              1314
                            </div>
                          </div>
                          <div style=" background: #ebf0fb; height: 44px; display: flex; line-height: 44px; ">
                            <img
                              src="@/assets/liveNoble/balance.png"
                              width="19px"
                              height="22px"
                              style="margin: 9px 6px 0 16px"
                            />
                            <p>共需要{{ allMoney }}钻石</p>
                            <el-input
                              style="width: 66px; margin: 0 10px 0 44px"
                              @change="getGiftNum(giftNum, item)"
                              v-model="giftNum"
                              size="mini"
                            ></el-input>
                            <div
                            @click="zengsong(item)"
                              style="width: 50px;height: 26px;line-height: 26px;border-radius: 4px;margin-top: 9px;text-align: center;font-size: 13px;
                                background: linear-gradient(90deg,#eccbab,#dbb16f 100%);">
                              赠送
                            </div>
                          </div>

                          <!-- <ul style="display: flex; justify-content: space-between;width: 330px; flex-wrap: wrap">
                                                  <li data-id="grinning" v-for="item in levellist" :key="item" @click="addemoji(item)">
                                                      <div :style="{ background: `${item.color}`}" style="width: 30px; height: 30px;line-height: 30px;text-align: center; border-radius: 50%;font-size: 11px;color: #fff;">{{ item.name }} </div>
                                                  </li>
                                              </ul> -->
                        </div>
                        <img :src="item.icon" slot="reference" class="gift-main-item"/>
                      </el-popover>
                      <!-- <img :src="item.icon" /> -->
                      <!-- <div :class="currentDate.time === item.time ? 'current-date' : ''">

                                      <div class="time">{{ item.time }}</div>
                                      <div class="lable">{{ item.label}}</div>
                                      </div> -->
                    </div>
                  </div>
                  <img
                    src="@/assets/right-arrow.png"
                    style="height: 48px;cursor: pointer;"
                    @click="rightArrow"
                  />
                </div>
                <div style="display: flex;justify-content: flex-end;color:#333333; font-size: 13px;">
                  <img src="@/assets/liveNoble/balance.png" width="19px" height="20px" style="margin-top:4px; margin-right: 6px" />
                  <p style="line-height: 34px">我的钻石：998</p>
                  <div class="czhi" @click="goRecharge">充值</div>
                  <div class="beibao">背包</div>
                </div>
              </div>
            </div>
            <!-- <div><p>{{ coin }}</p><p>我的金币</p></div>
                        <div>
                            <div class="gift">
                                <el-popover placement="top" trigger="hover" v-for="item in giftlist" :key="item.id">
                                    <div class="gifthover">
                                        <img :src="item.gifticon" />
                                        <div>
                                            <p>{{ item.giftname }}</p>
                                            <p>{{ item.needcoin }}金币</p>
                                        </div>
                                        <el-button type="primary" style="background: #f8c21b; border-color: #f8c21b" size="mini" @click="zengsong(item)">
                                            赠送
                                        </el-button>
                                    </div>
                                    <img class="liwu" slot="reference" :src="item.gifticon" />
                                </el-popover>
                            </div>
                            <div>
                                <el-popover placement="bottom" width="412" trigger="hover">
                                    <div class="getjinbi">
                                        <div class="title">如何获得金币？</div>
                                        <div class="conlist">
                                            <img src="@/assets/img/score-tip1.png" alt />
                                                <div>
                                                    <p>登录获得金币</p>
                                                    <p>每日登录可获得金币，连续登录天数越长，金币越多</p>
                                                </div>
                                        </div>
                                        <div class="conlist">
                                            <img src="@/assets/img/score-tip2.png" alt />
                                            <div>
                                                <p>观看直播获得金币</p>
                                                <p>每观看十分钟直播，可以获得5点金币</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div slot="reference">
                                        <p class="whatgetjinbi">如何领取金币?</p>
                                    </div>
                                </el-popover>
                            </div>
                        </div> -->
          </div>
        </div>
        <div class="chat">
          <div class="notice">
            <div>公告:</div>
            <marquee scrollamount="5">
              <a href="#">我是公告11111</a>
              <a href="#">我是公告22222</a>
            </marquee>
          </div>
          <div class="contribution">
            <div class="contribution-tab">
              <div
                class="contribution-tab-item"
                @click="changeContribution('day')"
              >
                <span
                  :class="
                    currentContribution == 'day' ? 'currentContribution' : ''
                  "
                  >贡献日榜</span
                >
              </div>
              <div
                class="contribution-tab-item"
                @click="changeContribution('week')"
              >
                <span
                  :class="
                    currentContribution == 'week' ? 'currentContribution' : ''
                  "
                  >贡献周榜</span
                >
              </div>
            </div>
          </div>
          <div class="contribution-info">
            <div class="contribution-2">
              <div class="contribution-bg-2">
                <img src="@/assets/ranking-2.png" class="ranking-2" />
                <img src="@/assets/level-20.png" class="ranking-2-header" />
              </div>
              <p class="contribution-name">石榴姐</p>
              <p></p>
              <p class="contribution-text">
                <span style="color: #dbb16f">1508</span>贡献值
              </p>
            </div>
            <div class="contribution-1">
              <div class="contribution-bg-1">
                <img src="@/assets/ranking-1.png" class="ranking-1" />
                <img src="@/assets/level-40.png" class="ranking-1-header" />
              </div>
              <p class="contribution-name">石榴姐</p>
              <p></p>
              <p class="contribution-text">
                <span style="color: #dbb16f">1508</span>贡献值
              </p>
            </div>
            <div class="contribution-3">
              <div class="contribution-bg-3">
                <img src="@/assets/ranking-3.png" class="ranking-3" />
                <img src="@/assets/level-40.png" class="ranking-3-header" />
              </div>
              <p class="contribution-name">石榴姐</p>
              <p></p>
              <p class="contribution-text">
                <span style="color: #dbb16f">1508</span>贡献值
              </p>
            </div>
            <div class="contribution-drop-down">
              <div v-for="(item, index) in contributionStartFour" :key="index" class="contribution-drop-down-item">
                <div style="display: flex; width: 250px">
                  <div class="drop-down-index">{{ index + 4 }} </div>
                  <p class="name">{{ item.name }}</p>
                </div>
                <p class="text"><span style="color: #DBB16F"> {{ item.num }}</span>贡献值</p>
              </div>
            </div>
          </div>
          <!-- <el-tabs v-model="activeName">
                        <el-tab-pane label="聊天室" name="0"> -->
          <div class="scoller chatroom">
            <img src="@/assets/chat-new.png" class="chat-new" />
            <div
              style="margin-bottom: 8px; font-size: 14px"
              v-for="(item, i) in xiaoxilist"
              :key="i"
            >
              <van-image
                width="18px"
                height="18px"
                fit="contain"
                :src="sysnotic2"
                v-if="item._method_ == 'SystemNot'"
              />
              <van-image
                width="18px"
                height="18px"
                fit="contain"
                :src="hi"
                v-if="item.msgtype == '0' && item._method_ == 'SendMsg'"
              />
              <van-image
                width="18px"
                height="18px"
                fit="contain"
                :src="gifticon"
                v-if="item._method_ == 'SendGift'"
              />
              <span
                class="xitongxiaoxi"
                v-if="item._method_ == 'SystemNot'"
                style="margin-left: 5px; font-weight: bold"
              >
                系统消息
              </span>
              <el-tag
                type="danger"
                size="mini"
                style="margin-left: 5px"
                v-if="iszb == '1'"
                >主播</el-tag
              >
              <el-tag
                type="info"
                size="mini"
                style="margin-left: 5px"
                v-if="item._method_ == 'SendMsg' || item._method_ == 'SendGift'"
              >
                Lv.{{ item.level ? item.level : item.ct.level }}
              </el-tag>

              <span
                style="margin-left: 5px; color: red"
                v-if="item._method_ == 'SendMsg' || item._method_ == 'SendGift'"
                @click="userInfoBtn(item)"
              >
                {{ item.ct.user_nicename }}
              </span>
              <span
                style="margin-left: 5px; color: red"
                v-if="item._method_ == 'SendMsg' || item._method_ == 'SendGift'"
              >
                {{ item.uname }}
              </span>
              <span v-if="item._method_ == 'SendGift'" style="margin-left: 5px"
                >赠送给主播</span
              >
              <span
                v-if="item._method_ == 'SendGift'"
                style="margin-left: 5px; color: red"
              >
                {{ item.ct.giftname }} X {{ item.ct.giftcount }}
              </span>
              <span
                v-if="item._method_ == 'SystemNot'"
                style="line-height: 26px; margin-left: 5px"
                >{{ item.ct }}</span
              >
              <span
                v-if="item.msgtype == '0' && item._method_ == 'SendMsg'"
                style="margin-left: 5px"
                >进入直播间</span
              >
              <span
                v-if="item.msgtype == '2' && item._method_ == 'SendMsg'"
                style="margin-left: 5px"
                >{{ item.ct }}</span
              >
            </div>
            <div class="bounced" v-if="isShowBounced">
              <img src="@/assets/level-40.png" width="50" style="margin-left: 99px"/>
              <img src="@/assets/close.png" width="10" class="close-icon" @click="isShowBounced = false"/>
              <div class="user-info">
                带上草帽就是王<div class="user0info-lv">LV 88</div>
                <div class="bounced-btn-msg" v-if="setUserType">
                  <div v-if="setUserType == '1'"><p>确定设置 带上草帽就是王 为本直播间房管？</p></div>
                  <div v-if="setUserType == '2'"><p>确定提出房间？</p></div>
                  <div v-if="setUserType == '3'">
                    <p>禁言设置时间</p>
                    <select autofocus class="select-time">
                      <option value="1">1小时</option>
                      <option value="2">2小时</option>
                      <option value="3">3小时</option>
                      <option value="4">4小时</option>
                    </select>
                  </div>
                  <div class="msg-btn">
                    <div @click="msgBtnOk()">确定</div>
                    <div @click="msgBtnNo()">取消</div>
                  </div>
                </div>
              </div>
              <div class="bounced-btn">
                <div @click="getSetUser('1')">设为房管</div>
                <div @click="getSetUser('2')">踢出房间</div>
                <div @click="getSetUser('3')">禁言</div>
              </div>
            </div>
          </div>
          <div class="giftdonghua" v-if="showgiftdonghua">
            <p>{{ giftdonghuainfo.user_nicename }}</p>
            <p>赠送主播礼物</p>
            <van-image
              width="80px"
              height="80px"
              style="position: absolute; top: -30%; right: -30px"
              fit="cover"
              :src="giftdonghuainfo.url"
            />
          </div>
          <!-- </el-tab-pane> -->
          <!-- <el-tab-pane label="排行榜" name="1">
                            <ul class="rankinglist scoller">
                                <li v-for="(item, i) in phblist" :key="item.fromid">
                                    <div>
                                        <span>{{ i + 1 }}</span>
                                        <el-avatar size="medium" :src="item.user.avatar"></el-avatar>
                                            <span>{{ item.user.user_nicename }}</span>
                                        <el-tag type="info" effect="dark" size="mini">Lv.{{ item.user.level }}</el-tag>
                                    </div>
                                    <span style="font-size: 12px; color: #8f8f8f">贡献 {{ item.total }}</span>
                                </li>
                            </ul>
                        </el-tab-pane>                    -->
          <!-- </el-tabs> -->
          <div style="padding: 5px 0">
            <div style="padding: 0 10px; display: flex; align-items: center">
              <el-popover placement="top" trigger="hover">
                <div>
                  <ul style="display: flex; width: 330px; flex-wrap: wrap">
                    <li
                      data-id="grinning"
                      style="font-size: 24px"
                      v-for="item in emojilist"
                      :key="item"
                      @click="addemoji(item)"
                    >
                      {{ item }}
                    </li>
                  </ul>
                </div>
                <img
                  slot="reference"
                  src="@/assets/chat-1.png"
                  style="
                    width: 20px;
                    width: 20px;
                    margin-right: 14px;
                    cursor: pointer;
                  "
                />
                <!-- <img slot="reference"  src="@/assets/img/xiao.png" alt style="width: 20px; width: 20px; margin-right: 14px; cursor: pointer;" /> -->
              </el-popover>
              <!-- <img src="@/assets/chat-1.png" style="width: 20px; width: 20px; margin-right: 14px; cursor: pointer;"/> -->
              <el-popover placement="top" trigger="hover">
                <div>
                  <ul
                    style="
                      display: flex;
                      justify-content: space-between;
                      width: 330px;
                      flex-wrap: wrap;
                    "
                  >
                    <li
                      data-id="grinning"
                      v-for="item in levellist"
                      :key="item"
                      @click="addemoji(item)"
                    >
                      <div
                        :style="{ background: `${item.color}` }"
                        style="
                          width: 30px;
                          height: 30px;
                          line-height: 30px;
                          text-align: center;
                          border-radius: 50%;
                          font-size: 11px;
                          color: #fff;
                        "
                      >
                        {{ item.name }}
                      </div>
                    </li>
                  </ul>
                </div>
                <img
                  src="@/assets/chat-2.png"
                  slot="reference"
                  style="
                    width: 20px;
                    width: 20px;
                    margin-right: 14px;
                    cursor: pointer;
                  "
                />
              </el-popover>
              <el-popover placement="top" trigger="hover" width="50px">
                <p style="font-size: 12px">贵族</p>
                <img
                  src="@/assets/chat-3.png"
                  @click="showLiveNoble"
                  slot="reference"
                  style="
                    width: 20px;
                    width: 20px;
                    margin-right: 14px;
                    cursor: pointer;
                  "
                />
              </el-popover>

              <img
                src="@/assets/chat-4.png"
                style="
                  width: 20px;
                  width: 20px;
                  margin-right: 14px;
                  cursor: pointer;
                "
              />
              <el-popover
                placement="top"
                trigger="hover"
              >
                <p style="font-size: 12px">清空聊天</p>
                <img
                  src="@/assets/chat-5.png"
                  slot="reference"
                  style="
                    width: 20px;
                    width: 20px;
                    margin-right: 100px;
                    cursor: pointer;
                  "
                />
              </el-popover>
              <el-popover
                placement="top"
                trigger="hover"
              >
                <div class="shielding-box">屏蔽消息设置</div>
                  <el-checkbox :label="city" style="margin-right: 14px; cursor: pointer">屏蔽贵族特效</el-checkbox>
                  <el-checkbox :label="city" style="margin-right: 14px; cursor: pointer">屏蔽礼物特效</el-checkbox>
                  <el-checkbox :label="city" style="margin-right: 14px; cursor: pointer">屏蔽入场消息</el-checkbox>
                <el-checkbox
                  :label="city"
                  slot="reference"
                  style="margin-right: 14px; cursor: pointer"
                  >屏蔽消息</el-checkbox
                >
              </el-popover>
              <!-- <el-popover placement="top" trigger="hover">
                                <div class="pingbigift">
                                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll"  @change="handleCheckAllChange">
                                        全部屏蔽
                                    </el-checkbox>
                                    <el-checkbox-group  v-model="checkedCities" @change="handleCheckedCitiesChange">
                                        <el-checkbox  v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                                <i slot="reference" class="el-icon-view" style="font-size: 22px"></i>
                            </el-popover> -->
            </div>
            <div
              style="
                display: flex;
                align-items: center;
                padding: 0 10px;
                height: 60px;
              "
            >
              <el-input
                placeholder="请输入内容"
                type="textarea"
                rows="2"
                resize="none"
                v-model="sendContent"
              ></el-input>
              <el-button
                type="primary"
                style="
                  height: 54px;
                  border-radius: 0;
                  background: #f8c21b;
                  border-color: #f8c21b;
                "
                @click="sendXiaoXi(null)"
              >
                发送
              </el-button>
            </div>
          </div>
        </div>
      </div>
      </div>
      <liveylist />
    <liveNoble ref="livenoble" />
    <fullMoney :rechargeShow="rechargeShow" @closeRecharge="closeRecharge"/>
  </div>
</template>

<script>
import VBarrage from "@/components/VBarrage/index.vue"; //弹幕
import liveNoble from "./liveNoble";
import fullMoney from '../fullMoney'
import { getGiftList, enterRoom, sendGift, liveDetail, msgList, enterChat } from "@/api";
import Liveylist from './liveylist.vue';
const cityOptions = ["屏蔽贵族特效","屏蔽礼物特效", "屏蔽入场消息"];
export default {
  name: "zbj",
  components: { VBarrage, liveNoble, Liveylist, fullMoney },
  data() {
    return {
      uid: "",
      iszb: "0",
      sysnotic2: require("../../assets/img/sys-notic2.png"),
      hi: require("../../assets/img/hi.png"),
      gifticon: require("../../assets/img/gift.png"),
      dmisShow: true,
      activeName: "0",
      checkAll: false,
      checkedCities: [],
      cities: cityOptions,
      isIndeterminate: true,
      emojilist: [
        "😀",
        "😁",
        "😃",
        "😄",
        "😅",
        "😆",
        "😇",
        "😉",
        "😊",
        "🙂",
        "😋",
        "😍",
        "😘",
        "😗",
        "😙",
        "😚",
        "😜",
        "😝",
        "😛",
        "😎",
        "🙄",
        "😳",
        "😡",
        "😕",
        "😫",
        "😤",
        "😨",
        "😥",
        "😪",
        "😓",
        "😵",
        "😲",
        "🤧",
        "😷",
        "🤒",
        "🤕",
        "😴",
        "💤",
        "👏",
        "🤙",
        "👍",
        "👎",
        "👊",
        "✊",
        "✌",
        "👌",
        "✋",
        "🤚",
        "💪",
        "🤝",
        "👈",
        "👉",
        "🖕",
        "🖐",
        "👄",
        "👂",
        "👀",
        "🎅",
        "🌞",
        "🌙",
        "⭐",
        "⚡",
        "🔥",
        "❄️",
        "⚽",
        "🏀",
        "🏈",
        "⚾",
        "🎁",
        "🎉",
        "✒️",
        "📝",
        "❤️",
        "💛",
        "💚",
        "🆚",
        "💬",
        "🕐",
      ],
      zhibo: [],
      info: {},
      anchor: {},
      arr: [],
      isPause: false,
      isJs: false,
      direction: "top",
      sendContent: "",
      player: "",
      showset: true,
      showBarrage: true,
      showBoFang: true,
      giftlist: [],
      checkedGift: {},
      phblist: [],
      coin: 0,
      showgiftdonghua: false,
      giftdonghuainfo: {},
      xiaoxilist: [
        {
          _method_: "SendMsg",
          uname: "lllll紧急",
          level: 2,
          ct: {
            user_nicename: "张三",
            giftname: "hjkfdg",
          },
          msgtype: 1,
        },
      ],
      anchorSchedulelist: [],
      yinliang: 60,
      fulldanmu: "",
      MAX_DM_COUNT: 6,
      CHANNEL_COUNT: 10,
      domPool: [],
      danmuPool: [],
      hasPosition: [],
      isFull: false,
      timer: "",
      notHome: false,
      currentContribution: "day",
      levellist: [
        {
          name: "免费",
          color: "#DBB16F",
        },
        {
          name: "骑士",
          color: "#9193B4",
        },
        {
          name: "子爵",
          color: "#47CC6C",
        },
        {
          name: "侯爵",
          color: "#5C8DFF",
        },
        {
          name: "公爵",
          color: "#A051EB",
        },
        {
          name: "皇帝",
          color: "#FFB71C",
        },
      ],
      getGiftListData: [],
      giftData: [],
      clickNum: 0,
      contributionStartFour: [{
        name: '上帝之手上帝之手上帝之手',
        num: '1234'
      },{
        name: '上帝之手22',
        num: '1234'
      },{
        name: '上帝之手33',
        num: '1234'
      },{
        name: '上帝之手0564689',
        num: '1234'
      },{
        name: '上帝之手0564689',
        num: '1234'
      },{
        name: '上帝之手0564689',
        num: '1234'
      },{
        name: '上帝之手0564689',
        num: '1234'
      }],
      isShowBounced: false,
      setUserType: '',
      songNum: '',
      giftNum: '',
      allMoney: 0,
      city: '',
      liveDetailInfo: {},
      msgListData: [],
      chatINfo: '',
      rechargeShow: false
    };
  },

  mounted() {
    let _this = this;
    let bfUrl = "http://ivi.bupt.edu.cn/hls/xjtv.m3u8";
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
      width: "1200",
      height: "676",
      volume: 0.6, // 设置初始音量
      live: true, // 设置视频是否为直播类型，将决定是否渲染时间轴等控件，以及区分点直播的处理逻辑
      autoplay: true, // 是否自动播放
      coverpic: { style: "cover", src: "" }, // 预览封面，可以传入一个图片地址或者一个包含图片地址 src 和显示样式 style 的对象。
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
        if (msg.type == "error") {
          document.getElementsByClassName(
            "vcp-controls-panel"
          )[0].style.display = "none";
          _this.notHome = true;
        } else {
          document.getElementsByClassName(
            "vcp-controls-panel"
          )[0].style.display = "block";
          _this.notHome = false;
        }
        if (msg.type == "fullscreen") {
          if (msg.detail.isFullscreen) {
            _this.isFull = true;
            // 全屏
            let fatherdom = document.getElementsByClassName(
              "vcp-controls-panel"
            )[0];
            let fatherdom2 = document.getElementsByClassName("vcp-player")[0];
            var dom = document.createElement("div");
            dom.className = "fullBox";
            if (_this.dmisShow) {
              dom.innerHTML = `
                                    <input type="text" class="danmuvalue" placeholder="发送弹幕(最多40个字)">
                                    <div class="danmuIcon show"></div>
                                    <button class="sendDanMu">发送</button>
                                    `;
            } else {
              dom.innerHTML = `
                                    <input type="text" class="danmuvalue" placeholder="发送弹幕(最多40个字)">
                                    <div class="danmuIcon hide"></div>
                                    <button class="sendDanMu">发送</button>
                                    `;
            }
            fatherdom.appendChild(dom);
            document.getElementsByClassName("danmuIcon")[0].addEventListener(
              "click",
              () => {
                if (_this.dmisShow) {
                  _this.dmisShow = false;
                  document
                    .getElementsByClassName("danmuIcon")[0]
                    .classList.add("hide");
                  document
                    .getElementsByClassName("danmuIcon")[0]
                    .classList.remove("show");
                } else {
                  _this.dmisShow = true;
                  document
                    .getElementsByClassName("danmuIcon")[0]
                    .classList.add("show");
                  document
                    .getElementsByClassName("danmuIcon")[0]
                    .classList.remove("hide");
                }
              },
              false
            );
            document.getElementsByClassName("sendDanMu")[0].addEventListener(
              "click",
              () => {
                let value = document.getElementsByClassName("danmuvalue")[0]
                  .value;
                if (value) {
                  _this.sendXiaoXi(value);
                }
              },
              false
            );

            var dom2 = document.createElement("div");
            dom2.className = "fulldanmuBox";
            fatherdom2.appendChild(dom2);
            _this.initdammu();
            // 每隔1ms从弹幕池里获取弹幕（如果有的话）并发射
            _this.timer = setInterval(() => {
              let channel;
              if (
                _this.danmuPool.length &&
                (channel = _this.getChannel()) != -1
              ) {
                if (_this.dmisShow) {
                  let dom = _this.domPool[channel].shift();
                  let danmu = _this.danmuPool.shift();
                  _this.shootDanmu(dom, danmu, channel);
                }
              }
            }, 1);
          } else {
            // 非全屏
            _this.isFull = false;
            var my = document.getElementsByClassName("fullBox")[0];
            my.parentNode.removeChild(my);
            var my2 = document.getElementsByClassName("fulldanmuBox")[0];
            my2.parentNode.removeChild(my2);
            clearInterval(_this.timer);
          }
        }
      },
    });
  },

  created() {
    this.goLiveDetail()
    this.getGiftListParams();
    // setTimeout(() => {
      this.goChatINfo()
      this.enterRoomQuery()
      this.msgListDataQuery()
    // }, 1000);
  },
  methods: {
    goRecharge() {
      console.log('234567876543')
      this.rechargeShow = true
    },
    closeRecharge() {
      this.rechargeShow = false
    },
    goLiveDetail() {
      const query = this.$route.query
      const params = {
        uid: JSON.parse(window.localStorage.getItem("user")).id,
        token: window.localStorage.getItem("token"),
        live_uid: query.liveuid,
        stream: query.stream,
        source: 'pc'
      }
      liveDetail(params).then(res => {
        this.liveDetailInfo = res.info
      })
    },
    goChatINfo() {
      const params = {
        uid: JSON.parse(window.localStorage.getItem("user")).id,
        nick_name: JSON.parse(window.localStorage.getItem("user")).nick_name,
        id: this.liveDetailInfo.game_id,
        source: 'pc',
        token: window.localStorage.getItem("token")
      }
      enterChat(params).then(res => {
        this.chatINfo = res.info
        console.log(res, 'res============')
      })
    },
    toLive(val) {
      let routeData = this.$router.resolve({
        name: "liveRoom",
        query: { liveuid: val.uid, stream: val.stream },
      });
      window.open(routeData.href, "_blank");
    },

    handleScroll() {
      // 获取滚动时的高度
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 648) {
        console.log(scrollTop);
        let video = document.getElementsByTagName("video")[0];
        console.log(video);
        video.requestPictureInPicture();
        // var dom = document.createElement("video");
        // dom.id = "video";
        // fatherdom.appendChild(dom);
        // document.getElementById("video").requestPictureInPicture();
      }
    },

    initdammu() {
      let _this = this;
      let wrapper = document.getElementsByClassName("fulldanmuBox")[0];
      // 先new一些span 重复利用这些DOM
      for (let j = 0; j < _this.CHANNEL_COUNT; j++) {
        let doms = [];
        for (let i = 0; i < _this.MAX_DM_COUNT; i++) {
          // 要全部放进wrapper
          let dom = document.createElement("span");
          wrapper.appendChild(dom);
          // 初始化dom的位置 通过设置className
          dom.className = "right";
          // DOM的通道是固定的 所以设置好top就不需要再改变了
          dom.style.top = j * 20 + "px";
          // 放入改通道的DOM池
          doms.push(dom);
          // 每次到transition结束的时候 就是弹幕划出屏幕了 将DOM位置重置 再放回DOM池
          dom.addEventListener("transitionend", () => {
            dom.className = "right";
            // dom.style.transition = null;
            // dom.style.left = null;
            dom.style.transform = null;
            if (_this.dmisShow) {
              _this.domPool[j].push(dom);
            }
          });
        }

        if (_this.dmisShow) {
          _this.domPool.push(doms);
        }
      }
      // hasPosition 标记每个通道目前是否有位置
      for (let i = 0; i < _this.CHANNEL_COUNT; i++) {
        _this.hasPosition[i] = true;
      }
    },

    shootDanmu(dom, text, channel) {
      let _this = this;
      console.log("biu~ [" + text + "]");
      dom.innerText = text;
      // 如果为每个弹幕设置 transition 可以保证每个弹幕的速度相同 这里没有保证速度相同
      // dom.style.transition = `transform ${7 + dom.clientWidth / 100}s linear`;

      // dom.style.left = '-' + dom.clientWidth + 'px';
      // 设置弹幕的位置信息 性能优化 left -> transform
      dom.style.transform = `translateX(${-dom.clientWidth}px)`;
      dom.className = "left";

      _this.hasPosition[channel] = false;
      // 弹幕全部显示之后 才能开始下一条弹幕
      // 大概 dom.clientWidth * 10 的时间 该条弹幕就从右边全部划出到可见区域 再加1秒保证弹幕之间距离
      setTimeout(() => {
        _this.hasPosition[channel] = true;
      }, dom.clientWidth * 10 + 1000);
    },

    getChannel() {
      let _this = this;
      for (let i = 0; i < _this.CHANNEL_COUNT; i++) {
        if (_this.hasPosition[i] && _this.domPool[i].length) return i;
      }
      return -1;
    },

    getLiveListByType() {
      this.$SERVER.getLiveListByType("0", 1).then((res) => {
        if (res.data.code == 0) {
          this.zhibo = res.data.info;
          var livingRoomBox = new Swiper(".livingRoomBox", {
            slidesPerView: 3,
            spaceBetween: 0,
          });
        }
      });
    },

    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    addemoji(val) {
      this.sendContent += val;
    },

    // 发送弹幕
    sendXiaoXi(val) {
      if (window.localStorage.getItem("token")) {
        let broadcastObj = {};
        broadcastObj.msg = [];
        let obj = {};
        obj._method_ = "SendMsg";
        obj.msgtype = "2";
        if (val) {
          obj.ct = val;
        } else {
          obj.ct = this.sendContent;
        }
        obj.uname = JSON.parse(
          window.localStorage.getItem("user")
        ).user_nicename;
        obj.uid = JSON.parse(window.localStorage.getItem("user")).id;
        obj.action = "0";
        obj.level = JSON.parse(window.localStorage.getItem("user")).level;
        broadcastObj.msg.push(obj);
        broadcastObj.token = window.localStorage.getItem("token");
        this.$socket.emit("broadcast", broadcastObj);
        if (val) {
          document.getElementsByClassName("danmuvalue")[0].value = "";
        }
      } else {
        this.$emit("denglu");
      }
    },

    // 发送弹幕
    sendBarrage(msg, uid) {
      if (window.localStorage.getItem("token")) {
        if (JSON.parse(window.localStorage.getItem("userInfo")).id == uid) {
          if (this.arr.length > 1 && msg) {
            this.arr.unshift({
              content: msg,
              direction: this.direction,
              isSelf: true,
              style: {
                color: "#00ff08",
                fontSize: "25px",
              },
              isJs: this.isJs,
            });
          } else {
            this.arr.push({
              content: msg,
              direction: this.direction,
              isSelf: true,
              style: {
                color: "#00ff08",
              },
              isJs: this.isJs,
            });
          }
        } else {
          if (msg && typeof msg == "string") {
            this.arr.push({
              direction: "default",
              content: msg,
            });
          }
        }
      }

      this.sendContent = "";
    },

    bofang() {
      this.player.play();
      this.showBoFang = true;
    },

    zanting() {
      this.player.pause();
      this.showBoFang = false;
    },

    quanping() {
      this.player.fullscreen(true);
    },

    set() {
      this.showset = !this.showset;
      this.showBoFang = true;
    },

    tabFn(val, i) {
      this.checkedGift = val;
      this.giftlist.forEach((item, index) => {
        if (i == index) {
          item.active = true;
        } else {
          item.active = false;
        }
      });
    },

    guanzhu() {
      if (window.localStorage.getItem("token")) {
        this.$SERVER
          .setAttent(
            JSON.parse(window.localStorage.getItem("user")).id,
            window.localStorage.getItem("token"),
            this.info.uid
          )
          .then((res) => {
            if (res.data.code == 0) {
              this.$SERVER
                .liveDetail(
                  this.$route.query.liveuid,
                  this.$route.query.stream,
                  JSON.parse(window.localStorage.getItem("user")).id,
                  window.localStorage.getItem("token")
                )
                .then((res) => {
                  if (res.data.code == 0) {
                    this.info = res.data.info;
                    this.anchor = res.data.info.anchor;
                    this.showlive = true;
                  } else {
                    this.showlive = false;
                  }
                });
              if (res.data.info[0].isattent == "1") {
                this.$message({
                  message: "成功关注主播",
                  type: "success",
                });
              } else {
                this.$message.error("取消关注");
              }
            }
          });
      } else {
        this.$emit("denglu");
      }
    },
    getCoin() {
      if (window.localStorage.getItem("token")) {
        this.$SERVER
          .getCoin(
            JSON.parse(window.localStorage.getItem("user")).id,
            window.localStorage.getItem("token")
          )
          .then((res) => {
            if (res.data.code == 0) {
              this.coin = parseInt(res.data.info.coin);
            }
          });
      }
    },
    clearGiftNum() {
      this.allMoney = 0
       this.giftNum = ''
    },
    getGiftNum(val, item) {
      console.log(val, 'item---')
      this.giftNum = val
      this.allMoney = this.giftNum * item.price
    },
    zengsong(value) {
      this.allMoney = this.giftNum * value.price
      if (window.localStorage.getItem("token")) {
        this.allMoney = this.songNum
        if (value.name) {
          if (this.coin < parseInt(this.allMoney)) {
            this.$message.error("余额不足");
          } else {
            const query = this.$route.query
            const params = {
              uid: JSON.parse(window.localStorage.getItem("user")).id,
              token: window.localStorage.getItem("token"),
              live_uid: query.liveuid,
              stream: query.stream,
              gift_id: value.id,
              count: this.giftNum,
              ispack: value.type,
              source: 'pc',
              showid: this.liveDetailInfo.showid
            }
            sendGift(params).then((res) => {
                if (res.code == 0) {
                  // 发送礼物
                  let broadcastObj = {};
                  broadcastObj.msg = [];
                  let obj = {};
                  obj._method_ = "SendGift";
                  obj.uhead = JSON.parse(
                    window.localStorage.getItem("user")
                  ).avatar;
                  obj.uname = JSON.parse(
                    window.localStorage.getItem("user")
                  ).user_nicename;
                  obj.msgtype = "2";
                  obj.level = JSON.parse(
                    window.localStorage.getItem("user")
                  ).level;
                  obj.ct = res.data.info[0].gifttoken;
                  broadcastObj.msg.push(obj);
                  this.$socket.emit("broadcast", broadcastObj);
                  this.getCoin();
                } else {
                  this.$message.error(res.msg);
                }
              });
          }
        } else {
          this.$message.error("请先选择礼物");
        }
      } else {
        this.$emit("denglu");
      }
    },

    tozbj(val) {
      let routeData = this.$router.resolve({
        name: "liveRoom",
        query: { liveuid: val.uid, stream: val.stream },
      });
      window.open(routeData.href, "_blank");
    },

    jubao() {
      if (window.localStorage.getItem("token")) {
        this.$message({
          message: "举报成功",
          type: "success",
        });
      } else {
        this.$emit("denglu");
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
      this.$SERVER
        .addAppoint(game_id, JSON.parse(window.localStorage.getItem("user")).id)
        .then((res) => {
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
      this.$SERVER
        .cancelAppoint(
          game_id,
          JSON.parse(window.localStorage.getItem("user")).id
        )
        .then((res) => {
          if (res.data.code == 0) {
            this.$message({
              message: res.data.msg,
              type: "success",
            });
            this.init();
          }
        });
    },
    changeContribution(val) {
      this.currentContribution = val;
    },
    getGiftListParams() {
      const params = {
        source: "pc",
      };
      getGiftList(params).then((res) => {
        this.giftData = []
        this.getGiftListData = res.info;
        this.giftData= res.info.slice(0,9) })
        console.log(this.giftData, 'ppppppppp')
    },
    leftArrow() {
      if (this.clickNum == 0) {
        return;
      }
      this.giftData = [];
      this.clickNum = this.clickNum - 1;
      const val = this.clickNum * 8;
      const end = val + 8;
      for (var i = val; i < end; i++) {
        this.giftData.push(this.getGiftListData[i]);
      }
    },
    rightArrow() {
      if (this.clickNum >= Number(this.getGiftListData.length / 8) - 1) {
        return;
      }
      this.giftData = [];
      this.clickNum = this.clickNum + 1;
      const val = this.clickNum * 8;
      const end =
        val + 8 > this.getGiftListData.length
          ? this.getGiftListData.length
          : val + 8;
      for (var i = val; i < end; i++) {
        this.giftData.push(this.getGiftListData[i]);
      }
    },
    // 显示贵族弹框
    showLiveNoble() {
      this.$refs.livenoble.showDialog();
    },
    // 进入主播间
    enterRoomQuery() {
      const query = this.$route.query
      const params = {
        source: "pc",
        uid: JSON.parse(window.localStorage.getItem("user")).id,
        token: window.localStorage.getItem("token"),
        live_uid: query.liveuid,
        stream: query.stream,
        // showid: this.liveDetailInfo.showid
        showid: '1622391045'
      };
      enterRoom(params).then((res) => {
        this.getGiftListData = res.info;
        for (var i = 0; i < 8; i++) {
          this.giftData.push(this.getGiftListData[i]);
        }
      })
    },
    // 点击名称显示弹框
    userInfoBtn(item) {
      this.isShowBounced = true
    },
    // getSetUser   
    getSetUser(val) {
      this.setUserType = val
    },
    // 确定
    msgBtnOk() {
      this.setUserType = ''
    },
    // 取消
    msgBtnNo() {
      this.setUserType = ''
    },
    // msgListData 
    msgListDataQuery() {
      const params = {
        id: this.liveDetailInfo.game_id,
        source: 'pc'
      }
      msgList(params).then(res => {
        console.log(res)
      })
    }
  },
  destroyed() {
    document.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style lang="stylus">
.pingbigift {
  .el-checkbox {
    display: block;
  }
}

.getjinbi {
  color: #333;

  .title {
    margin-left: 5px;
    margin-bottom: 26px;
    font-size: 18px;
    font-weight: 600;
  }

  .conlist {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    img {
      width: 50px;
      margin-right: 10px;
    }

    p:first-child {
      font-size: 14px;
      font-weight: 600;
      color: #000;
      margin-bottom: 4px;
    }

    p:last-child {
      font-size: 12px;
      color: #777;
    }
  }
}

.gifthover {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 190px;

  img {
    width: 56px;
  }
}

#zbj {
  .ssyyswipernext.swiper-button-disabled, .ssyyswiperprev.swiper-button-disabled {
    display: none;
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
              // vertical-align: middle;
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

  #id_test_video {
    position: relative;

    .livingRoomBox {
      position: absolute;
      bottom: 0px;
      z-index: 999;
      padding: 0 10px;
      width: 100%;

      .swiper-slide {
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

      .swiper-slide:hover .btn-open {
        opacity: 1;
        transform: scale(1);
      }
    }

    .fulldanmuBox {
      color: #fff;
      position: absolute;
      top: 15px;
      left: 0;
      height: 30%;
      width: 100%;
      overflow: hidden;
      font-size: 16px;
      text-shadow: 1px 1px #000;

      .right {
        position: absolute;
        visibility: hidden;
        white-space: nowrap; /* left: 700px; */
        transform: translateX(1300px);
      }

      .left {
        position: absolute;
        white-space: nowrap;
        user-select: none;
        transition: transform 7s linear; /* 时间相同 越长的弹幕滑动距离越长 所以越快~ */
      }
    }

    .fullBox {
      height: 100%;
      display: flex;
      align-items: center;
      position: relative;
      z-index: 1001;

      >input {
        width: 30%;
        height: 60%;
        border-radius: 25px;
        padding: 0 15px;
        margin-right: 10px;
      }

      .danmuIcon {
        width: 24px;
        height: 24px;
        cursor: pointer;
        margin-right: 10px;
      }

      .danmuIcon.show {
        background: url('~@/assets/icon-danmu-on.png') center center no-repeat;
        background-size: 100% auto;
      }

      .danmuIcon.show:hover {
        background: url('~@/assets/icon-danmu-on-over.png') center center no-repeat;
        background-size: 100% auto;
      }

      .danmuIcon.hide {
        background: url('~@/assets/icon-danmu-close.png') center center no-repeat;
        background-size: 100% auto;
      }

      .danmuIcon.hide:hover {
        background: url('~@/assets/icon-danmu-close-over.png') center center no-repeat;
        background-size: 100% auto;
      }

      >button {
        border-radius: 25px;
        height: 60%;
        padding: 0 15px;
        background: #e6a23c;
        color: #fff;
        cursor: pointer;
      }
    }

    .el-switch__label {
      color: #fff;
    }

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
        font-size: 130px;
        cursor: pointer;
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
        padding: 0 32px;

        > div {
          color: #fff;

          i {
            font-size: 24px;
            margin: 0 10px;
          }
        }

        > div:first-child {
          font-size: 18px;
          font-weight: 700;
          background: url('~@/assets/fire.png') no-repeat left center;
          background-size: contain;
          padding-left: 30px;
        }
      }
    }
  }

  .zbjroom {
    .zbjroominner {
      margin: 0 auto;
      display: flex;
      padding: 10px 0;
      justify-content: center;

      >div {
        background: #fff;
        border-radius: 4px;
      }

      .media {
        width: 1200px;

        .mediatop {
          padding: 20px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          >div:first-child {
            display: flex;
            align-items: center;

            >span {
              background: url('../../assets/img/footballheade.svg');
            }

            p:first-child {
              font-size: 18px;
              font-weight: 600;
              margin-bottom: 10px;
            }

            p:last-child {
              font-size: 14px;

              span:nth-child(2) {
                color: #777;
                margin: 0 20px;
              }

              span:nth-child(3) {
                background: url('~@/assets/icon-hot-gray.png') no-repeat 0 center;
                padding-left: 15px;
                background-size: 14px auto;
                color: #777;
              }
            }
          }

          >div:last-child {
            /* display: flex; */
            align-items: center;

            i {
              cursor: pointer;
            }

            .el-icon-menu {
              margin: 0 32px;
              font-size: 30px;
            }

            .el-icon-arrow-down {
              font-size: 30px;
            }
          }

          .mediatop_right >div:nth-child(1) ul li {
            width: 80px;
            height: 30px;
            float: left;
            vertical-align: center;
            line-height: 30px;
            text-align: center;
            font-size: 14px;
            margin-bottom: 15px;
          }

          .mediatop_right >div:nth-child(1) ul li:nth-child(1) {
            background-color: rgba(242, 242, 242, 1);
            color: #333333;
          }

          .mediatop_right >div:nth-child(1) ul li:nth-child(2) {
            background: linear-gradient(90deg, rgba(237, 205, 176, 1) 0%, rgba(218, 175, 107, 1) 97%);
            color: #FFFFFF;
          }

          .mediatop_right >div:nth-child(1) ul li:nth-child(3) {
            background-color: rgba(252, 112, 61, 1);
            color: #FFFFFF;
          }

          .mediatop_right >div:nth-child(2) {
            text-align: right;

            >p >span {
              margin-left: 20px;
              display: inline-block;
            }
          }
        }

        .vjs-control-bar {
          display: block;
          display: flex;
        }

        .mediabtm {
          display: flex;
          height: 98px;
          .czhi {
            width: 54px;
            line-height: 20px;
            text-align: center;
            height: 20px;
            opacity: 1;
            background: linear-gradient(90deg,#f27a2e, #f15b43 100%);
            border-radius: 2px;
            margin-left: 30px;
            margin-top: 7px;
            cursor: pointer;
          }
          .beibao {
            width: 54px;
            height: 20px;
            text-align: center;
            line-height: 20px;
            margin-top: 7px;
            opacity: 1;
            background: #748aff;
            border-radius: 2px;
            margin-left: 10px;
            cursor: pointer;
          }
          >div:first-child {
            width: 200px;
            padding: 20px 20px;
            border-right: 1px solid #d8d8d8;

            p:first-child {
              font-size: 24px;
              margin-bottom: 5px;
            }

            p:last-child {
              font-size: 12px;
            }
          }

          >div:last-child {
            display: flex;
            align-items: center;
            padding: 9px 16px 3px;
            width: 77%;
            justify-content: space-between;

            .gift {
              width: 80%;
              overflow-x: scroll;
              white-space: nowrap;
              overflow-y: hidden;
              overflow-x: scroll;

              .liwu {
                width: 44px;
                height: 44px;
                margin: 0 10px;
              }
            }

            .whatgetjinbi {
              color: #777;
              cursor: pointer;
              font-size: 14px;
            }

            .whatgetjinbi:hover {
              color: #f8c21b;
            }
          }

          .gift-main {
            .gift-main-item {
              border: 1px solid #E6EAF3;
              width: 48px;
              cursor: pointer;
              margin-right: 10px;
            }
          }
        }
      }

      .chat {
        .popper-main {
          min-width: 50px !important;
        }

        width: 350px;
        margin-left: 20px;

        .notice {
          padding: 14px;
          color: #FF5D5D;
          display: flex;

          div {
            width: 50px;
          }

          a {
            color: #FF5D5D;
            margin-right: 40px;
          }
        }

        .contribution {
          height: 46px;
          line-height: 46px;
          background: #EBF0FB;
          color: #8D94AF;

          .contribution-tab {
            display: flex;
            justify-content: space-around;

            .contribution-tab-item {
              .currentContribution {
                color: #333333;
                font-weight: 800;
              }
            }
          }
        }

        .contribution-info {
          cursor: pointer;
          border: 1px solid #E6EAF3;
          display: flex;
          justify-content: space-around;
          position: relative;
          height: 145px;
          div {
            width: 63px;
          }
          .contribution-drop-down {
            z-index: 999;
            position: absolute;
            bottom: -225px;
            width: 350px;
            height: 226px;
            background: #ffffff;
            border: 1px solid #e6eaf3;
            box-shadow: 0px 6px 12px 0px rgba(219,177,111,0.30)
            display: none;
            .contribution-drop-down-item {
              height: 28px;
              width: 100%;
              line-height: 28px;
              font-size: 14px;
              display: flex;
              justify-content: space-between;
              margin-bottom: 4px;
              .drop-down-index {
                width: 16px;
                height: 16px;
                background: #ebf0fb;
                border-radius: 50%;
                color: #76809C;
                font-size: 13px;
                line-height: 16px;
                margin: 6px 15px;
                text-align: center;
              }
              .name {
              }
              .text {
                font-size: 12px;
                color: #E6EAF3;
                margin-right: 16px;
              }
            }
          }
          .contribution-2 {
            .contribution-bg-2 {
              margin-left: 8px;
              margin-top: 47px;
              height: 48px;
              width: 48px;
              position: relative;
              background: url('../../assets/ranking-img-2.png');
              background-size: 100% 100%;

              .ranking-2 {
                position: absolute;
                top: -12px;
                left: 10px;
              }

              .ranking-2-header {
                width: 44px;
                margin-top: 2px;
                margin-left: 2px;
              }
            }

            .contribution-name {
              font-size: 14px;
              line-height: 20px;
              text-align: center;
            }

            .contribution-text {
              font-size: 12px;
              line-height: 20px;
              text-align: center;
              color: #E6EAF3;
            }
          }

          .contribution-1 {
            .contribution-bg-1 {
              margin-left: 1px;
              margin-top: 35px;
              height: 60px;
              width: 60px;
              position: relative;
              background: url('../../assets/ranking-img-1.png');
              background-size: 100% 100%;

              .ranking-1 {
                position: absolute;
                top: -21px;
                left: 10px;
              }

              .ranking-1-header {
                width: 56px;
                margin-top: 2px;
                margin-left: 2.05px;
              }
            }

            .contribution-name {
              font-size: 14px;
              line-height: 20px;
              text-align: center;
            }

            .contribution-text {
              font-size: 12px;
              line-height: 20px;
              text-align: center;
              color: #E6EAF3;
            }
          }

          .contribution-3 {
            .contribution-bg-3 {
              margin-left: 8px;
              margin-top: 47px;
              height: 48px;
              width: 48px;
              position: relative;
              background: url('../../assets/ranking-img-3.png');
              background-size: 100% 100%;

              .ranking-3 {
                position: absolute;
                top: -12px;
                left: 10px;
              }

              .ranking-3-header {
                width: 44px;
                margin-top: 2px;
                margin-left: 2px;
              }
            }

            .contribution-name {
              font-size: 14px;
              line-height: 20px;
              text-align: center;
            }

            .contribution-text {
              font-size: 12px;
              line-height: 20px;
              text-align: center;
              color: #E6EAF3;
            }
          }
        }
        .contribution-info:hover .contribution-drop-down {
          display: block;
        }
        .el-tabs__nav-scroll {
          display: flex;
          justify-content: center;
        }

        .el-tabs__item.is-active {
          font-weight: bold;
          color: #000;
        }

        .el-tabs__item:hover {
          color: #000;
        }

        .el-tabs__active-bar {
          background-color: #ffb600;
        }

        .scoller {
          height: 515px;
          overflow-y: overlay;
          position: relative;
          .bounced {
            position: absolute;
            top: 180px;
            left: 20px;
            background: #fff !important;
            border: 1px solid #e6eaf3;
            box-shadow: 0px 6px 12px 0px rgba(219,177,111,0.30); 
            padding: 10px 30px;
            width: 310px;
            z-indecx: 999;
            .close-icon {
              position: absolute;
              cursor: pointer;
              top: 8px;
              right: 8px;
            }
            .user-info {
              font-size: 14px;
              color: #6E7CA0;
              display: flex;
              margin-top: 20px;
              margin-bottom: 20px;
              justify-content: center;
              position: relative;
              .user0info-lv {
                margin-left: 10px;
                color: #9193B4;
              }
              .bounced-btn-msg {
                width: 260px;
                position: absolute;
                top: -65px;
                left: -5px
                background: #fff;
                border: 1px solid #e6eaf3;
                box-shadow: 0px 6px 12px 0px rgba(219,177,111,0.30); 
                padding: 10px;
                text-align: center;
                .select-time {
                  width: 100px;
                  border: 1px solid #e6eaf3;
                  margin-top: 10px;
                  margin-bottom: 5px;
                }
                .msg-btn {
                  display: flex;
                  justify-content: space-around;
                  margin: 10px 30px 0;
                  div {
                    width: 40px;
                    height: 30px;
                    line-height: 30px;
                    border: 1px solid #E6EAF3;
                    cursor: pointer;
                  }
                  div:hover {
                    background: linear-gradient(90deg,#eccbab, #dbb16f 100%);
                    color: #fff;
                  }
                }
              }
            }
            .bounced-btn {
              display: flex;
              height: 30px;
              line-height: 30px;
              font-size: 14px;
              border: 1px solid #E6EAF3;
              border-right: 0;
              div {
                width: 103px;
                text-align: center;
                border-right: 1px solid #E6EAF3;
                cursor: pointer;
              }
              div:hover {
                background: linear-gradient(90deg,#eccbab, #dbb16f 100%);
                color: #fff;
              }
            }
          }
        }

        .rankinglist {
          li {
            height: 60px;
            padding: 0 14px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            >div {
              display: flex;
              align-items: center;

              span:nth-child(1) {
                // background: #c76e0e;
                // border-radius: 50%;
                width: 16px;
                height: 16px;
                text-align: center;
                line-height: 16px;
                font-size: 14px;
                font-weight: bold;
                // color: #fff;
              }

              .el-avatar {
                margin: 0 5px 0 13px;
              }

              span:nth-child(3) {
                font-size: 14px;
                margin-right: 10px;
              }
            }
          }
        }

        .scoller::-webkit-scrollbar {
          display: none; /* Chrome Safari */
        }

        .chatroom {
          border: 1px solid #E6EAF3;
          border-top: 0;
          background: #fff;
          padding: 5px 14px;
          position: relative;

          .chat-new {
            position: absolute;
            bottom: 70px;
            left: 90px;
          }

          >div:nth-child(2n-1) {
            background: #ededed;
          }

          .van-image {
            vertical-align: middle;
          }
        }

        .giftdonghua {
          position: absolute;
          left: 0;
          width: 50%;
          height: 50px;
          background: rgba(0, 0, 0, 0.5);
          top: 43%;
          border-radius: 0 50px 50px 0;
          z-index: 999;
          color: #fff;
          padding: 0 32px;
          font-size: 14px;

          p {
            line-height: 25px;
          }

          p:first-child {
            color: #f8c21b;
            font-weight: bold;
            font-size: 18px;
          }
        }

        .el-textarea__inner {
          border-radius: 0;
        }
      }
    }
  }
}
.shielding-box {
  background: linear-gradient(90deg,#eccbab, #dbb16f 100%);
}
.gift-popover {
  padding: 0 !important;
}
</style>