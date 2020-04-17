<template>
  <b-container>
    
    <template v-if="user && kinds">
      <b-row v-for="(o, k) in vehicles" :key="`vehicle-${k}`" align-v="center" no-gutters class="vehicle">
        <b-col cols="auto"><b-avatar variant="outline-primary" style="border: 2px solid var(--primary);" :src="vehiclePhoto(o)" size="4rem"></b-avatar></b-col>
        <b-col class="message"><b-link :to="vehicleRetrieveHref(o)">{{ vehicleTitle(o) }}</b-link></b-col>
      </b-row>
    </template>

    <template v-if="!user">
      anon
    </template>

  </b-container>
</template>

<script>
  import { mapState } from 'vuex'
  import { LOAD_KINDS } from '@/store/action-types'
  import { vehicleTitle, vehiclePhoto, vehicleRetrieveHref } from '@/helpers/vehicle' 
  
  export default {
    name: 'an-dashboard',

    methods: {
      vehicleTitle,
      vehiclePhoto,
      vehicleRetrieveHref,
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
      this.$store.dispatch(LOAD_KINDS)
        .then(kinds => (this.kinds = kinds))
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
