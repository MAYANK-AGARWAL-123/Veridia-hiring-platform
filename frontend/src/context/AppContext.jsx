import { createContext, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, severity = 'info') => {
    setAlert({ message, severity });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert(null);
  };

  return (
    <AppContext.Provider value={{ showAlert }}>
      {children}
      {alert && (
        <Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={alert.severity} sx={{ width: '100%' }}>
            {alert.message}
          </Alert>
        </Snackbar>
      )}
    </AppContext.Provider>
  );
};

export default AppContext;