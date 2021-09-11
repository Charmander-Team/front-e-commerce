import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/VoirCarte/:cardId',
    name: 'VoirCarte',
    component: () => import(/* webpackChunkName: "VoirCarte" */ '../views/VoirCarte.vue')
  },
  {
    path: '/Nouveautes',
    name: 'Nouveautes',
    component: () => import(/* webpackChunkName: "Nouveautes" */ '../views/Nouveautes.vue')
  },
  {
    path: '/Categories',
    name: 'Categories',
    component: () => import(/* webpackChunkName: "category" */ '../views/Categories.vue')
  },
  {
    path: '/VoirCategory/:categoryId',
    name: 'VoirCategory',
    component: () => import(/* webpackChunkName: "category voir" */ '../views/VoirCategory.vue')
  },
  {
    path: '/Regles',
    name: 'Regles',
    component: () => import(/* webpackChunkName: "Regles" */ '../views/Regles.vue')
  },
  {
    path: '/A-propos',
    name: 'A-propos',
    component: () => import(/* webpackChunkName: "A propos" */ '../views/APropos.vue')
  },
  {
    path: '/Page/1/:id',
    name: 'Page1',
    component: () => import(/* webpackChunkName: "Page1" */ '../views/Page1.vue')
  },
  {
    path: '/Page/2/:id',
    name: 'Page2',
    component: () => import(/* webpackChunkName: "Page2" */ '../views/Page2.vue')
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
  // scrollBehavior(to, from, savedPosition) {
  //   if (to.hash) {
  //       return { selector: to.hash }
  //   } else if (savedPosition) {
  //       return savedPosition;
  //   } else {
  //       return { x: 0, y: 0 }
  //   }
  // }
})

export default router
