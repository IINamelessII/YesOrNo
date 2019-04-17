import React from 'react';
import { Flow } from '../types';

type Content = {
  flows: Flow[];
  flowsLoading: boolean;
};

export const FlowsContext = React.createContext({
  flows: [] as Flow[],
  flowsLoading: true,
} as Content);
