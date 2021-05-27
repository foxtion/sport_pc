<template>
  <div id="mylist">
    <div class="renqi bang">
      <div class="bangbg">
        <img src="../../assets/img/renqi.png" alt="" />
        <p>距榜单刷新还有2天11小时</p>
      </div>
      <div class="toplist">
        <span
          v-for="(item, index) in list"
          :key="item.id"
          :class="{ active: activeIndex === index }"
          @click="listclick(item, index)"
          >{{ item.name }}</span
        >
      </div>
      <div class="top-t">
        <div class="top1">
          <div class="toppic">
            <div class="pic">
              <img src="../../assets/img/tv.png" alt="" />
              <i class="huangguan"></i>
              <i class="paiming"></i>
            </div>
          </div>
          <p class="topname">美女战士<i></i></p>
          <p class="hotpeo"><i></i>4.50w</p>
          <div class="guanzhu">+关注</div>
        </div>
        <div class="top2">
          <div class="toppic">
            <div class="pic">
              <img src="../../assets/img/tv.png" alt="" />
              <i class="huangguan"></i>
              <i class="paiming"></i>
            </div>
          </div>
          <p class="topname">美女修车<i></i></p>
          <p class="hotpeo"><i></i>4.50w</p>
          <div class="guanzhu">+关注</div>
        </div>
        <div class="top3">
          <div class="toppic">
            <div class="pic">
              <img src="../../assets/img/tv.png" alt="" />
              <i class="huangguan"></i>
              <i class="paiming"></i>
            </div>
          </div>
          <p class="topname">美女修车<i></i></p>
          <p class="hotpeo"><i></i>4.50w</p>
          <div class="guanzhu">+关注</div>
        </div>
      </div>
      <div class="listval">
        <ul>
          <li>
            <div class="list-l">
              <div class="touxiang">
                <img src="../../assets/img/tv.png" alt="" />
              </div>
              <div class="oldsj">
                <p class="oldname">老司机</p>
                <p class="renqinum">人气值<span>12.5w</span></p>
              </div>
            </div>
            <div class="guangzhu">+关注</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="haoqi bang">
      <div class="bangbg">
        <img src="../../assets/img/haoqi.png" alt="" />
        <p>距榜单刷新还有2天11小时</p>
      </div>
      <div class="toplist">
        <span
          v-for="(item, index) in list"
          :key="item.id"
          :class="{ active: activeIndex === index }"
          @click="listclick(item, index)"
          >{{ item.name }}</span
        >
      </div>
      <div class="top-t">
        <div class="top1">
          <div class="toppic">
            <div class="pic">
              <img src="../../assets/img/tv.png" alt="" />
              <i class="huangguan"></i>
              <i class="paiming"></i>
            </div>
          </div>
          <p class="topname">美女战士<i></i></p>
          <p class="hotpeo"><i></i>4.50w</p>
          <div class="guanzhu">+关注</div>
        </div>
        <div class="top2">
          <div class="toppic">
            <div class="pic">
              <img src="../../assets/img/tv.png" alt="" />
              <i class="huangguan"></i>
              <i class="paiming"></i>
            </div>
          </div>
          <p class="topname">美女修车<i></i></p>
          <p class="hotpeo"><i></i>4.50w</p>
          <div class="guanzhu">+关注</div>
        </div>
        <div class="top3">
          <div class="toppic">
            <div class="pic">
              <img src="../../assets/img/tv.png" alt="" />
              <i class="huangguan"></i>
              <i class="paiming"></i>
            </div>
          </div>
          <p class="topname">美女修车<i></i></p>
          <p class="hotpeo"><i></i>4.50w</p>
          <div class="guanzhu">+关注</div>
        </div>
      </div>
      <div class="listval">
        <ul>
          <li>
            <div class="list-l">
              <div class="touxiang">
                <img src="../../assets/img/tv.png" alt="" />
              </div>
              <div class="oldsj">
                <p class="oldname">老司机</p>
                <p class="renqinum">人气值<span>12.5w</span></p>
              </div>
            </div>
            <div class="guangzhu">+关注</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "myList",
  data() {
    return {
      list: [
        {
          name: "周榜",
        },
        {
          name: "月榜",
        },
        {
          name: "总榜",
        },
      ],
      activeIndex: 0,
    };
  },
  mounted() {},
  methods: {
    listclick(item, index) {
      this.activeIndex = index;
    },
  },
};
</script>

<style lang="stylus" scoped>
#mylist {
  display: flex;
  justify-content: center;
  cursor: pointer;
  padding-top: 57px;
}

.renqi {
  width: 430px;
  height: 800px;
  background: #ffffff;
  border: 1px solid #e6eaf3;
  border-radius: 7px;
  box-shadow: 0px 9px 18px 0px rgba(0, 0, 0, 0.1);
}

.haoqi {
  margin-left: 30px;
  width: 430px;
  height: 800px;
  background: #ffffff;
  border: 1px solid #e6eaf3;
  border-radius: 7px;
  box-shadow: 0px 9px 18px 0px rgba(0, 0, 0, 0.1);
}

.bang {
  position: relative;
  top: -61px;

  .bangbg {
    width: 100%;
    display: flex;
    justify-content: center;
    position: absolute;
    flex-direction: column;
    align-items: center;

    img {
      width: 323px;
      height: 87px;
    }

    p {
      font-size: 13px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      text-align: CENTER;
      color: #76809c;
    }
  }

  .toplist {
    display: flex;
    margin-top: 117px;
    justify-content: space-around;
    width: 100%;
    padding: 0 70px;

    span {
      display: inline-block;
      width: 64px;
      height: 30px;
      border-radius: 6px;
      opacity: 1;
      font-size: 16px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      text-align: CENTER;
      line-height: 30px;
      color: #693d12;

      &:hover {
        background: linear-gradient(90deg, #eccbab, #dbb16f 100%);
      }
    }

    .active {
      background: linear-gradient(90deg, #eccbab, #dbb16f 100%);
    }
  }

  .top-t {
    display: flex;
    justify-content: space-around;
    margin-top: 50px;
    padding: 0 auto;

    >div {
      text-align: center;

      .topname {
        font-size: 14px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        text-align: LEFT;
        color: #434a66;
        text-align: center;
        margin: 16px 0 7px 0px;

        i {
          display: inline-block;
          background: url('../../assets/img/di.png');
          background-size: 100% 100%;
          width: 16px;
          height: 16px;
          margin-left: 3px;
          position: relative;
          top: 3px;
        }
      }

      .hotpeo {
        font-size: 12px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        text-align: LEFT;
        color: #f26040;
        text-align: center;

        i {
          display: inline-block;
          background: url('../../assets/img/rqhot.png');
          width: 12px;
          height: 14px;
          margin-right: 5px;
        }
      }

      .guanzhu {
        width: 66px;
        height: 26px;
        background: linear-gradient(90deg, #f27a2e, #f15b43 100%);
        border-radius: 4px;
        line-height: 26px;
        font-size: 13px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        text-align: CENTER;
        color: #ffffff;
        margin: 13px auto 0;
      }
    }

    div:nth-of-type(1) {
      .toppic {
        height: 102px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        .pic {
          width: 77px;
          height: 77px;
          box-sizing: border-box;
          background: url('../../assets/img/thetwo.png');
          position: relative;

          img {
            width: 76px;
            height: 76px;
            border-radius: 50%;
          }

          .huangguan {
            position: absolute;
            top: -19px;
            left: 17px;
            display: block;
            width: 40px;
            height: 28px;
            background: url('../../assets/img/the2.png');
          }

          .paiming {
            position: absolute;
            top: 59px;
            left: 9px;
            display: block;
            width: 64px;
            height: 20px;
            background: url('../../assets/img/theb2.png');
          }
        }
      }
    }

    div:nth-of-type(2) {
      .toppic {
        .pic {
          width: 123px;
          height: 102px;
          box-sizing: border-box;
          background: url('../../assets/img/thefirst.png');
          position: relative;

          img {
            height: 99px;
            width: 99px;
            border-radius: 50%;
          }

          .huangguan {
            position: absolute;
            top: -34px;
            left: 30px;
            display: block;
            width: 60px;
            height: 45px;
            background: url('../../assets/img/the1.png');
          }

          .paiming {
            position: absolute;
            top: 77px;
            left: 22px;
            display: block;
            width: 78px;
            height: 25px;
            background: url('../../assets/img/theb1.png');
          }
        }
      }
    }

    div:nth-of-type(3) {
      .toppic {
        height: 102px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        .pic {
          width: 77px;
          height: 77px;
          box-sizing: border-box;
          background: url('../../assets/img/thethree.png');
          position: relative;

          img {
            width: 76px;
            height: 76px;
            border-radius: 50%;
          }

          .huangguan {
            position: absolute;
            top: -19px;
            left: 17px;
            display: block;
            width: 40px;
            height: 28px;
            background: url('../../assets/img/the3.png');
          }

          .paiming {
            position: absolute;
            top: 59px;
            left: 9px;
            display: block;
            width: 64px;
            height: 20px;
            background: url('../../assets/img/theb3.png');
          }
        }
      }
    }
  }

  .listval {
    width: 358px;
    margin: 0 auto;
    border-top: 1px solid #D3D8E4;
    margin: 16px auto 0;
    padding-top: 16px;

    ul {
      li {
        width: 100%;
        height: 60px;
        padding: 7px 0;
        display: flex;
        justify-content: space-between;

        .list-l {
          display: flex;

          .touxiang {
            width: 40px;
            height: 40px;

            img {
              width: 40px;
              height: 40px;
              border-radius: 50%;
            }
          }

          .oldsj {
            margin-left: 12px;
            padding: 4px 0;

            .oldname {
              font-size: 14px;
              font-family: PingFang SC, PingFang SC-Regular;
              font-weight: 400;
              text-align: LEFT;
              color: #434a66;
            }

            .renqinum {
              font-size: 12px;
              font-family: PingFang SC, PingFang SC-Regular;
              font-weight: 400;
              text-align: LEFT;
              color: #76809c;
              margin-top: 3px;
            }
          }
        }

        .guangzhu {
          width: 66px;
          height: 26px;
          background: linear-gradient(90deg, #f27a2e, #f15b43 100%);
          border-radius: 4px;
          line-height: 26px;
          font-size: 13px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          text-align: CENTER;
          color: #ffffff;
          margin: 0px 0 0 0;
        }
      }
    }
  }
}
</style> 