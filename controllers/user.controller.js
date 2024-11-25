import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken'; // For JWT token generation

class UserController {
  // Register a new user
  async register(req, res) {
    const { username, password, role } = req.body;

    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: 'Username already taken' });
      }

      const newUser = new User({ username, password, role });
      await newUser.save();
      
      const token = jwt.sign({ id: newUser._id, role: newUser.role }, 'yourSecretKey', { expiresIn: '1h' });

      res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Login an existing user
  async login(req, res) {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid password' });
      }

      const token = jwt.sign({ id: user._id, role: user.role }, 'yourSecretKey', { expiresIn: '1h' });

      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new UserController();
