import React from 'react';
import Log from 'helpers/log';
import radio from 'radio';
import PropTypes from 'prop-types';
import './styles.scss';
import './images/welcome_1.jpg';

const Component = props => {
  const { appModel } = props;

  function exit() {
    Log('Info:Welcome:Controller: exit.');
    appModel.set('showWelcome', false);
    appModel.save();
    radio.trigger('samples:list', { replace: true });
  }

  const sliderRef = React.createRef();

  return (
    <ion-slides id="welcome" ref={sliderRef}>
      <ion-slide class="first">
        <div className="message">
          <h2>{t('Welcome')}</h2>
          <p>
            <b>{t('LERC Wales')}</b>
            {' '}
            {t(
              'helps you with management and sharing of your wildlife observations'
            )}
            .
          </p>
        </div>

        <ion-button color="light" strong="true" onClick={exit}>
          {' '}
          {t('Get Started')}
          {' '}
        </ion-button>
      </ion-slide>
    </ion-slides>
  );
};

Component.propTypes = {
  appModel: PropTypes.object.isRequired,
};

export default Component;
