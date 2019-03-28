import SocketService from '@/services/SocketService.js'


const UserStore = ({

  state: {
    gamePlayers: [],
    isUserWaiting: false,
    playersWithScores: []
  },

  mutations: {


    updateGamePlayers(state, { playersWithScores }) {
      state.gamePlayers = playersWithScores

    },

    addPlayer(state, { player }) {
      state.gamePlayers.push(player)
    },
    setIsUserWaiting(state, { isWaiting }) {
      state.isUserWaiting = isWaiting
    },
    setScores(state, { playersWithScores }) {
      state.playersWithScores = playersWithScores
    },

    // setRequestSent(state) {
    //   state.isRequestSent = true
    // }

  },

  getters: {
    playersWithScores(state) {
      return state.playersWithScores
    },
    isUserWaiting(state) {
      return state.isUserWaiting
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


    updateGameScores({ commit }, { playersWithScores }) {
      commit({ type: 'setScores', playersWithScores })
   
    },

    updateGamePlayers({ commit}, { playersWithScores }) {
      commit({ type: 'setScores', playersWithScores })
    },
    
    updateWaitingState({commit}, {isWaiting}) {
      commit({ type: 'setIsUserWaiting', isWaiting })

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
