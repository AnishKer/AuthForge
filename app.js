// Entry point for Express app
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

module.exports = app;
