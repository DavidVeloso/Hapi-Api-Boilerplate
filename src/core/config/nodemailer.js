'use strict'

const {
  MAIL_HOST, MAIL_PORT, MAIL_USER,
  MAIL_PASS, MAIL_SENDER_NAME, MAIL_SENDER_EMAIL
} = process.env

// Exports Nodemailer config for each environment
module.exports = {
  development: {
    senderName: MAIL_SENDER_NAME,
    senderEmail: MAIL_SENDER_EMAIL,
    smtp: {
      host: MAIL_HOST,
      port: MAIL_PORT,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS
      }
    }
  },
  production: {
    senderName: MAIL_SENDER_NAME,
    senderEmail: MAIL_SENDER_EMAIL,
    smtp: {
      host: MAIL_HOST,
      port: MAIL_PORT,
      secure: true, // true for 465, false for other ports
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS
      }
    }
  }
}
