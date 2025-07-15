import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// You can add interceptors here if needed
// api.interceptors.request.use(...)
// api.interceptors.response.use(...)

export default api; 