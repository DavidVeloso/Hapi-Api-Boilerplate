'use strict'

const models = require('../../../models')
// const data = require('./mockData')

module.exports = { init }

function init () {
  console.log('--> Init Test Seed')
  return models.sequelize.sync({ force: true })
    .then()
    .then(finish => {
      console.log('--> Seed finished')
    })
    .catch(err => {
      console.log('Seed error: ', err)
    })
}
