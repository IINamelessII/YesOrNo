export type AuthenticatedUser = {
  is_auth: true;
  username: string;
  voted: any;
  rated: any;
};

export type UnauthenticatedUser = {
  is_auth: false;
};

export type User = UnauthenticatedUser | AuthenticatedUser;
