import Vue from 'vue'
import Vuex from 'vuex'
import QuestStore from './QuestStore.js'
import UserStore from './UserStore.js'
import GameStore from './GameStore.js'


Vue.use(Vuex)

export default new Vuex.Store({

    strict: true,
    modules: {
        QuestStore,
        UserStore,
        GameStore
    }
  
})
