import swaggerJSDoc from 'swagger-jsdoc';
import fs from 'fs';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Express TypeScript API',
            version: '1.0.0',
            description: 'API documentation using Swagger',
        },
        servers: [
            {
                url: 'http://localhost:5005',
                description: 'Development server',
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
    basePath: '/api'
}

export const swaggerSpecs = swaggerJSDoc(options);

// Export swagger specs to file
fs.writeFileSync('swagger.json', JSON.stringify(swaggerSpecs, null, 2));