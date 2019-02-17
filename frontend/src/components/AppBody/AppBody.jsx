import React from 'react';

import { YonApiService } from '../../services';
import PollsView from './PollsView';

import './AppBody.scss';

class AppBody extends React.Component {
  yonApi = new YonApiService();

  state = {
    polls: [],
    pollsLoading: true,
  };

  componentDidUpdate(prevProps) {
    if (this.props.selectedFlow !== prevProps.selectedFlow) {
      this.updatePolls();
    }
  }

  componentDidMount() {
    this.updatePolls();
  }

  onPollsUpdated = (polls) => {
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
    const { polls, pollsLoading } = this.state;
    const { selectedFlow } = this.props;

    return (
      <div className="app-body">
        <h1 className="polls__flow-name">{selectedFlow}</h1>
        <PollsView isLoading={pollsLoading} polls={polls} />
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
//         isLoading={polls.length > 0}
//         polls={polls}
//         flowName={selectedFlow}
//       />
//     </div>
//   );
// };

export default AppBody;
