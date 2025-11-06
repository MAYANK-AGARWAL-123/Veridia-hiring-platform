import { Box, Typography } from '@mui/material';

const Loader = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '40vh', gap: 2 }}>
    <svg width="40" height="40" viewBox="0 0 50 50" aria-label="Loading">
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="#1976d2"
        strokeWidth="5"
        strokeDasharray="90 150"
        strokeDashoffset="0"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
    <Typography variant="subtitle1" color="primary">Loading...</Typography>
  </Box>
);

export default Loader;
