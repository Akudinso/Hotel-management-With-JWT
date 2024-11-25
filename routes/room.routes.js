import express from 'express';
import RoomController from '../controllers/room.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';

const roomRouter = express.Router();

// Only admin can create, update, and delete rooms
roomRouter.post('/', authenticate, authorize('admin'), RoomController.createRoom);
roomRouter.get('/', RoomController.getAllRooms);
roomRouter.get('/:roomId', RoomController.getRoomById);
roomRouter.put('/:roomId', authenticate, authorize('admin'), RoomController.updateRoom);
roomRouter.delete('/:roomId', authenticate, authorize('admin'), RoomController.deleteRoom);

export default roomRouter;
