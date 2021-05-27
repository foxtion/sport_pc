import {get,post} from "_s/axios";


//蓝球球赛列表
export const GetBasketball = (params) => get({ url: 'Basketball.getbasketball', params})

//关注蓝球球赛
export const FollowBasketball = (params) => post({ url: 'Basketball.follow_event', params})

//取消蓝球球赛关注
export const CancelFollowBasketball = (params) => get({ url: 'Basketball.cancel_follow_event', params})

//篮球球赛详情
export const BasketballGameDetails = (params) => get({ url: 'Basketball.getBasketballDetails', params, needLoading: 'c'})

//篮球球赛统计
export const BasketballGameStatistics = (params) => get({ url: 'Basketball.getstatistics', params, needLoading: 'c'})

//篮球单场指数历史
export const BasketballSingleHistory = (params) => get({ url: 'Basketball.single_history_index', params, needLoading: 'c'})

//篮球单场指数历史列表
export const BasketballSingleHistoryList = (params) => get({ url: 'Basketball.single_history_list', params, needLoading: 'c'})

//足球单场分析数据
export const BasketballAnalysis = (params) => get({ url: 'Basketball.getanalysis', params})

//获取篮球关注列表
export const FollowBasketballList = (params) => get({ url: 'Basketball.get_follow_event', params})


