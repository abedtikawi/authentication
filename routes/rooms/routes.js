const validator = require('../../middlewares/authentication/index');
const { VALIDATOR_NAMES } = require('../../common/index');
const roomsControllers = {
  createRoom: {
    controller: require('../../controllers/rooms/createRoom'),
    // policy: '',
    handler: validator(VALIDATOR_NAMES.CREATEROOM),
  },
};
module.exports = roomsControllers;
