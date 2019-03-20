const mongoService = require('./mongo-service')

const ObjectId = require('mongodb').ObjectId;


function addReview({ userId, carId, content }) {
    var review = {
        userId: new ObjectId(userId),
        carId: new ObjectId(carId),
        content
    }
    return mongoService.connect()
        .then(db => db.collection('review').insertOne(review))
        // .then (({insertedId: _id}) => ({...review, _id}))
        .then(res => {
            return getById(res.insertedId)
        })
}

function getUserReviews(userId) {
    const id = new ObjectId(userId)
    return mongoService.connect()
        .then(db =>
            db.collection('review').aggregate([
                {
                    $match: { userId: id }
                },
                {
                    $lookup:
                    {
                        from: 'car',
                        localField: 'carId',
                        foreignField: '_id',
                        as: 'car'
                    }
                }, {
                    $unwind: '$car'
                }
            ]).toArray()
        )

}


function query({ userId = null, carId = null } = {}) {
    const criteria = {}
    if (userId) criteria.userId = new ObjectId(userId)
    if (carId) criteria.carId = new ObjectId(carId)
    return mongoService.connect().then(db => {
        return db.collection('review')
            .aggregate([
                {
                    $match : criteria
                },
                {
                    $lookup:
                    {
                        from: 'car',
                        localField: 'carId',
                        foreignField: '_id',
                        as: 'car'
                    }
                },
                {
                    $unwind: '$car'
                },
                {
                    $lookup:
                    {
                        from: 'user',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                {
                    $unwind: '$user'
                }
            ]).toArray()
    })
}




module.exports = {
    query,
    getUserReviews,
    addReview
}