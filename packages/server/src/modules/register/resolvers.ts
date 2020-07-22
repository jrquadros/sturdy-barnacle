import { ResolverMap } from '../../types/graphql-utils'
import { User } from '../../entity/User'
import * as yup from 'yup'
import { formatYupError } from '../../utils/formatYupError'

const schema = yup.object().shape({
  email: yup.string().min(3).max(255).email(),
  name: yup.string().min(3).max(255),
})

export const resolvers: ResolverMap = {
  Query: {
    hello: (_, { name }: GQL.IHelloOnQueryArguments) => `Bye ${name || 'World'}`,
  },
  Mutation: {
    register: async (_, args: GQL.IRegisterOnMutationArguments) => {
      const { email, name } = args

      try {
        await schema.validate(args, { abortEarly: false })
      } catch (error) {
        return formatYupError(error)
      }

      // const hashedPassword = await bcrypt.hash(password, 10)

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
        name,
      })
      await user.save()
      return null
    },
  },
}
