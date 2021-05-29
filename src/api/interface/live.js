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
export const appointment = (params) => post({ url: 'User.appointment', params})

// 站内消息
export const MessageNoticeList = (params) => post({ url: 'Message.noticeList', params})

// 打赏记录
export const rewardRecord = (params) => post({ url: 'User.rewardRecord', params})

// 提现记录
export const extracCashList = (params) => post({ url: 'Extract.extracCashList', params})

// 收入明细
export const incomeDetails = (params) => post({ url: 'User.incomeDetails', params})

// 房间管理列表
export const userLiveList = (params) => post({ url: 'Live.userLiveList', params})

// 用户关注主播列表
export const userFollowAnchor = (params) => post({ url: 'Follow.userFollowAnchor', params})

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
