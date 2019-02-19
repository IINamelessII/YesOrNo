import React from 'react';

import Flows from '../Flows';

import './SideMenu.scss';

type Props = {
  flowsProps: {
    selectedFlow: string | null;
    handleSelectFlow: (flowName: string) => void;
  };
  loggedIn: boolean;
};

class SideMenu extends React.Component<Props, {}> {
  render() {
    const { flowsProps } = this.props;

    return (
      <nav className="sidemenu">
        <Flows {...flowsProps} />
      </nav>
    );
  }
}

export default SideMenu;
