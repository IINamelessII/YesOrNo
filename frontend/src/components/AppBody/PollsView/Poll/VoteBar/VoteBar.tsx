import React, { CSSProperties } from 'react';

import './VoteBar.scss';

// TODO: IMPLEMENT VOTE!

type Props = {
  pollId: number;
  agreed: number;
  disagreed: number;
};

class VoteBar extends React.Component<Props, {}> {
  shouldComponentUpdate({ agreed, disagreed }: Props) {
    return agreed !== this.props.agreed || disagreed !== this.props.disagreed;
  }

  onVote = (pollId: number, agreed: boolean) => {
    console.log(`VOTED: ${pollId} agreed:${agreed}`);
  };

  render() {
    const { pollId, agreed, disagreed } = this.props;
    const voted = ['AGREE', 'DISAGREE', null][Math.floor(Math.random() * 3)];

    const votedAgree = voted === 'AGREE';
    const votedDisagree = voted === 'DISAGREE';

    return (
      <div className="votebar">
        <div
          className="votebar__btn votebar__btn--agree"
          onClick={() => votedAgree || this.onVote(pollId, true)}
          data-voted={votedAgree}
        />
        <div
          className="votebar__bar"
          data-agreed={agreed}
          data-disagreed={disagreed}
          data-voted={voted}
          style={
            { '--agree-width': agreed / (agreed + disagreed) } as CSSProperties
          }
        />
        <div
          className="votebar__btn votebar__btn--disagree"
          onClick={() => votedDisagree || this.onVote(pollId, false)}
          data-voted={votedDisagree}
        />
      </div>
    );
  }
}

export default VoteBar;
