import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

// Authentication middleware to verify JWT token
export const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'yourSecretKey');
    req.user = decoded; // Attach user data to request object
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// Authorization middleware to check user role
export const authorize = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ error: 'Access forbidden, insufficient privileges' });
  }
  next();
};
