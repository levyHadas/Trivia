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
  origin: ['http://localhost:8080', 'http://localhost:8081', 'http://localhost:8082'],
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


function _isAdminInParty() {
  var isAdminIn = playersWithScores.some(player => {
    return player.username === 'adminPartyAdmin' || player.username === 'partyAdmin'
  })
  return isAdminIn
}

function _userIsAdmin(user) {
  return user.username === 'adminPartyAdmin' || user.username === 'partyAdmin'
}

function _removeUserFromPlayers(socket) {
  var roomToLeave = socket.room
  if (!roomToLeave) return
  socket.leave(roomToLeave)
  playersWithScores = playersWithScores.filter(user => user._id !== socket.user._id)
  io.to(roomToLeave).emit('ShowUpdatedScores', playersWithScores) 
}

function _joinPlayers(socket, user) {
  var isPanding = playersWithScores.some(player => player._id === user._id)
  if (isPanding) return
 
  socket.room = 'room1'
  socket.leave('room1')
  socket.join('room1')
  socket.user = user

  // add user to waiting/playing list
  user.scores = []
  playersWithScores.push(user)
  console.log('user:', user.username, 'requested a party')
}

function _startPartyTimer() {
  setTimeout(() => {
    io.to('room1').emit('timeUp')
  }, (6*20+(5*1.7)+(6*1.5) )*1000)
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
    
    // Patch for Demo!!!!!!
    if (_isAdminInParty() && !_userIsAdmin(user)) {
      socket.emit('tellUserToWait', numOfWaiting)
      return
    }
        
    _joinPlayers(socket, user)
    
    var numOfWaiting = io.sockets.adapter.rooms['room1'].length
    
    if  (numOfWaiting >= 2 && _userIsAdmin(user)) { 
          //start!
        let query = {category: 'Javascript'}
        const quests = await QuestService.query(query)
        io.to('room1').emit('startParty', quests) 
        _startPartyTimer()
    } 
    else {
      socket.emit('tellUserToWait', numOfWaiting)
    } 
    //Do not delete this comment!
    // var numOfWaiting = io.sockets.adapter.rooms['room1'].length
    // if (io.sockets.adapter.rooms['room1'] && numOfWaiting < 2) {
    //   socket.emit('tellUserToWait', numOfWaiting)
    // }
    // else if (user.username === 'partyAdmin') { //start!
    //   const quests = await QuestService.query({})
    //   io.to('room1').emit('startParty', quests) 
    //   _startPartyTimer()
    // }  
  })

  socket.on('startPartyTimer', () => {
    _startPartyTimer()
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


// var room = roomService.findAvailableRoom();
// if (!room) room = roomService.createRoom(user);
//   socket.room = room.id
//   socket.leave(room.id)
//   socket.join(room.id)
//   socket.user = user
//   user.scores = []
//   playersWithScores.push(user)
//   room.members.push(user)
//   console.log('user:', user.username, 'requested a party')