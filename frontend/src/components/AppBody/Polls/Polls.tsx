import React from 'react';

import { yonFetch, yonVote } from '../../../services';
import { Poll, User, Votable, VoteFunctions } from '../../../types';

import PollsView from './PollsView';
import Spinner from '../../Spinner';

type Props = {
  selectedFlow: string;
  userdata: User;
  updateProfile: () => void;
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
    this.updatePollsHard();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.selectedFlow !== prevProps.selectedFlow) {
      this.updatePollsHard();
    }
  }

  updatePollsHard = () => {
    this.setState({ polls: [], loading: true }, () => {
      yonFetch
        .getPollsByFlow(this.props.selectedFlow)
        .then((polls) => this.setState({ polls, loading: false }));
    });
  };

  updatePolls = () => {
    yonFetch
      .getPollsByFlow(this.props.selectedFlow)
      .then((polls) => this.setState({ polls, loading: false }));
  };

  createVoteFunctions = (pollId: number) => {
    const { updateProfile } = this.props;

    const voteFunction = (voteFn: (pollId: number) => Promise<any>) => () =>
      voteFn(pollId).then(() => {
        updateProfile && updateProfile();
        this.updatePolls();
      });

    return {
      voteYes: voteFunction(yonVote.voteYes),
      voteNo: voteFunction(yonVote.voteNo),
      rateLike: voteFunction(yonVote.rateLike),
      rateDislike: voteFunction(yonVote.rateDislike),
    } as VoteFunctions;
  };

  createPollData = () => {
    const { userdata } = this.props;
    const { polls } = this.state;

    return polls.map((poll) => {
      const voteRateData = userdata.is_auth
        ? {
            voted: (userdata.voted['+'].includes(poll.id)
              ? '+'
              : userdata.voted['-'].includes(poll.id)
              ? '-'
              : undefined) as Votable | undefined,
            rated: (userdata.rated['+'].includes(poll.id)
              ? '+'
              : userdata.rated['-'].includes(poll.id)
              ? '-'
              : undefined) as Votable | undefined,
          }
        : {};

      return {
        poll,
        voteRateData,
        voteFunctions: this.createVoteFunctions(poll.id),
      };
    });
  };

  render() {
    const { loading } = this.state;

    return loading ? (
      <Spinner mimicClass="polls" />
    ) : (
      <PollsView pollData={this.createPollData()} />
    );
  }
}

export default Polls;
