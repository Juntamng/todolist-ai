import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { TodoContainer } from './containers/TodoContainer';
import { store } from './store';
import theme from './theme';
import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/Header';

function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <TodoContainer />
        </ThemeProvider>
      </Provider>
    </AuthProvider>
  );
}

export default App;
