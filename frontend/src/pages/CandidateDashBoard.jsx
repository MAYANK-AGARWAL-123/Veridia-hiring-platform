import { useState, useEffect, useContext, useMemo } from 'react';
import { getJobs } from '../api/jobApi';
import { getMyApplications } from '../api/applicationApi';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box, Grid, Card, CardContent, CardActions } from '@mui/material';
import Loader from '../components/Loader';

const CandidateDashboard = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [myApps, setMyApps] = useState([]);
  const appliedJobIds = useMemo(() => new Set(myApps.map((a) => a.job?._id || a.job)), [myApps]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsRes, appsRes] = await Promise.all([getJobs(), getMyApplications()]);
        setJobs(jobsRes.data);
        setMyApps(appsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  return (
    <Container maxWidth="xl">
      {loading ? (
        <Loader />
      ) : (
      <Box sx={{ maxWidth: 960, mx: 'auto', py: 2 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
          Open Positions
        </Typography>
        <Grid container spacing={3}>
          {jobs.map((job) => (
            <Grid item key={job._id} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{job.title}</Typography>
                  <Typography variant="body2">{job.description}</Typography>
                </CardContent>
                <CardActions>
                  {appliedJobIds.has(job._id) ? (
                    <Button size="small" disabled>Applied</Button>
                  ) : (
                    <Button size="small" component={Link} to={`/apply/${job._id}`}>
                      Apply Now
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      )}
    </Container>
  );
};

export default CandidateDashboard;