import Vue from 'vue'
import Vuex from 'vuex'
import {user} from './user.js'


import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{id:'0'}
  },
  mutations: {
    userloig(state, user) {
      state.user = user
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
              id_key: val.user
          }
      },
        // paths: ["user"]
    })
],
})
