import React from 'react';

import { withSpinner } from '../../hoc';
import Poll from './Poll';

import './PollsView.scss';

const PollsView = ({ polls, flowName }) => {
  return (
    <section className="polls">
      <h1 className="polls__flow-name">{flowName}</h1>
      {polls.length > 0 ? (
        polls.map((poll) => <Poll poll={poll} />)
      ) : (
        <span className="polls__empty-message">Whoops! No polls here!</span>
      )}
    </section>
  );
};

export default withSpinner(PollsView);
