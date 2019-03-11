import React, { useContext } from 'react';

import { UserdataContext } from '../../../contexts';

import Button from '../../Button';
import AppBodyHeader from '../AppBodyHeader';

import './GreetingPage.scss';

const GreetingPage = () => {
  const { userdata } = useContext(UserdataContext);

  const onAuthMessage = userdata.is_auth && ` (hello, ${userdata.username}!)`;

  const addButton = (
    <Button
      label="+"
      style={{ margin: '0 .5rem', display: 'inline-flex', padding: 0 }}
      flat
    />
  );

  const namelessTG = (
    <a href="https://t.me/IINamelessII" target="__blank">
      @IINamelessII
    </a>
  );

  const yugisuTG = (
    <a href="https://t.me/inokentich" target="__blank">
      @inokentich
    </a>
  );

  return (
    <div className="greeting-page">
      <AppBodyHeader label="Welcome to YesOrNo alpha v0.666!" />
      <div className="greeting-page__content">
        <p>
          Each alpha-tester {onAuthMessage} is recommended to register / sign in
          and {addButton} at least 5 polls distributed among any flows and also
          vote in polls created by other users.
        </p>
        <p>
          To start voting choose Flow or just push "Random!" button in left
          column. To add a Poll sign in and press + in left column.
        </p>
        <p>
          Report problems found to
          <span className="text--accent"> theyesornoproject@gmail.com</span> or
          to us in Telegram: {namelessTG}, {yugisuTG}.
        </p>
        <p>Have a nice time! With best wishes, IINamelessII & yugisu.</p>
      </div>
    </div>
  );
};

export default GreetingPage;
