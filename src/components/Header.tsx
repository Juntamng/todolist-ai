import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import Login from './Login';

export default function Header() {
  const { user, signOut } = useAuth();
  const [loginOpen, setLoginOpen] = React.useState(false);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo App
          </Typography>
          {user ? (
            <>
              <Typography sx={{ mr: 2 }}>{user.email}</Typography>
              <Button color="inherit" onClick={signOut}>
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={() => setLoginOpen(true)}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Login open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
} 