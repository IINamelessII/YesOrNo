import React from 'react';

import { YonApiService } from '../../services';
import Spinner from '../Spinner';
import PollsView from './PollsView';

import './AppBody.scss';

class AppBody extends React.Component {
  yonApi = new YonApiService();

  state = {
    polls: [],
    pollsLoading: true,
  };

  componentDidUpdate(prevProps) {
    if (this.props.openedFlow !== prevProps.openedFlow) {
      this.updatePolls();
    }
  }

  componentDidMount() {
    this.updatePolls();
  }

  onPollsUpdated = (polls) => {
    this.setState({ polls, pollsLoading: false });
  };

  updatePolls = () => {
    this.setState({ polls: [], pollsLoading: true }, () => {
      this.yonApi
        .getPollsByFlow(this.props.openedFlow)
        .then(this.onPollsUpdated);
    });
  };

  render() {
    const { polls, pollsLoading } = this.state;
    const { openedFlow } = this.props;

    return (
      <div className="app-body">
        <PollsView
          isLoading={pollsLoading}
          polls={polls}
          flowName={openedFlow}
        />
      </div>
    );
  }
}

export default AppBody;
