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

    async setPartyRequest({dispatch}) {
      const user = await dispatch({type:'setLoggedUser'})
      SocketService.connectionTest()
      SocketService.emit('partyRequest', user)
    }




  }
})

export default UserStore
