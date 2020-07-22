import * as bcrypt from 'bcryptjs'
import { ResolverMap } from '../../types/graphql-utils'
import { User } from '../../entity/User'

export const resolvers: ResolverMap = {
  Query: {
    hello: (_, { name }: GQL.IHelloOnQueryArguments) => `Bye ${name || 'World'}`,
  },
  Mutation: {
    register: async (_, { email, password }: GQL.IRegisterOnMutationArguments) => {
      const hashedPassword = await bcrypt.hash(password, 10)

      const userAlreadyExistis = await User.findOne({
        where: {
          email,
        },
        select: ['id'],
      })

      if (userAlreadyExistis) {
        return [
          {
            path: 'email',
            message: 'Already taken',
          },
        ]
      }

      const user = User.create({
        email,
        password: hashedPassword,
      })
      await user.save()
      return null
    },
  },
}
