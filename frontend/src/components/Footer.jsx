import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box component="footer" sx={{ mt: 'auto', py: 3, textAlign: 'center', color: 'text.secondary', bgcolor: 'background.paper', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
    <Typography variant="body2"> {new Date().getFullYear()} Veridia · All rights reserved</Typography>
  </Box>
);

export default Footer;
