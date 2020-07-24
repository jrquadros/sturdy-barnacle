import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Center } from '../components/Center'
import { Button } from '../components/Button'
import { Separator } from '../components/Separator'
import * as yup from 'yup'
import { Environment } from '../relay'
import { commitMutation, graphql } from 'react-relay'
import {
  RegisterMutationVariables,
  RegisterMutationResponse,
} from './__generated__/RegisterMutation.graphql'

const mutation = graphql`
  mutation RegisterMutation($email: String!, $name: String!) {
    register(email: $email, name: $name) {
      path
      message
    }
  }
`

const commit = (
  input: RegisterMutationVariables,
  onConpleted: (response?: RegisterMutationResponse) => void,
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

const schema = yup
  .object()
  .shape({ email: yup.string().email(), name: yup.string().min(3).max(255) })

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
export const Register = () => {
  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [error, setError] = useState<Error | null | undefined>(null)

  const history = useHistory()

  const handleRegisterButtonClick = async () => {
    try {
      await schema.validate({ email, name }, { abortEarly: false })
      console.log({ email, name })
      commit(
        { email, name },
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

  const handleEmailInputChange = async (value: string) => {
    setEmail(value)
  }
  const handleNameInputChange = async (value: string) => {
    setName(value)
  }

  return (
    <Center>
      <FormContainer>
        <Input
          type="email"
          placeholder="Email"
          onChange={(e) => handleEmailInputChange(e.target.value)}
        />
        <Separator size={5} />
        <Input
          type="text"
          placeholder="Name"
          onChange={(e) => handleNameInputChange(e.target.value)}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Separator size={10} />
        <LoginButton onClick={handleRegisterButtonClick}>Entrar</LoginButton>
        <Separator size={8} />
      </FormContainer>
    </Center>
  )
}
