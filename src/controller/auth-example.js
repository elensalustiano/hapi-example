const authExample = {
  method: 'GET',
  path: '/auth',
  options: {
    auth: 'simple',
    tags: ['api'],
    description: 'Used to test auth',
    notes: 'user: elen / password: 123'
  },
  handler: (request, h) => {
    return request.auth
  }
}

module.exports = [authExample]
