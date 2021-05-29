<template>
  <div class="LiveNoble">
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="400px">
      <div class="LiveNoble-main">
        <div class="LiveNoble-box">
          <div style="display: flex">
            <div class="my-level">
              <p style="margin-bottom: 8px">您的贵族身份为: 子爵</p>
              <p>截止日期: {{ user.noble_endtimes }}</p>
            </div>
            <div class="become">成为贵族，万众瞩目</div>
          </div>
          <div class="nav">
            <div @click="changeCurrentNav('emperor')">
               <img v-if="currentNav == 'emperor'" src="@/assets/liveNoble/emperor-yes.png" />
               <img v-else src="@/assets/liveNoble/emperor-no.png" />
            </div>
            <div @click="changeCurrentNav('duke')">
               <img v-if="currentNav == 'duke'" src="@/assets/liveNoble/duke-yes.png" />
               <img v-else src="@/assets/liveNoble/duke-no.png" />
            </div>
            <div @click="changeCurrentNav('marquis')">
               <img v-if="currentNav == 'marquis'" src="@/assets/liveNoble/marquis-yes.png" />
               <img v-else src="@/assets/liveNoble/marquis-no.png" />
            </div>
            <div @click="changeCurrentNav('viscount')">
               <img v-if="currentNav == 'viscount'" src="@/assets/liveNoble/viscount-yes.png" />
               <img v-else src="@/assets/liveNoble/viscount-no.png" />
            </div>
            <div @click="changeCurrentNav('knight')">
               <img v-if="currentNav == 'knight'" src="@/assets/liveNoble/knight-yes.png" />
               <img v-else src="@/assets/liveNoble/knight-no.png" />
            </div>
          </div>
          <div style="display: flex;">
            <div>
              <div class="level-logo">
                <img v-if="currentNav == 'emperor'" src="@/assets/liveNoble/emperor.png" />
                <img v-if="currentNav == 'duke'" src="@/assets/liveNoble/duke.png" />
                <img v-if="currentNav == 'marquis'" src="@/assets/liveNoble/marquis.png" />
                <img v-if="currentNav == 'viscount'" src="@/assets/liveNoble/viscount.png" />
                <img v-if="currentNav == 'knight'" src="@/assets/liveNoble/knight.png" />
              </div>
              <div class="level-name">
                <p v-if="currentNav == 'emperor'">皇帝勋章</p>
                <p v-if="currentNav == 'duke'">公爵勋章</p>
                <p v-if="currentNav == 'marquis'">侯爵勋章</p>
                <p v-if="currentNav == 'viscount'">子爵勋章</p>
                <p v-if="currentNav == 'knight'">骑士勋章</p>
              </div>
            </div>
            <div class="level-info" v-if="currentNav == 'emperor'">
              <div style="display: flex;">
                <div class="level-info-item">
                  <img src="@/assets/liveNoble/car-5.png" width="39px" style="margin: 9px 34px 4px;"/>
                  <p>专属坐骑</p>
                  <div>豪气元龙，君临天</div>
                  <div>下高级入场效果</div>
                </div>
                <div class="level-info-item">
                  <img src="@/assets/liveNoble/preferential.png" width="39px" style="margin: 9px 34px 4px;"/>
                  <p>超级优惠</p>
                  <div>惊喜礼遇</div>
                  <div>续费5.4折</div>
                </div>
                <div class="level-info-item">
                  <img src="@/assets/liveNoble/crown.png" width="39px" style="margin: 9px 34px 4px;"/>
                  <p>贵族标识</p>
                  <div>专属身份</div>
                  <div>皇帝勋章</div>
                </div>
              </div>
              <div style="display: flex;">
                <div class="level-info-item">
                  <img src="@/assets/liveNoble/speak.png" width="39px" style="margin: 9px 34px 4px;"/>
                  <p>发言特权</p>
                  <div>尊享5级气泡88个</div>
                  <div>解锁1~5级粉丝弹幕</div>
                  <img src="@/assets/liveNoble/speak-color-5.png"/>
                </div>
                <div class="level-info-item">
                  <img src="@/assets/liveNoble/vip.png" width="39px" style="margin: 9px 34px 4px;"/>
                  <p>贵宾席</p>
                  <div>上座直播间贵宾席</div>
                  <div>彰显高贵</div>
                </div>
                <div class="level-info-item">
                  <img src="@/assets/liveNoble/notice.png" width="39px" style="margin: 9px 34px 4px;"/>
                  <p>开通通知</p>
                  <div>开通续费时</div>
                  <div>全平台广播</div>
                </div>
              </div>
              <div style="display: flex;">
                <div class="level-info-item">
                  <img src="@/assets/liveNoble/horn.png" width="39px" style="margin: 9px 34px 4px;"/>
                  <p>喇叭</p>
                  <div>豪气元龙，君临天下</div>
                  <div>高级入场效果</div>
                </div>
              </div>
            </div>
            <div class="level-info" v-if="currentNav == 'duke'" style="margin-top: 45px">
              <div style="display: flex;">
                <div class="level-info-item">
                  <img src="@/assets/liveNoble/car-4.png" width="39px" style="margin: 9px 34px 4px;"/>
                  <p>专属坐骑</p>
                  <div>麒麟异兽，踏云而来</div>
                  <div>高级入场特效</div>
                </div>
                <div class="level-info-item">
                  <img src="@/assets/liveNoble/preferential.png" width="39px" style="margin: 9px 34px 4px;"/>
                  <p>超级优惠</p>
                  <div>惊喜礼遇</div>
                  <div>续费7.0折</div>
                </div>
                <div class="level-info-item">
                  <img src="@/assets/liveNoble/crown.png" width="39px" style="margin: 9px 34px 4px;"/>
                  <p>贵族标识</p>
                  <div>专属身份</div>
                  <div>公爵勋章</div>
                </div>
              </div>
              <div style="display: flex;">
                <div class="level-info-item">
                  <img src="@/assets/liveNoble/speak.png" width="39px" style="margin: 9px 34px 4px;"/>
                  <p>发言特权</p>
                  <div>尊享5级气泡66个</div>
                  <div>解锁1~4级粉丝弹幕</div>
                  <img src="@/assets/liveNoble/speak-color-4.png"/>
                </div>
                <div class="level-info-item">
                  <img src="@/assets/liveNoble/vip.png" width="39px" style="margin: 9px 34px 4px;"/>
                  <p>贵宾席</p>
                  <div>上座直播间贵宾席</div>
                  <div>彰显高贵</div>
                </div>
                <div class="level-info-item">
                  <img src="@/assets/liveNoble/notice.png" width="39px" style="margin: 9px 34px 4px;"/>
                  <p>开通通知</p>
                  <div>开通续费时</div>
                  <div>房间广播</div>
                </div>
              </div>
            </div>
            <div class="level-info" v-if="currentNav == 'marquis'" style="margin-top: 45px">
              <div style="display: flex;">
                <div class="level-info-item">
                  <img src="@/assets/liveNoble/car-3.png" width="39px" style="margin: 9px 34px 4px;"/>
                  <p>专属坐骑</p>
                  <div>烈焰白虎，神威如狱</div>
                  <div>公平入场通知</div>
                </div>
                <div class="level-info-item">
                  <img src="@/assets/liveNoble/preferential.png" width="39px" style="margin: 9px 34px 4px;"/>
                  <p>超级优惠</p>
                  <div>惊喜礼遇</div>
                  <div>续费6.6折</div>
                </div>
                <div class="level-info-item">
                  <img src="@/assets/liveNoble/crown.png" width="39px" style="margin: 9px 34px 4px;"/>
                  <p>贵族标识</p>
                  <div>专属身份</div>
                  <div>侯爵勋章</div>
                </div>
              </div>
              <div style="display: flex;">
                <div class="level-info-item">
                  <img src="@/assets/liveNoble/speak.png" width="39px" style="margin: 9px 34px 4px;"/>
                  <p>发言特权</p>
                  <div>尊享3级气泡50个</div>
                  <div>解锁1~3级粉丝弹幕</div>
                  <img src="@/assets/liveNoble/speak-color-3.png"/>
                </div>
                <div class="level-info-item">
                  <img src="@/assets/liveNoble/vip.png" width="39px" style="margin: 9px 34px 4px;"/>
                  <p>贵宾席</p>
                  <div>上座直播间贵宾席</div>
                  <div>彰显高贵</div>
                </div>
                <div class="level-info-item">
                  <img src="@/assets/liveNoble/notice.png" width="39px" style="margin: 9px 34px 4px;"/>
                  <p>开通通知</p>
                  <div>开通续费时</div>
                  <div>房间广播</div>
                </div>
              </div>
            </div>
            <div class="level-info" v-if="currentNav == 'viscount'" style="margin-top: 45px">
              <div style="display: flex;">
                <div class="level-info-item">
                  <img src="@/assets/liveNoble/car-2.png" width="39px" style="margin: 9px 34px 4px;"/>
                  <p>专属坐骑</p>
                  <div>獠牙飞豹，震嚎八方</div>
                  <div>公平入场通知</div>
                </div>
                <div class="level-info-item">
                  <img src="@/assets/liveNoble/preferential.png" width="39px" style="margin: 9px 34px 4px;"/>
                  <p>超级优惠</p>
                  <div>惊喜礼遇</div>
                  <div>续费4.5折</div>
                </div>
                <div class="level-info-item">
                  <img src="@/assets/liveNoble/crown.png" width="39px" style="margin: 9px 34px 4px;"/>
                  <p>贵族标识</p>
                  <div>专属身份</div>
                  <div>子爵勋章</div>
                </div>
              </div>
              <div style="display: flex;">
                <div class="level-info-item">
                  <img src="@/assets/liveNoble/speak.png" width="39px" style="margin: 9px 34px 4px;"/>
                  <p>发言特权</p>
                  <div>尊享2级气泡20个</div>
                  <div>解锁1~2级粉丝弹幕</div>
                  <img src="@/assets/liveNoble/speak-color-2.png"/>
                </div>
                <div class="level-info-item">
                  <img src="@/assets/liveNoble/vip.png" width="39px" style="margin: 9px 34px 4px;"/>
                  <p>贵宾席</p>
                  <div>上座直播间贵宾席</div>
                  <div>彰显高贵</div>
                </div>
                <div class="level-info-item">
                  <img src="@/assets/liveNoble/notice.png" width="39px" style="margin: 9px 34px 4px;"/>
                  <p>开通通知</p>
                  <div>开通续费时</div>
                  <div>房间广播</div>
                </div>
              </div>
            </div>
            <div class="level-info" v-if="currentNav == 'knight'" style="margin-top: 45px">
              <div style="display: flex;">
                <div class="level-info-item">
                  <img src="@/assets/liveNoble/car-1.png" width="39px" style="margin: 9px 34px 4px;"/>
                  <p>专属坐骑</p>
                  <div>炙热火马，赫赫威名</div>
                  <div>公平入场通知</div>
                </div>
                <div class="level-info-item">
                  <img src="@/assets/liveNoble/preferential.png" width="39px" style="margin: 9px 34px 4px;"/>
                  <p>超级优惠</p>
                  <div>惊喜礼遇</div>
                  <div>续费5.0折</div>
                </div>
                <div class="level-info-item">
                  <img src="@/assets/liveNoble/crown.png" width="39px" style="margin: 9px 34px 4px;"/>
                  <p>贵族标识</p>
                  <div>专属身份</div>
                  <div>骑士勋章</div>
                </div>
              </div>
              <div style="display: flex;">
                <div class="level-info-item">
                  <img src="@/assets/liveNoble/speak.png" width="39px" style="margin: 9px 34px 4px;"/>
                  <p>发言特权</p>
                  <div>尊享1级气泡20个</div>
                  <div>解锁1级粉丝弹幕</div>
                  <img src="@/assets/liveNoble/speak-color-1.png"/>
                </div>
                <div class="level-info-item">
                  <img src="@/assets/liveNoble/vip.png" width="39px" style="margin: 9px 34px 4px;"/>
                  <p>贵宾席</p>
                  <div>上座直播间贵宾席</div>
                  <div>彰显高贵</div>
                </div>
                <div class="level-info-item">
                  <img src="@/assets/liveNoble/notice.png" width="39px" style="margin: 9px 34px 4px;"/>
                  <p>开通通知</p>
                  <div>开通续费时</div>
                  <div>房间广播</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
    name: "LiveNoble",
    data() {
        return {
            dialogVisible: false,
            user:{},
            currentNav: 'emperor'
        }
    },
    mounted() {
        this.user = JSON.parse(window.localStorage.getItem("user"))
    },
    methods: {
      showDialog() {
        this.dialogVisible = true
      },
      changeCurrentNav(type) {
        this.currentNav = type
      }
    }
};
</script>

<style lang="stylus">
.LiveNoble {
  .el-dialog .el-dialog__header {
    display: none;
  }
  .el-dialog .el-dialog__footer{
    display: none;
  }
  .el-dialog .el-dialog__body{
    position: relative;
    .LiveNoble-main {
      color: #DBB16F;
      height: 590px;
      width: 789px;
      background: url('../../assets/liveNoble/bg.png')
      position: absolute;
      top: -50px;
      left: -190px;
      .LiveNoble-box {
        margin-top: 77px;
        margin-left: 44px;
        .my-level {
          font-size: 14px;
        }
        .become {
          margin-left: 148px;
          margin-top: 24px;
        }
        .nav {
          margin-top: 14px;
          margin-bottom: 19px;
          display: flex;
          div {
            cursor: pointer;
          }
        }
        .level-logo {
          margin-left: 47px;
          margin-top: 32px;
        }
        .level-name {
          font-size: 20px;
          font-family: PangMenZhengDao-Cu, PangMenZhengDao-Cu-Regular;
          margin-top: 21px;
          margin-left: 123px;
        }
        .level-info {
          // display: flex;
          margin-left: 100px;
          .level-info-item {
            width: 108px;
            height: 100px;
            text-align: center;
            p {
              font-size: 14px;
            }
            div {
              color: rgba(255,255,255,0.60);
              font-size: 11px !important;
            }
          }
        }
      }
    }
  }
  
}
</style>
