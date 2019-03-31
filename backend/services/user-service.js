const mongoService = require('./mongo-service')

const ObjectId = require('mongodb').ObjectId;



module.exports = {
    // query,
    getById,
    addUser,
    checkLogin
}


async function checkLogin(user) {
    var queryToMongo = {$and:[{username:user.username }, {password:user.password }]}
    const db = await mongoService.connect()
    const res = await db.collection('user').findOne(queryToMongo)
    if (!res) throw ('wrong credentials')
    else return res
}


async function addUser(user) {
    const db = await mongoService.connect()
    try {
        var res = await db.collection('user').findOne({username:user.username })
    }
    catch {
        throw ('could not connect to database')
    }

    if (res) throw ('username taken')
    else {
        try {
            if (!user.img) user.img = `https://api.adorable.io/avatars/50/${user.username}`
            const res = await db.collection('user').insertOne(user)
            user._id = res.insertedId
            return user
        }
        catch {
            throw ('Could not add user. Try again later')
        }
    }
}


async function getById(id) {
    const _id = new ObjectId(id)
    const db = await mongoService.connect()
    const res = await db.collection('user').findOne({ _id })
    if (!res) throw ('User does not exist')
    return res
}





