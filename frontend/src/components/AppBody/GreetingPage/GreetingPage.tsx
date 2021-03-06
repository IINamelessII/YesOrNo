import React, { useContext } from 'react';

import { UserdataContext } from '../../../contexts';

import H1 from '../../H1';

import './GreetingPage.scss';

const GreetingPage = () => {
  const { userdata } = useContext(UserdataContext);

  const onAuthMessage =
    userdata.is_auth && ` (I see you, ${userdata.username}!)`;

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
      <H1>Welcome to YesOrNo!</H1>
      <div className="greeting-page__content">
        <p>
          Each tester {onAuthMessage} is recommended to signup / sign in and
          add at least 5 polls distributed among any flows and also vote in
          polls created by other users.
        </p>
        <p>
          To start voting just choose a Flow you interested in and let it rock!
          Once signed in, add a new Poll if you want by clicking that 'New poll'
          button.
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
