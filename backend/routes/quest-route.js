const QuestService = require('../services/quest-service')
const BASE_PATH = '/api/quest'

module.exports = addQuestRoutes;

async function addQuestRoutes(app) {
    
    // Quest REST API:

    
    //todo: middleware - not implemented yet - should be in edit and delete
    // function isUserQuest(req, res, next) {
    //     console.log('INSIDE MIDDLEWARE: ', req.session.user);
    //     if (!req.session.user) res.status(401).end('Unauthorized');
    //     else next();
    // }
 

    // LIST
    app.get(`${BASE_PATH}`, (req, res) => {
        QuestService.query(req.query)
            .then(quests => res.json(quests))  
    })

    app.get(`${BASE_PATH}/filter`, (req, res) => {
        QuestService.getFilterOptions()
            .then(filter => res.json(filter))  
    })

    app.post(`${BASE_PATH}/filter`, (req, res) => {
        const tags = req.body;
        QuestService.addTagsToDB(tags)
            .then(quests => res.json(quests))  
    })

    //Get Random
    // app.get(`${BASE_PATH}/random`, (req, res) => {
    //     QuestService.getRandom()
    //         .then(quests => res.json(quests))
    // })

 
    // SINGLE - GET Full details
    app.get(`${BASE_PATH}/:questId`, (req, res) => {
        const {questId} = req.params
        QuestService.getById(questId)
            .then(quest => res.json(quest))
 
    })



    // CREATE
    app.post(`${BASE_PATH}`, (req, res) => {
        const quest = req.body;
        QuestService.add(quest)
            .then(quest => res.json(quest))
    })


    // DELETE
    app.delete(`${BASE_PATH}/:questId`, (req, res) => {
        const questId = req.params.questId;
        QuestService.remove(questId)
            .then(() => {
                res.end(`quest ${questId} Deleted `)
                console.log('deleted')
            })
    })


    // UPDATE todo: need to check that user is editing is own item - how do we do that?
    app.put(`${BASE_PATH}/:questId`, (req, res) => {
        const quest = req.body;
        QuestService.update(quest)
            .then(quest => res.json(quest))
    })



}

