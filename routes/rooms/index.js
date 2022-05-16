const router = require('express').Router();
const { createRoom } = require('./routes');
router.route('/create').post(createRoom.handler, createRoom.controller);

module.exports = router;
