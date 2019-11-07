'use strict'

module.exports = {
  getToken, getTokens
}

async function getTokens (server) {
  const options = {
    method: 'POST',
    url: '/v1/login',
    payload: {
      email: 'user2@mail.com',
      password: '123456'
    }
  }

  const userContext = await getToken(server)
  const adminContext = await getToken(server, 'admin')
  const user2Context = await server.inject(options)

  const response = {
    userToken: userContext.token,
    adminToken: adminContext.token,
    user2Token: user2Context.result.token
  }
  return response
}

async function getToken (server, role = 'user') {
  const payload = {
    email: 'user@mail.com',
    password: '123456'
  }

  if (role === 'admin') {
    payload.email = 'admin@mail.com'
  }

  const response = await server.inject({
    method: 'POST',
    url: '/v1/login',
    payload: payload
  })

  return response.result
}
