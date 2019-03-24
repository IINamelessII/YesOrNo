import React from 'react';

import { yonFetch } from '../../services';
import { User } from '../../types';
import { UserdataContext } from '../../contexts';

import Header from '../Header';
import SideMenu from '../SideMenu';
import AppBody from '../AppBody';

import './App.scss';

/* 
TODO:Roadmap 
  -! Implement polls sorting 
  -! Add Reset Password functionality 
  -! Add error boundaries
  -! Rework voting system into a state-based one
  -! Make design responsive
  - Add functionality to view polls created by user
  - Add ability to place custom vote labels on polls
  ...
  999. implement cool loading animation
*/

type State = {
  selectedFlow: string | null;
  userdata: User;
};

class App extends React.Component<{}, State> {
  state: State = {
    selectedFlow: null,
    userdata: {
      is_auth: false,
      message: null,
    },
  };

  componentDidMount() {
    this.updateProfile();
  }

  updateProfile = () =>
    yonFetch.getUserdata().then((userdata) => {
      this.setState({ userdata });
      return userdata;
    });

  handleSelectFlow = (flowName: string) => {
    this.setState({ selectedFlow: flowName });
  };

  render() {
    const { selectedFlow, userdata } = this.state;

    const flowsProps = {
      selectedFlow,
      handleSelectFlow: this.handleSelectFlow,
    };

    return (
      <div className="app">
        <UserdataContext.Provider
          value={{ userdata, updateProfile: this.updateProfile }}
        >
          <Header />

          <SideMenu flowsProps={flowsProps} loggedIn={userdata.is_auth} />

          <AppBody selectedFlow={selectedFlow} />
        </UserdataContext.Provider>
      </div>
    );
  }
}

export default App;
