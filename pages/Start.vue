<template>
  <div>
    <h1>Enter a Steam account</h1>
    <b-form class="py-2">
      <b-form-group label="Steam ID (Recommended, no setup required)" label-for="userid-input" description="You can find your ID on your steam profile in the URL. (ex: https://steamcommunity.com/profiles/<steamid>)">
        <b-input-group>
          <b-form-input id="userid-input" v-model="userid" trim /><b-input-group-append>
            <b-button variant="primary" @click="submitID">
              Confirm
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
      <label>OR</label>
      <b-form-group label="Steam Name" label-for="username-input" description="Works ONLY if you have set a custom ID in your steam profile. (Steam Application > Profile > Modify Profile > Custom URL: http://steamcommunity.com/id/<name>)">
        <b-input-group>
          <b-form-input id="username-input" v-model="username" trim /><b-input-group-append>
            <b-button variant="primary" @click="submitName">
              Confirm
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      userid: ''
    }
  },
  methods: {
    verifyUser () {
      // Verifies that the steam user exists
      return true
    },
    submitName () {
      this.$emit('usernameInput', this.username)
    },
    submitID () {
      this.$emit('useridInput', this.userid)
    }
  }
}
</script>

<style>
</style>
