import React from 'react';
import { User } from '../types';

export const UserdataContext = React.createContext({
  userdata: { is_auth: false, message: null } as User,
  updateProfile: (() => Promise.resolve({} as User)) as () => Promise<any>,
});
