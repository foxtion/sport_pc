<template>
    <div id="myProfile">
        <h4>直播设置</h4>
        <div>
            <el-form ref="form" :model="form" label-width="100px" :rules="formRule" >
            <div class="baseInput" style="margin-right: 40px">
                <el-form-item label="直播分类:">
                    <el-select v-model="form.classes">
                        <el-option label="足球" value="0"></el-option>
                        <el-option label="篮球" value="1"></el-option>
                        <el-option label="网球" value="2"></el-option>
                        <el-option label="电竞" value="3"></el-option>
                        <el-option label="其它" value="4"></el-option>
                    </el-select>
                </el-form-item>
            </div>

            <div class="baseInput">
                <el-form-item label="选择赛事:">
                    <el-input style="width: 364px" v-model="form.user_bank"></el-input><span class="text-btn" @click="searchCompetition">查询</span>
                </el-form-item>
            </div>
            <div class="baseInput">
                <el-form-item label="直播标题:">
                    <el-input style="width: 364px" v-model="form.user_bankcity" placeholder="广南U19 vs TT河内U19"></el-input>
                </el-form-item>
            </div>

            <div class="rechargenubms">
                <el-form-item label="聊天室公告:">
                    <el-input style="width: 364px" type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
            </div>

            <div class="baseInput">
                <el-form-item label="推流地址:">
                    <el-input style="width: 364px" v-model="form.user_bankcity" placeholder="广南U19 vs TT河内U19"></el-input> 
                    <span class="text-btn tag-read"
                    :data-clipboard-text="form.user_bankcity"
                    @click="copy">
                        复制地址
                    </span>
                </el-form-item>
            </div>

            <div class="rechargenubms">
                <p>直播状态:<span>未推流</span></p>
            </div>

                <el-button type="primary" style="padding:0 20px;margin-right: 40px;border:0;border-radius: 5px;background: linear-gradient(180deg, rgba(129, 211, 248, 1) 0%, rgba(115, 206, 247, 1) 10%, rgba(2, 167, 240, 1) 87%);
                                                width: 112px;height: 30px;line-height: 30px" @click="Submit">确定</el-button>
                <el-button type="primary" style="padding:0 20px;border:0;border-radius: 5px;background-color: rgba(255, 113, 0, 1);width: 112px;height: 30px;line-height: 30px"
                       @click="overSubmit">结束</el-button>
            </el-form>
        </div>

        <el-dialog
        title="选择赛事"
        :center="true"
        :visible.sync="dialogVisible"
        width="850px"
        :before-close="handleClose">
            <DateWeek ref="dateWeek" @searchCompetitionData="searchCompetitionData"/>
            <div class="dialog-header">
                <div class="dialog-header-left">
                    <span class="date">05月15日</span><p>足球<span style="color: #DBB16F">332场</span>比赛</p>
                    <el-select v-model="gomeType" class="select-gome" size="mini">
                        <el-option label="足球" value="0"></el-option>
                        <el-option label="篮球" value="1"></el-option>
                        <el-option label="网球" value="2"></el-option>
                        <el-option label="电竞" value="3"></el-option>
                        <el-option label="其它" value="4"></el-option>
                    </el-select>
                </div> 
                <p class="set-my-gome">设置自定义赛事</p>
            </div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="tiem" label="" width="80"> </el-table-column>
                <el-table-column prop="name" label="" width="80"> </el-table-column>
                <el-table-column prop="status" label="" width="120"></el-table-column>
                <el-table-column label="" width="300">
                    <template slot-scope="scope">
                        <span>{{ scope.row.aa }} VS {{ scope.row.bb }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    fixed="right"
                    width="100">
                    <template slot-scope="scope">
                        <div @click="convention(scope.row)">预约</div>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import DateWeek from './dateWeek'
    import { CreateRoom, LiveStream, appointment} from '@/api'
    export default {
        name: "LiveSet",
        components: {
            DateWeek
        },
        data() {
            return {
                form: {
                    desc: '',
                    classes: "0",
                    user_bank:"",
                    user_bankcity:"",
                },
                user_nicename: "",
                birthday: "",
                user_email: "",
                notice: "",
                start_live_remind: '1',
                start_game_remind: '1',
                small_window_play: '1',
                iszb: "0",
                user:{},
                user_bank:"",
                user_bankcity:"",
                user_cardnum:"",
                token:"",
                dialogVisible: false,
                tableData: [
                    {
                        tiem: '14:55',
                        name: '中超',
                        status: '未开始',
                        aa: '莱斯特城',
                        bb: '西汉姆联',
                    },
                    {
                        tiem: '14:55',
                        name: '中超',
                        status: '未开始',
                        aa: '莱斯特城',
                        bb: '西汉姆联',
                    }
                ],
                currentTime: '',
                gomeType: '1',
                uid: ''
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
        created() {
            var now = new Date()
            const data = {
                showTime: now.getTime()
            }
            this.searchCompetitionData(data)
        },
        methods: {
            async Submit() {
                const params = {
                    uid: this.user.id, //登录的uid
                    token: this.token, //登录的token
                    live_class_id: this.form,
                    game_id: '',
                    title: '',
                    notice: '',
                    thumb: '',
                    starttime: '',
                    source: 'pc',
                    type: '',
                    video_url: '',
                    game_type: ''
                }
                CreateRoom(params).then(res => {
                    console.log(res, '00000000')
                })
            },
            overSubmit(){},
            copy() {
                var clipboard = new this.Clipboard(".tag-read");
                clipboard.on("success", (e) => {
                    this.$message({
                    message: "复制成功",
                    type: "success",
                    });
                    // 释放内存
                    clipboard.destroy();
                });
                clipboard.on("error", (e) => {
                    // 不支持复制
                    this.$message.error("该浏览器不支持自动复制");
                    // 释放内存
                    clipboard.destroy();
                });
            },
            searchCompetition() {
                this.dialogVisible = true
            },
            handleClose() {
                
            },
            searchCompetitionData(time) {
                const startDate = new Date(time.showTime)
                const startY = startDate.getFullYear() 
                const startM = startDate.getMonth() + 1
                const startD = startDate.getDate()
                const endShowTime = time.showTime + 24 * 60 * 60 * 1000
                const endDate = new Date(endShowTime)
                const endY = endDate.getFullYear() 
                const endM = endDate.getMonth() + 1
                const endD = endDate.getDate()
                const starttime = startY + '-' + startM + '-'+ startD + " 00:00:00"
                const endtime = endY + '-' + endM + '-'+ endD + " 00:00:00"
                const data = {
                    uid: this.user.id, //登录的uid
                    token: this.token, //登录的token
                    type: this.gomeType,
                    starttime,
                    endtime,
                    source: 'pc'
                }
                LiveStream(data).then(res => {
                    this.tableData = res.data.info
                })
            },
            convention(row) {
                const params = {
                    uid: this.user.id, //登录的uid
                    token: this.token, //登录的token
                    game_status: 1,
                    game_id: row.id,
                    gametime: row.tiem,
                    game_type: row.type,
                    source: 'pc'
                }
                appointment(params).then(res => {
                    console.log(res, 'res')
                })
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
        .text-btn {
            padding-left: 10px
            color: #DBB16F;
            text-decoration: underline;
        }
    >p {
        margin-bottom: 4px;
        font-size: 14px;
        color: #777;
    }
    }

    .rechargenubms{
        margin-bottom: 30px;
    }
}
.el-dialog .el-dialog__header {
    background: #EBF0FB !important;
}
.dialog-footer .el-button {
    background: linear-gradient(90deg,#eccbab, #dbb16f 100%);
    border-color: #DBB16F;
}
.dialog-header {
    padding-top: 30px;
    border-top: 1px solid #E6EAF3;
    display: flex;
    justify-content: space-between;
    .dialog-header-left {
        display: flex;
        font-size: 14px;
        height: 32px;
        line-height: 32px;
        .date {
            font-size: 20px;
            margin-right: 6px;
        }
        .select-gome {
            margin-left: 40px;
        }
    }
    .set-my-gome {
        color: #DBB16F;
    }
}
</style>