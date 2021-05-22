import Vue from 'vue'
import Vuex from 'vuex'

import loader from './modules/loader'
import table from './modules/table'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    loader,
    table,
  }
})
