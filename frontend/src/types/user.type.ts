type Votes = {
  '+': Set<number>;
  '-': Set<number>;
};

export type AuthenticatedUser = {
  is_auth: true;
  username: string;
  voted: Votes;
  rated: Votes;
  message: string | null;
};

export type UnauthenticatedUser = {
  is_auth: false;
  message: string | null;
};

export type User = UnauthenticatedUser | AuthenticatedUser;
