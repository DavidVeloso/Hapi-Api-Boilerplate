'use strict'

const Good = require('@hapi/good')

module.exports = {
  register: async (server) => {
    try {
      const options = {
        ops: { interval: 100000 },
        includes: { request: ['headers', 'payload'], response: ['payload'] },
        reporters: {
          console: [
            {
              module: '@hapi/good-squeeze',
              name: 'Squeeze',
              args: [{ response: { exclude: 'nolog' }, log: '*' }] // keep health checks from appearing in logs
            },
            { module: '@hapi/good-console' },
            'stdout'
          ],
          file: [{
            module: '@hapi/good-squeeze',
            name: 'Squeeze',
            args: [{ error: '*', log: '*', request: '*' }]
          }, {
            module: '@hapi/good-squeeze',
            name: 'SafeJson',
            args: [{ seperator: '\n' }]
          },
          {
            module: 'rotating-file-stream',
            args: ['server.log', { path: './logs', size: '10M' }]
          }]
        }
      }

      const register = await server.register({
        plugin: Good,
        options: process.env.NODE_ENV === 'test' ? {} : options
      })

      return register
    } catch (error) {
      console.log('Erro on logs plugin: ', error)
    }
  },
  name: 'server-log',
  version: '1.0.0'
}
