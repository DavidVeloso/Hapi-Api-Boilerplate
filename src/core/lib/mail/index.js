'use strict'

const nodemailer = require('nodemailer')
const handlebars = require('handlebars')

const env = process.env.NODE_ENV || 'development'
const mailConfig = require('../../config/nodemailer')[env]
const mailSubject = require('./mailSubject')
const templatesMail = require('./templates')

// Important: we use 'templateName' as key to handlebars file
// and mail subject. avoid duplicate names.
exports.sendMail = (options) => {
  try {
    if (env === 'test') return

    const { data, sendMailTo, templateName } = options
    const hbsTemplate = templatesMail[templateName]

    if (!sendMailTo) {
      throw new Error('Email is required')
    }

    if (!hbsTemplate) {
      throw new Error('Template not found')
    }

    const compileHbs = handlebars.compile(hbsTemplate)
    const html = compileHbs(data)
    const transporter = nodemailer.createTransport(mailConfig.smtp)

    transporter.sendMail({
      to: sendMailTo,
      from: `${mailConfig.senderName} <${mailConfig.senderEmail}>`,
      subject: mailSubject[templateName],
      html
    })
  } catch (error) {
    console.log('SendMail Error: ', error)
  }
}
