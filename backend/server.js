const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const app = express()
var server = require('http').Server(app)
const io = require('socket.io')(server)
const AddQuestRoutes = require('./routes/quest-route')
const AddUserRoutes = require('./routes/user-route')
const AddGameRoutes = require('./routes/game-route')
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
AddGameRoutes(app)

var playersWithScores = []

function _removeUserFromPlayers(socket) {
  // console.log(socket.user.username, ' leaving the party')
  // console.log(socket.user.nickname, ' leaving the party')
  var roomToLeave = socket.room
  if (!roomToLeave) return
  socket.leave(roomToLeave)
  playersWithScores = playersWithScores.filter(user => user._id !== socket.user._id)
  io.to(roomToLeave).emit('ShowUpdatedScores', playersWithScores) 
}

io.on('connection', socket => {
  console.log('connected')
  
  socket.on('disconnect', () => {
    _removeUserFromPlayers(socket)
  })

  socket.on('userLeftPartyPage', () => {
      _removeUserFromPlayers(socket)
  })

  socket.on('partyRequest', async (user) => {
    var isPanding = playersWithScores.some(player => player._id === user._id)
    if (isPanding) return

    socket.room = 'room1'
    socket.leave('room1')
    socket.join('room1')
    socket.user = user

    //add user to waiting/playing list
    user.scores = []
    playersWithScores.push(user)
    console.log('user:', user.username, 'requested a party')
    
    //if waiting for 5:
    var numOfWaiting = io.sockets.adapter.rooms['room1'].length
    if (io.sockets.adapter.rooms['room1'] && numOfWaiting < 2) {
      socket.emit('tellUserToWait', numOfWaiting)
    }
    else { //start!
      const quests = await QuestService.query({})
      io.to('room1').emit('startParty', quests) 
    }  
  })


  socket.on('changeInScores', ({playerToUpdate, newScores}) => {
    const player = playersWithScores.find(player => player._id === playerToUpdate._id)
    if (player) player.scores = newScores
    io.to('room1').emit('ShowUpdatedScores', playersWithScores)  
  })

  socket.on('resetAllScores', () => {
    playersWithScores = playersWithScores.map(player => {
      player.scores = []
      return player
    })
    io.to('room1').emit('ShowUpdatedScores', playersWithScores)  

  })
      


  socket.on('connectionTest', msgFromFront => {
    console.log(msgFromFront)
    socket.emit('connectionTest', 'Hi from server')
  })

})
  


const PORT = process.env.PORT || 3003
server.listen(PORT, () => console.log(`Trivia app is listening on port ${PORT}`))