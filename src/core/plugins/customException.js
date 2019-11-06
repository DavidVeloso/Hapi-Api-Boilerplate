'use strict'

const Boom = require('@hapi/boom')

module.exports = {
  register: async (server) => {
    const badImplementationCustom = function (err) {
      if (!err) {
        throw Boom.badImplementation('method not implemented')
      }

      if (err.isBoom) return err

      if (!err.name) {
        throw Boom.badRequest(err)
      }

      switch (err.name) {
        case 'AttributesInvalidError':
          throw Boom.badData('fields invalid header')
        case 'SequelizeForeignKeyConstraintError':
          throw Boom.badData('foreign key constraint error')
        case 'SequelizeUniqueConstraintError':
          throw Boom.badData('unique constraint error')
        case 'SequelizeExclusionConstraintError':
          throw Boom.badData('exclusion constraint error')
        default:
          throw Boom.badImplementation(err.message)
      }
    }

    const joiLogErrorCustom = function (joiError) {
      if (!joiError) {
        throw Boom.badImplementation('Something wrong..')
      }
      const messages = []
      joiError.err.forEach(e => {
        const message = `${e.path[0]}: ${e.message}`
        if (!messages.includes(message)) {
          messages.push(message)
        }
      })

      server.log(['log'], joiError)
      throw Boom.badRequest(messages)
    }

    await server.decorate('toolkit', 'badImplementationCustom', badImplementationCustom)
    await server.decorate('toolkit', 'joiLogErrorCustom', joiLogErrorCustom)
  },
  name: 'hapi-exception-custom',
  version: '1.0.0'
}
