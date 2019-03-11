import React from 'react';

import { UserdataContext } from '../../contexts';

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
        <UserdataContext.Consumer>
          {({ userdata, updateProfile }) => (
            <Polls
              selectedFlow={selectedFlow}
              userdata={userdata}
              updateProfile={updateProfile}
            />
          )}
        </UserdataContext.Consumer>
      </>
    ) : (
      <GreetingPage />
    );

  return <div className="app-body">{contentView}</div>;
};

export default AppBody;
