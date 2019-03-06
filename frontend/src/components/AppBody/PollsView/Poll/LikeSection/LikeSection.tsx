import React from 'react';

import { Votable } from '../../../../../types';

import './LikeSection.scss';

type Props = {
  liked: number;
  disliked: number;
  rated?: Votable;
  onRateLike: () => void;
  onRateDislike: () => void;
};

const LikeSection = ({ liked, rated, onRateLike, onRateDislike }: Props) => {
  const ratedLike = rated === '+';

  return (
    <div className="likesection">
      <div
        className="likesection__btn likesection__btn--like"
        data-liked={liked}
        data-pressed={ratedLike}
        onClick={onRateLike}
      />
    </div>
  );
};

export default LikeSection;
