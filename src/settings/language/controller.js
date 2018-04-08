/** ****************************************************************************
 * Settings Menu controller.
 **************************************************************************** */
import Backbone from 'backbone';
import radio from 'radio';
import Log from 'helpers/log';
import appModel from 'app_model';
import HeaderView from 'common/views/header_view';
import MainView from './main_view';

const API = {
  show(welcome) {
    Log('Settings:Language:Controller: showing.');

    const mainView = new MainView({
      model: appModel,
    });
    // if exit on selection click
    mainView.on('save', () => {
      API.onExit(mainView, () => {
        window.history.back();
      });
    });

    radio.trigger('app:main', mainView);

    if (welcome) {
      radio.trigger('app:header:hide');
    } else {
      const headerView = new HeaderView({
        model: new Backbone.Model({
          title: window.t('Language'),
        }),
      });
      radio.trigger('app:header', headerView);
    }
    radio.trigger('app:footer:hide');
  },

  onExit(mainView, callback) {
    Log('Settings:Language:Controller: exiting.');
    const value = mainView.getValues();
    if (value) {
      appModel.set('language', value);
      appModel.save();
      callback();
    }
  },
};

export { API as default };
