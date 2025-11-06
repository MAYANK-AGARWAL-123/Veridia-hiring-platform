import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { applicationSchema } from '../utils/validators';
import { applyForJob } from '../api/applicationApi';
import AuthContext from '../context/AuthContext';
import AppContext from '../context/AppContext';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const ApplicationForm = () => {
  const { jobId } = useParams();
  const { user } = useContext(AuthContext);
  const { showAlert } = useContext(AppContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: user ? user.name : '',
      email: user ? user.email : '',
      phone: '',
      portfolio: '',
      college: '',
      branch: '',
      coverLetter: '',
      resume: null,
    },
    validationSchema: applicationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('jobId', jobId);
      formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('phone', values.phone);
        formData.append('portfolio', values.portfolio);
        formData.append('college', values.college);
        formData.append('branch', values.branch);
        formData.append('coverLetter', values.coverLetter);
      formData.append('resume', values.resume);

      try {
        await applyForJob(formData);

        navigate('/dashboard');
      } catch (error) {
        showAlert('Failed to submit application. Please try again.', 'error');
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Apply for Job
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <TextField fullWidth id="name" name="name" label="Full Name" value={formik.values.name} onChange={formik.handleChange} error={formik.touched.name && Boolean(formik.errors.name)} helperText={formik.touched.name && formik.errors.name} margin="normal" />
            <TextField fullWidth id="email" name="email" label="Email Address" value={formik.values.email} onChange={formik.handleChange} error={formik.touched.email && Boolean(formik.errors.email)} helperText={formik.touched.email && formik.errors.email} margin="normal" />
            <TextField fullWidth id="phone" name="phone" label="Phone Number (Optional)" value={formik.values.phone} onChange={formik.handleChange} error={formik.touched.phone && Boolean(formik.errors.phone)} helperText={formik.touched.phone && formik.errors.phone} margin="normal" />
            <TextField fullWidth id="portfolio" name="portfolio" label="Portfolio/Website URL (Optional)" value={formik.values.portfolio} onChange={formik.handleChange} error={formik.touched.portfolio && Boolean(formik.errors.portfolio)} helperText={formik.touched.portfolio && formik.errors.portfolio} margin="normal" />
            <TextField fullWidth id="college" name="college" label="College" value={formik.values.college} onChange={formik.handleChange} error={formik.touched.college && Boolean(formik.errors.college)} helperText={formik.touched.college && formik.errors.college} margin="normal" />
            <TextField fullWidth id="branch" name="branch" label="Branch" value={formik.values.branch} onChange={formik.handleChange} error={formik.touched.branch && Boolean(formik.errors.branch)} helperText={formik.touched.branch && formik.errors.branch} margin="normal" />
            <TextField fullWidth id="coverLetter" name="coverLetter" label="Cover Letter" multiline rows={4} value={formik.values.coverLetter} onChange={formik.handleChange} error={formik.touched.coverLetter && Boolean(formik.errors.coverLetter)} helperText={formik.touched.coverLetter && formik.errors.coverLetter} margin="normal" />
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ mt: 2 }}
          >
            Upload Resume
            <input
              type="file"
              hidden
              name="resume"
              onChange={(event) => {
                formik.setFieldValue("resume", event.currentTarget.files[0]);
              }}
            />
          </Button>
          {formik.touched.resume && formik.errors.resume ? (
            <Typography color="error" variant="body2">{formik.errors.resume}</Typography>
          ) : null}
          {formik.values.resume && <Typography variant="body2">{formik.values.resume.name}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={formik.isSubmitting}
          >
            Submit Application
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ApplicationForm;