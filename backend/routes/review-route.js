const reviewService = require('../services/review-service.js')
const BASE = '/review'

function addRoutes(app) {
    app.get(BASE, (req, res) => {
        reviewService.query(req.query)
            .then( reviews => {
                res.json(reviews)
            })
    })

    app.post(BASE, (req,res) => {
        var review ={
            // userId: req.session.userId
            userId : req.body.userId,
            carId : req.body.carId,
            content: req.body.content
        }
        reviewService.addReview(review)
            .then(review => res.json(review))
    })
}


module.exports = addRoutes;