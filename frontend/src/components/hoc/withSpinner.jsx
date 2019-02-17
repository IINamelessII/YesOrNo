import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../Spinner';

const withSpinner = (Wrapped) =>
  class extends React.Component {
    static propTypes = {
      isLoading: PropTypes.bool.isRequired,
    };

    render() {
      const { isLoading, ...wrappedProps } = this.props;
      return <>{isLoading ? <Spinner /> : <Wrapped {...wrappedProps} />}</>;
    }
  };

export default withSpinner;
