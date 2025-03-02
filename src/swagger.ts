import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { connect } from "./common/helpers/logger.helper";
import { ERoles } from "./common/constants";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Profession API",
      version: "1.0.0",
      description: "API para gestionar profesionales y clientes",
    },
    components: {
      schemas: {
        login: {
          type: "object",
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string" },
          },
        },

        loginResponse: {
          type: "object",
          properties: {
            token: { type: "string" },
          },
        },

        CreateProfessionalDTO: {
          type: "object",
          properties: {
            userId: { type: "string" },
            name: { type: "string", minLength: 3 },
            email: { type: "string", format: "email" },
            phone: { type: "string" },
            category: { type: "string" },
            description: { type: "string" },
            isActive: { type: "boolean", default: true },
            pricePerQuote: { type: "number", default: 0 },
            image: { type: "string", nullable: true },
          },
        },
        UpdateProfessionalDTO: {
          type: "object",
          properties: {
            name: { type: "string", nullable: true, minLength: 3 },
            phone: { type: "string", nullable: true },
            category: { type: "string", nullable: true },
            description: { type: "string", nullable: true },
            isActive: { type: "boolean", nullable: true },
            pricePerQuote: { type: "number", nullable: true },
            image: { type: "string", nullable: true },
          },
        },
        ProfessionalResponse: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
            phone: { type: "string" },
            category: { type: "string" },
            description: { type: "string" },
            isActive: { type: "boolean" },
            pricePerQuote: { type: "number" },
            image: { type: "string", nullable: true },
          },
        },
        FindAllProfessionalsResponse: {
          type: "object",
          properties: {
            page: { type: "number" },
            total: { type: "number" },
            data: {
              type: "array",
              items: { $ref: "#/components/schemas/ProfessionalResponse" },
            },
          },
        },
        CreateUserDTO: {
          type: "object",
          properties: {
            name: {
              type: "string",
              minLength: 3,
              description:
                "El nombre del usuario (debe tener al menos 3 caracteres)",
            },
            lastName: {
              type: "string",
              minLength: 3,
              description:
                "El apellido del usuario (debe tener al menos 3 caracteres)",
            },
            email: {
              type: "string",
              format: "email",
              description: "El email del usuario (debe ser un email válido)",
            },
            password: {
              type: "string",
              description: "La contraseña del usuario",
            },
            role: {
              type: "string",
              enum: Object.values(ERoles),
              description:
                "El rol del usuario (debe ser 'client' o 'professional')",
            },
            phone: {
              type: "string",
              description: "El número de teléfono del usuario",
            },
            location: {
              type: "string",
              description: "La ubicación del usuario",
            },
          },
          required: [
            "name",
            "lastName",
            "email",
            "password",
            "role",
            "phone",
            "location",
          ],
        },

        FindUsersDTO: {
          type: "object",
          properties: {
            page: {
              type: "string",
              default: "1",
              description: "Número de página para la paginación",
            },
          },
        },

        UpdateUserDTO: {
          type: "object",
          properties: {
            name: {
              type: "string",
              minLength: 3,
              description:
                "El nombre del usuario (debe tener al menos 3 caracteres)",
            },
            lastName: {
              type: "string",
              minLength: 3,
              description:
                "El apellido del usuario (debe tener al menos 3 caracteres)",
            },
            email: {
              type: "string",
              format: "email",
              description: "El email del usuario (debe ser un email válido)",
            },
            phone: {
              type: "string",
              description: "El número de teléfono del usuario",
            },
            location: {
              type: "string",
              description: "La ubicación del usuario",
            },
          },
        },

        FindAllUsersResponse: {
          type: "object",
          properties: {
            page: {
              type: "number",
              description: "Número de página actual",
            },
            total: {
              type: "number",
              description: "Número total de usuarios",
            },
            data: {
              type: "array",
              items: {
                $ref: "#/components/schemas/UserResponse",
              },
              description: "Lista de usuarios",
            },
          },
        },

        UserResponse: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "ID del usuario",
            },
            name: {
              type: "string",
              description: "Nombre del usuario",
            },
            lastName: {
              type: "string",
              description: "Apellido del usuario",
            },
            email: {
              type: "string",
              format: "email",
              description: "Email del usuario",
            },
            role: {
              type: "string",
              enum: Object.values(ERoles),
              description: "Rol del usuario",
            },
            phone: {
              type: "string",
              description: "Teléfono del usuario",
            },
            location: {
              type: "string",
              description: "Ubicación del usuario",
            },
          },
        },
        CreateRoleDTO: {
          type: "object",
          properties: {
            type: {
              type: "string",
              enum: ["client", "professional", "admin"],
              description:
                "El tipo de rol ('client', 'professional' o 'admin')",
            },
            name: {
              type: "string",
              minLength: 3,
              description:
                "El nombre del rol (debe tener al menos 3 caracteres)",
            },
          },
          required: ["type", "name"],
        },

        UpdateRoleDTO: {
          type: "object",
          properties: {
            type: {
              type: "string",
              enum: Object.values(ERoles),
              description:
                "El tipo de rol ('client', 'professional' o 'admin')",
            },
            name: {
              type: "string",
              minLength: 3,
              description:
                "El nombre del rol (debe tener al menos 3 caracteres)",
            },
          },
        },

        RoleResponse: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "ID del rol",
              },
              type: {
                type: "string",
                enum: ["client", "professional", "admin"],
                description:
                  "El tipo de rol ('client', 'professional' o 'admin')",
              },
              name: {
                type: "string",
                description: "El nombre del rol",
              },
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/controllers/*controller.ts"], // Asegúrate de apuntar a los archivos correctos
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  connect(setupSwagger.name);
};
