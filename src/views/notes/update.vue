<template>
  <div>
    <an-subheader></an-subheader>

    <b-container v-if="note" style="margin-top: 1rem;">
      <form @submit.prevent="submit">
        
        <b-form-group
          :state="titleState"
          label="Заголовок"
          label-for="title-input"
          invalid-feedback="Необходимо указать заголовок."
        >
          <b-form-input 
            v-model="note.title"
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
            v-model="note.content"
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
                v-model="note.cost"
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
                v-model="note.run"
                type="number"
                number
                min="0"
              />
            </b-form-group>
          </b-col>
        </b-form-row>

        <b-form-group
          v-for="(o, k) in attachments"
          :key="`attachment-${k}`"
          :label="`Файл ${o.n}`"
        >
          <b-row v-if="note[`attachment${o.n}`] && !o.updated">
            <b-col class="long-text">
              <a :href="note[`attachment${o.n}`]" target="blank">
                {{ getFilename(note[`attachment${o.n}`]) }}
              </a>
            </b-col>
            <b-col cols="auto" class="attachment-toolbar">
              <b-button variant="outline-secondary" @click="o.updated = true">
                <icon-update-attachment></icon-update-attachment>
              </b-button>
              <b-button variant="outline-danger" @click="o.updated = true">
                <icon-delete-attachment></icon-delete-attachment>
              </b-button>
            </b-col>
          </b-row>
          <b-form-file v-if="!note[`attachment${o.n}`] || o.updated" v-model="o.file"/>
        </b-form-group>

        <an-input-submit @click="submit" :busy="busy">Сохранить</an-input-submit>
      </form>

    </b-container>
  </div>
</template>

<script>
  import AnSubheader from '@/components/subheader'
  import AnInputSubmit from '@/components/common/input-submit'

  import { NotesApi } from '@/api/server'
  import { getFilename } from '@/helpers/note'

  import IconUpdateAttachment from 'vue-material-design-icons/Pencil.vue'
  import IconDeleteAttachment from 'vue-material-design-icons/DeleteOutline.vue'

  export default {
    name: 'an-update-note-view',

    components: { AnSubheader, AnInputSubmit, IconUpdateAttachment, IconDeleteAttachment },

    data () {
      return {
        note: null,

        titleState: null,
        busy: false,
        unsaved: undefined,

        attachments: [
          { n: 1, updated: false, file: null, },
          { n: 2, updated: false, file: null, },
          { n: 3, updated: false, file: null, },
        ]
      }
    },

    methods: {
      getFilename,

      checkFormValidity () {
        this.titleState = Boolean(this.note.title)
        return this.titleState
      },

      confirmDestroy () {
        return new Promise(resolve => {
          this.$bvModal.msgBoxConfirm('Остались несохраненные данные, все равно уйти?', {
            title: 'Внимание!',
            cancelTitle: 'Отмена',
            centered: true,
          })
            .then(value => resolve(value))
        })
      },

      submit () {
        if (!this.checkFormValidity()) return

        this.busy = true

        const data = new FormData()
        
        data.append('title', this.note.title)
        data.append('content', this.note.content)
        data.append('run', this.note.run)
        data.append('cost', this.note.cost)

        for (let k in this.attachments) {
          if (this.attachments[k].updated || this.attachments[k].file) {
            const att = this.attachments[k]
            data.append(`attachment${att.n}`, att.file)
          }
        }

        NotesApi.patch(this.note.id, data)
          .then(() => {
            this.unsaved = false
            this.$router.push('../')
          })
          .catch(err => console.log(err))
          .finally(() => (this.busy = false))
      }
    },

    created () {
      const noteId = this.$route.params.noteId

      NotesApi.get(noteId)
        .then(note => (this.note = note))
    },

    updated () {
      // First time set false, others times - true
      this.unsaved = this.unsaved === undefined
        ? false
        : true
    },

    beforeRouteLeave (to, from, next) {
      if (this.unsaved) {
         this.confirmDestroy()
          .then(value => {
            if (value) next()
          })
      } else {
        next()
      }
    }
  }
</script>

<style lang="scss">
  .attachment-toolbar .btn {
    margin-left: 1rem;
    zoom: 0.8;
  }
</style>