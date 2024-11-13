import swaggerJSDoc from 'swagger-jsdoc';

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

export const swaggerSpecs = swaggerJSDoc(options)