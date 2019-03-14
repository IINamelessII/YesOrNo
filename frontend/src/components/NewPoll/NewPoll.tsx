import React from 'react';
import DjangoReactCSRFToken from 'django-react-csrftoken';

import { withCentered } from '../hoc';

import Poll from '../AppBody/Polls/Poll';
import Button, { ContentButton } from '../Button';

import './NewPoll.scss';

class NewPoll extends React.Component {
  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
  };

  render() {
    return (
      <form className="new-poll" onSubmit={this.handleSubmit}>
        <DjangoReactCSRFToken />
        <h2 className="new-poll__splash">New poll</h2>
        Statement of the poll you want to add below:
        <Button label="Add poll" />
      </form>
    );
  }
}

export default withCentered(NewPoll)((onToggleShow) => (
  <ContentButton
    label=""
    onClick={onToggleShow}
    className="new-poll__trigger-button"
    flat
  >
    <Poll
      poll={{
        id: -1,
        agree: 13,
        disagree: 6,
        likes: 3,
        dislikes: 5,
        statement: 'Can you add a new poll?',
        flow: 'Awesomeness',
      }}
      is_auth
      voteYes={() => {}}
      voteNo={() => {}}
      rateLike={() => {}}
      rateDislike={() => {}}
      rated="+"
      voted="+"
    />
  </ContentButton>
));
