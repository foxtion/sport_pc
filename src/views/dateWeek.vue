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
            const flag = val == 0 ? 1 : val
            this.dateData = []
            // 获取系统当前时间
            var now = new Date()
            var nowTime = now.getTime()
            var oneDayTime = 24 * 60 * 60 * 1000
            var upLoadNowTime = nowTime + oneDayTime * flag
            for (var i = 0; i < 7; i++) {
              var ShowTime = upLoadNowTime + i * oneDayTime
              var myDate = new Date(ShowTime)
              var month = myDate.getMonth() + 1
              var date = myDate.getDate()
              var str = myDate.getDay()
              switch(str) {
                case 1:
                      str = '星期一';
                      break;
                case 2:
                      str = '星期二';
                      break;
                case 3:
                      str = '星期三';
                      break;
                case 4:
                      str = '星期四';
                      break;
                case 5:
                      str = '星期五';
                      break;
                case 6:
                      str = '星期六';
                      break;
                case 0:
                      str = '星期日';
                      break;
              }
              this.dateData.push({
                label: str,
                time: month + '/' + date,
                showTime: ShowTime
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
        .time {
          padding-top: 10px
        }
        .lable {
          padding-bottom: 10px
        }
        .current-date {
          background: linear-gradient(90deg,#eccbab, #dbb16f 100%);
        }
    }
}
</style>