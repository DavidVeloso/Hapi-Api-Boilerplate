'use strict'

const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {

    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      unique: { msg: 'Email is already in use.' },
      allowNull: false,
      validate: {
        isEmail: true
      }
    },

    role: {
      type: DataTypes.STRING,
      defaultValue: 'user'
    },

    password: {
      type: DataTypes.STRING
    },

    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

    emailVerificationToken: {
      type: DataTypes.STRING
    },

    emailVerificationSendAt: {
      type: DataTypes.DATE
    },

    emailVerificationConfirmedAt: {
      type: DataTypes.DATE
    },

    recoveryPasswordToken: {
      type: DataTypes.STRING
    },

    solRecoveryPasswordAt: {
      type: DataTypes.DATE
    },

    recoveryPasswordAt: {
      type: DataTypes.DATE
    },

    tempEmailtoChange: {
      type: DataTypes.STRING,
      validate: { isEmail: true }
    },

    codeToChangeEmail: {
      type: DataTypes.INTEGER
    }

  }, {
    tableName: 'users',
    hooks: {
      beforeCreate: function (user) {
        if (user.password) {
          user.password = hashPassword(user.password)
        }
      },
      beforeUpdate: function (user) {
        if (user.changed('password')) {
          user.password = hashPassword(user.password)
        }
      }
    }
  })

  User.associate = (models) => {
    // model associations
  }

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.get('password'))
  }

  User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get())
    delete values.password
    delete values.emailVerificationToken
    delete values.emailVerificationSendAt
    delete values.emailVerificationConfirmedAt
    delete values.recoveryPasswordToken
    delete values.solRecoveryPasswordAt
    delete values.recoveryPasswordAt
    delete values.tempEmailtoChange
    delete values.codeToChangeEmail
    return values
  }

  return User
}

function hashPassword (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}
