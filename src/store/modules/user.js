const state = {
    info:JSON.parse(sessionStorage.getItem('info'))||[]
}
const mutations = {
    userinfo(state,param){
        state.info =param
        sessionStorage.setItem('info', JSON.stringify(param))
    }
}
const actions = {}
const getters ={}
export default {
    state,
    mutations,
    actions
}