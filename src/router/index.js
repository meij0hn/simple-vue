import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import logoute3 from '../views/Logout-E3.vue'
import cekpaymentorder from '../views/Cek-Payment-Order.vue'
import Vat from '../views/Vat.vue'
import bookinginfo from '../views/BookingInfo.vue'
import cancel from '../views/Cancel.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/logout-e3',
    name: 'logoute3',
    component: logoute3
  },
  {
    path: '/cek-payment-order',
    name: 'cekpaymentorder',
    component: cekpaymentorder
  },
  {
    path: '/vat',
    name: 'Vat',
    component: Vat
  },
  {
    path: '/bookinginfo',
    name: 'bookinginfo',
    component: bookinginfo
  },
  {
    path: '/cancel',
    name: 'cancel',
    component: cancel
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
