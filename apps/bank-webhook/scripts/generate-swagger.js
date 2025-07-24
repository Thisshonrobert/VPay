const swaggerJSDoc = require('swagger-jsdoc');
const fs = require('fs');
const path = require('path');

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "VPay Bank Webhook API",
      version: "1.0.0",
      description: "API documentation for the bank webhook endpoint"
    }
  },
  apis: [path.join(__dirname, "../src/index.ts")], // Adjust if your file is elsewhere
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
fs.writeFileSync(path.join(__dirname, "../dist/swagger.json"), JSON.stringify(swaggerSpec, null, 2));
console.log("Swagger JSON generated at dist/swagger.json");