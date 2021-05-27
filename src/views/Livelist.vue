<template>
  <div id="Livelist">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="标题" prop="title"></el-table-column>
      <!-- <el-table-column label="推流地址" prop="push"></el-table-column> -->
      <el-table-column label="直播地址" prop="push"></el-table-column>
      <el-table-column
        label="开播时间"
        prop="starttime"
        width="150"
      ></el-table-column>
      <el-table-column label="是否开播" width="85">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.islive"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0"
            @change="change(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="240">
        <template slot-scope="scope">
          <el-button
            size="mini"
            class="tag-read-pull"
            :data-clipboard-text="scope.row.push"
            @click="copy"
            >复制地址</el-button
          >
          <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
          <el-button size="mini" @click="shanchu(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑 -->
    <el-dialog title="编辑" :visible.sync="showEditBox">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="开播时间" prop="starttime">
          <el-date-picker
            v-model="ruleForm.starttime"
            type="datetime"
            placeholder="选择开播时间"
            format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="直播封面图" prop="thumb">
          <van-uploader
            v-model="fileList"
            :after-read="afterRead"
            :max-count="1"
            @delete="deletethumb"
          />
        </el-form-item>
        <el-form-item label="屏幕方向" prop="anyway">
          <el-radio-group v-model="ruleForm.anyway">
            <el-radio label="0">竖屏</el-radio>
            <el-radio label="1">横屏</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="直播分类" prop="liveclassid">
          <el-select
            v-model="ruleForm.liveclassid"
            placeholder="请选择直播"
            @change="getGameId"
          >
            <el-option
              v-for="(val, key, i) in liveclassidlist"
              :key="i"
              :label="val"
              :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="赛程分类" prop="game_id">
          <el-select v-model="ruleForm.game_id" placeholder="请选择赛程">
            <el-option
              v-for="(val, key, i) in gameidlist"
              :key="i"
              :label="val"
              :value="key"
            ></el-option>
          </el-select>
          <el-button
            plain
            style="margin-left: 15px"
            @click="$router.push({ name: 'createGame' })"
            >创建比赛</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            style="background: #f8c21b; border: 1px solid #f8c21b"
            >确认修改</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Livelist",
  data() {
    return {
      tableData: [],
      showEditBox: false,
      ruleForm: {},
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          {
            min: 3,
            max: 50,
            message: "长度在 3 到 50 个字符",
            trigger: "blur",
          },
        ],
        starttime: [
          {
            required: true,
            message: "请选择开播时间",
            trigger: "change",
          },
        ],
        thumb: [
          {
            required: true,
            message: "请上传直播封面图",
            trigger: "change",
          },
        ],
        anyway: [
          { required: true, message: "请选择屏幕方向", trigger: "change" },
        ],
        liveclassid: [
          { required: true, message: "请选择直播", trigger: "change" },
        ],
        game_id: [{ required: true, message: "请选择赛程", trigger: "change" }],
      },
      fileList: [{}],
      liveclassidlist: {},
      gameidlist: {},
    };
  },
  mounted() {
   this.info = JSON.parse(window.localStorage.getItem("user"));
    /*  this.fileList[0].url = JSON.parse(
      window.localStorage.getItem("userInfo")
    ).avatar;
     */
    console.log(window.localStorage.getItem("user"))
    this.$SERVER.getClassId().then((res) => {
      if (res.data.code == 0) {
        this.liveclassidlist = res.data.info;
      }
    });
    this.init();
  },
  methods: {
    init() {
      this.$SERVER
        .preliveList(
          JSON.parse(window.localStorage.getItem("user")).id,
          window.localStorage.getItem("token")
        )
        .then((res) => {
          if (res.data.code == 0) {
            this.tableData = res.data.info;
          }
        });
    },
    copy() {
      var clipboard = new this.Clipboard(".tag-read-pull");
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
    // 开播/关播
    change(row) {
      let livetype;
      row.islive == "0" ? (livetype = "off") : (livetype = "on");
      this.$SERVER
        .editIslive(
          JSON.parse(window.localStorage.getItem("userInfo")).id,
          window.localStorage.getItem("token"),
          row.stream,
          livetype
        )
        .then((res) => {
          if (res.data.code == 0) {
            this.$message({
              message: res.data.msg,
              type: "success",
            });
            this.init();
          }
        });
    },
    edit(row) {
      this.ruleForm.game_id = "";
      this.$SERVER.getGameId(row.liveclassid).then((res) => {
        if (res.data.code == 0) {
          this.gameidlist = res.data.info;
          this.ruleForm = JSON.parse(JSON.stringify(row));
          this.fileList[0].url = this.ruleForm.thumb;
          this.showEditBox = true;
        }
      });
    },
    // 删除
    shanchu(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$SERVER
            .liveDel(
              JSON.parse(window.localStorage.getItem("userInfo")).id,
              window.localStorage.getItem("token"),
              row.stream
            )
            .then((res) => {
              if (res.data.code == 0) {
                this.$message({
                  message: "删除成功",
                  type: "success",
                });
                this.init();
              } else {
                this.$message.error(res.data.msg);
              }
            });
        })
        .catch(() => {});
    },
    getGameId(val) {
      this.ruleForm.game_id = "";
      this.$SERVER.getGameId(val).then((res) => {
        if (res.data.code == 0) {
          this.gameidlist = res.data.info;
        }
      });
    },
    afterRead(file) {
      let formData = new FormData();
      formData.append("file", file.file);
      formData.append("name", file.file.name);
      this.$SERVER.uploadAvatar(formData).then((res) => {
        if (res.data.code == 0) {
          this.ruleForm.thumb = res.data.info[0].avatar;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    deletethumb(val) {
      this.ruleForm.thumb = "";
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$SERVER
            .editLive(
              JSON.parse(window.localStorage.getItem("userInfo")).id,
              window.localStorage.getItem("token"),
              this.ruleForm.stream,
              this.ruleForm.liveclassid,
              this.ruleForm.game_id,
              this.ruleForm.title,
              this.ruleForm.starttime,
              this.ruleForm.thumb,
              this.ruleForm.anyway
            )
            .then((res) => {
              if (res.data.code == 0) {
                this.$message({
                  message: "编辑成功",
                  type: "success",
                });
                this.init();
                this.showEditBox = false;
              } else {
                this.$message.error(res.data.msg);
              }
            });
        }
      });
    },
  },
};
</script>

<style lang="stylus">
#Livelist {
  padding: 30px 10px;
}
</style>