import axios from 'axios';
import { BASE_URL } from '../../Global';
import { LoginData } from '../../Interface';

export const login = (loginData: LoginData) => {
  return axios.post(`${BASE_URL}/login`, loginData);
};
