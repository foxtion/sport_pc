<template>
  <div id="Livelist">
    <h4 class="hfour"><span>房间管理</span></h4>
    <div style="padding: 0 30px" v-if="tableData.length">
      <el-table :data="tableData" style="width: 965px" height="520" border>
        <el-table-column
          prop="stream"
          label="房间号"
          width="300"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="nick_name" label="房间主播"  width="220" align="center">
        </el-table-column>
        <el-table-column
          prop="starttime"
          label="最近开播"
          width="300"
          align="center"
        ></el-table-column>
        <el-table-column label="管理" width="150" align="center">
          <template slot-scope="scope">
            <div @click="goLiveHome(scope.row)" class="live-btn">
              进入直播间
            </div>
          </template>
        </el-table-column>
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
      });
    },
    goLiveHome(row) {
      this.$router.push({
        name: "liveRoom",
        query: { liveuid: row.uid, stream: row.stream },
      });
    }
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

  .el-table__body-wrapper::-webkit-scrollbar{
    display: none;
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
    font-size: 20px;
    font-family: PingFang SC, PingFang SC-Medium;
    font-weight: 600;
    text-align: center;
    color: #333333;
    height: 100%;
    border-bottom: 1px solid #dbb16f;
    line-height: 60px;
    margin-left: 20px;
  }
}
</style>
