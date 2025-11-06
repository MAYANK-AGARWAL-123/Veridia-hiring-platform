import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const homePath = isAuthenticated ? (user?.role === 'admin' ? '/admin' : '/dashboard') : '/';

  const authLinks = (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {user?.role === 'admin' ? (
        <>
          <Button color="inherit" component={Link} to="/admin">
            Admin Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/admin/applications">
            Applications
          </Button>
        </>
      ) : (
        <>
          <Button color="inherit" component={Link} to="/dashboard">
            Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/profile">
            Profile
          </Button>
        </>
      )}
      <Button color="inherit" onClick={logout}>
        Logout
      </Button>
    </Box>
  );

  const guestLinks = (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Button color="inherit" component={Link} to="/login">Login</Button>
      <Button color="inherit" component={Link} to="/register">Register</Button>
    </Box>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to={homePath} sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
          Veridia Hiring
        </Typography>
        {isAuthenticated ? authLinks : guestLinks}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

