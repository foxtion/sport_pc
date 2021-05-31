<template>
  <div id="fullMoney">
        <el-dialog
        title="充值"
        :center="true"
        :visible.sync="rechargeShow"
        width="668px"
        :before-close="handleClose">
          <div class="header-info">呆萌的赵云<span style="font-size: 12px">（余额:180钻石）</span></div>
          <div class="full-money-main">
            <p>充值金额：</p>
            <div class="full-num">
              <div>
                <p class="zshi">1钻石</p>
                <p class="money">￥1</p>
              </div>
              <div>
                <p class="zshi">10钻石</p>
                <p class="money">￥10</p>
              </div>
              <div>
                <p  class="zshi">50钻石</p>
                <p stclass="money">￥50</p>
              </div>
              <div >
                <p  class="zshi">100钻石</p>
                <p class="money">￥100</p>
              </div>
              <div >
                <p  class="zshi">500钻石</p>
                <p class="money">￥500</p>
              </div>
            </div>
            <div class="full-num">
              <div >
                <p  class="zshi">1000钻石</p>
                <p class="money">￥1000</p>
              </div>
              <div>
                <el-input v-model="money" />
              </div>
            </div>

          </div>
          <div class="full-money-type">
            <p>充值方式：</p>
            <div class="full-num">
              <div>
                <img src="@/assets/afb.png" width="24px" height="24px"/> <p>支付宝</p>
              </div>
              <div>
                 <img src="@/assets/wx.png"  width="24px" height="24px" /><p>微信</p>
              </div>
            </div>
          </div>
          <p style="margin-top: 24px;margin-bottom: 20px">应付金额： <span style="color: #DBB16F">1</span>元</p>
          <div class="full-btn">充值</div>
          <div slot="footer" class="dialog-footer">
            <div class="footer-box">
              <img src="@/assets/gift.png" width="60px" style="margin-right: 8px"/>
              <div class="footer-text">
                <p> <span class="num">1</span> 充值奖励 <span style="color: red">每次充值均可获得</span></p>
                <p style="color: #333333;margin-left: 27px">每次充值将赠送同等数量经验（例如充100元获得100经验）</p>
              </div>
            </div>
          </div>
        </el-dialog>
  </div>
</template>

<script>
export default {
  name: "fullMoney",
  props: {
    rechargeShow: Boolean,
    required: false,
    money: ''
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  created() {
  },
  methods: {
    handleClose() {
      this.$emit('closeRecharge')
    },
  }
};
</script>

<style lang="stylus" scoped>
#fullMoney {
  position: relative;
  .header-info {
    position: absolute;
    top: 16px;
    font-size: 14px;
    color: #434A66;
  }
  .full-money-main {
    .full-num {
      text-align: center;
      display: flex;
      margin-top: 12px;
      div {
        height: 45px; 
        width: 108px;
        border: 1px solid #E6EAF3;
        border-radius: 5px;
        line-height: 16px;
        font-size: 14px;
        margin-right: 16px;
        cursor: pointer;
        .zshi {
          color: #76809C;
          margin-top:6px; 
          margin-bottom:1px;
        }
        .money {
          color: #434A66
        }
        /deep/ .el-input__inner {
          border: 0;
        }
      }
      div:hover {
        color: #DBB16F;
        border-color: #DBB16F;
        .zshi {
          color: #DBB16F;
        }
        .money {
          color: #DBB16F;
        }
      }
    }
  }
  .full-money-type {
    margin-top: 24px;
    .full-num {
      text-align: center;
      display: flex;
      margin-top: 12px;
      div {
        height: 45px; 
        line-height 45px
        width: 108px;
        border: 1px solid #E6EAF3;
        border-radius: 5px;
        font-size: 14px;
        margin-right: 16px;
        cursor: pointer;
        display:flex;
        img {
          margin-top: 9px;
          margin-left: 17px;
          margin-right: 8px;
        }
        p {
          line-height 42px
        }
      }
      div:hover {
        color: #DBB16F;
        border-color: #DBB16F;
        .zshi {
          color: #DBB16F;
        }
        .money {
          color: #DBB16F;
        }
      }
    }

  }
  .full-btn {
    width: 108px;
    height: 40px;
    line-height 40px;
    text-align: center;
    opacity: 1;
    background: linear-gradient(90deg,#eccbab, #dbb16f 100%);
    border-radius: 4px;
    color: #693D12;
    margin-left: 254px;
    cursor: pointer;
  }
  /deep/ .el-dialog__footer {
    padding: 0;
    background: #f8fafe;
    border-radius: 4px;
  }
  .footer-box {
    display: flex;
    padding: 18px 20px;
    .footer-text {
      font-size: 14px;
      line-height: 16px;
      text-align: left;
      .num {
        display:inline-block;
        width: 16px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        opacity: 1;
        background: #ebf0fb;
        border: 1px solid #76809c;
        border-radius: 50%;
        margin-right: 6px;
      }
      p {
        margin-top: 8px;
      }
    }
  }
}
</style>