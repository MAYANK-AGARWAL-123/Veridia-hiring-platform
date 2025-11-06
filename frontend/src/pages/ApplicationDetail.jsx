import { useMemo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getApplicationsForJob, updateApplicationStatus } from '../api/applicationApi';
import { getJobs } from '../api/jobApi';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Button } from '@mui/material';
import StatusBadge from '../components/StatusBadge';
import Loader from '../components/Loader';

const ApplicationDetailPage = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [job, setJob] = useState(null);
  const apiBase = useMemo(() => (import.meta.env.VITE_API_URL || '').replace('/api',''), []);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const res = await getApplicationsForJob(jobId);
      setApplications(res.data);
      const jobRes = await getJobs();
      setJob(jobRes.data.find(j => j._id === jobId));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [jobId]);

  const handleStatusChange = async (appId, status) => {
    try {
      await updateApplicationStatus(appId, status);
      fetchApplications(); // Refresh the list
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="xl">
      {loading || !job ? (
        <Loader />
      ) : (
        <>
          <Typography variant="h4" component="h1" gutterBottom>
            Applications for {job.title}
          </Typography>
          <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Candidate</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Update Status</TableCell>
                  <TableCell>Resume</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app._id}>
                    <TableCell>{app.candidate.name}</TableCell>
                    <TableCell>{app.candidate.email}</TableCell>
                    <TableCell>
                      <StatusBadge status={app.status} />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app._id, e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        <MenuItem value="In Review">In Review</MenuItem>
                        <MenuItem value="Interviewing">Interviewing</MenuItem>
                        <MenuItem value="Offered">Offered</MenuItem>
                        <MenuItem value="Rejected">Rejected</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button
                        href={/^https?:\/\//i.test(String(app.resume)) ? app.resume : `${apiBase}/${String(app.resume).replace(/^\.\//,'')}`}
                        target="_blank"
                      >
                        View Resume
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  );
};

export default ApplicationDetailPage;