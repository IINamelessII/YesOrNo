import { Poll, Votable, User } from '../../../types';

export const getVoteRateData = (userdata: User) => (poll: Poll) =>
  userdata.is_auth
    ? {
        voted: (userdata.voted['+'].has(poll.id)
          ? '+'
          : userdata.voted['-'].has(poll.id)
          ? '-'
          : undefined) as Votable | undefined,
        rated: (userdata.rated['+'].has(poll.id)
          ? '+'
          : userdata.rated['-'].has(poll.id)
          ? '-'
          : undefined) as Votable | undefined,
      }
    : {};
