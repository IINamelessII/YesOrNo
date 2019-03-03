import React from 'react';

import { YonApiService } from '../../../../services';
import { Votable } from '../../../../types';

import VoteBar from './VoteBar';
import LikeSection from './LikeSection';

import './Poll.scss';

// TODO: Implement cool loading dummy poll component wow cool

type Props = {
  poll: any;
  is_auth: boolean;
  voted?: Votable;
  rated?: Votable;
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
  yonAPI = new YonApiService();

  state = getInitialState(this.props);

  onVote = (vote: Votable) => {
    const { voted } = this.state;
    const {
      poll: { id },
    } = this.props;

    let actionUrl: string = '';

    switch (voted) {
      case undefined:
        actionUrl = vote === '+' ? 'voteYes/' : 'voteNo/';
        break;
      case '-':
        actionUrl = vote === '+' ? 'switchtoYes/' : 'unvoteNo/';
        break;
      case '+':
        actionUrl = vote === '+' ? 'unvoteYes/' : 'switchtoNo/';
        break;
    }

    this.setState(({ voted }) => ({
      voted: vote === voted ? undefined : vote,
    }));

    this.yonAPI.sendData(actionUrl, { id });
  };

  onRate = (rate: Votable) => {
    const { rated } = this.state;
    const {
      poll: { id },
    } = this.props;

    let actionUrl: string = '';

    switch (rated) {
      case undefined:
        actionUrl = rate === '+' ? 'voteLike/' : 'voteDislike/';
        break;
      case '-':
        actionUrl = rate === '+' ? 'switchtoLike/' : 'unvoteDislike/';
        break;
      case '+':
        actionUrl = rate === '+' ? 'unvoteLike/' : 'switchtoDislike/';
        break;
    }

    this.setState(({ rated }) => ({
      rated: rate === rated ? undefined : rate,
    }));

    this.yonAPI.sendData(actionUrl, { id });
  };

  render() {
    const { poll, is_auth } = this.props;
    const { voted, rated } = this.state;

    return (
      <article className="poll">
        <h2 className="poll__name">{poll.statement}</h2>
        <div className="poll__votes">
          <VoteBar
            agreed={poll.agree}
            disagreed={poll.disagree}
            voted={voted}
            is_auth={is_auth}
            onVote={this.onVote}
          />
          {is_auth && (
            <LikeSection
              liked={poll.likes}
              disliked={poll.dislikes}
              rated={rated}
              onRate={this.onRate}
            />
          )}
        </div>
      </article>
    );
  }
}

export default Poll;
