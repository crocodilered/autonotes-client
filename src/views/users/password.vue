<template>
  <b-container>
    <h1>Изменить пароль</h1>
    
    <form v-if="!done && !error && !error401" @submit.prevent="updatePassword">
      
      <b-form-group
        :state="password0State"
        label="Текущий пароль"
        invalid-feedback="Необходимо заполнить это поле."
        label-for="password0-input"
      >
        <b-form-input
          type="password"
          id="password0-input"
          ref="password0-input"
          v-model="password0"
          :state="password0State"
          required
        />
      </b-form-group>

      <hr>

      <b-form-group
        :state="password1State"
        label="Новый пароль"
        invalid-feedback="Необходимо заполнить это поле."
        label-for="password1-input"
      >
        <b-form-input
          type="password"
          id="password1-input"
          ref="password1-input"
          v-model="password1"
          :state="password1State"
          required
        />
      </b-form-group>

      <b-form-group
        :state="password2State"
        label="Новый пароль еще раз"
        :invalid-feedback="password2InvalidFeedback"
        label-for="password2-input"
      >
        <b-form-input
          type="password"
          id="password2-input"
          ref="password2-input"
          v-model="password2"
          :state="password2State"
          required
        />
      </b-form-group>

      <an-input-submit
        :busy="busy"
        @click="updatePassword"
      >
        Сохранить
      </an-input-submit>
    </form>

    <b-alert v-model="error401" variant="danger" dismissible>
      <h2>Произошла ошибка</h2>
      <p>Возможно, вы не верно ввели текущий пароль.</p>
    </b-alert>

    <b-alert v-model="error" variant="danger" dismissible>
      <h2>Отсутствует связь с сервером :-(</h2>
    </b-alert>

    <b-alert v-model="done" variant="success">
      <h2>Пароль обновлен.</h2>
    </b-alert>

  </b-container>
</template>


<script>
  import AnInputSubmit from '@/components/common/input-submit'
  import { AuthApi } from '@/api/server'
  
  export default {
    name: 'an-user-password-view',
    components: { AnInputSubmit },

    data () {
      return {
        password0: null,
        password1: null,
        password2: null,

        password0State: null,
        password1State: null,
        password2State: null,
        password2InvalidFeedback: null,

        busy: false,
        done: false,
        error: false,
        error401: false,
      }
    },

    methods: {
      updatePassword () {
        this.password0State = this.$refs['password0-input'].checkValidity()
        this.password1State = this.$refs['password1-input'].checkValidity()
        this.password2State = (this.password1 === this.password2)

        if (!this.password2State) {
          this.password2InvalidFeedback = this.password2
            ? 'Необожимо повторить пароль.'
            : 'Необходимо заполнить это поле.'
        } else {
          this.password2InvalidFeedback = ''
        }

        if (!this.password0State || !this.password1State || !this.password2State) return

        this.busy = true
        this.error = false
        this.error401 = false

        AuthApi.updatePassword(this.password0, this.password1, this.password2)
          .then(() => (this.done = true))
          .catch(error => {
            if (error === 401) {
              this.error401 = true
            } else {
              this.error = true
            }
          })
          .finally(() => (this.busy = false))
      }
    }
  }
</script>
