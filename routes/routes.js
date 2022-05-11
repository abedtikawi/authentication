const { VALIDATOR_NAMES } = require('../common/index');
const authMiddleware = require('../middlewares/authentication');

const userControllers = {
  signup: {
    controller: require('../controllers/users/signup'),
    handler: authMiddleware(VALIDATOR_NAMES.SIGNUP),
  },
  signin: {
    controller: require('../controllers/users/signin'),
    handler: authMiddleware(VALIDATOR_NAMES.SIGNIN),
  },
};

module.exports = userControllers;
