import React, { useContext, useState, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import DjangoReactCSRFToken from 'django-react-csrftoken';

import { yonUser } from '../../../services';
import { UserdataContext } from '../../../contexts';

import Input from '../../Input';
import Button from '../../Button';

import '../LoginForm.scss';

type Props = RouteComponentProps<{}>;

const usePassword = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false as string | boolean);
  const [initial, setInitial] = useState(true);

  const onInputChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => setPassword(value);

  const calculateError = (): boolean => {
    const newError = password.length < 8 && 'Too short';
    !initial && setError(newError);

    return !!newError;
  };

  useEffect(() => {
    if (!initial) {
      setError(password.length < 8 && 'Too short');
    }
    setInitial(false);
  }, [password]);

  return { password, error, onInputChange, calculateError };
};

export const EnterPasswordForm = withRouter(({ location, history }: Props) => {
  const { password, onInputChange, error, calculateError } = usePassword();
  const [step, setStep] = useState(0 as 0 | 1);

  const [uploading, setUploading] = useState(false);
  const { userdata, updateProfile } = useContext(UserdataContext);

  const closeForm = () => {
    history.push('/');
  };

  const submitBlocked = uploading || !!error;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!uploading) {
      if (step === 0) {
        const onActionPerformed = () => {
          updateProfile().then(({ message }) => {
            setUploading(false);
            if (!message) {
              setStep(1);
            }
          });
        };

        if (!calculateError()) {
          setUploading(true);
          yonUser
            .resetPasswordEntered(location.pathname, password)
            .then(onActionPerformed);
        }
      } else {
        history.replace('/user/signin');
      }
    }
  };

  useEffect(() => {
    if (userdata.is_auth) {
      alert('You are already logged in!');
      closeForm();
    }

    if (userdata.message) {
      alert(userdata.message);
      closeForm();
    }
  }, [userdata.is_auth, userdata.message]);

  return (
    <form className="login-form" onSubmit={onSubmit}>
      <DjangoReactCSRFToken />

      <div className="login-form__title">
        <div className="process process--selected">Reset Password</div>
      </div>

      <div className="login-form__input-section">
        {step === 0 ? (
          <>
            <span>
              Enter new <span className="text--accent">reliable</span> password:
            </span>
            <Input
              type="password"
              name="newpassword"
              label="Password"
              error={error}
              value={password}
              onChange={onInputChange}
            />
          </>
        ) : (
          <span>You updated your password!</span>
        )}
      </div>

      <Button
        className="login-form__submit"
        label={step === 0 ? 'Submit' : 'Proceed to sign in'}
        flat={submitBlocked}
        disabled={submitBlocked}
      />

      {userdata.message && (
        <div
          className={`login-form__message${
            !userdata.message.includes('link')
              ? ' login-form__message--error'
              : ''
          }`}
        >
          {userdata.message}
        </div>
      )}
    </form>
  );
});
