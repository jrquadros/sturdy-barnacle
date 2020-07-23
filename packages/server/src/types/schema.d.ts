// tslint:disable
// graphql typescript definitions

declare namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation
    errors?: Array<IGraphQLResponseError>
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string
    locations?: Array<IGraphQLResponseErrorLocation>
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any
  }

  interface IGraphQLResponseErrorLocation {
    line: number
    column: number
  }

  interface IError {
    __typename: 'Error'
    path: string
    message: string
  }

  interface ITodo {
    __typename: 'Todo'
    id: string
    title: string
    description: string | null
    done: boolean | null
    createdBy: IUser
    createdAt: string
  }

  interface IUser {
    __typename: 'User'
    id: string
    name: string
    email: string
    todos: Array<ITodo | null> | null
  }

  interface IMutation {
    __typename: 'Mutation'
    addTodo: Array<IError> | null
    markAsDone: Array<IError> | null
    register: Array<IError> | null
  }

  interface IAddTodoOnMutationArguments {
    title: string
    description?: string | null
    author: string
  }

  interface IMarkAsDoneOnMutationArguments {
    todoId: string
  }

  interface IRegisterOnMutationArguments {
    email: string
    name: string
  }

  interface IQuery {
    __typename: 'Query'
    todos: Array<ITodo | null>
    todoDetails: ITodo | null
    me: IUser | null
    hello: string
  }

  interface ITodosOnQueryArguments {
    author: string
  }

  interface ITodoDetailsOnQueryArguments {
    todoId: string
  }

  interface IMeOnQueryArguments {
    userId: string
  }

  interface IHelloOnQueryArguments {
    name?: string | null
  }
}

// tslint:enable
