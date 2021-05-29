<template>
  <div id="concern">
    <h4>我的关注</h4>
    <div class="concern-main">
        <div class="host-name">
            <img src="@/assets/level-20.png" class="img">
            <p>主播花花</p>
        </div>
        <div class="live-house-info">
            <div style="display: flex">
                <p class="info-left">直播间<span>(开播中)</span></p>
                <p>视频（共125个）</p>
            </div>
            <p class="info-right">查看全部<img src="@/assets/icon-more.png" width="14px"></p>
        </div>
        <div style="display: flex">
            <div class="live-video-box">
                <div class="live-video">
                    <img src="@/assets/level-20.png" class="video-img">
                    <p class="video-title">直播花样滑冰世纪锦标赛</p>
                </div>
                <div class="divider"></div>
            </div>
            <div class="live-video-box">
                <div class="live-video">
                    <img src="@/assets/level-20.png" class="video-img">
                    <p class="video-title">直播花样滑冰世纪锦标赛</p>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { userFollowAnchor } from '@/api'
export default {
    name: "concern",
    components: {
    },

    data() {
        return {
         user: {},
         token: ''
        };
    },
    created() {
        this.user = JSON.parse(window.localStorage.getItem("user"))
        this.token = window.localStorage.getItem("token")
        this.getUserFollowAnchor()
    },
    methods: {
        getUserFollowAnchor() {
            const params = {
                uid: this.user.id,
                token: this.token,
                p: 1,
            }
            userFollowAnchor(params).then(res => {
                this.tableData = res.info
                console.log(res, 'res---房间')
            })
        }
    },
};
</script>

<style lang="stylus">
#concern {
    padding: 32px 0 32px 47px;

    >div {
        padding: 0 60px 0 0;
    }

    >h4 {
        font-size: 18px;
        font-weight: 600;
        border-left: 3px solid #ffc71c;
        padding-left: 10px;
        margin-bottom: 20px;
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
                margin-bottom: 20px
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