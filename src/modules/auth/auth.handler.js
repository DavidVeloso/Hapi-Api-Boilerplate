'use strict'

const jwt = require('jsonwebtoken')
const models = require('../../models')

module.exports = {
  signup,
  login
}

async function signup (request, reply) {
  try {
    const { email } = request.payload
    const existsEmail = await models.User.findOne({ where: { email } })

    if (existsEmail) {
      return reply.badData('Email is already in use.')
    }

    request.payload.active = true
    const user = await models.User.create(request.payload)

    return user.toJSON()
  } catch (error) {
    return reply.badImplementationCustom(error)
  }
}

async function login (request, reply) {
  try {
    const { email, password } = request.payload
    const user = await models.User.findOne({ where: { email } })

    if (!user) {
      return reply.unauthorized('Invalid credentials.')
    }

    if (!user.validatePassword(password)) {
      return reply.unauthorized('Invalid credentials.')
    }

    if (!user.active) {
      return reply.unauthorized('Your account isn\'t active.')
    }

    const accessToken = generateAccessToken(user)

    return { accessToken }
  } catch (error) {
    return reply.badImplementationCustom(error)
  }
}

function generateAccessToken (user) {
  const { JWT_SECRET } = process.env
  return jwt.sign({
    id: user.id,
    scope: [user.role]
  }, JWT_SECRET, { expiresIn: '2d' })
}
