<template>
  <div class="input-submit">
    <b-overlay
      :show="busy"
      opacity="0.6"
      spinner-variant="primary"
      class="d-inline-block"
      @hidden="onHidden"
    >
      <b-button
        type="submit"
        ref="button"
        :disabled="busy"
        :variant="variant"
        @click="$emit('click')"
      >
        <slot></slot>
      </b-button>
    </b-overlay>
  </div>
</template>

<script>
  export default {
    name: 'an-input-submit',

    props: ['busy', 'danger'],

    computed: {
      variant () {
        return (this.danger !== undefined) 
          ? 'danger' 
          : 'primary'
      }
    },

    methods: {
      onHidden () {
        // Return focus to the button once hidden
        this.$refs['button'].focus()
      },
    }
  }
</script>

<style lang="scss">
  .input-submit {
    margin-top: 1.5rem;

    button {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }
  }
</style>