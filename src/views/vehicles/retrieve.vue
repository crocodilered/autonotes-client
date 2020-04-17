<template>
  <div v-if="vehicle">
    <an-subheader></an-subheader>

    <b-container v-if="kinds && aggregation">
      <b-row class="kind"
        v-for="(o, k) in kinds"
        :key="`kind-${k}`"
        align-v="center"
      >
        <b-col>
          <b-link :to="`/notes/${o.slug}/${vehicle.id}/`">{{ o.title }}</b-link>
        </b-col>
        <b-col cols="4" style="text-align:right;">
          <span v-if="aggregation[o.id]">{{ aggregation[o.id] | thousands }} ₽</span>
          <span v-else>0 ₽</span>
        </b-col>
        <b-col cols="auto">
          <b-button variant="link" :to="`/notes/${o.slug}/${vehicle.id}/create/`"><icon-create></icon-create></b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import { NotesApi } from '@/api/server'
  import AnSubheader from '@/components/subheader'
  
  import IconCreate from 'vue-material-design-icons/Plus.vue'

  import { GET_VEHICLE, LOAD_KINDS } from '@/store/action-types'

  export default {
    name: 'an-retrieve-vehicle-view',

    components: { AnSubheader, IconCreate },

    data () {
      return {
        vehicle: null,
        kinds: null,
        aggregation: null,
      }
    },

    methods: {
      /**
       * Convert server data to lookup by kind table.
       */
      convertAggregation (serverData) {
        let ret = {}
        for (let i in serverData) {
          const o = serverData[i]
          ret[o.kind] = o.cost__sum
        }
        return ret
      }
    },

    created () {
      const vehicleId = this.$route.params.vehicleId
      
      this.$store.dispatch(GET_VEHICLE, vehicleId)
        .then(vehicle => (this.vehicle = vehicle))
      
      this.$store.dispatch(LOAD_KINDS)
        .then(kinds => (this.kinds = kinds))
      
      NotesApi.aggregationByVehicle(vehicleId)
        .then(aggregation => (this.aggregation = this.convertAggregation(aggregation)))
    },
  }
</script>

<style lang="scss">
  .kind {
    padding: 0.8rem 0;
    border-bottom: 1px solid rgb(224, 224, 224);

    &:last-child {
      border-bottom: 0;
    }

    .btn {
      margin-right: -15px;
    }
  }
</style>
