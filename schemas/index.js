// index folder of exporting multiple handlers etc ..

const signup = require('./users/signupSchema');
const signin = require('./users/signinSchema');

module.exports = {
  signup,
  signin,
};
