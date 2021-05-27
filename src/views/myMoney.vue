<template>
  <div id="message">
    <h4>我的钱包</h4>
    <div>
      <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="消费记录" name="consumption">
            <div class="tab-item">
              <el-row :gutter="5" class="input-box">
                <el-form :inline="true" :model="queryInfo" ref="queryInfoRef"  size="mini">
                  <el-form-item label="消费类型:" prop="type">
                    <el-select v-model="queryInfo.orderStatus" size="mini" clearable>
                      <el-option
                      v-for="item in orderStatusList"
                      :key="item.listvalue"
                      :value="item.listkey"
                      :label="item.listvalue"
                        />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="消费时间:" prop="time">
                    <el-date-picker v-model="queryInfo.time" type="datetime" placeholder="选择日期时间" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-form>
              </el-row>
              <div class="search">查询</div>
            </div>
            <el-table :data="msglist" style="width: 100%">
              <el-table-column prop="date" label="消息时间" width="300" align="center"> </el-table-column>
              <el-table-column prop="date" label="房间号" align="center"> </el-table-column>
              <el-table-column prop="date" label="主播" width="300" align="center"> </el-table-column>
              <el-table-column prop="date" label="消费内容" width="300" align="center"> </el-table-column>
              <el-table-column prop="date" label="消费类型" width="300" align="center"> </el-table-column>
              <el-table-column prop="date" label="消费龙钻" width="300" align="center"> </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="收支明细" name="spending">收支明细</el-tab-pane>
          <el-tab-pane label="提现记录" name="withdrawal">提现记录</el-tab-pane>
        </el-tabs>


      </div>
    </div>
  </div>
</template>

<script>
import noData from "@/components/noData.vue"; 
import { incomeDetails, rewardRecord,  extracCashList} from '@/api'
export default {
  name: "myMoney",
  components: {
    noData,
  },
  data() {
    return {
      msglist: [],
      queryInfo: {},
      activeName: 'consumption'
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
.tab-item {
  display: flex;
  margin-top: 20px;
}
.search {
  width: 60px;
  text-align: center;
  height: 28px;
  line-height: 28px;
  opacity: 1;
  background: linear-gradient(90deg,#eccbab, #dbb16f 100%);
  border-radius: 4px;
  margin-left: 30px;
}
</style>