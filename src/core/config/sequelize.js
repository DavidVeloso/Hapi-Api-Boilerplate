'use strict'

const {
  DATABASE_NAME, DATABASE_USER,
  DATABASE_PASSWORD, DATABASE_HOST
} = process.env

// Exports Sequelize config for each environment
module.exports = {
  development: {
    database: DATABASE_NAME,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    params: {
      host: DATABASE_HOST,
      dialect: 'postgres',
      logging: false,
      pool: { idle: 60000 },
      define: {
        charset: 'utf8mb4',
        freezeTableName: true,
        paranoid: true,
        defaultScope: {
          attributes: { exclude: ['deletedAt'] }
        }
      }
    }
  },
  test: {
    database: DATABASE_NAME,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    params: {
      dialect: 'sqlite',
      storage: './databaseTest.sqlite3',
      logging: false,
      define: {
        charset: 'utf8mb4',
        paranoid: true
      }
    }
  }
}
