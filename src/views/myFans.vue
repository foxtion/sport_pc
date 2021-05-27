<template>
  <div id="myFans">
    <h4>
      我的粉丝
      <span style="font-size: 14px; margin-left: 15px">{{ nums }}</span>
    </h4>
    <ul style="padding-right: 100px">
      <li v-for="item in info" :key="item.uid">
        <div style="display: flex; align-items: center; padding: 0 32px">
          <el-tag type="info" effect="dark" size="small">
            Lv.{{ item.user.level }}
          </el-tag>
          <el-avatar
            size="large"
            :src="item.user.avatar"
            style="margin: 0 30px"
          ></el-avatar>
          <span>{{ item.user.user_nicename }}</span>
        </div>
        <el-divider></el-divider>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "myFans",
  data() {
    return {
      info: [],
      nums: 0,
    };
  },
  mounted() {
    this.$SERVER
      .myFans(
        JSON.parse(window.localStorage.getItem("userInfo")).id,
        window.localStorage.getItem("token")
      )
      .then((res) => {
        if (res.data.code == 0) {
          if (res.data.info) {
            this.nums = res.data.nums;
            this.info = res.data.info;
          }
        }
      });
  },
  methods: {},
};
</script>

<style lang="stylus">
#myFans {
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