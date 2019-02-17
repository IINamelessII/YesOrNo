import React from 'react';

const PollsView = ({ polls }) => {
  return polls.map((poll) => (
    <article key={poll.id}>
      <h1 className="poll__name">{poll.statement}</h1>
      {`Agreed: ${poll.agree} Disagree: ${poll.disagree}`}
      {`Likes: ${poll.likes} Dislikes: ${poll.dislikes}`}
    </article>
  ));
};

export default PollsView;
