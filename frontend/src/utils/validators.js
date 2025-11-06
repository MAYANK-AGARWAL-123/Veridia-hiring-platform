import * as Yup from 'yup';

export const loginSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
});

export const registerSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
});

export const jobSchema = Yup.object({
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  requirements: Yup.string().required('Required'),
});

export const applicationSchema = Yup.object({
  name: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string(),
  portfolio: Yup.string().url('Must be a valid URL'),
  college: Yup.string().required('College name is required'),
  branch: Yup.string().required('Branch is required'),
  coverLetter: Yup.string(),
  resume: Yup.mixed().required('A resume is required'),
});