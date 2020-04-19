<template>
  <div>
    <an-subheader></an-subheader>

    <b-container v-if="note && kind" style="margin-top: 1rem;">
      <form @submit.prevent="submit">
        
        <b-form-group
          :state="titleState"
          invalid-feedback="Необходимо указать заголовок."
        >
          <b-form-input 
            v-model="note.title"
            placeholder="Заголовок"
            maxlength="200"
            id="title-input"
            required
          />
        </b-form-group>

        <b-form-group>
          <b-form-textarea 
            placeholder="Описание"
            v-model="note.content"
            rows="3"
            id="conetnt-input"
          />
        </b-form-group>

        <b-form-row>
          <b-col>
            <b-form-group
              :state="costState"
              invalid-feedback="Должно быть числом."
            >
              <b-form-input
                placeholder="Стоимость, руб."
                v-model="note.cost"
                :formatter="thousandsFormatter"
                min="0"
              />
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              :state="runState"
              invalid-feedback="Должно быть числом."
            >
              <b-form-input
                placeholder="Пробег, км."
                v-model="note.run"
                :formatter="thousandsFormatter"
                min="0"
              />
            </b-form-group>
          </b-col>
        </b-form-row>

        <b-form-group
          v-for="(o, k) in attachments"
          :key="`attachment-${k}`"
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
          <b-form-file
            v-if="!note[`attachment${o.n}`] || o.updated" 
            v-model="o.file" 
            :placeholder="`Файл ${o.n}`"
            browse-text="+"
          />
        </b-form-group>

        <an-input-submit :busy="busy">Сохранить</an-input-submit>
      </form>

    </b-container>
  </div>
</template>

<script>
  import AnSubheader from '@/components/subheader'
  import AnInputSubmit from '@/components/common/input-submit'

  import { NotesApi } from '@/api/server'
  import { GET_KIND, GET_VEHICLE } from '@/store/action-types'
  import { getFilename } from '@/helpers/note'

  import IconUpdateAttachment from 'vue-material-design-icons/Pencil.vue'
  import IconDeleteAttachment from 'vue-material-design-icons/DeleteOutline.vue'

  import { thousands } from '@/filters'

  export default {
    name: 'an-update-note-view',

    components: { AnSubheader, AnInputSubmit, IconUpdateAttachment, IconDeleteAttachment },

    data () {
      return {
        note: null,
        kind: null,
        vehicle: null,

        titleState: null,
        runState: null,
        costState: null,

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

      replaceWs (s) {
        if (!s) return s
        let str = String(s)
        return str.replace(' ', '')
      },

      thousandsFormatter (s) {
        if (!s) return ''
        return thousands(this.replaceWs(s))
      },

      isInt (s) {
        return (
          s === null || 
          s === undefined || 
          s === '' || 
          !isNaN(Number(this.replaceWs(s)))
        )
      },

      checkFormValidity () {
        this.titleState = Boolean(this.note.title)
        this.costState = this.isInt(this.note.cost)
        this.runState = this.isInt(this.note.run)
        return this.titleState && this.costState && this.runState
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

        data.append('run', this.replaceWs(this.note.run))
        data.append('cost', this.replaceWs(this.note.cost))

        for (let k in this.attachments) {
          if (this.attachments[k].updated || this.attachments[k].file) {
            const att = this.attachments[k]
            data.append(`attachment${att.n}`, att.file)
          }
        }

        let p

        if (this.note.id) {
          p = NotesApi.patch(this.note.id, data)
        } else {
          data.append('kind', this.kind.id)
          data.append('vehicle', this.vehicle.id)
          p = NotesApi.create(data)
        }

        p
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
      const vehicleId = this.$route.params.vehicleId
      const kindSlug = this.$route.params.kindSlug

      this.$store.dispatch(GET_VEHICLE, vehicleId)
        .then(vehicle => (this.vehicle = vehicle))
  
      this.$store.dispatch(GET_KIND, kindSlug)
        .then(kind => (this.kind = kind))

      if (noteId) {
         NotesApi.get(noteId)
          .then(note => (this.note = note))
      } else {
          this.note = {
            title: '',
            content: '',
            run: null,
            cost: null,
            attachment1: null,
            attachment2: null,
            attachment3: null,
          }
      }
    },

    updated () {
      // First time set false
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