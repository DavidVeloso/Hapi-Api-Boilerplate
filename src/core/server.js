'use strict'

const Hapi = require('@hapi/hapi')
require('dotenv').config()

const init = async () => {
  const server = await new Hapi.Server({
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT,
    routes: {
      cors: {
        credentials: true,
        origin: process.env.ALLOWED_DOMAINS.split(',')
      },
      validate: {
        options: {
          abortEarly: false
        },
        failAction: handleError
      }
    }
  })
  return server
}

function handleError (request, h, err) {
  if (err.isJoi && Array.isArray(err.details) && err.details.length > 0) {
    const joiError = {
      type: 'Joi',
      headers: {
        origin: request.headers.origin,
        'user-agent': request.headers['user-agent'],
        'content-type': request.headers['content-type'],
        referer: request.headers.referer,
        authorization: request.headers.authorization
      },
      data: request.orig,
      auth: request.auth.credentials,
      err: err.details
    }

    if (process.env.NODE_ENV !== 'test') {
      console.error('joiError: ', joiError)
    }

    return h.joiLogErrorCustom(joiError)
      .takeover()
  }

  return h.response(err)
    .takeover()
}

module.exports = { init }
