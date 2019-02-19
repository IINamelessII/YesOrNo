import React from 'react';

import { YonApiService } from '../../services';
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
  yonApi = new YonApiService();

  state: State = {
    selectedFlow: null,
    userdata: {
      is_auth: false,
    },
    // userdata: {
    //   is_auth: true,
    //   username: 'BANANAN_CHIK',
    //   voted: { 0: true, 5: true, 6: true, 7: false, 8: false, 10: false },
    //   rated: { 0: true, 5: true, 6: true, 7: false, 8: false, 10: false },
    // },
  };

  componentDidMount() {
    this.updateProfile();
  }

  updateProfile = () => {
    this.yonApi
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
          </ProfileUpdateContext.Provider>

          <SideMenu flowsProps={flowsProps} loggedIn={userdata.is_auth} />

          <AppBody selectedFlow={selectedFlow} userdata={userdata} />
        </UserdataContext.Provider>
      </div>
    );
  }
}

export default App;
