import React from 'react'
import styled from 'styled-components'

type TodoDetailsProps = {
  id: string
  title: string
  description?: string
  done: boolean
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 2px solid #f4f4f4;
  margin-bottom: 2rem;
  border-radius: 5px;
`

const Title = styled.h2`
  font-size: 1rem;
`
const Description = styled.span`
  font-size: 0.8rem;
`

export const TodoDetails = ({ title, description }: TodoDetailsProps) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
    </Wrapper>
  )
}
