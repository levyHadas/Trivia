import SocketService from '@/services/SocketService.js'


const GameStore = ({

  state: {
    // gamePlayers: [],
    isUserWaiting: false,
    playersWithScores: [],
    readyToResume: false,
    isPartyTimeUp: false
  },

  mutations: {


    setIsUserWaiting(state, { isWaiting }) {
      state.isUserWaiting = isWaiting
    },
    setAllScores(state, { playersWithScores }) {
      state.playersWithScores = playersWithScores
    },
    // setPartyTimeUp(state, {isTimeUp}) {
    //   state.isPartyTimeUp = isTimeUp;
    // }
  

  },

  getters: {
    playersWithScores(state) {
      return state.playersWithScores
    },
    isUserWaiting(state) {
      return state.isUserWaiting
    },
   
    isPartyTimeUp(state) {
      return state.isPartyTimeUp
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
    
    updateWaitingState({commit}, {isWaiting}) {
      commit({ type: 'setIsUserWaiting', isWaiting })
    },

    setPartyTimeUp({commit}, {isTimeUp}) {
      let isTimeUpVal = isTimeUp
      commit({ type: 'setPartyTimeUp', isTimeUp:isTimeUpVal})
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
