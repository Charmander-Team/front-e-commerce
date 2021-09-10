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
  //{
    //path: '/about',
    //name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  //}
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
