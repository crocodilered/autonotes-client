import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'

import '@/plugins/bootstrap-vue'

import App from '@/app'
import Server from '@/api/server'
import store from '@/store'
import router from '@/router'

import 'vue-material-design-icons/styles.css'

import { date as dateFilter, thousands as thousandsFilter } from '@/filters'

Vue.config.productionTip = false

Server.init()

Vue.filter('date', dateFilter)
Vue.filter('thousands', thousandsFilter)

const payload = {
  store,
  router,
  render: h => h(App),
}
new Vue(payload).$mount('#app')
