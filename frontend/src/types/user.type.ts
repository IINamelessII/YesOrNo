type Votes = {
  '+': number[];
  '-': number[];
};

export type AuthenticatedUser = {
  is_auth: true;
  username: string;
  voted: Votes;
  rated: Votes;
};

export type UnauthenticatedUser = {
  is_auth: false;
};

export type User = UnauthenticatedUser | AuthenticatedUser;
