<template>
  <b-container>
    <h1>Вход</h1>
    <an-user-login></an-user-login>
  </b-container>
</template>


<script>
  import AnUserLogin from '@/components/user/login'
  
  export default {
    name: 'an-user-login-view',
    components: { AnUserLogin },
  }
</script>
