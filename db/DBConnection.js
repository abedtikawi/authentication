const mongoose = require('mongoose');
const logger = require('../config/logger');
const db = process.env.MONGO_URL;
const fileName = __filename.split(/(\\|\/)/g).pop();

// connect to mongoDB 
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    logger.info(`${fileName}: Connected to Database`);
  } catch (err) {
    if (err.name === 'MongoNetworkError' || err.code === 'ECONNREFUSED') {
      return logger.error(`${fileName}: No internet on server`);
    }

    mongoose.connection.on('error', function (err) {
      logger.error(`${fileName}: Failed to connect to DB on startup:${err}`);
    });

    // handle When the connection is disconnected
    mongoose.connection.on('disconnected', function () {
      logger.error(
        `${fileName}: Mongoose default connection to DB disconnected`
      );
    });
    logger.error(`${fileName}: Connection Error: ${err}`);
    // terminate process
    process.exit(1);
  }
};
module.exports = connectDB;
