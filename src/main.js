import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueResizeText from 'vue-resize-text'
import axios from 'axios'

import apiPort from './../config/api_port.js'

Vue.use(VueResizeText)

Vue.config.productionTip = false

Vue.prototype.$axios = axios

Vue.prototype.$apiPort = apiPort

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

