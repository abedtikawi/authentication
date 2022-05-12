const nodemailer = require('nodemailer');
const logger = require('../../../config/logger');
const fileName = __filename.split(/(\\|\/)/g).pop();

module.exports = async (email) => {
  // dispatch email
  let transporter = nodemailer.createTransport({
    host: `${process.env.SMTP_HOST}`,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE == true ? true : false,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_EMAIL_PASSWORD,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail(
    {
      from: `Express Application <${process.env.SMTP_EMAIL}>`,
      to: `${email}`,
      subject: 'Account Locked!',
      text: 'Account has been locked for excessive unsuccessful retrials.',
      html:
        '<b>Account of email:' +
        email +
        ' has been locked for excessive unsuccessful retrials. (5/5) </b>',
    },
    (error, info) => {
      if (error) {
        return logger.error(error.message);
      }
      logger.info(
        `${fileName}: Message has been dispatched,:${info.messageId}`
      );
    }
  );
};
