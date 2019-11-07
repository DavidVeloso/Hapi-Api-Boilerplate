'use strict'

const { DATABASE_URL, DATABASE_HOST } = process.env

// Exports Sequelize config for each environment
module.exports = {
  development: {
    databaseUrl: DATABASE_URL,
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
    databaseUrl: DATABASE_URL,
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
