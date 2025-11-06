import api from './axiosConfig';

export const getJobs = () => {
  return api.get('/admin/jobs');
};

export const createJob = (jobData) => {
  return api.post('/admin/jobs', jobData);
};

export const updateJob = (jobId, jobData) => {
  return api.put(`/admin/jobs/${jobId}`, jobData);
};

export const deleteJob = (jobId) => {
  return api.delete(`/admin/jobs/${jobId}`);
};
