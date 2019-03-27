
import ioClient from 'socket.io-client'
import Router from '../router.js'
import Store from '../store/store.js'


var socket = ioClient('//localhost:3003');

const msgs = []

export default {
    emit,
    on,
    socket,
    connectionTest
}




socket.on('tellUserToWait', numOfUsers => {
  console.log(numOfUsers , ' are connected. game only start at 5')
})


socket.on('startParty', partyQuests => {
  Store.dispatch({ type: "setGameQuests", quests: partyQuests })
  Store.commit({ type: "setCurrQuest", quest: partyQuests[0] })
  Router.push('/play/party')
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








// function send(msg) {
// 	socket.emit('post-msg', msg)
// }


// connectSocket()

// function connectSocket() {
//     socket.emit('check', 'lala')
//     socket.on('pingUser', pingMsg => {
//         console.log(pingMsg)
//     })
// 	// socket.on('userIsConnected', user => {
// 	// 	console.log('user conncted :', user);
// 	// 	// _notification(`${user.name} just connected!  `, 'success', 'Dont forget to say hello')
// 	// })

// }

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
