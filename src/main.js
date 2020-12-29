import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'


import { library } from '@fortawesome/fontawesome-svg-core'

import {
  faSearch,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.component('fa-icon', FontAwesomeIcon)

library.add(
  faSearch,
  faTimes,
)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
