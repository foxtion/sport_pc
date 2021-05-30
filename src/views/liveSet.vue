<template>
    <div id="ListSet">
        <h4><span>直播设置</span></h4>
        <div style="margin-top:30px">
            <el-form ref="form" :model="form" label-width="100px" >
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
                    <span class="date">{{ currentTime }}</span><p>足球<span style="color: #DBB16F">332场</span>比赛</p>
                    <el-select v-model="gomeType" class="select-gome" size="mini">
                        <el-option
                            v-for="item in gomeTypeList"
                            :key="item.events_id"
                            :value="item.events_id"
                            :label="item.name"
                            />
                    </el-select>
                </div> 
                <p class="set-my-gome" @click="myCompetitionVisible = true">设置自定义赛事</p>
            </div>
            <el-table :data="tableData" style="width: 100%; height: 300px;">
                <el-table-column prop="competition_time_text" label="" width="100" align="center"></el-table-column>
                <el-table-column prop="short_name_zh" label="" width="90" align="center"></el-table-column>
                <el-table-column prop="status_text" label="" align="center"></el-table-column>
                <el-table-column label="" width="300" align="center">
                    <template slot-scope="scope">
                       <div style="display: flex">
                           <div style="display: flex">{{ scope.row.deputy_name }}<img :src="scope.row.deputy_logo" width="20px" /></div> 
                           VS 
                           <div style="display: flex"> <img :src="scope.row.main_logo" width="20px" />{{ scope.row.main_name }} </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    width="100">
                    <template slot-scope="scope" align="center">
                        <div @click="convention(scope.row)" class="dialog-btn">预约</div>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 自定义赛事 -->
        <el-dialog
        title="自定义赛事"
        :center="true"
        :visible.sync="myCompetitionVisible"
        width="500px">
            <div class="dialog-header">
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="myCompetitionBtn">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import DateWeek from './dateWeek'
    import { CreateRoom, footMatch, basketMatch, appointment} from '@/api'
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
                uid: '',
                gomeTypeList: [],
                myCompetitionVisible: false
            };
        },
        mounted() {
            if(this.user){
                this.iszb = this.user.iszb;
                this.user_nicename = this.user.user_nicename;
                this.sex = this.user.sex;
                this.birthday = this.user.birthday;
                this.user_email = this.user.user_email;
            }
        },
        created() {
            this.user = JSON.parse(window.localStorage.getItem("user"))
            this.token = window.localStorage.getItem("token")
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
                this.dialogVisible = false
            },
            searchCompetitionData(time) { 
                const startDate = new Date(time.showTime + 600000)
                const startY = startDate.getFullYear() 
                const startM = startDate.getMonth() + 1 > 9 ? startDate.getMonth() + 1 : '0' +(startDate.getMonth()+ 1)
                const startD = startDate.getDate() > 9 ? startDate.getDate() : '0' + startDate.getDate()
                const starttime = startY + '-' + startM + '-'+ startD
                this.currentTime = startM + '月'+ startD + '日'
                const data = {
                    uid: this.user.id, //登录的uid
                    token: this.token, //登录的token
                    time: starttime,
                    source: 'pc'
                }
                footMatch(data).then(res => {
                    this.tableData = res.info.list
                    this.gomeTypeList = res.info.filter
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
            },
            // 自定义赛事
            myCompetitionBtn() {
                this.myCompetitionVisible = false
            }
        },
    };
</script>

<style lang="stylus">
#ListSet {
      padding: 0 0 0 30px;

  >h4 {
    font-size: 18px;
    font-weight: 600;
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #e6eaf3;

    span {
      display: inline-block;
      font-size: 14px;
      font-family: PingFang SC, PingFang SC-Medium;
      font-weight: 500;
      text-align: center;
      color: #333333;
      height: 100%;
      border-bottom: 1px solid #dbb16f;
      line-height: 60px;
      margin-left: 20px;
    }
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
     
    .el-table thead {
        display: none;
    }
    .el-dialog--center {
        border-radius: 9px;
    }
    .el-dialog__header {
        background: #EBF0FB;
        border-radius: 9px 9px 0 0;
        padding-top: 13px;
        padding-bottom: 13px;
    }
}
.el-table .has-gutter th, .el-table .has-gutter tr {
  background: #EBF0FB;
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
        cursor: pointer;
    }
}
.dialog-btn {
    width: 46px;
    height: 26px;
    line-height 26px;
    text-align: center;
    opacity: 1;
    background: linear-gradient(90deg,#eccbab, #dbb16f 100%);
    border-radius: 2px;
}

.el-dialog__headerbtn .el-dialog__close {
    color: #76809C;
    font-weight: 700
}
</style>