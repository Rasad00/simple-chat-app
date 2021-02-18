const express = require("express");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {
       origin: "*"
    }
});

const PORT = process.env.PORT || 5000;

const router = require("./router");
const { addUser, deleteUser, getUser } = require("./user");

app.use(cors())

app.use(router);


io.on("connection", socket => {
    console.log(`new customer connected ${ socket.id }`);

    socket.on("join", ({ username, room })=> {
        const user = addUser({ id: socket.id, username, room });

        socket.broadcast.to(user.room)
            .emit("newcomer", { username: user.username, message: `${ user.username } join to room` });

        socket.join(user.room);
    })

    socket.on("message", (message, callback) => {
        const user = getUser(socket.id);
        socket.to(user.room).emit("newmessage", { username: user.username, message: message.message })
    })

    socket.on("disconnect", () => {
        console.log(`user disconnected id: ${ socket.id }`);
        deleteUser(socket.id);
    })
})

server.listen(PORT, () => console.log(`Server is running from port: ${ PORT }`))