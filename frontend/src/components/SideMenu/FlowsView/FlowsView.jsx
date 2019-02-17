import React from 'react';

import { withSpinner } from '../../hoc';
import Flow from './Flow';

import './FlowsView.scss';

class FlowsView extends React.Component {
  render() {
    const { flows, handleOpenFlow } = this.props;
    return (
      <div className="flows">
        {flows.map((flow) => (
          <Flow
            key={`flow-${flow.id}`}
            flow={flow}
            handleOpenFlow={handleOpenFlow}
          />
        ))}
      </div>
    );
  }
}

export default withSpinner(FlowsView);
