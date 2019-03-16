import React from 'react';

import Spinner from '../../Spinner';

type Props = {
  loading: boolean;
};

export const withSpinner = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return ({ loading, ...props }: P & Props) =>
    loading ? <Spinner /> : <Component {...props as P} />;
};
