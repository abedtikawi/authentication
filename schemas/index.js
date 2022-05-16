// index folder of exporting multiple handlers etc ..

const signup = require('./users/signupSchema');
const signin = require('./users/signinSchema');
const createRoom = require('./rooms/createRoomSchema');



module.exports = {
  signup,
  signin,
  createRoom,
};
