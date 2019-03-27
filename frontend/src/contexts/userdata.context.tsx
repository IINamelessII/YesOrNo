import React from 'react';
import { User } from '../types';

const initialUserdata = { is_auth: false, message: null } as User;

export const UserdataContext = React.createContext({
  userdata: initialUserdata,
  updateProfile: (change?: User) => Promise.resolve(initialUserdata),
});
