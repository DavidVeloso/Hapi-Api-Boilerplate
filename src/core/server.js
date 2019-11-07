'use strict'

const Hapi = require('@hapi/hapi')
const path = require('path')
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'
const envPath = path.resolve(`${__dirname}/../../${envFile}`)

require('dotenv').config({ path: envPath })

const { SERVER_HOST, SERVER_PORT, ALLOWED_DOMAINS } = process.env

const init = async () => {
  const server = await new Hapi.Server({
    host: SERVER_HOST,
    port: SERVER_PORT,
    routes: {
      cors: {
        credentials: true,
        origin: ALLOWED_DOMAINS.split(',')
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
  // Catch Joi Errors and send a custom response
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
