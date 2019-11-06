'use strict'

const jwt = require('hapi-auth-jwt2')
const jsonWebToken = require('jsonwebtoken')
const models = require('../../models')
const jwtSecretKey = process.env.JWT_SECRET

async function validate (decoded, request) {
  try {
    const token = request.headers.authorization.replace('Bearer ', '')
    return jsonWebToken.verify(token, jwtSecretKey, async (err, decoded) => {
      if (err) { return { isValid: false } }
      const user = await models.User.findOne({ where: { id: decoded.id } })
      if (!user) { return { isValid: false } }
      if (user.active === false) { return { isValid: false } }
      return { isValid: true }
    })
  } catch (error) {
    return { isValid: false }
  }
}

module.exports = {
  register: async (server) => {
    await server.register(jwt)
    server.auth.strategy('jwt', 'jwt', {
      jwtSecretKey,
      validate,
      verifyOptions: { algorithms: ['HS256'] }
    })
    server.auth.default({
      strategy: 'jwt',
      scope: ['user', 'admin']
    })
  },
  name: 'auth-jwt',
  version: '1.0.0'
}
