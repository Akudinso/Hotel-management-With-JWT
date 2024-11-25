import Joi from 'joi'; // For validation
import mongoose from 'mongoose'; // For MongoDB schema
import bcrypt from 'bcryptjs'; // For password hashing

// Mongoose Schema (for the database)
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['guest', 'admin'], default: 'guest' },
});

// Hash the password before saving to DB
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

// Mongoose Model (for interacting with the database)
const User = mongoose.model('User', userSchema);

// Joi Schema (for input validation)
export const registerSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('guest', 'admin').required(),
});

export const loginSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
});

export { User };
