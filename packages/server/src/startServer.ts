import { GraphQLServer } from 'graphql-yoga'
import { importSchema } from 'graphql-import'
import { join } from 'path'
import { createTypeOrmConnection } from './utils/createTypeormConnection'
import { config } from './config'

import * as fs from 'fs'
import { GraphQLSchema } from 'graphql'
import { mergeSchemas, makeExecutableSchema } from 'graphql-tools'

export const startServer = async () => {
  const folders = fs.readdirSync(join(__dirname, './modules'))

  const schemas: GraphQLSchema[] = []

  folders.map((folder) => {
    const { resolvers } = require(join(__dirname, `./modules/${folder}/resolvers`))
    const typedefs = importSchema(join(__dirname, `./modules/${folder}/schema.graphql`))
    schemas.push(makeExecutableSchema({ typeDefs: typedefs, resolvers }))
  })

  await createTypeOrmConnection()

  const schema: any = mergeSchemas({ schemas })

  const server = new GraphQLServer({ schema })

  const app = await server.start({ port: config.serverPort }).then(() => {
    console.log(`Server running at port ${config.serverPort}`)
  })

  return app
}
