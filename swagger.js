const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API AppPremium',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:8000',
      description: 'server api',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerSpec, swaggerUi };