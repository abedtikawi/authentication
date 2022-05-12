const signin = require('./types/signin');
const signup = require('./types/signup');
const locked = require('./types/accountLocked');

const { EMAIL_TYPES } = require('../../common/index');

module.exports = async (type, email) => {
  const { SIGNIN, SIGNUP, LOCKED } = EMAIL_TYPES;
  switch (type) {
    case SIGNIN:
      await signin(email);
      break;
    case SIGNUP:
      await signup(email);
      break;
    case LOCKED:
      await locked(email);
      break;

    default:
      break;
  }
};
