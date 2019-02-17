import React from 'react';

import { withSpinner } from '../../hoc';
import Flow from './Flow';

import './FlowsView.scss';

class FlowsView extends React.Component {
  render() {
    const { flows, handleSelectFlow } = this.props;
    return (
      <div className="flows">
        {flows.map((flow) => (
          <Flow
            key={`flow-${flow.id}`}
            flow={flow}
            handleSelectFlow={handleSelectFlow}
          />
        ))}
      </div>
    );
  }
}

export default withSpinner(FlowsView);
