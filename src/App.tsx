import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { TodoContainer } from './containers/TodoContainer';
import { store } from './store';
import theme from './theme';
import { AuthProvider } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <TodoContainer />
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
