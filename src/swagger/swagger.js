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
        url: "https://job-lac-ten.vercel.app",
        description: "Production Server",
      },
    ],
  },
  apis: ["./src/router/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerUi, swaggerDocs };
