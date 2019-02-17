import React from 'react';

import { YonApiService } from '../../services';
import PollsView from './PollsView';

import './AppBody.scss';

class AppBody extends React.Component {
  yonApi = new YonApiService();

  state = {
    polls: [],
    pollsLoading: true,
  };

  componentDidUpdate(prevProps) {
    if (this.props.selectedFlow !== prevProps.selectedFlow) {
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
        .getPollsByFlow(this.props.selectedFlow)
        .then(this.onPollsUpdated);
    });
  };

  render() {
    const { polls, pollsLoading } = this.state;
    const { selectedFlow } = this.props;

    return (
      <div className="app-body">
        <PollsView
          isLoading={pollsLoading}
          polls={polls}
          flowName={selectedFlow}
        />
      </div>
    );
  }
}

export default AppBody;
