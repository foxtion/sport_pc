<template>
  <div id="dispose">
    <h4 @click="goBack"><i class="el-icon-arrow-left"></i>处理情况</h4>
    <ul class="disposelist">
      <li>
        <span>反馈内容：</span>
        <span>{{ feedbackDetail.content }}</span>
      </li>
      <li>
        <span>反馈图片：</span>
        <van-image
          fit="contain"
          :src="feedbackDetail.thumb"
          style="vertical-align: text-top"
        />
      </li>
      <li>
        <span>联系方式：</span>
        <span>{{ feedbackDetail.model }}</span>
      </li>
      <li>
        <span>创建时间：</span>
        <span>{{ feedbackDetail.addtime }}</span>
      </li>
      <li>
        <span>处理结果：</span>
        <span style="font-weight: 700">{{
          feedbackDetail.status == 0 ? "未处理" : "已处理"
        }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "dispose",
  data() {
    return {
      feedbackDetail: {},
    };
  },
  mounted() {
    this.$SERVER
      .feedbackDetail(
        JSON.parse(window.localStorage.getItem("userInfo")).id,
        window.localStorage.getItem("token"),
        this.$route.query.id
      )
      .then((res) => {
        if (res.data.code == 0) {
          this.feedbackDetail = res.data.info;
        }
      });
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="stylus">
#dispose {
  padding: 32px 0 0 47px;

  h4 {
    cursor: pointer;
    margin-bottom: 40px;
  }

  .disposelist {
    padding-left: 62px;

    li {
      margin-bottom: 25px;

      span:first-child {
        font-weight: 700;
        margin-right: 5px;
      }
    }
  }
}
</style>