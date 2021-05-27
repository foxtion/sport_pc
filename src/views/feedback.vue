<template>
  <div id="feedback">
    <h4>
      <p>我的反馈</p>
      <p @click="$router.push({ name: 'retroaction' })">
        <i class="el-icon-edit-outline"></i>
        <span>去反馈</span>
      </p>
    </h4>
    <div v-if="feedbackList.length > 0">
      <div
        style="padding: 10px 50px"
        v-for="item in feedbackList"
        :key="item.id"
        @click="$router.push({ name: 'dispose', query: { id: item.id } })"
      >
        <div
          style="display: flex; justify-content: space-between; cursor: pointer"
        >
          <p>
            <i class="el-icon-chat-line-square"></i>
            <span style="margin-left: 13px; color: #666">{{
              item.content
            }}</span>
          </p>
          <p>
            <span
              style="margin-right: 20px; font-weight: 700; color: #575be5"
              v-if="item.status == 0"
              >未处理</span
            >
            <span style="margin-right: 20px; font-weight: 700" v-else
              >已处理</span
            >
            <span style="color: #666">{{ item.addtime }}</span>
          </p>
        </div>
        <el-divider></el-divider>
      </div>
    </div>
    <no-data v-else></no-data>
  </div>
</template>

<script>
import noData from "@/components/noData.vue";
export default {
  name: "feedback",
  components: {
    noData,
  },
  data() {
    return {
      feedbackList: [],
    };
  },
  mounted() {
    this.$SERVER
      .feedbackList(
        JSON.parse(window.localStorage.getItem("userInfo")).id,
        window.localStorage.getItem("token"),
        1
      )
      .then((res) => {
        if (res.data.info) {
          this.feedbackList = res.data.info;
        }
      });
  },
};
</script>

<style lang="stylus">
#feedback {
  padding: 32px 0 0 47px;

  h4 {
    font-size: 18px;
    font-weight: 600;
    border-left: 3px solid #ffc71c;
    padding-left: 10px;
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
    padding-right: 50px;

    span, i {
      color: #575be5;
      font-weight: normal;
      cursor: pointer;
    }

    span {
      font-size: 14px;
    }
  }
}
</style>