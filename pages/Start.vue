<template>
  <div>
    <h1>Enter your Steam name</h1>
    <b-form class="py-2" @submit="submit">
      <b-form-input v-model="username" trim />
      <b-button variant="success" class="mt-5" @click="submit">
        Next
      </b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: ''
    }
  },
  methods: {
    verifyUser () {
      // Verifies that the steam user exists
      return true
    },
    submit () {
      this.$emit('usernameInput', this.username)
    }
  }
}
</script>

<style>
</style>
