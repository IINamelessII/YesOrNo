import React from 'react';

import { SignInProps } from '../types';

import Input from '../../../Input';

export const SignIn = ({ values, errors, onInputChange }: SignInProps) => {
  return (
    <>
      <Input
        name="username"
        label="Username"
        error={errors.username}
        value={values.username}
        onChange={onInputChange}
      />

      <Input
        type="password"
        name="password"
        label="Password"
        error={errors.password}
        value={values.password}
        onChange={onInputChange}
      />
    </>
  );
};
