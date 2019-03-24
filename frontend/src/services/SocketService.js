
import ioClient from 'socket.io-client'

var socket = ioClient('//localhost:3003');

const msgs = []

export default {
    emit,
    on,
    socket
}

connectionTest()



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
