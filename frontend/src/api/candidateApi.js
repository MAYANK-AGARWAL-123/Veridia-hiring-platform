import api from './axiosConfig';

export const getMyProfile = () => {
  return api.get('/candidate/me');
};

export const updateMyProfile = (data) => {
  return api.put('/candidate/me', data);
};
