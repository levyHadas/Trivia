const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const app = express()
var server = require('http').Server(app)
const io = require('socket.io')(server)

// const PORT = process.env.PORT || 3003

const AddQuestRoutes = require('./routes/quest-route')
const AddUserRoutes = require('./routes/user-route')

const QuestService = require ('./services/quest-service.js')



app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:8081'],
  credentials: true
  // enable set cookie
}));

app.use(express.static('public'));
app.use(bodyParser.json())
app.use(cookieParser());
app.use(session({
  secret: 'puki muki',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false}
}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})
AddQuestRoutes(app)
AddUserRoutes(app)
// QuestService(app)


var connectedSockets = []
var playersWithScores = []

io.on('connection', socket => {
  console.log('socket connected! ')
 
  socket.on('disconnect', () => {
    console.log('user disconnected')
    if (!socket.user) return
    connectedSockets = connectedSockets.filter(s => s.user._id !== socket.user._id)
    playersWithScores = playersWithScores.filter(user => user._id !== socket.user._id)
    // io.emit('updateConnectedUsers', playersWithScores)

  })


  socket.on('connectionTest', msgFromFront => {
    console.log(msgFromFront)
    socket.emit('connectionTest', 'Hi from server')
  })
  
  
  socket.on('partyRequest', async(user) => {
    if (!user) return
    if (playersWithScores.some(player => player._id === user._id)) return
    connectedSockets.push(socket)
    user.scores = []
    playersWithScores.push(user)
    console.log('user:', user.username, 'joined')
    var quests = await QuestService.query({})


    if (playersWithScores.length < 2) {
      socket.emit('tellUserToWait', playersWithScores.length)
    }
    else io.emit('getReadyToParty') 
      //'getReadyToParty' is listened to in all the app therefore the listener is in socketService
    

    socket.on('readyToStart', () => {
      io.emit('startParty', quests)
    })
  


  })

  socket.on('updateGameScores', playerScores => {
    const idx = playersWithScores.findIndex(player => player._id === playerScores._id)
    if (idx === -1) return
    var player = playersWithScores[idx]
    player.scores = playerScores.scores
    io.emit('ShowUpdatedScores', playersWithScores)  
  })

  // socket.on('getPlayersWithScores', playersWithScores => {
  //   io.emit('updateConnectedUsers', playersWithScores)
  // })
  

  io.emit('updateConnectedUsers', playersWithScores)


})
  
  
  
    //   if (connectedSockets.length >= 1) {
  //     io.emit('startParty')
  //   }
  //   else socket.emit('noPartyYet')
  // })



  

  
 
  
  // socket.on('userConnected', userId => {
  //     socket.join(userId)
  //     io.emit('userIsConnected', userId);
  //     console.log('new user connected. id: ', userId)
  // })













const PORT = process.env.PORT || 3003
server.listen(PORT, () => console.log(`Example app IS listening on port ${PORT}`))