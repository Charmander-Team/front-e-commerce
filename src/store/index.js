import Vue from 'vue'
import Vuex from 'vuex'
import Users from './Users'

Vue.use(Vuex)

export default new Vuex.Store({
  // state: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  modules: {
    Users,
  }
})
