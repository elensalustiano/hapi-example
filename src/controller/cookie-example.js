const joi = require('@hapi/joi')

const cookieKey = 'username'

const setCookie = {
  method: 'GET',
  path: '/cookie/{name}',
  options: {
    tags: ['api'],
    description: 'Save username on cookie',
    notes: 'cookieKey: username',
    validate: {
      params: joi.object({
        name: joi.string().min(3).max(10)
      })
    }
  },
  handler: (request, h) => {
    const name = request.params.name
    h.state(cookieKey, name)

    return 'cookie saved'
  }
}

const getCookie = {
  method: 'GET',
  path: '/cookie',
  options: {
    tags: ['api'],
    description: 'Return the username saved on cookie'
  },
  handler: (request, h) => {
    return request.state[cookieKey]
  }
}

module.exports = [setCookie, getCookie]
