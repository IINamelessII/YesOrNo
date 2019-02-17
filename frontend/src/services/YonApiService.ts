import axios from 'axios';

const fetchUrlDesc = Symbol();
const sendDataDesc = Symbol();

export default class YonApiService {
  API_URL = 'http://olehserikov.info/api';

  [fetchUrlDesc] = async (url: string): Promise<any> => {
    const response = await axios.get(url);

    if (!/2[0-9]{2}/.test(response.status.toString())) {
      throw new Error(`Fetching '${url}' failed, received ${response.status}`);
    }

    return await response.data;
  };

  [sendDataDesc] = async (
    url: string,
    data: {},
    ...settings: {}[]
  ): Promise<any> => await axios.post(url, data, ...settings);

  getFlows = () => this[fetchUrlDesc](`${this.API_URL}/flows`);

  getAllPolls = () => this[fetchUrlDesc](`${this.API_URL}/polls`);

  getPollsByFlow = (flow: string) =>
    this[fetchUrlDesc](`${this.API_URL}/polls_by_flow/${flow}`);

  sendData = (url: string, data: {}, ...settings: {}[]) => {
    this[sendDataDesc](`${this.API_URL}/${url}`, data, ...settings);
  };
}
