import ApiServer, { AuthApi } from '@/api/server'
import TokenApi from '@/api/auth'

import {
  AUTH_APPLY,
  AUTH_LOGIN,
  AUTH_PURGE,
  AUTH_REGISTER,
} from './action-types'

import {
  USER, VEHICLES
} from './mutation-types'


const defaultState = {
  user: null,
}


const mutations = {
  [USER](state, user) {
    state.user = user
  },
}


const actions = {

  /**
   * Login user
   * Set token, then load user's data
   */
  [AUTH_LOGIN]({ commit }, { email, password }) {
    return new Promise((resolve, reject) => {
      AuthApi
        .login(email, password)
        .then(({ data }) => {
          const token = data.access
          TokenApi.setToken(token)
          ApiServer.setAuthHeader(token)
          AuthApi.getCurrentUser()
            .then(user => {
              commit(USER, user)
              resolve()
            })
        })
        .catch(status => reject(status))
    })
  },

  [AUTH_REGISTER]({ commit }, { email, password }) {
    return new Promise((resolve, reject) => {
      AuthApi
        .register(email, password)
        .then(({ data }) => commit(USER, data))
        .then(() => AuthApi.login(email, password))
        .then(({ data }) => {
          const token = data.access
          TokenApi.setToken(token)
          ApiServer.setAuthHeader(token)
          resolve()
        })
        .catch(error => reject(error))
    })
  },

  /**
   * Discover token and load user's data.
   */
  [AUTH_APPLY]({ commit }) {
    const token = TokenApi.getToken()

    return new Promise(resolve => {

      // TODO: resovle tripple resolve().
      // Task is to get current user, if okay commit data and resolve() anyway.

      if (token) {
        ApiServer.setAuthHeader(token)

        AuthApi.getCurrentUser()
          .then(({ data }) => {
            commit(USER, { id: data.id, email: data.email })
            commit(VEHICLES, data.vehicles)
            resolve()
          })
          .catch(() => {
            TokenApi.purgeToken()
            resolve()
          })
      } else {
        resolve()
      }
    })
  },

  /**
   * Purge token and user's data.
   */
  [AUTH_PURGE]({ commit }) {
    return new Promise(resolve => {
      TokenApi.purgeToken()
      ApiServer.purgeAuthHeader()
      commit(USER, null)
      resolve()
    })
  },

}


export default {
  state: defaultState,
  mutations,
  actions,
}
