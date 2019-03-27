import Axios from 'axios'

// Front Service

const BASE_PATH = (process.env.NODE_ENV !== 'development')
    ? '/api/random/joke'
    : 'http://localhost:3003/api/random/joke'


export default {
   getRandomJoke
}

async function getRandomJoke() {
    const joke = await Axios.get(`${BASE_PATH}`)
    return joke
}