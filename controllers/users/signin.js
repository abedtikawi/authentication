const logger = require('../../config/logger');
const fileName = __filename.split(/(\\|\/)/g).pop();
const UsersSchema = require('../../models/users');
const bcrypt = require('bcrypt');
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
    // handle response of email rejection if email does not exist
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
    logger.info(`${fileName}: Comparing Passwords`);

    // compare hashed password with passed password
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
        });

        // dispatch email

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
        `${fileName}: Incrementing number of login attempts to :${currentAttempt} /5`
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
            `Wrong Credentials,Allowed trials:${currentAttempt} /5`
          )
        );
    }
    logger.info(`${fileName}: Successfull authentication`);
    // if passwords are the same , reset the login attempts back to 0
    if (_user.loginAttempts > 0) {
      logger.info(`${fileName}: Reseting login attempts to 0`);
      await UsersSchema.findByIdAndUpdate(_user._id, {
        $set: { loginAttempts: 0 },
      });
    }

    // dispatch email
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
