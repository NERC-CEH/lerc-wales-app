import Log from 'helpers/log';
import radio from 'radio';
import appModel from 'app_model';
import MainView from './main_view';

const API = {
  show() {
    const mainView = new MainView({ model: appModel });
    radio.trigger('app:main', mainView);

    mainView.on('english', () => API.setLanguage('EN'));
    mainView.on('welsh', () => API.setLanguage('CY'));

    radio.trigger('app:header:hide');
    radio.trigger('app:footer:hide');
  },

  setLanguage(language) {
    Log('Info:Language:Controller: setLanguage.');
    appModel.save({ language });
    radio.trigger('info:welcome');
  },
};

export { API as default };
