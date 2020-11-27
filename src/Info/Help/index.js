import React from 'react';
import CONFIG from 'config';
import Collapse from 'Components/Collapse';
import AppHeader from 'Components/Header';
import {
  IonList,
  IonItemDivider,
  IonIcon,
  IonItem,
  IonPage,
} from '@ionic/react';
import {
  settings,
  undo,
  person,
  personAdd,
  menu,
  create,
  add,
  trash,
  camera,
  lock,
  unlock,
  people,
  logOut,
} from 'ionicons/icons';
import { Trans as T } from 'react-i18next';
import AppMain from 'Components/Main';
import './styles.scss';
import './swipe_record.png';

export default () => (
  <IonPage>
    <AppHeader title={t('Help')} />
    <AppMain id="help">
      <IonList lines="none">
        <IonItemDivider>{t('Records')}</IonItemDivider>
        <Collapse title={t('How to make a new record')}>
          <p>
            {t('There are two ways to start a record')}
            .
            <br />
            <br />
            <strong>{t('Taking a photo')}</strong>
            <br />
            <T>
              Press the camera button
              <IonIcon icon={camera} size="small" />
              in the home page header. This will prompt you to select the photo
              source: camera or gallery. Once you have picked a photo, the app
              will create a new record without any species associated with it.
            </T>
            <br />
            <br />
            <strong>{t('Selecting species')}</strong>
            <br />
            <T>
              Please press the plus
              <IonIcon icon={add} size="small" />
              button in the home page. This will bring you to the taxa search
              page. After selecting the species, open the record (either by
              opening it directly from the taxa search page using the edit
              button
              <IonIcon icon={create} size="small" />
              beside the species name or through the home-list page) and fill in
              the details of the sighting, like location, date, number seen etc.
              <br />
              <br />
              When finished, press the Upload button in the record&apos;s page
              header.
            </T>
          </p>
        </Collapse>

        <Collapse title={t('Searching for species')}>
          <p>
            {t(
              'For quicker searching of the taxa you can use different shortcuts.'
            )}
            <br />
            <br />
            For 
            {' '}
            <i>Puffinus baroli</i>
            :
            <br />
            <br />
            <i>puffinus ba</i>
            <br />
            <i>puffinus .oli</i>
            <br />
            <i>pufba</i>
            {' '}
(3+2
            {t('characters')}
            )
            <br />
            <i>baroli</i>
          </p>
        </Collapse>
        <Collapse title={t('Sync. with iRecord')}>
          <p>
            <T>
              All your saved records will be shown on the home page. By default
              a record is in 
              {' '}
              <i>draft</i>
              {' '}
mode until it is set for upload. While
              it is in 
              {' '}
              <i>draft</i>
              {' '}
mode the application will not synchronise
              your record with the database.
              <br />
              <br />
              To set it for upload, open the record and press the Upload button
              in the header. The application will try to submit your record once
              there is a good network connection. If the record has reached the
              database, it will be moved to the Uploaded list in the Home page
              (see Uploaded tab).
              <br />
              <br />
              Once it has successfully reached the database the record becomes
              unavailable for new edits. To further edit it please use the
              {' '}
              <a href="http://irecord.org.uk">iRecord website</a>
              .
              <br />
              <br />
              <b>Note:</b>
              {' '}
you have to be signed in to your iRecord account and
              have a network connection, for the records to be automatically
              synchronised in the background .
              <br />
            </T>
          </p>
        </Collapse>
        {/* <Collapse title={t('Send all records')}>
          <p>
            {t(
              'You can set all your valid draft records for upload in one go. To do that go to the settings page'
            )}
            <IonIcon icon={settings} size="small" /> 
            {' '}
            {t('and click Submit All')}
            <IonIcon icon={send} size="small" /> 
            {' '}
            {t('button')}
.
            {' '}
            {t('This will try to send all the valid records')}
.
          </p>
        </Collapse> */}
        <Collapse title={t('Delete a record')}>
          <p>
            <T>
              To delete a record, swipe it left in the Home page and click the
              delete
              <IonIcon icon={trash} size="small" />
              button.
              <img
                src="/images/swipe_record.png"
                style={{ width: '80%', margin: '20px' }}
              />
              <br />
              <br />
              You can also remove all the locally saved records that have been
              successfully synchronised with the database. This will leave the
              records on the database untouched. To do that go to settings page
              <IonIcon icon={settings} size="small" />
              and click 
              {' '}
              <i>Remove All Saved</i>
              <IonIcon icon={trash} size="small" />
              button.
            </T>
          </p>
        </Collapse>
        <Collapse title={t('Lock an attribute')}>
          <p>
            <T>
              You can lock record attributes like date, location, number etc,
              which will preserve your current attribute value for the
              subsequently added records.
              <br />
              <br />
              To lock an attribute click on the lock
              <IonIcon icon={unlock} size="small" />
              button in the attribute edit page header. This will change the
              symbol to locked
              <IonIcon icon={lock} size="small" />
              both on the button and next to the attribute.
              <br />
              <br />
              <b>Note:</b>
              {' '}
For a GPS-sourced location, only the location name
              can be locked, not the GPS value. As you move about, the GPS value
              will change. This will allow recording of different GPS values
              within a named area while keeping the location name the same. You
              can lock a location if it is selected using a map or entered
              manually.
            </T>
          </p>
        </Collapse>

        <IonItemDivider>{t('User')}</IonItemDivider>
        <Collapse title={t('Sign in/out or register')}>
          <p>
            {t('To login, open the main menu page')}
            {' '}
            <IonIcon icon={menu} size="small" />
,
            {t('click Login')}
            {' '}
            <IonIcon icon={person} size="small" />
            {t('or Register')} 
            {' '}
            <IonIcon icon={personAdd} size="small" />
            {t('buttons and follow the instructions')}
            .
            <br />
            <br />
            {t('To logout, visit the main menu page')}
            {' '}
            <IonIcon icon={menu} size="small" />
            {t('and click the logout')} 
            {' '}
            <IonIcon icon={logOut} size="small" />
            {' '}
            {t('button')}
            .
            <br />
            <br />
            <b>
              {t('Note')}
:
            </b>
            {' '}
            {t(
              'after registering a new account you must verify your email address by clicking on a verification link sent to your email'
            )}
            .
          </p>
        </Collapse>
        <Collapse title={t('Activities')}>
          <p>
            <T>
              To send records to a specific activity you can select it in the
              Activities page.
              <IonIcon icon={people} size="small" />
              <br />
              <br />
              <b>Note:</b>
              {' '}
only the activities that allow this mobile app
              records and only the ones that you have joined on the iRecord
              website will be available to select.
            </T>
          </p>
        </Collapse>

        <IonItemDivider>{t('Other')}</IonItemDivider>
        <Collapse title={t('Manage saved locations')}>
          <p>
            <T>
              You can manage your saved locations both on any record&apos;s
              location page and from the settings page.
              <IonIcon icon={settings} size="small" />
              Swipe a location left and click edit
              <IonIcon icon={create} size="small" />
              or delete
              <IonIcon icon={trash} size="small" />
              buttons.
              <br />
              <br />
              <span className="location-favourite icon icon-star " />
              {' '}
You can
              make your location stick to the top of the locations list by
              clicking the Favourite toggle .
            </T>
          </p>
        </Collapse>
        <Collapse title={t('Reset the application')}>
          <p>
            {t('Go to the application settings page')}
            {' '}
            <IonIcon icon={settings} size="small" />
            {' '}
            {t('and click on the Reset')} 
            {' '}
            <IonIcon icon={undo} size="small" />
            {t('button')}
.
          </p>
        </Collapse>
        <IonItem>
          <p>
            {t('For more help please visit the iRecord')}
            {' '}
            <a href={`${CONFIG.site_url}forum/26`}>{t('forum')}</a>
.
          </p>
        </IonItem>
      </IonList>
    </AppMain>
  </IonPage>
);
