import React, { useContext } from 'react';
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

  if (flowsLoading) return <Spinner mimicClass="flows" />;

  const isEmpty = flows.length === 0;

  const flowShow = isEmpty ? (
    <div className="flow">Whoops! No flows!</div>
  ) : (
    flows.map((flow) => (
      <Button
        className="flow"
        key={`flow-${flow.id}`}
        label={flow.name}
        secondary={flow.name === selectedFlow}
        onClick={() => history.push(`/polls/${flow.name.split(' ').join('_')}`)}
      />
    ))
  );

  return (
    <div className="flows">
      <H1>Choose a flow</H1>
      {!isEmpty && (
        <Button
          className="flow"
          key="flow-all"
          label="All"
          onClick={() => history.push(`/polls`)}
          secondary={selectedFlow === 'All polls'}
          flat
        />
      )}
      {flowShow}
    </div>
  );
};

export default withRouter(Flows);
