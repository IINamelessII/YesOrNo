import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import Button from '../Button';

import './ErrorBoundary.scss';

type State = {
  error: string | boolean | null;
};

type Props = RouteComponentProps;

class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    error: null,
  };

  componentDidCatch(err: any, info: any) {
    this.setState({ error: err });
  }

  refresh = () => {
    this.props.history.push('/home');
    document.location.reload();
  };

  render() {
    const { error } = this.state;

    if (error) {
      return (
        <div className="error-boundary">
          <span className="error-boundary__headline">Whoops!</span>

          <span className="error-boundary__message">
            Seems like something went wrong!
          </span>

          <Button
            className="error-boundary__refresh"
            label="Refresh"
            onClick={this.refresh}
          />

          <span className="error-boundary__reason">Reason: {error}</span>
        </div>
      );
    }

    return this.props.children;
  }
}

export default withRouter((routerProps) => <ErrorBoundary {...routerProps} />);
