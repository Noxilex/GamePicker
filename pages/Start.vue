<template>
  <div>
    <h1>Enter your name</h1>
    <b-form>
      <b-form-input v-model="username" />
      <b-button variant="success" @click="$emit('usernameInput', username)">
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
  }

}
</script>

<style>

</style>
