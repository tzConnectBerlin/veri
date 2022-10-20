import axios from 'axios';
import { LoginData } from '../../Interface';

export const login = (loginData: LoginData) => {
  return axios.post(`${process.env.BASE_URL}`, loginData);
};
