// libraries
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

// files
const indexRouter = require('./routes/users/index');
const roomsRouter = require('./routes/rooms/index');
const connections = require('./db/index');

const app = express();

//db index file for multiple db connections
connections();

// security
app.use(helmet());
app.use(cors());
app.use(helmet.hidePoweredBy());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', indexRouter);
app.use('/rooms', roomsRouter);

module.exports = app;
