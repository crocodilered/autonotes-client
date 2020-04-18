<template>
  <div>
    <an-subheader></an-subheader>

    <b-container v-if="kind && notes && notes.length > 0" style="margin-top:1rem;">
      <table class="notes">
        <tr v-for="(o, k) in notes" :key="`note-${k}`">
          <td><b-link :to="`./${o.id}/`">{{ o.title }}</b-link></td>
          <td><span v-show="o.cost">{{ o.cost | thousands }} ₽</span></td>
        </tr>
      </table>
    </b-container>

    <b-container v-if="kind && notes && notes.length === 0" style="margin-top:1rem;">
      <p class="message">Пока нет ни одной заметки.</p>
      <b-button to="./create/">Добавить</b-button>
    </b-container>

  </div>
</template>

<script>
  import AnSubheader from '@/components/subheader'
  import { NotesApi } from '@/api/server'
  import { GET_KIND } from '@/store/action-types'

  export default {
    name: 'an-list-notes-view',
    components: { AnSubheader },

    data () {
      return {
        kind: null,
        notes: null
      }
    },

    created () {
      const vehicleId = this.$route.params.vehicleId
      const kindSlug = this.$route.params.kindSlug
      
      this.$store.dispatch(GET_KIND, kindSlug)
        .then(kind => {
          this.kind = kind

          NotesApi.list(vehicleId, kind.id)
            .then(notes => (this.notes = notes))
        })

      
    }
  }
</script>

<style lang="scss">
  .notes {
    width: 100%;

    td {
      padding: 0 0 0.5rem 0;
    
      &:last-child {
        padding-left: 1rem;
        text-align: right;
      }
    }
  }
</style>