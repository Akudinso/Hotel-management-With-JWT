import { Room } from '../models/room.model.js';

class RoomController {
  async createRoom(req, res) {
    try {
      const newRoom = await Room.create(req.body);
      res.status(201).json(newRoom);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllRooms(req, res) {
    try {
      const rooms = await Room.find();
      res.status(200).json(rooms);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getRoomById(req, res) {
    try {
      const room = await Room.findById(req.params.roomId);
      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }
      res.status(200).json(room);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateRoom(req, res) {
    try {
      const room = await Room.findByIdAndUpdate(req.params.roomId, req.body, { new: true });
      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }
      res.status(200).json(room);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteRoom(req, res) {
    try {
      const room = await Room.findByIdAndDelete(req.params.roomId);
      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }
      res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new RoomController();
