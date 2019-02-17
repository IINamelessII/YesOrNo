import React from 'react';

import { withSpinner } from '../../hoc';
import Flow from './Flow';

import './FlowsView.scss';

class FlowsView extends React.Component {
  render() {
    const { flows, handleSelectFlow, selectedFlow } = this.props;
    return (
      <div className="flows">
        <div className="flows__splash">Choose a flow</div>
        {flows.map((flow) => (
          <Flow
            key={`flow-${flow.id}`}
            flow={flow}
            selected={flow.name === selectedFlow}
            handleSelectFlow={handleSelectFlow}
          />
        ))}
      </div>
    );
  }
}

export default withSpinner(FlowsView);
