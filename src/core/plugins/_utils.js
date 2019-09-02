module.exports = {
  register: async (server) => {
    try {
      await server.register({
        plugin: require('hapi-boom-decorators')
      })

      if (process.env.NODE_ENV !== 'production') {
        await server.register([
          require('@hapi/vision'),
          require('@hapi/inert'), { plugin: require('lout') }
        ])
      }
    } catch (error) {
      console.log('erro no utils: ', error)
    }
  },
  name: 'utils',
  version: '1.0.0'
}
