import React, { useContext } from 'react';

import { Poll as PollType, Votable, VoteFunctions } from '../../../types';
import { UserdataContext } from '../../../contexts';

import Poll from './Poll';

import './PollsView.scss';

type Props = {
  pollData: Array<{
    poll: PollType;
    voteRateData: { voted?: Votable; rated?: Votable };
    voteFunctions: VoteFunctions;
  }>;
};

const PollsView = ({ pollData }: Props) => {
  const { userdata } = useContext(UserdataContext);

  const content =
    pollData.length > 0 ? (
      pollData.map(({ poll, voteRateData, voteFunctions }) => {
        return (
          <Poll
            poll={poll}
            key={poll.id}
            is_auth={userdata.is_auth}
            {...voteRateData}
            {...voteFunctions}
          />
        );
      })
    ) : (
      <span className="polls__empty-message">Whoops! No polls here!</span>
    );

  return <section className="polls">{content}</section>;
};

export default PollsView;
