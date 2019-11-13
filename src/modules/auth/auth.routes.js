'use strict'

const Handler = require('./auth.handler')
const Schema = require('./auth.schema')

module.exports = [
  {
    method: 'POST',
    path: '/auth/login',
    config: {
      description: 'User Login',
      tags: ['auth'],
      auth: false,
      handler: Handler.login,
      validate: {
        payload: Schema.login
      }
    }
  },
  {
    method: 'POST',
    path: '/auth/signup',
    config: {
      description: 'User Signup',
      tags: ['auth'],
      auth: false,
      handler: Handler.signup,
      validate: {
        payload: Schema.signup
      }
    }
  },
  {
    method: 'POST',
    path: '/auth/recovery/password',
    config: {
      description: `
        Request recovery password, sending an email with a link with a token
        where the client should handle this link, collect the new password and pass forward 
        to 'POST /auth/recovery/password/confirm' to set the new password.
      `,
      tags: ['auth'],
      auth: false,
      handler: Handler.requestRecoveryPassword,
      validate: {
        payload: Schema.requestRecoveryPassword
      }
    }
  },
  {
    method: 'POST',
    path: '/auth/recovery/password/confirm',
    config: {
      description: 'Set the new user password and confirm recovery.',
      tags: ['auth'],
      auth: false,
      handler: Handler.confirmRecoveryPassword,
      validate: {
        payload: Schema.confirmRecoveryPassword
      }
    }
  }
]
