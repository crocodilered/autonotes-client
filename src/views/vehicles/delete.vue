<template>
  <div v-if="vehicle">
    <an-subheader></an-subheader>
    
    <b-container v-if="vehicle.notes_count === 0">
      <h1>Внимание!</h1>
      <p>Данные об автомобиле «{{ vehicleTitle(vehicle) }}» будут удалены. Вы уверены?</p>
      <input-submit danger :busy="busy" @click="submit">Удалить</input-submit>
    </b-container>

    <b-container v-else class="mt-4">
      <p class="message">Автомобиль «{{ vehicleTitle(vehicle) }}» не может быть удален, так как о нем имеются заметки.</p>
      <p>Позже мы этот вопрос победим, а пока вот так.</p>
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
