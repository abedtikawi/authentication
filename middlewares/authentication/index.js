const Joi = require('joi');
const logger = require('../../config/logger');
const Validators = require('../../schemas');
const fileName = __filename.split(/(\\|\/)/g).pop();
const {
  RESPONSE_CODES,
  RESPONSE_MESSAGE,
} = require('../../common/responses.index');
module.exports = (VALIDATOR_NAME) => {
  if (!Validators.hasOwnProperty(VALIDATOR_NAME)) {
    // this will happen only if the property of VALIDATOR_NAME is passed as a literal and not from the commons index folder
    logger.warn(`${fileName}: ${VALIDATOR_NAME} does not exist`);
    throw new Error(`${VALIDATOR_NAME} does not exist`);
  }
  return async (req, res, next) => {
    try {
      logger.info(`${fileName}: Attempting to validate :${VALIDATOR_NAME}`);
      const validation = await Validators[VALIDATOR_NAME].validateAsync(
        req.body
      );

      logger.info(`${fileName}: Validated Body schema for :${VALIDATOR_NAME}`);
      // save the body request that has been processed in the req.body

      req.body = validation;
      next();
    } catch (error) {
      const { VALIDATION_ERROR } = RESPONSE_CODES;

      // handle joi validation error
      if (error.isJoi) {
        logger.warn(`${fileName}: Failed Validation Error:${error.message}`);
        return res
          .status(VALIDATION_ERROR.code)
          .json(RESPONSE_MESSAGE(VALIDATION_ERROR.code, error.message));
      }

      //handle internal server error
      logger.error(`${fileName}: Internal Server Error:${error.message}`);
      return;
    }
  };
};
