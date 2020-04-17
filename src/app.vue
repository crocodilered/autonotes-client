<template>
  <div id="app">
    <an-header></an-header>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
  import AnHeader from '@/components/header'

  export default {
    name: 'an-app',
    components: { AnHeader }
  }
</script>

<style lang="scss">

  body {
    margin-bottom: 2rem;
  }

  p.message {
    font-size: 120%;
  }

  .btn .material-design-icon {
    font-size: 24px;
  }

  .material-design-icon {
    font-size: 24px;
  }

  .long-text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .custom-file-label {
    overflow: hidden;
  }

  h1, h2, h3, h4 {
    margin: 1rem 0 1rem;
    font-weight: 400 !important;
    //font-family: 'Oswald', sans-serif;
  }

  .container {
    max-width: 550px !important;
  }

  .alert {
    h2 {
      margin: 0;
      font-size: 1.4rem;
    }

    p {
      margin: 1rem 0;
    }
  }
</style>
