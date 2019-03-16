import React from 'react';
import DjangoReactCSRFToken from 'django-react-csrftoken';

import { withCentered } from '../hoc';

import Poll from '../AppBody/Polls/Poll';
import Button, { ContentButton } from '../Button';

import './NewPoll.scss';
import { classNames } from '../../utilities';

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

export default withCentered(NewPoll)((onToggleShow, isShown) => (
  <ContentButton
    label=""
    onClick={onToggleShow}
    className={classNames('new-poll-trigger', {
      'new-poll-trigger--pressed': isShown,
    })}
    flat
  >
    {isShown ? (
      <Poll
        poll={{
          id: -1,
          agree: 13,
          disagree: 6,
          likes: 3,
          dislikes: 5,
          statement: 'Adding new poll, huh?',
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
    ) : (
      <span className="new-poll-trigger__msg">New poll</span>
    )}
  </ContentButton>
));
