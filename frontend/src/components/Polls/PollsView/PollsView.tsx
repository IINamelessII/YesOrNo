import React, { useContext } from 'react';

import { Poll as PollType, Votable, VoteFunctions } from '../../../types';
import { UserdataContext } from '../../../contexts';

import Poll from '../Poll';
import NewPoll from '../NewPoll';

import './PollsView.scss';

type Props = {
  selectedFlow: string;
  addPoll: (statement: string) => Promise<any>;
  pollData: Array<{
    poll: PollType;
    voteRateData: { voted?: Votable; rated?: Votable };
    voteFunctions: VoteFunctions;
  }>;
};

const PollsView = ({ pollData, selectedFlow, addPoll }: Props) => {
  const { userdata } = useContext(UserdataContext);

  const content = [
    userdata.is_auth ? (
      <NewPoll
        key="poll-new"
        selectedFlow={selectedFlow}
        addPoll={addPoll}
      />
    ) : pollData.length === 0 ? (
      <span className="polls__empty-message" key="poll-empty">
        Whoops! No polls here! <span className="text--accent">Sign in</span> to
        add the first one!
      </span>
    ) : null,
    ,
    ...pollData.map(({ poll, voteRateData, voteFunctions }) => {
      return (
        <Poll
          poll={poll}
          key={`poll-${poll.id}`}
          is_auth={userdata.is_auth}
          {...voteRateData}
          {...voteFunctions}
        />
      );
    }),
  ];

  return <section className="polls">{content}</section>;
};

export default PollsView;
