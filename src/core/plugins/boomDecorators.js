'use strict'

const Boom = require('@hapi/boom')

const boomFunctions = [
  'badRequest',
  'unauthorized',
  'paymentRequired',
  'forbidden',
  'notFound',
  'methodNotAllowed',
  'notAcceptable',
  'proxyAuthRequired',
  'clientTimeout',
  'conflict',
  'resourceGone',
  'lengthRequired',
  'preconditionFailed',
  'entityTooLarge',
  'uriTooLong',
  'unsupportedMediaType',
  'rangeNotSatisfiable',
  'expectationFailed',
  'badData',
  'preconditionRequired',
  'tooManyRequests',
  'badImplementation',
  'internal',
  'notImplemented',
  'badGateway',
  'serverUnavailable',
  'gatewayTimeout',
  'illegal',
  'teapot',
  'boomify',
  'failedDependency'
]

module.exports = {
  register: async (server, options) => {
    try {
      boomFunctions.forEach(boomFunction => {
        server.decorate('toolkit', boomFunction, function () {
          throw Boom[boomFunction].apply(Boom, arguments)
        })
      })
    } catch (error) {
      console.log('-> Error Boom Decorators plugins: ', error)
    }
  },
  name: 'boom-decorators',
  version: '1.0.0'
}
