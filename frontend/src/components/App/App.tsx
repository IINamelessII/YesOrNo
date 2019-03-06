import React from 'react';

import { yonFetch } from '../../services';
import { Flow, User } from '../../types';
import { UserdataContext, ProfileUpdateContext } from '../../contexts';

import Header from '../Header';
import SideMenu from '../SideMenu';
import AppBody from '../AppBody';

import './App.scss';

// TODO: implement cool loading animation

// in case of no internet connection
// #region
const pollId = ((counter = 0) => () => counter++)();
const flowId = ((counter = 0) => () => counter++)();

// eslint-disable-next-line
const pollsMy = [
  {
    id: pollId(),
    flow: 'Ukraine',
    statement: 'Україна це залупа?',
    agree: 2,
    disagree: 1,
    likes: 10,
    dislikes: 5,
  },
  {
    id: pollId(),
    flow: 'Science',
    statement: 'Do you like VT?',
    agree: 5,
    disagree: 1,
    likes: 10,
    dislikes: 5,
  },
  {
    id: pollId(),
    flow: 'Science',
    statement: 'Mnogonozhka?',
    agree: 0,
    disagree: 0,
    likes: 0,
    dislikes: 0,
  },
];
// eslint-disable-next-line
const flowsMy = [
  { id: flowId(), name: 'Ukraine' },
  { id: flowId(), name: 'Bikes' },
  { id: flowId(), name: 'Anime' },
  { id: flowId(), name: 'Politics' },
  { id: flowId(), name: 'Science' },
  { id: flowId(), name: 'Sport' },
  { id: flowId(), name: 'Health' },
  { id: flowId(), name: 'Videogames' },
];
// #endregion

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
