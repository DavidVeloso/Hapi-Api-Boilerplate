/* global describe, it, expect, server */

const ENDPOINT_SIGNUP = '/v1/auth/signup'
const ENDPOINT_LOGIN = '/v1/auth/login'

describe(`#Auth`, () => {
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
  })
})
