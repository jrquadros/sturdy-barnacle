import { ResolverMap } from '../../../types/graphql-utils'
import { Todo } from '../../../entity/Todo'
import * as yup from 'yup'

import { formatYupError } from '../../../utils/formatYupError'

const schema = yup.object().shape({
  todoId: yup.string().min(8).max(255),
})

export const resolvers: ResolverMap = {
  Query: {
    todoDetails: async (_, args: GQL.ITodoDetailsOnQueryArguments) => {
      const { todoId } = args

      try {
        await schema.validate(args, { abortEarly: false })
      } catch (error) {
        return formatYupError(error)
      }

      const todo = await Todo.findOne(todoId)

      if (!todo) {
        return [
          {
            path: 'todoId',
            message: 'Todo does not exist',
          },
        ]
      }

      return todo
    },
  },
}
