'use strict'

const { sendMail } = require('../lib/mail')

module.exports = {
  key: 'sendMail',
  options: {}, // Add your Queue options reference: https://github.com/OptimalBits/bull/blob/master/REFERENCE.md#queueadd
  async handle ({ data }) {
    await sendMail(data)
  }
}
