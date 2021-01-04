import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { IonSlides, IonSlide, IonButton } from '@ionic/react';
import Log from 'helpers/log';
import { Trans as T } from 'react-i18next';
import './styles.scss';
import './images/welcome_1.jpg';

const SplashScreen = ({ appModel }) => {
  function exit() {
    Log('Info:Welcome:Controller: exit.');
    appModel.attrs.showWelcome = false;
    appModel.save();
  }

  const sliderRef = React.createRef();
  const tOptions = { lng: appModel.attrs.language }; // for some reason doesn't update automatically

  return (
    <IonSlides id="welcome" ref={sliderRef}>
      <IonSlide class="first">
        <div className="message">
          <h2>
            <T tOptions={tOptions}>Welcome</T>
          </h2>
          <p>
            <b>
              <T tOptions={tOptions}>LERC Wales</T>
              {' '}
            </b>
            <T tOptions={tOptions}>
              helps you with management and sharing of your wildlife
              observations
            </T>
            .
          </p>
        </div>

        <IonButton color="light" strong="true" onClick={exit}>
          <T tOptions={tOptions}>Get Started</T>
        </IonButton>
      </IonSlide>
    </IonSlides>
  );
};

SplashScreen.propTypes = {
  appModel: PropTypes.object.isRequired,
};

const Component = observer(({ appModel, children }) => {
  if (appModel.attrs.showWelcome) {
    return <SplashScreen appModel={appModel} />;
  }

  return children;
});

Component.propTypes = {
  appModel: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
};

export default Component;
