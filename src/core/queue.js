'use strict'

const Queue = require('./lib/queueBull')

// Start Queue Service
try {
  const { REDIS_HOST, REDIS_PORT } = process.env
  Queue.process()
  console.log(`Queue Service Runing on ${REDIS_HOST}:${REDIS_PORT}`)
} catch (error) {
  console.log('Error on start queue: ', error)
}
