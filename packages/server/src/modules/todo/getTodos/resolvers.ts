import { ResolverMap } from '../../../types/graphql-utils'
import { Todo } from '../../../entity/Todo'
import { User } from '../../../entity/User'
import * as yup from 'yup'

import { formatYupError } from '../../../utils/formatYupError'

const schema = yup.object().shape({
  author: yup.string().min(8).max(255),
})

export const resolvers: ResolverMap = {
  Query: {
    todos: async (_, args: GQL.ITodosOnQueryArguments) => {
      const { author } = args

      try {
        await schema.validate(args, { abortEarly: false })
      } catch (error) {
        return formatYupError(error)
      }

      const user = await User.findOne(author)

      if (!user) {
        return [
          {
            path: 'author',
            message: 'User does not exist',
          },
        ]
      }

      const todos = await Todo.find({ where: { author } })
      return todos
    },
  },
}
