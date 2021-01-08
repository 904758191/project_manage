import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
  },
  state: {
    datasrc: '', // 政策管理平台信息存储
    tablesrc: '', // 分库信息存储
    searched_path: {},
  },
  mutations: {
    SET_DATASRC: (state, datasrc) => {
      state.datasrc = datasrc;
    },
    SET_TABLESRC: (state, tablesrc) => {
      state.tablesrc = tablesrc;
    },
  },
  actions: {
  },
  getters: {
  }
})
