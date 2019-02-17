import React from 'react';
import PropTypes from 'prop-types';

import FlowsView from './FlowsView';

import './SideMenu.scss';

class SideMenu extends React.Component {
  static propTypes = {
    flowsViewProps: PropTypes.shape({
      isLoading: PropTypes.bool,
      flows: PropTypes.array,
      handleSelectFlow: PropTypes.func,
    }).isRequired,
  };

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
