import React, { useState } from 'react'
import { useHistory, RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import { Center } from '../components/Center'
import { Button } from '../components/Button'
import { Separator } from '../components/Separator'
import * as yup from 'yup'
import { Environment } from '../relay'
import { commitMutation, graphql } from 'react-relay'
import {
  AddTodoMutationResponse,
  AddTodoMutationVariables,
} from './__generated__/AddTodoMutation.graphql'

type Props = {
  userId: string
} & RouteComponentProps<{ userid: string }>

const mutation = graphql`
  mutation AddTodoMutation($title: String!, $author: ID!, $description: String) {
    addTodo(title: $title, author: $author, description: $description) {
      path
      message
    }
  }
`

const commit = (
  input: AddTodoMutationVariables,
  onConpleted: (response?: AddTodoMutationResponse) => void,
  onError: (error?: Error) => void
) => {
  const variables = input
  console.log(variables)

  return commitMutation(Environment, {
    mutation,
    variables,
    onConpleted,
    onError,
  })
}

const schema = yup.object().shape({
  title: yup.string().min(3).max(255),
  author: yup.string().min(3).max(255),
  description: yup.string().min(3).max(255),
})

const Input = styled.input`
  padding: 10px;
  border: 0;
  background-color: #f1f1f1;
  width: 20rem;
`

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const LoginButton = styled(Button)`
  width: 21.2rem;
  margin: 2px;
  font-size: 0.8rem;
`

const ErrorMessage = styled.span`
  font-size: 0.6rem;
  color: tomato;
  margin: 3px;
`
export const AddTodo = ({ match }: Props) => {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [error, setError] = useState<Error | null | undefined>(null)

  const history = useHistory()

  const handleAddButtonClick = async () => {
    try {
      await schema.validate({ title, description }, { abortEarly: false })
      const author = match.params.userid
      commit(
        { title, description, author },
        () => {
          history.replace('/')
        },
        () => {
          console.log('fail')
        }
      )
    } catch (err) {
      setError(err.message)
    }
  }

  const handleTitleInputChange = async (value: string) => {
    setTitle(value)
  }
  const handleDescriptionInputChange = async (value: string) => {
    setDescription(value)
  }

  return (
    <Center>
      <FormContainer>
        <Input
          type="text"
          placeholder="title"
          onChange={(e) => handleTitleInputChange(e.target.value)}
        />
        <Separator size={5} />
        <Input
          type="text"
          placeholder="Description"
          onChange={(e) => handleDescriptionInputChange(e.target.value)}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Separator size={10} />
        <LoginButton onClick={handleAddButtonClick}>Registrar</LoginButton>
        <Separator size={8} />
      </FormContainer>
    </Center>
  )
}
