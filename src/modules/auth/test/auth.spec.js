/* global describe, it, expect, server, models */

const ENDPOINT_SIGNUP = '/v1/auth/signup'
const ENDPOINT_LOGIN = '/v1/auth/login'
const ENDPOINT_REQUEST_REC_PASS = '/v1/auth/recovery/password'
const ENDPOINT_CONFIRM_REC_PASS = '/v1/auth/recovery/password/confirm'

describe('#Auth', () => {
  describe(`POST ${ENDPOINT_SIGNUP}`, () => {
    it('create a new user', async () => {
      const response = await server.inject({
        method: 'POST',
        url: ENDPOINT_SIGNUP,
        payload: {
          firstName: 'User',
          lastName: 'Test',
          email: 'user@test.com',
          password: '123321abc'
        }
      })
      expect(response.statusCode).to.equals(200)
      expect(response.result).to.exist()
      expect(response.result.id).to.exist()
      expect(response.result.firstName).to.equals('User')
      expect(response.result.lastName).to.equals('Test')
      expect(response.result.email).to.equals('user@test.com')
      expect(response.result.active).to.equals(true)
      expect(response.result.role).to.equals('user')
    })

    it('email is already in use', async () => {
      const response = await server.inject({
        method: 'POST',
        url: ENDPOINT_SIGNUP,
        payload: {
          firstName: 'User',
          lastName: 'Test',
          email: 'user@test.com',
          password: '123321abc'
        }
      })
      expect(response.statusCode).to.equals(422)
      expect(response.result).to.exist()
      expect(response.result.message).to.equals('Email is already in use.')
    })

    it('missing required fields', async () => {
      const response = await server.inject({
        method: 'POST',
        url: ENDPOINT_SIGNUP,
        payload: { firstName: 'User', lastName: 'Test' }
      })
      expect(response.statusCode).to.equals(400)
    })
  })

  describe(`POST ${ENDPOINT_LOGIN}`, () => {
    it('do user login', async () => {
      const response = await server.inject({
        method: 'POST',
        url: ENDPOINT_LOGIN,
        payload: { email: 'user@test.com', password: '123321abc' }
      })
      expect(response.statusCode).to.equals(200)
      expect(response.result).to.exist()
      expect(response.result.accessToken).to.exist()
    })

    it('email not found', async () => {
      const response = await server.inject({
        method: 'POST',
        url: ENDPOINT_LOGIN,
        payload: { email: 'notfound@test.com', password: '123321abc' }
      })
      expect(response.statusCode).to.equals(401)
      expect(response.result.message).to.equals('Invalid credentials.')
    })

    it('invalid password', async () => {
      const response = await server.inject({
        method: 'POST',
        url: ENDPOINT_LOGIN,
        payload: { email: 'user@test.com', password: 'wrongpass' }
      })
      expect(response.statusCode).to.equals(401)
      expect(response.result.message).to.exist('Invalid credentials.')
    })
  })

  describe(`POST ${ENDPOINT_REQUEST_REC_PASS}`, () => {
    it('request recovery password', async () => {
      const response = await server.inject({
        method: 'POST',
        url: ENDPOINT_REQUEST_REC_PASS,
        payload: { email: 'user@test.com' }
      })
      expect(response.statusCode).to.equals(200)
    })

    it('email not found', async () => {
      const response = await server.inject({
        method: 'POST',
        url: ENDPOINT_REQUEST_REC_PASS,
        payload: { email: 'notfound@test.com' }
      })
      expect(response.statusCode).to.equals(404)
    })
  })

  describe(`POST ${ENDPOINT_CONFIRM_REC_PASS}`, () => {
    it('recovery token not found', async () => {
      const response = await server.inject({
        method: 'POST',
        url: ENDPOINT_CONFIRM_REC_PASS,
        payload: {
          newPassword: 'newpass',
          recoveryPasswordToken: 'ee035fa952e9c8c6'
        }
      })
      expect(response.statusCode).to.equals(404)
      expect(response.result.message).to.equals('Recovery Token not found.')
    })

    it('send a invalid token', async () => {
      const response = await server.inject({
        method: 'POST',
        url: ENDPOINT_CONFIRM_REC_PASS,
        payload: {
          newPassword: 'newpass',
          recoveryPasswordToken: 'invalid format'
        }
      })
      expect(response.statusCode).to.equals(400)
    })

    it('set new password and confirm recovery', async () => {
      const user = await models.User.findOne({ where: { email: 'user@test.com' } })
      const response = await server.inject({
        method: 'POST',
        url: ENDPOINT_CONFIRM_REC_PASS,
        payload: {
          newPassword: 'newpass',
          recoveryPasswordToken: user.recoveryPasswordToken
        }
      })
      expect(response.statusCode).to.equals(200)
    })

    it('login with new password', async () => {
      const response = await server.inject({
        method: 'POST',
        url: ENDPOINT_LOGIN,
        payload: { email: 'user@test.com', password: 'newpass' }
      })
      expect(response.statusCode).to.equals(200)
      expect(response.result).to.exist()
      expect(response.result.accessToken).to.exist()
    })
  })
})
