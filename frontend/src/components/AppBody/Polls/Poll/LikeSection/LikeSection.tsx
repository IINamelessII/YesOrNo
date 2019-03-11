import React from 'react';

import { Votable } from '../../../../../types';

import './LikeSection.scss';

type Props = {
  liked: number;
  disliked: number;
  rated?: Votable;
  rateLike: () => void;
  rateDislike: () => void;
};

const LikeSection = ({ liked, rated, rateLike, rateDislike }: Props) => {
  const ratedLike = rated === '+';

  return (
    <div className="likesection">
      <div
        className="likesection__btn likesection__btn--like"
        data-liked={liked}
        data-pressed={ratedLike}
        onClick={rateLike}
      />
    </div>
  );
};

export default LikeSection;
