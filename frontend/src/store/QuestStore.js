import QuestService from '../services/QuestService.js'

const QuestStore = ({

  state: {
    quests: [],
    currQuest: ''
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
      console.log('getter ', state.filterOptions)
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
      return quests;
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
      // return filterOptions
    }

  }
})

export default QuestStore
