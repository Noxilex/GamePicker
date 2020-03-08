<template>
  <div id="page" class="container">
    <div id="header">
      <h1>Game Lotery</h1>
    </div>

    <div class="content d-flex flex-column py-5">
      <component
        :is="currentComponent"
        @usernameInput="onUsernameInput"
        @friendListInput="onFriendListInput"
      />
      <b-form-group id="form">
        <b-input-group>
          <b-form-input v-model="user" />

          <template v-slot:append>
            <b-button text="Dropdown" variant="primary" @click="queryGamesForUser">
              <b-icon icon="search" />
            </b-button>
          </template>
        </b-input-group>
      </b-form-group>
      <div v-show="listGames" class="content">
        <b-list-group id="results" flush>
          <b-list-group-item v-for="(item, index) in filteredListGames" :key="index">
            <h2>{{ item.name }}</h2>
            <img :src="item.appIcon">
            <p>Playtime: {{ formatTimeString(item.playtime) }}</p>
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import FriendList from './FriendList'
import Start from './Start'
import CommonGameList from './CommonGameList'

// class FriendGameList {
//   constructor (name = '', gamelist = []) {
//     this.name = name
//     this.gamelist = gamelist
//   }
// }

export default {
  components: {
    FriendList,
    Start,
    CommonGameList
  },
  data () {
    return {
      user: 'Dosixid',
      currentComponent: Start,
      steamID: '',
      listGames: [{ name: 'Game1', playtime: 100 }, { name: 'Game2', playtime: 200 }, { name: 'Game3', playtime: 300 }]
    }
  },
  computed: {
    filteredListGames () {
      return this.listGames.filter((game) => {
        return game.name && game.name.length > 0 && !(game.name.includes('ValveTestApp') || game.name.includes('UntitledApp'))
      }).sort((game1, game2) => {
        return game2.playtime - game1.playtime
      })
    }
  },
  mounted () {
  },
  methods: {
    onUsernameInput (username) {
      this.toast('Test', 'primary', username)
      this.currentComponent = FriendList
    },
    onFriendListInput (friendlist) {
      // TODO
      // Get list of games for each friend
      // Get common games

      // Show random button
    },
    getFriendList () {
      // TODO
      return null
    },
    getGameInfo (gameid) {
      const request = {
        url: 'http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/',
        method: 'get',
        responseType: 'json',
        params: {
          key: '9A1017328003E922265CEB50D57A86FF',
          appid: gameid
        }
      }

      return axios(request)
        .then((response) => {
          if (response.error) {
            throw new Error(response.error)
          } else {
            const body = response.data.game
            return body
          }
        })
    },
    formatTimeString (minutes) {
      const hours = Math.floor(minutes / 60) // hours
      const min = minutes % 60 // minutes

      const formatedHours = hours > 0 ? (min > 0 ? `${hours}h${min}min` : `${hours}h`) : `${min}min`

      return formatedHours
    },
    queryGamesForUser () {
      this.listGames = []

      this.getUserID(this.user).then((userID) => {
        this.toast('Info', 'info', 'Steam ID: ' + userID)
        this.getUserGames(userID).then((games) => {
          const tmpList = []
          games.forEach((game) => {
            this.getGameInfo(game.appid).then((gameinfos) => {
              const imgIcon = game.img_logo_url || game.img_icon_url
              tmpList.push({ name: gameinfos.gameName, playtime: game.playtime_forever, appIcon: imgIcon })
            })
          })
          console.log(tmpList)
          this.listGames = tmpList
        }).catch((error) => {
          this.toast('Error', 'danger', error)
          console.error(error)
        })
      }).catch((error) => {
        this.toast('Error', 'danger', error)
        console.log(error)
      })
    },
    getUserID (name) {
      const request = {
        url: 'http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/',
        method: 'get',
        responseType: 'json',
        params: {
          key: '9A1017328003E922265CEB50D57A86FF',
          vanityurl: name
        }
      }

      return axios(request)
        .then((response) => {
          if (response.error) {
            throw new Error(response.error)
          } else {
            const body = response.data.response
            return body.steamid
          }
        })
    },
    getUserGames (userID) {
      const request = {
        url: 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/',
        method: 'get',
        responseType: 'json',
        params: {
          key: '9A1017328003E922265CEB50D57A86FF',
          steamid: userID,
          format: 'json'
        }
      }

      return axios.request(request)
        .then((response) => {
          if (response.error) {
            throw new Error(response.error)
          } else {
            const body = response.data.response
            console.log(body)
            return body.games
          }
        })
    },
    toast (type, variant, message) {
      this.$bvToast.toast(message, {
        title: type,
        variant,
        autoHideDelay: 5000
      })
    }
  }
}
</script>

<style>
body {

  background-color: #35495e;
  color: black;
}
.content {
  overflow: auto;
  flex: 1 1 auto;
}
#form {
  position: relative;
}
h1 {
  color: white;
}
.container {
  margin: 0 auto;
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
}

#results {
  flex: 1 1 auto;
  overflow: auto;
}

#header {
  flex: initial;
  position: relative;
  top: 0;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
