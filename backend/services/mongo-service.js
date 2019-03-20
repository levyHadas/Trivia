var dbConn = null;

function connectToMongo() {
    // Reuse existing connection if exist
    if (dbConn) return Promise.resolve(dbConn);
    const MongoClient = require('mongodb').MongoClient;
    
    const url = (!process.env.PORT)? 
                    'mongodb://localhost:27017/toyDB' : 'mongodb+srv://levyHadas:qweqwe00@levyHadas-t3mqo.mongodb.net/toyDB?retryWrites=true'
    
// const url ='mongodb+srv://levyHadas:qweqwe00@levyHadas-t3mqo.mongodb.net/toyDB?retryWrites=true'
                    
    
    return MongoClient.connect(url)
        .then(client => {
            console.log('Connected to MongoDB');
            // If we get disconnected (e.g. db is down)
            client.on('close', ()=>{
                console.log('MongoDB Diconnected!');
                dbConn = null;
            })
            dbConn = client.db()
            return dbConn;
        })
}

module.exports = {
    connect : connectToMongo
}
