import React from 'react';

import { usePolls } from './hooks';

import Spinner from '../Spinner';
import PollsView from './PollsView';

export type Props = {
  selectedFlow: string;
};

const Polls = ({ selectedFlow }: Props) => {
  const { pollData, loading, addPoll, error } = usePolls(selectedFlow);

  return loading ? (
    <Spinner mimicClass="polls" />
  ) : (
    <PollsView
      pollData={pollData}
      selectedFlow={selectedFlow}
      addPoll={addPoll}
    />
  );
};

export default Polls;
