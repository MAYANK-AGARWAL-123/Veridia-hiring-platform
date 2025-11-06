import { useEffect, useMemo, useState } from 'react';
import { Container, Typography, Box, TextField, MenuItem, Select, InputLabel, FormControl, Grid, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Divider } from '@mui/material';
import { getAllApplications, updateApplicationStatus } from '../api/applicationApi';
import { getJobs } from '../api/jobApi';
import Loader from '../components/Loader';

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ status: '', job: '', college: '', branch: '', q: '' });
  const [selected, setSelected] = useState(null);
  const [statusChoice, setStatusChoice] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const apiBase = useMemo(() => (import.meta.env.VITE_API_URL || '').replace('/api', ''), []);

  const load = async () => {
    setLoading(true);
    try {
      const [appsRes, jobsRes] = await Promise.all([
        getAllApplications(filters),
        getJobs(),
      ]);
      setApplications(appsRes.data);
      setJobs(jobsRes.data);
      if (appsRes.data.length > 0) setSelected(appsRes.data[0]);
      else setSelected(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.status, filters.job, filters.college, filters.branch, filters.q]);

  const onChangeFilter = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

  const onSelect = (app) => setSelected(app);

  const setStatus = async (status) => {
    if (!selected) return;
    setSaving(true);
    try {
      await updateApplicationStatus(selected._id, status);
      // Update UI immediately without reloading
      setSelected((prev) => (prev ? { ...prev, status } : prev));
      setApplications((prev) => prev.map((a) => (a._id === selected._id ? { ...a, status } : a)));
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    setStatusChoice(selected?.status || '');
  }, [selected]);

  return (
    <Container maxWidth="xl">
      <Box sx={{ maxWidth: 960, mx: 'auto', py: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          All Applications
        </Typography>

        {loading ? (
          <Loader />
        ) : (
        <>
      <Grid container spacing={2} sx={{ mb: 2 }} alignItems="center">
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Status</InputLabel>
            <Select label="Status" name="status" value={filters.status} onChange={onChangeFilter}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="In Review">In Review</MenuItem>
              <MenuItem value="Interviewing">Interviewing</MenuItem>
              <MenuItem value="Offered">Offered</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Job</InputLabel>
            <Select label="Job" name="job" value={filters.job} onChange={onChangeFilter}>
              <MenuItem value="">All</MenuItem>
              {jobs.map((j) => (
                <MenuItem key={j._id} value={j._id}>{j.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField fullWidth size="small" label="College" name="college" value={filters.college} onChange={onChangeFilter} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField fullWidth size="small" label="Branch" name="branch" value={filters.branch} onChange={onChangeFilter} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField fullWidth size="small" label="Search name/email" name="q" value={filters.q} onChange={onChangeFilter} />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <Paper sx={{ overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Candidate</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Job</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app._id} hover selected={selected?._id === app._id} onClick={() => onSelect(app)} sx={{ cursor: 'pointer' }}>
                    <TableCell>{app.name}</TableCell>
                    <TableCell>{app.email}</TableCell>
                    <TableCell>{app.job?.title}</TableCell>
                    <TableCell>{app.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 2, minHeight: 300 }}>
            <Typography variant="h6">Application Details</Typography>
            <Divider sx={{ my: 1 }} />
            {selected ? (
              <Box>
                <Typography><strong>Name:</strong> {selected.name}</Typography>
                <Typography><strong>Email:</strong> {selected.email}</Typography>
                <Typography><strong>Phone:</strong> {selected.phone || '-'}</Typography>
                <Typography><strong>College:</strong> {selected.college}</Typography>
                <Typography><strong>Branch:</strong> {selected.branch}</Typography>
                <Typography><strong>Portfolio:</strong> {selected.portfolio || '-'}</Typography>
                <Typography sx={{ mt: 1 }}><strong>Job:</strong> {selected.job?.title}</Typography>
                <Typography sx={{ mt: 1 }}><strong>Cover Letter:</strong></Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>{selected.coverLetter || '-'}</Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  {selected.resume && (
                    <Button
                      variant="outlined"
                      href={/^https?:\/\//i.test(String(selected.resume)) ? selected.resume : `${apiBase}/${String(selected.resume).replace(/^\.\//,'')}`}
                      target="_blank"
                    >
                      View Resume
                    </Button>
                  )}
                </Box>
                <Box sx={{ mt: 2, display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                  <FormControl size="small" sx={{ minWidth: 180 }}>
                    <InputLabel>Status</InputLabel>
                    <Select label="Status" value={statusChoice} onChange={(e) => setStatusChoice(e.target.value)}>
                      <MenuItem value="In Review">In Review</MenuItem>
                      <MenuItem value="Interviewing">Interviewing</MenuItem>
                      <MenuItem value="Offered">Offered</MenuItem>
                      <MenuItem value="Rejected">Rejected</MenuItem>
                    </Select>
                  </FormControl>
                  <Button variant="contained" size="small" onClick={() => setStatus(statusChoice)} disabled={!statusChoice || saving}>
                    {saving ? 'Saving...' : 'Save'}
                  </Button>
                </Box>
              </Box>
            ) : (
              <Typography variant="body2">Select an application to view details.</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
        </>
        )}
      </Box>
    </Container>
  );
};

export default AdminApplications;
