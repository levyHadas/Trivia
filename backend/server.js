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
const SocketService = require ('./services/socket-service.js')


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
SocketService(io)











const PORT = process.env.PORT || 3003
server.listen(PORT, () => console.log(`Trivia app is listening on port ${PORT}`))


