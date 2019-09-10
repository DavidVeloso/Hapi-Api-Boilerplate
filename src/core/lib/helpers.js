const Joi = require('@hapi/joi')

exports.regex = {
  uuidv4: /([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/
}

exports.Joi = {
  validate: {
    uuidv4: Joi.string().regex(exports.regex.uuidv4),
    pagination: {
      response: Joi.object({
        total: Joi.number().integer(),
        skip: Joi.number().integer(),
        limit: Joi.number().integer(),
        items: Joi.array().items(Joi.object())
      }),
      query: Joi.object({
        skip: Joi.number().integer().default(0),
        limit: Joi.number().integer().min(1).max(100).default(50)
      })
    },
    findOne: {
      id: Joi.string().regex(exports.regex.uuidv4)
    }
  }
}
