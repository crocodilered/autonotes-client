<template>
  <div>
    
    <template v-if="user && vehicles && vehicles.length > 0 && kinds">

      <div
        v-for="(o, k) in vehicles"
        :key="`vehicle1-${k}`"
        class="vehicle"
        @click="goVehicle(o)"
        :style="{backgroundImage: `url(${vehiclePhoto(o)})`}"
      >
        <h2>{{ vehicleTitle(o) }}</h2>
        <h2 class="z2">{{ vehicleTitle(o) }}</h2>
      </div>

    </template>

    <b-container v-if="user && vehicles && vehicles.length === 0">
      <h1>Для начала</h1>
      <p class="message">
        Необходимо <b-link :to="vehicleCreateHref()">добавить автомобиль</b-link>.
      </p>
    </b-container>

    <b-container v-if="!user">
      <h1 style="font-size:2.7rem;">Учет<br> расходов<br> <nobr>на автомобиль</nobr></h1>
      <p style="font-size:120%; margin: 2rem 0;">
        История и учет обслуживания, ремонта и тюнинга вашего авто.
      </p>
      <p style="margin: 2rem 0;">
        <b-button to="/register/" variant="primary" size="lg">Зарегистрироваться</b-button>
      </p>
      <p>
        <b-button to="/login/" variant="outline-primary" size="lg">Войти</b-button>
      </p>
    </b-container>

  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { LOAD_KINDS } from '@/store/action-types'
  import { vehicleTitle, vehiclePhoto, vehicleRetrieveHref, vehicleCreateHref } from '@/helpers/vehicle' 
  
  export default {
    name: 'an-dashboard',

    methods: {
      vehicleTitle,
      vehiclePhoto,
      vehicleRetrieveHref,
      vehicleCreateHref,

      goVehicle (vehicle) {
        const href = vehicleRetrieveHref(vehicle)
        this.$router.push(href)
      }
    },

    computed: {
      ...mapState({
        user: state => state.auth.user,
        vehicles: state => state.vehicles.vehicles
      }),
    },

    data () {
      return {
        kinds: null
      }
    },

    created () {
      if (this.user) {
        this.$store.dispatch(LOAD_KINDS)
          .then(kinds => (this.kinds = kinds))
      }
    }
  }
</script>

<style lang="scss">
  .vehicle {
    max-width: 550px !important;
    margin: 0 auto;
    height: 200px;
    background-size: 100%;
    padding: 130px 10px 0 0;
    cursor: pointer;

    h2 {
      position: absolute;
      margin: 0;
      font-size: 22px;
      padding: 10px 15px;

      &.z2 {
        background: white;
        opacity: 0.8;
      }
    }
  }
</style>
