import { useState, useEffect } from 'react';

import { Flow } from '../types';
import { yonFetch } from '../services';

export const useFlows = () => {
  const [flows, setFlows] = useState([] as Flow[]);
  const [loading, setLoading] = useState(true);

  const fetchFlows = () => {
    setLoading(true);
    yonFetch.getFlows().then((flows) => {
      setFlows(flows);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchFlows();
  }, []);

  return {
    flows,
    flowsLoading: loading,
  };
};
