import React from 'react';

import { YonApiService } from '../../services';
import PollsView from './PollsView';
import { Poll } from '../../types';

import './AppBody.scss';

type Props = {
  selectedFlow: string;
};

type State = {
  polls: Poll[];
  pollsLoading: boolean;
};

class AppBody extends React.Component<Props, State> {
  yonApi = new YonApiService();

  state = {
    polls: [],
    pollsLoading: true,
  };

  componentDidUpdate(prevProps: Props) {
    if (this.props.selectedFlow !== prevProps.selectedFlow) {
      this.updatePolls();
    }
  }

  componentDidMount() {
    this.updatePolls();
  }

  onPollsUpdated = (polls: Poll[]) => {
    this.setState({ polls, pollsLoading: false });
  };

  updatePolls = () => {
    this.setState({ polls: [], pollsLoading: true }, () => {
      this.yonApi
        .getPollsByFlow(this.props.selectedFlow)
        .then(this.onPollsUpdated);
    });
  };

  render() {
    const { polls, pollsLoading } = this.state as State;
    const { selectedFlow } = this.props as Props;

    const pollsView = (
      <>
        <h1 className="polls__flow-name">{selectedFlow}</h1>
        <PollsView loading={pollsLoading} polls={polls} />
      </>
    );

    const greetingMessage = (
      <div className="app-body__greeting-message">Greeting!</div>
    );

    return (
      <div className="app-body">
        {selectedFlow ? pollsView : greetingMessage}
      </div>
    );
  }
}

// const usePollsByFlow = (flow) => {
//   const yonApi = new YonApiService();

//   const [polls, setPolls] = useState([]);

//   const updatePolls = () => {
//     setPolls([]);
//     yonApi.getPollsByFlow(flow).then((polls) => setPolls(polls));
//   };

//   return [polls, updatePolls];
// };

// const AppBody = ({ selectedFlow }) => {
//   const [polls, updatePolls] = usePollsByFlow(selectedFlow);

//   return (
//     <div className="app-body">
//       <PollsView
//         loading={polls.length > 0}
//         polls={polls}
//         flowName={selectedFlow}
//       />
//     </div>
//   );
// };

export default AppBody;
