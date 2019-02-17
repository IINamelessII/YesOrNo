export default class YonApiService {
  _API_URL = 'http://olehserikov.info/api';

  async _fetchURL(url) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }

    return await response.json();
  }

  getFlows() {
    return this._fetchURL(`${this._API_URL}/flows`);
  }

  getAllPolls() {
    return this._fetchURL(`${this._API_URL}/polls`);
  }

  getPollsByFlow(flow) {
    return this._fetchURL(`${this._API_URL}/polls_by_flow/${flow}`);
  }
}
