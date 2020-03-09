<template>
  <div>
    <b-list-group v-if="gamelist" id="results" flush>
      <b-list-group-item v-for="(item, index) in gamelist" :key="index">
        <img v-if="item.img_logo_url || item.img_icon_url" :src="getImageURL(item.appid, item.img_logo_url || item.img_icon_url)">
        <h3 class="px-3">
          {{ item.name }}
        </h3>
      </b-list-group-item>
    </b-list-group>
    <h2 v-if="!gamelist">
      You don't have any games in common... Sorry 😕
    </h2>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: 'DefaultUser'
        }
      }
    },
    gamelist: {
      type: Array,
      required: true
    }
  },
  methods: {
    getImageURL (appid, hash) {
      return `http://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${hash}.jpg`
    },
    formatTimeString (minutes) {
      const hours = Math.floor(minutes / 60) // hours
      const min = minutes % 60 // minutes

      const formatedHours = hours > 0 ? (min > 0 ? `${hours}h${min}min` : `${hours}h`) : `${min}min`

      return formatedHours
    }
  }

}
</script>

<style scoped>
#result {
    min-height: 200px;
    width: 100%;
}

.list-group-item {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
    padding: 0;
    background-color: rgba(44, 38, 38, 0.8);
    color: white;
}
.list-group-item > img {
    flex:initial;
}

.list-group-item > h2 {
    flex:auto;
}
</style>
