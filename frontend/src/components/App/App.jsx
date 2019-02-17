import React, { Component } from 'react';
import { YonApiService } from '../../services';

import Header from '../Header';
import SideMenu from '../SideMenu';
import AppBody from '../AppBody';

import './App.scss';

// in case of no internet connection
// #region
const pollId = ((counter = 0) => () => counter++)();
const flowId = ((counter = 0) => () => counter++)();

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

class App extends Component {
  yonApi = new YonApiService();

  state = {
    flows: [],
    flowsLoading: true,
    openedFlow: 'Ukraine',
  };

  componentDidMount() {
    // fetch flows
    this.updateFlows();
  }

  onFlowsLoaded = (flows) => {
    this.setState({ flows, flowsLoading: false });
  };

  updateFlows = () => {
    this.yonApi.getFlows().then(this.onFlowsLoaded);
  };

  handleSelectFlow = (flow) => {
    this.setState({ openedFlow: flow.name });
  };

  render() {
    const { flows, flowsLoading, openedFlow } = this.state;

    const flowsViewProps = {
      isLoading: flowsLoading,
      flows,
      handleSelectFlow: this.handleSelectFlow,
    };

    return (
      <div className="app">
        <Header />
        <SideMenu flowsViewProps={flowsViewProps} />
        <AppBody openedFlow={openedFlow} />
      </div>
    );
  }
}

export default App;
