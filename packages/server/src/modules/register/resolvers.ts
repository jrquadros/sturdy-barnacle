import * as bcrypt from 'bcryptjs'
import { ResolverMap } from '../../types/graphql-utils'
import { User } from '../../entity/User'
import * as yup from 'yup'
import { formatYupError } from '../../utils/formatYupError'

const schema = yup.object().shape({
  email: yup.string().min(3).max(255).email(),
  password: yup.string().min(3).max(255),
})

export const resolvers: ResolverMap = {
  Query: {
    hello: (_, { name }: GQL.IHelloOnQueryArguments) => `Bye ${name || 'World'}`,
  },
  Mutation: {
    register: async (_, args: GQL.IRegisterOnMutationArguments) => {
      const { email, password } = args

      try {
        await schema.validate(args, { abortEarly: false })
      } catch (error) {
        return formatYupError(error)
      }

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
