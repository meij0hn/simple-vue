import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/main.css'
import accounting from 'accounting'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-default.css'
import moment from 'moment'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import JsonExcel from "vue-json-excel";

Vue.use(VueToast)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueSweetalert2);
Vue.component("downloadExcel", JsonExcel);

Vue.config.productionTip = false


Vue.filter('currency', function(val){
  return accounting.formatNumber(val)
})



Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD MMM YYYY hh:mm')
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')