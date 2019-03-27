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
      // return state.gamePlayers
    },

    setPartyRequest({ commit, getters }) {
      SocketService.connectionTest()
      SocketService.emit('partyRequest', getters.currUser)
      // commit({ type: 'setRequestSent' })
    }




  }
})

export default UserStore
