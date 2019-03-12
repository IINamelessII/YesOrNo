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
  1. Add dislike button to LikeSection
  2. Implement ability to add new polls to flow
  3. Add Reset Password functionality
  4. 
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
    },
  };

  componentDidMount() {
    this.updateProfile();
  }

  updateProfile = () => {
    yonFetch.getUserdata().then((userdata) => this.setState({ userdata }));
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
