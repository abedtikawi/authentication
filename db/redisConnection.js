const redis = require('redis');
const logger = require('../config/logger');
const fileName = __filename.split(/(\\|\/)/g).pop();

module.exports = async () => {
  let redisClient;
  try {
    logger.info(`${fileName}: Attempting to connect to Redis`);
    redisClient = await redis.createClient({
      host: `${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
      db: process.env.REDIS_DB_INDEX,
    });
    await redisClient.connect();
    const confirmPing = await redisClient.ping();
    if (confirmPing !== 'PONG') {
      logger.error(`${fileName}: Could not connect to Redis`);
    }
    logger.info(`${fileName}: Connected to Redis Successfully`);
  } catch (error) {
    logger.error(`${fileName}:Internal Server Error:${error.message}`);
    process.exit(1);
  }
};
