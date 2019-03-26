import QuestService from '../services/QuestService.js'
import UtilService from '../services/UtilService.js'
import { stat } from 'fs';

const QuestStore = ({

  state: {
    quests: [],
    currQuest: '',
    filterOptions: {},
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
      console.log(quest)
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
      return quests
    },

    setFirstQuestion({ commit, state }) {
      commit({ type: 'setCurrQuest', quest: state.quests[0] })

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

    // getRandomQuestId({ state }) {
    //   const randomIdx = UtilService.getRandomIntInclusive(0, state.quests.length - 1)
    //   return state.quests[randomIdx]._id
    // },

    async saveQuest({ }, { quest }) {
      await QuestService.save(quest)
    }



  }
})

export default QuestStore
