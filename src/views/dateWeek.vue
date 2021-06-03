<template>
  <div>
    <div class="time-week">
        <img src="@/assets/left-arrow.png" @click="leftArrow"/>
        <div class="time-week-main">
          <div v-for="(item, index) in dateData" class="time-week-item" :key="index" @click="getCurrentDate(item)">
            <div :class="currentDate.time === item.time ? 'current-date' : ''">
              <div class="time">{{ item.time }}</div>
              <div class="lable">{{ item.label}}</div>
            </div>
          </div>
        </div>
        <img src="@/assets/right-arrow.png" @click="rightArrow"/>
    </div>
  </div>
</template>

<script>
    export default {
        name: "DataWeek",
        data() {
          return {
            dateData: [],
            clickNum: 0,
            currentDate: {}
          };
        },
        mounted() {
        },
        created() {
          this.initDaysList(0)
        },
        methods: {
          initDaysList (val) {
            this.dateData = []
            // 获取系统当前时间
            var now = new Date()
            var nowTime = now.getTime()
            var oneDayTime = 24 * 60 * 60 * 1000
            var upLoadNowTime = nowTime + oneDayTime * val
            for (var i = 0; i < 7; i++) {
              var ShowTime = upLoadNowTime + i * oneDayTime
              var myDate = new Date(ShowTime)
              var month = myDate.getMonth() + 1
              var date = myDate.getDate()
              var str = myDate.getDay()
              var year = myDate.getFullYear()
              switch(str) {
                case 1:
                      str = '周一';
                      break;
                case 2:
                      str = '周二';
                      break;
                case 3:
                      str = '周三';
                      break;
                case 4:
                      str = '周四';
                      break;
                case 5:
                      str = '周五';
                      break;
                case 6:
                      str = '周六';
                      break;
                case 0:
                      str = '周日';
                      break;
              }
              this.dateData.push({
                label: str,
                time: month + '/' + date,
                showTime: ShowTime,
                date: month + '月' + date + '日',
                year: year + '-' + month + '-' + date,
              })
            }
            this.currentDate = this.dateData[0]
          },
          // 点击左箭头
          leftArrow() {
            this.clickNum = this.clickNum - 1
            this.initDaysList(this.clickNum)
          },
          // 点击右箭头
          rightArrow() {
            this.clickNum = this.clickNum + 1
            this.initDaysList(this.clickNum)
          },
          getCurrentDate(item) {
            this.$emit('searchCompetitionData', item) // 调用父组件方法
            this.currentDate = item
          }
        }
    };
</script>

<style lang="stylus">
.time-week {
    display: flex;
    .time-week-main {
        display: flex;
        justify-content: space-around;
        width: 760px;
    }
    .time-week-item {
        width: 84px;
        text-align: center;
        color: #434A66;
        .time {
          padding-top: 10px
          font-size: 16px;
          font-family: PingFang SC, PingFang SC-Heavy;
          font-weight: 800;
        }
        .lable {
          padding-bottom: 10px;
          font-size: 12px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
        }
        .current-date {
          background: linear-gradient(90deg,#eccbab, #dbb16f 100%);
        }
    }
}
</style>
