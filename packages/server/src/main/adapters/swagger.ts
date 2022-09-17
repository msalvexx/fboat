import { SwaggerOptions } from '@fastify/swagger'

import { EnvConfig } from '@/server/main/configs/env'

type ServerType = { host: string, port: string }
const { host, port }: ServerType = EnvConfig.getInstance().configs.server

export const swaggerConfig: SwaggerOptions = {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'F-Boat API',
      description: 'A Swagger API documentation of F-Boat API',
      version: '0.1.0'
    },
    host: `${host}:${port}`,
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      jwtToken: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header'
      }
    },
    tags: [
      { name: 'iam', description: 'API`s to manage access and identities' },
      { name: 'content-system', description: 'API`s to manage articles' }
    ]
  }
}
