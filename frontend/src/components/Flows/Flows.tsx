import React, { useContext, useMemo } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import { FlowsContext } from '../../contexts';

import H1 from '../H1';
import Button from '../Button';
import Spinner from '../Spinner';

import './Flows.scss';

type Props = {
  selectedFlow: string | undefined;
} & RouteComponentProps;

const Flows = ({ history, selectedFlow }: Props) => {
  const { flows, flowsLoading } = useContext(FlowsContext);

  return useMemo(() => {
    const isEmpty = flows.length === 0;

    const flowsList = isEmpty ? (
      <div className="flow">Whoops! No flows!</div>
    ) : (
      [
        <Button
          className="flow"
          key="flow-all"
          label="All"
          onClick={() => history.push(`/polls`)}
          secondary={selectedFlow === 'All polls'}
          flat
        />,
        ...flows.map((flow) => (
          <Button
            className="flow"
            key={`flow-${flow.id}`}
            label={flow.name}
            secondary={flow.name === selectedFlow}
            onClick={() =>
              history.push(`/polls/${flow.name.split(' ').join('_')}`)
            }
          />
        )),
      ]
    );

    return flowsLoading ? (
      <Spinner mimicClass="flows" />
    ) : (
      <div className="flows">
        <H1>Choose a flow</H1>
        {flowsList}
      </div>
    );
  }, [flowsLoading, selectedFlow]);
};

export default withRouter(Flows);
