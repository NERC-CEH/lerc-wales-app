import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import appModel from 'app_model';
import './styles.scss';

function SelectLanguage({ onSelect }) {
  return (
    <ion-page id="language-select">
      <ion-list>
        <div className="header">
          <ion-icon name="globe" size="large" />
          <h4>Select your language</h4>
        </div>
        <ion-radio-group onChange={onSelect}>
          <ion-item>
            <ion-label>English</ion-label>
            <ion-radio value="en" onClick={onSelect} />
          </ion-item>

          <ion-item>
            <ion-label>Cymraeg</ion-label>
            <ion-radio value="cy" onClick={onSelect} />
          </ion-item>
        </ion-radio-group>
      </ion-list>
    </ion-page>
  );
}
SelectLanguage.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

const Component = observer(({ onSelect }) => {
  return (
    <SelectLanguage
      onSelect={e => {
        appModel.set('language', e.target.value);
        if (onSelect) {
          onSelect();
          return;
        }
        window.history.back();
      }}
    />
  );
});

Component.propTypes = {
  onSelect: PropTypes.func,
};

export default Component;
