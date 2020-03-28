<template>
  <div id="page" class="container ">
    <div class="absolute blur-bg" />
    <div id="header">
      <h1>Game Picker</h1>
    </div>

    <div class="content d-flex flex-column my-5">
      <component
        :is="currentComponent"
        :gamelist="commonGameList"
        :friendlist="friendlist"
        @usernameInput="onUsernameInput"
        @useridInput="onUserIDInput"
        @friendListInput="onFriendListInput"
      />
    </div>
  </div>
</template>

<script>
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
      user: null,
      currentComponent: Start,
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
    this.$axios.setBaseURL('http://noxilex.ovh:3001')
  },
  methods: {
    onUserIDInput (steamid) {
      if (!this.user) {
        this.user = {}
      }
      this.user.steamid = steamid
      this.getFriendList(steamid).then((friendlist) => {
        this.friendlist = friendlist.map((friend) => { return { name: friend.personaname, icon: friend.avatar, steamid: friend.steamid } })
        this.currentComponent = FriendList
      }).catch((error) => {
        this.toast('Error', 'danger', error.message)
      })
    },
    onUsernameInput (username) {
      // Get user ID associated
      this.getUserData(username)
        .then((user) => {
          this.user = user
          if (user.steamid) {
            this.onUserIDInput(user.steamid)
          } else {
            throw new Error('No steamid found in user')
          }
        }).catch((error) => {
          this.toast('Error', 'danger', error.message)
        })
    },
    getPromiseArray (steamIDList) {
      // console.log(steamIDList)
      const promises = []
      steamIDList.forEach((steamID) => {
        if (steamID) {
          promises.push(this.getUserGames(steamID))
        } else {
          this.toast('Error', 'danger', 'Error while trying to get games from steamID: ' + steamID)
          //  console.error('Error while trying to get games from steamID: ', steamID)
        }
      })
      return promises
    },
    async onFriendListInput (friendlist) {
      try {
        // Add current user to friendlist
        friendlist.push(this.user.steamid)

        // Get list of games for each friend
        let friendGameList = []
        friendGameList = await Promise.all(this.getPromiseArray(friendlist))

        // Remove undefined list from the results
        friendGameList = friendGameList.filter((gameList) => {
          const test = gameList !== undefined
          if (test) {
            // console.log('Removed a game list because it was undefined')
          }
          return test
        })

        // Get common games
        // console.log('Get common games')
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

        // console.log('Games to keep:', gamesToKeep)
        // Show random button
        this.commonGameList = gamesToKeep
        this.currentComponent = CommonGameList
      } catch (error) {
        // console.error(error)
        this.toast('Error', 'danger', error.message)
        this.currentComponent = Start
      }
    },
    async getFriendList (steamID) {
      const request = {
        url: '/getFriendList',
        method: 'get',
        responseType: 'json',
        params: {
          steamid: steamID,
          relationship: 'friend'
        }
      }
      const friends = await this.$axios(request).then(response => response.data.friendslist.friends)
      const requestNames = {
        url: '/getPlayerNames',
        method: 'get',
        responseType: 'json',
        params: {
          steamids: friends.map(friend => friend.steamid).join(',')
        }
      }

      const friendsWithNames = await this.$axios(requestNames).then(response => response.data.players)
      return friendsWithNames
    },
    getGameInfo (gameid) {
      const request = {
        url: '/getGameInfos',
        method: 'get',
        responseType: 'json',
        params: {
          appid: gameid
        }
      }

      return this.$axios(request)
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
        // console.error(error)
      })
    },
    getUserData (name) {
      const request = {
        url: '/getUserID',
        method: 'get',
        responseType: 'json',
        params: {
          vanityurl: name
        }
      }

      return this.$axios(request)
        .then((response) => {
          if (response.error) {
            throw new Error(response.error)
          } else {
            const body = response.data
            return body
          }
        })
    },
    async getUserGames (userID) {
      const request = {
        url: '/getUserApps',
        method: 'get',
        responseType: 'json',
        params: {
          steamid: userID,
          format: 'json',
          include_appinfo: true,
          include_played_free_games: true
        }
      }
      // console.log(request, userID)
      const response = await this.$axios(request)
      return response.data.games
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
  background-image: url('../assets/background.jpg');

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
