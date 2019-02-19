import React from 'react';

import { Votable } from '../../../../../types';

import './LikeSection.scss';

type Props = {
  liked: number;
  disliked: number;
  rated?: Votable;
  onRate: (rate: Votable) => void;
};

const LikeSection = ({ liked, rated, onRate }: Props) => {
  const ratedLike = rated === '+';

  return (
    <div className="likesection">
      <div
        className="likesection__btn likesection__btn--like"
        data-liked={liked}
        data-pressed={ratedLike}
        onClick={() => onRate('+')}
      />
    </div>
  );
};

export default LikeSection;
