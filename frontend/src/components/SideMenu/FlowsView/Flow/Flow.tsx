import React from 'react';

import { classNames } from '../../../../utilities';
import { Flow } from '../../../../types';

import './Flow.scss';

type Props = {
  flow: Flow;
  selected: boolean;
  handleSelectFlow: (flow: Flow) => void;
};

export default class extends React.Component<Props, {}> {
  shouldComponentUpdate({ flow: { id }, selected }: Props) {
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
