// libraries
const express = require('express');
// files
const connectDB = require('./db/DBConnection');
const indexRouter = require('./routes');

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', indexRouter);

module.exports = app;
