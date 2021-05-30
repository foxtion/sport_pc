<template>
    <div id="ListSet">
        <h4><span>直播设置</span></h4>
        <div style="margin-top:30px">
            <el-form ref="form" :model="form" label-width="100px" >
            <div class="baseInput" style="margin-right: 40px">
                <el-form-item label="直播分类:">
                    <el-select v-model="form.classes">
                        <el-option label="足球" value="1"></el-option>
                        <el-option label="篮球" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="baseInput" style="margin-right: 40px">
                <el-form-item label="直播类型:">
                    <el-select v-model="form.type">
                        <el-option label="赛事直播" value="1"></el-option>
                        <el-option label="自定义直播" value="2"></el-option>
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
                    <span class="date">{{ currentTime }}</span><p>共<span style="color: #DBB16F"> {{ tableData.length }} 场</span>比赛</p>
                    <el-select v-model="gomeType" class="select-gome" size="mini" @change="changeGomeType">
                        <el-option
                            v-for="item in gomeTypeList"
                            :key="item.events_id"
                            :value="item.name"
                            :label="item.name"
                            />
                    </el-select>
                </div> 
                <p class="set-my-gome" @click="myCompetitionVisible = true">设置自定义赛事</p>
            </div>
            <el-table :data="tableData" style="width: 100%;"  height="300px" :highlight-current-row="true" @row-click="changeRowList">
                <el-table-column prop="competition_time_text" label="" width="80" align="center"></el-table-column>
                <el-table-column prop="short_name_zh" label="" width="90" align="center"></el-table-column>
                <el-table-column prop="status_text" width="90" label="" align="center"></el-table-column>
                <el-table-column label=""  align="center">
                    <template slot-scope="scope">
                       <div style="display: flex;justify-content: space-around;color:#434A66">
                           <div style="display: flex;justify-content: space-between; width: 180px">{{ scope.row.deputy_name }}<img :src="scope.row.deputy_logo" width="20px" style="margin-left: 30px" /></div> 
                           <div style="width: 30px;margin:0 30px;color: #333333">VS </div>
                           <div style="width: 180px;display: flex;justify-content: space-between;"> <img :src="scope.row.main_logo" width="20px" style="margin-right: 30px" />{{ scope.row.main_name }} </div>
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
                <el-button type="primary" @click="dialogBtn">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 自定义赛事 -->
        <el-dialog
        title="自定义赛事"
        :center="true"
        :visible.sync="myCompetitionVisible"
        width="500px">
            <div class="">
                  <el-form :inline="true" :model="queryInfo" ref="queryInfoRef" label-width="80px" size="small">
                    <el-form-item label="类型:" prop="type">
                      <el-select v-model="queryInfo.type" clearable style="width: 300px;">
                          <el-option label="足球" value="1"></el-option>
                          <el-option label="篮球" value="2"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="开赛时间:" prop="time">
                        <el-time-select v-model="queryInfo.time" style="width: 300px;" :picker-options="{ start: '00:00', step: '00:05', end: '24:00' }"></el-time-select>
                    </el-form-item>
                  </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="myCompetitionBtn">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import DateWeek from './dateWeek'
    import { CreateRoom, footMatch, basketMatch, Appointment, AppointmentList} from '@/api'
    export default {
        name: "LiveSet",
        components: {
            DateWeek
        },
        data() {
            return {
                form: {
                    desc: '',
                    classes: "1",
                    user_bank:"",
                    user_bankcity:"",
                    type: '1'
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
                tableData: [],
                tableAllData: [],
                currentTime: '',
                gomeType: '全部',
                uid: '',
                gomeTypeList: [],
                myCompetitionVisible: false,
                isMyCompetition: false,
                queryInfo: {},
                currentCompetition: {},
                currentCompetitionRow: {},
                AppointmentListData: []
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
            this.getAppointmentList()
        },
        methods: {
            async Submit() {
                const params = {
                    uid: this.user.id, //登录的uid
                    token: this.token, //登录的token
                    live_class_id: this.form.classes,
                    game_id: this.currentCompetitionRow.id,
                    title: this.form.user_bankcity,
                    notice: this.form.desc,
                    thumb: '', // 封面图
                    starttime: this.currentCompetitionRow.competition_time,
                    source: 'pc',
                    type: form.type, //直播类型 1球赛直播 2自定义直播
                    video_url: ''
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
                var now = new Date()
                const data = {
                    showTime: now.getTime()
                }
                this.searchCompetitionData(data)
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
                if(this.queryInfo.type == 2 || this.form.classes == 2) {
                    basketMatch(data).then(res => {
                        this.tableAllData = res.info.list
                        this.gomeTypeList = res.info.filter
                        if(this.queryInfo.time) {
                            this.tableData = this.tableAllData.filter(item => item.competition_time_text == this.queryInfo.time)
                            this.this.queryInfo = {}
                        } else {
                            this.tableData = res.info.list
                        }
                    })
                } else {
                    footMatch(data).then(res => {
                        this.tableAllData = res.info.list
                        this.gomeTypeList = res.info.filter
                        if(this.queryInfo.time) {
                            this.tableData = this.tableAllData.filter(item => item.competition_time_text == this.queryInfo.time)
                            this.this.queryInfo = {}
                        } else {
                            this.tableData = res.info.list
                        }
                    })
                }
            },
            // 预约赛事
            convention(row) {
                const game_details = JSON.stringify(row)
                const params = {
                    uid: this.user.id, //登录的uid
                    token: this.token, //登录的token
                    game_status: row.status,
                    game_id: row.id,
                    gametime: row.competition_time,
                    game_details, 
                    game_type: 1,
                    source: 'pc'
                }
                Appointment(params).then(res => {
                    console.log(res, 'res')
                    if (res.code == '0') {
                        this.$message({
                            message: "关注成功！",
                            type: "success",
                        });
                    }
                })
            },
            // 自定义赛事
            myCompetitionBtn() {
                this.myCompetitionVisible = false
                if (this.queryInfo.type) {
                    this.form.classes == this.queryInfo.type
                }
                if (this.queryInfo.type || this.time) {
                    this.isMyCompetition = true
                    var now = new Date()
                    const data = {
                        showTime: now.getTime()
                    }
                    this.searchCompetitionData(data)
                }
            },
            changeGomeType() {
                if (this.gomeType == '全部') {
                    this.tableData = this.tableAllData
                } else {
                    this.tableData = this.tableAllData.filter(item => item.short_name_zh == this.gomeType)
                }
            },
            dialogBtn() {
                this.dialogVisible = false
                this.currentCompetitionRow = this.currentCompetition
                this.form.user_bank = this.currentCompetitionRow.competition_time_text + this.currentCompetitionRow.name_zh + '、' + this.currentCompetitionRow.deputy_name + '-' + this.currentCompetitionRow.main_name
            },
            changeRowList(row) {
                this.currentCompetition = row
            },
            getAppointmentList() {
                const params = {
                    uid: this.user.id, //登录的uid
                    token: this.token, //登录的token
                    source: 'pc'
                }
                AppointmentList(params).then(res => {
                    console.log(res, 'r----es')
                    // this.AppointmentListData = res.info.list
                })
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
    .el-dialog--center .el-dialog__body {
        padding: 10px;
    }
  .el-table__body-wrapper::-webkit-scrollbar{
    display: none;
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