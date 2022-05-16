const { VALIDATOR_NAMES } = require('../../common/index');
const handler = require('../../middlewares/authentication');

const userControllers = {
  signup: {
    controller: require('../../controllers/users/signup'),
    handler: handler(VALIDATOR_NAMES.SIGNUP),
  },
  signin: {
    controller: require('../../controllers/users/signin'),
    handler: handler(VALIDATOR_NAMES.SIGNIN),
  },
};

module.exports = userControllers;
