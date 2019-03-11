import React from 'react';
import { User } from '../types';

export const UserdataContext = React.createContext({
  userdata: { is_auth: false } as User,
  updateProfile: () => {},
});
