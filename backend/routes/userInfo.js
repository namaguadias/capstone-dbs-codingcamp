const Joi = require("joi");
const User = require("../models/User");

module.exports = {
  name: "user-info-routes",
  register: async (server) => {
    server.route([
      {
        method: "GET",
        path: "/user-info",
        options: {
          auth: "jwt",
        },
        handler: async (request, h) => {
          try {
            const user = await User.findById(request.auth.credentials.id);
            if (!user) {
              return h.response({ error: "User not found" }).code(404);
            }

            return user.toJSON();
          } catch (error) {
            console.error("User info fetch error:", error);
            return h.response({ error: "Failed to fetch user info" }).code(500);
          }
        },
      },
      {
        method: "PUT",
        path: "/user-info",
        options: {
          auth: "jwt",
          validate: {
            payload: Joi.object({
              nama: Joi.string().optional(),
              usia: Joi.number().integer().min(0).optional(),
              alamat: Joi.string().optional(),
              jenisKelamin: Joi.string().valid("L", "P").optional(),
            }).min(1),
          },
        },
        handler: async (request, h) => {
          try {
            const user = await User.findById(request.auth.credentials.id);
            if (!user) {
              return h.response({ error: "User not found" }).code(404);
            }

            const updated = await user.update(request.payload);
            return updated.toJSON();
          } catch (error) {
            console.error("User info update error:", error);
            return h
              .response({ error: "Failed to update user info" })
              .code(500);
          }
        },
      },
    ]);
  },
};
