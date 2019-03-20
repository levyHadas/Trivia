const mongoService = require('./mongo-service')

const ObjectId = require('mongodb').ObjectId;


// function checkLogin({ nickname }) {
//     return mongoService.connect()
//         .then(db => db.collection('toy').findOne({ nickname }))
// }


function query(query) {
    queryToMongo = {}
    if (query.name) queryToMongo.name = {'$regex': query.name, '$options' : 'i'}
    if (query.type) queryToMongo.type = {'$regex': query.type, '$options' : 'i'}
    if (query.inStock) { 
        if (query.inStock !== 'all') queryToMongo.inStock = JSON.parse(query.inStock)
    }
    return mongoService.connect()
        .then(db => db.collection('toy').find(queryToMongo).toArray())
}

function getById(id) {
    const _id = new ObjectId(id)
    return mongoService.connect()
        .then(db => db.collection('toy').findOne({_id}))
}

function add(toy) {
    return mongoService.connect()
        .then(db => db.collection('toy').insertOne(toy))
        .then(res => {
            toy._id = res.insertedId
            return toy
        })
}

function update(toy, query) {

    const strToyId = toy._id
    toy._id = new ObjectId(toy._id)
    return mongoService.connect()
        .then(db => db.collection('toy').updateOne({_id:toy._id},{$set:toy}))
        .then(() => {
            toy._id = strToyId
            return toy
        })
        
}

function remove(id) {
    const _id = new ObjectId(id)
    return mongoService.connect()
        .then(db => db.collection('toy').deleteOne({_id}))
}









module.exports = {
    query,
    getById,
    add,
    remove,
    update
}