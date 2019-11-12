'use strict'

const fs = require('fs')
const files = fs.readdirSync(__dirname)
const templates = {}

files.forEach((file) => {
  if (!file.match(/.hbs/i)) return
  const name = file.replace(/.hbs/gi, '')
  templates[name] = fs.readFileSync(`${__dirname}/${file}`, 'utf8')
})

module.exports = templates
