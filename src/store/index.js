import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loader: {
      isVisible: true,
      status: ''
    },
  },
  mutations: {
    showLoader(state, status = '') {
      state.loader.isVisible = true
      state.loader.status = status
    },
    hideLoader(state) {
      state.loader.isVisible = false
      state.loader.status = ''
    },
  },
})
