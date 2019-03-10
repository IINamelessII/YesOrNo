import React from 'react';

import AppBodyHeader from './AppBodyHeader';
import GreetingPage from './GreetingPage';
import Polls from './Polls';

import './AppBody.scss';

type Props = {
  selectedFlow: string | null;
};

const AppBody = ({ selectedFlow }: Props) => {
  const contentView =
    selectedFlow !== null ? (
      <>
        <AppBodyHeader label={selectedFlow} />
        <Polls selectedFlow={selectedFlow} />
      </>
    ) : (
      <GreetingPage />
    );

  return <div className="app-body">{contentView}</div>;
};

export default AppBody;
