// server.js
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

io.on('connection', socket => {
  console.log('Client connected:', socket.id);

  // Listen for incoming call events
  socket.on('incomingCall', caller => {
    console.log(`Incoming call from ${caller}`);
    io.emit('incomingCall', {caller, recipient: socket.id});
  });

  // Other event listeners can be added based on your application requirements

  // Clean up on client disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
