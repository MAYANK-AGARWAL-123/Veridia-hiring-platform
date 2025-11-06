import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import App from './App';
import './index.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f7f9fc',
      paper: '#ffffff',
    },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: ['Inter', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
  },
  components: {
    MuiButton: {
      defaultProps: { variant: 'contained' },
      styleOverrides: { root: { textTransform: 'none', borderRadius: 8 } },
    },
    MuiCard: {
      styleOverrides: { root: { borderRadius: 12, boxShadow: '0 6px 20px rgba(0,0,0,0.06)' } },
    },
    MuiAppBar: {
      styleOverrides: { root: { boxShadow: 'none', borderBottom: '1px solid rgba(0,0,0,0.08)' } },
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <AppProvider>
            <CssBaseline />
            <App />
          </AppProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  </StrictMode>
);
