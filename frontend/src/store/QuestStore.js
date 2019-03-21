import QuestService from '../services/QuestService.js'

const QuestStore = ({

  state: {
    quests: [],
    currQuest: null
  },

  mutations: {

    setQuests(state, { quests }) {
      state.quests = quests
    },
    setCurrQuest(state, { quest }) {
      state.currQuest = quest
    },
    // removeQuest(state, { questId }) {
    //   state.currQuest = null
    //   const idx = state.quests.findIndex(quest => quest._id === questId)
    //   state.quests.slice(idx, 1)
    // },
    // updateQuest(state, { updatedQuest }) {
    //   const idx = state.quests.findIndex(quest => quest._id === updatedQuest._id)
    //   state.quests.splice(idx, 1, updatedQuest)
    // },
    // addTodo(state, newQuest) {
    //   state.quests.unshift(newQuest)
    // }

  },

  getters: {
    // questsForDisplay(state) {
    //   return state.quests
    // },
    currQuest(state) {
      return state.currQuest
      // return JSON.parse(JSON.stringify(state.currQuest))
    }
  },

  actions: {

    async loadQuests({ commit }, { filterBy }) {
      const quests = await QuestService.query(filterBy);
      commit({ type: 'setQuests', quests });
      return quests;
    },


    async loadQuest({ commit }, { questId }) {
      if (!questId) {
        const emptyQuest = await QuestService.createEmpty();
        commit({ type: 'setCurrQuest', quest: emptyQuest });
        return emptyQuest;
      }
      const quest = await QuestService.getById(questId);
      commit({ type: 'setCurrQuest', quest });
      return quest;
    },

    //   removeQuest({ commit }, { questId }) {
    //     return QuestService.remove(questId)
    //       .then(() => commit({ type: 'removeQuest', questId }))
    //   },

    //   saveQuest({ commit }, { quest }) {
    //     return QuestService.save(quest)
    //       .then(quest => {

    //         // if (quest._id) commit({ type: 'updateQuest', updatedQuest: quest })
    //         // else commit({ type: 'addQuest', newQuest: quest })
    //         return quest
    //       })
    //   },

  }
})

export default QuestStore
