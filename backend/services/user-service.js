const mongoService = require('./mongo-service')

const ObjectId = require('mongodb').ObjectId;


// function checkLogin(user) {
//     return mongoService.connect()
//         .then(db => db.collection('user').findOne({ nickname }))
// }


// function getById(id) {
//     const _id = new ObjectId(id)
//     return mongoService.connect()
//         .then(db => db.collection('user').findOne({ _id }))
// }







function checkLogin(user) {
    var queryToMongo = {$and:[{username:user.username }, {password:user.password }]}
    console.log(queryToMongo)
    return mongoService.connect()
        .then(db => db.collection('user').findOne(queryToMongo))
        .then(res => {
            if (!res) throw ('wrong credentials')
            else return res
        })

}



// function query() {
//     return mongoService.connect()
//         .then(db => db.collection('user').find({}).toArray())
// }

// todo  - add user only if nickname is not taken
function addUser(user) {
    return mongoService.connect()
        .then(db => db.collection('user').findOne({username:user.username }))
        .then(res => {
            if (res) throw ('username taken')
            else {
                return mongoService.connect()
                    .then(db => db.collection('user').insertOne(user))
                    .then(res => {
                        console.log('here', res)
                        user._id = res.insertedId
                        return user
                    })
            }
       
        })
}







module.exports = {
    // query,
    // getById,
    addUser,
    checkLogin
    // checkLogin
}