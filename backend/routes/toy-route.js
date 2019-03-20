const toyService = require('../services/toy-service')
const BASE_PATH = '/toy'

function addToyRoutes(app) {
    // Toys REST API:

    
    //todo: middleware - not implemented yey
    // function isUserSession(req, res, next) {
    //     console.log('INSIDE MIDDLEWARE: ', req.session.user);
    //     if (!req.session.user) res.status(401).end('Unauthorized');
    //     else next();
    // }



    // LIST
    app.get(`${BASE_PATH}`, (req, res) => {
        const query = req.query
        toyService.query(query)
            .then(toys => res.json(toys))
            
    })

    // SINGLE - GET Full details including reviews
    app.get(`${BASE_PATH}/:toyId`, (req, res) => {
        const {toyId} = req.params
        toyService.getById(toyId)
            .then(toy => res.json(toy))
 
    })

    // DELETE
    app.delete(`${BASE_PATH}/:toyId`, (req, res) => {
        const toyId = req.params.toyId;
        toyService.remove(toyId)
            .then(() => res.end(`Toy ${toyId} Deleted `))
    })

    // CREATE
    app.post(`${BASE_PATH}`, (req, res) => {
        const toy = req.body;
        toyService.add(toy)
            .then(toy => res.json(toy))
    })

    // UPDATE todo: need to check that user is editing is own item - how do we do that?
    app.put(`${BASE_PATH}/:toyId`, (req, res) => {
        const toy = req.body;
        toyService.update(toy)
            .then(toy => res.json(toy))
    })

}


module.exports = addToyRoutes;