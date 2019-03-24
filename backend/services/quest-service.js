const mongoService = require('./mongo-service')
const ObjectId = require('mongodb').ObjectId

const ImgService = require('./img-service.js')




module.exports = {
    query,
    getById,
    add,
    remove,
    update,
    getFilterOptions,
    addTagsToDB
}

// function checkLogin({ nickname }) {
//     return mongoService.connect()
//         .then(db => db.collection('toy').findOne({ nickname }))
// }

async function query(query) {
    queryToMongo = {}
    if (query.category) queryToMongo.category = { '$regex': query.category, '$options': 'i' } 
    if (query.tags && query.tags.length > 0) {
        tags = query.tags.split(',').map(tag => new RegExp(tag,'i'))
        queryToMongo.tags = { $in: tags } 
        //{ '$regex': query.tags, '$options': 'i' }
        // queryToMongo.tags = { '$regex': tags, '$options': 'i' }
    }
    try {
        const db = await mongoService.connect()
        const data = await db.collection('quest').aggregate(
            [ { $match : queryToMongo },
              { $sample: { size: 50 } }
            ]).toArray()
        // const data = await db.collection('quest').find(queryToMongo).limit(200).toArray()
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


async function add(quest) {
    if (!quest.imgSrc) {
        const url = await ImgService.suggestImgs(quest.tags[0])
        quest.imgSrc = url
    }
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
    console.log('Updating Object');
    
    const strQuestId = quest._id
    quest._id = new ObjectId(quest._id)
    const db = await mongoService.connect()
    await db.collection('quest').updateOne({ _id: quest._id }, { $set: quest })
    quest._id = strQuestId
    return quest
}

async function getFilterOptions() {
    const db = await mongoService.connect()
    const filter = await db.collection('filterOptions').findOne({})
    return filter
}


async function addTagsToDB(tags) { //tags = Array
    const db = await mongoService.connect()
    const filter = await db.collection('filterOptions').findOne({})
    const strId = filter._id
    
    filter.tags = filter.tags.concat(tags)
    filter._id = new ObjectId(strId)
    
    await db.collection('filterOptions').updateOne({ _id: filter._id }, { $set: filter })

}













