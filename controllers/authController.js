const User = require('../models/User');
const bcrypt = require('bcrypt');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} = require('../utils/tokenHelpers');

// Signup
const signup = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required.' });
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists.' });
    }
    const user = new User({ username, password, role });
    await user.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed.', error: err.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save();
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60 * 1000,
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ message: 'Login successful.' });
  } catch (err) {
    res.status(500).json({ message: 'Login failed.', error: err.message });
  }
};

// Logout
const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(400).json({ message: 'No refresh token found.' });
    }
    const payload = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (!payload) {
      return res.status(400).json({ message: 'Invalid refresh token.' });
    }
    const user = await User.findById(payload.id);
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Logout failed.', error: err.message });
  }
};

module.exports = {
  signup,
  login,
  logout,
};
