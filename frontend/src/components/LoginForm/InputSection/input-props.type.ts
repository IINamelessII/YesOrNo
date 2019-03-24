import React from 'react';

type ErrorMsg = string | boolean;

type InputHandler = {
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type SignIn<T = string> = {
  username: T;
  password: T;
};

type Register<T = string> = {
  email: T;
  username: T;
  password: T;
};

type ResetPassword<T = string> = {
  email: T;
};

export type SignInProps = {
  values: SignIn;
  errors: SignIn<ErrorMsg>;
} & InputHandler;

export type RegisterProps = {
  values: Register;
  errors: Register<ErrorMsg>;
} & InputHandler;

export type ResetPasswordProps = {
  values: ResetPassword;
  errors: ResetPassword<ErrorMsg>;
} & InputHandler;

export type FieldErrors =
  | SignIn<ErrorMsg>
  | Register<ErrorMsg>
  | ResetPassword<ErrorMsg>;
