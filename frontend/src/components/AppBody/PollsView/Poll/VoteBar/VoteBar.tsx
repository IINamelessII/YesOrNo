import React, { CSSProperties } from 'react';

import { Votable } from '../../../../../types';

import './VoteBar.scss';

// TODO: IMPLEMENT VOTE!

type Props = {
  agreed: number;
  disagreed: number;
  is_auth: boolean;
  voted?: Votable;
  onVote: (vote: Votable) => void;
};

class VoteBar extends React.Component<Props, {}> {
  shouldComponentUpdate({ agreed, disagreed, voted }: Props) {
    return (
      voted !== this.props.voted ||
      agreed !== this.props.agreed ||
      disagreed !== this.props.disagreed
    );
  }

  onVoteYes = () => {
    this.props.onVote('+');
  };

  onVoteNo = () => {
    this.props.onVote('-');
  };

  render() {
    const { agreed, disagreed, voted, is_auth } = this.props;

    const votedAgree = voted === '+';
    const votedDisagree = voted === '-';

    return (
      <div className="votebar">
        {is_auth && (
          <div
            className="votebar__btn votebar__btn--agree"
            onClick={this.onVoteYes}
            data-voted={votedAgree}
          />
        )}
        <div
          className="votebar__bar"
          data-agreed={agreed}
          data-disagreed={disagreed}
          data-voted={voted}
          style={
            { '--agree-width': agreed / (agreed + disagreed) } as CSSProperties
          }
        />
        {is_auth && (
          <div
            className="votebar__btn votebar__btn--disagree"
            onClick={this.onVoteNo}
            data-voted={votedDisagree}
          />
        )}
      </div>
    );
  }
}

export default VoteBar;
