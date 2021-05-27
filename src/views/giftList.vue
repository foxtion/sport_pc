<template>
  <div id="giftList">
    <h4>我的礼物</h4>
    <el-table :data="tableData" border style="width: 95%">
      <el-table-column label="时间" prop="addtime"></el-table-column>
      <el-table-column label="粉丝">
        <template slot-scope="scope">
          <span>{{ scope.row.user.user_nicename }}</span>
        </template>
      </el-table-column>
      <el-table-column label="礼物名称" prop="giftname"></el-table-column>
      <el-table-column label="礼物数量" prop="giftcount"></el-table-column>
      <el-table-column label="礼物总金额" prop="totalcoin"></el-table-column>
    </el-table>
    <el-pagination
      style="text-align: center; margin-top: 20px"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="21"
      layout="total, prev, pager, next"
      :total="count"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "giftList",
  data() {
    return {
      currentPage1: 1,
      tableData: [],
      count: 0,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$SERVER
        .myIncome(
          JSON.parse(window.localStorage.getItem("userInfo")).id,
          window.localStorage.getItem("token"),
          this.currentPage1
        )
        .then((res) => {
          if (res.data.code == 0) {
            this.tableData = res.data.info;
            this.count = res.data.count;
          }
        });
    },
    handleCurrentChange(val) {
      this.currentPage1 = val;
      this.getData();
    },
  },
};
</script>

<style lang="stylus">
#giftList {
  padding: 32px 0 32px 47px;

  >h4 {
    font-size: 18px;
    font-weight: 600;
    border-left: 3px solid #ffc71c;
    padding-left: 10px;
    margin-bottom: 40px;
  }
}
</style>