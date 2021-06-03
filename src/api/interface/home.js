import {get,post} from "_s/axios";

//获取首页新闻
export const Getnewlst = (params) => get({ url: 'New.getnewlst', params})

//获取热点情报数据
export const Collect = (params) => get({ url: 'New.collect', params})

//获取最近赛事数据
export const Season = (params) => get({ url: 'New.season', params, needLoading: 'c'})

//获取东部篮球积分榜
export const bastabled = (params) => get({ url: 'New.bastabled', params})

//获取西部篮球积分榜
export const bastablex = (params) => get({ url: 'New.bastablex', params})

//获取西部篮球积分榜
export const cbatable = (params) => get({ url: 'New.cbatable', params})

//获取英超积分榜
export const englandtable = (params) => get({ url: 'New.englandtable', params})


//获取意甲积分榜
export const italitable = (params) => get({ url: 'New.italitable', params})

//获取西甲积分榜
export const spaintable = (params) => get({ url: 'New.spaintable', params})

//正在直播
export const liveRecommendList = (params) => get({ url: 'Live.progress_live', params})
//推荐赛程
export const Schedulerecommend = (params) => get({ url: 'Schedule.recommend', params})
//热门直播
export const LivehotLive = (params) => get({ url: 'Live.hotLive', params})


//获取法甲积分榜
export const francetable = (params) => get({ url: 'New.francetable', params})

//获取德甲积分榜
export const germantable = (params) => get({ url: 'New.germantable', params})

//获取西部篮球积分榜
export const GetBasketball = (params) => get({ url: 'Basketball.getbasketball', params, needLoading: 'c'})

//获取资讯列表数据
export const zixunlst = (params) => get({ url: 'New.collect2', params})

//获取分类资讯数据
export const newtype = (params) => get({ url: 'New.newtype', params})

//获取分类资讯数据
export const detail = (params) => get({ url: 'New.detail', params})

//获取资讯评论数据
export const commentlst = (params) => get({ url: 'New.commentlst', params})

//用户评论
export const comment = (params) => post({ url: 'New.comment', params})

//篮球数据
export const Basketballl = (params) => post({ url: 'Basketball.getbasketball', params})

//ziliaoku
export const seasondata = (params) => get({ url: 'Footballtasks.seasondetail', params})

//saijijifen
export const seasonscore = (params) => get({ url: 'Footballtasks.seasonscore', params})

//球队详情
export const teamdetail = (params) => get({ url: 'Footballtasks.teamdetail', params})

//篮球资料库
export const lqseasondata = (params) => get({ url: 'Basketballtasks.seasondetail', params})

//篮球积分榜
export const lqseasonscore = (params) => get({ url: 'Basketballtasks.seasonscore', params})

//篮球球队详情
export const lqteamdetail = (params) => get({ url: 'Basketballtasks.steamdetail', params})

//赛事列表
export const seasonlst = (params) => get({ url: 'Footballtasks.seasonlst'})

//反馈接口
export const submitfk = (params) => post({ url: 'New.feedback', params})

//足球射手榜
export const shooterload = (params) => get({ url: 'Footballtasks.shooter', params})

//篮球得分榜
export const shooterlanqiuer = (params) => get({ url: 'Basketballtasks.shooterlq', params, needLoading: 'c'})

//足球单场分析数据
export const FootballAnalysiser = (params) => get({ url: 'Football.singleAnalysiser', params})

