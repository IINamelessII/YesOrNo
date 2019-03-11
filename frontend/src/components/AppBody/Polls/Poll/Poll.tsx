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

class Poll extends React.Component<Props, State> {
  state = getInitialState(this.props);

  render() {
    const {
      poll,
      is_auth,
      voteYes,
      voteNo,
      rateLike,
      rateDislike,
      voted,
      rated,
    } = this.props;

    return (
      <article className="poll">
        <h2 className="poll__name">{poll.statement}</h2>
        <div className="poll__votes">
          <VoteBar
            agreed={poll.agree + +(voted === '+')}
            disagreed={poll.disagree + +(voted === '-')}
            voted={voted}
            is_auth={is_auth}
            voteYes={voteYes}
            voteNo={voteNo}
          />
          {is_auth && (
            <LikeSection
              liked={poll.likes + +(rated === '+')}
              disliked={poll.dislikes + +(rated === '-')}
              rated={rated}
              rateLike={rateLike}
              rateDislike={rateDislike}
            />
          )}
        </div>
      </article>
    );
  }
}

export default Poll;
