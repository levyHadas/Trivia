const QuestService = require ('./quest-service.js')
const RoomService = require ('./room-service.js')

module.exports = SocketService;

function SocketService(io) {

    io.on('connection', socket => {
    
        socket.on('connectionTest', msgFromFront => {
          console.log(msgFromFront)
          socket.emit('connectionTest', 'Hi from server')
        })
      
        socket.on('disconnect', () => {
          _leavePartyRoom(socket)
        })
        
        socket.on('userLeftPartyPage', () => {
          _leavePartyRoom(socket)
        })
        
        socket.on('partyRequest', async (user) => {
          if (socket.room) {
            await _handleRequest(socket)
          }
          else {
            _setRequest(user, socket)
            await _handleRequest(socket)
          }
        })

        socket.on('setRequest', (user) => {
            _setRequest(user, socket)
        })

        socket.on('handleRequest', async () => {
        await _handleRequest(socket)
        })
        
        socket.on('changeInScores', ({playerToUpdate, newScores}) => {
            var currRoom = socket.room
            if (!currRoom) return
            var player = currRoom.members.find(player => player._id === playerToUpdate._id)
            if (player) player.scores = newScores
            io.to(currRoom._id).emit('ShowUpdatedScores', currRoom.members)  
        })
        
        socket.on('resetAllScores', () => {
          _resetAllScores(socket)
        })

        socket.on('partyEnded', () => {
          _endParty(socket)
          socket.emit('setInPartyState', false)
        })
      
      })
      
      function _setRequest(user, socket) {
        var currRoom = RoomService.getRoom();
        currRoom.members.push(user)
        // RoomService.printRooms()
        socket.room = currRoom
        socket.leave(currRoom._id)
        socket.join(currRoom._id)
        socket.user = user
        user.scores = []
      }

      async function _handleRequest(socket) {
        var currRoom = socket.room
        var numOfWaiting = io.sockets.adapter.rooms[currRoom._id].length
        if (numOfWaiting < 2) {
          socket.emit('tellUserToWait', numOfWaiting)
          currRoom.isPartyOn = false
        }
        else { //start!
          currRoom.isPartyOn = true
          const quests = await QuestService.query({}) 
          io.to(currRoom._id).emit('startParty', quests) 
        }  
      }
      
      function _leavePartyRoom(socket) {
        socket.emit('setInPartyState', false)
        var roomToLeave = socket.room
        if (!roomToLeave) return
        socket.room = null
        socket.leave(roomToLeave._id)
        RoomService.leaveRoom(roomToLeave, socket.user)
        io.to(roomToLeave._id).emit('ShowUpdatedScores', roomToLeave.members) 
      }
      
      function _endParty(socket) {
        socket.emit('setInPartyState', false)
        if (!socket.room) return
        let room = socket.room
        room.isPartyOn = false
        _resetAllScores(socket)
        _disconnectAllUsers(room._id)
        socket.room = null
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
      



}
