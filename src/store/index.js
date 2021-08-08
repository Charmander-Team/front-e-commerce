import Vue from 'vue'
import Vuex from 'vuex'
import Users from './Users'
import Panier from './Panier'

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
    Panier,
  }
})
