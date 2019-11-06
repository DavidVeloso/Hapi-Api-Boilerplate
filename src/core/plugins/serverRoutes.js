'use strict'

// Register modules routes
module.exports = {
  register: async (server) => {
    try {
      await server.register({
        plugin: require('hapi-router'),
        options: { routes: 'src/modules/**/*routes.js' }
      }, { routes: { prefix: '/v1' } }) // add '/v1' before routes ex: api.x.com/v1/ROUTE_NAME
    } catch (error) {
      console.log('-> Error on Load Routes: ', error)
    }
  },
  name: 'server-routes',
  version: '1.0.0'
}
