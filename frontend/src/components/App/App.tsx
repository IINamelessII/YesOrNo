import React from 'react';
import { YonApiService } from '../../services';

import Header from '../Header';
import SideMenu from '../SideMenu';
import AppBody from '../AppBody';
import { Flow } from '../../types';

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
  flows: Flow[];
  flowsLoading: boolean;
  selectedFlow: string;
};

class App extends React.Component<{}, State> {
  yonApi = new YonApiService();

  state: State = {
    flows: [],
    flowsLoading: true,
    selectedFlow: 'Ukraine',
  };

  componentDidMount() {
    // fetch flows
    this.updateFlows();
  }

  onFlowsLoaded = (flows: Flow[] = []) => {
    this.setState({ flows, flowsLoading: false });
  };

  updateFlows = () => {
    this.yonApi.getFlows().then(this.onFlowsLoaded);
  };

  handleSelectFlow = (flow: Flow) => {
    this.setState({ selectedFlow: flow.name });
  };

  render() {
    const { flows, flowsLoading, selectedFlow } = this.state;

    const flowsViewProps = {
      loading: flowsLoading,
      flows,
      selectedFlow,
      handleSelectFlow: this.handleSelectFlow,
    };

    return (
      <div className="app">
        <Header />
        <SideMenu flowsViewProps={flowsViewProps} />
        <AppBody selectedFlow={selectedFlow} />
      </div>
    );
  }
}

export default App;
