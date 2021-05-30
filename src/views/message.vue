<template>
  <div id="message">
   <h4 class="hfour"><span>我的消息</span></h4>
    <div v-if="msglist.length">
        <el-table :data="msglist" style="width: 95%;margin:0 auto;" height="520" border>
          <el-table-column prop="addtime" label="消息时间" width="200" align="center"> </el-table-column>
          <el-table-column prop="content" label="消息内容" align="center"> </el-table-column>
          <el-table-column prop="type" label="消息类型" width="200" align="center"> </el-table-column>
        </el-table>
    </div>
    <div v-else style="height: 558px;display: flex; justify-content: center;align-items: center">
      <div>
        <img src="@/assets/no-data.png" height="146px" />
        <div style="font-size: 14px; color: #999999;text-align: center;">暂无数据</div>
      </div>
    </div>
  </div>
</template>

<script>
import noData from "@/components/noData.vue"
import { MessageNoticeList } from '@/api'
export default {
  name: "message",
  components: {
    noData
  },
  data() {
    return {
      msglist: []
    };
  },
  mounted() {
    this.user = JSON.parse(window.localStorage.getItem("user"))
    this.token = window.localStorage.getItem("token")
  },
  created() {
    this.getMessageNoticeList()
  },
  methods: {
    getMessageNoticeList() {
      const user = JSON.parse(window.localStorage.getItem("user"))
      const params = {
        uid: user.id,
        token: window.localStorage.getItem("token"),
        p: this.currentPage,
        source: 'pc'
      }
      MessageNoticeList(params).then(res => {
        this.msglist = res.info
      })
    },
  },
};
</script>

<style lang="stylus">
#message {
  // padding: 32px 0 0 47px;

  // h4 {
  //   font-size: 18px;
  //   font-weight: 600;
  //   border-left: 3px solid #ffc71c;
  //   padding-left: 10px;
  //   margin-bottom: 40px;
  // }
  .el-table .has-gutter th, .el-table .has-gutter tr {
    background: #EBF0FB;
  }
}
.hfour {
  font-size: 18px;
  font-weight: 600;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #e6eaf3;
  margin-bottom :10px;
  span {
    display: inline-block;
    font-size: 14px;
    font-family: PingFang SC, PingFang SC-Medium;
    font-weight: 500;
    text-align: center;
    color: #333333;
    height: 100%;
    border-bottom: 1px solid #dbb16f;
    line-height: 60px;
    margin-left: 20px;
  }
}
</style>