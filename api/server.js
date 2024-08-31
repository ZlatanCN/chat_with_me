import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from '../backend/routes/authRoutes.js';
import messageRoutes from '../backend/routes/messageRoutes.js';
import userRoutes from '../backend/routes/userRoutes.js';
import { connectToDatabase } from '../backend/db/connectToDatabase.js';
import { app, server } from '../backend/socket/socket.js';
import chalk from 'chalk';
import path from 'path';
import cors from 'cors';

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
dotenv.config();

app.use(express.json()); // Allow to parse JSON data
app.use(cookieParser()); // Allow to parse cookies

app.get("/login", (req, res) => res.send("Express on Vercel")); // Test route

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

export default server;