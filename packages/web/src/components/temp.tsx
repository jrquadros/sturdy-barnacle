// import * as React from 'react'
// import { graphql, createFragmentContainer, QueryRenderer } from 'react-relay'
// // import { createQueryRendererModern } from '../relay'
// import { Environment } from '../relay'
// import { RouteComponentProps } from 'react-router-dom'

// import { TodoDetails_query } from './__generated__/TodoDetails_query.graphql'

// type TodoDetailsProps = {
//   query: TodoDetails_query
//   errors: []
//   id: string
// }

// type Props = {
//   todoId: string
// } & RouteComponentProps<{ id: string }>

// const TodoDetailsFragment = ({ query }: TodoDetailsProps) => {
//   // const { todoDetails } = query
//   // if (!todoDetails) {
//   //   return <h1>loading...</h1>
//   // }
//   // TODO add errors field on schema.graphql (server)
//   // return <div>{todoDetails.title}</div>

//   return (
//     <QueryRenderer
//       // @ts-ignore
//       environment={Environment}
//       variables={{ todoId: '36421d52-ab5f-4ea6-9237-18059aa6a1e0asdfasdf' }}
//       query={graphql`
//         fragment TodoDetails_query on Query {
//           todoDetails(todoId: $todoId)
//         }
//       `}
//       render={({ error, props }) => {
//         if (error) {
//           return <h1>error</h1>
//         }
//         if (!props) {
//           return <h1>loading</h1>
//         }

//         return <div>{props.todo}</div>
//       }}
//     />
//   )
// }

// export const TodoDetails = () => {}

// // const TodoDetailsFragmentContainer = createFragmentContainer(TodoDetails, {
// //   query: graphql`
// //     fragment TodoDetails_query on Query {
// //       todoDetails(todoId: $todoId) {
// //         id
// //         title
// //       }
// //     }
// //   `,
// // })

// // export default createQueryRendererModern(TodoDetailsFragmentContainer, TodoDetails, {
// //   variables: { todoId: this.window.location.search },
// //   query: graphql`
// //     query TodoDetailsQuery($todoId: ID!) {
// //       ...TodoDetails_query
// //     }
// //   `,
// // })
