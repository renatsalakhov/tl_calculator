import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/TransportationCost.vue'),
  },
  {
    path: '/margin',
    component: () => import('@/views/MarginCalculation.vue'),
  },
  {
    path: '/customer',
    component: () => import('@/views/CustomerCalculation.vue'),
  },
  {
    path: '/insurance',
    component: () => import('@/views/InsuranceCalculation.vue'),
  },
  {
    path: '*',
    redirect: '/',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

export default router
