const JokeService = require('../services/joke-service')
const BASE_PATH = '/api/random'

module.exports = addGameRoutes;

async function addGameRoutes(app) {
    
    app.get(`${BASE_PATH}/joke`, async (req, res) => {
        joke = await JokeService.suggestRandomJoke()
        return res.json(joke)
    })
    
}

