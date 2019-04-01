import { useState, useEffect } from 'react';

import { User } from '../types';
import { yonFetch } from '../services';

export const useUserdata = () => {
  const [userdata, setUserdata] = useState({
    is_auth: false,
    message: null,
  } as User);

  const updateProfile = async (change?: User) => {
    if (change) {
      setUserdata(change);
      return change;
    }

    const userdata = await yonFetch.getUserdata();
    setUserdata(userdata);
    return userdata;
  };

  useEffect(() => {
    updateProfile();
  }, []);

  return { userdata, updateProfile };
};
