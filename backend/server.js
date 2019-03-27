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

var playersWithScores = []

function _removeUserFromPlayers(socket) {
  console.log(socket.user.username, ' leaving the party')
  const roomToLeave = socket.room
  socket.leave(roomToLeave)
  playersWithScores = playersWithScores.filter(user => user._id !== socket.user._id)
  io.to(roomToLeave).emit('ShowUpdatedScores', playersWithScores) 
}

io.on('connection', socket => {
  
  socket.on('disconnect', () => {
    if (socket.user) _removeUserFromPlayers(socket)
  })

  socket.on('userLeftPartyPage', () => {
      _removeUserFromPlayers(socket)
  })

  socket.on('partyRequest', async (user) => {
    const isPanding = playersWithScores.some(player => player._id === user._id)
    if (isPanding) return
    socket.room = 'room1'
    socket.join('room1')
    socket.user = user
    
    //add user to waiting/playing list
    user.scores = []
    playersWithScores.push(user)
    console.log('user:', user.username, 'requested a party')
    
    //if waiting for 5:
    if (playersWithScores.length < 2) {
      socket.emit('tellUserToWait', playersWithScores.length)
    }
    else { //start!
      var quests = await QuestService.query({})
      io.to('room1').emit('startParty', quests) 
    }  
  })


  socket.on('updateGameScores', playerScores => {
    const idx = playersWithScores.findIndex(player => player._id === playerScores._id)
    if (idx === -1) return
    var player = playersWithScores[idx]
    player.scores = playerScores.scores
    io.to('room1').emit('ShowUpdatedScores', playersWithScores)  
  })


  socket.on('connectionTest', msgFromFront => {
    console.log(msgFromFront)
    socket.emit('connectionTest', 'Hi from server')
  })

})
  









const PORT = process.env.PORT || 3003
server.listen(PORT, () => console.log(`Trivia app is listening on port ${PORT}`))