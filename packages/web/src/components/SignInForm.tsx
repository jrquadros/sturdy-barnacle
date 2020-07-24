import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Center } from './Center'
import { Button } from './Button'
import { Separator } from './Separator'
import * as yup from 'yup'

const schema = yup.object().shape({ email: yup.string().email() })

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

const Link = styled.a`
  font-size: 0.8rem;
  :hover {
    cursor: pointer;
  }
`

const ErrorMessage = styled.span`
  font-size: 0.6rem;
  color: tomato;
  margin: 3px;
`
export const SignInForm = () => {
  const [email, setEmail] = useState<string>('')
  const [error, setError] = useState<Error | null | undefined>(null)

  const history = useHistory()

  const handleLoginButtonClick = async () => {
    try {
      await schema.validate({ email }, { abortEarly: false })
      return history.replace('/todos')
    } catch (err) {
      setError(err.message)
    }
  }

  const handleEmailInputChange = async (value: string) => {
    setEmail(value)
    console.log({ value: email })
  }

  return (
    <Center>
      <FormContainer>
        <Input
          type="email"
          placeholder="Email"
          onChange={(e) => handleEmailInputChange(e.target.value)}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Separator size={10} />
        <LoginButton onClick={handleLoginButtonClick}>Entrar</LoginButton>
        <Separator size={8} />
        <Link>SignUp</Link>
      </FormContainer>
    </Center>
  )
}
