import Vue from 'vue'
import Vuex from 'vuex'
import {user} from './user.js'


import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{id:'0'},
    is_dl:false,
    // 无用属性，代码中关于id_key的一切判断都是无用的，但是暂时不用修改
    // id_key:''
  },
  mutations: {
    userloig(state, user) {
      state.user = user
      state.is_dl=!state.is_dl
  },
    id_key_loig(state, user) {
      state.id_key = user
  },
  },
  actions: {
  //   userloig({state}){
  //     state.commit('userloig')
  // }
  },
  modules: {
    // user
  },
  plugins: [
    createPersistedState({
        storage:window.sessionStorage,
        reducer(val)  {
          return {
              // 只储存state中的token
              user: val.user
          }
      },
        // paths: ["user"]
    })
],
})
