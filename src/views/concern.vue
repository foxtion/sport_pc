<template>
  <div id="concern">
    <h4 class=""><span>我的关注</span></h4>
    <div v-if="tableData.length">
      <focus></focus>
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
import focus from "./livesteam/focus";
import { userFollowAnchor } from "@/api";
export default {
  name: "concern",
  components: { focus },

  data() {
    return {
      user: {},
      token: "",
      tableData:[]
    };
  },
  created() {
    this.user = JSON.parse(window.localStorage.getItem("user"));
    this.token = window.localStorage.getItem("token");
    this.getUserFollowAnchor();
  },
  methods: {
    getUserFollowAnchor() {
      const params = {
        uid: this.user.id,
        token: this.token,
        p: 1,
      };
      userFollowAnchor(params).then((res) => {
        this.tableData = res.info;
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
#concern {
  >div {
    padding: 0 0 0 30px;
  }

  >h4 {
    font-size: 18px;
    font-weight: 600;
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #e6eaf3;

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

  .concern-main {
    .host-name {
      display: flex;
      line-height: 36px;
      font-weight: 400;
      color: #333333;

      .img {
        height: 36px;
        margin-right: 8px;
        margin-bottom: 20px;
      }
    }

    .live-house-info {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #999999;
      margin-bottom: 12px;

      .info-left {
        margin-right: 150px;
      }

      .info-right {
        float: right;
        color: #CE995B;
        cursor: pointer;
      }
    }

    .live-video-box {
      display: flex;

      .live-video {
        margin-right: 29px;

        .video-img {
          height: 100px;
          width: 176px;
        }

        .video-title {
          margin-top: 8px;
          font-size: 14px;
          padding-left: 2px;
        }
      }

      .divider {
        width: 1px;
        height: 80px;
        margin-top: 10px;
        border-left: 1px solid #E6EAF3;
        margin-right: 30px;
      }
    }
  }
}
</style>
