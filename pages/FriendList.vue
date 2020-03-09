<template>
  <div class="">
    <h1>Select the friends you wanna play with</h1>

    <div class="content">
      <b-input v-model="filterName" />
      <b-form-group class="friendlist">
        <b-form-checkbox-group id="checkbox-group-2" v-model="selectedFriends" name="flavour-2" stacked>
          <b-form-checkbox v-for="(item, index) in filteredFriendList" :key="index" :value="item.steamid">
            {{ item.name }}
            <img :src="item.avatar">
          </b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
    </div>
    <b-button @click="$emit('friendListInput', selectedFriends)">
      Confirm
    </b-button>
  </div>
</template>

<script>
export default {
  props: ['friendlist'],
  data () {
    return {
      filterName: '',
      selectedFriends: []
    }
  },
  computed: {
    filteredFriendList () {
      const re = new RegExp(this.toLowerCase(this.filterName), 'g')
      if (this.friendlist) {
        return this.friendlist.filter(friend => this.toLowerCase(friend.name).match(re))
      } else {
        return []
      }
    }
  },
  methods: {

    toLowerCase (friendName) {
      return friendName.split('').map(letter => letter.toLowerCase()).join('')
    }
  }
}
</script>

<style>
.checkbox-group-2 {

}
.friendlist {
  height: 500px;
  color: white;
  overflow-y: auto;
}
</style>
