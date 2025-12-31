const { verifyToken } = require('../utils/tokenHelpers');

module.exports = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ message: 'No access token provided.' });
  }
  const payload = verifyToken(token, process.env.JWT_SECRET);
  if (!payload) {
    return res.status(401).json({ message: 'Invalid or expired access token.' });
  }
  req.user = payload;
  next();
};
