import React from 'react';

import H1 from '../H1';
import Polls from '../Polls';
import GreetingPage from './GreetingPage';

import './AppBody.scss';

type Props = {
  selectedFlow: string | null;
};

const AppBody = ({ selectedFlow }: Props) => {
  const contentView =
    selectedFlow !== null ? (
      <>
        <H1>{selectedFlow}</H1>
        <Polls selectedFlow={selectedFlow} />
      </>
    ) : (
      <GreetingPage />
    );

  return <div className="app-body">{contentView}</div>;
};

export default AppBody;
