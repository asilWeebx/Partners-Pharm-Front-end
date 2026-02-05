import axios from 'axios';

const API_BASE_URL = 'https://partnerspharm.pythonanywhere.com/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (username, password) => {
    const response = await api.post('/auth/login/', { username, password });
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

// Products API
export const productsAPI = {
  getAll: async (params) => {
    const response = await api.get('/products/', { params });
    return response.data;
  },
  getOne: async (id) => {
    const response = await api.get(`/products/${id}/`);
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/products/', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/products/${id}/`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/products/${id}/`);
    return response.data;
  },
};

// Partners API
export const partnersAPI = {
  getAll: async () => {
    const response = await api.get('/partners/');
    return response.data;
  },
  getOne: async (id) => {
    const response = await api.get(`/partners/${id}/`);
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/partners/', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/partners/${id}/`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/partners/${id}/`);
    return response.data;
  },
};

// Diseases API
export const diseasesAPI = {
  getAll: async () => {
    const response = await api.get('/diseases/');
    return response.data;
  },
  getOne: async (id) => {
    const response = await api.get(`/diseases/${id}/`);
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/diseases/', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/diseases/${id}/`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/diseases/${id}/`);
    return response.data;
  },
};

export default api;
