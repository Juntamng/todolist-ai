import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { TodoContainer } from './containers/TodoContainer';
import { store } from './store';
import theme from './theme';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TodoContainer />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
