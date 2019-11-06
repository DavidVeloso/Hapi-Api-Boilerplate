'use strict'

const models = require('../models')

module.exports = {
  connectDb: async () => {
    console.log('--> Load Database')
    let dbConectRetries = 5
    while (dbConectRetries) {
      try {
        await models.sequelize.sync()
        break
      } catch (error) {
        dbConectRetries -= 1
        console.log('--> Error Connect DB: ', error)
        console.log(`Retries left: ${dbConectRetries}`)
        await new Promise((resolve, reject) => setTimeout(resolve, 5000))
      }
    }
  }
}
