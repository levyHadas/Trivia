const mongoService = require('./mongo-service')

const ObjectId = require('mongodb').ObjectId;


async function checkLogin(user) {
    const queryToMongo = {$and:[{username:user.username }, {password:user.password }]}
    const db = await mongoService.connect()
    const res = await db.collection('user').findOne(queryToMongo)
    if (!res) throw ('wrong credentials')
    else return res
}


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



// function getById(id) {
//     const _id = new ObjectId(id)
//     return mongoService.connect()
//         .then(db => db.collection('user').findOne({ _id }))
// }


// function query() {
//     return mongoService.connect()
//         .then(db => db.collection('user').find({}).toArray())
// }




module.exports = {
    // query,
    // getById,
    addUser,
    checkLogin
    // checkLogin
}