import UserService from '../services/UserService.js'

const UserStore = ({

  state: {
    users: [],
    currUser: {},
  },

  mutations: {

    setCurrUser(state, {user}) {
      user.scores = []
      if (!user._id.includes("guest") && !user.nickname) {
        user.nickname = user.username

      }
      // if (!user.nickname) 
      state.currUser = user
    },

  },

  getters: {

    currUser(state) {
      return state.currUser
    },

  },

  actions: {

    async login({ commit }, {user}) {
      const loggedUser = await UserService.login(user)
      commit({ type: 'setCurrUser', user:loggedUser })
    },

    async signup({ commit }, {user}) {
      const newUser = await UserService.signup(user)
      return newUser
    },

    async logout({ commit }) {
      await UserService.logout()
      const user = await UserService.getLoggedUser() //in logout assign a guest user
      commit({ type: 'setCurrUser', user })
    },

    async setLoggedUser({ commit }) {
      const loggedUser = await UserService.getLoggedUser()
      if (!loggedUser.scores) loggedUser.scores = []
      commit({type: 'setCurrUser', user:loggedUser})
      return loggedUser
    },

    updateUserNickname({ commit, getters }, {nickname}) {
      let user = getters.currUser
      user.nickname = nickname
      commit({type: 'setCurrUser', user})
    },

  }
})

export default UserStore
