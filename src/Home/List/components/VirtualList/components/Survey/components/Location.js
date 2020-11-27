import React from 'react';
import PropTypes from 'prop-types';
import appModel from 'app_model';
import { observer } from 'mobx-react';

const Component = observer(props => {
  const { sample } = props;
  const isLocating = sample.isGPSRunning();
  const locationPrint = sample.printLocation();

  const { location } = sample.attrs;
  const locationName = location.name;

  const survey = sample.getSurvey();
  const locationLocked = appModel.isAttrLocked(sample, 'locationName');

  if (!locationPrint) {
    if (isLocating) {
      return (
        <span className="location warn">
          {t('Locating')}
          ...
        </span>
      );
    }

    return <span className="location error">{t('No location')}</span>;
  }

  if (!locationName) {
    return <span className="location error">{t('No location name')}</span>;
  }

  const locationPretty = sample.printLocation();
  return (
    <>
      <span className={`location ${locationLocked ? 'locked' : ''}`}>
        {locationName}
      </span>

      {survey.complex && <span>{` (${locationPretty})`}</span>}
    </>
  );
});

Component.propTypes = {
  sample: PropTypes.object.isRequired,
};

export default Component;
