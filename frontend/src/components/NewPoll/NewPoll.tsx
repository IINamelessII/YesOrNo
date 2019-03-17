import React, { useState } from 'react';
import DjangoReactCSRFToken from 'django-react-csrftoken';

import { withCentered } from '../hoc';
import { classNames } from '../../utilities';

import { Textarea } from '../Input';
import Poll from '../AppBody/Polls/Poll';
import Button, { ContentButton } from '../Button';

import './NewPoll.scss';

type Props = {
  selectedFlow: string;
  addPollHandler: (statement: string) => Promise<any>;
  onToggleShow?: () => void;
};

const useStatement = () => {
  const [statement, setStatement] = useState('');
  const [error, setError] = useState(
    'Question should have at least 10 characters!' as string | undefined
  );

  const enterStatement = (statement: string) => {
    setError(
      statement.length < 10
        ? 'Question should have at least 10 characters!'
        : statement.length > 70
        ? 'Question should be less than 70 characters long!'
        : undefined
    );
    setStatement(statement);
  };

  return { statement, error, enterStatement, setError };
};

const NewPoll = ({ selectedFlow, addPollHandler, onToggleShow }: Props) => {
  const { statement, error, enterStatement, setError } = useStatement();

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    enterStatement(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const resultStatement = statement
      .split(/\s/)
      .filter((str) => str)
      .join(' ');

    try {
      await addPollHandler(resultStatement);
      onToggleShow && onToggleShow();
    } catch (err) {
      setError(err);
    }
  };

  return (
    <form className="add-poll" onSubmit={handleSubmit}>
      <DjangoReactCSRFToken />

      <h2 className="add-poll__splash">New "{selectedFlow}" poll</h2>

      <span>Enter question you want to ask below:</span>

      <Textarea
        label="Question to ask"
        name="statement"
        value={statement}
        error={error}
        onChange={handleInput}
        className="add-poll__statement scrollable"
      />

      <Button label="Add poll" flat={!!error} disabled={!!error} />
    </form>
  );
};

export default withCentered(NewPoll)((onToggleShow, isShown) => (
  <ContentButton
    label=""
    onClick={onToggleShow}
    className={classNames('add-poll-trigger', {
      'add-poll-trigger--pressed': isShown,
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
      <span className="add-poll-trigger__msg">New poll</span>
    )}
  </ContentButton>
));
