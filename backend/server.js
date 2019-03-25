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

var connectedSockets = [];


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


var connectedSockets = [];

io.on('connection', socket => {
  console.log('socket connected! ')
  
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
    connectedSockets = connectedSockets.filter(s => s.userId !== socket.userId)
  })


  socket.on('connectionTest', msgFromFront => {
    console.log(msgFromFront)
    io.emit('connectionTest', 'Hi from server')
  })
  
  
  socket.on('joinedParty', user => {

    socket.user = user
    connectedSockets.push(socket)
    if (connectedSockets.length = 2) {
      // console.log('connectedSockets', connectedSockets.length)
      io.emit('startParty')
    }
    else if (connectedSockets.length > 2) {
      io.emit('addUserToParty', socket.user)
    }
    else socket.emit('noPartyYet')
  })

  socket.on('updateGameScores', playersWithScores => {
    io.emit('ShowUpdatedScores', playersWithScores)  
  })

  

  
 
  
  // socket.on('userConnected', userId => {
  //     socket.join(userId)
  //     io.emit('userIsConnected', userId);
  //     console.log('new user connected. id: ', userId)
  // })




})








const PORT = process.env.PORT || 3003
server.listen(PORT, () => console.log(`Example app IS listening on port ${PORT}`))