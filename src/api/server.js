import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { SERVER_URL } from '@/config'


const Server = {

  _normHref(href) {
    if (
      href.slice(-1) === '/' ||
      href.indexOf('?') !== -1
    ) {
      return href
    } else {
      return `${href}/`
    }
  },

  _handleError(error) {
    throw error.response ? error.response.status : false
  },

  init() {
    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = SERVER_URL
  },

  /* Headers */

  setAuthHeader(token) {
    Vue.axios.defaults.headers.common['Authorization'] = `Token ${token}`
  },

  purgeAuthHeader() {
    Vue.axios.defaults.headers.common['Authorization'] = ''
  },

  /* Methods */

  list(resource, filter) {
    let href = Server._normHref(`${resource}`)
    
    if (filter) {
      let qs = ''
      for (let k in filter) {
        qs += `${k}=${filter[k]}&`
      }
      href += `?${qs}`
    }
    
    return Vue.axios.get(href)
      .catch(Server._handleError)
  },

  get(resource, id = '') {
    const href = Server._normHref(`${resource}/${id}`)
    return Vue.axios.get(href)
      .catch(Server._handleError)
  },

  post(resource, payload) {
    const href = Server._normHref(resource)
    return Vue.axios.post(href, payload)
      .catch(Server._handleError)
  },

  put(resource, id, payload) {
    const href = Server._normHref(`${resource}/${id}`)
    return Vue.axios.put(href, payload)
      .catch(Server._handleError)
  },

  patch(resource, id, payload) {
    const href = Server._normHref(`${resource}/${id}`)
    return Vue.axios.patch(href, payload)
      .catch(Server._handleError)
  },

  delete(resource, id) {
    const href = Server._normHref(`${resource}/${id}`)
    return Vue.axios.delete(href)
      .catch(Server._handleError)
  },

}


export default Server


export const AuthApi = {
  register: (email, password) => Server.post('users', { email, password }),
  
  login: (email, password) => Server.post('token/login', { email, password }),
  
  getCurrentUser: () => Server.get('users/current'),

  updatePassword (currentPassword, newPassword1, newPassword2) {
    return new Promise((resolve, reject) => {
      Server.post('users/update-password', {
        current_password: currentPassword,
        new_password1: newPassword1, 
        new_password2: newPassword2,
      })
        .then(resolve)
        .catch(err => {
          console.log('123', err)
          reject(err)
        })
    })
  }
}

/**
 * Abstract class to describe CRUD API
 */
class __AbstractApi {

  static get (id) {
    return new Promise((resolve, reject) => {
      Server.get(this.resource, id)
        .then(response => resolve(response.data))
        .catch(err => reject(err))
    })
  }

  static list () {
    return new Promise((resolve, reject) => {
      Server.list(this.resource)
        .then(response => resolve(response.data))
        .catch(err => reject(err))
    })
  }

  static create (payload) {
    return new Promise((resolve, reject) => {
      Server.post(this.resource, payload)
        .then(response => resolve(response.data))
        .catch(err => reject(err))
    })
  }

  static delete (id) {
    return new Promise((resolve, reject) => {
      Server.delete(this.resource, id)
        .then(resolve)
        .catch(err => reject(err))
    })
  }

  static patch (id, payload) {
    return new Promise((resolve, reject) => {
      Server.patch(this.resource, id, payload)
        .then(response => resolve(response.data))
        .catch(err => reject(err))
    })
  }
}

export class VehiclesApi extends __AbstractApi {

  static resource = 'vehicles'

  static listMakers () {
    return new Promise((resolve, reject) => {
      Server.get(`${this.resource}/makers`)
        .then(response => resolve(response.data))
        .catch(err => reject(err))
    })
  }

  static listModels (makerId) {
    return new Promise((resolve, reject) => {
      Server.get(`${this.resource}/makers/${makerId}`)
        .then(response => resolve(response.data.models))
        .catch(err => reject(err))
    })
  }

}


export class NotesApi extends __AbstractApi {

  static resource = 'notes'

  static listKinds () {
    return new Promise((resolve, reject) => {
      Server.get(`${this.resource}/kinds`)
        .then(response => resolve(response.data))
        .catch(err => reject(err))
    })
  }

  static list (vehicleId, kindId) {
    return new Promise((resolve, reject) => {
      const filter = {
        vehicle: vehicleId,
        kind: kindId,
      }
      Server.list(this.resource, filter)
        .then(response => resolve(response.data))
        .catch(err => reject(err))
    })
  }

  static aggregationByVehicle (vehicleId) {
    return new Promise((resolve, reject) => {
      Server.get(`${this.resource}/aggregations/vehicles/${vehicleId}`)
        .then(response => resolve(response.data))
        .catch(err => reject(err))
    })
  }

}
