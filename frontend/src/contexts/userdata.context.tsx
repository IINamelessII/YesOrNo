import React from 'react';
import { User } from '../types';

export const UserdataContext = React.createContext({ is_auth: false } as User);
