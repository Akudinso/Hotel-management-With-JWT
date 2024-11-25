import { Room } from '../models/room.model.js';

class RoomService {
  async createRoom(data) {
    return await Room.create(data);
  }

  async getAllRooms(query) {
    const filters = {};
    if (query.search) {
      filters.name = { $regex: query.search, $options: 'i' };
    }
    if (query.roomType) {
      filters.roomType = query.roomType;
    }
    if (query.minPrice || query.maxPrice) {
      filters.price = {
        $gte: query.minPrice || 0,
        $lte: query.maxPrice || Infinity,
      };
    }
    return await Room.find(filters).populate('roomType');
  }

  async getRoomById(roomId) {
    return await Room.findById(roomId).populate('roomType');
  }

  async updateRoom(roomId, data) {
    return await Room.findByIdAndUpdate(roomId, data, { new: true });
  }

  async deleteRoom(roomId) {
    return await Room.findByIdAndDelete(roomId);
  }
}

export default new RoomService();
