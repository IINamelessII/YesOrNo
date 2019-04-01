import React from 'react';

import Flows from '../Flows';

import './SideMenu.scss';

type Props = {
  selectedFlow?: string;
};

class SideMenu extends React.Component<Props, {}> {
  render() {
    const { selectedFlow } = this.props;

    return (
      <nav className="sidemenu">
        <Flows selectedFlow={selectedFlow} />
      </nav>
    );
  }
}

export default SideMenu;
