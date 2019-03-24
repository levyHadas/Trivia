const userService = require('../services/user-service')
const BASE_PATH = '/user'

module.exports = addUserRoutes;


function addUserRoutes(app) {

    //create user
    app.post(`${BASE_PATH}/signup`, (req, res) => {
        console.log(req.body)
        if (req.body.username && req.body.password) {
            const username = req.body.username
            const password = req.body.password
            if (!req.body.img) 
            userService.addUser({ username, password })
                .then(user => res.json(user))
                .catch(err => {
                    res.status(401).end()
                    throw (err)
                })
        }
        else res.status(401).end()
    })

    app.post(`${BASE_PATH}/login`, (req, res) => {
        if (!req.body.username || !req.body.password) res.status(401).end()
        else {
            const username = req.body.username
            const password = req.body.password
            userService.checkLogin({ username, password })
                .then(user => {
                    req.session.user = user
                    user.password = '*******' 
                    return res.json(user)
                })
                .catch(err => {
                    res.status(401).end()
                    throw (err)
                })
        }
    })

    app.get(`${BASE_PATH}/:userId`, (req, res) => {
        const {userId} = req.params
        userService.getById(userId)
            .then(user => res.json(user))
    })

    app.get(`${BASE_PATH}/logout`, (req, res) => {
        return Promise.resolve(res.json({}))
    })



}



    //get users
    // app.get(BASE_PATH, (req, res) => {
    //     userService.query()
    //         .then(users => res.json(users))
    // })

 