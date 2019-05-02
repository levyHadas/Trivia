module.exports = {
    getRoom,
    leaveRoom,
    removeRoom,
    printRooms
    
}


var gRooms = [];

// function findRoomWith(user) {
// 	return gRooms.find(room => room.members.find(({ id }) => id === user.id));
// }

function _checkForAvailableRoom() {
    let roomWithWaiting = gRooms.find((room) => {
        if (room.members && room.members.length === 1) {
            return room
        }
    })
    if (roomWithWaiting) return roomWithWaiting
    else return gRooms.find((room) => room.members && room.members.length === 0)
    
}

function removeRoom(id) {
    gRooms = gRooms.filter((room) => room._id !== id);  
}

function leaveRoom(roomToLeave, user) {
    if (!roomToLeave.members.length) removeRoom(roomToLeave._id)
    else {
        roomToLeave.members = roomToLeave.members.filter((member) => {
                                                    return member._id !== user._id})
        console.log(roomToLeave.members, ' room members')
    }
}

function getRoom() {
    let availableRoom = _checkForAvailableRoom()
    console.log('found available ', availableRoom)
    if(availableRoom) return availableRoom
    return _createRoom()
}
function printRooms() {
    console.log('our rooms are:', gRooms)
}
function _createRoom(){
    var newRoom = {
        members: [],
        _id: _makeId()
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