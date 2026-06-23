import axios from 'axios';
import { BASE_URL } from '../constants';

type aurtUserProps = {
  email: string;
  password: string;
};

type regUserProps = {
  email: string;
  password: string;
  username: string;
};

type authUserReturn = {
  email: string;
  username: string;
  _id: number;
};

export const authUser = (data: aurtUserProps): Promise<authUserReturn> => {
  return axios
    .post(BASE_URL + '/user/login', data, {
      headers: { 'content-type': 'application/json' },
    })
    .then((res) => res.data);
};

export const regUser = (data: regUserProps): Promise<authUserReturn> => {
  return axios
    .post(BASE_URL + '/user/signup/', data, {
      headers: { 'content-type': 'application/json' },
    })
    .then((res) => res.data);
};
