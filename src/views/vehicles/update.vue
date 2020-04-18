<template>
  <div v-if="vehicle">
    <an-subheader></an-subheader>

    <b-container>
      <form @submit.prevent="submit">
        <h2>Изменить авто</h2>

        <b-form-group
          label="Фото"
          label-for="photo-input"
          description="Не обязательно."
        >
          <b-form-file
            v-model="photo"
            accept="image/*"
          />
        </b-form-group>

        <b-form-group
          label="Год выпуска"
          label-for="year-input"
          invalid-feedback="Год выпуска может быть от 1950 года до 2020."
          :state="yearState"
          description="Не обязательно, но желательно."
        >
          <b-form-input
            v-model="year"
            type="number"
            number
            min="1950"
            max="2020"
            max-length="4"
            style="width:7rem;"
          />
        </b-form-group>

        <input-submit @click="submit">Сохранить</input-submit>

      </form>
    </b-container>
  </div>
</template>

<script>
  import AnSubheader from '@/components/subheader'

  import { GET_VEHICLE, UPDATE_VEHICLE } from '@/store/action-types'
  import InputSubmit from '@/components/common/input-submit'
  import { vehicleRetrieveHref } from '@/helpers/vehicle'

  export default {
    name: 'an-update-vehicle-view',

    components: { AnSubheader, InputSubmit },

    data () {
      return {
        vehicle: null,
        photo: null,
        year: null,
        yearState: null,
        busy: false,
      }
    },

    methods: {
      vehicleRetrieveHref, 

      checkFormValidity () {
        this.yearState = Boolean(!this.year || (this.year >= 1950 && this.year <= 2020))
        return this.yearState
      },

      submit () {
        if (!this.checkFormValidity()) return

        this.busy = true

        const formData = new FormData()

        if (this.year) formData.append('year', this.year)
        if (this.photo) formData.append('photo', this.photo)

        this.$store.dispatch(UPDATE_VEHICLE, {
          id: this.vehicle.id, 
          data: formData
        })
          .then(() => this.$router.push(vehicleRetrieveHref(this.vehicle)))
          .catch(err=> console.log(err))
          .finally(() => this.busy = false)
      },

    },

    created () {
      const vehicleId = this.$route.params.vehicleId
  
      this.$store.dispatch(GET_VEHICLE, vehicleId)
        .then(vehicle => {
          this.vehicle = vehicle
          this.year = vehicle.year
        })
    }

  }
</script>
