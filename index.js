const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.broadcast.emit('user conn', "A new user just connected");

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('typing', (data)=>{
    if(data.typing==true)
       io.emit('display', data)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
    socket.broadcast.emit('user disconn', "A new just Disconnected");

  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

