<template>
  <div>

    <form @submit.prevent="register" v-if="!error400">
      <b-form-group
        :state="emailState"
        label="Адрес эл. почты"
        invalid-feedback="Необходимо заполнить это поле."
        label-for="email-input"
      >
        <b-form-input
          type="email"
          id="email-input"
          ref="email-input"
          v-model="email"
          :state="emailState"
          required
        />
      </b-form-group>

      <b-form-group
        :state="passwordState"
        label="Пароль"
        label-for="password-input"
        invalid-feedback="Необходимо заполнить это поле."
      >
        <b-form-input
          type="password"
          id="password-input"
          ref="password-input"
          v-model="password"
          :state="passwordState"
          required
        />
      </b-form-group>

      <b-form-group
        :state="password2State"
        label="Еще раз пароль"
        label-for="password2-input"
        invalid-feedback="Необходимо заполнить это поле."
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

      <an-input-submit :busy="busy">
        Зарегистрироваться
      </an-input-submit>
    </form>

    <b-alert
      variant="danger" 
      v-model="error400" 
      dismissible
    >
      <h2>Произошла ошибка</h2>
      <p>Возможно, пользователь с адресом <code>{{ email }}</code> уже зарегистрирован.</p>
    </b-alert>

  </div>
</template>


<script>
  import { AUTH_REGISTER } from '@/store/action-types'
  import AnInputSubmit from '@/components/common/input-submit'
  
  export default {
    name: 'an-user-register',

    components: { AnInputSubmit },

    data () {
      return {
        email: '',
        emailState: null,

        password: '',
        passwordState: null,

        password2: '',
        password2State: null,

        error400: false,
        busy: false,
      }
    },
    
    methods: {
      register () {
        this.emailState = this.$refs['email-input'].checkValidity()
        this.passwordState = this.$refs['password-input'].checkValidity()
        this.password2State = (
          this.$refs['password2-input'].checkValidity() && 
          this.password === this.password2
        )

        if (!this.emailState || !this.passwordState || !this.password2State) return

        this.busy = true

        // Dispatch
        const payload = {
          email: this.email,
          password: this.password
        }

        this.$store.dispatch(AUTH_REGISTER, payload)
          .then(() => this.$router.push('/'))
          .catch(status => (this.error400 = (status === 400)))
          .finally(() => (this.busy = false))
      }
    }
  }
</script>
