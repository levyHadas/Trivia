module.exports = {
    findAvailableRoom,
    createRoom
}


const gRooms = [];

// function findRoomWith(user) {
// 	return gRooms.find(room => room.members.find(({ id }) => id === user.id));
// }

function findAvailableRoom() {
	return gRooms.find(({ members }) => members.length === 1);
}

function createRoom(user){
    var newRoom = {
        members: [user],
        id: _makeId()
    }
    gRooms.push(newRoom);
    return newRoom;
}

function _makeId(length=3) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}