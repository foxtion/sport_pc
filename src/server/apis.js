import Axios from "./axios";

class Api extends Axios {
  // 用户登录接口
  /*async userLogin(user_login, user_pass) {
    return await this.axios("GET", "?service=Login.userLogin&user_login=" + user_login + "&user_pass=" + user_pass);
  }*/
  // 用户注册接口
  /*async userReg(user_login, user_pass, confirm_pass, code, source, avatar, user_nicename) {
    return await this.axios("GET", "?service=Login.userReg&user_login=" + user_login + "&user_pass=" + user_pass + "&confirm_pass=" + confirm_pass + "&code=" + code + "&source=" + source + "&avatar=" + avatar + "&user_nicename=" + user_nicename);
  }*/
  // 注册获取验证码接口 / 换绑新手机发送验证码
  /*async getCode(mobile, sign) {
    return await this.axios("GET", "?service=Login.getCode&mobile=" + mobile + "&sign=" + sign);
  }*/
  // 找回密码接口
  /*
  async userFindPass(user_login, user_pass, user_pass2, code) {
    return await this.axios("GET", "?service=Login.userFindPass&user_login=" + user_login + "&user_pass=" + user_pass + "&user_pass2=" + user_pass2 + "&code=" + code);
  }
  // 找回密码发送验证码接口 / 换绑给旧手机发送验证码
  /*async getForgetCode(mobile, sign) {
    return await this.axios("GET", "?service=Login.getForgetCode&mobile=" + mobile + "&sign=" + sign);
  }*/

  
  // 直播页轮播图
  async getBanner() {
    return await this.axios("GET", "?service=Live.getBanner");
  }
  // 直播分类
  async getGameType() {
    return await this.axios("GET", "?service=Live.getGameType");
  }
  // 首页赛程列表接口
  async getGamelist(uid) {
    return await this.axios("GET", "?service=Live.getGamelist&uid=" + uid);
  }
  // 首页导航分类列表接口
  async getLiveListByType(game_type, p) {
    return await this.axios("GET", "?service=Live.getLiveListByType&game_type=" + game_type + "&p=" + p);
  }
  // 赛程-轮播
  async scgetBanner() {
    return await this.axios("GET", "?service=Schedule.getBanner", );
  }
  // 赛程-分类
 /* async scgetGameType() {
    return await this.axios("GET", "?service=Schedule.getGameType", );
  }*/
  // 赛程-列表
  /*async getGameScheduleListByType(game_type, uid) {
    return await this.axios("GET", "?service=Schedule.getGameScheduleListByType&game_type=" + game_type + "&uid=" + uid);
  }*/
  // 赛程预约
  async addAppoint(game_id, uid) {
    return await this.axios("GET", "?service=Schedule.addAppoint&game_id=" + game_id + "&uid=" + uid);
  }
  // 取消赛程预约
  async cancelAppoint(game_id, uid) {
    return await this.axios("GET", "?service=Schedule.cancelAppoint&game_id=" + game_id + "&uid=" + uid);
  }
  // 关注列表
  async attentionList(uid) {
    return await this.axios("GET", "?service=Schedule.attentionList&uid=" + uid);
  }
  // 关注推荐列表
  async recommonList() {
    return await this.axios("GET", "?service=Schedule.recommonList");
  }
  // 预约列表
  async appointList(uid) {
    return await this.axios("GET", "?service=Schedule.appointList&uid=" + uid);
  }

  /*
  // 修改用户信息
  async updateFields(uid, fields, token) {
    return await this.axios("GET", "?service=User.updateFields&uid=" + uid + "&fields=" + fields + "&token=" + token);
  }*/
  // 修改头像
  /*async updateAvatar(uid, token, params) {
    return await this.axios("POST", "?service=User.updateAvatar&uid=" + uid + "&token=" + token, params);
  }*/


  // 注册-上传头像
  async uploadAvatar(file) {
    return await this.axios("POST", "?service=User.uploadAvatar", file);
  }
  // 赛程详情
  async scheduleDetail(game_id, uid) {
    return await this.axios("GET", "?service=Schedule.scheduleDetail&game_id=" + game_id + "&uid=" + uid);
  }
  // 直播详情
  // async liveDetail(liveuid, stream, uid, token) {
  //   return await this.axios("GET", "?service=Live.liveDetail&liveuid=" + liveuid + "&stream=" + stream + "&uid=" + uid + "&token=" + token);
  // }
  // 排行榜
  async getRankList(liveuid) {
    return await this.axios("GET", "?service=Live.getRankList&liveuid=" + liveuid);
  }


  // 获取用户信息
  async getUserinfo(uid, token) {
    return await this.axios("GET", "?service=User.getUserinfo&uid=" + uid + "&token=" + token);
  }


  // 建议反馈（POST）
  async setFeedback(uid, token, fb_type, thumb, content, model) {
    return await this.axios("GET", "?service=User.setFeedback&uid=" + uid + "&token=" + token + "&fb_type=" + fb_type + "&thumb=" + thumb + "&content=" + content + "&model=" + model);
  }
  // 消息列表
  async messageList(uid, token, p) {
    return await this.axios("GET", "?service=User.messageList&uid=" + uid + "&token=" + token + "&p=" + p);
  }
  // 消息详情
  async messageDetails(uid, token, id) {
    return await this.axios("GET", "?service=User.messageDetails&uid=" + uid + "&token=" + token + "&id=" + id);
  }
  // 换绑给旧手机发送验证码
  /* async getForgetCode(mobile, sign) {
    return await this.axios("GET", "?service=Login.getForgetCode&mobile=" + mobile + "&sign=" + sign);
  } */
  // 验证旧手机号
  async confirmPhone(mobile, code) {
    return await this.axios("GET", "?service=User.confirmPhone&mobile=" + mobile + "&code=" + code);
  }
  
  // 手机号换绑
  async editPhone(uid, token, mobile, code) {
    return await this.axios("GET", "?service=User.editPhone&uid=" + uid + "&token=" + token + "&mobile=" + mobile + "&code=" + code);
  }
  // 主播赛程
  async anchorSchedule(liveuid) {
    return await this.axios("GET", "?service=Live.anchorSchedule&liveuid=" + liveuid);
  }
  // 关注/取关
  async setAttent(uid, token, touid) {
    return await this.axios("GET", "?service=User.setAttent&uid=" + uid + "&token=" + token + "&touid=" + touid);
  }
  //  获取礼物列表，同时会返回剩余的钱
  async getGiftList(uid, token) {
    return await this.axios("GET", "?service=Live.getGiftList&uid=" + uid + "&token=" + token);
  }
  // 获取用户余额
  async getCoin(uid, token) {
    return await this.axios("GET", "?service=Live.getCoin&uid=" + uid + "&token=" + token);
  }
  // // 观众给主播送礼物
  // async sendGift(uid, token, liveuid, stream, giftid, ispack, is_sticker, giftcount) {
  //   return await this.axios("GET", "?service=Live.sendGift&uid=" + uid + "&token=" + token + "&liveuid=" + liveuid + "&stream=" + stream + "&giftid=" + giftid + "&ispack=" + ispack + "&is_sticker=" + is_sticker + "&giftcount=" + giftcount);
  // }
  // 创建直播
  async createLive(uid, token, title, islive, starttime, thumb, anyway, liveclassid, game_id) {
    return await this.axios("GET", "?service=Live.createLive&uid=" + uid + "&token=" + token + "&title=" + title + "&islive=" + islive + "&starttime=" + starttime + "&thumb=" + thumb + "&anyway=" + anyway + "&liveclassid=" + liveclassid + "&game_id=" + game_id);
  }
  // 直播分类pc
  async getClassId() {
    return await this.axios("GET", "?service=Live.getClassId");
  }
  // 比赛赛程pc
  async getGameId(classid) {
    return await this.axios("GET", "?service=Live.getGameId&classid=" + classid);
  }
  // 反馈列表pc
  async feedbackList(uid, token, p) {
    return await this.axios("GET", "?service=User.feedbackList&uid=" + uid + "&token=" + token + "&p=" + p);
  }
  // 反馈详情
  async feedbackDetail(uid, token, id) {
    return await this.axios("GET", "?service=User.feedbackDetail&uid=" + uid + "&token=" + token + "&id=" + id);
  }
  // 关注列表pc
  async attentionListpc(uid, token) {
    return await this.axios("GET", "?service=Schedule.attentionListpc&uid=" + uid + "&token=" + token);
  }
  // 获取用户信息
  async getnickname(uid) {
    return await this.axios("GET", "?service=User.getnickname&uid=" + uid);
  }
  // 观看领取金币
  async getViewCoin(uid, token, starttime, endtime) {
    return await this.axios("GET", "?service=User.getViewCoin&uid=" + uid + "&token=" + token + "&starttime=" + starttime + "&endtime=" + endtime);
  }
  // 主播列表（pc）
  async preliveList(uid, token) {
    return await this.axios("GET", "?service=Live.preliveList&uid=" + uid + "&token=" + token);
  }
  // 修改 关播/开播状态（pc）
  async editIslive(uid, token, stream, livetype) {
    return await this.axios("GET", "?service=Live.editIslive&uid=" + uid + "&token=" + token + "&stream=" + stream + "&livetype=" + livetype);
  }

  // 获取pc/web 网站地址
  /* async getSiteUrl() {
    return await this.axios("GET", "?service=Schedule.getSiteUrl");
  } */
  // 粉丝列表
  async myFans(uid, token) {
    return await this.axios("GET", "?service=Schedule.myFans&uid=" + uid + "&token=" + token);
  }
  // 我的礼物
  async myIncome(uid, token, p) {
    return await this.axios("GET", "?service=Schedule.myIncome&uid=" + uid + "&token=" + token + "&page=" + p);
  }
  // 添加比赛 （pc）
  async addSchedule(type, sponsor_name, team_one_name, team_one_logo, team_two_name, team_two_logo, game_start_time, game_end_time) {
    return await this.axios("GET", "?service=Schedule.addSchedule&type=" + type + "&sponsor_name=" + sponsor_name + "&team_one_name=" + team_one_name + "&team_one_logo=" + team_one_logo + "&team_two_name=" + team_two_name + "&team_two_logo=" + team_two_logo + "&game_start_time=" + game_start_time + "&game_end_time=" + game_end_time);
  }
  // 直播编辑（pc）
  async editLive(uid, token, stream, liveclassid, game_id, title, starttime, thumb, anyway) {
    return await this.axios("GET", "?service=Live.editLive&uid=" + uid + "&token=" + token + "&stream=" + stream + "&liveclassid=" + liveclassid + "&game_id=" + game_id + "&title=" + title + "&starttime=" + starttime + "&thumb=" + thumb + "&anyway=" + anyway);
  }
  // 删除直播（pc）
  async liveDel(uid, token, stream) {
    return await this.axios("GET", "?service=Live.liveDel&uid=" + uid + "&token=" + token + "&stream=" + stream);
  }
  //获取新闻详情
  async getNewdetail(uid, token,nid) {
    return await this.axios("GET", "?service=New.detail&uid=" + uid + "&token=" + token + "&nid=" + nid);
  }
}
export default new Api();