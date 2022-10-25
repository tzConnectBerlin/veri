import axios from 'axios';
import { BASE_URL } from '../../Global';

export const getVeris = () => {
  return axios.get(`${BASE_URL}/veris`);
};
