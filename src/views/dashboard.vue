<template>
  <b-container>
    
    <template v-if="user && vehicles && vehicles.length > 0 && kinds">
      <b-row v-for="(o, k) in vehicles" :key="`vehicle-${k}`" align-v="center" no-gutters class="vehicle">
        <b-col cols="auto"><b-avatar variant="outline-primary" style="border: 2px solid var(--primary);" :src="vehiclePhoto(o)" size="4rem"></b-avatar></b-col>
        <b-col class="message"><b-link :to="vehicleRetrieveHref(o)">{{ vehicleTitle(o) }}</b-link></b-col>
      </b-row>
    </template>

    <template v-if="user && vehicles && vehicles.length === 0">
      <h1>Для начала</h1>
      <p class="message">
        Необходимо <b-link :to="vehicleCreateHref()">добавить автомобиль</b-link>.
      </p>
    </template>

    <template v-if="!user">
      <h1 style="font-size:2.7rem;">Учет<br> расходов<br> <nobr>на машину</nobr></h1>
      <p style="font-size:120%;">
        История обслуживании, ремонта и тюнинга вашего автомобиля.
      </p>
    </template>

  </b-container>
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
    margin: 1rem 0;

    .col-auto {
      margin-right: 1rem;
    }
  }
</style>
