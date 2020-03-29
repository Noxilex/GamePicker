<template>
  <div id="page" class="container ">
    <div class="absolute blur-bg" />
    <div id="header">
      <h1>Game Picker</h1>
    </div>
    <b-breadcrumb>
      <b-breadcrumb-item :active="selectedTabComponent == 'start'" @click="selectedTabComponent = 'start'">
        <b-icon icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true" />
        Start
      </b-breadcrumb-item>
      <b-breadcrumb-item v-if="selectedTabComponent == 'friends' || selectedTabComponent == 'gameList'" :active="selectedTabComponent == 'friends'" @click="selectedTabComponent = 'friends'">
        Friend List
      </b-breadcrumb-item>
      <b-breadcrumb-item v-if="selectedTabComponent == 'gameList'" :active="selectedTabComponent == 'gameList'" @click="selectedTabComponent = 'gameList'">
        Game List
      </b-breadcrumb-item>
    </b-breadcrumb>
    <div class="content d-flex flex-column my-5">
      <keep-alive>
        <component
          :is="currentComponent"
          :gamelist="commonGameList"
          :friendlist="friendlist"
          @usernameInput="onUsernameInput"
          @useridInput="onUserIDInput"
          @friendListInput="onFriendListInput"
        />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Start from './Start'
import FriendList from './FriendList'
import CommonGameList from './CommonGameList'
// import FriendGameList from '@/assets/FriendGameList'

// console.log(new FriendGameList())
export default {
  components: {
    Start,
    FriendList,
    CommonGameList
  },
  data () {
    return {
      user: null,
      selectedTabComponent: 'start',
      friendlist: [],
      commonGameList: [],
      friendGameList: [],
      unauthorizedSteamIDs: []
    }
  },
  computed: {
    filteredListGames () {
      return this.listGames.filter((game) => {
        return game.name && game.name.length > 0 && !(game.name.includes('ValveTestApp') || game.name.includes('UntitledApp'))
      }).sort((game1, game2) => {
        return game2.playtime - game1.playtime
      })
    },
    unauthorizedUsers () {
      return this.totalFriendList.filter((friend) => {
        return this.unauthorizedSteamIDs.includes(friend.steamid)
      })
    },
    totalFriendList () {
      return [...this.friendlist, this.user]
    },
    currentComponent () {
      switch (this.selectedTabComponent) {
        case 'start':
          return Start
        case 'friends':
          return FriendList
        case 'gameList':
          return CommonGameList
        default:
          return Start
      }
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
      this.getPlayersInfo(steamid).then((user) => {
        this.user = {
          name: user[0].personaname,
          icon: user[0].avatar,
          steamid: user[0].steamid
        }
      }).catch((error) => {
        this.toast('Error', 'danger', error.message)
      })
      this.getFriendList(steamid).then((friendlist) => {
        this.friendlist = friendlist.map((friend) => { return { name: friend.personaname, icon: friend.avatar, steamid: friend.steamid } })
        this.selectedTabComponent = 'friends'
      }).catch((error) => {
        this.toast('Error', 'danger', error.response.data.message)
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
          promises.push(this.getUserGames(steamID).catch((error) => {
            this.unauthorizedSteamIDs.push(steamID)
            return error
          }))
        } else {
          this.toast('Error', 'danger', 'Error while trying to get games from steamID: ' + steamID)
          //  console.error('Error while trying to get games from steamID: ', steamID)
        }
      })
      return promises
    },
    onFriendListInput (friendlist) {
      // Add current user to friendlist
      const fullFriendList = [...friendlist, this.user.steamid]

      // Get list of games for each person
      this.friendGameList = []

      this.unauthorizedSteamIDs = []

      Promise.all(this.getPromiseArray(fullFriendList)).then((friendGameList) => {
        // Handle errors in the results (necessary so that we process all errors)
        const errors = friendGameList.filter((item) => {
          return item instanceof Error
        })
        if (errors.length > 0) {
          throw errors
        }
        this.friendGameList = friendGameList
        // Remove undefined list from the results
        this.friendGameList = this.friendGameList.filter((gameList) => {
          const test = gameList !== undefined
          if (!test) {
            // console.log('Removed a game list because it was undefined')
          }
          return test
        })

        // Get common games
        const gamesToKeep = this.getCommonGames(this.friendGameList)
        // console.log('Get common games')

        // console.log('Games to keep:', gamesToKeep)
        // Show random button
        this.commonGameList = gamesToKeep
        this.selectedTabComponent = 'gameList'
      }).catch((errors) => {
        // console.log(this.unauthorizedSteamIDs)
        this.toast('Error', 'danger', 'Missing permission to get list of games for users: ' + this.unauthorizedUsers.map(user => user.name).join(', '))
        this.selectedTabComponent = 'friends'
      })
    },

    getCommonGames (friendList) {
      let gamesToKeep = friendList[0]
      if (Array.isArray(friendList) && friendList.length > 1) {
        friendList.forEach((gameList) => {
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
      return gamesToKeep
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
      return this.getPlayersInfo(friends.map(friend => friend.steamid).join(','))
    },
    getPlayersInfo (steamids) {
      const requestNames = {
        url: '/getPlayerNames',
        method: 'get',
        responseType: 'json',
        params: {
          steamids
        }
      }

      return this.$axios(requestNames).then(response => response.data.players)
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
