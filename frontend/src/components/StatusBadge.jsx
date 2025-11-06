import { Chip } from '@mui/material';

const StatusBadge = ({ status }) => {
  const normalized = status === 'Submitted' ? 'In Review' : status;
  const statusColors = {
    'In Review': 'primary',
    Interviewing: 'secondary',
    Offered: 'success',
    Rejected: 'error',
  };

  return <Chip label={normalized} color={statusColors[normalized] || 'default'} />;
};

export default StatusBadge;