'use strict'

const Server = require('./server')
const models = require('../models')
const path = require('path')
const Promise = require('bluebird')
const fs = require('fs')

module.exports = { start }

async function start () {
  try {
    const server = await Server.init()

    await loadPlugins(server)
    await loadRoutes(server)

    if (process.env.NODE_ENV === 'test') {
      const seedTest = require('../../data/test/seed')
      await seedTest.init()
      return server
    }

    console.log('--> Load database')
    let retries = 5
    while (retries) {
      try {
        await models.sequelize.sync()
        await server.start()
        console.log('--> All Rigth!')
        server.log(['log'], `Server running at ${server.info.uri}`)
        break
      } catch (error) {
        retries -= 1
        console.log('--> Error DB: ', error)
        console.log(`Retries left: ${retries}`)
        await new Promise(res => setTimeout(res, 5000)) // eslint-disable-line
      }
    }
  } catch (error) {
    // throw error
  }
}

async function loadPlugins (server) {
  console.log('--> Load plugins')
  try {
    const dir = path.join(__dirname, '/plugins')
    const plugins = fs.readdirSync(dir).filter(file => (file.indexOf('.') !== 0) && (file.slice(-3) === '.js'))
    const pluginPromises = plugins.map((pluginName) => {
      const plugin = require(path.join(dir, pluginName))
      return server.register(plugin)
    })
    return await Promise.all(pluginPromises)
  } catch (err) {
    console.log('--> Error load core plugins', err)
    throw err
  }
}

async function loadRoutes (server) {
  console.log('--> Load routes')
  await server.register({
    register: async (server) => {
      try {
        await server.register({
          plugin: require('hapi-router'),
          options: { routes: 'src/modules/**/*routes.js' }
        }, { routes: { prefix: '/v1' } })
      } catch (error) {
        console.log('--> Erro load routes: ', error)
      }
    },
    name: 'routes',
    version: '1.0.0'
  })
}
