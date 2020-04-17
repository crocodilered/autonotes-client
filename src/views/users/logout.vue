<template>
  <b-container>
    <h1>Выход</h1>
    
    <p>Вы собираетесь выйти из системы. Подтвердите, пожалуйста, свое действие.</p>

    <an-input-submit
      :busy="busy"
      @click="logout"
    >
      Выйти
    </an-input-submit>
  </b-container>
</template>

<script>
  import { AUTH_PURGE } from '@/store/action-types'
  import AnInputSubmit from '@/components/common/input-submit'

  export default {
    name: 'an-user-logout-view',

    components: { AnInputSubmit },

    data () {
      return {
        busy: false,
      }
    },

    methods: {
      logout () {
        this.busy = true
        this.$store.dispatch(AUTH_PURGE)
          .then(() => {
            this.busy = false
            this.$router.goReturnPath()
          })
      }
    }
  }
</script>
