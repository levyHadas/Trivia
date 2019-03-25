import UserService from '../services/UserService.js'

const UserStore = ({

  state: {
    users: [],
    currUser: {}
  },

  mutations: {

    setCurrUser(state, {user}) {
      console.log('user: ', user)
      state.currUser = user
    },

    // setUsers(state, { users }) {
    //   state.users = users
    // },
  
    // removeUser(state, { userId }) {
    //   state.currUser = null
    //   const idx = state.users.findIndex(user => user._id === userId)
    //   state.users.slice(idx, 1)
    // },
    // updateUser(state, { updatedUser }) {
    //   const idx = state.users.findIndex(user => user._id === updatedUser._id)
    //   state.users.splice(idx, 1, updatedUser)
    // },
   
  },

  getters: {
    // usersForDisplay(state) {
    //   return state.users
    // },
    currUser(state) {
      return state.currUser
    }
  },

  actions: {

    async login({ commit }, {user}) {
      const loggedUser = await UserService.login(user)
      commit({ type: 'setCurrUser', user:loggedUser })
    },

    async signup({ commit }, {user}) {
      await UserService.signup(user)
      return user
    },

    async logout({ commit }) {
      await UserService.logout()
      const user = {}
      commit({ type: 'setCurrUser', user })
    },

    async setLoggedUser({ commit }) {
      var loggedUser = await UserService.getLoggedUser()
      commit({type: 'setCurrUser', user:loggedUser})
    }

    




    // loadUsers({ commit }, {filterBy}) {
    //   return UserService.query(filterBy)
    //     .then(users => {
    //       commit({ type: 'setUsers', users })
    //       return users
    //     })
    // },

    // removeUser({ commit }, { userId }) {
    //   return UserService.remove(userId)
    //     .then(() => commit({ type: 'removeUser', userId }))
    // },


  }
})

export default UserStore
