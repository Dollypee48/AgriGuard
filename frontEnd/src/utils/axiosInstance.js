
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://agriguard-5.onrender.com/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
