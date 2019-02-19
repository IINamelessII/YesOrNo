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

    let res: string = '';

    switch (voted) {
      case null:
        res = vote === '+' ? 'voteYes/' : 'voteNo/';
        break;
      case '-':
        res = vote === '+' ? 'switchtoYes/' : 'unvoteNo/';
        break;
      case '+':
        res = vote === '+' ? 'unvoteYes/' : 'switchtoNo/';
        break;
    }

    this.setState(({ voted }) => {
      rated: vote === voted ? null : vote;
    });

    this.yonAPI.sendData(res, { id });
  };

  onRate = (rate: Votable) => {
    const { rated } = this.state;
    const {
      poll: { id },
    } = this.props;

    let res: string = '';

    switch (rated) {
      case null:
        res = rate === '+' ? 'voteLike/' : 'voteDislike/';
        break;
      case '-':
        res = rate === '+' ? 'switchtoLike/' : 'unvoteDislike/';
        break;
      case '+':
        res = rate === '+' ? 'unvoteLike/' : 'switchtoDislike/';
        break;
    }

    this.setState(({ rated }) => {
      rated: rate === rated ? null : rate;
    });

    this.yonAPI.sendData(res, { id });
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
