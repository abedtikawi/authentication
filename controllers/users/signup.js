const logger = require('../../config/logger');
const fileName = __filename.split(/(\\|\/)/g).pop();

module.exports = async (req, res) => {
  try {
    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    logger.error(`${fileName}: Internal Server Error:${error.message}`);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
