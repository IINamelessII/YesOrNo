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

import './InputSection.scss';

type Props = {
  process: Process;
} & (SignInProps | RegisterProps | ResetPasswordProps);

export const InputSection = ({ process, errors, ...props }: Props) => {
  const sectionContent =
    process === 'signIn' ? (
      <SignIn errors={{}} {...props as SignInProps} />
    ) : process === 'register' ? (
      <Register errors={errors} {...props as RegisterProps} />
    ) : (
      <ResetPassword errors={{}} {...props as ResetPasswordProps} />
    );

  return <div className="input-section">{sectionContent}</div>;
};
