'use strict';

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
const RoomService = require ('./services/Room-service.js')


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



var gPartyTimeout


function _leavePartyRoom(socket) {
  var roomToLeave = socket.room
  if (!roomToLeave) return
  console.log('user left room ', roomToLeave._id)
  socket.leave(roomToLeave._id)
  RoomService.leaveRoom(roomToLeave, socket.user)
  io.to(roomToLeave._id).emit('ShowUpdatedScores', roomToLeave.members) 
}

// function _joinPlayers(socket, user) {
//   // var isPanding = playersWithScores.some(player => player._id === user._id)
//   if (socket.room) return
// //   if (isPanding) return
 
// //   socket.room = 'room1'
// //   socket.leave('room1')
// //   socket.join('room1')
// //   socket.user = user

// //   // add user to waiting/playing list
// //   user.scores = []
// //   playersWithScores.push(user)
//   console.log('user:', user.username, 'requested a party')
// }

function _startPartyTimer(roomId) {
  clearTimeout(gPartyTimeout)
  gPartyTimeout = null
  gPartyTimeout = setTimeout(() => {
    io.to(roomId).emit('timeUp')
    _disconnectAllUsers()
  }, (80*1000))
}


// function _resetAllScores() {
//   playersWithScores = playersWithScores.map(player => {
//     player.scores = []
//     return player
//   })
//   io.to('room1').emit('ShowUpdatedScores', playersWithScores)  
// }

// function _disconnectAllUsers() {
//   playersWithScores = []
//   _resetAllScores()
//   io.of('/').in('room1').clients((error, socketIds) => {
//     if (error) throw error
//     socketIds.forEach(socketId => io.sockets.sockets[socketId].leave('room1'))
//   })

//   clearTimeout(gPartyTimeout)
//   gPartyTimeout = null
// }



io.on('connection', socket => {
  console.log('connected')
  
  socket.on('disconnect', () => {
    _leavePartyRoom(socket)
  })

  socket.on('userLeftPartyPage', () => {
    _leavePartyRoom(socket)
  })
  socket.on('partRequestCanceled', () => {
    // if (!partyTimeout) _removeUserFromPlayers(socket)
    _leavePartyRoom(socket)
  })

  socket.on('partyRequest', async (user) => {
    
    if (socket.room) return

    var currRoom = RoomService.getRoom();
    currRoom.members.push(user)
    
    socket.room = currRoom
    socket.leave(currRoom._id)
    socket.join(currRoom._id)
    socket.user = user
    user.scores = []
    console.log('user:', user.username, 'requested a party')
    console.log('Assigned to room, ', currRoom._id, 'room members: ', currRoom.members.length)

    var numOfWaiting = io.sockets.adapter.rooms[currRoom._id].length
    // if (io.sockets.adapter.rooms[currRoom._id] && numOfWaiting < 2) {
    if (numOfWaiting < 2) {
      socket.emit('tellUserToWait', numOfWaiting)
    }
    else { //start!
      const quests = await QuestService.query({})
      io.to(currRoom._id).emit('startParty', quests) 
      _startPartyTimer(currRoom._id)
      }  
  })
  // socket.on('reJoinParty', (user) => {
  //   _joinPlayers(socket, user)
  
  // })
  // socket.on('disconnectAllUsers', () => {
  //   _disconnectAllUsers()
  // })
  // socket.on('startPartyTimer', async() => {
  //   let query = {category: 'Javascript'}
  //   const quests = await QuestService.query(query)
  //   io.to('room1').emit('startParty', quests) 
  //   _resetAllScores()
  //   _startPartyTimer()
  // })
  
  socket.on('changeInScores', ({playerToUpdate, newScores}) => {
    var currRoom = socket.room
    if (!currRoom) return
    console.log(currRoom.members)
    var player = currRoom.members.find(player => player._id === playerToUpdate._id)
    if (player) player.scores = newScores
    io.to(currRoom).emit('ShowUpdatedScores', currRoom.members)  
  })
  socket.on('connectionTest', msgFromFront => {
    console.log(msgFromFront)
    socket.emit('connectionTest', 'Hi from server')
  })




  // socket.on('resetAllScores', () => {
  //   _resetAllScores()
  // })
  
 
      


})
  


const PORT = process.env.PORT || 3003
server.listen(PORT, () => console.log(`Trivia app is listening on port ${PORT}`))


