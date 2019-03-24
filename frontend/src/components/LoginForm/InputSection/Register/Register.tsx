import React from 'react';

import { RegisterProps } from '../types';

import Input from '../../../Input';

export const Register = ({ values, errors, onInputChange }: RegisterProps) => {
  return (
    <>
      <Input
        name="email"
        label="Email"
        error={errors.email}
        value={values.email}
        onChange={onInputChange}
      />

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
