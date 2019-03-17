import React from 'react';

import { UserdataContext } from '../../contexts';

import H1 from '../H1';
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
        <H1>{selectedFlow}</H1>
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
