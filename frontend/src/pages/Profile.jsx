import { useEffect, useState, useContext } from 'react';
import { Container, Typography, TextField, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { getMyProfile, updateMyProfile } from '../api/candidateApi';
import { getMyApplications } from '../api/applicationApi';
import AuthContext from '../context/AuthContext';
import StatusBadge from '../components/StatusBadge';
import Loader from '../components/Loader';

const Profile = () => {
  const { user, refreshUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name: '', password: '', phone: '', portfolio: '', college: '', branch: '' });
  const [applications, setApplications] = useState([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [p, apps] = await Promise.all([getMyProfile(), getMyApplications()]);
        setProfile(p.data);
        setForm({
          name: p.data.name || '',
          password: '',
          phone: p.data.phone || '',
          portfolio: p.data.portfolio || '',
          college: p.data.college || '',
          branch: p.data.branch || '',
        });
        setApplications(apps.data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { name: form.name, phone: form.phone, portfolio: form.portfolio, college: form.college, branch: form.branch };
      if (form.password) payload.password = form.password;
      const res = await updateMyProfile(payload);
      setProfile(res.data);
      setForm((f) => ({ ...f, password: '' }));
      if (refreshUser) await refreshUser();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container maxWidth="xl">
      {loading ? (
        <Loader />
      ) : (
      <Box sx={{ maxWidth: 960, mx: 'auto', py: 2, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box>
          <Typography variant="h5" gutterBottom>
            Profile
          </Typography>
          <Box component="form" onSubmit={onSave} sx={{ maxWidth: 480 }}>
            <TextField fullWidth margin="normal" label="Name" name="name" value={form.name} onChange={onChange} />
            <TextField fullWidth margin="normal" type="password" label="New Password (optional)" name="password" value={form.password} onChange={onChange} />
            <TextField fullWidth margin="normal" label="Phone" name="phone" value={form.phone} onChange={onChange} />
            <TextField fullWidth margin="normal" label="Portfolio / Website" name="portfolio" value={form.portfolio} onChange={onChange} />
            <TextField fullWidth margin="normal" label="College" name="college" value={form.college} onChange={onChange} />
            <TextField fullWidth margin="normal" label="Branch" name="branch" value={form.branch} onChange={onChange} />
            <Button type="submit" variant="contained" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</Button>
          </Box>
        </Box>

        <Box>
          <Typography variant="h5" gutterBottom>
            My Applications
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Job Title</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date Applied</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app._id}>
                    <TableCell>{app.job.title}</TableCell>
                    <TableCell><StatusBadge status={app.status} /></TableCell>
                    <TableCell>{new Date(app.date).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      )}
    </Container>
  );
};

export default Profile;
