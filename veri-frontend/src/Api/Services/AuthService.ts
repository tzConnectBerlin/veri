import axios from 'axios';
import { BASE_URL } from '../../Global';
import { Login, SignUp } from '../../types';

export const login = (loginData: Login) => {
  return axios.post(`${BASE_URL}/login`, loginData, {
    withCredentials: true,
  });
};

export const signUp = (signUpData: SignUp) => {
  return axios.post(`${BASE_URL}/signup`, signUpData);
};

export const logout = () => {
  return axios.post(`${BASE_URL}/logout`);
};
