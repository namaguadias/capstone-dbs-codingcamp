const Joi = require("joi");
const DiagnosisHistory = require("../models/DiagnosisHistory");
const diagnosisService = require("../utils/diagnosis");

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://127.0.0.1:5000";

module.exports = {
  name: "diagnosis-routes",
  register: async (server) => {
    server.route([
      {
        method: "POST",
        path: "/diagnosis",
        options: {
          auth: "jwt",
          validate: {
            payload: Joi.object({
              symptoms: Joi.array().items(Joi.string()).min(1).required(),
              diagnosis: Joi.string().required(),
              confidence: Joi.string().required(),
              recommendations: Joi.array().items(Joi.string()).optional(),
            }),
          },
        },
        handler: async (request, h) => {
          try {
            const diagnosisData = {
              ...request.payload,
              userId: request.auth.credentials.id,
            };

            const diagnosis = await DiagnosisHistory.create(diagnosisData);
            return diagnosis.toJSON();
          } catch (error) {
            console.error("Diagnosis creation error:", error);
            return h
              .response({ error: "Failed to create diagnosis" })
              .code(500);
          }
        },
      },
      {
        method: "GET",
        path: "/diagnosis/history",
        options: {
          auth: "jwt",
          validate: {
            query: Joi.object({
              limit: Joi.number().integer().min(1).max(100).default(10),
              offset: Joi.number().integer().min(0).default(0),
            }),
          },
        },
        handler: async (request, h) => {
          try {
            const { limit, offset } = request.query;
            const history = await DiagnosisHistory.findByUserId(
              request.auth.credentials.id,
              { limit, offset }
            );
            return history.map((item) => item.toJSON());
          } catch (error) {
            console.error("Diagnosis history fetch error:", error);
            return h
              .response({ error: "Failed to fetch diagnosis history" })
              .code(500);
          }
        },
      },
      {
        method: "GET",
        path: "/diagnosis/{id}",
        options: {
          auth: "jwt",
          validate: {
            params: Joi.object({
              id: Joi.string().uuid().required(),
            }),
          },
        },
        handler: async (request, h) => {
          try {
            const diagnosis = await DiagnosisHistory.findById(
              request.params.id
            );
            if (!diagnosis) {
              return h.response({ error: "Diagnosis not found" }).code(404);
            }

            if (diagnosis.userId !== request.auth.credentials.id) {
              return h.response({ error: "Unauthorized" }).code(403);
            }

            return diagnosis.toJSON();
          } catch (error) {
            console.error("Diagnosis fetch error:", error);
            return h.response({ error: "Failed to fetch diagnosis" }).code(500);
          }
        },
      },
      {
        method: "PUT",
        path: "/diagnosis/{id}",
        options: {
          auth: "jwt",
          validate: {
            params: Joi.object({
              id: Joi.string().uuid().required(),
            }),
            payload: Joi.object({
              symptoms: Joi.array().items(Joi.string()).min(1).optional(),
              diagnosis: Joi.string().optional(),
              confidence: Joi.string().optional(),
              recommendations: Joi.array().items(Joi.string()).optional(),
            }),
          },
        },
        handler: async (request, h) => {
          try {
            const diagnosis = await DiagnosisHistory.findById(
              request.params.id
            );
            if (!diagnosis) {
              return h.response({ error: "Diagnosis not found" }).code(404);
            }

            if (diagnosis.userId !== request.auth.credentials.id) {
              return h.response({ error: "Unauthorized" }).code(403);
            }

            const updated = await diagnosis.update(request.payload);
            return updated.toJSON();
          } catch (error) {
            console.error("Diagnosis update error:", error);
            return h
              .response({ error: "Failed to update diagnosis" })
              .code(500);
          }
        },
      },
      {
        method: "DELETE",
        path: "/diagnosis/{id}",
        options: {
          auth: "jwt",
          validate: {
            params: Joi.object({
              id: Joi.string().uuid().required(),
            }),
          },
        },
        handler: async (request, h) => {
          try {
            const diagnosis = await DiagnosisHistory.findById(
              request.params.id
            );
            if (!diagnosis) {
              return h.response({ error: "Diagnosis not found" }).code(404);
            }

            if (diagnosis.userId !== request.auth.credentials.id) {
              return h.response({ error: "Unauthorized" }).code(403);
            }

            await diagnosis.delete();
            return { message: "Diagnosis deleted successfully" };
          } catch (error) {
            console.error("Diagnosis deletion error:", error);
            return h
              .response({ error: "Failed to delete diagnosis" })
              .code(500);
          }
        },
      },
      {
        method: "POST",
        path: "/diagnose",
        options: {
          auth: "jwt",
          payload: {
            output: "stream",
            parse: true,
            multipart: true,
            maxBytes: 10 * 1024 * 1024,
            allow: "multipart/form-data",
          },
          handler: async (request, reply) => {
            try {
              const data = request.payload;
              if (!data.image || !data.image.hapi) {
                return reply
                  .response({
                    status: "error",
                    message: "No image file uploaded",
                  })
                  .code(400);
              }

              const buffer = await new Promise((resolve, reject) => {
                const chunks = [];
                data.image.on("data", (chunk) => chunks.push(chunk));
                data.image.on("end", () => resolve(Buffer.concat(chunks)));
                data.image.on("error", reject);
              });

              const result = await diagnosisService.diagnose(buffer);

              const diagnosisData = {
                userId: request.auth.credentials.id,
                symptoms: [result.arti],
                diagnosis: result.label,
                confidence: result.confidence.toString(),
                recommendations: [result.saran],
              };

              await DiagnosisHistory.create(diagnosisData);

              return {
                status: "success",
                data: {
                  arti: result.arti,
                  confidence: result.confidence,
                  label: result.label,
                  saran: result.saran,
                },
              };
            } catch (error) {
              console.error("Error in diagnosis route:", error);
              return reply
                .response({
                  status: "error",
                  message: "Internal server error during diagnosis",
                })
                .code(500);
            }
          },
        },
      },
    ]);
  },
};
