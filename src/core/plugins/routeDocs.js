module.exports = {
  register: async (server) => {
    try {
      // Export routes docs only for prod env
      if (process.env.NODE_ENV !== 'production') {
        await server.register([
          require('@hapi/vision'),
          require('@hapi/inert'), { plugin: require('lout') }
        ])
      }
    } catch (error) {
      console.log('-> Error util plugins: ', error)
    }
  },
  name: 'route-docs',
  version: '1.0.0'
}
