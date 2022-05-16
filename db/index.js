const mongoDBConnection = require('./DBConnection');
const redisConnection = require('./redisConnection');
module.exports = async () => {
  await redisConnection();
  await mongoDBConnection();
};
