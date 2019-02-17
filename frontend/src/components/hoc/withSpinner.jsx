import React from 'react';

import Spinner from '../Spinner';

const withLoader = (Wrapped) => ({ isLoading, ...wrappedProps }) => {
  return <>{isLoading ? <Spinner /> : <Wrapped {...wrappedProps} />}</>;
};

export default withLoader;
