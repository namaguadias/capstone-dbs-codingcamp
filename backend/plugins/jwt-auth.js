const JWT = require('jsonwebtoken');

module.exports = {
  name: 'jwt-auth',
  version: '1.0.0',
  register: async function (server) {
    await server.register(require('hapi-auth-jwt2'));

    server.auth.strategy('jwt', 'jwt', {
      key: process.env.JWT_SECRET,
      validate: async (decoded, request, h) => {
        return { isValid: true };
      },
      verifyOptions: { algorithms: ['HS256'] },
    });

    server.auth.default('jwt');
  },
};
