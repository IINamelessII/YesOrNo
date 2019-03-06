import React, { useContext } from 'react';

import { withSpinner } from '../../hoc';
import { Poll as PollType, Votable } from '../../../types';
import { UserdataContext, ProfileUpdateContext } from '../../../contexts';

import Poll from './Poll';

import './PollsView.scss';

type Props = {
  polls: Array<PollType>;
};

const PollsView = ({ polls }: Props) => {
  const userdata = useContext(UserdataContext);
  const profileUpdate = useContext(ProfileUpdateContext);

  const pollElements = polls.map((poll) => {
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

    return (
      <Poll
        poll={poll}
        key={poll.id}
        is_auth={userdata.is_auth}
        profileUpdate={profileUpdate}
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
