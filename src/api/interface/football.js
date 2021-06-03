import {get,post} from "_s/axios";

//足球球赛列表
export const Getfootball = (params) => get({ url: 'Football.getfootball', params})

//关注足球球赛
export const FollowFootball = (params) => post({ url: 'Football.follow_event', params})

//取消足球球赛关注
export const CancelFollowFootball = (params) => get({ url: 'Football.cancel_follow_event', params})

//足球球赛详情
export const FootballGameDetails = (params) => get({ url: 'Football.game_details', params})

//足球单场指数历史
export const FootballSingleHistory = (params) => get({ url: 'Football.single_history_index', params, needLoading: 'c'})

//足球单场指数历史列表
export const FootballSingleHistoryList = (params) => get({ url: 'Football.single_history_list', params, needLoading: 'c'})

//足球球队阵容
export const FootballLineup = (params) => get({ url: 'Football.footballLineup', params, needLoading: 'c'})

//足球单场分析数据
export const FootballAnalysis = (params) => get({ url: 'Football.singleAnalysis', params})

//足球球赛重要事件
export const FootballGameEvents = (params) => get({ url: 'Football.game_events', params})

//视频直播流
export const LiveMatches = (params) => get({ url: 'Video.streamvideo', params})

//获取足球关注列表
export const FollowFootballList = (params) => get({ url: 'Football.get_follow_event', params})

//获取当前列表比赛的赛事列表
export const selectsaishier = (params) => get({ url: 'Footballtasks.matchnamelst'})

//获取单场比赛指数
export const loadoddsonerer=(params) => get({ url: 'Footballtasks.oddsone', params})

//获取单场技术统计
export const getincidentser=(params) => get({ url: 'Footballtasks.getincident', params})

//获取足球比分盘口列表
export const getcompany=(params) => get({ url: 'Football.company'})

//获取收藏列表
export const get_follow_event=(params) => get({ url: 'Football.get_follow_event', params})