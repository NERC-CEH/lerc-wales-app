import React from 'react';
import PropTypes from 'prop-types';

const Component = props => (
  <ul className="table-view">
    <li>
      <p>
        {t(
          'The LERC Wales mobile application enables you to get involved in biological recording in Wales. You can contribute your sightings with photos, GPS acquired coordinates, descriptions and other information, thus providing scientists with important new biodiversity information that contributes to nature conservation, planning, research and education.'
        )}
      </p>
    </li>
    <li>
      <p>
        <strong>{t('Who can use the app?')}</strong>
      </p>
      <p>
        {t(
          "We encourage everyone to get involved with recording species as it is very easy and quick to submit useful records without specialist knowledge. It doesn't matter whether you are an amateur enthusiast or a qualified biologist, the LERC Wales app is for anyone who wants to contribute to our database observations of the natural environment"
        )}
      </p>
    </li>
    <li>
      <p>
        <strong>{t('App Development')}</strong>
      </p>
      <p>
        {t('This app was developed by')}
        <a href="https://kazlauskis.com" style={{ whiteSpace: 'nowrap' }}>
          {' '}
          Karolis Kazlauskis
        </a>
        {' '}
        {t(
          ' on behalf of the Local Environmental Record Centres in Wales. For suggestions and feedback please do not hesitate to'
        )}
        {' '}
        <a href="mailto:apps%40ceh.ac.uk?subject=iRecord%20App%20Support%20%26%20Feedback&body=%0A%0A%0AVersion%3A%20<%- obj.version %>%0ABrowser%3A <%- window.navigator.appVersion %>%0A">
          {t('contact us')}
        </a>
        .
      </p>
    </li>
    <li>
      <p>
        <strong>{t('Local Environmental Records Centres Wales')}</strong>
      </p>
      <p>
        <a href="https://www.lercwales.org.uk/">
          {t('The Local Environmental Records Centres Wales')}
        </a>
        {' '}
        {t('is a consortium made up of the four Records Centres in Wales')}
        {' '}
(
        <a href="https://www.bis.org.uk/">BIS</a>
,
        <a href="https://www.cofnod.org.uk/Home">Cofnod</a>
,
        <a href="http://www.sewbrec.org.uk/">SEWBReC</a>
        {' '}
and
        <a href="https://www.wwbic.org.uk/">WWBIC</a>
        ).
        {t(
          ' We work closely together to provide a seamless service for the data users in Wales and to support the voluntary recording community across the principality'
        )}
        .
      </p>
    </li>
    <li>
      <p className="app-version">
        v
        {props.version}
        {' '}
(
        {props.build}
)
      </p>
    </li>
  </ul>
);

Component.propTypes = {
  version: PropTypes.string,
  build: PropTypes.string,
};

export default Component;
