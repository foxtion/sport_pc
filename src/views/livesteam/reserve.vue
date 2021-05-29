<template>
  <div id="reserve">
    <div class="content-top">
      <span></span>
      <h3 class="fonth3">我的预约</h3>
    </div>
    <p class="yytime">5月15日</p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
#reserve {
  .content-top {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    span {
      display: inline-block;
      width: 28px;
      height: 28px;
      background: url('../../assets/img/myyuyue.png') no-repeat center;
      position: relative;
      top: 2px;
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

  .yytime {
    font-size: 24px;
    font-family: PingFang SC, PingFang SC-Heavy;
    font-weight: 800;
    text-align: left;
    color: #333333;
    letter-spacing: 0px;
    margin-top: 16px;
  }
}
</style>
