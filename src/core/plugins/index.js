'use strict'
const fs = require('fs')
const path = require('path')

module.exports = {
  registerPlugins: async (server) => {
    try {
      console.log('--> Load plugins')
      const basename = path.basename(module.filename) // index.js
      const pluginPromises = fs.readdirSync(__dirname).filter(file =>
        (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
        .map(file => {
          const plugin = require(path.join(__dirname, file))
          return server.register(plugin)
        })
      return await Promise.all(pluginPromises)
    } catch (err) {
      console.log('--> Error Load Plugins', err)
      throw err
    }
  }
}
