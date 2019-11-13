'use strict'

const Joi = require('@hapi/joi')

const schema = {
  firstName: Joi.string().max(20),
  lastName: Joi.string().max(50),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  recoveryPasswordToken: Joi.string().hex()
}

const signup = Joi.object({
  firstName: schema.firstName.required(),
  lastName: schema.lastName.required(),
  email: schema.email.required(),
  password: schema.password.required()
})

const login = Joi.object({
  email: schema.email.required(),
  password: schema.password.required()
})

const requestRecoveryPassword = Joi.object({
  email: schema.email.required()
})

const confirmRecoveryPassword = Joi.object({
  newPassword: schema.password.required(),
  recoveryPasswordToken: schema.recoveryPasswordToken.required()
})

module.exports = {
  signup, login, requestRecoveryPassword, confirmRecoveryPassword
}
