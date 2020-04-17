import { VehiclesApi } from '@/api/server'

import {
  GET_VEHICLE,
  LOAD_VEHICLES,
  CREATE_VEHICLE,
  UPDATE_VEHICLE,
  DELETE_VEHICLE
} from './action-types'

import {
  VEHICLES,
} from './mutation-types'


const defaultState = {
  vehicles: null,
}


const mutations = {
  [VEHICLES] (state, vehicles) {
    state.vehicles = vehicles
  },
}


const actions = {

  [GET_VEHICLE]({ state }, vehicleId) {
    return new Promise((resolve, reject) => {
      for (let i in state.vehicles) {
        if (state.vehicles[i].id === parseInt(vehicleId)) {
          resolve(state.vehicles[i]) 
        }
      }
      reject('Vehicle with given id not found.')
    })
  },

  [LOAD_VEHICLES]({ commit }) {
    return new Promise((resolve, reject) => {
      VehiclesApi.list()
        .then(vehicles => {
          commit(VEHICLES, vehicles)
          resolve(vehicles)
        })
        .catch(err => reject(err))
    })
  },

  [CREATE_VEHICLE]({ state, commit }, payload) {
    return new Promise((resolve, reject) => {
      if (!(payload && payload.data)) reject('Wrong payload.')

      VehiclesApi.create(payload.data)
        .then(vehicle => {
          const updatedVehicles = state.vehicles
          updatedVehicles.push(vehicle)
          commit(VEHICLES, updatedVehicles)
          resolve(vehicle)
        })
        .catch(err => reject(err))
    })
  },
  
  [UPDATE_VEHICLE]({ state, commit }, payload) {
    return new Promise((resolve, reject) => {
      if (!(payload && payload.id && payload.data)) reject('Wrong payload.')

      VehiclesApi.patch(payload.id, payload.data)
        .then(vehicle => {
          const updatedVehicles = state.vehicles.map(v => {
            return v.id === vehicle.id
              ? vehicle
              : v
          })
          commit(VEHICLES, updatedVehicles)
          resolve(vehicle)
        })
        .catch(err => reject(err))
    })
  },

  [DELETE_VEHICLE]({ state, commit }, vehicleId) {
    return new Promise((resolve, reject) => {
      VehiclesApi.delete(vehicleId)
        .then(() => {
          const updatedVehicles = state.vehicles.filter(v => v.id !== vehicleId)
          commit(VEHICLES, updatedVehicles)
          resolve()
        })
        .catch(err => reject(err))
    })
  },

}


export default {
  state: defaultState,
  mutations,
  actions,
}
