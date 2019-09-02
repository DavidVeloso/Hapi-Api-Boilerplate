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

// This function will return one shuffled copy from original array
exports.shuffleArray = (array) => {
  let sArray = array.slice(0)
  for (let i = sArray.length - 1; i > 0; i--) {
    const newPosition = Math.floor(Math.random() * (i + 1));
    [sArray[i], sArray[newPosition]] = [sArray[newPosition], sArray[i]]
  }
  return sArray
}

// Cria um objeto com os ids das perguntas e alternativas como chave
// para facilitar na busca das questões e alternativas
exports.questionArrayToObject = (questions) => {
  let questionsObj = {}
  questions.forEach(question => {
    questionsObj[question.id] = { enunciado: question.enunciado, alternativas: question.alternativas }
    // question.alternativas.forEach(alternativa => {
    //   questionsObj[question.id].alternativas[alternativa.id] = alternativa.alternativa
    // })
  })
  return questionsObj
}

// Retorna os minutos restantes de uma prova ou recurso
exports.getMinutesRemaing = (data) => {
  const dayjs = require('dayjs')
  const startTime = dayjs(data.startedTime)
  const spentTime = dayjs().diff(startTime, 'minutes')
  const difference = data.timeLimit - spentTime
  const minutesRemaing = (difference < 0) ? 0 : difference
  return minutesRemaing
}
