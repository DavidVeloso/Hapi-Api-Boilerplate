'use strict'

const Server = require('./server')
const { registerPlugins } = require('./plugins')
const { connectDb } = require('./database')

module.exports = { start }

async function start () {
  const { NODE_ENV } = process.env
  const server = await Server.init()
  await registerPlugins(server)
  if (NODE_ENV === 'test') { return server }
  await connectDb()
  await server.start()
  server.log(['log'], `Server running at ${server.info.uri}`)
}
