import Vue from 'vue'
import Vuex from 'vuex'

import {
} from './action-types'

import {
  RETURN_PATH,
} from './mutation-types'

import authModule from './auth-module'
import vehiclesModule from './vehicles-module'
import notesModule from './notes-module'


Vue.use(Vuex)


const defaultState = {
  returnPath: null
}


const mutations = {
  [RETURN_PATH](state, returnPath) {
    state.returnPath = returnPath
  },
}


export default new Vuex.Store({
  state: defaultState,
  mutations,
  modules: {
    auth: authModule,
    vehicles: vehiclesModule,
    notes: notesModule,
  }
})
