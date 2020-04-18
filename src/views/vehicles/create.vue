<template>
  <div>
    <b-container>
      <form v-if="makers" ref="form" @submit.prevent="submit">
        <h1>Добавить авто</h1>

        <b-form-group
          :state="makerState"
          label="Производитель"
          label-for="maker-input"
          invalid-feedback="Укажите производителя."
        >
          <input-typeahead 
            v-model="makerTitle"
            :data="makers"
            :serializer="s => s.title"
            :min-matching-chars="1"
            @hit="maker = $event"
          />
        </b-form-group>

        <b-form-group
          :state="modelState"
          label="Модель"
          label-for="model-input"
          invalid-feedback="Укажите модель."
        >
          <input-typeahead 
            v-model="modelTitle"
            :data="models"
            :serializer="s => s.title"
            :min-matching-chars="1"
            @hit="model = $event"
            disabled
          >
            <template v-if="modelsLoading" slot="append">
              <span class="input-group-text"><b-spinner small/></span>
            </template>
          </input-typeahead>
        </b-form-group>

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

        <an-input-submit :busy="busy" @click="submit">Сохранить</an-input-submit>
      </form>
    </b-container>
  </div>
</template>

<script>
  import { VehiclesApi } from '@/api/server'
  import { CREATE_VEHICLE } from '@/store/action-types'
  import AnInputSubmit from '@/components/common/input-submit'
  import InputTypeahead from 'vue-bootstrap-typeahead'
  import { vehicleRetrieveHref } from '@/helpers/vehicle'

  export default {
    name: 'an-create-vehicle-view',
    components: { InputTypeahead, AnInputSubmit },

    data () {
      return {
        modelsLoading: false,
        
        maker: null,
        makerTitle: null,
        makerState: null,

        model: null,
        modelTitle: null,
        modelState: null,

        photo: null,
        year: null,
        yearState: null,

        busy: false,
        makers: null,
        models: [],
      }
    },

    methods: {

      checkFormValidity () {
        this.makerState = Boolean(this.maker)
        this.modelState = Boolean(this.model)
        this.yearState = Boolean(!this.year || (this.year >= 1950 && this.year <= 2020))
        
        return (
          this.makerState && 
          this.modelState && 
          this.yearState
        )
      },

      submit () {
        if (!this.checkFormValidity()) return

        this.busy = true

        const data = new FormData()

        data.append('model', this.model.id)

        if (this.year) data.append('year', this.year)
        if (this.photo) data.append('photo', this.photo)

        this.$store.dispatch(CREATE_VEHICLE, { data })
          .then(vehicle => {
            const href = vehicleRetrieveHref(vehicle)
            this.$router.push(href)
          })
          .catch(err => console.log(err))
          .finally(() => (this.busy = false))
      },

    },

    created () {
      VehiclesApi.listMakers()
        .then(makers => (this.makers = makers))
    },

    watch: {
      maker (newMaker) {
        if (!newMaker || !newMaker.id) return

        this.modelsLoading = true

        VehiclesApi.listModels(newMaker.id)
          .then(models => {
            this.modelsLoading = false
            this.models = models
          })
      }
    }
  }
</script>
