/** ****************************************************************************
 * Record Edit controller.
 *****************************************************************************/
import Backbone from 'backbone';
import _ from 'lodash';
import Morel from 'morel';
import device from '../../../helpers/device';
import ImageHelp from '../../../helpers/image';
import log from '../../../helpers/log';
import App from '../../../app';
import appModel from '../../common/app_model';
import userModel from '../../common/user_model';
import recordManager from '../../common/record_manager';
import MainView from './main_view';
import HeaderView from './header_view';
import FooterView from './footer_view';

let id;
let record;
const API = {
  show(recordID) {
    log('Records:Edit:Controller: showing');
    id = recordID;
    recordManager.get(recordID, (err, recordModel) => {
      if (err) {
        log(err, 'e');
      }

      // Not found
      if (!recordModel) {
        log('No record model found', 'e');
        App.trigger('404:show', { replace: true });
        return;
      }

      // can't edit a saved one - to be removed when record update
      // is possible on the server
      if (recordModel.getSyncStatus() === Morel.SYNCED) {
        App.trigger('records:show', recordID, { replace: true });
        return;
      }


      // MAIN
      const mainView = new MainView({
        model: new Backbone.Model({ recordModel, appModel }),
      });
      App.regions.main.show(mainView);

      // on finish sync move to show
      function checkIfSynced() {
        if (recordModel.getSyncStatus() === Morel.SYNCED) {
          App.trigger('records:show', recordID, { replace: true });
          return;
        }
      }
      recordModel.on('request sync error', checkIfSynced);
      mainView.on('destroy', () => {
        // unbind when page destroyed
        recordModel.off('request sync error', checkIfSynced);
      });


      // HEADER
      const headerView = new HeaderView({
        model: recordModel,
      });

      headerView.on('save', () => {
        log('Records:Edit:Controller: save clicked');

        recordModel.setToSend((setError) => {
          if (setError) {
            const invalids = setError;
            let missing = '';
            if (invalids.occurrences) {
              _.each(invalids.occurrences, (message, invalid) => {
                missing += '<b>' + invalid + '</b> - ' + message + '</br>';
              });
            }
            if (invalids.sample) {
              _.each(invalids.sample, (message, invalid) => {
                missing += '<b>' + invalid + '</b> - ' + message + '</br>';
              });
            }

            App.regions.dialog.show({
              title: 'Sorry',
              body: missing,
              timeout: 2000,
            });

            return;
          }

          if (device.isOnline() && !userModel.hasLogIn()) {
            App.trigger('user:login', { replace: true });
            return;
          }

          recordManager.syncAll();
          App.trigger('record:saved');
        });
      });

      App.regions.header.show(headerView);

      // FOOTER
      const footerView = new FooterView({
        model: recordModel,
      });

      footerView.on('photo:upload', (e) => {
        log('Records:Edit:Controller: photo uploaded');

        const occurrence = recordModel.occurrences.at(0);
        // show loader
        API.addPhoto(occurrence, e.target.files[0], () => {
          // hide loader
        });
      });

      footerView.on('childview:photo:delete', (view) => {
        log('Records:Edit:Controller: photo deleted');

        // show loader
        view.model.destroy(() => {
          // hide loader
        });
      });


      // android gallery/camera selection
      footerView.on('photo:selection', () => {
        log('Records:Edit:Controller: photo selection');

        const occurrence = recordModel.occurrences.at(0);

        App.regions.dialog.show({
          title: 'Choose a method to upload a photo',
          buttons: [
            {
              title: 'Camera',
              onClick() {
                ImageHelp.getImage((entry) => {
                  API.addPhoto(occurrence, entry.nativeURL, ()=>{});
                });
                App.regions.dialog.hide();
              },
            },
            {
              title: 'Gallery',
              onClick() {
                ImageHelp.getImage((entry) => {
                  API.addPhoto(occurrence, entry.nativeURL, ()=>{});
                }, {
                  sourceType: window.Camera.PictureSourceType.PHOTOLIBRARY,
                  saveToPhotoAlbum: false,
                });
                App.regions.dialog.hide();
              },
            },
          ],
        });
      });

      App.regions.footer.show(footerView);
    });
  },

  /**
   * Adds a new image to occurrence.
   */
  addPhoto(occurrence, photo, callback) {
    ImageHelp.getImageModel(photo, (err, image) => {
      if (err || !image) {
        const err = new Error('Missing image.');
        callback(err);
        return;
      }
      occurrence.addImage(image);

      occurrence.save(null, {
        success: () => {
          callback && callback();
        }
      });
    });
  },
};

export { API as default };
