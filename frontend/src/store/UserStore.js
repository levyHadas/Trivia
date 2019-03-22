import UserService from '../services/UserService.js'

const UserStore = ({

  state: {
    users: [],
    currUser: null
  },

  mutations: {

    setCurrUser(state, user) {
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
      return JSON.parse(JSON.stringify(state.currUser))
    }
  },

  actions: {

    async login({ commit }, {user}) {
        const loggedUser = await UserService.login(user)
        commit({ type: 'setCurrUser', loggedUser })
    },

    async logout({ commit }) {
      await UserService.logout()
      const user = {}
      commit({ type: 'setCurrUser', user })
    },

    saveUser({ commit }, { user }) {
      return UserService.save(user)
        .then(user => user)
    },




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
