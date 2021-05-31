<template>
  <div class="focus">
    <ul>
      <li v-for="(item, index) in 10" :key="index">
        <div class="usericon">
          <img src="../../assets/img/tv.png" alt="" />
        </div>
        <div class="gzcontent">
          <p>
            诺坎普之巴塞罗纳 <i>{{ $store.state.user.info.level }}</i>
          </p>
          <span>突然发现，能够不变，有时候就是一种最难得的幸福。</span>
        </div>
        <div class="isgz">
          <span>取消关注</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { userFollowAnchor, FollowAnchor } from "@/api";
export default {
  data() {
    return {
      user: {},
      token: "",
      plist: "1",
    };
  },
  mounted() {
    this.user = JSON.parse(window.localStorage.getItem("user"));
    this.token = window.localStorage.token;
    this.getuserFollowAnchor();
  },
  methods: {
    getuserFollowAnchor() {
      //用户关注主播列表
      const params = {
        uid: this.user.id,
        token: this.token,
        p: this.plist,
        source: "pc",
      };
      userFollowAnchor(params).then((res) => {
        console.log(res);
      });
    },
    getFollowAnchor() {
      //用户关注主播列表
      const params = {
        uid: this.user.id,
        token: this.token,
        live_uid: this.plist,
        source: "pc",
      };
      FollowAnchor(params).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
.focus {
  ul {
    display: flex;
    flex-wrap: wrap;

    li {
      padding: 20px;
      box-sizing: border-box;
      display: flex;
      width: 468px;
      height: 100px;
      opacity: 1;
      background: #ffffff;
      border: 1px solid #e6eaf3;
      border-radius: 5px;
      margin-top: 16px;
      margin-right: 20px;

      .usericon {
        width: 60px;
        height: 60px;

        img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }
      }

      .gzcontent {
        flex: 1;
        margin-left: 12px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        p {
          font-size: 14px;
          font-weight: 400;
          text-align: left;
          color: #333333;
          display: flex;
          align-items: center;

          i {
            display: inline-block;
            width: 43px;
            height: 21px;
            background: url('../../assets/img/1-10.png') no-repeat center;
            font-size: 10px;
            font-style: normal;
            color: #fff;
            padding-left: 24px;
            line-height: 21px;
          }
        }

        span {
          font-size: 13px;
          font-weight: 400;
          text-align: left;
          color: #999999;
          line-height: 16px;
        }
      }

      .isgz {
        width: 120px;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        span {
          display: block;
          width: 80px;
          height: 30px;
          opacity: 1;
          background: #ffffff;
          border: 1px solid rgba(118, 128, 156, 0.5);
          border-radius: 5px;
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          text-align: center;
          color: #76809c;
          line-height: 30px;
        }
      }
    }
  }
}
</style>
