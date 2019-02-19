import React, { useContext } from 'react';

import { withSpinner } from '../../hoc';
import { Poll as PollType, Votable } from '../../../types';
import { UserdataContext } from '../../../contexts';

import Poll from './Poll';

import './PollsView.scss';

type Props = {
  polls: Array<PollType>;
};

const PollsView = ({ polls }: Props) => {
  const userdata = useContext(UserdataContext);

  const votedIDs = userdata.is_auth
    ? Object.keys(userdata.voted).map((val) => +val)
    : [];
  const ratedIDs = userdata.is_auth
    ? Object.keys(userdata.rated).map((val) => +val)
    : [];

  const pollElements = polls.map((poll, idx) => {
    const isVoted = votedIDs.includes(poll.id);
    const isRated = ratedIDs.includes(poll.id);

    const voteRateData = userdata.is_auth
      ? {
          voted: isVoted
            ? ((userdata.voted[poll.id] ? '+' : '-') as Votable)
            : undefined,
          rated: isRated
            ? ((userdata.rated[poll.id] ? '+' : '-') as Votable)
            : undefined,
        }
      : {};

    return (
      <Poll
        poll={poll}
        key={poll.id}
        is_auth={userdata.is_auth}
        {...voteRateData}
      />
    );
  });

  return (
    <section className="polls">
      {polls.length > 0 ? (
        pollElements
      ) : (
        <span className="polls__empty-message">Whoops! No polls here!</span>
      )}
    </section>
  );
};

export default withSpinner(PollsView);
