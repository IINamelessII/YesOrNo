import React from 'react';

import { ResetPasswordProps } from '../types';

import Input from '../../../Input';

export const ResetPassword = ({
  values,
  errors,
  onInputChange,
}: ResetPasswordProps) => {
  return (
    <>
      <Input
        name="email"
        label="Email to send password to"
        error={errors.email}
        value={values.email}
        onChange={onInputChange}
      />
    </>
  );
};
