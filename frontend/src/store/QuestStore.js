import QuestService from '../services/QuestService.js'

const QuestStore = ({

  state: {
    quests: [],
    currQuest: null
  },

  mutations: {

    // setToys(state, { toys }) {
    //   state.toys = toys
    // },
    // setCurrToy(state, { toy }) {
    //   state.currToy = toy
    // },
    // removeToy(state, { toyId }) {
    //   state.currToy = null
    //   const idx = state.toys.findIndex(toy => toy._id === toyId)
    //   state.toys.slice(idx, 1)
    // },
    // updateToy(state, { updatedToy }) {
    //   const idx = state.toys.findIndex(toy => toy._id === updatedToy._id)
    //   state.toys.splice(idx, 1, updatedToy)
    // },
    // addTodo(state, newToy) {
    //   state.toys.unshift(newToy)
    // }

  },

  getters: {
    // toysForDisplay(state) {
    //   return state.toys
    // },
    // currToy(state) {
    //   return state.currToy
    //   // return JSON.parse(JSON.stringify(state.currToy))
    // }
  },

  actions: {

  // loadToys({ commit }, {filterBy}) {
  //   return ToyService.query(filterBy)
  //     .then(toys => {
  //       commit({ type: 'setToys', toys })
  //       return toys
  //     })
  // },


  //   loadToy({ commit }, { toyId }) {
  //     if (!toyId) {
  //       return ToyService.createEmpty()
  //         .then(emptyToy => {
  //           commit({ type: 'setCurrToy', toy: emptyToy })
  //           return emptyToy
  //         })
  //     }
  //     return ToyService.getById(toyId)
  //       .then(toy => {
  //         commit({ type: 'setCurrToy', toy })
  //         return toy
  //       })
  //   },

  //   removeToy({ commit }, { toyId }) {
  //     return ToyService.remove(toyId)
  //       .then(() => commit({ type: 'removeToy', toyId }))
  //   },

  //   saveToy({ commit }, { toy }) {
  //     return ToyService.save(toy)
  //       .then(toy => {
  //         //i don't really need to update the state toys since the will be
  //         //updated anyway when user is pushed back to list
  //         // if (toy._id) commit({ type: 'updateToy', updatedToy: toy })
  //         // else commit({ type: 'addToy', newToy: toy })
  //         return toy
  //       })
  //   },

  }
})

export default QuestStore