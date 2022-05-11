const router = require('express').Router();
const usersRoutes = require('./routes');

router.route('/signup').get(usersRoutes.signup.controller);

module.exports = router;
