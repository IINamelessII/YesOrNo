import React from 'react';

import {
  SignInProps,
  RegisterProps,
  ResetPasswordProps,
} from './input-props.type';
import { Process } from '../process.type';

import { SignIn } from './SignIn';
import { Register } from './Register';
import { ResetPassword } from './ResetPassword';

type Props = {
  process: Process;
} & (SignInProps | RegisterProps | ResetPasswordProps);

export const InputSection = ({ process, errors, ...props }: Props) => {
  switch (process) {
    case 'signin':
      return <SignIn errors={{}} {...props as SignInProps} />;
    case 'signup':
      return <Register errors={errors} {...props as RegisterProps} />;
    case 'resetpassword':
      return <ResetPassword errors={{}} {...props as ResetPasswordProps} />;
    default:
      throw 'Process error in InputSection';
  }
};
