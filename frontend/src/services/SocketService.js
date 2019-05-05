
import ioClient from 'socket.io-client'
import Router from '../router.js'
import Store from '../store/store.js'

// var socket = ioClient();
// var socket = ioClient('//localhost:3003');

const URL = (process.env.NODE_ENV !== 'development')
? ''
: '//localhost:3003'
var socket = ioClient(URL);


export default {
    emit,
    on,
    socket,
    connectionTest
}




socket.on('tellUserToWait', numOfUsers => {
  // Store.dispatch({type: 'updateWaitingState', isWaiting: true})
  Router.push('/waitroom')
  console.log(numOfUsers , ' are connected. game only start at 5')
})
socket.on('setInPartyState', state => {
  Store.dispatch({type: 'updateInPartyState', inParty: state})
})


socket.on('startParty', partyQuests => {
  Store.dispatch({type: 'updateInPartyState', inParty: true})
  Store.dispatch({ type: 'setGameQuests', quests: partyQuests })
  Store.dispatch({type: 'updateAllScores', playersWithScores: []})
  // setTimeout(()=> {
    Router.push('/play/party')
  // },1000)
})

socket.on('ShowUpdatedScores', playersWithScores => {
  Store.dispatch({type:'updateAllScores', playersWithScores})
})




function connectionTest() {
  socket.emit('connectionTest', 'Hi from Front')
  socket.on('connectionTest', msgFromServer => {
          console.log(msgFromServer)
  })
}

function emit(eventName, data) {
	socket.emit(eventName, data)
}


function on(eventName, cb) {
	socket.on(eventName, cb)
}










// function getSocketConnection() {
//     return socket
// }






// function refresh() {
// 	return store.dispatch({ type: "loadActiveTasks" })
// }

// function send(msg) {
// 	socket.emit('post-msg', msg)
// }

// function _notification(title = 'default title', type = 'success', text = 'dafault text') {
// 	Vue.notify({
// 		group: 'foo',
// 		title: title,
// 		type: type,
// 		classes: 'vue-notification',
// 		text: text
// 	})
// }
