import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IonIcon, IonButton, IonList } from '@ionic/react';
import AppMain from 'Components/Main';
import { person, mail, key, lock, eye, eyeOff } from 'ionicons/icons';
import { Formik, Form } from 'formik';
import { Trans as T } from 'react-i18next';
import InputWithValidation from 'Components/InputWithValidation';
import ToggleWithValidation from 'Components/ToggleWithValidation';
import config from 'config';

class Component extends React.Component {
  state = {
    showPassword: false,
  };

  togglePassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }));
  };

  render() {
    const { showPassword } = this.state;
    const { onSubmit, schema, lang } = this.props;

    let termsLabel = (
      <T>
        I agree to
        {' '}
        <a href={`${config.site_url}/terms_of_use?lang=${lang}`}>
          Terms and Conditions
        </a>
        {' '}
        and
        {' '}
        <a href={`${config.site_url}/node/8097?lang=${lang}`}>Privacy Policy</a>
      </T>
    );

    if (lang === 'cy') {
      termsLabel = (
        <T>
          I agree to 
          {' '}
          <Link to="/info/welsh-terms">Terms and Conditions</Link>
          {' '}
          and 
          {' '}
          <Link to="/info/welsh-privacy">Privacy Policy</Link>
        </T>
      );
    }

    return (
      <AppMain id="register-page">
        <Formik
          validationSchema={schema}
          onSubmit={onSubmit}
          initialValues={{}}
          render={props => (
            <Form>
              <IonList lines="full">
                <InputWithValidation
                  name="email"
                  placeholder={t('Email')}
                  icon={mail}
                  type="email"
                  {...props}
                />
                <InputWithValidation
                  name="firstname"
                  placeholder={t('First Name')}
                  icon={person}
                  type="text"
                  {...props}
                />
                <InputWithValidation
                  name="secondname"
                  placeholder={t('Surname')}
                  icon={person}
                  type="text"
                  {...props}
                />
                <InputWithValidation
                  name="password"
                  placeholder={t('Password')}
                  icon={key}
                  type={showPassword ? 'text' : 'password'}
                  {...props}
                >
                  <IonButton
                    slot="end"
                    onClick={this.togglePassword}
                    fill="clear"
                  >
                    <IonIcon
                      icon={showPassword ? eye : eyeOff}
                      faint
                      size="small"
                    />
                  </IonButton>
                </InputWithValidation>
                <ToggleWithValidation
                  name="terms"
                  label={termsLabel}
                  icon={lock}
                  type="terms"
                  {...props}
                />
              </IonList>

              <IonButton color="primary" type="submit" expand="block">
                {t('Register')}
              </IonButton>
            </Form>
          )}
        />
      </AppMain>
    );
  }
}

Component.propTypes = {
  schema: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
};

export default Component;
