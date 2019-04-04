import UserService from '../services/UserService.js'

const UserStore = ({

  state: {
    users: [],
    currUser: {},
    isMenuOpen: false
  },

  mutations: {

    setCurrUser(state, { user }) {
      state.currUser = user
    },
    toggleMenu(state) {
      state.isMenuOpen = !state.isMenuOpen
    }

  },

  getters: {
    isMenuOpen(state) {
      return state.isMenuOpen
    },
    currUser(state) {
      return state.currUser
    },
    isUserInParty(state) {
      return state.isUserInParty
    }
  },

  actions: {

    async login({ commit }, { user }) {
      const loggedUser = await UserService.login(user)
      commit({ type: 'setCurrUser', user: loggedUser })
    },

    async signup({ commit }, { user }) {
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
      commit({ type: 'setCurrUser', user: loggedUser })
      return loggedUser
    },

    updateUserNickname({ commit, getters }, { nickname }) {
      let user = getters.currUser
      user.nickname = nickname
      commit({ type: 'setCurrUser', user })
    },


  }
})

export default UserStore
