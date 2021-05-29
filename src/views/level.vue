<template>
  <div id="Level">
    <h4>我的等级</h4>
    <div class="prompt-content">
      <p class="prompt">您目前财富经验值为<span style="color: #DBB16F">888 </span>， 再有<span style="color: #DBB16F">0.5</span>财富经验值就能获得直播间特有的财富等级及标识，等你哦!</p>
      <el-tooltip class="item" effect="dark" content="在直播间消费龙钻可获得财富经验值 1龙钻=1财富经验值，最小单位为0.1" placement="right">
        <img src="@/assets/prompt.png"/>
      </el-tooltip>
    </div>
    <div class="level-privilege">
      <div class="privilege">等级特权</div>
      <div class="divider"></div>
    </div>
    <div class="level-main">
      <div class="level-main-item">
        <img src="@/assets/level-10.png" class="img">
        <div class="level-main-text">赠送价值<span style="color: #DBB16F">5龙钻以内</span>的5个礼物</div>
        <div class="level-btn">LV10开启</div>
      </div>
      <div class="level-main-item">
        <img src="@/assets/level-20.png" class="img">
        <div class="level-main-text">赠送价值<span style="color: #DBB16F">10龙钻以内</span>的5个礼物</div>
        <div class="level-btn">LV20开启</div>
      </div>
      <div class="level-main-item">
        <img src="@/assets/level-30.png" class="img">
        <div class="level-main-text">赠送价值<span style="color: #DBB16F">15龙钻以内</span>的5个礼物</div>
        <div class="level-btn">LV30开启</div>
      </div>
      <div class="level-main-item">
        <img src="@/assets/level-40.png" class="img">
        <div class="level-main-text">赠送价值<span style="color: #DBB16F">20龙钻以内</span>的5个礼物</div>
        <div class="level-btn">LV40开启</div>
      </div>
      <div class="level-main-item">
        <img src="@/assets/level-50.png" class="img">
        <div class="level-main-text">赠送价值<span style="color: #DBB16F">88龙钻</span>的中奖喷雾3个</div>
        <div class="level-btn">LV50开启</div>
      </div>
      <div class="level-main-item">
        <img src="@/assets/level-60.png" class="img">
        <div class="level-main-text">赠送价值<span style="color: #DBB16F">98龙钻</span>的礼物跑车5个</div>
        <div class="level-btn">LV60开启</div>
      </div>
    </div>
    <div class="level-main">
      <div class="level-main-item2">
        <img src="@/assets/level-70.png" class="img">
        <div class="level-main-text">每月赠送价值<span style="color: #DBB16F">158龙钻</span>的礼物私人飞机3个，全局喇叭5个</div>
        <div class="level-btn">LV70开启</div>
      </div>
      <div class="level-main-item2">
        <img src="@/assets/level-80.png" class="img">
        <div class="level-main-text">每月赠送价值<span style="color: #DBB16F">388龙钻</span>的礼物游艇3个，全局喇叭10个</div>
        <div class="level-btn">LV80开启</div>
      </div>
      <div class="level-main-item2">
        <img src="@/assets/level-90.png" class="img">
        <div class="level-main-text">每月赠送价值<span style="color: #DBB16F">488龙钻</span>的礼物游艇5个，全局喇叭10个</div>
        <div class="level-btn">LV90开启</div>
      </div>
      <div class="level-main-item2">
        <img src="@/assets/level-100.png" class="img">
        <div class="level-main-text">每月赠送价值<span style="color: #DBB16F">588龙钻</span>的礼物火箭5个，全局喇叭20个</div>
        <div class="level-btn">LV100开启</div>
      </div>
      <div class="level-main-item2">
        <img src="@/assets/level.png" class="img">
        <div class="level-main-text">敬请期待</div>
      </div>
      <div style="width: 148px;"></div>
    </div>
    <div class="level-privilege">
      <div class="privilege">如何快速升级</div>
      <div class="divider"></div>
    </div>
    <div class="upgrade">
      <div class="upgrade-item">
        <img src="@/assets/upgrade-1.png" class="img">
        <div style="font-size: 14px">
          <p style="color: #333333;line-height: 20px; margin-bottom: 8px">赠送礼物</p>
          <p style="color: #76809C;line-height: 20px">礼物刷起来 经验飙到嗨</p>
        </div>
      </div>
      <div class="upgrade-item">
        <img src="@/assets/upgrade-2.png" class="img">
        <div style="font-size: 14px">
          <p style="color: #333333;line-height: 20px; margin-bottom: 8px">充值龙钻</p>
          <p style="color: #76809C;line-height: 20px">充值不停 快感不止</p>
        </div>
      </div>
      <div class="upgrade-item">
        <img src="@/assets/upgrade-2.png" class="img">
        <div style="font-size: 14px">
          <p style="color: #333333;line-height: 20px; margin-bottom: 8px">购买贵族</p>
          <p style="color: #76809C;line-height: 20px">帝王显尊贵 经验不浪费</p>
        </div>
      </div>
    </div>
    <div class="upgrade">
      <div class="upgrade-item">
        <img src="@/assets/upgrade-4.png" class="img">
        <div style="font-size: 14px">
          <p style="color: #333333;line-height: 20px; margin-bottom: 8px">贵族礼物</p>
          <p style="color: #76809C;line-height: 20px">球钻送礼物，额外增加经验值</p>
        </div>
      </div>
      <div class="upgrade-item">
        <img src="@/assets/upgrade-5.png" class="img">
        <div style="font-size: 14px">
          <p style="color: #333333;line-height: 20px; margin-bottom: 8px">分享邀请</p>
          <p style="color: #76809C;line-height: 20px">分享直播间 花式拿经验</p>
        </div>
      </div>
      <div class="upgrade-item">
        <img src="@/assets/upgrade-6.png" class="img">
        <div style="font-size: 14px">
          <p style="color: #333333;line-height: 20px; margin-bottom: 8px">活动任务</p>
          <p style="color: #76809C;line-height: 20px">龙牙天天游，经验滚雪球</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { incomeDetails, rewardRecord,  extracCashList} from '@/api'
export default {
  name: "Level",
  components: {
  },
  data() {
    return {
      tableData: [],
      queryInfo: {},
      activeName: 'consumption',
      user: {},
      token: ''
    };
  },
  mounted() {
    this.user = JSON.parse(window.localStorage.getItem("user"))
    this.token = window.localStorage.getItem("token")
  },
  created() {
  },
  methods: {
    handleClick() {
      const params = {
        uid: this.user.id,
        token: this.token,
        p: 1,
        source: 'pc'
      }
      if (this.activeName == 'consumption') { // 消费记录
        rewardRecord(params).then(res => {
          this.tableData = res.data
        })
      }
      if (this.activeName == 'spending') { // 收支明细
        incomeDetails(params).then(res => {
          this.tableData = res.data
        })
      }
      if (this.activeName == 'withdrawal') { // 提现记录 
        extracCashList(params).then(res => {
          this.tableData = res.data
        })
      }
    },
    serchData() {
      const params = {
        uid: this.user.id,
        token: this.token,
        p: 1,
        source: 'pc'
      }
      if (this.activeName == 'consumption') { // 消费记录
        rewardRecord(params).then(res => {
          this.tableData = res.data
        })
      }
      if (this.activeName == 'spending') { // 收支明细
        incomeDetails(params).then(res => {
          this.tableData = res.data
        })
      }
      if (this.activeName == 'withdrawal') { // 提现记录 
        extracCashList(params).then(res => {
          this.tableData = res.data
        })
      }
    }
  },
};
</script>

<style lang="stylus">
#Level {
  padding: 32px 24px 0 24px;

  h4 {
    font-size: 18px;
    font-weight: 600;
    border-left: 3px solid #ffc71c;
    padding-left: 10px;
    margin-bottom: 40px;
  }
  .prompt-content {
    display: flex;
    .prompt {
      margin-right: 10px;
    }
  }
  .level-privilege {
    margin: 12px 0;
    display: flex;
    .privilege {
      width: 116px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      opacity: 1;
      color: #CE995B;
      border: 1px solid #dbb16f;
      border-radius: 17px;
    }
    .divider {
      height: 1px;
      width: 87%;
      border-top: 1px solid #dbb16f;
      margin-top: 16px;
    }
  }
  .level-main {
    display: flex;
    justify-content: space-around;
    margin-bottom: 12px;
    .level-main-item,
    .level-main-item2 {
      width: 148px;
      height: 192px;
      border: 1px solid #E6EAF3;
      border-radius: 5px;
      .img {
        width: 74px;
        margin: 20px 37px 12px;
      }
      .level-main-text {
        margin: 0 12px;
        text-align: center;
        font-size: 14px;
      }
      .level-btn {
        margin: 8px 32px 0 32px;
        padding: 6px 0;
        width: 84px;
        border: 1px solid #76809C;
        border-radius: 5px;
        opacity: 0.5;
        font-size: 14px;
        text-align: center;
        cursor: pointer;
      }
    }
    .level-main-item2 {
      height: 210px;
    }
  }
  .upgrade {
    display: flex;
    justify-content: space-around;
    margin-bottom: 12px;
    margin-right: 16px;
    .upgrade-item {
      display: flex;
      height: 80px;
      width: 312px;
      background: #f6f9ff;
      border-radius: 2px;
      padding: 16px;
      .img {
        height: 48px;
        margin-right: 12px;
      }
    }
  }
}
.el-tooltip__popper.is-dark{
  width: 200px;
}
</style>