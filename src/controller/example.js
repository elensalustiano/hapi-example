const joi = require('@hapi/joi')

const postExample = {
  method: 'POST',
  path: '/example',
  options: {
    tags: ['api'],
    description: 'POST method example',
    validate: {
      payload: joi.object({
        email: joi.string().max(100).required(),
        cpf: joi.string().max(11).required(),
        name: joi.string().max(100).required(),
        phone: joi.number(),
        password: joi.string().max(100).required()
      })
    }
  },
  handler: (request, h) => {
    return request.payload
  }
}

const getExample = {
  method: 'GET',
  path: '/test',
  options: {
    tags: ['api'],
    description: 'Used to test request lifecycle',
    notes: 'To access the route, make a request to GET /cookie/onRequest'
  },
  handler: (request, h) => {
    return 'GET /test'
  }
}

module.exports = [postExample, getExample]
