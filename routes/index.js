const router = require('express').Router();
const { signup, signin } = require('./routes');

router.route('/signup').post(signup.handler, signup.controller);

router.route('/signin').post(signin.handler,signin.controller);
module.exports = router;
