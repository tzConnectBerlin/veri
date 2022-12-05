import axios from 'axios';
import { BASE_URL } from '../../Global';

export const getRecipients = () => {
  return axios.get(`${BASE_URL}/recipients`, {
    withCredentials: true,
  });
};
