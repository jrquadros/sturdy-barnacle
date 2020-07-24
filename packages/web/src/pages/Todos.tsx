import React from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router-dom'
import { graphql, QueryRenderer } from 'react-relay'
import { Environment } from '../relay'
import { Center } from '../components/Center'
import { TodoDetails } from '../components/TodoDetails'
import { Todos_Query } from './__generated__/Todos_Query.graphql'

type Props = {
  todoId: string
  query: Todos_Query
} & RouteComponentProps<{ userid: string }>

const Wrapper = styled.div`
  padding: 0 20%;
  margin: auto;
`

export const Todos = ({ match }: Props) => (
  <QueryRenderer
    // @ts-ignore
    environment={Environment}
    query={graphql`
      query Todos_Query($author: ID!) {
        todos(author: $author) {
          id
          title
          description
          done
        }
      }
    `}
    variables={{ author: match.params.userid }}
    render={({ error, props }) => {
      if (error) {
        return <h1>error while fetching todos</h1>
      }

      if (!props) {
        return (
          <Center>
            <h1>Loading...</h1>
          </Center>
        )
      }
      return (
        <Wrapper>
          {props.todos.map((todo: any) => (
            <TodoDetails
              title={todo.title}
              description={todo.description}
              id={todo.id}
              key={todo.id}
              done={todo.done}
            />
          ))}
        </Wrapper>
      )
    }}
  />
)
