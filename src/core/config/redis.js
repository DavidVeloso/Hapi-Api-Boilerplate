'use strict'

const { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } = process.env

module.exports = {
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PASSWORD
}
