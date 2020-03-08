<template>
  <div>
    <h1>Select the friends you wanna play with</h1>
    <b-form-group>
      <b-form-checkbox-group id="checkbox-group-2" v-model="selectedFriends" name="flavour-2" stacked>
        <b-form-checkbox v-for="(item, index) in friendlist" :key="index" :value="item">
          {{ item.name }}
        </b-form-checkbox>
      </b-form-checkbox-group>
    </b-form-group>
    <b-button @click="$emit('friendListInput', selectedFriends)">
      Confirm
    </b-button>
  </div>
</template>

<script>
class Friend {
  constructor (name = '') {
    this.name = name
  }
}
export default {
  data () {
    return {
      friendlist: [
        new Friend('Henri'),
        new Friend('Elza'),
        new Friend('Axel')
      ],
      selectedFriends: []
    }
  }
}
</script>

<style>

</style>
