import { ResolverMap } from '../../../types/graphql-utils'
import { Todo } from '../../../entity/Todo'
import { User } from '../../../entity/User'
import * as yup from 'yup'

import { formatYupError } from '../../../utils/formatYupError'

const schema = yup.object().shape({
  author: yup.string().min(3).max(255),
  title: yup.string().min(3).max(255),
  description: yup.string().min(1).max(255),
})

export const resolvers: ResolverMap = {
  Mutation: {
    addTodo: async (_, args: GQL.IAddTodoOnMutationArguments) => {
      const { author, title, description } = args
      try {
        await schema.validate(args, { abortEarly: false })
      } catch (error) {
        return formatYupError(error)
      }

      const user = await User.findOne(author)

      if (!user) {
        return [
          {
            path: 'creeatedBy',
            message: 'User does not exist',
          },
        ]
      }

      const todo = await Todo.create({
        title,
        description: description || undefined,
        author: user,
      })

      await todo.save()
      return null
    },
  },
}
