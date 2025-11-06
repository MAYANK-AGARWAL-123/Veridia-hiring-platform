import api from './axiosConfig';

export const applyForJob = (formData) => {
  return api.post('/applications', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getApplicationsForJob = (jobId) => {
  return api.get(`/applications/${jobId}`);
};

export const getMyApplications = () => {
  return api.get('/applications/candidate/me');
};

export const updateApplicationStatus = (appId, status) => {
  return api.put(`/applications/${appId}`, { status });
};

export const sendApplicationNotification = (data) => {
  return api.post('/notifications/submit', data);
};

export const sendStatusUpdateNotification = (applicationId) => {
  return api.post('/notifications/status-update', { applicationId });
};

export const getAllApplications = (filters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => {
    if (v) params.append(k, v);
  });
  const qs = params.toString();
  return api.get(`/applications${qs ? `?${qs}` : ''}`);
};