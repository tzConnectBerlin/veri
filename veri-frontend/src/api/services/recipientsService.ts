import axios from 'axios';
import { BASE_URL } from '../../Global';
import { EventAuth } from '../../types';

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

export const postScanByVeriId = (veriId: number, body: any) => {
  return axios.post(`${BASE_URL}/scan/${veriId}`, body, {
    withCredentials: true,
  });
};

export const eventLogin = (loginData: EventAuth) => {
  return axios.post(`${BASE_URL}/events`, loginData);
};
