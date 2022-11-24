import axios from 'axios';
import { BASE_URL } from '../../Global';

export const getVeris = () => {
  return axios.get(`${BASE_URL}/veris`, {
    withCredentials: true,
  });
};

export const getVeriById = (id: number) => {
  return axios.get(`${BASE_URL}/veris/${id}`, {
    withCredentials: true,
  });
};

export const deleteVeriById = (id: number) => {
  return axios.delete(`${BASE_URL}/veris/${id}`, {
    withCredentials: true,
  });
};

export const addVeri = (body: any) => {
  return axios.post(`${BASE_URL}/veris`, body, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
