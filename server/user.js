let users = [];

const addUser = ({id,  room, username }) => {
    if(checkUsername(username))
        return { error: `${ username } already esist` }

    users.push({
        id, username, room
    });

    return {
        id, username, room
    }
}

const deleteUser = ( id ) => {
    users = users.filter(user => user.id !== id)
}

const getUser = (id) => 
    users.filter(user => user.id === id)[0]

const checkUsername = ( username, room ) => 
    users.filter(user => (user.username === username && user.room === room) ).length > 0

const getAllUserInRoom = (room) => 
    users
        .filter(user => user.room === room)
        .map(user => user.username)


const getAviableRooms = () => {
    let rooms = [];
    users.forEach((user) => {
        if(!rooms.includes(user.room))
            rooms.push(user.room)
    });

    return rooms;
}

module.exports = {
    addUser, deleteUser,
    checkUsername, getUser,
    getAviableRooms, getAllUserInRoom
}