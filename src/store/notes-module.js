import { NotesApi } from '@/api/server'

import {
  LOAD_KINDS,
  GET_KIND
} from './action-types'

import {
  KINDS,
} from './mutation-types'


const defaultState = {
  kinds: null, // Idea is to cache the list for entire application
}


const mutations = {
  [KINDS](state, kinds) {
    state.kinds = kinds
  },
}


const actions = {

  [LOAD_KINDS]({ state, commit }) {
    return new Promise((resolve, reject) => {
      if (state.kinds) {
        resolve(state.kinds)
      } else {
        NotesApi.listKinds()
          .then(kinds => {
            commit(KINDS, kinds)
            resolve(kinds)
          })
          .catch(err => reject(err))
      }
    })
  },

  // TODO: Ugly?
  [GET_KIND]({ state, dispatch }, slug) {
    

    

    return new Promise((resolve, reject) => {

      const lookup = (kinds, slug) => {
        for (let i in kinds)
          if (kinds[i].slug === slug) 
            return kinds[i]
      }

      const process = () => {
        const kind = lookup(state.kinds, slug)
        if (kind) resolve(kind); else reject('Kind with given slug not found.')
      }

      if (state.kinds) {
        process()
      } else {
        dispatch(LOAD_KINDS).then(process)
      }

    })
  }

}


export default {
  state: defaultState,
  mutations,
  actions,
}
