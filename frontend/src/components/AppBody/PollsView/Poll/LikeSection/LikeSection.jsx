import React from 'react';

import './LikeSection.scss';

// TODO: IMPLEMENT VOTE!


const LikeSection = ({ liked, disliked }) => {
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
