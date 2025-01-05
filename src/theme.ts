import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: red[300],
    },
    background: {
      default: '#f5f5f5',
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
      },
    },
    MuiCheckbox: {
      defaultProps: {
        color: 'primary',
      },
    },
    MuiButton: {
      styleOverrides: {
        text: {
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme; 