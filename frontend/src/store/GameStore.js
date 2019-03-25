import UserService from '../services/UserService.js'
import SocketService from '@/services/SocketService.js'


const UserStore = ({

  state: {
    // players: [],
    // currUser: {}
    gamePlayers: []
  },

  mutations: {

    updateScores(state, {currUser, scores}) {
      const idx = state.gamePlayers.findIndex(user => user._id === currUser._id)
      if (idx !== -1) state.gamePlayers[idx].scores = scores 
      else console.log('No user joined')
    },

    addPlayer(state, {player}) {
      state.gamePlayers.push(player)
    },

  },

  getters: {
    playersWithScores(state) {
      return state.gamePlayers
    }

  },

  actions: {

    addPlayer({ commit }, {player}) {
      commit({ type: 'addPlayer', player })
    },

    connectionTest({commit}) {
      SocketService.connectionTest()
    },
    
    joinedParty({commit}) {
      SocketService.emit('joinedParty', loggedUser)      
    },

    updateGameScores({commit, getters} ,{scores}) {
      const currUser = getters.currUser

      commit({type: 'updateScores', currUser, scores})
      const playersWithScores = getters.playersWithScores
      SocketService.emit('updateGameScores', playersWithScores)
    }

  

  
  }
})

export default UserStore
