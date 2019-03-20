import UserService from '../services/UserService.js'

const UserStore = ({

  state: {
    users: [],
    currUser: null
  },

  mutations: {

    setUsers(state, { users }) {
      state.users = users
    },
    setCurrUser(state, { user }) {
      state.currUser = user
    },
    removeUser(state, { userId }) {
      state.currUser = null
      const idx = state.users.findIndex(user => user._id === userId)
      state.users.slice(idx, 1)
    },
    updateUser(state, { updatedUser }) {
      const idx = state.users.findIndex(user => user._id === updatedUser._id)
      state.users.splice(idx, 1, updatedUser)
    },
    addTodo(state, newUser) {
      state.users.unshift(newUser)
    },
  

  },

  getters: {
    usersForDisplay(state) {
      return state.users
    },
    currUser(state) {
      return JSON.parse(JSON.stringify(state.currUser))
    }
  },

  actions: {

    loadUsers({ commit }, {filterBy}) {
      return UserService.query(filterBy)
        .then(users => {
          commit({ type: 'setUsers', users })
          return users
        })
    },


    login({ commit }, {user}) {
      return UserService.login(user)
        .then(user => {
          commit({ type: 'setCurrUser', user })
          return user
        })
    },

    removeUser({ commit }, { userId }) {
      return UserService.remove(userId)
        .then(() => commit({ type: 'removeUser', userId }))
    },

    saveUser({ commit }, { user }) {
      return UserService.save(user)
        .then(user => user)
    },

  }
})

export default UserStore
