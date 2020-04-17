<template>
  <div v-if="note">
    <an-subheader></an-subheader>
    <b-container>
      <h1>Внимание!</h1>
      <p>Заметка «{{ note.title }}» будет удалена. Вы уверены?</p>
      <an-input-submit @click="submit" danger>Удалить</an-input-submit>
    </b-container>
  </div>
</template>

<script>
  import AnSubheader from '@/components/subheader'
  import { NotesApi } from '@/api/server'
  import { GET_VEHICLE } from '@/store/action-types'

  import AnInputSubmit from '@/components/common/input-submit'
  
  export default {
    name: 'an-delete-note-view',

    components: { AnSubheader, AnInputSubmit },

    data () {
      return {
        vehicle: null,
        note: null
      }
    },

    methods: {
      submit () {
        NotesApi.delete(this.note.id)
          // return to kind index
          .then(() => this.$router.push('../../'))
      }
    },

    created () {
      const vehicleId = this.$route.params.vehicleId
      const noteId = this.$route.params.noteId

      this.$store.dispatch(GET_VEHICLE, vehicleId)
        .then(vehicle => (this.vehicle = vehicle))

      NotesApi.get(noteId)
        .then(note => (this.note = note))
    }
  }
</script>
