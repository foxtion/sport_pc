<template>
  <div id="Livelist">
    <h4 class="hfour"><span>房间管理</span></h4>
    <div style="padding: 0 20px">
      <el-table :data="tableData" style="width: 95%" border>
        <el-table-column
          prop="stream"
          label="房间号"
          width="300"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="nick_name" label="房间主播" align="center">
        </el-table-column>
        <el-table-column
          prop="starttime"
          label="最近开播"
          width="300"
          align="center"
        ></el-table-column>
        <el-table-column label="管理" width="100">
          <template slot-scope="scope">
            <div @click="goLiveHome(scope.row)" class="live-btn">
              进入直播间
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { userLiveList } from "@/api";
export default {
  name: "Livelist",
  data() {
    return {
      tableData: [],
      user: {},
      token: "",
    };
  },
  created() {
    this.user = JSON.parse(window.localStorage.getItem("user"));
    this.token = window.localStorage.getItem("token");
    this.getUserLiveList();
  },
  methods: {
    getUserLiveList() {
      const params = {
        uid: this.user.id,
        token: this.token,
        p: 1,
      };
      userLiveList(params).then((res) => {
        this.tableData = res.info;
        console.log(res, "res---房间");
      });
    },
  },
};
</script>

<style lang="stylus">
#Livelist {
  // padding: 30px 10px;
  .el-table el-table__header-wrapper {
    background: #EBF0FB;
  }

  .live-btn {
    color: #DBB16F;
    text-decoration: underline;
    cursor: pointer;
  }
}

.hfour {
  font-size: 18px;
  font-weight: 600;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #e6eaf3;
  margin-bottom: 15px;

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