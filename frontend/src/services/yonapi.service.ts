import axios, { AxiosRequestConfig } from 'axios';
import { Flow, Poll, User } from '../types';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.withCredentials = true;

const URL = '';
const API = `${URL}/api`;

const getData = async <T extends object>(
  url: string,
  settings?: AxiosRequestConfig
): Promise<T> => {
  const response = await axios.get(url, settings);

  if (!/2[0-9]{2}/.test(response.status.toString())) {
    throw new Error(`Fetching '${url}' failed, received ${response.status}`);
  }

  return await response.data;
};

const sendData = async (
  url: string,
  data: {},
  settings?: AxiosRequestConfig
): Promise<any> => await axios.post(url, data, settings);

// #region User login, signup etc.
const auth = (username: string, password: string) =>
  sendData(`${URL}/signin/`, { username, password });

const register = (email: string, username: string, password: string) =>
  sendData(`${URL}/signup/`, { email, username, password });

const logout = () => getData(`${URL}/logout/`);

const resetPassword = (email: string) =>
  sendData(`${URL}/resetpassword/`, { email });

// #endregion
export const yonUser = {
  auth,
  register,
  logout,
  resetPassword,
};

// #region Fetching data etc.

/**
 * Get an array of all Flows
 */
const getFlows = (settings?: AxiosRequestConfig): Promise<Flow[]> =>
  getData(`${API}/flows/`, settings);

/**
 * Get an array of all Poll objects
 */
const getAllPolls = (settings?: AxiosRequestConfig): Promise<Poll[]> =>
  getData(`${API}/polls`, settings);

/**
 * Get array of Poll objects specified by given flow
 * @param flow flow name
 */
const getPollsByFlow = (
  flow: string,
  settings?: AxiosRequestConfig
): Promise<Poll[]> => getData(`${API}/polls_by_flow/${flow}`, settings);

/**
 * Get an array of Poll objects added by given username
 * @param username user's name
 */
const getPollsByUser = (
  username: string,
  settings?: AxiosRequestConfig
): Promise<Poll[]> => getData(`${API}/polls_by_user/${username}`, settings);

const getUserdata = (): Promise<User> => getData(`${API}/profile/`);

// #endregion
export const yonFetch = {
  getFlows,
  getAllPolls,
  getPollsByFlow,
  getPollsByUser,
  getUserdata,
};

// #region Vote interactions etc.

const voteYes = (pollId: number) => sendData(`${URL}/voteYes/`, { id: pollId });

const voteNo = (pollId: number) => sendData(`${URL}/voteNo/`, { id: pollId });

const rateLike = (pollId: number) =>
  sendData(`${URL}/rateLike/`, { id: pollId });

const rateDislike = (pollId: number) =>
  sendData(`${URL}/rateDislike/`, { id: pollId });

// #endregion
export const yonVote = {
  voteYes,
  voteNo,
  rateLike,
  rateDislike,
};
