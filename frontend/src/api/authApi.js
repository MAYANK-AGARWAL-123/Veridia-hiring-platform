import api from './axiosConfig';

export const login = (email, password, role) => {
  return api.post(`/auth/${role}/login`, { email, password });
};

export const register = (name, email, password) => {
  return api.post('/auth/candidate/register', { name, email, password });
};

export const loadUser = () => {
  return api.get('/auth');
};