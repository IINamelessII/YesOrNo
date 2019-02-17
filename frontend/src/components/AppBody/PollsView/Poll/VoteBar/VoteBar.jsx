import React from 'react';

import './VoteBar.scss';

// TODO: IMPLEMENT VOTE!

class VoteBar extends React.Component {
  shouldComponentUpdate({ agreed, disagreed }) {
    return agreed !== this.props.agree || disagreed !== this.props.disagree;
  }

  onVote = (pollId, agreed) => {
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
          style={{ '--agree-width': agreed / (agreed + disagreed) }}
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
