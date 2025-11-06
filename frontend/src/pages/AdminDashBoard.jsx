import { useState, useEffect } from 'react';
import { getJobs, createJob, updateJob, deleteJob } from '../api/jobApi';
import { formatDate } from '../utils/formatDate';
import { useFormik } from 'formik';
import { jobSchema } from '../utils/validators';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, TextField, Modal } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AdminDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const fetchJobs = async () => {
    try {
      const res = await getJobs();
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleOpen = (job = null) => {
    setEditingJob(job);
    formik.setValues(job || { title: '', description: '', requirements: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingJob(null);
    formik.resetForm();
  };

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      requirements: '',
    },
    validationSchema: jobSchema,
    onSubmit: async (values) => {
      try {
        if (editingJob) {
          await updateJob(editingJob._id, values);
        } else {
          await createJob(values);
        }
        fetchJobs();
        handleClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Container maxWidth="xl">
      <Box sx={{ maxWidth: 960, mx: 'auto', py: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        <Button variant="contained" onClick={() => handleOpen()} sx={{ mb: 2 }}>
          Create New Job
        </Button>
        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Date Posted</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job.title}</TableCell>
                <TableCell>{formatDate(job.date)}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(job)}>Edit</Button>
                  <Button onClick={() => handleDelete(job._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style} component="form" onSubmit={formik.handleSubmit}>
          <Typography variant="h6">{editingJob ? 'Edit Job' : 'Create Job'}</Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Job Title"
            name="title"
            {...formik.getFieldProps('title')}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="description"
            label="Description"
            name="description"
            multiline
            rows={4}
            {...formik.getFieldProps('description')}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="requirements"
            label="Requirements"
            name="requirements"
            multiline
            rows={4}
            {...formik.getFieldProps('requirements')}
            error={formik.touched.requirements && Boolean(formik.errors.requirements)}
            helperText={formik.touched.requirements && formik.errors.requirements}
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            {editingJob ? 'Update' : 'Create'}
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;