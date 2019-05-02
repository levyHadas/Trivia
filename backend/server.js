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
  socket.room = null
  socket.leave(roomToLeave._id)
  RoomService.leaveRoom(roomToLeave, socket.user)
  io.to(roomToLeave._id).emit('ShowUpdatedScores', roomToLeave.members) 
}



function _startPartyTimer(roomId) {
  //this is only in case a socket will not get disconnected for some reason
  gPartyTimeout = setTimeout(() => {
    io.to(roomId).emit('timeUp')
      _disconnectAllUsers(roomId)
  }, (80*1000))
}




io.on('connection', socket => {

  socket.on('connectionTest', msgFromFront => {
    console.log(msgFromFront)
    socket.emit('connectionTest', 'Hi from server')
  })

  socket.on('disconnect', () => {
    console.log('disconnect')
    _leavePartyRoom(socket)
  })

  socket.on('userLeftPartyPage', () => {
    _leavePartyRoom(socket)
  })
  // socket.on('partRequestCanceled', () => {
  //   console.log('partRequestCanceled')
  //   _leavePartyRoom(socket)
  // })

  socket.on('partyRequest', async (user) => {
    
    if (socket.room) return

    var currRoom = RoomService.getRoom();
    currRoom.members.push(user)
    console.log('rooms in room service:')
    RoomService.printRooms()
    console.log('room in server: ', currRoom)
    
    socket.room = currRoom
    socket.leave(currRoom._id)
    socket.join(currRoom._id)
    socket.user = user
    user.scores = []
    console.log('user:', user.username, 'requested a party')
    console.log('Assigned to room, ', currRoom._id, 'room members: ', currRoom.members.length)

    var numOfWaiting = io.sockets.adapter.rooms[currRoom._id].length
    if (numOfWaiting < 2) {
      socket.emit('tellUserToWait', numOfWaiting)
    }
    else { //start!
      const quests = await QuestService.query({}) 
      io.to(currRoom._id).emit('startParty', quests) 
      _startPartyTimer(currRoom._id)
    }  
  })

  
  socket.on('resetAllScores', () => {
    _resetAllScores(socket)
  })

  socket.on('changeInScores', ({playerToUpdate, newScores}) => {
    var currRoom = socket.room
    if (!currRoom) return
    var player = currRoom.members.find(player => player._id === playerToUpdate._id)
    if (player) player.scores = newScores
    io.to(currRoom._id).emit('ShowUpdatedScores', currRoom.members)  
  })

  socket.on('partyEnded', () => {
    if (socket.room) _endParty(socket)
  })


})
function _endParty(socket) {
  let roomId = socket.room._id
  socket.room = null
  clearTimeout(gPartyTimeout)
  gPartyTimeout = null
  _disconnectAllUsers(roomId)
}
function _disconnectAllUsers(roomId) {
  RoomService.removeRoom(roomId)
  io.of('/').in(roomId).clients((error, socketIds) => {
    if (error) throw error
    socketIds.forEach(socketId => {
      io.sockets.sockets[socketId].leave(roomId)
      io.sockets.sockets[socketId].room = null
    })
  })
}
function _resetAllScores(socket) {
  let currRoom = socket.room
  if(!currRoom) return
  currRoom.members = currRoom.members.map(player => {
    player.scores = []
    return player
  })
  io.to(currRoom._id).emit('ShowUpdatedScores', currRoom.members)  
}


const PORT = process.env.PORT || 3003
server.listen(PORT, () => console.log(`Trivia app is listening on port ${PORT}`))


