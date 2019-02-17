import React from 'react';

import VoteBar from './VoteBar';

import './Poll.scss';

const Poll = ({ poll }) => {
  return (
    <article className="poll">
      <h2 className="poll__name">{poll.statement}</h2>
      <span>Votes:</span>
      <VoteBar pollId={poll.id} agree={poll.agree} disagree={poll.disagree} />
      <div className="poll__likes">
        {`Likes: ${poll.likes} Dislikes: ${poll.dislikes}`}
      </div>
    </article>
  );
};

export default Poll;
