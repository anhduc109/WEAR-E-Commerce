import React from 'react'
import ReactDOM from 'react-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './App'
import makeStore from './redux/store'

const store = makeStore()

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Helvetica',
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 0,
  },
  palette: {
    // background: '#FFFFFF',
    primary: {
      main: '#FFFFFF',
    },
    secondary: {
      main: '#000000',
    },
    type: 'light',
  },
})

const WithProvider = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </CssBaseline>
  </ThemeProvider>
)

ReactDOM.render(<WithProvider />, document.getElementById('root'))
