import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { connectToDatabase } from './db/connectToDatabase.js';
import { app, server } from './socket/socket.js';
import chalk from 'chalk';
import path from 'path';
import cors from 'cors';

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
dotenv.config();

app.use(express.json()); // Allow to parse JSON data
app.use(cookieParser()); // Allow to parse cookies
app.use(cors({
  origin: ['https://chat-with-me-chi.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
})); // Allow cross-origin requests

// Auth route http://localhost:5000/api/auth/
app.use('/api/auth', authRoutes);
// Message route http://localhost:5000/api/messages/
app.use('/api/messages', messageRoutes);
// User route http://localhost:5000/api/users/
app.use('/api/users', userRoutes);

// Serve static assets if in production
app.use(express.static(path.join(__dirname, '/frontend/dist')));

// Serve the index.html file if in production
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// Start the server
server.listen(PORT, () => {
  connectToDatabase();
  console.log(`Server is running on port ${chalk.blueBright(PORT)}`);
});