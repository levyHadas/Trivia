const mongoService = require('./mongo-service')

const ObjectId = require('mongodb').ObjectId;


module.exports = {
    query,
    getById,
    add,
    remove,
    update,
    getFilter,
    addTagsToDB
    // getRandom
}

// function checkLogin({ nickname }) {
//     return mongoService.connect()
//         .then(db => db.collection('toy').findOne({ nickname }))
// }

async function query(query) {
    // var query = {category:'The overall'} || {tags:'value}
    queryToMongo = {}
    if (query.category) queryToMongo.category = { '$regex': query.category, '$options': 'i' }
    if (query.tags && query.tags.length > 0) {
        //Todo - for multiple tags: user or - need to build an expretion for each
        queryToMongo.tags = { '$regex': query.tags, '$options': 'i' }
    }
    try {
        const db = await mongoService.connect()
        const data = await db.collection('quest').find(queryToMongo).toArray()
        return data
    }
    catch (error) {
        console.log(error.message)
        throw (error.message + '. could not load database')
    }
}

function getById(id) {
    const _id = new ObjectId(id)
    return mongoService.connect()
        .then(db => db.collection('quest').findOne({ _id }))
}

//not working yet
// async function getRandom(num = 5) {
//     const db = await mongoService.connect()
//     const quests = await db.quest.aggregate([ { $sample: { size: num } } ])
//     return quests
// }



async function add(quest) {
    const db = await mongoService.connect()
    const res = await db.collection('quest').insertOne(quest)
    quest._id = res.insertedId
    return quest
}



async function remove(id) {
    const _id = new ObjectId(id)
    const db = await mongoService.connect()
    await db.collection('quest').deleteOne({ _id })
}



async function update(quest) {
    const strQuestId = quest._id
    quest._id = new ObjectId(quest._id)
    const db = await mongoService.connect()
    await db.collection('quest').updateOne({ _id: quest._id }, { $set: quest })
    quest._id = strQuestId
    return quest
}

async function getFilter() {
    const db = await mongoService.connect()
    const filter = await db.collection('filter').findOne({})
    return filter
}


async function addTagsToDB(tags) { //tags = Array
    const filterDbId = '5c937bed049290e19c5fa174'
    //To do: get the Id from mongo and not hard coded
    const objId = new ObjectId(filterDbId)

    const queryToMongo = 
        (   { _id: objId },
            { $push: 
                { tags: 
                    { $each: tags } 
                } 
            }
        )
    await db.getCollection('filter').findOneAndUpdate(queryToMongo)
}

//this following works in Robo:
//db.getCollection('filter').findOneAndUpdate(
//{_id : ObjectId("5c937bed049290e19c5fa174")}, 
//{$push: { tags: {$each:["Fantasy", "Python"]} } })}












