import React from 'react'
import ReactDOM from 'react-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#546e7a',
    },
    type: 'light',
  },
})

const WithProvider = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline>
      <Router>
        <App />
      </Router>
    </CssBaseline>
  </ThemeProvider>
)

ReactDOM.render(<WithProvider />, document.getElementById('root'))
