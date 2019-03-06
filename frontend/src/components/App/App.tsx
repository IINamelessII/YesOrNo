import React from 'react';

import { yonFetch } from '../../services';
import { Flow, User } from '../../types';
import { UserdataContext, ProfileUpdateContext } from '../../contexts';

import Header from '../Header';
import SideMenu from '../SideMenu';
import AppBody from '../AppBody';

import './App.scss';

// TODO: implement cool loading animation

type State = {
  selectedFlow: string | null;
  userdata: User;
};

class App extends React.Component<{}, State> {
  state: State = {
    selectedFlow: null,
    userdata: {
      is_auth: false,
    },
  };

  componentDidMount() {
    this.updateProfile();
  }

  updateProfile = () => {
    yonFetch
      .getUserdata()
      .then((userdata) =>
        this.setState({ userdata }, () => console.log(this.state.userdata))
      );
  };

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
        <UserdataContext.Provider value={userdata}>
          <ProfileUpdateContext.Provider value={this.updateProfile}>
            <Header />

            <SideMenu flowsProps={flowsProps} loggedIn={userdata.is_auth} />

            <AppBody selectedFlow={selectedFlow} userdata={userdata} />
          </ProfileUpdateContext.Provider>
        </UserdataContext.Provider>
      </div>
    );
  }
}

export default App;
