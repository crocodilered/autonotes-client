<template>
  <div>

    <form v-if="!error && !error401" @submit.prevent="login">
      
      <b-form-group
        :state="emailState"
        label="Адрес эл. почты"
        invalid-feedback="Необходимо заполнить это поле."
        label-for="login-email-input"
      >
        <b-form-input
          type="email"
          id="login-email-input"
          ref="email-input"
          v-model="email"
          :state="emailState"
          required
        />
      </b-form-group>

      <b-form-group
        :state="passwordState"
        label="Пароль"
        invalid-feedback="Необходимо заполнить это поле."
        label-for="login-password-input"
      >
        <b-form-input
          type="password"
          id="login-password-input"
          ref="password-input"
          v-model="password"
          :state="passwordState"
          required
        />
      </b-form-group>

      <an-input-submit :busy="busy">
        Войти
      </an-input-submit>
    </form>

    <b-alert v-model="error401" variant="danger" dismissible>
      <h2>Произошла ошибка</h2>
      <p>Возможно, пользователь с адресом <code>{{ email }}</code> не зарегистрирован или вы ввели не верный пароль.</p>
    </b-alert>

    <b-alert v-model="error" variant="danger" dismissible>
      <h2>Отсутствует связь с сервером :-(</h2>
    </b-alert>

  </div>
</template>

<script>
  import { AUTH_LOGIN } from '@/store/action-types'
  import AnInputSubmit from '@/components/common/input-submit'
  
  export default {
    name: 'an-user-login',
    components: { AnInputSubmit },

    data () {
      return {
        email: '',
        emailState: null,

        password: '',
        passwordState: null,

        error: false,
        error401: false,
        busy: false,
      }
    },
    
    methods: {
      login () {
        this.error = false
        this.error401 = false
        this.busy = true

        // Validate form
        this.emailState = this.$refs['email-input'].checkValidity()
        this.passwordState = this.$refs['password-input'].checkValidity()

        if (!this.emailState || !this.passwordState) return

        // Dispatch
        const payload = {
          email: this.email,
          password: this.password
        }

        this.$store.dispatch(AUTH_LOGIN, payload)
          .then(() =>  this.$router.goReturnPath())
          .catch(status => {
            if (status === 401) {
              this.error401 = true
            } else {
              this.error = true
            }
          })
          .finally(() => (this.busy = false))
      }
    },
  }
</script>
