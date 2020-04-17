<template>
  <b-container v-if="vehicle && kind">
    <h1 v-if="vehicle && kind">
      {{ kind.title }}<br><small>добавить заметку</small>
    </h1>

    <form v-if="vehicle && kind" ref="form" @submit.prevent="submit">
      
      <b-form-group
        :state="titleState"
        label="Заголовок"
        label-for="title-input"
        invalid-feedback="Необходимо указать заголовок."
      >
        <b-form-input 
          v-model="title"
          maxlength="200"
          id="title-input"
          required
        />
      </b-form-group>

      <b-form-group
        label="Описание"
        label-for="content-input"
      >
        <b-form-textarea 
          v-model="content"
          rows="3"
          id="conetnt-input"
        />
      </b-form-group>

      <b-form-row>
        <b-col>
          <b-form-group
            label="Стоимость, руб."
            label-for="cost-input"
          >
            <b-form-input
              v-model="cost"
              type="number"
              number
              min="0"
            />
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            label="Пробег, км."
            label-for="run-input"
          >
            <b-form-input
              v-model="run"
              type="number"
              number
              min="0"
            />
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-group
        label="Файл 1"
        label-for="attachment1-input"
      >
        <b-form-file v-model="attachment1"/>
      </b-form-group>

      <b-form-group
        v-show="attachment1"
        label="Файл 2"
        label-for="attachment2-input"
      >
        <b-form-file v-model="attachment2"/>
      </b-form-group>

      <b-form-group
        v-show="attachment2"
        label="Файл 3"
        label-for="attachment3-input"
      >
        <b-form-file v-model="attachment3"/>
      </b-form-group>

      <an-input-submit @click="submit">Сохранить</an-input-submit>
    </form>

  </b-container>
</template>

<script>
  import { NotesApi } from '@/api/server'
  import { GET_VEHICLE, GET_KIND } from '@/store/action-types'
  import AnInputSubmit from '@/components/common/input-submit'

  export default {
    name: 'an-create-note-view',

    components: { AnInputSubmit },

    data () {
      return {
        title: null,
        titleState: null,

        content: null,
        run: null,
        cost: null,

        attachment1: null,
        attachment2: null,
        attachment3: null,

        kind: null,
        vehicle: null,
        busy: false,
      }
    },

    methods: {
      checkFormValidity () {
        this.titleState = Boolean(this.title)
        return this.titleState
      },

      submit () {
        if (!this.checkFormValidity()) return

        this.busy = true

        const data = new FormData()
        
        data.append('title', this.title)
        data.append('vehicle', this.vehicle.id)
        data.append('kind', this.kind.id)
        
        if (this.content) data.append('content', this.content)
        if (this.run) data.append('run', this.run)
        if (this.cost) data.append('cost', this.cost)
        if (this.attachment1) data.append('attachment1', this.attachment1)
        if (this.attachment2) data.append('attachment2', this.attachment2)
        if (this.attachment3) data.append('attachment3', this.attachment3)

        NotesApi.create(data)
          .then(() => {
            this.$router.push('../')
          })
          .catch(err => console.log(err))
          .finally(() => (this.busy = false))
      }
    },

    created () {
      const vehicleId = this.$route.params.vehicleId
      const kindSlug = this.$route.params.kindSlug

      this.$store.dispatch(GET_VEHICLE, vehicleId)
        .then(vehicle => (this.vehicle = vehicle))
  
      this.$store.dispatch(GET_KIND, kindSlug)
        .then(kind => (this.kind = kind))
    }
  }
</script>
