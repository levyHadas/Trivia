import Axios from 'axios'


const BASE_PATH = (process.env.NODE_ENV !== 'development')
    ? '/api/quest'
    : 'http://localhost:3003/api/quest'


export default {
    query,


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