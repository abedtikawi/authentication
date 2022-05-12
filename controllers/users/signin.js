/**
 * @api {post} /users/signin User Signin Endpoint
 * @apiName Signin
 * @apiGroup Users
 *
 * @apiBody {String} email User's unique email.
 * @apiBody {String} password User's password.
 * @apiDescription
 * If the user tries to sign in with the wrong credentials more than 5 times, their account will be locked.<br>
 * If a successful/locked attempt is triggered, an email is dispatched to the user's email.<br>
 * If a user has LOGIN_ATTEMPTS < 5 and successfully logs in, counter gets reset back to 0.<br>
 *
 * @apiSuccess {String} message Created.
 * @apiSuccess {String} data Successfull login for email:[email].
 */

const logger = require('../../config/logger');
const fileName = __filename.split(/(\\|\/)/g).pop();
const UsersSchema = require('../../models/users');
const bcrypt = require('bcrypt');
const emailSender = require('../../helpers/email/index');
const { EMAIL_TYPES } = require('../../common/index');
const {
  RESPONSE_MESSAGE,
  RESPONSE_CODES,
} = require('../../common/responses.index');

module.exports = async (req, res) => {
  const { OK, DB_ERROR, INTERNAL_SERVER_ERROR } = RESPONSE_CODES;

  try {
    // check if email exists
    logger.info(
      `${fileName}: Checking if email already exists:${req.body.email}`
    );
    const _user = await UsersSchema.findOne({ email: req.body.email });
    if (!_user) {
      logger.warn(`${fileName}: Email: ${req.body.email} does not exist`);
      return res
        .status(DB_ERROR.code)
        .json(
          RESPONSE_MESSAGE(
            DB_ERROR.code,
            `Email: ${req.body.email} does not exist`
          )
        );
    }

    // if email is locked , handle response
    if (_user.isLocked) {
      logger.warn(
        `${fileName}: Email: ${req.body.email} has been locked for exceeding wrong attempts number`
      );
      return res
        .status(DB_ERROR.code)
        .json(
          RESPONSE_MESSAGE(
            DB_ERROR.code,
            `Email: ${req.body.email} has been locked for exceeding wrong attempts number`
          )
        );
    }

    // compare hashed password with passed password
    logger.info(`${fileName}: Comparing Passwords`);
    const comparePasswords = await bcrypt.compare(
      req.body.password,
      _user.password
    );

    // if passwords are not the same , check if current attempt is == 5th attempt
    if (!comparePasswords) {
      logger.warn(`${fileName}: Passwords are not the same`);
      const currentAttempt = _user.loginAttempts + 1;
      logger.warn(
        `${fileName}: Wrong Attempt to login for email :${req.body.email}`
      );

      if (currentAttempt === 5) {
        // if true , lock account
        logger.warn(`${fileName}: Locking email`);
        await UsersSchema.findByIdAndUpdate(_user._id, {
          $set: { isLocked: true },
          $inc: { loginAttempts: 1 },
        });

        // dispatch email
        await emailSender(EMAIL_TYPES.LOCKED, req.body.email);

        // handle response
        return res
          .status(DB_ERROR.code)
          .json(
            RESPONSE_MESSAGE(
              DB_ERROR.code,
              `Account of email: ${req.body.email} has been locked`
            )
          );
      }

      logger.info(
        `${fileName}: Incrementing number of login attempts to : ${currentAttempt}/5`
      );
      await UsersSchema.findByIdAndUpdate(_user._id, {
        $inc: { loginAttempts: 1 },
      });

      // handle response
      return res
        .status(DB_ERROR.code)
        .json(
          RESPONSE_MESSAGE(
            DB_ERROR.code,
            `Wrong Credentials,Allowed trials: ${currentAttempt}/5`
          )
        );
    }

    // if passwords are the same , reset the login attempts back to 0
    logger.info(`${fileName}: Successfull authentication`);
    if (_user.loginAttempts > 0) {
      logger.info(`${fileName}: Reseting login attempts to 0`);
      await UsersSchema.findByIdAndUpdate(_user._id, {
        $set: { loginAttempts: 0 },
      });
    }

    // dispatch email

    await emailSender(EMAIL_TYPES.SIGNIN, req.body.email);

    // handle response
    return res
      .status(OK.code)
      .json(
        RESPONSE_MESSAGE(
          OK.code,
          `Successfully login for email:${req.body.email}`
        )
      );
  } catch (error) {
    logger.error(`${fileName}: Internal Server Error:${error.message}`);

    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(RESPONSE_MESSAGE(INTERNAL_SERVER_ERROR.code));
  }
};
