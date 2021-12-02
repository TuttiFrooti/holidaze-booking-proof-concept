import { useContext } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import { BASE_URL } from '../../constants/api';

export default function useAxios() {
  const [auth] = useContext(AuthContext);

  const apiCli = axios.create({
    baseURL: BASE_URL,
  });

  apiCli.interceptors.request.use(config => {
    const token = auth ? auth.jwt : null;
    config.headers.Authorization = token ? `Bearer ${token}` : '';

    return config;
  });

  return apiCli;
}