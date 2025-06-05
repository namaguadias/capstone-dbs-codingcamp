require('dotenv').config();
const Hapi = require('@hapi/hapi');
const hapiAuthJwt2 = require('hapi-auth-jwt2');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost',
    routes: {
      cors: {
        origin: ['*'],
        additionalHeaders: ['authorization', 'Authorization'],
        credentials: true,
        headers: ['Accept', 'Content-Type', 'Authorization']
      }
    }
  });

  await server.register(hapiAuthJwt2);

  server.auth.strategy('jwt', 'jwt', {
    key: process.env.JWT_SECRET,
    validate: async (decoded, request, h) => {
      return { isValid: true, credentials: decoded };
    },
    verifyOptions: { 
      algorithms: ['HS256'],
      ignoreExpiration: process.env.NODE_ENV === 'development'
    }
  });

  server.auth.default('jwt');

  server.route({
    method: 'OPTIONS',
    path: '/{any*}',
    handler: (request, h) => {
      return h.response().code(200);
    },
    options: {
      auth: false
    }
  });

  await server.register([
    require('./routes/auth'),
    require('./routes/diagnosis'),
    require('./routes/userInfo')
  ]);

  server.ext('onPreResponse', (request, h) => {
    const response = request.response;
    
    if (request.method === 'options') {
      return h.continue;
    }

    if (!response.isBoom) {
      return h.continue;
    }

    if (response.output.statusCode === 401) {
      return h.response({
        error: 'Unauthorized',
        message: 'Invalid or missing authentication token'
      }).code(401);
    }

    if (response.details) {
      return h.response({
        error: 'Validation error',
        details: response.details
      }).code(400);
    }

    return h.response({
      error: response.message || 'Internal server error'
    }).code(response.output.statusCode);
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
  return server;
};

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
  process.exit(1);
});

init();
