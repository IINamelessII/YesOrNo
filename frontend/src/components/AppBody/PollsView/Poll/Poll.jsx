import React from 'react';

import './Poll.scss';

const Poll = ({ poll }) => {
  return (
    <article className="poll">
      <h2 className="poll__name">{poll.statement}</h2>
      <div
        className="poll__agrees"
        data-agreed={poll.agree}
        data-disagreed={poll.disagree}
        style={{ '--agree-width': poll.agree / (poll.agree + poll.disagree) }}
      />
      <div className="poll__likes">
        {`Likes: ${poll.likes} Dislikes: ${poll.dislikes}`}
      </div>
    </article>
  );
};

export default Poll;
