<template>
  <div v-if="vehicle">
    <an-subheader></an-subheader>
    <b-container>
      <h1>Внимание!</h1>
      <p>Данные об автомобиле «{{ vehicleTitle(vehicle) }}» будут удалены. Вы уверены?</p>
      <input-submit danger @click="submit">Удалить</input-submit>
    </b-container>
  </div>
</template>

<script>
  import AnSubheader from '@/components/subheader'
  import { vehicleTitle } from '@/helpers/vehicle'
  import { GET_VEHICLE, DELETE_VEHICLE } from '@/store/action-types'
  import InputSubmit from '@/components/common/input-submit'
  
  export default {
    name: 'an-delete-vehicle-view',

    components: { AnSubheader, InputSubmit },

    data () {
      return {
        busy: false,
        vehicle: null,
      }
    },

    methods: {
      vehicleTitle,

      submit () {
        this.busy = true
        this.$store.dispatch(DELETE_VEHICLE, this.vehicle.id)
          .then(() => {
            this.$router.push('/')
          })
          .catch(err => console.log(err))
          .finally(() => (this.busy = false))
      },
    },

    created () {
      const vehicleId = this.$route.params.vehicleId
      this.$store.dispatch(GET_VEHICLE, vehicleId)
        .then(vehicle => {
          this.vehicle = vehicle
        })
    }

  }
</script>
