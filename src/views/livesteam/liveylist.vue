<template>
  <div id="liveyy">
    <div class="liveyytop">
      <div class="livetab" v-for="(item, index) in listtab" :key="index">
        <span
          :class="{ active: activeIndex === index }"
          @click="listactive(item, index)"
          >{{ item.name }}

          <i></i
        ></span>
      </div>
    </div>
    <div class="livebody" v-if="activeIndex === 0">
      <ul v-for="(item, index) in listbody" :key="index">
        <div class="livedate">
          <i></i><span>{{ item.date }}</span>
        </div>
        <li
          v-for="(elem, i) in item.info"
          :key="i"
          :style="{ width: elem.isshow !== '0' ? '' : '' }"
        >
          <span class="span1">{{ elem.time }}</span>
          <span class="span2">{{ elem.live }}</span>
          <span
            class="span3"
            :class="elem.start === '0' ? 'c_green' : 'c_red'"
            >{{ elem.start === "0" ? "未开始" : "开始" }}</span
          >
          <span class="span4">{{ elem.nameone }}</span>
          <img :src="elem.iconone" alt="" />
          <span class="span5">{{ elem.playone }}-</span>
          <span class="span6">{{ elem.playtwo }}</span>
          <img :src="elem.icontwo" alt="" />
          <span class="span7">{{ elem.nametwo }}</span>
          <span
            class="span8"
            :class="elem.isnow === '0' ? 'isshow' : 'noshow'"
            >{{ elem.isnow === "0" ? "预约" : "已预约" }}</span
          >
        </li>
      </ul>
    </div>
    <div class="livebody1" v-if="activeIndex === 1">
      <img src="../../assets/none2.png" alt="" />
      <span>暂无数据！</span>
    </div>
  </div>
</template>
<script>
import { noticelive } from "@/api";

export default {
  data() {
    return {
      listtab: [
        {
          name: "直播预告",
        },
        {
          name: "直播回放",
        },
      ],
      listbody: [
        {
          date: "05月15日",
          info: [
            {
              time: "14:55",
              live: "圣高登斯",
              start: "1",
              isnow: "0",
              nameone: "莱斯特城",
              playone: "0",
              iconone:
                "https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3717120934,3932520698&fm=26&gp=0.jpg",
              nametwo: "西汉姆联",
              icontwo:
                "https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194131577,2954769920&fm=26&gp=0.jpg",
              playtwo: "0",
            },
            {
              time: "14:55",
              live: "圣高登斯",
              start: "1",
              isnow: "0",
              nameone: "莱斯特城",
              playone: "0",
              iconone:
                "https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194131577,2954769920&fm=26&gp=0.jpg",
              nametwo: "西汉姆联",
              icontwo:
                "https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3717120934,3932520698&fm=26&gp=0.jpg",
              playtwo: "0",
            },
            {
              time: "14:55",
              live: "圣高登斯",
              start: "1",
              isnow: "0",
              nameone: "莱斯特城",
              playone: "0",
              iconone:
                "https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194131577,2954769920&fm=26&gp=0.jpg",
              nametwo: "西汉姆联",
              icontwo:
                "https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3717120934,3932520698&fm=26&gp=0.jpg",
              playtwo: "0",
            },
          ],
        },
        {
          date: "05月15日",
          info: [
            {
              time: "14:55",
              live: "圣高登斯",
              start: "1",
              isnow: "1",
              nameone: "莱斯特城",
              playone: "0",
              iconone:
                "https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194131577,2954769920&fm=26&gp=0.jpg",
              nametwo: "西汉姆联",
              icontwo:
                "https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3717120934,3932520698&fm=26&gp=0.jpg",
              playtwo: "0",
            },
          ],
        },
      ],
      activeIndex: 0,
    };
  },
  mounted() {
    this.getnoticelive()
  },
  methods: {
    listactive(item, index) {
      this.activeIndex = index;
      console.log(item, index);
    },
    getnoticelive(){
      const param = {
        live_uid:'',
        stream:'',
        live_class_id:'',
        source:'pc'
      }
      noticelive(param).then(res=>{
        if(res.code===0){
          console.log(res)
        }
      })
    }
  },
};
</script>
<style lang="stylus" scoped>
#liveyy {
  width: 1200px;
  opacity: 1;
  background: #ffffff;
  border: 1px solid #e6eaf3;
  margin: 0 0 0 13px;

  .liveyytop {
    width: 1200px;
    height: 60px;
    opacity: 1;
    background: #ffffff;
    border: 1px solid #e6eaf3;
    display: flex;

    .livetab {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        width: 88px;
        height: 32px;
        opacity: 1;
        background: #ffffff;
        font-size: 16px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        text-align: center;
        color: #8d94af;
        line-height: 32px;
        cursor: pointer;
        position: relative;

        i {
          position: absolute;
          display: block;
          width: 12px;
          height: 6px;
          left: 36px;
          top: 36px;
        }
      }

      .active {
        border: 1px solid #dbb16f;
        border-radius: 5px;
        font-size: 16px;
        font-family: PingFang SC, PingFang SC-Medium;
        font-weight: 500;
        text-align: center;
        color: #dbb16f;

        i {
          background: url('../../assets/img/livexjt.png');
        }
      }
    }
  }

  .livebody {
    ul {
      width: 100%;
      opacity: 1;
      background: #ffffff;
      display: flex;
      flex-direction: column;

      .livedate {
        width: 100%;
        height: 60px;
        opacity: 1;
        line-height: 60px;
        background: #ffffff;

        i {
          display: inline-block;
          width: 3px;
          height: 20px;
          background: #dbb16f;
          border-radius: 1px;
          margin: 0 6px 0 8px;
        }

        span {
          font-size: 24px;
          font-family: PingFang SC, PingFang SC-Heavy;
          font-weight: 800;
          text-align: center;
          color: #333333;
          letter-spacing: 0px;
        }
      }

      li {
        width: 100%;
        height: 60px;
        opacity: 1;
        background: #f8fafe;
        display: flex;
        align-items: center;

        .span1 {
          font-size: 16px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          color: #333333;
          margin-left: 48px;
        }

        .span2 {
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          color: #666666;
          margin-left: 72px;
        }

        .span3 {
          font-size: 12px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          color: #76809c;
          margin-left: 72px;
        }

        .span4 {
          font-size: 13px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          color: #434a66;
          margin-left: 147px;
          margin-right: 8px;
        }

        .span5 {
          font-size: 16px;
          font-family: PingFang SC, PingFang SC-Heavy;
          font-weight: 800;
          color: #333333;
          margin-left: 20px;
        }

        .span6 {
          font-size: 16px;
          font-family: PingFang SC, PingFang SC-Heavy;
          font-weight: 800;
          color: #333333;
          margin-right: 20px;
        }

        .span7 {
          font-size: 13px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          color: #434a66;
          margin: 0 401px 0 8px;
        }

        .span8 {
          display: inline-block;
          width: 46px;
          height: 26px;
          line-height: 26px;
          font-size: 13px;
          opacity: 1;
          text-align: center;
          background: linear-gradient(90deg, #eccbab, #dbb16f 100%);
          border-radius: 2px;
        }

        img {
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }

        .isshow {
          width: 46px;
          height: 26px;
          opacity: 1;
          background: linear-gradient(90deg, #eccbab, #dbb16f 100%);
          border-radius: 2px;
          font-size: 13px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          color: #7e3a18;
        }

        .noshow {
          width: 60px;
          height: 26px;
          opacity: 1;
          background: #ffffff;
          border: 1px solid rgba(118, 128, 156, 0.5);
          border-radius: 5px;
          font-size: 13px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          color: #76809c;
          text-align: center;
          margin-left: -7px;
        }
      }

      li:nth-of-type(2n) {
        background: #ffffff;
      }
    }
  }

  .livebody1 {
    display: flex;
    padding: 30px 0;
    margin: 0 auto;
    flex-direction: column;
    text-align: center;

    img {
      margin: 0 auto;
    }

    span {
      color: #777;
    }
  }
}
</style>