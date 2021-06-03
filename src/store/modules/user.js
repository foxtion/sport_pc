const state = {
    info:JSON.parse(sessionStorage.getItem('info'))||[],
    tabnav:0,
    isauth:false,
    login:false,
    liveDetail:{},
    footer:true
}
const mutations = {
    userinfo(state,param){
        state.info =param
        sessionStorage.setItem('info', JSON.stringify(param))
    },
    tabindex(state,param){
        state.tabnav =param
        sessionStorage.setItem('tabnav', JSON.stringify(param))

    },
    isAuth(state,param){
        state.isauth =param
        sessionStorage.setItem('isauth', JSON.stringify(param))

    },

    islogin(state,param){
        state.login =param
        sessionStorage.setItem('islogin', JSON.stringify(param))
    },
    liveDetailinfo(state,param){
        state.liveDetail =param
        sessionStorage.setItem('liveDetail', JSON.stringify(param))
    },
    footsshow(state,param){
        state.footer =param
        sessionStorage.setItem('footsshow', JSON.stringify(param))
    },

}
const actions = {}
const getters ={}
export default {
    state,
    mutations,
    actions
}
