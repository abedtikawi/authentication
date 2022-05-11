let express = require('express');
let indexRouter = require('./routes');
const connectDB = require('./db/DBConnection');

let app = express();
connectDB()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', indexRouter);

module.exports = app;
