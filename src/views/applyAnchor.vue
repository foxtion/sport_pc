<template>
  <div id="myProfile">
    <h4 class="hfour"><span>申请主播</span></h4>

    <div style="position: relative; display:flex;justify-content: center;">
      <img src="../assets/img/applyAnchor.png" />
      <el-button
        type="primary"
        style="
          position: absolute;
          top: 520px;
          left: 315px;
          padding: 0px 20px;
          margin-right: 40px;
          border: 0px;
          width: 290px;
          height: 90px;
          background-color: transparent;
        "
        @click="Submit"
      ></el-button>
    </div>
  </div>
</template>

<script>
import { UserApplyAnchor,live_auth_info } from "@/api";
export default {
  name: "bindBankCard",
  data() {
    return {};
  },
  mounted() {
    this.user = JSON.parse(window.localStorage.getItem("user"));
    this.token = window.localStorage.getItem("token");
    console.log(this.token);
    if (this.user) {
      this.iszb = this.user.iszb;
      this.user_nicename = this.user.user_nicename;
      this.sex = this.user.sex;
      this.birthday = this.user.birthday;
      this.user_email = this.user.user_email;
    }
  },

  methods: {
    async Submit() {
      if (!this.$store.state.user.isauth && this.$store.state.user.info.is_live == 0) {
        this.$router.push({ name: "realName" });
      } else if(this.$store.state.user.info.is_live == 1) {
        this.$message({
          message: "您已经是主播，无需再次申请。",
          type: "success",
        });
      } else{
        this.$router.push({ name: "anchor" });
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
#myProfile {
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
