'use strict'

const Server = require('./server')
const { registerPlugins } = require('./plugins')
const { connectDb } = require('./database')

module.exports = { start }

async function start () {
  const server = await Server.init()
  await registerPlugins(server)

  if (process.env.NODE_ENV === 'test') {
    const seedTest = require('../../data/test/seed')
    await seedTest.init()
    return server
  }

  await connectDb()
  await server.start()
  console.log('--> All Rigth!')
  server.log(['log'], `Server running at ${server.info.uri}`)
}
