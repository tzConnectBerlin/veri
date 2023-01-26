import axios from 'axios';
import { BASE_URL } from '../../Global';

export const getUser = () => {
  return axios.post(`${BASE_URL}/currentuser`, {}, { withCredentials: true });
};
