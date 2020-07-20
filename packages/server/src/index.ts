import 'reflect-metadata'
import { GraphQLServer } from 'graphql-yoga'
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { addResolversToSchema } from '@graphql-tools/schema'
import { join } from 'path'
import { resolvers } from './resolvers'
import { createTypeOrmConnection } from './utils/createTypeormConnection'

export const startServer = async () => {
  await createTypeOrmConnection()
  const typedefs = loadSchemaSync(join(__dirname, './schema.graphql'), {
    loaders: [new GraphQLFileLoader()],
  })

  const schemaWithResolvers = addResolversToSchema({ schema: typedefs, resolvers })
  const server = new GraphQLServer({ schema: schemaWithResolvers, resolvers })

  await server.start(() => console.log('Server is running on localhost:4000'))
}

startServer()
