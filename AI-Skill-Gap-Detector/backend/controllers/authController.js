const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '30d'
  });
};

// In-memory user store fallback when MongoDB is offline
const inMemoryUsers = [];
const normaliseEmail = (email) => String(email || "").trim().toLowerCase();
const validEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const allowMemoryFallback = process.env.NODE_ENV !== "production";

exports.register = async (req, res) => {
  try {
    const { name, password } = req.body;
    const email = normaliseEmail(req.body.email);
    if (!name?.trim() || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    if (!validEmail(email) || password.length < 8) return res.status(400).json({ message: 'Use a valid email and a password with at least 8 characters.' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Try MongoDB
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const user = await User.create({
        name,
        email,
        password: hashedPassword
      });

      return res.status(201).json({
        token: generateToken(user._id),
        user: { id: user._id, name: user.name, email: user.email, role: user.role }
      });
    } catch (dbErr) {
      if (!allowMemoryFallback) return res.status(503).json({ message: "Account storage is temporarily unavailable." });
      // Fallback in-memory
      const existingMem = inMemoryUsers.find(u => u.email === email);
      if (existingMem) {
        return res.status(400).json({ message: 'User already exists' });
      }
      const memUser = { id: String(Date.now()), name, email, password: hashedPassword };
      inMemoryUsers.push(memUser);
      return res.status(201).json({
        token: generateToken(memUser.id),
        user: { id: memUser.id, name: memUser.name, email: memUser.email, role: "student" }
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const password = req.body.password;
    const email = normaliseEmail(req.body.email);
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    try {
      const user = await User.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        return res.json({
          token: generateToken(user._id),
          user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
      }
    } catch (dbErr) {
      // In-memory check
    }

    const memUser = inMemoryUsers.find(u => u.email === email);
    if (memUser && (await bcrypt.compare(password, memUser.password))) {
      return res.json({
        token: generateToken(memUser.id),
        user: { id: memUser.id, name: memUser.name, email: memUser.email, role: "student" }
      });
    }

    res.status(401).json({ message: 'Invalid email or password' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user?.id;
    try {
      const user = await User.findById(userId).select('-password');
      if (user) return res.json(user);
    } catch (dbErr) {
      // db fallback
    }

    const memUser = inMemoryUsers.find(u => u.id === userId);
    if (memUser) {
      return res.json({ id: memUser.id, name: memUser.name, email: memUser.email });
    }

    res.json({ id: userId || '1', name: 'Software Developer', email: 'dev@skillgap.ai' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
