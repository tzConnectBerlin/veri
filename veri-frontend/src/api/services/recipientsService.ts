import axios from 'axios';
import { BASE_URL } from '../../Global';

export const getRecipients = () => {
  return axios.get(`${BASE_URL}/recipients`, {
    withCredentials: true,
  });
};

export const getRecipientsByVeriId = (veriId: number) => {
  return axios.get(`${BASE_URL}/recipients/${veriId}`, {
    withCredentials: true,
  });
};

export const postRcipientsByVeriId = (veriId: number, body: any) => {
  return axios.post(`${BASE_URL}/recipients/${veriId}`, body, {
    withCredentials: true,
  });
};
