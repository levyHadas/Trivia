import SocketService from '@/services/SocketService.js'


const GameStore = ({

  state: {
    // gamePlayers: [],
    isUserWaiting: false,
    playersWithScores: []
  },

  mutations: {


    setIsUserWaiting(state, { isWaiting }) {
      state.isUserWaiting = isWaiting
    },
    setAllScores(state, { playersWithScores }) {
      state.playersWithScores = playersWithScores
    },


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


    updateAllScores({ commit }, { playersWithScores }) {
      commit({ type: 'setAllScores', playersWithScores })
   
    },

    // updateGamePlayers({ commit}, { playersWithScores }) {
    //   commit({ type: 'setScores', playersWithScores })
    // },
    
    updateWaitingState({commit}, {isWaiting}) {
      commit({ type: 'setIsUserWaiting', isWaiting })

    },

    async setPartyRequest({dispatch, getters}) {
      SocketService.connectionTest()
      var currUser = getters.currUser
      if (currUser._id) {
        SocketService.emit('partyRequest', currUser)
      }
      else {
        const newUser = await dispatch({type:'setLoggedUser'})
        SocketService.emit('partyRequest', newUser)
      }
    
    }




  }
})

export default GameStore
