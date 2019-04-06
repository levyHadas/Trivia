
 const ThemeStore = ({

  state: {
   isMenuOpen: false,
   windowWidth: 1000
 },

  mutations: {

    toggleMenu(state) {
     state.isMenuOpen = !state.isMenuOpen
   },
   setWidthSize(state, {windowWidth}) {
     state.windowWidth = windowWidth
   },
   setMenuStatToFalse(state) {
    state.isMenuOpen = false
   }

  },

  getters: {

    isMenuOpen(state) {
     return state.isMenuOpen
   },
   windowWidth(state) {
     return state.windowWidth
   }

  },

  actions: {

  }
})

export default ThemeStore