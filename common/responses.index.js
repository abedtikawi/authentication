// Create Specific Codes for frontend
const RESPONSE_CODES = {
  OK: {
    code: 200,
  },
  CREATED: {
    code: 201,
  },
  BAD_REQUEST: {
    code: 400,
  },
  VALIDATION_ERROR: {
    code: 403,
  },
  NOT_FOUND: {
    code: 404,
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
  },
  DB_ERROR: {
    code: 406,
  },
};

// Create Specific & dynamic response messages depending on response codes, this will be helpful for frontend integrations
const RESPONSE_MESSAGE = (code, data) => {
  const {
    OK,
    CREATED,
    BAD_REQUEST,
    NOT_FOUND,
    INTERNAL_SERVER_ERROR,
    DB_ERROR,
    VALIDATION_ERROR,
  } = RESPONSE_CODES;

  switch (code) {
    case OK.code:
      return {
        message: 'OK',
        data: data || '',
      };

    case CREATED.code:
      return {
        message: 'Created',
        data,
      };

    case BAD_REQUEST.code:
      return {
        message: 'Bad Request',
        data: 'Please check URL',
      };

    case NOT_FOUND.code:
      return {
        message: 'OK',
        data,
      };

    case INTERNAL_SERVER_ERROR.code:
      return {
        message: 'Internal Server Error',
      };

    case DB_ERROR.code:
      return {
        message: 'Error Occured while processing your request',
        data: data,
      };
    case VALIDATION_ERROR.code:
      return {
        message: 'Error Occured while Validating your request',
        data: data,
      };

    default:
      break;
  }
};
module.exports = {
  RESPONSE_CODES,
  RESPONSE_MESSAGE,
};
