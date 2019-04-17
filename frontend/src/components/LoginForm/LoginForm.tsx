import React, { useState, useEffect, useContext } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import DjangoReactCSRFToken from 'django-react-csrftoken';

import { yonUser } from '../../services';
import { Process } from './process.type';
import { getProcessName } from './helpers';
import { useData } from './use-form-data.hook';
import { UserdataContext } from '../../contexts';

import Button from '../Button';
import { InputSection } from './InputSection';
import { BottomStatement } from './BottomStatement';
import { ProcessSelector } from './ProcessSelector';

import './LoginForm.scss';

type Props = RouteComponentProps<{ process?: Process }>;

const LoginForm = ({ match, history }: Props) => {
  const process = (match.params.process || 'signin').toLowerCase() as Process;
  const {
    values,
    onInputChange,
    errors,
    calculateErrors,
    message,
    setMessage,
  } = useData(process);

  const [uploading, setUploading] = useState(false);
  const { userdata, updateProfile } = useContext(UserdataContext);

  const closeForm = () => {
    history.push('/');
  };

  useEffect(() => {
    if (userdata.is_auth) {
      closeForm();
    }
  }, [userdata.is_auth]);

  const blockSubmit =
    uploading ||
    (process === 'signup' &&
      !!(errors.username || errors.password || errors.email));

  const switchProcess = (newProcess: Process) => {
    history.push(`/user/${newProcess}`);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!uploading) {
      const { username, password, email } = values;

      const onActionPerformed = () => {
        updateProfile().then(({ message }) => {
          if (message) {
            setMessage(message);
            setUploading(false);
          }
        });
      };

      switch (process) {
        case 'signin':
          setUploading(true);
          yonUser.auth(username, password).then(onActionPerformed);
          break;
        case 'signup':
          if (!calculateErrors()) {
            setUploading(true);
            yonUser.register(email, username, password).then(onActionPerformed);
          }
          break;
        case 'resetpassword':
          setUploading(true);
          yonUser.resetPassword(email).then(onActionPerformed);
          break;
        default:
          throw 'Something went wrong! (wrong process)';
      }
    }
  };

  return (
    <form className="login-form" onSubmit={onSubmit}>
      <DjangoReactCSRFToken />

      <div className="login-form__title">
        <ProcessSelector process={process} onProcessSelect={switchProcess} />
      </div>

      <div className="login-form__input-section">
        <InputSection
          process={process}
          values={values}
          errors={errors}
          onInputChange={onInputChange}
        />
      </div>

      <Button
        className="login-form__submit"
        label={getProcessName(process)}
        flat={uploading || blockSubmit}
        disabled={uploading || blockSubmit}
      />

      <div className="login-form__footer">
        <BottomStatement process={process} onProcessSelect={switchProcess} />
      </div>

      {message && (
        <div
          className={`login-form__message${
            !message.includes('link') ? ' login-form__message--error' : ''
          }`}
        >
          {message}
        </div>
      )}
    </form>
  );
};

export default withRouter((props) => <LoginForm {...props} />);
