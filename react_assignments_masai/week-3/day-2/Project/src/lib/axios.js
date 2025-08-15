import axios from 'axios';
import { auth } from '../firebase';

const api = axios.create({
  baseURL: import.meta.env.VITE_FIREBASE_DB_URL
});

api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  const token = user ? await user.getIdToken() : null;
  if (token) {
    config.params = { ...(config.params || {}), auth: token };
  }
  if (config.url && !config.url.endsWith('.json')) {
    config.url = `${config.url}.json`;
  }
  return config;
});

export default api;
