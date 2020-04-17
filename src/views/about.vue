<template>
  <div class="container">
    <h1>{{ $t('about.title') }}</h1>
    <div
      v-if="fragments['about-main']"
      v-html="fragments['about-main'].html"
    />
  </div>
</template>

<script>
  import { FragmentsApi } from '@/api/services'

  export default {
    name: 'ak2-about',

    data() {
      return {
        fragments: {}
      }
    },

    components: {},

    mounted() {
      FragmentsApi.get(['about-main']).then(({ data }) => (this.fragments = data))
    },

    computed: {
      
    }
  }
</script>
