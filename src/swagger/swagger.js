import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job API Documentation",
      version: "1.0.0",
      description: "API Documentation for authentication and job management",
      contact: {
        name: "Payal Yadav",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local Server",
      },
    ],
  },
  apis: ["./src/router/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerUi, swaggerDocs };
