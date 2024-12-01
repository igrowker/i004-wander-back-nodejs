import express, { Express } from 'express'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpecs } from './config/swagger'
import { endpointHealth } from './controllers/test.controllers'

const app: Express = express()

import config from './config/index'
config(app)

import routes from './routes/index'
app.use('/api', routes)

app.use('/health', endpointHealth)

//Route for Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

import errorHandler from './errors/index'
errorHandler(app)

export default app