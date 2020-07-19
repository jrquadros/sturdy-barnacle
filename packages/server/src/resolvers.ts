// import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'

export const ResolverMap = {
  Query: {
    hello: (_: any, { name }: GQL.IHelloOnQueryArguments) => `Hello ${name || 'World'}`,
  },

  Mutation: {
    register: (_: any, {}: GQL.IRegisterOnMutationArguments) => {},
  },
}
