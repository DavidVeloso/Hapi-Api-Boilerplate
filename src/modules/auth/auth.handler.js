'use strict'

const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const models = require('../../models')
const Queue = require('../../core/lib/queueBull')

module.exports = {
  signup,
  login,
  requestRecoveryPassword,
  confirmRecoveryPassword
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

async function requestRecoveryPassword (request, reply) {
  try {
    const { email } = request.payload
    const user = await models.User.findOne({ where: { email } })

    if (!user) {
      return reply.notFound('User not found.')
    }

    const token = crypto.randomBytes(32).toString('hex')

    await user.update({
      recoveryPasswordToken: token,
      solRecoveryPasswordAt: new Date()
    })

    Queue.add('sendMail', {
      templateName: 'requestRecoveryPassword',
      sendMailTo: user.email,
      data: {
        nome: user.firstName,
        // Insert here your client url that will show the form to set the new password
        // ex.: http://yourdomain.com/recoverypassword?token=XXXXXX
        recoveryLink: `${process.env.CLIENT_HOST}/INSERT_CLIENT_ROUTE?token=${token}`
      }
    })

    return { message: 'OK' }
  } catch (error) {
    return reply.badImplementationCustom(error)
  }
}

async function confirmRecoveryPassword (request, reply) {
  try {
    const { newPassword, recoveryPasswordToken } = request.payload
    const user = await models.User.findOne({ where: { recoveryPasswordToken } })

    if (!user) {
      return reply.notFound('Recovery Token not found.')
    }

    await user.update({
      recoveryPasswordToken: null,
      solRecoveryPasswordAt: null,
      recoveryPasswordAt: new Date(),
      password: newPassword
    })

    return { message: 'OK' }
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
