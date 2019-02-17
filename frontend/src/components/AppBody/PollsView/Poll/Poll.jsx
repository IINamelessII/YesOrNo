import React from 'react';

import './Poll.scss';

const Poll = ({ poll }) => {
  return (
    <article className="poll" key={poll.id}>
      <h2 className="poll__name">{poll.statement}</h2>
      <div className="poll__agrees">
        {`Agreed: ${poll.agree} Disagree: ${poll.disagree}`}
      </div>
      <div className="poll__likes">
        {`Likes: ${poll.likes} Dislikes: ${poll.dislikes}`}
      </div>
    </article>
  );
};

export default Poll;
