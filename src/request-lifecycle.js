module.exports = server => {
  server.ext('onRequest', (request, h) => {
    console.log('onRequest')
    if (request.path === '/cookie/onRequest') {
      request.setUrl('/test')
    }

    return h.continue
  })

  server.ext('onPreAuth', (request, h) => {
    console.log('onPreAuth')
    return h.continue
  })

  server.ext('onCredentials', (request, h) => {
    console.log('onCredentials')
    return h.continue
  })

  server.ext('onPostAuth', (request, h, error) => {
    console.log('onPostAuth')
    return h.continue
  })

  server.ext('onPreHandler', (request, h) => {
    console.log('onPreHandler')
    return h.continue
  })

  server.ext('onPostHandler', (request, h) => {
    console.log('onPostHandler')
    return h.continue
  })

  server.ext('onPreResponse', (request, h) => {
    console.log('onPreResponse')
    return h.continue
  })
}