import mongoose from 'mongoose';

// Mongoose Schema for Room Model
const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  roomType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RoomType', // Assuming you have a RoomType model that defines different types of rooms (e.g., Single, Double)
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Mongoose Model for Room
const Room = mongoose.model('Room', roomSchema);

// Room schema for validation (optional, you can add Joi validation if needed)
export { Room };
