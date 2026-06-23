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

type accessTokenType = {
  access: string;
};

type refreshTokenType = {
  refresh: string;
};

type tokensType = accessTokenType & refreshTokenType;

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

export const getTokens = (data: aurtUserProps): Promise<tokensType> => {
  return axios.post(BASE_URL + '/user/token', data).then((res) => res.data);
};

export const refreshTokens = (refresh: string): Promise<accessTokenType> => {
  return axios
    .post(BASE_URL + '/user/token/refresh', { refresh })
    .then((res) => res.data);
};
