'use strict'

const Queue = require('bull')
const path = require('path')

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'
const envPath = path.resolve(`${__dirname}/../../../${envFile}`)

require('dotenv').config({ path: envPath })

const redisConfig = require('../config/redis')
const queueJobs = require('../jobs')

const queues = Object.values(queueJobs).map(job => ({
  bull: new Queue(job.key, { redis: redisConfig }),
  name: job.key,
  handle: job.handle,
  options: job.options
}))

module.exports = {
  queues,
  add (name, data) {
    const queue = this.queues.find(queue => queue.name === name)
    return queue.bull.add(data, queue.options)
  },
  process () {
    return this.queues.forEach(queue => {
      queue.bull.process(queue.handle)
      queue.bull.on('failed', (job, err) => {
        console.log('Job failed: ', {
          key: queue.name,
          data: job.data,
          errror: err
        })
      })
    })
  }
}
