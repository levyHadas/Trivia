const userService = require('../services/user-service')

module.exports = addUserRoutes;


function addUserRoutes(app) {




    //create user
    app.post('/signup', (req, res) => {
        console.log(req.body)
        if (req.body.username && req.body.password) {
            const username = req.body.username
            const password = req.body.password
            userService.addUser({ username, password })
                .then(user => res.json(user))
                .catch(err => {
                    res.status(401).end()
                    throw(err)
                })
            } 
        else res.status(401).end()
    })
             
    app.put('/login', (req, res) => {
        if (req.body.username && req.body.password) { 
            const username = req.body.username
            const password = req.body.password
            userService.checkLogin({ username, password })
                .then(user => {
                    req.session.user = user
                    return res.json(user)
                })
                .catch(err => {
                    res.status(401).end()
                    throw(err)
                })
            }
        else {
            res.status(401).end()
        }
    })

}


    
    //get users
    // app.get(BASE_PATH, (req, res) => {
    //     userService.query()
    //         .then(users => res.json(users))
    // })

    // get user
    // app.get(`${BASE_PATH}/:id`, (req, res) => {
    //     const userId = req.params.id
    //     Promise.all([
    //         userService.getById(userId),
    //         reviewService.query({ userId })
    //     ])
    //         .then(([user, reviews]) => {
    //             console.log({ user })
    //             res.json({ user, reviews })
    //         })
    // })
