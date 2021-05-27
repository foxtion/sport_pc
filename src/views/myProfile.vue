<template>
    <div id="myProfile">
    <h4>我的资料</h4>
    <div>
        <div class="baseInput">
            <p>昵称:</p>
            <el-input style="width: 664px" v-model="user_nicename"></el-input>
        </div>

        <div class="baseInput">
            <p>邮箱:</p>
            <el-input style="width: 664px" v-model="user_email"></el-input>
        </div>

        <div style="display: flex">
            <div class="baseInput" style="margin-right: 40px">
                <p>性别:</p>
                <el-select v-model="sex">
                    <el-option label="保密" value="0"></el-option>
                    <el-option label="男" value="1"></el-option>
                    <el-option label="女" value="2"></el-option>
                </el-select>
            </div>
            <div class="baseInput">
                <p>出生日期:</p>
                <el-date-picker type="date" placeholder="选择日期" v-model="birthday" value-format="yyyy-MM-dd"></el-date-picker>
            </div>
        </div>
        <div class="baseInput">
            <p>开播提醒:</p>
            <el-radio-group v-model="start_live_remind">
                <el-radio label="1">开启</el-radio>
                <el-radio label="0">关闭</el-radio>
            </el-radio-group>
        </div>

        <div class="baseInput">
            <p>开赛提醒:</p>
            <el-radio-group v-model="start_game_remind">
                <el-radio label="1">开启</el-radio>
                <el-radio label="0">关闭</el-radio>
            </el-radio-group>
        </div>
        
        <div class="baseInput">
            <p>小窗播放:</p>
            <el-radio-group v-model="small_window_play">
                <el-radio label="1">开启</el-radio>
                <el-radio label="0">关闭</el-radio>
            </el-radio-group>
        </div>

        <div class="baseInput" v-if="iszb == '1'">
            <p>直播公告:</p>
            <el-input style="width: 664px" v-model="notice"></el-input>
        </div>
        <el-button type="primary" style="background: #f8c21b; border-color: #f8c21b" @click="set">保存更改</el-button>
    </div>
    </div>
</template>

<script>
import { UserBindAccount} from '@/api'
export default {
    name: "myProfile",
    data() {
        return {
            sex: "0",
            user_nicename: "",
            birthday: "",
            user_email: "",
            notice: "",
            start_live_remind: '1',
            start_game_remind: '1',
            small_window_play: '1',
            iszb: "0",
            user:{}
        };
    },
    mounted() {
        this.user = JSON.parse(window.localStorage.getItem("user"))
        console.log(this.user)
        if(this.user){           
            this.iszb = this.user.iszb;
            this.user_nicename = this.user.user_nicename;
            this.sex = this.user.sex;
            this.birthday = this.user.birthday;
            this.user_email = this.user.user_email;
        }    
    },

    methods: {
        async set() {
            let obj = {};
            if(this.user_nicename != this.user.user_nicename){
                obj.user_nicename = this.user_nicename
            }

            if(this.sex != this.user.sex){
                obj.sex = this.sex
            }
            
            if(this.birthday != this.user.birthday){
                obj.birthday = this.birthday;
            }
            
            if(this.start_live_remind != this.user.start_live_remind){
                obj.start_live_remind = this.start_live_remind;
            }
            
            if(this.start_game_remind != this.user.start_game_remind){
                obj.start_game_remind = this.start_game_remind;
            }

            if(this.small_window_play != this.user.small_window_play){
                obj.small_window_play = this.small_window_play;
            }

            if(this.user_email != this.user.user_email && this.user_email != ''){
                let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
                if(!reg.test(this.user_email)){
                     this.$message({
                        message: "邮箱格式错误",
                        type: "warning",
                    });

                    return
                }else{
                    obj.user_email = this.user_email;
                }
            }

            if(JSON.stringify(obj) == "{}"){
                this.$message({
                    message: "请选择要修改的信息",
                    type: "warning",
                });

                return
            }
  
            if (this.iszb == "1") {
                obj.notice = this.notice;
            }

            let data = {
                "uid": this.user.id,
                "fields" : JSON.stringify(obj)
            }

            let res = await UserBindAccount(data)
            if(res.code == 0){
                this.$message({
                    message: res.msg,
                    type: "success",
                });
                this.user.user_nicename = this.user_nicename;
                this.user.sex = this.sex;
                this.user.birthday = this.birthday;       
                this.user.user_email = this.user_email;       
                window.localStorage.setItem("user", JSON.stringify(this.user));
            }else{
                this.$message.error(res.msg);
            }         
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

    .baseInput {
        margin-bottom: 30px;

        >p {
            margin-bottom: 4px;
            font-size: 14px;
            color: #777;
        }
    }
}
</style>