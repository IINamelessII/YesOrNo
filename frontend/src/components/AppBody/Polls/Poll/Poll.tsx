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

type State = {
  voted?: Votable;
  rated?: Votable;
};

const getInitialState = ({ voted, rated }: Props): State => ({
  voted,
  rated,
});

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
      <span className="poll__name">{poll.statement}</span>

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

export default Poll;
