import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'


import { library } from '@fortawesome/fontawesome-svg-core'

import {
  faArrowRight,
  faBars,
  faSearch,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.component('fa-icon', FontAwesomeIcon)

library.add(
  faArrowRight,
  faBars,
  faSearch,
  faTimes,
)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
