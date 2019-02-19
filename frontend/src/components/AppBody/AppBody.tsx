import React from 'react';

import { YonApiService } from '../../services';
import { Poll, User } from '../../types';

import PollsView from './PollsView';
import GreetingPage from './GreetingPage';
import AppBodyHeader from './AppBodyHeader';

import './AppBody.scss';

type Props = {
  selectedFlow: string | null;
  userdata: User;
};

type State = {
  polls: Poll[];
  pollsLoading: boolean;
};

class AppBody extends React.Component<Props, State> {
  yonApi = new YonApiService();

  state = {
    polls: [],
    pollsLoading: true,
  };

  componentDidUpdate(prevProps: Props) {
    if (this.props.selectedFlow !== prevProps.selectedFlow) {
      this.updatePolls();
    }
  }

  componentDidMount() {
    this.updatePolls();
  }

  onPollsUpdated = (polls: Poll[]) => {
    this.setState({ polls, pollsLoading: false });
  };

  updatePolls = () => {
    if (this.props.selectedFlow) {
      this.setState({ polls: [], pollsLoading: true }, () => {
        this.yonApi
          .getPollsByFlow(this.props.selectedFlow as string)
          .then(this.onPollsUpdated);
      });
    }
  };

  render() {
    const { polls, pollsLoading } = this.state as State;
    const { selectedFlow } = this.props as Props;

    const contentView =
      selectedFlow !== null ? (
        <>
          <AppBodyHeader label={selectedFlow} />
          <PollsView loading={pollsLoading} polls={polls} />
        </>
      ) : (
        <GreetingPage />
      );

    return <div className="app-body">{contentView}</div>;
  }
}

export default AppBody;
