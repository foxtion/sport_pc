<template>
  <div id="liveyy">
    <div class="liveyytop">
      <div class="livetab" v-for="(irtem, index) in listtab" :key="index">
        <span
          :class="{ active: activeIndex === index }"
          @click="listactive(item, index)"
          >{{ item.name }}</span
        >
      </div>
    </div>
    <div class="livebody">
      <ul v-for="(item, index) in listbody" :key="index">
        <div>
          <span>{{ item.date }}</span>
        </div>
        <li v-for="(elem, i) in item.info" :key="i">
          <span>{{ elem.time }}</span>
          <span>{{ elem.live }}</span>
          <span :class="elem.start === '0' ? 'c_green' : 'c_red'">{{
            elem.start === "0" ? "未开始" : "开始"
          }}</span>
          <div>
            <span>{{ elem.nameone }}</span>
            <img :src="elem.iconone" alt="" />
            <span>{{ elem.playone }}</span
            >-
            <span>{{ elem.playtwo }}</span>
            <img :src="elem.icontwo" alt="" />
            <span>{{ elem.playtwo }}</span>
          </div>
          <div>
            <span :class="elem.isnow==='0'?'isshow':'noshow'">{{elem.isnow==='0'?'预约':'已预约'}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
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
              playtwo: "",
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
              playtwo: "",
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
              isnow: "0",
              nameone: "莱斯特城",
              playone: "0",
              iconone:
                "https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1194131577,2954769920&fm=26&gp=0.jpg",
              nametwo: "西汉姆联",
              icontwo:
                "https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3717120934,3932520698&fm=26&gp=0.jpg",
              playtwo: "",
            },
          ],
        },
      ],
      activeIndex: 0,
    };
  },
  mounted() {},
  methods: {
    listactive(item, index) {
      console.log(item, index);
    },
  },
};
</script>
<style lang="stylus" scoped>
#liveyy {
  width: 1200px;
  opacity: 1;
  background: #ffffff;
  border: 1px solid #e6eaf3;
  margin: 0 auto;

  .liveyytop {
    width: 1200px;
    height: 60px;
    opacity: 1;
    background: #ffffff;
    border: 1px solid #e6eaf3;
    display: flex;

    .livetab {
      width: 50%;

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
      }

      .active {
        border: 1px solid #dbb16f;
        border-radius: 5px;
        font-size: 16px;
        font-family: PingFang SC, PingFang SC-Medium;
        font-weight: 500;
        text-align: center;
        color: #dbb16f;
      }
    }
  }

  .livebody {
  }
}
</style>