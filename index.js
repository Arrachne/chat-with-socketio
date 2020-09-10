const http = require('http');
const express = require('express');
var path = require("path");
const socketio = require('socket.io');
const cors = require('cors');
const formatMessage = require('./utils/messages');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const port = process.env.PORT || 5000;
const adminName = 'admin';

// folder with react app
app.use(express.static(path.join(__dirname, "client", "build")));

app.use(cors());
app.use(router);

io.on('connect', (socket) => {
  // When new user joins
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    // messages to room
    // to current user
    socket.emit('message', formatMessage(adminName, `${user.name}, welcome to room ${user.room}.`));
    // to other users
    socket.broadcast.to(user.room).emit('message', formatMessage(adminName, `${user.name} has joined!`));

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  // when user sends message
  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.name, message));

    callback();
  });

  // when user leaves room
  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', formatMessage(adminName, `${user.name} has left.`));
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    }
  })
});

// in case of unevident requests server will answer with main page
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, "client", 'build', 'index.html'));
});

// starting server
server.listen(port, () => console.log(`Listening on port ${port}`));
