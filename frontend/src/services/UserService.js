import axios from 'axios'
import UtilService from './UtilService'

const BASE_PATH = (process.env.NODE_ENV !== 'development')
    ? '/user'
    : 'http://localhost:3003/user'


export default {
    login,
    logout,
    signup,
    getLoggedUser,
}

const Axios = axios.create({
    withCredentials: true,
})

async function login(credentials) {
    try {
        const res = await Axios.post(`${BASE_PATH}/login`, credentials) //tell the server to try to log in 
        const loggedUser = res.data
        return loggedUser
    }
    catch {
        throw (err)
    }
}

async function signup(user) {
    try {
        const res = await Axios.post(`${BASE_PATH}/signup`, user)
        return res.data
    }
    catch {
        throw (err)
    }


}

function logout() {
    try {
        Axios.get(`${BASE_PATH}/logout`)
        return Promise.resolve()
    }
    catch {
        throw ('could not log out')
    }
}
async function getLoggedUser() {
    try {
        const res = await Axios.get(`${BASE_PATH}/loggedUser`)
        if (res.data) return res.data
        else return _getDefaultUser()
    }
    catch {
        throw ('Could not find user')
    }
}

function _getDefaultUser() {
    const randId = UtilService.makeId()
    return {
        _id: 'guest' + randId,
        username: 'Guest_' + randId,
        img: 'https://api.adorable.io/avatars/puki'
    }
}

// function getUser(userId) {

//     return axios.get(`${BASE_PATH}/${userId}`)
//         .then(res => res.data)
//         .catch(err => err)


// }

