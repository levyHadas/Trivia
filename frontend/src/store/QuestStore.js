import QuestService from '../services/QuestService.js'

const QuestStore = ({

  state: {
    quests: [],
    currQuest: '',
    filterOptions: {},
  },

  mutations: {

    nextQuest(state) {
      var questsLength = state.quests.length;
      console.log(questsLength)
      if (questsLength === 1) return
        state.quests.splice(0, 1);
        state.currQuest = state.quests[0]
    },
    setQuests(state, { quests }) {
      state.quests = quests
    },
    setCurrQuest(state, { quest }) {
      state.currQuest = quest
    },
    setFilterOptions(state, { filterOptions }) {
      state.filterOptions = filterOptions
    },

    
  },
  
  getters: {

    questsForDisplay(state) {
      return state.quests
    },
    currQuest(state) {
      return state.currQuest;
      // return JSON.parse(JSON.stringify(state.currQuest))
    },
    filterOptions(state) {
      return state.filterOptions
    },


  },

  actions: {
    nextQuest({ commit }) {
      commit({ type: 'nextQuest' })
    },

    async loadQuests({ commit }, { filterBy }) {
      const quests = await QuestService.query(filterBy)
      commit({ type: 'setQuests', quests })
      console.log(quests)
    },

    async loadQuest({ commit }, { questId }) {
      if (!questId) {
        const emptyQuest = await QuestService.createEmpty()
        commit({ type: 'setCurrQuest', quest: emptyQuest })
        return emptyQuest;
      }
      const quest = await QuestService.getById(questId);
      commit({ type: 'setCurrQuest', quest })
      return quest;
    },

    async loadFilterOptions({ commit }) {
      const filterOptions = await QuestService.loadFilterOptions()
      commit({ type: 'setFilterOptions', filterOptions })
      return filterOptions
    },

    getRandomQuest({ commit, state }) {
      // randomIdx = utilService.getRandomInt(0, tate.quests.length-1) //to do - util service
      const randomIdx = QuestService.getRandomIntInclusive(0, state.quests.length-1)
      return state.quests[randomIdx]._id
    }

  

  }
})

export default QuestStore
