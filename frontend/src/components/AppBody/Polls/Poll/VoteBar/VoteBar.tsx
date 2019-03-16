import React, { CSSProperties } from 'react';

import { Votable } from '../../../../../types';

import './VoteBar.scss';

// TODO: IMPLEMENT VOTE!

type Props = {
  agreed: number;
  disagreed: number;
  is_auth: boolean;
  voted?: Votable;
  voteYes: () => void;
  voteNo: () => void;
};

const VoteBar = ({
  agreed,
  disagreed,
  voted,
  is_auth,
  voteYes,
  voteNo,
}: Props) => {
  const votedAgree = voted === '+';
  const votedDisagree = voted === '-';

  return (
    <div className="votebar">
      {is_auth && (
        <div
          className="votebar__btn votebar__btn--agree"
          onClick={voteYes}
          data-voted={votedAgree}
        />
      )}
      <div
        className="votebar__bar"
        data-agreed={agreed}
        data-disagreed={disagreed}
        data-voted={voted}
        style={
          {
            '--agree-width':
              agreed + disagreed > 0 ? agreed / (agreed + disagreed) : 0.5,
          } as CSSProperties
        }
      />
      {is_auth && (
        <div
          className="votebar__btn votebar__btn--disagree"
          onClick={voteNo}
          data-voted={votedDisagree}
        />
      )}
    </div>
  );
};

export default VoteBar;
