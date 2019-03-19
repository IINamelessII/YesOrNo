import React from 'react';

import { Votable, Poll as PollType, VoteFunctions } from '../../../../types';

import VoteBar from './VoteBar';
import LikeSection from './LikeSection';

import './Poll.scss';

// TODO: Implement cool loading dummy poll component wow cool

type Props = {
  poll: PollType;
  is_auth: boolean;
  voted?: Votable;
  rated?: Votable;
} & VoteFunctions;

const Poll = ({
  poll,
  is_auth,
  voted,
  rated,
  voteYes,
  voteNo,
  rateLike,
  rateDislike,
}: Props) => {
  return (
    <article className="poll">
      <span className="poll__statement">{poll.statement}</span>

      <VoteBar
        agreed={poll.agree}
        disagreed={poll.disagree}
        voted={voted}
        is_auth={is_auth}
        voteYes={voteYes}
        voteNo={voteNo}
      />
      {is_auth && (
        <LikeSection
          liked={poll.likes}
          disliked={poll.dislikes}
          rated={rated}
          rateLike={rateLike}
          rateDislike={rateDislike}
        />
      )}
    </article>
  );
};

type DummyProps = {
  poll?: PollType;
  is_auth?: boolean;
  voted?: Votable;
  rated?: Votable;
};

const dummyPollObj: PollType = {
  id: -1,
  statement: 'Wanna some dummy poll, huh?',
  flow: 'Dummy',
  agree: 13,
  disagree: 5,
  likes: 4,
  dislikes: 1,
};

export const DummyPoll = ({
  poll = dummyPollObj,
  is_auth = true,
  voted = '+',
  rated = '+',
}: DummyProps) => {
  return (
    <Poll
      poll={poll}
      is_auth={is_auth}
      voteYes={() => {}}
      voteNo={() => {}}
      rateLike={() => {}}
      rateDislike={() => {}}
      rated={rated}
      voted={voted}
    />
  );
};

export default Poll;
