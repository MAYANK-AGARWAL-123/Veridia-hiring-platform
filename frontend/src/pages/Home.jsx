import { useState, useEffect } from 'react';
import { getJobs } from '../api/jobApi';
import { Link } from 'react-router-dom';
import { Container, Typography, Card, CardContent, CardActions, Button, Grid } from '@mui/material';
import Loader from '../components/Loader';

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getJobs();
        setJobs(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <Container maxWidth="xl">
      <Box sx={{ maxWidth: 960, mx: 'auto', py: 2 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Veridia Hiring
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Available Positions
        </Typography>
        {loading ? (
          <Loader />
        ) : (
          <Grid container spacing={3}>
          {jobs.map((job) => (
            <Grid item key={job._id} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{job.title}</Typography>
                  <Typography>{job.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" component={Link} to={`/apply/${job._id}`}>
                    Apply Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default HomePage;