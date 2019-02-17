import React from 'react';

import './LikeSection.scss';

// TODO: IMPLEMENT VOTE!

type Props = {
  pollId: number;
  liked: number;
  disliked: number;
};

const LikeSection = ({ liked }: Props) => {
  const pressed = !!Math.floor(Math.random() * 2);

  return (
    <div className="likesection">
      <div
        className="likesection__btn likesection__btn--like"
        data-liked={liked}
        data-pressed={pressed}
      />
    </div>
  );
};

export default LikeSection;
