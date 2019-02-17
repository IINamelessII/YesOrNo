import React from 'react';

import { classNames } from '../../../../utilities';

import './Flow.scss';

class Flow extends React.Component {
  shouldComponentUpdate({ flow: { id }, selected }) {
    return id !== this.props.flow.id || selected !== this.props.selected;
  }

  onChangeFlow = () => {
    const { flow, handleSelectFlow } = this.props;

    handleSelectFlow(flow);
  };

  render() {
    const { flow, selected } = this.props;
    return (
      <div
        className={classNames('flows__flow', {
          'flows__flow--selected': selected,
        })}
        onClick={this.onChangeFlow}
      >
        {flow.name}
      </div>
    );
  }
}

export default Flow;
