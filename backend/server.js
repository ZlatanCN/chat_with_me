import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import userRoutes from './routes/userRoutes.js';
import connectToDatabase from './db/connectToDatabase.js';
import { app, server } from './socket/socket.js';
import chalk from 'chalk';

const PORT = process.env.PORT || 5000;
dotenv.config();

app.use(express.json()); // Allow to parse JSON data
app.use(cookieParser()); // Allow to parse cookies

// Auth route http://localhost:5000/api/auth/
app.use('/api/auth', authRoutes);
// Message route http://localhost:5000/api/messages/
app.use('/api/messages', messageRoutes);
// User route http://localhost:5000/api/users/
app.use('/api/users', userRoutes);

// Start the server
server.listen(PORT, () => {
  connectToDatabase();
  console.log(`Server is running on port ${chalk.blueBright(PORT)}`);
});