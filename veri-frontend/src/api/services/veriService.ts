import axios from 'axios';
import { BASE_URL } from '../../Global';

export const getVeris = () => {
  return axios.get(`${BASE_URL}/veris`, {
    withCredentials: true,
  });
};

export const addVeri = (body: any) => {
  return axios.post(
    `${BASE_URL}/veris`,
    { body },
    {
      withCredentials: true,
    },
  );
};
