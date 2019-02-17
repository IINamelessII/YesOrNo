import React from 'react';

import Spinner from '../Spinner';

type Props = {
  loading: boolean;
};

const withSpinner = <P extends object>(Component: React.ComponentType<P>) => {
  return ({ loading, ...props }: P & Props) =>
    loading ? <Spinner /> : <Component {...props as P} />;
};

export default withSpinner;
