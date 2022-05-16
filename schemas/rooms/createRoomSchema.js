const Joi = require('joi');

const createRoom = Joi.object({
  roomName: Joi.string().min(4).required(),
});

module.exports = createRoom;
