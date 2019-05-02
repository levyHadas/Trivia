import Axios from 'axios'

// Front Service

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
    addTagsToDB
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

async function remove(questId) {
    await Axios.delete(`${BASE_PATH}/${questId}`)
    // Todo - Catch errors in deletion
    console.log('Deletion succeeded');
    return questId 
}

function save(quest) {   
    if (quest._id) return Axios.put(`${BASE_PATH}/${quest._id}`, quest)
        .then(quest => quest.data)
        // .catch(err => err)
    return Axios.post(`${BASE_PATH}`, quest)
        .then(quest => quest.data)
}

function createEmpty() {
    var emptyQuest = {
            category: "",
            txt: "",
            correctAnswerIdx: 1,
            answers: ["", "", "", ""],
            createdBy: "",
            imgSrc: "",
            tags: [],
            hint: "",
            createdAt: null,
            rating: ""
    }
    return Promise.resolve(emptyQuest)
}


async function loadFilterOptions() {
    const filterOptions = await Axios.get(`${BASE_PATH}/filter`)
    return filterOptions.data
}

async function addTagsToDB(tags) { // tags: array
    await Axios.post(`${BASE_PATH}/filter`, tags)
    console.log('Tags added to DB ? ');
}