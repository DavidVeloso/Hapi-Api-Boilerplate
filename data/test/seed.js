'use strict'

const models = require('../../src/models')
// const data = require('./data')

module.exports = { init }

function init () {
  console.log('--> Init Seed')
  return models.sequelize.sync({ force: true })
    .then()
    .then(finish => {
      console.log('--> Seed finished')
    })
    .catch(err => {
      console.log('Seed error: ', err)
    })
}
