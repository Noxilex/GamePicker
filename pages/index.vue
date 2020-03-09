<template>
  <div id="page" class="container ">
    <div class="absolute blur-bg" />
    <div id="header">
      <h1>Game Picker</h1>
    </div>

    <div class="content d-flex flex-column py-5">
      <component
        :is="currentComponent"
        :gamelist="commonGameList"
        :friendlist="friendlist"
        @usernameInput="onUsernameInput"
        @friendListInput="onFriendListInput"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import FriendList from './FriendList'
import Start from './Start'
import CommonGameList from './CommonGameList'
// import FriendGameList from '@/assets/FriendGameList'

// console.log(new FriendGameList())
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
      friendlist: [],
      commonGameList: [],
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
      // Get user ID associated
      this.getUserID(username)
        .then((userid) => {
          return this.getFriendList(userid)
        })
        .then((friendlist) => {
          this.friendlist = friendlist.map((friend) => { return { name: friend.personaname, icon: friend.avatar, steamid: friend.steamid } })
          this.currentComponent = FriendList
        }).catch((error) => {
          this.toast('Error', 'danger', error.message)
        })
    },
    getFriendsGameList () {

    },
    getPromiseArray (friendlist) {
      const promises = []
      friendlist.forEach(friend => promises.push(this.getUserGames(friend)))
      return promises
    },
    async onFriendListInput (friendlist) {
      try {
        // Get list of games for each friend
        let friendGameList = []
        friendGameList = await Promise.all(this.getPromiseArray(friendlist))

        // Remove undefined list from the results
        friendGameList = friendGameList.filter((gameList) => {
          const test = gameList !== undefined
          if (test) {
            console.log('Removed a game list because it was undefined')
          }
          return test
        })

        // Get common games
        console.log('Get common games')
        let gamesToKeep = friendGameList[0]
        if (Array.isArray(friendGameList) && friendGameList.length > 1) {
          friendGameList.forEach((gameList) => {
            const idsToKeep = gamesToKeep.map(game => game.appid)
            const tmpGamesToKeep = []
            gameList.forEach((game) => {
              if (idsToKeep.includes(game.appid)) {
                tmpGamesToKeep.push(game)
              }
            })
            gamesToKeep = tmpGamesToKeep
          })
        }

        console.log('Games to keep:', gamesToKeep)
        // Show random button
        this.commonGameList = gamesToKeep
        this.currentComponent = CommonGameList
      } catch (error) {
        console.log(error)
        this.toast('Error', 'danger', error.message)
        this.currentComponent = Start
      }
    },
    async getFriendList (steamID) {
      const request = {
        url: 'http://api.steampowered.com/ISteamUser/GetFriendList/v0001/',
        method: 'get',
        responseType: 'json',
        params: {
          key: '9A1017328003E922265CEB50D57A86FF',
          steamid: steamID,
          relationship: 'friend'
        }
      }
      const friends = await axios(request).then(response => response.data.friendslist.friends)
      const requestNames = {
        url: 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/',
        method: 'get',
        responseType: 'json',
        params: {
          key: '9A1017328003E922265CEB50D57A86FF',
          steamids: friends.map(friend => friend.steamid).join(',')
        }
      }

      const friendsWithNames = await axios(requestNames).then(response => response.data.response.players)
      return friendsWithNames
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
        }).catch((error) => {
          throw new Error(error)
        })
    },
    queryGamesForUser (userid) {
      this.listGames = []

      this.getUserGames(userid).then((games) => {
        const tmpList = []
        games.forEach((game) => {
          const imgIcon = game.img_logo_url || game.img_icon_url
          tmpList.push({ name: game.name, playtime: game.playtime_forever, appIcon: imgIcon })
        })
        this.listGames = tmpList
      }).catch((error) => {
        this.toast('Error', 'danger', error.message)
        console.error(error)
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
    async getUserGames (userID) {
      const request = {
        url: 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/',
        method: 'get',
        responseType: 'json',
        params: {
          key: '9A1017328003E922265CEB50D57A86FF',
          steamid: userID,
          format: 'json',
          include_appinfo: true,
          include_played_free_games: true
        }
      }
      const response = await axios(request)
      return response.data.response.games
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
  background-image: url('../static/background.jpg');

  background-color: #35495e;
  color: black;
}
.content {
  overflow: auto;
  flex: 1 1 auto;
  justify-content: center;
}
#form {
  position: relative;
}
h1 {
  color: white;
}

.blur-bg {
  background-color: rgba(0, 0,0,0.7);
  filter: blur(20px);
}
.container {
  color:white;
  position: relative;
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

.absolute {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: -1;

}
</style>
