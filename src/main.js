import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import VueGtag from 'vue-gtag'

import '@/plugins/bootstrap-vue'

import App from '@/app'
import Server from '@/api/server'
import store from '@/store'
import router from '@/router'
import { date as dateFilter, thousands as thousandsFilter } from '@/filters'
import { GTAG_ID } from '@/config'

import 'vue-material-design-icons/styles.css'

Vue.config.productionTip = false

Vue.filter('date', dateFilter)
Vue.filter('thousands', thousandsFilter)

const gTagOptions = {
  config: { id: GTAG_ID },
  appName: 'Autonotes',
  pageTrackerScreenviewEnabled: true,
}

Vue.use(VueGtag, gTagOptions, router)

Server.init()

const vueOptions = {
  store,
  router,
  render: h => h(App),
}

new Vue(vueOptions).$mount('#app')
