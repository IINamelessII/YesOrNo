import React from 'react';

import { withSpinner } from '../../hoc';
import { Poll as PollType } from '../../../types';
import Poll from './Poll';

import './PollsView.scss';

// TODO: bring here Poll type!

type Props = {
  polls: Array<PollType>;
};

const PollsView = ({ polls }: Props) => {
  const pollElements = polls.map((poll) => <Poll poll={poll} key={poll.id} />);

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
