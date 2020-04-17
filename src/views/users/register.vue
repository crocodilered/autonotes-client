<template>
  <div class="container narrow">
    <h1>Регистрация</h1>
    <an-user-register></an-user-register>
  </div>
</template>


<script>
  import AnUserRegister from '@/components/user/register'
  
  export default {
    name: 'an-user-register-view',
    components: { AnUserRegister },
  }
</script>
