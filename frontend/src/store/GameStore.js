import SocketService from '@/services/SocketService.js'


const GameStore = ({

  state: {
 
    userInParty: false,
    playersWithScores: [],

  },

  mutations: {


    setInPartyState(state, { inParty }) {
      state.userInParty = inParty
    },
    setAllScores(state, { playersWithScores }) {
      state.playersWithScores = playersWithScores
    },


  },

  getters: {
    playersWithScores(state) {
      return state.playersWithScores
    },
    isUserInParty(state) {
      return state.userInParty
    },
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
    
    updateInPartyState({commit}, {inParty}) {
      commit({ type: 'setInPartyState', inParty })
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
