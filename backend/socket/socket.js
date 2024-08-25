import { Server } from 'socket.io';
import http from 'http';
import express from 'express';
import chalk from 'chalk';

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
}

const userSocketMap = {}; // { userId: socketId }

io.on('connection', (socket) => {
  console.log('User connected', chalk.blueBright(socket.id));

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  // Emit is used to send events to all the connected clients
  io.emit('getOnlineUsers', Object.keys(userSocketMap));

  // Listen to the events, can be used to both on the client and server side
  socket.on('disconnect', () => {
    console.log('User disconnected', chalk.blueBright(socket.id));
    delete userSocketMap[userId];
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});

export { app, io, server, getReceiverSocketId };