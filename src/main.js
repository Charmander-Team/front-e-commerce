import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueResizeText from 'vue-resize-text'
import axios from 'axios'

import config from './../config/config.js'

Vue.use(VueResizeText)

Vue.config.productionTip = false

Vue.prototype.$axios = axios

Vue.prototype.$apiPort = config.api_port

// Vue.prototype.$store = store

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

