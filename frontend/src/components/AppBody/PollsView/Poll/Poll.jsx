import React from 'react';

import VoteBar from './VoteBar';

import './Poll.scss';
import LikeSection from './LikeSection';

const Poll = ({ poll }) => {
  return (
    <article className="poll">
      <h2 className="poll__name">{poll.statement}</h2>
      <div className="poll__votes">
        <VoteBar
          pollId={poll.id}
          agreed={poll.agree}
          disagreed={poll.disagree}
        />
        <LikeSection
          pollId={poll.id}
          liked={poll.likes}
          disliked={poll.dislikes}
        />
      </div>
    </article>
  );
};

export default Poll;
