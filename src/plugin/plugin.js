module.exports = {
  name: 'myPlugin',
  version: '1.0.0',
  register: async (server, options) => {

    // Create a route for example

    server.route({
      method: 'GET',
      path: '/plugin',
      handler: (request, h) => {
        const name = options.name
        return `Hello ${name}, I am a plugin`
      }
    })
  }
}