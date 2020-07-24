import styled from 'styled-components'

type SeparatorProps = {
  size: number
}

export const Separator = styled.div<SeparatorProps>`
  height: ${(props) => props.size + 'px'};
`
