import { ResolverMap } from '../../../types/graphql-utils'
import { Todo } from '../../../entity/Todo'
import { getManager } from 'typeorm'
import * as yup from 'yup'
import { formatYupError } from '../../../utils/formatYupError'

const schema = yup.object().shape({
  todo: yup.string().min(8).max(255),
})

export const resolvers: ResolverMap = {
  Mutation: {
    markAsDone: async (_, args: GQL.IMarkAsDoneOnMutationArguments) => {
      const { todoId } = args
      try {
        await schema.validate(args, { abortEarly: false })
      } catch (error) {
        return formatYupError(error)
      }

      const todoRepository = await getManager().getRepository(Todo)

      if (!todoRepository) {
        return [
          {
            path: 'todoId',
            message: 'Todo does not exist',
          },
        ]
      }

      await todoRepository.update({ id: todoId }, { done: true })

      return null
    },
  },
}
