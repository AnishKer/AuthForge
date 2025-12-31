// Entry point for Express app
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();
connectDB();
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

module.exports = app;
