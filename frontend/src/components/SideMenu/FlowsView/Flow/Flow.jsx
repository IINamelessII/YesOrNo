import React from 'react';

import './Flow.scss';

class Flow extends React.Component {
  shouldComponentUpdate({ flow: { id } }) {
    return id !== this.props.id;
  }

  onChangeFlow = () => {
    const { flow, handleOpenFlow } = this.props;

    handleOpenFlow(flow);
  };

  render() {
    const { flow } = this.props;
    return (
      <div className="flows__flow" onClick={this.onChangeFlow}>
        {flow.name}
      </div>
    );
  }
}

export default Flow;
