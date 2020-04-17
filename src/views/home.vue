<template>
  <div class="container">
    <template v-if="user">
      <an-list-vehicles
        @update="v => (vehicleToUpdate = v)"
        @delete="v => (vehicleToDelete = v)"
        @archive="v => (vehicleToArchive = v)"
      />
      
      <hr style="margin:2rem"/>

      <h2><b-icon-plus/><b-link @click="createModalVisibility = true">Добавить авто</b-link></h2>

      <an-create-vehicle-modal
        v-if="createModalVisibility"
        v-model="createModalVisibility"
      />

      <an-update-vehicle-modal 
        v-if="vehicleToUpdate" 
        v-model="vehicleToUpdate"
      />

      <an-delete-vehicle-modal 
        v-if="vehicleToDelete" 
        v-model="vehicleToDelete"
      />

      <an-archive-vehicle-modal 
        v-if="vehicleToArchive" 
        v-model="vehicleToArchive"
      />

    </template>
    <template v-else>
      anon
    </template>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import AnListVehicles from '@/components/vehicle/list'

  export default {
    name: 'an-home',
    components: {
      AnListVehicles, 
      AnCreateVehicleModal: () => import('@/components/vehicle/create-modal'),
      AnUpdateVehicleModal: () => import('@/components/vehicle/update-modal'),
      AnDeleteVehicleModal: () => import('@/components/vehicle/delete-modal'),
      AnArchiveVehicleModal: () => import('@/components/vehicle/archive-modal'),
    },

    data () {
      return {
        createModalVisibility: false,
        vehicleToUpdate: null,
        vehicleToDelete: null,
        vehicleToArchive: null,
      }
    },

    computed: mapState({
      user: state => state.auth.user
    }),
  }
</script>
