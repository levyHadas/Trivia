import Axios from 'axios'


const BASE_PATH = (process.env.NODE_ENV !== 'development')
    ? '/api/quest'
    : 'http://localhost:3003/api/quest'


export default {
    query,
    getById,
    remove,
    createEmpty,
    save,
    loadFilterOptions,
    getRandomIntInclusive

}




async function query(filterBy) {
    if (filterBy) {
        var queryStr = '?'
        for (var key in filterBy) {
            queryStr += `${key}=${filterBy[key]}&`
        }
    } else queryStr = ''
    const quests = await Axios.get(`${BASE_PATH}/${queryStr}`)
    return quests.data
}

function getById(questId) {
    return Axios.get(`${BASE_PATH}/${questId}`)
        .then(quest => quest.data)
}

function remove(questId) {
    return Axios.delete(`${BASE_PATH}/${questId}`)
        .then(quest => quest.data)
}

function save(quest) {
    if (quest._id) return Axios.put(`${BASE_PATH}/${quest._id}`, quest)
        .then(quest => quest.data)
    return Axios.post(`${BASE_PATH}`, quest)
        .then(quest => quest.data)
}

function createEmpty() {
    const emptyQuest = {

    }
    return Promise.resolve(emptyQuest)
}


async function loadFilterOptions() {
    const filterOptions = await Axios.get(`${BASE_PATH}/filter`)
    return filterOptions.data
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }