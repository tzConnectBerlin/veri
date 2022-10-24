import axios from 'axios';
import { BASE_URL } from '../../Global';
import { User } from '../../types';

export const getUser = (): Promise<User> => {
  return axios.post(`${BASE_URL}/users`);
};
