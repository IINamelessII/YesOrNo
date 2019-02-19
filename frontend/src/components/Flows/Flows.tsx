import React, { useState } from 'react';
import { YonApiService } from '../../services';

import { Flow as FlowType } from '../../types';
import Spinner from '../Spinner';
import Button from '../Button';

import './Flows.scss';

type Props = {
  selectedFlow: string | null;
  loggedIn?: boolean;
  handleSelectFlow: (flowName: string) => void;
};

type State = {
  flows: FlowType[] | null;
};

class Flows extends React.Component<Props, State> {
  yonAPI = new YonApiService();

  state: State = {
    flows: null,
  };

  componentDidMount() {
    this.yonAPI.getFlows().then((flows) => this.setState({ flows }));
  }

  render() {
    const { selectedFlow, handleSelectFlow, loggedIn = false } = this.props;
    const { flows } = this.state;

    if (flows === null) {
      return <Spinner mimicClass="flows" />;
    }

    const empty = flows.length === 0;

    const flowShow = empty ? (
      <div className="flow">Whoops! Empty!</div>
    ) : (
      flows.map((flow) => (
        <Button
          className="flow"
          key={`flow-${flow.id}`}
          label={flow.name}
          secondary={flow.name === selectedFlow}
          onClick={() => handleSelectFlow(flow.name)}
        />
      ))
    );

    return (
      <div className="flows">
        <div className="flows__splash">Choose a flow</div>
        <Button
          className="flow"
          label="+"
          onClick={() => console.log('puff!')}
          flat
        />
        {flowShow}
      </div>
    );
  }
}

export default Flows;

// export default React.memo(
//   Flows,
//   ({ selectedFlow, loggedIn }, props) =>
//     selectedFlow === props.selectedFlow || loggedIn === props.loggedIn
// );
