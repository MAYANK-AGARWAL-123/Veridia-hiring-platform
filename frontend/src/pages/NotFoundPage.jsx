import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

const NotFoundPage = () => (
  <Container>
    <Box sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h1" component="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Page Not Found
      </Typography>
      <Typography gutterBottom>
        The page you are looking for does not exist.
      </Typography>
      <Button component={Link} to="/" variant="contained" sx={{ mt: 2 }}>
        Go to Home
      </Button>
    </Box>
  </Container>
);

export default NotFoundPage;
