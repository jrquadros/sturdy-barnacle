import { ResolverMap } from '../../../types/graphql-utils'
import { User } from '../../../entity/User'
import * as yup from 'yup'

import { formatYupError } from '../../../utils/formatYupError'

const schema = yup.object().shape({
  userId: yup.string().min(8).max(255),
})

export const resolvers: ResolverMap = {
  Query: {
    todos: async (_, args: GQL.IMeOnQueryArguments) => {
      const { userId } = args

      try {
        await schema.validate(args, { abortEarly: false })
      } catch (error) {
        return formatYupError(error)
      }

      const user = await User.findOne(userId)

      if (!user) {
        return [
          {
            path: 'author',
            message: 'User does not exist',
          },
        ]
      }

      return user
    },
  },
}
