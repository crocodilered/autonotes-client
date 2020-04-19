<template>
  <div class="retrieve-note">
    <an-subheader></an-subheader>

    <b-container v-if="note">
      <h1>{{ note.title }}</h1>
      <p><small>{{ note.created | date }}</small></p>
      <p v-if="note.run || note.cost">
        <span v-if="note.run">{{ note.run | thousands }} км.</span><span 
          v-if="note.cost && note.run">, </span>
        <span v-if="note.cost">{{ note.cost | thousands }} руб.</span>
      </p>
      <p v-if="note.content" v-html="note.content.replace(/\n/g, '<br>')"></p>

      <div v-for="(o, i) in [1, 2, 3]" :key="`attachment-${i}`">
        <b-row v-if="note[`attachment${o}`]" no-gutters class="attachment">
          <b-col cols="auto"><icon-file></icon-file></b-col>
          <b-col class="long-text"><a :href="note[`attachment${o}`]" target="blank">{{ getFilename(note[`attachment${o}`]) }}</a></b-col>
        </b-row>
      </div>
    </b-container>

    <hr style="margin: 2rem 0;">

    <b-container class="toolbar">
      <b-row align-h="end">
        <b-col cols="auto">
          <b-button variant="outline-secondary" style="margin-right:0.5rem;" to="./update/">
            <icon-update></icon-update>
          </b-button>
          <b-button variant="outline-danger" to="./delete/">
            <icon-delete></icon-delete>
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import AnSubheader from '@/components/subheader'
  import { NotesApi } from '@/api/server'
  import { getFilename } from '@/helpers/note'

  import IconUpdate from 'vue-material-design-icons/SquareEditOutline.vue'
  import IconDelete from 'vue-material-design-icons/DeleteOutline.vue'
  import IconFile from 'vue-material-design-icons/Paperclip.vue'
  
  export default {
    name: 'an-retrieve-note-view',

    components: { AnSubheader, IconUpdate, IconDelete, IconFile },

    data () {
      return {
        note: null
      }
    },

    methods: {
      getFilename
    },

    created () {
      const noteId = this.$route.params.noteId

      NotesApi.get(noteId)
        .then(note => (this.note = note))
    }
  }
</script>

<style lang="scss">
  .retrieve-note {
    .attachment {
      margin: 0.5rem 0;
    }
  }
</style>