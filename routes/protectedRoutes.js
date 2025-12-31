const express = require('express');
const router = express.Router();
const protect = require('../middleware/protect');
const roleGuard = require('../middleware/roleGuard');

// User profile (USER, ADMIN, MODERATOR)
router.get('/user/profile', protect, roleGuard(['USER', 'ADMIN', 'MODERATOR']), (req, res) => {
  res.json({ message: `Welcome ${req.user.username}, this is your profile.` });
});

// Admin dashboard (ADMIN only)
router.get('/admin/dashboard', protect, roleGuard(['ADMIN']), (req, res) => {
  res.json({ message: `Admin dashboard for ${req.user.username}` });
});

// SUPERADMIN only route
router.get('/superadmin/secret', protect, roleGuard(['SUPERADMIN']), (req, res) => {
  res.json({ message: `Superadmin secret area for ${req.user.username}` });
});

module.exports = router;
