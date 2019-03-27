import UserService from '../services/UserService.js'
import SocketService from '@/services/SocketService.js'


const UserStore = ({

  state: {
    gamePlayers: [],
    // isRequestSent: false
  },

  mutations: {


    updateGamePlayers(state, { playersWithScores }) {
      state.gamePlayers = playersWithScores

    },

    addPlayer(state, { player }) {
      state.gamePlayers.push(player)
    },

    // setRequestSent(state) {
    //   state.isRequestSent = true
    // }

  },

  getters: {
    playersWithScores(state) {
      return state.gamePlayers
    }

  },

  actions: {

    addPlayer({ commit }, { player }) {
      commit({ type: 'addPlayer', player })
      SocketService.emit('joinedParty', player)
    },

    connectionTest({ commit }) {
      SocketService.connectionTest()
    },


    updateGameScores({ commit, getters }, { scores }) {
      const currUser = getters.currUser

      commit({ type: 'updateScores', currUser, scores })
      const playersWithScores = getters.playersWithScores
      SocketService.emit('updateGameScores', playersWithScores)
    },

    updateGamePlayers({ commit, state }, { playersWithScores }) {
      commit({ type: 'updateGamePlayers', playersWithScores })
    },

    async setPartyRequest({dispatch, getters}) {
      SocketService.connectionTest()
      const currUser = getters.currUser
      if (currUser._id) SocketService.emit('partyRequest', currUser)
      else {
        const newUser = await dispatch({type:'setLoggedUser'})
        SocketService.emit('partyRequest', newUser)
      }
    
    }




  }
})

export default UserStore
