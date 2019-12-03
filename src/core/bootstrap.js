'use strict'

const Server = require('./server')
const { registerPlugins } = require('./plugins')
const { connectDb } = require('./database')

module.exports = { start }

async function start () {
  const { NODE_ENV } = process.env
  const server = await Server.init()

  await registerPlugins(server)
  await loadRoutes(server)

  if (NODE_ENV === 'test') { return server }

  await connectDb()
  await server.start()

  server.log(['log'], `Server running at ${server.info.uri}`)
}

async function loadRoutes (server) {
  console.log('--> Load routes')
  await server.register({
    register: async (server) => {
      try {
        await server.register({
          plugin: require('hapi-router'),
          options: { routes: 'src/modules/**/*routes.js' }
        }, { routes: { prefix: '/v1' } }) // add '/v1' before routes ex: api.x.com/v1/ROUTE_NAME
      } catch (error) {
        console.log('--> Error on load routes: ', error)
      }
    },
    name: 'routes',
    version: '1.0.0'
  })
}
