import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

export const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html, body {
    width: 100vw;
    transition: all .35s;
    height: 100%;
  }
  
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }

  .sm-btn {
    width: 60px;
    height: 60px;
    padding: 20px;
    border-radius: 50%;
    border: 1px solid black;
  }
`
