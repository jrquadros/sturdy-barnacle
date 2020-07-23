import { GraphQLServer } from 'graphql-yoga'
import { createTypeOrmConnection } from './utils/createTypeormConnection'
import { config } from './config'
import { genSchema } from './utils/genSchema'
import 'dotenv/config'
export const startServer = async () => {
  await createTypeOrmConnection()

  const server = new GraphQLServer({ schema: genSchema() as any })

  const app = await server.start({ port: config.serverPort })

  console.log(`Server running at port ${config.serverPort}`)
  return app
}
