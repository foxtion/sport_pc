<template>
  <div id="myMoney">
    <div>
      <div>
        <el-tabs v-model="activeName" @tab-click="serchData">
          <el-tab-pane label="消费记录" name="consumption">
            <div v-if="tableData.length">
              <div class="tab-item">
                <el-row :gutter="5" class="input-box">
                  <el-form :inline="true" :model="queryInfo" ref="queryInfoRef" size="small">
                    <el-form-item label="消费类型:" prop="type">
                      <el-select v-model="queryInfo.type" clearable>
                          <el-option label="礼物" value="1"></el-option>
                          <el-option label="开通贵族" value="2"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="消费时间:" prop="time">
                      <el-date-picker v-model="time" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" ></el-date-picker>
                    </el-form-item>
                  </el-form>
                </el-row>
                <div class="search" @click="serchData">查询</div>
              </div>
              <el-table :data="tableData" style="width: 94%; margin-left:30px" class="table-data-box" height="440" border>
                <el-table-column prop="addtime" label="消息时间" width="200" align="center"> </el-table-column>
                <el-table-column prop="live_uid" label="房间号" width="160" align="center"> </el-table-column>
                <el-table-column prop="live_nick_name" label="主播" width="100" align="center"> </el-table-column>
                <el-table-column prop="gift" label="消费内容" width="250" align="center"> </el-table-column>
                <el-table-column prop="type" label="消费类型" width="130" align="center"> </el-table-column>
                <el-table-column prop="count" label="消费龙钻" width="110" align="center">
                  <template slot-scope="scope">
                    <span style="color: #CE995B">{{scope.row.count}}</span>龙钻
                  </template>
                </el-table-column>
              </el-table>
              <div style="display: flex; justify-content: center;margin-top: 16px;" v-if="total">
                <el-pagination background :page-size="20" layout="prev, pager, next" :total="total" @current-change="handleCurrentChange"></el-pagination>
              </div>
              <div v-else style="height: 48px"></div>
            </div>
            <div v-else style="height: 558px;display: flex; justify-content: center;align-items: center">
              <img src="@/assets/no-data.png" height="355px" />
            </div>
          </el-tab-pane>
          <el-tab-pane label="收支明细" name="spending">
            <div v-if="tableData.length">
              <div class="tab-item">
                <el-row :gutter="5" class="input-box">
                  <el-form :inline="true" :model="queryInfo" ref="queryInfoRef" size="small">
                    <el-form-item label="收入类型:" prop="type">
                      <el-select v-model="queryInfo.type" clearable>
                          <el-option label="礼物" value="1"></el-option>
                          <el-option label="开通贵族" value="2"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="消费时间:" prop="time">
                      <el-date-picker v-model="time" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" ></el-date-picker>
                    </el-form-item>
                  </el-form>
                </el-row>
                <div class="search" @click="serchData">查询</div>
              </div>
              <el-table :data="tableData" style="width: 94%; margin-left:30px" class="table-data-box" height="440" border>
                <el-table-column prop="addtime" label="收入时间" width="180" align="center"> </el-table-column>
                <el-table-column prop="orderno" label="订单号" width="180" align="center"> </el-table-column>
                <el-table-column prop="date" label="用户昵称" width="100" align="center"> </el-table-column>
                <el-table-column prop="gift" label="消费内容" width="217" align="center"> </el-table-column>
                <el-table-column prop="type" label="消费类型" width="170" align="center"> </el-table-column>
                <el-table-column prop="count" label="收入龙钻" width="100" align="center">
                  <template slot-scope="scope">
                    <span style="color: #CE995B">{{scope.row.count}}</span>龙钻
                  </template>
                </el-table-column>
              </el-table>
              <div style="display: flex; justify-content: center;margin-top: 16px;" v-if="total">
                <el-pagination background :page-size="20" layout="prev, pager, next" :total="total" @current-change="handleCurrentChange"></el-pagination>
              </div>
              <div v-else style="height: 48px"></div>
            </div>
            <div v-else style="height: 558px;display: flex; justify-content: center;align-items: center">
              <img src="@/assets/no-data.png" height="355px" />
            </div>
          </el-tab-pane>
          <el-tab-pane label="提现记录" name="withdrawal">
            <div v-if="tableData.length">
              <div class="tab-item">
                <el-row :gutter="5" class="input-box">
                  <el-form :inline="true" :model="queryInfo" ref="queryInfoRef" size="small">
                    <el-form-item label="状态:" prop="type">
                      <el-select v-model="queryInfo.type" clearable>
                          <el-option label="审核中" value="0"></el-option>
                          <el-option label="审核通过" value="1"></el-option>
                          <el-option label="拒绝" value="2"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="消费时间:" prop="time">
                      <el-date-picker v-model="time" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" ></el-date-picker>
                    </el-form-item>
                  </el-form>
                </el-row>
                <div class="search" @click="serchData">查询</div>
              </div>
              <el-table :data="tableData" style="width: 94%; margin-left:30px" class="table-data-box" height="440" border>
                <el-table-column prop="addtime" label="提现时间" width="140" align="center"> </el-table-column>
                <el-table-column prop="orderno" label="订单号" width="155" align="center"> </el-table-column>
                <el-table-column prop="pay_text" label="提现方式" width="90" align="center"> </el-table-column>
                <el-table-column prop="money" label="提现金额" width="80" align="center"> </el-table-column>
                <el-table-column prop="extractable_money" label="实际到账金额" width="120" align="center"> </el-table-column>
                <el-table-column prop="status_text" label="提现状态" width="80" align="center"> </el-table-column>
                <el-table-column prop="account" label="详情"  width="285" align="center"> </el-table-column>
              </el-table>
              <div style="display: flex; justify-content: center;margin-top: 16px;" v-if="total">
                <el-pagination background :page-size="20" layout="prev, pager, next" :total="total" @current-change="handleCurrentChange"></el-pagination>
              </div>
              <div v-else style="height: 48px"></div>
            </div>
            <div v-else style="height: 558px;display: flex; justify-content: center;align-items: center">
              <img src="@/assets/no-data.png" height="355px" />
            </div>
          </el-tab-pane>
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
      tableData: [],
      queryInfo: {},
      time: '',
      activeName: 'consumption',
      user: {},
      token: '',
      total: 0,
      currentPage: 1
    };
  },
  created() {
    this.user = JSON.parse(window.localStorage.getItem("user"))
    this.token = window.localStorage.getItem("token")
    this.serchData()
  },
  methods: {
    serchData() {
      this.tableData = []
      if (this.activeName == 'consumption') { // 消费记录
        const params = {
          uid: this.user.id,
          token: this.token,
          type: this.queryInfo.type,
          starttime: this.time[0],
          endtime: this.time[1],
          p: this.currentPage,
          source: 'pc'
        }
        rewardRecord(params).then(res => {
          this.tableData = res.info.list
          this.total = Number(res.info.total)
        })
      }
      if (this.activeName == 'spending') { // 收支明细
        const params = {
          uid: this.user.id,
          token: this.token,
          type: this.queryInfo.type,
          starttime: this.time[0],
          endtime: this.time[1],
          p: this.currentPage,
          source: 'pc'
        }
        incomeDetails(params).then(res => {
          this.tableData = res.info.list
          this.total = Number(res.info.total)
        })
      }
      if (this.activeName == 'withdrawal') { // 提现记录
        const params = {
          uid: this.user.id,
          token: this.token,
          status: this.queryInfo.type,
          starttime: this.time[0],
          endtime: this.time[1],
          p: this.currentPage,
          source: 'pc'
        } 
        extracCashList(params).then(res => {
          this.tableData = res.info.list
          this.total = Number(res.info.total)
        })
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.serchData()
    }
  },
};
</script>

<style lang="stylus">
#myMoney {
  // padding: 0 0 0 30px;
  .el-tabs__nav-scroll {
    margin-left: 30px;
  }
  .el-tabs__active-bar {
    background-color: #dbb16f;
  }
  .el-tabs__item {
    color: #666666;
  }
  .el-tabs__item.is-active {
    color: #333333;
    font-weight: 500;
  }
  .el-table td, .el-table th {
    padding: 8px 0;
  }
  >h4 {
    font-size: 18px;
    font-weight: 600;
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #e6eaf3;

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
  // .table-data-box {
  //   height: 400px;
  //   overflow: auto;
  // }
  
  .el-table__body-wrapper::-webkit-scrollbar{
    display: none;
  }
}
.el-table .has-gutter th, .el-table .has-gutter tr {
  background: #EBF0FB;
}
.tab-item {
  display: flex;
  margin-top: 20px;
  margin-left: 30px;
}
.search {
  cursor: pointer;
  width: 60px;
  text-align: center;
  height: 32px;
  line-height: 32px;
  opacity: 1;
  background: linear-gradient(90deg,#eccbab, #dbb16f 100%);
  border-radius: 4px;
  margin-left: 30px;
  font-size: 14px;
}
</style>