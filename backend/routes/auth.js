const Joi = require('joi');
const JWT = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
  name: 'auth-routes',
  register: async (server) => {
    server.route([
      {
        method: 'POST',
        path: '/auth/register',
        options: {
          auth: false,
          validate: {
            payload: Joi.object({
              nama: Joi.string().required(),
              usia: Joi.number().integer().min(0).required(),
              alamat: Joi.string().required(),
              jenisKelamin: Joi.string().valid('L', 'P').required(),
              email: Joi.string().email().required(),
              password: Joi.string().min(6).required()
            })
          }
        },
        handler: async (request, h) => {
          try {
            console.log('Register request payload:', request.payload);
            const { email, password, nama, usia, alamat, jenisKelamin } = request.payload;
            
            const existingUser = await User.findByEmail(email);
            if (existingUser) {
              return h.response({ error: 'Email already registered' }).code(400);
            }

            const user = await User.create({
              email,
              password,
              nama,
              usia,
              alamat,
              jenisKelamin
            });

            const token = JWT.sign(
              { id: user.id, email: user.email },
              process.env.JWT_SECRET,
              { expiresIn: '7d' }
            );

            return { token, user: user.toJSON() };
          } catch (error) {
            console.error('Registration error:', error);
            return h.response({ error: 'Registration failed' }).code(500);
          }
        }
      },
      {
        method: 'POST',
        path: '/auth/login',
        options: {
          auth: false,
          validate: {
            payload: Joi.object({
              email: Joi.string().email().required(),
              password: Joi.string().required()
            })
          }
        },
        handler: async (request, h) => {
          try {
            console.log('Login request payload:', request.payload);
            const { email, password } = request.payload;
            
            const user = await User.findByEmail(email);
            if (!user) {
              return h.response({ error: 'Invalid credentials' }).code(401);
            }

            const isValid = await user.verifyPassword(password);
            if (!isValid) {
              return h.response({ error: 'Invalid credentials' }).code(401);
            }

            const token = JWT.sign(
              { id: user.id, email: user.email },
              process.env.JWT_SECRET,
              { expiresIn: '7d' }
            );

            return { token, user: user.toJSON() };
          } catch (error) {
            console.error('Login error:', error);
            return h.response({ error: 'Login failed' }).code(500);
          }
        }
      },
      {
        method: 'GET',
        path: '/auth/me',
        options: {
          auth: 'jwt'
        },
        handler: async (request, h) => {
          try {
            const user = await User.findById(request.auth.credentials.id);
            if (!user) {
              return h.response({ error: 'User not found' }).code(404);
            }
            return user.toJSON();
          } catch (error) {
            console.error('Profile fetch error:', error);
            return h.response({ error: 'Failed to fetch profile' }).code(500);
          }
        }
      },
      {
        method: 'PUT',
        path: '/auth/profile',
        options: {
          auth: 'jwt',
          validate: {
            payload: Joi.object({
              nama: Joi.string().optional(),
              usia: Joi.number().integer().min(0).optional(),
              alamat: Joi.string().optional(),
              jenisKelamin: Joi.string().valid('L', 'P').optional(),
              password: Joi.string().min(6).optional()
            }).min(1)
          }
        },
        handler: async (request, h) => {
          try {
            const user = await User.findById(request.auth.credentials.id);
            if (!user) {
              return h.response({ error: 'User not found' }).code(404);
            }

            const updated = await user.update(request.payload);
            return updated.toJSON();
          } catch (error) {
            console.error('Profile update error:', error);
            return h.response({ error: 'Failed to update profile' }).code(500);
          }
        }
      }
    ]);
  }
};
