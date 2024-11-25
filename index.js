import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.routes.js';
import roomRouter from './routes/room.routes.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/users', userRouter);
app.use('/api/rooms', roomRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
