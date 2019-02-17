import React from 'react';

import { YonApiService } from '../../services';
import Spinner from '../Spinner';
import PollsView from './PollsView';

import './AppBody.scss';

class AppBody extends React.Component {
  yonApi = new YonApiService();

  state = {
    polls: [],
  };

  componentDidMount() {
    this.updatePolls();
  }

  onPollsUpdated = (polls) => {
    this.setState({ polls });
  };

  updatePolls = () => {
    this.yonApi.getPollsByFlow(this.props.openedFlow).then(this.onPollsUpdated);
  };

  render() {
    const { polls, isLoading } = this.state;

    const spinner = isLoading && <Spinner />;
    const pollsContent = <PollsView polls={polls} />;

    return <div className="app-body">{spinner || pollsContent}</div>;
  }
}

export default AppBody;
