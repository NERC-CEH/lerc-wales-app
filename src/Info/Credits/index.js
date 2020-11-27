import React from 'react';
import { IonList, IonItem, IonLabel, IonPage } from '@ionic/react';
import AppMain from 'Components/Main';
import AppHeader from 'Components/Header';
import './sponsor_logo.png';
import './styles.scss';

export default () => (
  <IonPage>
    <AppHeader title={t('Credits')} />
    <AppMain id="credits" class="ion-padding">
      <ul className="table-view">
        <li>
          <img src="/images/sponsor_logo.png" alt="" />
        </li>
        <li>
          <p>
            <strong>
              {t(
                'We are very grateful for all the people that helped to create this app:'
              )}
            </strong>
          </p>
          <p>
            <ul style={{ listStyleType: 'none' }}>
              <li>David Slade</li>
              <li>
                <a href="https://kazlauskis.com">Karolis Kazlauskis</a>
              </li>
              <li>Tim May</li>
              <li>Jo Milborrow</li>
              <li>Adam Rowe</li>
              <li>Jim Bacon</li>
              <li>David Roy</li>
            </ul>
          </p>
          <p>
            {t(
              'The development was led by SEWBReC, and was jointly funded by BIS, WWBIC and Cofnod.'
            )}
          </p>
          <p>
            {t(
              'Also thanks to all the beta testers and the rest of the LERC Wales staff for their input.'
            )}
          </p>
          <p>
            <strong>{t('Welcome screen credits')}:</strong> UK Ladybird Survey
          </p>
        </li>
      </ul>
    </AppMain>
  </IonPage>
);
