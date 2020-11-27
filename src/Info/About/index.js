import React from 'react';
import { IonList, IonItem, IonLabel, IonPage } from '@ionic/react';
import AppMain from 'Components/Main';
import AppHeader from 'Components/Header';
import './styles.scss';

const Component = () => (
  <IonPage>
    <AppHeader title={t('About')} />
    <AppMain id="about" class="ion-padding">
      <IonList lines="none">
        <IonItem>
          <IonLabel>
            {t(
              'The LERC Wales mobile application enables you to get involved in biological recording in Wales. You can contribute your sightings with photos, GPS acquired coordinates, descriptions and other information, thus providing scientists with important new biodiversity information that contributes to nature conservation, planning, research and education.'
            )}
          </IonLabel>
        </IonItem>
      </IonList>
      <IonList lines="none">
        <IonItem lines="inset">
          <IonLabel>
            <b>{t('Who can use the app?')}</b>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            {t(
              "We encourage everyone to get involved with recording species as it is very easy and quick to submit useful records without specialist knowledge. It doesn't matter whether you are an amateur enthusiast or a qualified biologist, the LERC Wales app is for anyone who wants to contribute to our database observations of the natural environment"
            )}
          </IonLabel>
        </IonItem>
      </IonList>
      <IonList lines="none">
        <IonItem lines="inset">
          <IonLabel>
            <b>{t('App Development')}</b>
          </IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            {t('This app was developed by')}
            <a href="https://flumens.io" style={{ whiteSpace: 'nowrap' }}>
              {' '}
              Flumens.
            </a>{' '}
            {t(
              'A technical consultancy that excels at building bespoke environmental science and community focussed solutions.'
            )}{' '}
            {t('For suggestions and feedback please do not hesitate to')}{' '}
            <a href="mailto:apps%40ceh.ac.uk?subject=LERC%20App">
              {t('contact us')}
            </a>
            .
          </IonLabel>
        </IonItem>
      </IonList>
    </AppMain>
  </IonPage>
);

Component.propTypes = {};

export default Component;
