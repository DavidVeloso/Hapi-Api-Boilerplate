'use strict'

require('dotenv').config()

module.exports = {
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  params: {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT || 'postgres',
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
