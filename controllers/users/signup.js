/**
 * @api {post} /users/signup User Signup Endpoint
 * @apiName Signup
 * @apiGroup Users
 *
 * @apiBody {String} email User's unique email.
 * @apiBody {String} password User's password.
 * @apiBody {String} name User's first name.
 * @apiBody {String} surname User's surname.
 * @apiDescription 
 * All emails are unique.<br>
 * If a successfull signup is triggered, an email is dispatched to the user's email.<br>
 *
 *
 * @apiSuccess {String} message Created.
 * @apiSuccess {Object} data MongoDB User Object
 */

const logger = require('../../config/logger');
const fileName = __filename.split(/(\\|\/)/g).pop();
const UsersSchema = require('../../models/users');
const bcrypt = require('bcrypt');
const {
  RESPONSE_MESSAGE,
  RESPONSE_CODES,
} = require('../../common/responses.index');
const { EMAIL_TYPES } = require('../../common/index');
const emailSender = require('../../helpers/email/index');

module.exports = async (req, res) => {
  const { CREATED, DB_ERROR, INTERNAL_SERVER_ERROR } = RESPONSE_CODES;
  try {
    // check if email exists
    logger.info(
      `${fileName}: Querying db to check if email: ${req.body.email} exists`
    );
    const _user = await UsersSchema.findOne({ email: req.body.email });

    // handle email if already exists
    if (_user) {
      logger.warn(`Email: ${req.body.email} already exists`);
      return res
        .status(DB_ERROR.code)
        .json(
          RESPONSE_MESSAGE(
            DB_ERROR.code,
            `Email: ${req.body.email} already exists`
          )
        );
    }
    // generate salt && encrypt password
    logger.info(`${fileName}: Generating salt`);
    const salt = await bcrypt.genSalt(10);

    logger.info(`${fileName}: Encrypting password`);
    const encryptedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user with the encrypted password
    logger.info(
      `${fileName}: Attempting to create new user with email:${req.body.email}`
    );
    const createUser = await UsersSchema.create({
      ...req.body,
      password: encryptedPassword,
    });

    logger.info(
      `Successfully created User:${req.body.email} && returning Result`
    );
    // dispatch email

    await emailSender(EMAIL_TYPES.SIGNUP, req.body.email);

    return res
      .status(CREATED.code)
      .json(RESPONSE_MESSAGE(CREATED.code, createUser));
  } catch (error) {
    logger.error(`${fileName}: Internal Server Error:${error.message}`);

    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(RESPONSE_MESSAGE(INTERNAL_SERVER_ERROR.code));
  }
};
