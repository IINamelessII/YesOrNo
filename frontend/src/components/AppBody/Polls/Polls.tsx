import React from 'react';

import { yonFetch } from '../../../services';
import { Poll } from '../../../types';

import PollsView from './PollsView';
import Spinner from '../../Spinner';

type Props = {
  selectedFlow: string;
};

type State = {
  polls: Poll[];
  loading: boolean;
};

class Polls extends React.Component<Props, State> {
  state: State = {
    polls: [],
    loading: true,
  };

  componentDidMount() {
    this.updatePolls();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.selectedFlow !== prevProps.selectedFlow) {
      this.updatePolls();
    }
  }

  updatePolls = () => {
    if (this.props.selectedFlow) {
      this.setState({ polls: [], loading: true }, async () => {
        const polls = await yonFetch.getPollsByFlow(this.props.selectedFlow);

        this.setState({ polls, loading: false });
      });
    }
  };

  render() {
    const { polls, loading } = this.state;

    return loading ? (
      <Spinner mimicClass="polls" />
    ) : (
      <PollsView polls={polls} />
    );
  }
}

export default Polls;
