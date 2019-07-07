/** ****************************************************************************
 * Info router.
 **************************************************************************** */
import React from 'react';
import Marionette from 'backbone.marionette';
import Log from 'helpers/log';
import CONFIG from 'config';
import App from 'app';
import radio from 'radio';
import userModel from 'user_model';
import appModel from 'app_model';
import savedSamples from 'saved_samples';
import Header from '../common/Components/Header';
import InfoMenu from './Menu';
import Welcome from './Welcome';
import PrivacyPolicy from './PrivacyPolicy';
import PrivacyPolicyWelsh from './PrivacyPolicyWelsh';
import LanguageSelect from '../common/pages/LanguageSelect';
import BRCApproved from './BRCApproved';
import Terms from './Terms';
import TermsWelsh from './TermsWelsh';
import Credits from './Credits';
import Help from './Help';
import About from './About';

App.info = {};

function showWelcome() {
  Log('Info:Welcome: visited.');
  radio.trigger('app:main', <Welcome appModel={appModel} />);
}

const Router = Marionette.AppRouter.extend({
  routes: {
    'info(/)': () => {
      Log('Info:Menu: visited.');
      radio.trigger('app:header', <Header>iRecord App</Header>);
      radio.trigger(
        'app:main',
        <InfoMenu
          userModel={userModel}
          appModel={appModel}
          savedSamples={savedSamples}
        />
      );
    },
    'info/welcome(/)': showWelcome,
    'info/about(/)': () => {
      Log('Info:About: visited.');
      radio.trigger('app:header', <Header>{t('About')}</Header>);
      radio.trigger(
        'app:main',
        <About version={CONFIG.version} build={CONFIG.build} />
      );
    },
    'info/help(/)': () => {
      Log('Info:Help: visited.');
      radio.trigger('app:header', <Header>{t('Help')}</Header>);
      radio.trigger('app:main', <Help />);
    },
    'info/privacy(/)': () => {
      const language = appModel.get('language');
      const getPolicy = () =>
        language === 'en' ? <PrivacyPolicy /> : <PrivacyPolicyWelsh />;

      Log('Info:Privacy: visited.');
      radio.trigger('app:header', <Header>{t('Privacy Policy')}</Header>);
      radio.trigger('app:main', getPolicy());
    },
    'info/terms(/)': () => {
      const language = appModel.get('language');
      const getTerms = () => (language === 'en' ? <Terms /> : <TermsWelsh />);

      Log('Info:Terms: visited.');
      radio.trigger('app:header', <Header>{t('T&Cs')}</Header>);
      radio.trigger('app:main', getTerms());
    },
    'info/brc-approved(/)': () => {
      Log('Info:BRCApproved: visited.');
      radio.trigger('app:header', <Header>{t('BRC Approved')}</Header>);
      radio.trigger('app:main', <BRCApproved />);
    },
    'info/credits(/)': () => {
      Log('Info:Credits: visited.');
      radio.trigger('app:header', <Header>{t('Credits')}</Header>);
      radio.trigger('app:main', <Credits />);
    },
    'info/*path': () => {
      radio.trigger('app:404:show');
    },
  },
});

radio.on('info:welcome', options => {
  App.navigate('info/welcome', options);
  showWelcome();
});

radio.on('info:language', options => {
  App.navigate('info/language', options);
  const navigateHome = () => radio.trigger('info:welcome', { replace: true });

  radio.trigger('app:header:hide');
  radio.trigger('app:main', <LanguageSelect onSelect={navigateHome} />);
});

App.on('before:start', () => {
  Log('Info:router: initializing.');
  App.info.router = new Router();
});
