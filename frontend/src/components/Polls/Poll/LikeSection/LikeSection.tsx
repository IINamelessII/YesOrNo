import React from 'react';

import { Votable } from '../../../../types';

import './LikeSection.scss';

type Props = {
  liked: number;
  disliked: number;
  rated?: Votable;
  rateLike: () => void;
  rateDislike: () => void;
};

const LikeSection = ({
  liked,
  disliked,
  rated,
  rateLike,
  rateDislike,
}: Props) => {
  return (
    <div className="likesection">
      <div
        className="likesection__btn likesection__btn--like"
        data-liked={liked}
        data-pressed={rated === '+'}
        onClick={rateLike}
      />
      <div
        className="likesection__btn likesection__btn--dislike"
        data-liked={disliked}
        data-pressed={rated === '-'}
        onClick={rateDislike}
      />
    </div>
  );
};

export default LikeSection;
