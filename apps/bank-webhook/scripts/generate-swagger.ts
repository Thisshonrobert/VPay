import swaggerJSDoc from 'swagger-jsdoc';
import fs from 'fs';
import path from 'path';

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "VPay Bank Webhook API",
      version: "1.0.0",
      description: "API documentation for the bank webhook endpoint"
    }
  },
  apis: [path.join(__dirname, "../src/index.ts")],
};

const outputDir = path.join(__dirname, "../dist");
fs.mkdirSync(outputDir, { recursive: true });
const swaggerSpec = swaggerJSDoc(swaggerOptions);
fs.writeFileSync(path.join(__dirname, "../dist/swagger.json"), JSON.stringify(swaggerSpec, null, 2));
console.log("Swagger JSON generated at dist/swagger.json");