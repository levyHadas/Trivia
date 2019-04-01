import QuestService from '../services/QuestService.js'
// import { stat } from 'fs';



const QuestStore = ({

  state: {
    quests: [],
    currQuest: '',
    filterOptions: {},
    filterBy:{}
  },

  mutations: {

    nextQuest(state) {
      var questsLength = state.quests.length;
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
    setFilterBy(state, { filterBy }) {
      state.filterBy = filterBy
    }
  },
  
  getters: {

    questsForDisplay(state) {
      return state.quests
    },
    currQuest(state) {
      return state.currQuest;
    },
    filterOptions(state) {
      return state.filterOptions
    },
    filterBy(state) {
      return state.filterBy
    }
  },
  
  actions: {
    nextQuest({ commit }) {
      commit({ type: 'nextQuest' })
    },
    
    async loadQuests({ commit, getters, dispatch}) {
      try {
        const quests = await QuestService.query(getters.filterBy)
        commit({ type: 'setQuests', quests })
        commit({ type: 'setCurrQuest', quest: quests[0]})
        dispatch({type: 'setGameQuests', quests})
      }
      catch {throw('NotFound')}
    },

    setGameQuests({commit}, {quests}) {
      commit({ type: 'setQuests', quests })
      commit({ type: 'setCurrQuest', quest: quests[0]})
    },

    saveFilter({commit}, {filterBy}) {
      commit({ type: 'setFilterBy', filterBy })
    },




    //for edit only!!!
    async loadQuest({ commit }, { questId }) {
      if (!questId) {
        const emptyQuest = await QuestService.createEmpty()
        // commit({ type: 'setCurrQuest', quest: emptyQuest })
        return emptyQuest;
      }
      const quest = await QuestService.getById(questId);
      // commit({ type: 'setCurrQuest', quest })
      return quest
    },

    async removeQuest({ }, { questId }) {
      QuestService.remove(questId)
    },

    async loadFilterOptions({ commit }) {
      const filterOptions = await QuestService.loadFilterOptions()
      commit({ type: 'setFilterOptions', filterOptions })
      return filterOptions
    },

    async addTagsToDB({ }, { tags }) {
      QuestService.addTagsToDB(tags)
      console.log('Adds tags to DB: in question store, tags: ',tags );
    },

    async saveQuest({ }, { quest }) {
      await QuestService.save(quest)
    }
  }
})

export default QuestStore
