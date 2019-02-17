import React from 'react';

import FlowsView from './FlowsView';
import { Flow } from '../../types';

import './SideMenu.scss';

type Props = {
  flowsViewProps: {
    loading: boolean;
    flows: Flow[];
    selectedFlow: string;
    handleSelectFlow: (flow: Flow) => void;
  };
};

class SideMenu extends React.Component<Props, {}> {
  render() {
    const { flowsViewProps } = this.props;

    return (
      <nav className="sidemenu">
        <FlowsView {...flowsViewProps} />
      </nav>
    );
  }
}

export default SideMenu;
