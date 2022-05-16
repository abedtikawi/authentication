const logger = require('../../config/logger');
const fileName = __filename.split(/(\\|\/)/g).pop();
const UsersSchema = require('../../models/users');
const RoomsSchema = require('../../models/rooms');
const bcrypt = require('bcrypt');
const emailSender = require('../../helpers/email/index');
const { EMAIL_TYPES } = require('../../common/index');
const {
  RESPONSE_MESSAGE,
  RESPONSE_CODES,
} = require('../../common/responses.index');

module.exports = async (req, res) => {
  const { OK, INTERNAL_SERVER_ERROR } = RESPONSE_CODES;
  try {
    // const userId = req.user.id || 1;

    // const checkUser = await UsersSchema.findById(userId);

    // if (checkUser.isAvailable === false) {
    //   logger.warn(`User:${userId} is not available to continue`);
    //   return;
    // }
    const roomName = req.body.roomName;
    const checkRoom = await RoomsSchema.findOne({ roomName });
    if (checkRoom) {
      logger.warn(
        `${fileName}: Room:${roomName} already exists, please change room name`
      );
      return;
    }
    const userIds = [{ _id: '627d32cd3f420620c2a442eb' }];
    const createRoom = await RoomsSchema.create({
      roomName: req.body.roomName,
      userIds,
    });

    return res.status(OK.code).json(RESPONSE_MESSAGE(OK, createRoom));
  } catch (error) {
    logger.error(`Internal Server Error:${error.message}`);
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(RESPONSE_MESSAGE(INTERNAL_SERVER_ERROR.code));
  }
};
