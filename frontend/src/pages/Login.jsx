import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { loginSchema } from '../utils/validators';
import AuthContext from '../context/AuthContext';
import AppContext from '../context/AppContext';
import { Container, Typography, TextField, Button, Box, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const { showAlert } = useContext(AppContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      role: 'candidate',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        await login(values.email, values.password, values.role);
        if (values.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } catch (error) {
        showAlert(error.message, 'error');
      }
    },
  });

  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            {...formik.getFieldProps('email')}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...formik.getFieldProps('password')}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend">Login as</FormLabel>
            <RadioGroup
              row
              aria-label="role"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
            >
              <FormControlLabel value="candidate" control={<Radio />} label="Candidate" />
              <FormControlLabel value="admin" control={<Radio />} label="Admin" />
            </RadioGroup>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={formik.isSubmitting}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;