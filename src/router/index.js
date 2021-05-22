import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'TransportationCost',
    component: () => import('@/views/TransportationCost.vue'),
  },
  {
    path: '/margin',
    name: 'MarginCalculation',
    component: () => import('@/views/MarginCalculation.vue'),
  },
  {
    path: '/customer',
    name: 'CustomerCalculation',
    component: () => import('@/views/CustomerCalculation.vue'),
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
