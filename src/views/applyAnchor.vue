<template>
    <div id="myProfile">
        <h4>申请主播</h4>
        <div style="position: relative">
            <img src="../assets/img/applyAnchor.png"/>
            <el-button type="primary" style="position: absolute;top: 520px;left: 315px;padding: 0px 20px;
            margin-right: 40px;border: 0px;width: 290px;height: 90px;background-color:transparent " @click="Submit"></el-button>
        </div>
    </div>
</template>

<script>
    import { UserBindAccount} from '@/api'
    export default {
        name: "bindBankCard",
        data() {
            return {
            };
        },
        mounted() {
            this.user = JSON.parse(window.localStorage.getItem("user"))
            this.token = window.localStorage.getItem("token")
            console.log(this.token)
            if(this.user){
                this.iszb = this.user.iszb;
                this.user_nicename = this.user.user_nicename;
                this.sex = this.user.sex;
                this.birthday = this.user.birthday;
                this.user_email = this.user.user_email;
            }
        },

        methods: {
            async Submit() {
                    this.$router.push({name:"realName"})
            }
        },
    };
</script>

<style lang="stylus">
    #myProfile {
        padding: 32px 0 0 47px;
        h4 {
            font-size: 18px;
            font-weight: 600;
            border-left: 3px solid #ffc71c;
            padding-left: 10px;
            margin-bottom: 40px;
        }
    }
</style>