import React, { useContext } from 'react';

import { usePolls } from '../../hooks';
import { UserdataContext } from '../../contexts';

import Poll from './Poll/Poll';
import NewPoll from './NewPoll';
import Spinner from '../Spinner';

import './Polls.scss';

export type Props = {
  selectedFlow: string;
};

const Polls = ({ selectedFlow }: Props) => {
  const { userdata } = useContext(UserdataContext);
  const { pollData, pollsLoading, addPoll, error } = usePolls(selectedFlow);

  // if (error) throw error;

  if (pollsLoading) return <Spinner mimicClass="polls" />;

  if (!userdata.is_auth && pollData.length === 0) {
    return (
      <span className="polls__empty-message" key="poll-empty">
        Whoops! No polls here! <span className="text--accent">Sign in</span> to
        add the first one!
      </span>
    );
  }

  const pollElements = pollData.map(({ poll, voteRateData, voteFunctions }) => {
    return (
      <Poll
        poll={poll}
        key={`poll-${poll.id}`}
        is_auth={userdata.is_auth}
        {...voteRateData}
        {...voteFunctions}
      />
    );
  });

  if (userdata.is_auth) {
    pollElements.unshift(
      <NewPoll key="poll-new" selectedFlow={selectedFlow} addPoll={addPoll} />
    );
  }

  return <section className="polls">{pollElements}</section>;
};

export default Polls;
