// libraries
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
// files
const connectDB = require('./db/DBConnection');
const indexRouter = require('./routes');

const app = express();

//db connections
connectDB();

// security
app.use(helmet());
app.use(cors());
app.use(helmet.hidePoweredBy());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', indexRouter);

module.exports = app;
