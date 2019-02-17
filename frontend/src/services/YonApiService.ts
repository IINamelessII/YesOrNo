import axios from 'axios';

export default class YonApiService {
  _API_URL = 'http://olehserikov.info/api';

  _fetchURL = async (url: string): Promise<{}> => {
    const response = await axios.get(url);

    if (!/2[0-9]{2}/.test(response.status.toString())) {
      throw new Error(`Fetching '${url}' failed, received ${response.status}`);
    }

    return await response.data;
  };

  getFlows = () => this._fetchURL(`${this._API_URL}/flows`);

  getAllPolls = () => this._fetchURL(`${this._API_URL}/polls`);

  getPollsByFlow = (flow: string) =>
    this._fetchURL(`${this._API_URL}/polls_by_flow/${flow}`);
}
