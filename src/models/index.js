'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

require('dotenv').config()

const sequelizeConfig = {
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  params: {
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
    logging: false,
    pool: {
      idle: 60000
    },
    define: {
      charset: 'utf8mb4',
      freezeTableName: true,
      paranoid: true,
      defaultScope: {
        attributes: { exclude: ['deletedAt'] }
      }
    }
  }
}

const sequelize = new Sequelize(
  sequelizeConfig.database,
  sequelizeConfig.user,
  sequelizeConfig.password,
  sequelizeConfig.params
)

let db = {}

const basename = path.basename(module.filename)

fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
