<template>
  <div id="Livelist">
    <h4>房间管理</h4>
    <el-table :data="tableData" style="width: 95%">
      <el-table-column prop="code" label="房间号" width="300" align="center"> </el-table-column>
      <el-table-column prop="name" label="房间主播" align="center"> </el-table-column>
      <el-table-column prop="date" label="最近开播" width="300" align="center"> </el-table-column>
       <el-table-column
       label="管理" 
        width="100">
          <template slot-scope="scope">
              <div @click="goLiveHome(scope.row)" class="live-btn">进入直播间</div>
          </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { userLiveList } from '@/api'
export default {
  name: "Livelist",
  data() {
    return {
      tableData: [],
      user: {},
      token: ''
    };
  },
  created() {
    this.user = JSON.parse(window.localStorage.getItem("user"))
    this.token = window.localStorage.getItem("token")
    this.getUserLiveList()
  },
  methods: {
    getUserLiveList() {
      const params = {
        uid: this.user.id,
        token: this.token,
        p: 1,
      }
      userLiveList(params).then(res => {
        this.tableData = res.info
        console.log(res, 'res---房间')
      })
    }
  },
};
</script>

<style lang="stylus">
#Livelist {
  padding: 30px 10px;
  h4 {
    font-size: 18px;
    font-weight: 600;
    border-left: 3px solid #ffc71c;
    padding-left: 10px;
    margin-bottom: 40px;
  }
  .el-table el-table__header-wrapper {
    background: #EBF0FB;
  }
  .live-btn {
    color: #DBB16F;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>