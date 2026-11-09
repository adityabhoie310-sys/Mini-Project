const jwt = require('jsonwebtoken');
const User = require('../models/User');
const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalid' });
  }
};

const requireAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('role');
    if (!user || user.role !== 'admin') return res.status(403).json({ message: 'Administrator access is required.' });
    return next();
  } catch {
    return res.status(503).json({ message: 'Administrator verification is unavailable.' });
  }
};

module.exports = { protect, requireAdmin };
