const mongoose = require('mongoose');
const { Boolean, ObjectId, String } = mongoose.SchemaTypes;

const RoomsSchema = mongoose.Schema(
  {
    userIds: [{ _id: { type: ObjectId, ref: 'Users' } }],
    isAvailable: { type: Boolean, default: true },
    roomName: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Rooms', RoomsSchema);
