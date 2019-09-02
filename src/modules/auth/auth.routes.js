'use strict'

const Handler = require('./auth.handler')
const Schema = require('./auth.schema')

module.exports = [
  {
    method: 'POST',
    path: '/auth/login',
    config: {
      description: 'User Login',
      tags: ['api', 'auth'],
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
      tags: ['api', 'auth'],
      auth: false,
      handler: Handler.signup,
      validate: {
        payload: Schema.signup
      }
    }
  }
]
