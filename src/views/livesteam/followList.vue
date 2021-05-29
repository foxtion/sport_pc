<template>
  <div>
    <div class="content-top">
      <span></span>
      <h3 class="fonth3">我的关注</h3>
    </div>
    <div>
      <focus></focus>
    </div>
  </div>
</template>

<script>
import focus from "./focus";
import noData from "@/components/noData.vue";
import { LiveClass, FollowLiveList } from "@/api";
export default {
  name: "LiveType",
  components: {
    noData,
    focus,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="stylus" scoped>
.content-top {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  span {
    display: inline-block;
    width: 28px;
    height: 28px;
    background: url('../../assets/img/mygz.png') no-repeat center;
  }

  .fonth3 {
    margin-left: 5px;
    font-size: 22px;
    font-family: PingFang SC, PingFang SC-Medium;
    font-weight: 600;
    text-align: left;
    color: #333333;
  }
}
</style>