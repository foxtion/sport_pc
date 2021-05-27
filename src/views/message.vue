<template>
  <div id="message">
    <h4>我的消息</h4>
    <div>
      <div>
        <el-table :data="msglist" style="width: 100%">
          <el-table-column prop="date" label="消息时间" width="300" align="center"> </el-table-column>
          <el-table-column prop="date" label="消息内容" align="center"> </el-table-column>
          <el-table-column prop="date" label="消息类型" width="300" align="center"> </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import noData from "@/components/noData.vue"; 
import { MessageNoticeList } from '@/api'
export default {
  name: "message",
  components: {
    noData,
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
        p: 1,
        source: 'pc'
      }
      MessageNoticeList(params).then(res => {
        this.msglist = res.data.info
        console.log(res, 'res')
      })
    }
  },
};
</script>

<style lang="stylus">
#message {
  padding: 32px 0 0 47px;

  h4 {
    font-size: 18px;
    font-weight: 600;
    border-left: 3px solid #ffc71c;
    padding-left: 10px;
    margin-bottom: 40px;
  }
}
.el-table th, .el-table tr {
  background: #EBF0FB;
}
</style>