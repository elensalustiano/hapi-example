const hapi = require('@hapi/hapi')
const inert = require('@hapi/inert')
const vision = require('@hapi/vision')
const hapiSwagger = require('hapi-swagger')
const myPlugin = require('./plugin/plugin')
const hapiAuth = require('@hapi/basic')

const exampleRoutes = require('./controller/example')
const cookieRoutes = require('./controller/cookie-example')
const authRoutes = require('./controller/auth-example')
const requestLifecycle = require('./request-lifecycle')

const users = {
  elen: {
    username: 'elen',
    password: '123',
    name: 'Elen Doe',
    id: '2133d32a'
  }
}

const validate = async (request, username, password) => {
  const invalidObject = { credentials: null, isValid: false }
  const user = users[username]

  if (!user) {
    return invalidObject
  }

  const isValid = user.password === password
  const validObject = {
    credentials: {
      id: user.id, name: user.name
    },
    isValid: true
  }

  return isValid ? validObject : invalidObject
}

const init = async () => {
  try {
    const server = hapi.server({
      port: 3000,
      host: 'localhost'
    })

    /*
      Config cookie
    */
    server.state('username', {
      isSecure: false
    })

    /*
      Load plugins
      if you need options, pass an
      object { plugin, options }, else
      just the plugin's name
     */
    await server.register([
      inert,
      vision,
      hapiAuth,
      {
        plugin: hapiSwagger,
        options: {
          info: {
            title: 'API Example',
            version: 'v1.0'
          }
        }
      },
      {
        plugin: myPlugin,
        options: {
          name: 'Elen'
        }
      }
    ])

    requestLifecycle(server)

    server.auth.strategy('simple', 'basic', { validate })

    server.route([
      ...exampleRoutes,
      ...cookieRoutes,
      ...authRoutes
    ])

    await server.start()
    console.log('Server running on ', server.info.uri)
  } catch (error) {
    console.log('error: ', error)
  }
}

init()