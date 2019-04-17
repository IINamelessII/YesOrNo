import React from 'react';

import Flows from '../Flows';

import './SideMenu.scss';

type Props = {
  selectedFlow?: string;
};

const SideMenu = ({ selectedFlow }: Props) => {
  return (
    <nav className="sidemenu">
      <Flows selectedFlow={selectedFlow} />
    </nav>
  );
};

export default React.memo(
  SideMenu,
  ({ selectedFlow: SF }, { selectedFlow: newSF }) => SF === newSF
);
