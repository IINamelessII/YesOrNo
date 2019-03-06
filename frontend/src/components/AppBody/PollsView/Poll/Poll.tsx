import React from 'react';

import { yonVote } from '../../../../services';
import { Votable, Poll as PollType } from '../../../../types';

import VoteBar from './VoteBar';
import LikeSection from './LikeSection';

import './Poll.scss';

// TODO: Implement cool loading dummy poll component wow cool

type Props = {
  poll: PollType;
  is_auth: boolean;
  voted?: Votable;
  rated?: Votable;
  profileUpdate?: () => void;
};

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

  onVoteYes = () => yonVote.voteYes(this.props.poll.id);
  onVoteNo = () => yonVote.voteNo(this.props.poll.id);

  onRateLike = () => yonVote.rateLike(this.props.poll.id);
  onRateDislike = () => yonVote.rateDislike(this.props.poll.id);

  render() {
    const { poll, is_auth } = this.props;
    const { voted, rated } = this.state;

    return (
      <article className="poll">
        <h2 className="poll__name">{poll.statement}</h2>
        <div className="poll__votes">
          <VoteBar
            agreed={poll.agree + +(voted === '+')}
            disagreed={poll.disagree + +(voted === '-')}
            voted={voted}
            is_auth={is_auth}
            onVoteYes={this.onVoteYes}
            onVoteNo={this.onVoteNo}
          />
          {is_auth && (
            <LikeSection
              liked={poll.likes + +(rated === '+')}
              disliked={poll.dislikes + +(rated === '-')}
              rated={rated}
              onRateLike={this.onRateLike}
              onRateDislike={this.onRateDislike}
            />
          )}
        </div>
      </article>
    );
  }
}

export default Poll;
