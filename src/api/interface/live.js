import {get,post} from "_s/axios";

//直播分类
export const LiveClass  = (params) => post({ url: 'Live.liveClass', params})

//申请主播
export const UserApplyAnchor = (params) => post({ url: 'Live.userApplyAnchor', params})

//主播申请状态
export const AnchorApplyStatus = (params) => post({ url: 'Live.anchorApplyStatus', params})

//创建直播间
export const CreateRoom = (params) => post({ url: 'Live.createRoom', params})

//选择要直播赛事列表
export const LiveStream = (params) => post({ url: 'Live.liveStream', params})

//通知开播
export const ChangeLive = (params) => post({ url: 'Live.changeLive', params})

//直播分类列表
export const GetLiveListByType = (params) => post({ url: 'Live.getLiveListByType', params})

//推荐直播列表
export const LiveRecommendList = (params) => post({ url: 'Live.liveRecommendList', params})

//推荐直播轮播列表
export const LiveRecommendBanner = (params) => post({ url: 'Live.liveRecommendBanner', params})

//足球、篮球直播列表
export const LiveSports = (params) => post({ url: 'Live.liveSports', params})

//推荐预约
export const RecommendMake = (params) => post({ url: 'Live.recommendMake', params})

//热门主播
export const HotAnchor = (params) => post({ url: 'Live.hotAnchor', params})

//热门赛事
export const HotEvent = (params) => post({ url: 'Football.hotEvent', params})

// 用户预约
export const appointment = (params) => post({ url: 'Make.appointment', params})

// 用户取消预约
export const cancelAppointment = (params) => post({ url: 'Make.cancelAppointment', params})

// 站内消息
export const MessageNoticeList = (params) => post({ url: 'Message.noticeList', params})

// 打赏记录
export const rewardRecord = (params) => post({ url: 'User.rewardRecord', params})

// 提现记录
export const extracCashList = (params) => post({ url: 'Extract.extracCashList', params})

// 提现记录
export const extracCash = (params) => post({ url: 'Extract.extracCash', params})

// 收入明细
export const incomeDetails = (params) => post({ url: 'User.incomeDetails', params})

// 房间管理列表
export const userLiveList = (params) => post({ url: 'Live.userLiveList', params})

// 用户关注主播列表
export const userFollowAnchor = (params) => post({ url: 'Follow.userFollowAnchor', params})

// 关注主播
export const FollowAnchor = (params) => post({ url: 'Follow.followAnchor', params})

// 礼物列表
export const getGiftList = (params) => post({ url: 'Live.getGiftList', params})

// 贵族列表
export const nobleList = (params) => post({ url: 'noble.nobleList', params})

// 开通贵族
export const openNoble = (params) => post({ url: 'noble.openNoble', params})

// 进入直播间
export const enterRoom = (params) => post({ url: 'Live.enterRoom', params})
// 礼物列表
export const FollowLiveList = (params) => post({ url: 'Follow.followLiveList', params})

// 开播设置 足球赛事选择
export const footMatch = (params) => post({ url: 'Schedule.footMatch', params})

// 开播设置 篮球赛事选择
export const basketMatch = (params) => post({ url: 'Schedule.basketMatch', params})

// 足球赛程
export const football = (params) => post({ url: 'Schedule.football', params})

// 篮球赛程
export const basketball = (params) => post({ url: 'Schedule.basketball', params})

// 主播是否实名认证
export const IsAuth = (params) => post({ url: 'Live.isAuth', params})
// 主播是否实名认证
export const UserAccount = (params) => post({ url: 'User.userAccount', params})

// 观众给主播送礼物
export const sendGift = (params) => post({ url: 'Live.sendGift', params})

// 直播详情
export const liveDetail = (params) => post({ url: 'Live.liveDetail', params})


// 主播傍
export const anchorlist = (params) => post({ url: 'Live.anchor_list', params})

// 豪气榜
export const goldmaster = (params) => post({ url: 'Live.gold_master', params})

// 进入直播聊天室
export const enterChat = (params) => post({ url: 'Chat.LiveEnterChat', params})

// 直播间聊天室记录
export const msgList = (params) => post({ url: 'Chat.LivemsgList', params})

// 直播间发送消息
export const sendMsg = (params) => post({ url: 'Chat.LiveSendMsg', params})
// 设房管
export const setHouseManage = (params) => post({ url: 'Chat.set_house_manage', params})

// 踢出用户
export const outUser = (params) => post({ url: 'Chat.out_user', params})

// 禁言
export const liveBanUser = (params) => post({ url: 'Chat.Chat.live_ban_user', params})

// 禁言
export const withdrawMsg = (params) => post({ url: 'Chat.withdraw_msg', params})

// 直播预告
export const noticelive = (params) => post({ url: 'Live.noticelive', params})

// 解除踢出用户
export const relieveoutuser = (params) => post({ url: 'Chat.relieve_out_user', params})

// 撤回消息
export const withdrawmsg = (params) => post({ url: 'Chat.withdraw_msg', params})

// 聊天室成员
export const chatmember = (params) => post({ url: 'Chat.chat_member', params})

// 弹幕
export const bulletchat = (params) => post({ url: 'Chat.bullet_chat', params})

// 喇叭
export const chathorn = (params) => post({ url: 'Chat.chat_horn', params})

// 退出
export const chatlogout = (params) => post({ url: 'Chat.chat_logout', params})




