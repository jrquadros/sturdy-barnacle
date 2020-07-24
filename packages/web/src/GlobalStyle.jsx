import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle` 
  * {    
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }
  body {
    @import url('https://fonts.googleapis.com/css?family=Roboto+Condensed&display=swap');
    background: #F7F7F7;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    font-family: 'Roboto Condensed', sans-serif;
  }
`
