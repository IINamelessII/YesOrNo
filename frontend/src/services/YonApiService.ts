import axios, { AxiosRequestConfig } from 'axios';
import { Flow, Poll, User } from '../types';
const fetchUrl = Symbol();
const sendData = Symbol();

export default class YonApiService {
  URL = '';
  API_URL = `${this.URL}/api`;

  [fetchUrl] = async (
    url: string,
    settings?: AxiosRequestConfig
  ): Promise<any> => {
    const response = await axios.get(url, settings);

    if (!/2[0-9]{2}/.test(response.status.toString())) {
      throw new Error(`Fetching '${url}' failed, received ${response.status}`);
    }

    return await response.data;
  };

  [sendData] = async (
    url: string,
    data: {},
    settings?: AxiosRequestConfig
  ): Promise<any> => await axios.post(url, data, settings);

  auth = (username: string, password: string) =>
    this[sendData](`${this.URL}/signin/`, { username, password });

  register = (email: string, username: string, password: string) =>
    this[sendData](`${this.API_URL}/signup/`, { email, username, password });

  resetPassword = (email: string) =>
    this[sendData](`${this.API_URL}/resetpassword/`, { email });

  sendData = (
    url: string,
    data: {},
    settings?: AxiosRequestConfig
  ): Promise<any> => this[sendData](`${this.URL}/${url}`, data, settings);

  /**
   * Returns a response Promise containing array of Flow objects
   */
  getFlows = (settings?: AxiosRequestConfig): Promise<Flow[]> =>
    this[fetchUrl](`${this.API_URL}/flows`, settings);

  /**
   * Returns a response Promise containing array of all Poll objects
   */
  getAllPolls = (settings?: AxiosRequestConfig): Promise<Poll[]> =>
    this[fetchUrl](`${this.API_URL}/polls`, settings);

  /**
   * Returns a response Promise containing array of Poll objects specified by given flow
   * @param flow flow name
   */
  getPollsByFlow = (
    flow: string,
    settings?: AxiosRequestConfig
  ): Promise<Poll[]> =>
    this[fetchUrl](`${this.API_URL}/polls_by_flow/${flow}`, settings);

  /**
   * Returns a response Promise containing array of Poll objects added by given username
   * @param username user's name
   */
  getPollsByUser = (
    username: string,
    settings?: AxiosRequestConfig
  ): Promise<Poll[]> =>
    this[fetchUrl](`${this.API_URL}/polls_by_user/${username}`, settings);

  getUserdata = (): Promise<User> => this[fetchUrl](`${this.API_URL}/profile/`);
}
