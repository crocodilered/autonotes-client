<template>
  <div v-if="vehicle" class="subheader">
    <b-container>
      <b-row no-gutters align-v="center">
        <b-col>
          <h2>
            <span v-if="vehicle">{{ vehicleTitle(vehicle) }}</span>
            <span v-if="vehicle && kind" style="margin: 0 0.5rem;">/</span>
            <span v-if="kind">{{ kind.title }}</span>
          </h2>
        </b-col>
        <b-col cols="auto">
          <b-dropdown variant="link" right no-caret>
            <template v-slot:button-content>
              <icon-menu></icon-menu>
              <span class="sr-only">Меню</span>
            </template>
            <!--b-dropdown-text>Автомобиль:</b-dropdown-text-->
            <b-dropdown-item :to="vehicleRetrieveHref(vehicle)">Начало</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item :to="vehicleUpdateHref(vehicle)">Изменить авто</b-dropdown-item>
            <b-dropdown-item :to="vehicleDeleteHref(vehicle)">Удалить авто</b-dropdown-item>
          </b-dropdown>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import { 
    vehicleTitle, 
    vehicleUpdateHref, 
    vehicleDeleteHref, 
    vehicleRetrieveHref
  } from '@/helpers/vehicle'
  
  import { GET_VEHICLE, GET_KIND } from '@/store/action-types'
  import IconMenu from 'vue-material-design-icons/DotsVertical.vue'

  export default {
    name: 'an-subheader',

    components: { IconMenu },

    data () {
      return {
        vehicle: null,
        kind: null,
        menuVisibility: false,
      }
    },

    methods: {
      vehicleTitle,
      vehicleRetrieveHref,
      vehicleUpdateHref,
      vehicleDeleteHref,
    },

    created () {
      const vehicleId = this.$route.params.vehicleId
      const kindSlug = this.$route.params.kindSlug

      if (vehicleId) {
        this.$store.dispatch(GET_VEHICLE, vehicleId)
          .then(vehicle => (this.vehicle = vehicle))
      }
  
      if (kindSlug) {
        this.$store.dispatch(GET_KIND, kindSlug)
          .then(kind => (this.kind = kind))
      }
    }
  }
</script>

<style lang="scss">
  $padding: 0rem;

  .subheader {
    background: #E1E2E1;
    padding-top: $padding;
    padding-bottom: $padding;
    margin-bottom: 0;

    h2 {
      margin: 0;
      font-size: 1.1rem;
      color: #000;
    }

    .dropdown {
      .dropdown-toggle {
        margin-right: -15px; // 15px is b-container's margin
      }
    }
  }
</style>
